import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Architectural scale notation (1:1 → 1:5000). It is the zoom state, not decoration. */
export function ScaleTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-paper px-2.5 py-1 font-stencil text-[2rem] font-bold leading-none text-ink shadow-[inset_0_0_0_1.5px_var(--ink)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Live site status (current active site comes from Obrelier). Static square, no blinking dot. */
export function StatusTag({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 px-3.5 py-2.5 font-body text-[0.875rem] font-medium leading-tight",
        tone === "ink" ? "bg-ink text-paper" : "bg-paper text-ink",
        className,
      )}
    >
      <span aria-hidden className="block size-2.5 shrink-0 bg-signal" />
      {children}
    </span>
  );
}
