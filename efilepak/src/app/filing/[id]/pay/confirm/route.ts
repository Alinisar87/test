import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getAuthorizedFiling, finalizeSubmission } from "@/lib/filings";

// Mock-gateway confirmation. A real gateway would confirm via a signed webhook
// (verify the signature, then mark PAID) rather than a user-facing GET. Kept
// here so the end-to-end flow works in development.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const filing = await getAuthorizedFiling(id);
  if (!filing) return NextResponse.redirect(new URL("/dashboard", request.url));

  const ref = new URL(request.url).searchParams.get("ref") || undefined;

  // Mark the matching pending payment as paid.
  const pending = await prisma.payment.findFirst({
    where: { filingId: id, status: "PENDING", ...(ref ? { reference: ref } : {}) },
    orderBy: { createdAt: "desc" },
  });
  if (pending) {
    await prisma.payment.update({
      where: { id: pending.id },
      data: { status: "PAID" },
    });
  }

  const session = await getSession();
  await finalizeSubmission(id, session?.email ?? "user");

  return NextResponse.redirect(new URL(`/filing/${id}?submitted=1`, request.url));
}
