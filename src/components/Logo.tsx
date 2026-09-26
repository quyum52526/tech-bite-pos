import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Tech BitePOS home">
      <Image src="/logo.svg" alt="" width={36} height={36} priority className="h-9 w-9" />
      <span className="text-lg font-bold tracking-tight text-white">
        Tech Bite<span className="text-brand-400">POS</span>
      </span>
    </Link>
  );
}
