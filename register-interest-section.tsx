"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/cn";
import type { PublicLandCard } from "@/lib/public-catalog";
import { getSiteMessages } from "@/lib/site-i18n";

type PropertyType = "villas" | "land";

type PropertyOption = {
  id: string;
  kind: PropertyType;
  title: string;
  subtitle: string;
  imageSrc: string;
  overlay: string;
  landId?: string;
};

const OVERLAYS: Record<PropertyType, string> = {
  villas:
    "linear-gradient(180deg, rgba(17,65,71,0.55) 0%, rgba(17,65,71,0.35) 55%, rgba(17,65,71,0.65) 100%)",
  land:
    "linear-gradient(180deg, rgba(11,46,50,0.40) 0%, rgba(17,65,71,0.25) 55%, rgba(11,46,50,0.72) 100%)",
};

type SectionProps = { landOfferings: PublicLandCard[]; className?: string };

export function RegisterInterestSection({ landOfferings, className }: SectionProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = getSiteMessages(lang);
  const [open, setOpen] = useState(true);

  const options = useMemo<PropertyOption[]>(() => {
    const m = getSiteMessages(lang);
    const villaCard: PropertyOption = {
      id: "villas",
      kind: "villas",
      title: m.villasTitle,
      subtitle: m.villasSubtitle,
      imageSrc: "/images/property-villas.svg",
      overlay: OVERLAYS.villas,
    };
    const landCards: PropertyOption[] =
      landOfferings.length > 0
        ? landOfferings.map((l) => ({
            id: l.id,
            kind: "land" as const,
            title: lang === "ar" ? l.titleAr : l.titleEn,
            subtitle: lang === "ar" ? l.subtitleAr : l.subtitleEn,
            imageSrc: l.imageSrc,
            overlay: l.overlayCss ?? OVERLAYS.land,
            landId: l.id,
          }))
        : [
            {
              id: "land-default",
              kind: "land",
              title: m.landTitle,
              subtitle: m.landSubtitle,
              imageSrc: "/images/property-land.svg",
              overlay: OVERLAYS.land,
            },
          ];
    return [villaCard, ...landCards];
  }, [lang, landOfferings]);

  return (
    <section
      id="interest"
      className={cn("bg-background py-20 lg:py-28", className)}
      aria-label={t.registerTitle}
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary lg:text-4xl">{t.registerTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral sm:text-base">{t.registerSubtitle}</p>

          <div className="mt-10 w-full">
            <div className="relative overflow-hidden rounded-[28px] bg-white p-4 ring-1 ring-black/[0.06] shadow-lux-soft sm:p-6">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl bg-background/70 px-4 py-3 text-start ring-1 ring-black/[0.05] transition hover:bg-background/85"
                aria-expanded={open}
              >
                <div>
                  <div className="text-sm font-semibold text-primary">{t.registerCtaTitle}</div>
                  <div className="mt-0.5 text-xs font-semibold tracking-[0.18em] text-secondary">
                    {t.registerCtaSubtitle}
                  </div>
                </div>

                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary ring-1 ring-primary/10 transition",
                    open ? "rotate-0" : "-rotate-90",
                  )}
                  aria-hidden="true"
                >
                  ←
                </span>
              </button>

              <div
                className={cn(
                  "mt-6 overflow-hidden transition-all duration-500 ease-in-out",
                  open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0",
                )}
                aria-hidden={!open}
              >
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
                  {options.map((opt, i) => (
                    <button
                      key={opt.kind === "villas" ? "villas" : opt.id}
                      type="button"
                      onClick={() => {
                        if (opt.kind === "villas") {
                          router.push(`/select?type=villas&from=interest`);
                        } else if (opt.landId) {
                          router.push(`/select?type=land&landId=${opt.landId}&from=interest`);
                        } else {
                          router.push(`/select?type=land&from=interest`);
                        }
                      }}
                      className={cn(
                        "group relative overflow-hidden rounded-3xl text-start radius-lux",
                        "bg-primary text-background",
                        "ring-1 ring-secondary/25",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60",
                        "animate-hero-in-up motion-reduce:animate-none",
                        i === 0 ? "" : i === 1 ? "delay-75" : "delay-150",
                        "transition will-change-transform hover:-translate-y-1 hover:shadow-lux-soft active:scale-[0.99]",
                      )}
                      aria-label={`${t.registerAriaChoose} ${opt.title}`}
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={opt.imageSrc}
                          alt=""
                          fill
                          className="object-cover opacity-70 transition duration-700 group-hover:opacity-85 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          priority={i === 0}
                        />
                        <div
                          className="absolute inset-0 transition duration-700 group-hover:opacity-95"
                          style={{ background: opt.overlay }}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="relative flex min-h-[252px] flex-col justify-between p-8">
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background/10 text-background ring-1 ring-background/15">
                            ←
                          </span>
                        </div>

                        <div className="mt-10">
                          <h3 className="text-2xl font-semibold tracking-tight">{opt.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-background/75">{opt.subtitle}</p>
                          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
                            <span className="h-px w-10 bg-secondary/60" aria-hidden="true" />
                            {t.registerStart}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
