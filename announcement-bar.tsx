"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type AnnouncementSlide = {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
  href?: string;
};

type AnnouncementBarProps = {
  className?: string;
  slides?: AnnouncementSlide[];
  intervalMs?: number;
};

export function AnnouncementBar({
  className,
  slides = [
    {
      imageSrc: "/images/hero.svg",
      imageAlt: "حي الملتقى",
      title: "إطلاق قريبًا",
      description: "سجّل اهتمامك للحصول على أولوية الاختيار.",
      href: "/#interest",
    },
  ],
  intervalMs = 5000,
}: AnnouncementBarProps) {
  const [open, setOpen] = useState(true);

  const safeSlides = slides.length > 0 ? slides : [];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const slide = safeSlides[index % safeSlides.length];

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const t = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % safeSlides.length);
        setFade(false);
      }, 220);
    }, intervalMs);

    return () => window.clearInterval(t);
  }, [intervalMs, safeSlides.length]);

  const Wrapper: "a" | "div" = slide?.href ? "a" : "div";
  const wrapperProps = useMemo(() => {
    return slide?.href
      ? ({ href: slide.href, className: "min-w-0 flex-1" } as const)
      : ({ className: "min-w-0 flex-1" } as const);
  }, [slide?.href]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white shadow-sm",
        className,
      )}
      role="region"
      aria-label="Announcement"
    >
      <div className="container-page relative">
        <div className="flex items-center gap-3 py-3 sm:gap-4 sm:py-3.5">
          <Wrapper
            {...wrapperProps}
            className={cn(
              wrapperProps.className,
              "group flex min-w-0 items-center gap-3 rounded-xl py-1 transition-colors sm:gap-4",
              slide?.href && "cursor-pointer hover:bg-black/[0.03]",
            )}
          >
            <div className="min-w-0">
              <div
                className={cn(
                  "inline-flex min-w-0 max-w-full flex-wrap items-center gap-x-3 gap-y-1 sm:flex-nowrap",
                  "transition-opacity duration-200",
                  fade ? "opacity-0" : "opacity-100",
                )}
              >
                <span className="text-[11px] font-semibold tracking-[0.22em] text-secondary">
                  {slide.title ?? "إعلان"}
                </span>
                <span className="hidden h-3 w-px bg-foreground/15 sm:inline" aria-hidden="true" />
                <span className="truncate text-sm font-medium text-foreground sm:text-base">
                  {slide.description ?? ""}
                </span>
                {slide?.href ? (
                  <span
                    aria-hidden="true"
                    className="hidden text-secondary transition group-hover:-translate-x-0.5 sm:inline"
                  >
                    ←
                  </span>
                ) : null}
              </div>
            </div>
          </Wrapper>

          <div className="ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            {slide?.href ? (
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary ring-1 ring-primary/10 sm:hidden"
              >
                ←
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/50 ring-1 ring-black/[0.08] transition hover:bg-black/[0.04] hover:text-foreground"
              aria-label="إغلاق"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
        </div>

        {safeSlides.length > 1 ? (
          <div className="absolute inset-x-0 bottom-0 h-px bg-black/[0.06]" aria-hidden="true">
            <div
              key={index}
              className="h-full w-full origin-right bg-secondary/70 animate-announcement-progress motion-reduce:animate-none"
              style={{ animationDuration: `${intervalMs}ms` }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
