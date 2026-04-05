"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/cn";
import { getSiteMessages } from "@/lib/site-i18n";

const PLAN_SRC = "/images/master-plan.jpg";
const PLAN_W = 1179;
const PLAN_H = 726;

export function MasterPlanSection({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const t = getSiteMessages(lang);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen]);

  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden bg-[linear-gradient(180deg,var(--page-background)_0%,rgba(17,65,71,0.04)_45%,var(--page-background)_100%)] py-14 lg:py-20",
          className,
        )}
        aria-labelledby="master-plan-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(900px 480px at 50% 20%, rgba(147,122,99,0.18), transparent 65%)",
          }}
        />

        <Container className="relative">
          <header className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.22em] text-secondary">{t.selectBrand}</p>
            <h2
              id="master-plan-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-primary lg:text-4xl"
            >
              {t.masterPlanTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral sm:text-base">{t.masterPlanSubtitle}</p>
          </header>

          <div className="mx-auto max-w-6xl px-1 sm:px-4 [perspective:1600px]">
            <div className="pb-10 pt-2">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className={cn(
                  "group relative mx-auto block w-full max-w-[min(100%,1180px)] cursor-zoom-in text-start",
                  "[transform-style:preserve-3d] transition-transform duration-700 ease-out",
                  "hover:[transform:rotateX(5deg)_translateY(-6px)_scale(1.01)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2",
                )}
                aria-label={`${t.masterPlanExpand} — ${t.masterPlanAlt}`}
              >
                <span className="sr-only">{t.masterPlanExpand}</span>
                <span
                  className="relative block rounded-[1.65rem] p-[3px] shadow-[0_42px_90px_-25px_rgba(0,0,0,0.55)]"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(17,65,71,0.95) 0%, rgba(147,122,99,0.92) 42%, rgba(11,46,50,0.98) 100%)",
                  }}
                >
                  <span className="block rounded-[1.45rem] bg-[#f4f4f2] p-2 sm:p-3">
                    <span className="relative block overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.08]">
                      <Image
                        src={PLAN_SRC}
                        alt={t.masterPlanAlt}
                        width={PLAN_W}
                        height={PLAN_H}
                        className="h-auto w-full object-contain"
                        sizes="(min-width: 1024px) 1100px, 92vw"
                        priority
                      />
                    </span>
                  </span>
                </span>
                <span
                  className="mt-4 block text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary/55"
                  aria-hidden="true"
                >
                  {t.masterPlanExpand}
                </span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {zoomOpen ? (
        <div
          className="fixed inset-0 z-[120] flex flex-col bg-black/88 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t.masterPlanAlt}
        >
          <div className="flex shrink-0 justify-end pb-2">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
            >
              {t.masterPlanClose}
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="mx-auto max-w-7xl">
              <Image
                src={PLAN_SRC}
                alt={t.masterPlanAlt}
                width={PLAN_W}
                height={PLAN_H}
                className="mx-auto h-auto w-full max-w-full object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
