import type { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#353438] dark:text-[#b6ebff]">
      {children}
    </span>
  );
}

export function PillGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap ${className}`}>{children}</div>;
}
