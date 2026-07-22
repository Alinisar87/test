import Link from "next/link";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-bold ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
        e
      </span>
      <span className="text-lg tracking-tight text-ink">
        eFile<span className="text-brand-600">Pak</span>
      </span>
    </Link>
  );
}
