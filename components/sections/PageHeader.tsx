import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { Tape } from "@/components/ui/Tape";

/** Inner-page header: one H1 cut in like the home hero, with a breadcrumb back home. */
export function PageHeader({
  title,
  home,
  current,
  tape,
}: {
  title: string;
  home: string;
  current: string;
  tape: string;
}) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="wrap pb-6 pt-8 md:pt-12 lg:pt-16">
        <nav
          aria-label="Breadcrumb"
          className="load-roll text-caption text-ink-soft"
          style={{ "--d": "0ms" } as CSSProperties}
        >
          <ol className="flex gap-2">
            <li>
              <Link
                href="/"
                className="underline decoration-1 underline-offset-2 hover:text-ink"
              >
                {home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {current}
            </li>
          </ol>
        </nav>
        <h1
          className="load-roll mt-5 max-w-[18ch] font-display text-h2 font-black leading-[0.9] md:mt-7"
          style={{ "--d": "140ms" } as CSSProperties}
        >
          {title}
        </h1>
      </div>
      <div
        aria-hidden
        className="load-tape pointer-events-none absolute -right-10 top-10 w-[260px] md:w-[380px]"
        style={{ "--d": "520ms" } as CSSProperties}
      >
        <Tape print={tape} className="h-9 rotate-[6deg] md:h-10" />
      </div>
    </section>
  );
}
