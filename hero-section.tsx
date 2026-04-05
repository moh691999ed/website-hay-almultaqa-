"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/cn";
import { getSiteMessages } from "@/lib/site-i18n";

type HeroSectionProps = {
  className?: string;
  backgroundImageSrc?: string;
};

function AnimatedNumber({
  target,
  start,
  durationMs = 1400,
  formatter,
}: {
  target: number;
  start: boolean;
  durationMs?: number;
  formatter?: (n: number) => string;
}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setValue(target);
      return;
    }

    const startAt = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - startAt;
      const t = Math.min(1, elapsed / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (target - from) * eased);
      setValue(next);

      if (t < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [durationMs, start, target]);

  const fmt = formatter ?? ((n: number) => String(n));
  return <>{fmt(value)}</>;
}

export function HeroSection({
  className,
  backgroundImageSrc = "/images/hero.svg",
}: HeroSectionProps) {
  const { lang } = useLanguage();
  const t = getSiteMessages(lang);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsStart, setStatsStart] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setStatsStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={cn("relative min-h-screen overflow-hidden bg-primary", className)}
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-primary/65" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,65,71,0.92) 0%, rgba(17,65,71,0.55) 35%, rgba(17,65,71,0.08) 70%, rgba(17,65,71,0) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 560px at 50% 34%, rgba(147, 122, 99, 0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 animate-light-sweep motion-reduce:animate-none motion-reduce:opacity-0"
        style={{
          background:
            "radial-gradient(520px 220px at 55% 35%, rgba(248,248,246,0.12), transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(248,248,246,0.14) 0 1px, transparent 1px 10px)",
        }}
        aria-hidden="true"
      />

      <Container className="relative flex min-h-screen items-center justify-center py-20 lg:py-28">
        <div className="text-center animate-hero-in motion-reduce:animate-none">
          <div className="inline-flex flex-col items-center gap-6 rounded-[1.75rem] bg-white p-6 shadow-lux-soft ring-1 ring-black/[0.06] sm:p-8 lg:p-10">
            <h1 className="m-0 flex justify-center animate-hero-in-up motion-reduce:animate-none">
              <span className="radius-lux inline-block bg-transparent">
                <Image
                  src="/images/al-multaqa-logo.png"
                  alt={t.heroLogoAlt}
                  width={640}
                  height={336}
                  priority
                  className="h-auto w-full max-w-[min(88vw,560px)] object-contain sm:max-w-xl lg:max-w-2xl"
                />
              </span>
            </h1>

            <p className="mx-auto max-w-xl -mt-3 text-lg leading-7 tracking-[0.04em] text-primary/80 sm:text-xl animate-hero-in-up delay-150 motion-reduce:animate-none">
              {t.heroSlogan}
            </p>

            {/* معرض تصميمات عن المشروع */}
            <div className="mt-10 w-full animate-hero-in-up delay-300 motion-reduce:animate-none" dir="ltr">
              <div className="flex w-full items-start justify-center gap-6">
                {/* يسار: 3 صور */}
                <div className="flex flex-col gap-4">
                  <div className="relative h-[116px] w-[170px] overflow-hidden rounded-[1.5rem] bg-background/40 ring-1 ring-black/[0.06] sm:h-[138px] sm:w-[200px]">
                    <Image
                      src="/images/gallery-exhibit/gallery-left-1.png"
                      alt={t.heroGalleryAlt}
                      fill
                      className="object-contain p-2"
                      sizes="(min-width: 640px) 200px, 170px"
                    />
                  </div>
                  <div className="relative h-[116px] w-[170px] overflow-hidden rounded-[1.5rem] bg-background/40 ring-1 ring-black/[0.06] sm:h-[138px] sm:w-[200px]">
                    <Image
                      src="/images/gallery-exhibit/gallery-left-2.png"
                      alt={t.heroGalleryAlt}
                      fill
                      className="object-contain p-2"
                      sizes="(min-width: 640px) 200px, 170px"
                    />
                  </div>
                </div>

                {/* الوسط: صورة كبيرة */}
                <div className="relative h-[250px] w-[280px] overflow-hidden rounded-[1.75rem] bg-background/60 ring-1 ring-black/[0.06] sm:h-[310px] sm:w-[360px]">
                  <Image
                    src="/images/gallery-exhibit/gallery-big.png"
                    alt={t.heroGalleryAlt}
                    fill
                    className="object-contain p-3"
                    sizes="(min-width: 1024px) 360px, 280px"
                    priority
                  />
                </div>

                {/* يمين: 2 صور */}
                <div className="flex flex-col gap-4">
                  <div className="relative h-[116px] w-[170px] overflow-hidden rounded-[1.5rem] bg-background/40 ring-1 ring-black/[0.06] sm:h-[138px] sm:w-[200px]">
                    <Image
                      src="/images/gallery-exhibit/gallery-right-1.png"
                      alt={t.heroGalleryAlt}
                      fill
                      className="object-contain p-2"
                      sizes="(min-width: 640px) 200px, 170px"
                    />
                  </div>
                  <div className="relative h-[116px] w-[170px] overflow-hidden rounded-[1.5rem] bg-background/40 ring-1 ring-black/[0.06] sm:h-[138px] sm:w-[200px]">
                    <Image
                      src="/images/gallery-exhibit/gallery-right-2.png"
                      alt={t.heroGalleryAlt}
                      fill
                      className="object-contain p-2"
                      sizes="(min-width: 640px) 200px, 170px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* الإحصائيات */}
            <div
              ref={statsRef}
              className="mt-8 w-full animate-hero-in-up delay-450 motion-reduce:animate-none"
            >
              <div className="mb-4 text-center">
                <div className="text-xs font-semibold tracking-[0.22em] text-secondary">{t.statsTitle}</div>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-background/70 p-5 ring-1 ring-black/[0.06] shadow-lux-soft">
                  <div className="text-4xl font-semibold tabular-nums text-primary">
                    <AnimatedNumber target={154} start={statsStart} />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-primary/80">{t.statVillas}</div>
                </div>
                <div className="rounded-3xl bg-background/70 p-5 ring-1 ring-black/[0.06] shadow-lux-soft">
                  <div className="text-4xl font-semibold tabular-nums text-primary">
                    <AnimatedNumber target={154} start={statsStart} />
                  </div>
                  <div className="mt-1 text-sm font-semibold text-primary/80">{t.statLands}</div>
                </div>
                <div className="rounded-3xl bg-background/70 p-5 ring-1 ring-black/[0.06] shadow-lux-soft">
                  <div className="flex flex-wrap items-start justify-center gap-1.5 sm:gap-2">
                    <div className="text-2xl font-semibold leading-none tabular-nums text-primary min-[420px]:text-3xl sm:text-4xl">
                      <AnimatedNumber target={289762} start={statsStart} durationMs={2000} />
                    </div>
                    <div className="flex items-start gap-1">
                      <div className="mt-2 text-2xl font-semibold leading-none text-primary">{t.statThousand}</div>
                      <div className="mt-4 text-lg font-semibold leading-none text-primary">
                        {t.statM2}
                        <sup className="text-[0.65em]">2</sup>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-primary/80">{t.statTotalArea}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

