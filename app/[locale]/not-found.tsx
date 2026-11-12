import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Tape } from "@/components/ui/Tape";

export default function NotFound() {
  const t = useTranslations("notFound");
  const hero = useTranslations("hero");
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="wrap flex min-h-[70svh] flex-col justify-center py-24">
        <p
          aria-hidden
          className="font-stencil text-[clamp(6rem,4rem+12vw,14rem)] font-black leading-[0.8] text-signal"
        >
          404
        </p>
        <h1 className="mt-8 max-w-[16ch] font-display text-h2 font-extrabold">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[30rem] text-lead text-ink-soft">
          {t("body")}
        </p>
        <div className="mt-9">
          <ButtonLink href="/">{t("back")}</ButtonLink>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-24 w-[280px] md:w-[420px]"
      >
        <Tape print={hero("tape")} className="h-10 rotate-[8deg]" />
      </div>
    </section>
  );
}
