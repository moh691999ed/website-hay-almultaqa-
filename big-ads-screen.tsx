"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/cn";
import { getSiteMessages } from "@/lib/site-i18n";

/* eslint-disable @next/next/no-img-element */

type BigAdsScreenProps = {
  className?: string;
};

export function BigAdsScreen({ className }: BigAdsScreenProps) {
  const { lang } = useLanguage();
  const slides = useMemo(() => {
    const t = getSiteMessages(lang);
    return t.adAlts.map((alt, i) => ({
      imageSrc: `/images/ads/ad-${i + 1}.png`,
      imageAlt: alt,
    }));
  }, [lang]);

  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function preload() {
      await Promise.all(
        slides.map(
          (s) =>
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = s.imageSrc;
            }),
        ),
      );
      if (!cancelled) setIsReady(true);
    }
    setIsReady(false);
    preload();
    return () => {
      cancelled = true;
    };
  }, [slides]);

  useEffect(() => {
    if (!isReady || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [isReady, slides.length]);

  const slide = slides[index] ?? slides[0];

  return (
    <section
      className={cn(
        "relative w-full border-b border-black/[0.06] bg-black/[0.02]",
        className,
      )}
      aria-label="Advertisements"
    >
      <div className="container-page py-4 sm:py-6">
        <div className="relative mx-auto aspect-[21/9] w-full max-w-6xl overflow-hidden rounded-2xl bg-black/[0.04] ring-1 ring-black/[0.06] sm:aspect-[2.4/1]">
          {!isReady ? (
            <div className="absolute inset-0 animate-pulse bg-black/[0.06]" aria-hidden="true" />
          ) : null}
          {slide ? (
            <img
              key={slide.imageSrc}
              src={slide.imageSrc}
              alt={slide.imageAlt}
              className="h-full w-full object-contain transition-opacity duration-500 ease-in-out"
              draggable={false}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
