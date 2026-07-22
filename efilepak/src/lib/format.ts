// Shared formatting helpers (safe on client and server).

export function formatPKR(n: number): string {
  const rounded = Math.round(n || 0);
  return "Rs " + rounded.toLocaleString("en-PK");
}

export function formatPct(fraction: number): string {
  return (fraction * 100).toFixed(2) + "%";
}

export const FILER_TYPE_LABELS: Record<string, string> = {
  SALARIED: "Salaried individual",
  BUSINESS: "Business / self-employed",
  AOP: "Association of Persons (AOP)",
  FREELANCER: "Freelancer / IT exporter",
};

export const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  IN_REVIEW: "In review",
  INFO_NEEDED: "Info needed",
  FILED: "Filed with FBR",
  COMPLETED: "Completed",
};

export const STATUS_STEPS = [
  "DRAFT",
  "SUBMITTED",
  "IN_REVIEW",
  "FILED",
  "COMPLETED",
] as const;
