import { Zap } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`} aria-label="Tech BitePOS home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-lg shadow-brand-500/30">
        <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
      <span className="text-lg font-bold tracking-tight text-white">
        Tech Bite<span className="text-brand-400">POS</span>
      </span>
    </a>
  );
}
