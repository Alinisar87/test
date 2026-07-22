"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { filingInputSchema } from "@/lib/validation";
import {
  computeAndSerialize,
  getAuthorizedFiling,
} from "@/lib/filings";
import { emptyFilingInput } from "@/lib/tax/engine";
import type { FilerType, FilingStatus } from "@prisma/client";

const EDITABLE: FilingStatus[] = ["DRAFT", "INFO_NEEDED"];
const UPLOAD_ROOT = path.join(process.cwd(), "uploads");
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

// --- Taxpayer actions -------------------------------------------------------

export async function createFiling(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) redirect("/login");

  const filerType = (formData.get("filerType") as FilerType) || "SALARIED";
  const taxYear = Number(formData.get("taxYear")) || 2026;
  const input = emptyFilingInput(taxYear, filerType);
  const { data, computed } = computeAndSerialize(input);

  const filing = await prisma.filing.create({
    data: {
      userId: session.id,
      taxYear,
      filerType,
      status: "DRAFT",
      data,
      computed,
      events: {
        create: { status: "DRAFT", message: "Return started", actor: session.email },
      },
    },
  });
  redirect(`/filing/${filing.id}`);
}

export interface SaveState {
  ok?: boolean;
  error?: string;
  savedAt?: number;
}

/** Persist the full questionnaire input and recompute the tax result. */
export async function saveFilingInput(
  filingId: string,
  inputJson: string,
): Promise<SaveState> {
  const filing = await getAuthorizedFiling(filingId);
  if (!filing) return { error: "Not found." };
  if (!EDITABLE.includes(filing.status)) {
    return { error: "This return has been submitted and can no longer be edited." };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(inputJson);
  } catch {
    return { error: "Could not read the form data." };
  }
  const parsed = filingInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Some values are invalid." };
  }

  const { data, computed } = computeAndSerialize(parsed.data as never);
  await prisma.filing.update({
    where: { id: filingId },
    data: {
      data,
      computed,
      taxYear: parsed.data.taxYear,
      filerType: parsed.data.filerType,
    },
  });
  revalidatePath(`/filing/${filingId}`);
  return { ok: true, savedAt: Date.now() };
}

export async function submitFiling(filingId: string): Promise<void> {
  const filing = await getAuthorizedFiling(filingId);
  if (!filing) redirect("/dashboard");
  if (!EDITABLE.includes(filing.status)) redirect(`/filing/${filingId}`);

  const session = await getSession();
  await prisma.filing.update({
    where: { id: filingId },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
      events: {
        create: {
          status: "SUBMITTED",
          message: "Submitted to the eFile Pak team for filing",
          actor: session?.email ?? "user",
        },
      },
    },
  });
  redirect(`/filing/${filingId}?submitted=1`);
}

// --- Document uploads -------------------------------------------------------

export async function uploadDocument(formData: FormData): Promise<void> {
  const filingId = String(formData.get("filingId") || "");
  const kind = String(formData.get("kind") || "other");
  const file = formData.get("file");

  const filing = await getAuthorizedFiling(filingId);
  if (!filing) redirect("/dashboard");

  if (!(file instanceof File) || file.size === 0) {
    redirect(`/filing/${filingId}?err=nofile`);
  }
  const f = file as File;
  if (f.size > MAX_FILE_BYTES) redirect(`/filing/${filingId}?err=toobig`);
  if (!ALLOWED_MIME.has(f.type)) redirect(`/filing/${filingId}?err=type`);

  const dir = path.join(UPLOAD_ROOT, filingId);
  await fs.mkdir(dir, { recursive: true });
  const safeName = f.name.replace(/[^\w.\-]+/g, "_").slice(-80);
  const storedName = `${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await f.arrayBuffer());
  await fs.writeFile(path.join(dir, storedName), buffer);

  await prisma.document.create({
    data: {
      filingId,
      kind,
      originalName: f.name.slice(0, 120),
      storedPath: path.join(filingId, storedName),
      mimeType: f.type,
      size: f.size,
    },
  });
  revalidatePath(`/filing/${filingId}`);
  redirect(`/filing/${filingId}#documents`);
}

export async function deleteDocument(formData: FormData): Promise<void> {
  const docId = String(formData.get("docId") || "");
  const doc = await prisma.document.findUnique({ where: { id: docId } });
  if (!doc) redirect("/dashboard");
  const filing = await getAuthorizedFiling(doc.filingId);
  if (!filing) redirect("/dashboard");

  await fs.rm(path.join(UPLOAD_ROOT, doc.storedPath), { force: true });
  await prisma.document.delete({ where: { id: docId } });
  revalidatePath(`/filing/${doc.filingId}`);
  redirect(`/filing/${doc.filingId}#documents`);
}

// --- Staff actions ----------------------------------------------------------

export async function updateFilingStatus(formData: FormData): Promise<void> {
  const session = await getSession();
  if (session?.role !== "STAFF") redirect("/dashboard");

  const filingId = String(formData.get("filingId") || "");
  const status = String(formData.get("status") || "") as FilingStatus;
  const message = String(formData.get("message") || "").slice(0, 500) || null;

  const valid: FilingStatus[] = [
    "DRAFT",
    "SUBMITTED",
    "IN_REVIEW",
    "INFO_NEEDED",
    "FILED",
    "COMPLETED",
  ];
  if (!valid.includes(status)) redirect(`/admin/${filingId}`);

  await prisma.filing.update({
    where: { id: filingId },
    data: {
      status,
      filedAt: status === "FILED" ? new Date() : undefined,
      events: {
        create: { status, message, actor: session.email },
      },
    },
  });
  revalidatePath(`/admin/${filingId}`);
  redirect(`/admin/${filingId}`);
}

export async function saveStaffNote(formData: FormData): Promise<void> {
  const session = await getSession();
  if (session?.role !== "STAFF") redirect("/dashboard");
  const filingId = String(formData.get("filingId") || "");
  const notes = String(formData.get("notes") || "").slice(0, 2000);
  await prisma.filing.update({ where: { id: filingId }, data: { notes } });
  revalidatePath(`/admin/${filingId}`);
  redirect(`/admin/${filingId}`);
}
