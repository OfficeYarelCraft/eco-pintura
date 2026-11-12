"use client";

import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { SectionLink } from "./SectionLink";

/**
 * Mobile only. Slides up once the hero has left the viewport and steps aside
 * while the contact form is on screen (so it never covers the submit button).
 */
export function MobileActionBar() {
  const t = useTranslations("actionBar");
  const [heroGone, setHeroGone] = useState(false);
  const [contactIn, setContactIn] = useState(false);
  const [footerIn, setFooterIn] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    const footer = document.getElementById("pie");
    const zoom = document.getElementById("escala");
    const obs: IntersectionObserver[] = [];
    if (zoom) {
      // The pinned Long Zoom is an immersive moment: the bar steps aside so it never covers the caption.
      const o = new IntersectionObserver(([e]) => setZoomIn(e.isIntersecting), {
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px",
      });
      o.observe(zoom);
      obs.push(o);
    }
    if (hero) {
      const o = new IntersectionObserver(
        ([e]) => setHeroGone(!e.isIntersecting),
        { threshold: 0 },
      );
      o.observe(hero);
      obs.push(o);
    } else setHeroGone(true);
    if (contact) {
      const o = new IntersectionObserver(
        ([e]) => setContactIn(e.isIntersecting),
        { threshold: 0.15 },
      );
      o.observe(contact);
      obs.push(o);
    }
    if (footer) {
      const o = new IntersectionObserver(
        ([e]) => setFooterIn(e.isIntersecting),
        { threshold: 0.05 },
      );
      o.observe(footer);
      obs.push(o);
    }
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const show = heroGone && !contactIn && !footerIn && !zoomIn;

  return (
    <AnimatePresence>
      {show && (
        <m.nav
          aria-label={t("label")}
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, ease: ease.cinta }}
        >
          <a
            href={site.whatsappHref}
            className="flex items-center justify-center bg-ink pb-[max(22px,env(safe-area-inset-bottom))] pt-5 font-body font-semibold text-paper"
          >
            {t("whatsapp")}
          </a>
          <SectionLink
            hash="contacto"
            className="flex items-center justify-center bg-signal pb-[max(22px,env(safe-area-inset-bottom))] pt-5 font-body font-semibold text-ink"
          >
            {t("quote")}
          </SectionLink>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
