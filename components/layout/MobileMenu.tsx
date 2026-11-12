"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { useLenis } from "@/components/providers/LenisProvider";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";
import { MENU_ITEMS } from "./nav-links";
import { SectionLink } from "./SectionLink";

export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const t = useTranslations("nav");
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="flex items-center gap-2.5 py-2.5 font-body text-[1.0625rem] font-semibold text-ink lg:hidden">
        {t("menu")}
        <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden>
          <rect width="22" height="2.5" fill="currentColor" />
          <rect y="9.5" width="14" height="2.5" fill="currentColor" />
        </svg>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content forceMount asChild aria-describedby={undefined}>
              <m.div
                className="on-dark fixed inset-0 z-[60] flex flex-col bg-night text-paper"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.6, ease: ease.rodillo }}
              >
                <Dialog.Title className="sr-only">{t("menu")}</Dialog.Title>
                <div className="wrap flex h-[var(--nav-h)] items-center justify-between">
                  <Logo variant="paper" className="w-[100px] md:w-[116px]" />
                  <Dialog.Close className="flex items-center gap-2.5 py-2.5 font-body text-[1.0625rem] font-semibold">
                    {t("close")}
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                      <rect
                        x="7.75"
                        y="-2"
                        width="2.5"
                        height="22"
                        fill="currentColor"
                        transform="rotate(45 9 9)"
                      />
                      <rect
                        x="7.75"
                        y="-2"
                        width="2.5"
                        height="22"
                        fill="currentColor"
                        transform="rotate(-45 9 9)"
                      />
                    </svg>
                  </Dialog.Close>
                </div>
                <nav aria-label={t("primary")} className="wrap flex-1 pt-8">
                  <ul>
                    {MENU_ITEMS.map((item, i) => (
                      <li key={item.key} className="overflow-hidden">
                        <m.div
                          initial={{ y: "105%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "105%", transition: { duration: 0.2 } }}
                          transition={{
                            delay: 0.28 + i * 0.045,
                            duration: 0.5,
                            ease: ease.cinta,
                          }}
                        >
                          <SectionLink
                            hash={item.hash}
                            onClick={() => onOpenChange(false)}
                            className="block py-1 font-display text-[clamp(2.75rem,12vw,4.5rem)] font-black leading-[1] text-paper transition-colors hover:text-signal focus-visible:text-signal"
                          >
                            {t(item.key)}
                          </SectionLink>
                        </m.div>
                      </li>
                    ))}
                  </ul>
                </nav>
                <m.div
                  className="wrap flex flex-col gap-4 pb-[max(28px,env(safe-area-inset-bottom))]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <LanguageSwitch tone="paper" />
                  <SectionLink
                    hash="contacto"
                    onClick={() => onOpenChange(false)}
                    className="flex min-h-[56px] items-center justify-center bg-signal font-body font-semibold text-ink"
                  >
                    {t("quote")}
                  </SectionLink>
                  <a
                    href={site.whatsappHref}
                    className="flex min-h-[56px] items-center justify-center font-body font-semibold text-paper shadow-[inset_0_0_0_1.5px_var(--paper)]"
                  >
                    WhatsApp {site.whatsappDisplay}
                  </a>
                </m.div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
