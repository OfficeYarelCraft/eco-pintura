import { cn } from "@/lib/utils";

type TapeProps = {
  /** Printed text (repeated along the strip). Omit for plain masking tape. */
  print?: string;
  variant?: "masking" | "signal";
  className?: string;
  /** How many times to repeat the print. */
  repeat?: number;
};

/**
 * Painter's tape with torn ends. Purely decorative (aria-hidden).
 * Size it with width/height classes; the torn ends keep their shape at any length.
 */
export function Tape({
  print,
  variant = "masking",
  className,
  repeat = 12,
}: TapeProps) {
  const color = variant === "signal" ? "var(--signal)" : "var(--tape)";
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none flex h-10 select-none items-stretch",
        className,
      )}
      style={{ filter: "drop-shadow(0 1px 0 rgb(21 21 19 / 0.08))" }}
    >
      <TornEnd side="left" color={color} />
      <span
        className={cn(
          "flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap px-3",
          variant === "signal" ? "tape-body--signal" : "tape-body",
        )}
      >
        {print && (
          <span className="font-stencil text-[1.05rem] font-bold uppercase leading-none tracking-[0.04em] text-ink">
            {Array.from({ length: repeat }, (_, i) => (
              <span key={i} className="mr-10 inline-block">
                {print}
              </span>
            ))}
          </span>
        )}
      </span>
      <TornEnd side="right" color={color} />
    </span>
  );
}

function TornEnd({ side, color }: { side: "left" | "right"; color: string }) {
  const d =
    side === "left"
      ? "M9 0 L3 0 L7 4 L1 8 L6 12 L0 17 L5 21 L1 26 L6 30 L0 35 L4 40 L9 40 Z"
      : "M0 0 L5 0 L2 4 L8 9 L3 13 L9 18 L4 22 L8 27 L2 31 L9 35 L4 40 L0 40 Z";
  return (
    <svg
      viewBox="0 0 9 40"
      preserveAspectRatio="none"
      className="h-full w-[9px] shrink-0"
      aria-hidden
    >
      <path d={d} fill={color} />
    </svg>
  );
}
