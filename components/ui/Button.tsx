import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "paper" | "amber";
type Size = "m" | "l";

const base =
  "group relative inline-flex select-none items-center justify-center overflow-hidden font-body font-semibold leading-none tracking-[-0.005em] transition-transform duration-150 active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  l: "min-h-[56px] px-7 text-[1rem]",
  m: "min-h-[46px] px-5 text-[0.9375rem]",
};

/* rest colours / roller-pass colour / label colour once the roller has passed */
const variants: Record<Variant, { rest: string; pass: string; label: string }> =
  {
    primary: {
      rest: "bg-signal text-ink",
      pass: "bg-ink",
      label: "group-hover:text-paper group-focus-visible:text-paper",
    },
    ink: {
      rest: "bg-ink text-paper",
      pass: "bg-signal",
      label: "group-hover:text-ink group-focus-visible:text-ink",
    },
    paper: {
      rest: "bg-transparent text-ink shadow-[inset_0_0_0_1.5px_var(--ink)]",
      pass: "bg-ink",
      label: "group-hover:text-paper group-focus-visible:text-paper",
    },
    amber: { rest: "bg-ob-amber text-ob-bg", pass: "bg-ob-text", label: "" },
  };

function Inner({
  children,
  variant,
}: {
  children: ReactNode;
  variant: Variant;
}) {
  const v = variants[variant];
  return (
    <>
      {/* The roller pass: an ink strip slides under the label, left → right */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-[280ms] ease-cinta group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none",
          v.pass,
        )}
      />
      <span
        className={cn(
          "relative transition-colors delay-[90ms] duration-150",
          v.label,
        )}
      >
        {children}
      </span>
    </>
  );
}

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "l",
  className,
  children,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, sizes[size], variants[variant].rest, className)}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function ButtonA({
  variant = "primary",
  size = "l",
  className,
  children,
  ...props
}: Common & ComponentProps<"a">) {
  return (
    <a
      className={cn(base, sizes[size], variants[variant].rest, className)}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "l",
  className,
  children,
  type = "button",
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant].rest, className)}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
