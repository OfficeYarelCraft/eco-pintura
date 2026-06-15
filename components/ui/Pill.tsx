import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface PillProps {
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}

export function Pill({ children, className, icon = false }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-line bg-white/70 px-4 py-1.5 text-step--1 font-medium text-ink-soft backdrop-blur-sm",
        className,
      )}
    >
      {icon && <Leaf aria-hidden className="h-3.5 w-3.5 text-eco-green" />}
      {children}
    </span>
  );
}
