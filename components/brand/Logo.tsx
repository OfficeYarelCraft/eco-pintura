import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "ink" | "white";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  animated?: boolean;
}

export function Logo({ variant = "default", className, animated = false }: LogoProps) {
  if (variant === "default") {
    return (
      <Image
        alt="Eco Pintura"
        className={cn("h-auto w-auto", className)}
        height={48}
        priority
        src="/logo/eco-pintura.svg"
        width={120}
      />
    );
  }

  return (
    <InlineLogo animated={animated} className={className} variant={variant} />
  );
}

function InlineLogo({
  variant,
  className,
  animated,
}: {
  variant: "ink" | "white";
  className?: string;
  animated?: boolean;
}) {
  const ecoFill = variant === "white" ? "#FFFFFF" : "url(#gEcoInk)";
  const pinFill = variant === "white" ? "#FFFFFF" : "url(#gPinInk)";
  const iconFill = variant === "white" ? "rgba(255,255,255,0.2)" : "url(#gIconInk)";

  return (
    <svg
      aria-label="Eco Pintura"
      className={cn("h-10 w-auto", className)}
      role="img"
      viewBox="0 0 360 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gEcoInk" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0" stopColor="#1F7A3D" />
          <stop offset="1" stopColor="#15231B" />
        </linearGradient>
        <linearGradient id="gPinInk" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#46564C" />
          <stop offset="1" stopColor="#15231B" />
        </linearGradient>
        <linearGradient id="gIconInk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5CBE49" />
          <stop offset="1" stopColor="#37A94B" />
        </linearGradient>
      </defs>
      <text
        fill={ecoFill}
        fontFamily="var(--font-fredoka), Fredoka, sans-serif"
        fontSize="42"
        fontWeight="700"
        x="0"
        y="42"
      >
        ECO
      </text>
      <circle cx="155" cy="28" fill={iconFill} r="22" />
      <g
        fill="none"
        stroke={variant === "white" ? "#FFFFFF" : "#FFFFFF"}
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path
          d="M160 14 L148 42"
          style={animated ? { strokeDasharray: 30, strokeDashoffset: 0 } : undefined}
        />
        <path d="M158 20 L172 18" />
        <path d="M155 28 L178 32" />
        <path d="M152 36 L170 44" />
      </g>
      <text
        fill={pinFill}
        fontFamily="var(--font-fredoka), Fredoka, sans-serif"
        fontSize="42"
        fontWeight="700"
        x="0"
        y="95"
      >
        PINTURA
      </text>
    </svg>
  );
}
