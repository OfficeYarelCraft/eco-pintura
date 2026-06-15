"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({ className }: { className?: string }) {
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
        "inline-flex items-center gap-1 rounded-pill border border-line bg-white/60 p-1 text-step--1 font-semibold backdrop-blur-sm",
        className,
      )}
      role="group"
    >
      {routing.locales.map((l) => (
        <button
          aria-pressed={locale === l}
          className={cn(
            "rounded-pill px-3 py-1 uppercase transition-colors focus-visible:focus-ring",
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
