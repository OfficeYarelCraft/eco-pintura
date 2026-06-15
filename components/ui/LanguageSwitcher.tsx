"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-pill border border-line bg-white/60 font-semibold backdrop-blur-sm",
        compact ? "p-0.5 text-[0.7rem]" : "gap-1 p-1 text-step--1",
        className,
      )}
      role="group"
    >
      {routing.locales.map((l) => (
        <button
          aria-pressed={locale === l}
          className={cn(
            "rounded-pill uppercase transition-colors focus-visible:focus-ring",
            compact ? "px-2 py-0.5" : "px-3 py-1",
            locale === l
              ? "bg-eco-green text-white"
              : "text-ink-soft hover:text-ink",
          )}
          key={l}
          onClick={() => switchLocale(l)}
          type="button"
        >
          {l}
        </button>
      ))}
    </div>
  );
}
