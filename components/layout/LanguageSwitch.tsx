"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABEL: Record<string, string> = {
  es: "Español",
  ca: "Català",
  en: "English",
};

export function LanguageSwitch({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  return (
    <nav
      aria-label={t("language")}
      className={cn("flex items-center gap-3", className)}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-label={LABEL[l]}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative py-1 font-body text-[0.875rem] font-medium uppercase leading-none transition-colors",
              tone === "ink"
                ? active
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink"
                : active
                  ? "text-paper"
                  : "text-paper/60 hover:text-paper",
            )}
          >
            {l}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-200 ease-cinta",
                tone === "ink" ? "bg-ink" : "bg-paper",
                active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
