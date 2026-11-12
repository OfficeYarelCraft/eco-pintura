import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  ECO_PATH,
  LEAF,
  LOGO_VIEWBOX,
  PINTURA_PATH,
  VEIN_PATHS,
} from "./logo-paths";

type Variant = "colour" | "paper" | "ink";

type LogoProps = {
  variant?: Variant;
  className?: string;
  /** Colour of the leaf veins on flat variants (should match the background). */
  veinColor?: string;
  title?: string;
};

/**
 * The supplied Eco Pintura logo, drawn inline.
 * Gradients belong to the mark only — they are never used elsewhere in the UI.
 */
export function Logo({
  variant = "colour",
  className,
  veinColor,
  title = "Eco Pintura",
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const flat =
    variant === "paper"
      ? "var(--paper)"
      : variant === "ink"
        ? "var(--ink)"
        : null;
  const veins =
    veinColor ??
    (variant === "colour"
      ? "#FFFFFF"
      : variant === "paper"
        ? "var(--night)"
        : "var(--signal)");

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("block h-auto", className)}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "colour" && (
        <defs>
          <linearGradient id={`e${uid}`} x1="0" y1="0" x2="1" y2="0.15">
            <stop offset="0" stopColor="#9DD53A" />
            <stop offset="0.55" stopColor="#5CBE49" />
            <stop offset="1" stopColor="#37A94B" />
          </linearGradient>
          <linearGradient id={`l${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#62C24A" />
            <stop offset="1" stopColor="#2E9C46" />
          </linearGradient>
          <linearGradient id={`p${uid}`} x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0" stopColor="#FBA63C" />
            <stop offset="0.5" stopColor="#F47A29" />
            <stop offset="1" stopColor="#EE5524" />
          </linearGradient>
        </defs>
      )}
      <path d={ECO_PATH} fill={flat ?? `url(#e${uid})`} />
      <circle
        cx={LEAF.cx}
        cy={LEAF.cy}
        r={LEAF.r}
        fill={flat ?? `url(#l${uid})`}
      />
      <g fill="none" stroke={veins} strokeWidth="5.3" strokeLinecap="round">
        {VEIN_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d={PINTURA_PATH} fill={flat ?? `url(#p${uid})`} />
    </svg>
  );
}
