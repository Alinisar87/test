export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200 ${className}`}
    >
      <strong>Estimate only.</strong> Figures are computed from the information
      you provide using Tax Year 2026 rates and are for review purposes. They
      are not a filed return. A qualified tax professional reviews every return
      before it is filed with FBR, and tax rates must be verified against the
      current Finance Act at filing time.
    </p>
  );
}
