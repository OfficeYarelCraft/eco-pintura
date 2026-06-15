"use client";

import { m, useScroll, useTransform } from "motion/react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { stagger, fadeUp } from "@/lib/motion";

const navItems = [
  { key: "home" as const, href: "/", anchor: "#inicio" },
  { key: "services" as const, href: "/servicios", anchor: "#servicios" },
  { key: "process" as const, href: "/#proceso", anchor: "#proceso" },
  { key: "projects" as const, href: "/proyectos", anchor: "#proyectos" },
  { key: "about" as const, href: "/#nosotros", anchor: "#nosotros" },
  { key: "contact" as const, href: "/contacto", anchor: "#contacto" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 120], [1, 0.85]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  const isHome = pathname === "/";

  const getHref = (item: (typeof navItems)[number]) => {
    if (isHome) return item.anchor;
    if (item.href.startsWith("/#")) return `/${item.anchor}`;
    return item.href;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0.5 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-bg/80 shadow-brand-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4 lg:px-8"
      >
        <Link aria-label={t("home")} className="shrink-0" href="/">
          <m.div style={{ scale: logoScale }}>
            <Logo className="h-8 w-auto sm:h-10 md:h-11" />
          </m.div>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                className="rounded-pill px-3 py-2 text-step--1 font-medium text-ink-soft transition-colors hover:bg-bg-soft hover:text-ink focus-visible:focus-ring"
                href={getHref(item)}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <Link href={isHome ? "#contacto" : "/contacto"}>
              {t("quote")}
            </Link>
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger
              aria-label="Open menu"
              className="rounded-pill p-2 text-ink focus-visible:focus-ring"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <m.ul
                animate="show"
                className="mt-16 flex flex-col gap-2"
                initial="hidden"
                variants={stagger(0.08, 0.1)}
              >
                {navItems.map((item) => (
                  <m.li key={item.key} variants={fadeUp}>
                    <Link
                      className="block rounded-lg-brand px-2 py-3 font-display text-step-2 text-ink hover:bg-bg-soft"
                      href={getHref(item)}
                      onClick={() => setOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  </m.li>
                ))}
                <m.li className="pt-4" variants={fadeUp}>
                  <Button asChild className="w-full">
                    <Link href="/contacto" onClick={() => setOpen(false)}>
                      {t("quote")}
                    </Link>
                  </Button>
                </m.li>
              </m.ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
