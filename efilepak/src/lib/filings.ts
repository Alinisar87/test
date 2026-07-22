import { prisma } from "./db";
import { getSession } from "./auth";
import { computeTax, emptyFilingInput } from "./tax/engine";
import { filingInputSchema } from "./validation";
import { notifyStatusChange } from "./notify";
import type { FilingInput, TaxResult } from "./tax/types";

/** Parse the stored JSON, falling back to a zero-filled input. */
export function parseFilingInput(
  raw: string,
  taxYear: number,
  filerType: FilingInput["filerType"],
): FilingInput {
  try {
    const parsed = filingInputSchema.safeParse(JSON.parse(raw));
    if (parsed.success) return parsed.data as FilingInput;
  } catch {
    /* fall through */
  }
  return emptyFilingInput(taxYear, filerType);
}

export function parseComputed(raw: string): TaxResult | null {
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj === "object" && "taxableIncome" in obj) {
      return obj as TaxResult;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** Recompute the tax result from an input and return the serialized pair. */
export function computeAndSerialize(input: FilingInput) {
  const result = computeTax(input);
  return {
    data: JSON.stringify(input),
    computed: JSON.stringify(result),
    result,
  };
}

/**
 * Load a filing the current user is allowed to see (owner, or any STAFF).
 * Returns null when unauthenticated or not permitted.
 */
export async function getAuthorizedFiling(filingId: string) {
  const session = await getSession();
  if (!session) return null;
  const filing = await prisma.filing.findUnique({
    where: { id: filingId },
    include: {
      documents: { orderBy: { createdAt: "desc" } },
      events: { orderBy: { createdAt: "desc" } },
      payments: { orderBy: { createdAt: "desc" } },
      user: { select: { name: true, email: true, cnic: true, phone: true } },
    },
  });
  if (!filing) return null;
  if (session.role !== "STAFF" && filing.userId !== session.id) return null;
  return filing;
}

/** Has this filing been paid for (any PAID payment)? */
export async function hasPaidFiling(filingId: string): Promise<boolean> {
  const paid = await prisma.payment.findFirst({
    where: { filingId, status: "PAID" },
    select: { id: true },
  });
  return paid !== null;
}

/**
 * Move a filing to SUBMITTED, log the event, and notify the taxpayer.
 * Shared by direct submission and post-payment submission. Idempotent-ish:
 * only acts on editable filings.
 */
export async function finalizeSubmission(
  filingId: string,
  actorEmail: string,
): Promise<void> {
  const filing = await prisma.filing.findUnique({ where: { id: filingId } });
  if (!filing) return;
  if (filing.status !== "DRAFT" && filing.status !== "INFO_NEEDED") return;

  await prisma.filing.update({
    where: { id: filingId },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
      events: {
        create: {
          status: "SUBMITTED",
          message: "Submitted to the eFile Pak team for filing",
          actor: actorEmail,
        },
      },
    },
  });
  await notifyStatusChange(filingId, "SUBMITTED");
}
