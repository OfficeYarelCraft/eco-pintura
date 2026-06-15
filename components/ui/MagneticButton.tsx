"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { cn, isTouchDevice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  href,
  onClick,
  children,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const [disabled, setDisabled] = useState(true);
  const glow = useMotionValue(0.4);
  const glowSpring = useSpring(glow, { stiffness: 200, damping: 25 });
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic({ disabled });

  useEffect(() => {
    setDisabled(isTouchDevice());
  }, []);

  const content = (
    <m.span
      className="relative z-10"
      style={{ x: disabled ? 0 : x, y: disabled ? 0 : y }}
    >
      {children}
    </m.span>
  );

  const glowStyle = {
    opacity: glowSpring,
  };

  const sharedClass = cn(
    "relative w-full overflow-hidden sm:w-auto",
    variant === "primary" && "shadow-glow-paint",
    className,
  );

  const handlers = {
    onMouseMove: (e: React.MouseEvent) => {
      onMouseMove(e);
      glow.set(0.7);
    },
    onMouseLeave: () => {
      onMouseLeave();
      glow.set(0.4);
    },
  };

  if (href) {
    return (
      <Button
        asChild
        className={sharedClass}
        size="lg"
        variant={variant === "primary" ? "default" : "ghost"}
      >
        <Link
          className="w-full justify-center sm:w-auto"
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...handlers}
        >
          <m.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white/20"
            style={glowStyle}
          />
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className={sharedClass}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      size="lg"
      variant={variant === "primary" ? "default" : "ghost"}
      {...handlers}
    >
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/20"
        style={glowStyle}
      />
      {content}
    </Button>
  );
}
