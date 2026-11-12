import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const cls =
  "group relative inline-flex flex-col gap-1 font-body text-[1.0625rem] font-semibold leading-tight tracking-[-0.005em]";

function Underline({ tone }: { tone: "signal" | "amber" }) {
  return (
    <span aria-hidden className="relative block h-1 w-full overflow-hidden">
      <span
        className={cn(
          "absolute inset-0 block origin-right transition-transform duration-[260ms] ease-cinta group-hover:scale-x-0 group-focus-visible:scale-x-0 motion-reduce:transition-none",
          tone === "amber" ? "bg-ob-amber" : "bg-signal",
        )}
      />
      {/* re-laid strip: grows back from the left once the old one is pulled */}
      <span
        className={cn(
          "absolute inset-0 block origin-left scale-x-0 transition-transform duration-[300ms] ease-cinta group-hover:scale-x-100 group-hover:delay-[200ms] group-focus-visible:scale-x-100 motion-reduce:transition-none",
          tone === "amber" ? "bg-ob-amber" : "bg-signal",
        )}
      />
    </span>
  );
}

type Common = {
  children: ReactNode;
  className?: string;
  tone?: "signal" | "amber";
};

export function TapeLink({
  children,
  className,
  tone = "signal",
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(cls, className)} {...props}>
      <span>{children}</span>
      <Underline tone={tone} />
    </Link>
  );
}

export function TapeA({
  children,
  className,
  tone = "signal",
  ...props
}: Common & ComponentProps<"a">) {
  return (
    <a className={cn(cls, className)} {...props}>
      <span>{children}</span>
      <Underline tone={tone} />
    </a>
  );
}
