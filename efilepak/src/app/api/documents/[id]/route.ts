import { promises as fs } from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/db";
import { getAuthorizedFiling } from "@/lib/filings";

const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) return new Response("Not found", { status: 404 });

  // Authorization: only the owner or STAFF may download.
  const filing = await getAuthorizedFiling(doc.filingId);
  if (!filing) return new Response("Forbidden", { status: 403 });

  const abs = path.join(UPLOAD_ROOT, doc.storedPath);
  // Guard against path traversal.
  if (!abs.startsWith(UPLOAD_ROOT)) return new Response("Forbidden", { status: 403 });

  try {
    const buf = await fs.readFile(abs);
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(doc.originalName)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("File missing", { status: 404 });
  }
}
