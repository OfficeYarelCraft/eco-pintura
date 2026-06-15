"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { placeholders } from "@/lib/placeholders";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const services = useTranslations("services");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pt-16 text-white">
      <div aria-hidden className="absolute inset-x-0 -top-6 h-12 overflow-hidden">
        <svg className="w-full text-ink" preserveAspectRatio="none" viewBox="0 0 1440 48">
          <path
            d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-10 brightness-0 invert" variant="default" />
            <p className="mt-4 text-step--1 text-white/70">{t("tagline")}</p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <h3 className="font-display text-step-1 font-semibold">{t("links")}</h3>
            <ul className="mt-4 space-y-2 text-step--1 text-white/70">
              {(["home", "services", "process", "projects", "about", "contact"] as const).map(
                (key) => (
                  <li key={key}>
                    <Link
                      className="hover:text-white focus-visible:focus-ring"
                      href={key === "home" ? "/" : `/#${key === "services" ? "servicios" : key === "process" ? "proceso" : key === "projects" ? "proyectos" : key === "about" ? "nosotros" : "contacto"}`}
                    >
                      {nav(key)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-step-1 font-semibold">{t("servicesTitle")}</h3>
            <ul className="mt-4 space-y-2 text-step--1 text-white/70">
              {(["interior", "exterior", "commercial", "consulting"] as const).map((key) => (
                <li key={key}>{services(`${key}.title`)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-step-1 font-semibold">{t("contactTitle")}</h3>
            <ul className="mt-4 space-y-3 text-step--1 text-white/70">
              <li className="flex items-center gap-2">
                <Phone aria-hidden className="h-4 w-4" />
                <a href="tel:{{PHONE}}">{`{{PHONE}}`}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail aria-hidden className="h-4 w-4" />
                <a href="mailto:{{EMAIL}}">{`{{EMAIL}}`}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{`{{ADDRESS}}`}</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <SocialLink href="{{SOCIAL_INSTAGRAM}}" icon={Instagram} label="Instagram" />
              <SocialLink href="{{SOCIAL_FACEBOOK}}" icon={Facebook} label="Facebook" />
              <SocialLink href="{{SOCIAL_LINKEDIN}}" icon={Linkedin} label="LinkedIn" />
            </div>

            <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                aria-label={t("newsletter")}
                className="flex-1 rounded-pill border border-white/20 bg-white/10 px-4 py-2 text-step--1 text-white placeholder:text-white/50 focus-visible:focus-ring"
                placeholder={t("newsletterPlaceholder")}
                type="email"
              />
              <button
                className="rounded-pill bg-grad-paint px-4 py-2 text-step--1 font-semibold focus-visible:focus-ring"
                type="submit"
              >
                {t("newsletterButton")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-step--1 text-white/50 sm:flex-row">
          <p>
            © {year} Eco Pintura. {t("rights")}
          </p>
          <p>{t("location", { city: placeholders.city })}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:focus-ring"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}
