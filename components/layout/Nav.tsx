"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "./nav-links";
import { SectionLink } from "./SectionLink";

export function Nav() {
  const t = useTranslations("nav");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomPinned, setZoomPinned] = useState(false);
  const pathname = usePathname();

  // While the Long Zoom is pinned the stage owns the screen: keep the nav out of the way.
  useEffect(() => {
    setZoomPinned(false);
    const track = document.getElementById("escala-track");
    if (!track) return;
    const io = new IntersectionObserver(
      ([e]) => setZoomPinned(e.isIntersecting),
      {
        rootMargin: "-50% 0px -50% 0px",
      },
    );
    io.observe(track);
    return () => io.disconnect();
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    if (menuOpen) return;
    if (y > 160 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y < 160) setHidden(false);
  });

  return (
    <>
      <a
        href="#contenido"
        className="fixed left-3 top-3 z-[70] -translate-y-24 bg-ink px-4 py-3 font-body text-sm font-semibold text-paper focus:translate-y-0"
      >
        {t("skip")}
      </a>
      <m.header
        className={cn(
          "sticky top-0 z-50 bg-paper transition-[box-shadow] duration-200",
          scrolled && "shadow-[inset_0_-1px_0_0_rgb(21_21_19/0.14)]",
        )}
        animate={{
          y: (hidden || zoomPinned) && !reduce && !menuOpen ? "-100%" : "0%",
        }}
        transition={{ duration: 0.32, ease: ease.cinta }}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center gap-6 lg:gap-8 xl:gap-10">
          <Link href="/" aria-label="Eco Pintura — inicio" className="shrink-0">
            <Logo className="w-[100px] md:w-[116px] lg:w-[132px]" />
          </Link>
          <span className="flex-1" />
          <nav aria-label={t("primary")} className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.key}
                  className={
                    item.key === "process" ? "hidden xl:block" : undefined
                  }
                >
                  <SectionLink
                    hash={item.hash}
                    className="group relative whitespace-nowrap py-2 font-body text-[1rem] text-ink transition-colors hover:text-ink"
                  >
                    {t(item.key)}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-[260ms] ease-cinta group-hover:scale-x-100"
                    />
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitch className="hidden md:flex" />
          <SectionLink
            hash="contacto"
            className="group relative hidden min-h-[46px] items-center overflow-hidden whitespace-nowrap bg-signal px-5 font-body text-[0.9375rem] font-semibold text-ink md:inline-flex"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-[280ms] ease-cinta group-hover:scale-x-100"
            />
            <span className="relative transition-colors delay-[90ms] duration-150 group-hover:text-paper">
              {t("quote")}
            </span>
          </SectionLink>
          <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </m.header>
    </>
  );
}
