import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { Wipe } from "@/components/motion/Wipe";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";

const SERVICE_IDS = [
  "pisos",
  "comunidades",
  "fachadas",
  "pisos",
  "comercios",
  "obra-grande",
];

export function Footer() {
  const t = useTranslations("footer");
  const serviceLinks = t.raw("serviceLinks") as string[];

  return (
    <PaintedSection
      tone="night"
      as="footer"
      id="pie"
      className="on-dark text-paper"
    >
      <div className="wrap pb-36 pt-[72px] md:pb-24 lg:pt-24">
        <Wipe direction="x" duration={0.9} amount={0.5}>
          <p
            aria-hidden
            className="fit-signoff whitespace-nowrap font-stencil font-black uppercase leading-[0.84] text-paper"
          >
            <span className="block md:inline">
              {t("signoff").split(" ")[0]}{" "}
            </span>
            <span className="block md:inline">
              {t("signoff").split(" ").slice(1).join(" ")}
            </span>
          </p>
        </Wipe>

        <div className="mt-14 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-8 lg:col-span-3">
            <Logo variant="paper" className="w-[150px] md:w-[180px]" />
            <a
              href={site.obrelierUrl}
              rel="noopener"
              target="_blank"
              className="inline-flex w-fit items-baseline gap-2.5 bg-ob-bg px-3.5 py-3 shadow-[inset_0_0_0_1px_var(--ob-amber)] transition-colors hover:bg-ob-surface"
            >
              <span className="text-caption text-paper/80">
                {t("obrelier")}
              </span>
              <span className="font-syne text-[1.125rem] font-bold leading-none text-ob-amber">
                Obrelier
              </span>
            </a>
          </div>

          <FooterCol title={t("contact")} className="lg:col-span-3">
            <a
              href={`tel:${site.phoneHref}`}
              className="w-fit hover:text-signal"
            >
              <span className="mr-2 text-caption text-paper/50">
                {t("office")}
              </span>
              {site.phoneDisplay}
            </a>
            <a href={site.whatsappHref} className="w-fit hover:text-signal">
              <span className="mr-2 text-caption text-paper/50">WhatsApp</span>
              {site.whatsappDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="w-fit hover:text-signal"
            >
              {site.email}
            </a>
            <address className="mt-4 not-italic text-paper/80">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.locality},{" "}
              {site.address.region}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="w-fit text-small underline decoration-paper/30 decoration-2 underline-offset-4 hover:decoration-signal"
            >
              {t("directions")}
            </a>
          </FooterCol>

          <FooterCol title={t("areas")} className="lg:col-span-3 lg:pr-4">
            <span>{t("areasCity")}</span>
            <span>{t("areasMetro")}</span>
          </FooterCol>

          <FooterCol title={t("services")} className="lg:col-span-3">
            {serviceLinks.map((label, i) => (
              <Link
                key={label}
                href={{ pathname: "/servicios", hash: SERVICE_IDS[i] }}
                className="w-fit hover:text-signal"
              >
                {label}
              </Link>
            ))}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-paper/15 pt-6 text-caption text-paper/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span>{t("rights")}</span>
            <span>{t("legal")}</span>
            <span>{t("privacy")}</span>
            <span>{t("cookies")}</span>
          </div>
          <div className="flex items-center justify-between gap-8 md:justify-end">
            <a
              href={site.credit.url}
              target="_blank"
              rel="noopener"
              className="text-paper/50 transition-colors hover:text-paper"
            >
              {t("credit")} {site.credit.name}
            </a>
            <LanguageSwitch tone="paper" />
          </div>
        </div>
      </div>
    </PaintedSection>
  );
}

function FooterCol({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-caption text-paper/60">{title}</h2>
      <div className="mt-3 flex flex-col gap-2 text-body text-paper">
        {children}
      </div>
    </div>
  );
}
