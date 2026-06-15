import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-body font-semibold transition-all focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-grad-paint text-white shadow-glow-paint hover:brightness-105",
        ghost:
          "border-2 border-line bg-transparent text-ink hover:border-eco-green hover:bg-bg-soft",
        outline: "border border-line bg-white/60 text-ink backdrop-blur-sm hover:bg-white",
      },
      size: {
        default: "h-12 px-6 text-step-0",
        sm: "h-10 px-4 text-step--1",
        lg: "h-14 px-8 text-step-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
