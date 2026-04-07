"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

type PropertyType = "villas" | "shops" | "land";

type PropertyOption = {
  id: PropertyType;
  title: string;
  subtitle: string;
  imageSrc: string;
  overlay: string;
  iconAccentClassName: string;
  icon: React.ReactNode;
};

const OPTIONS: PropertyOption[] = [
  {
    id: "villas",
    title: "فلل",
    subtitle: "إطلالات ومساحات رحبة",
    imageSrc: "/images/property-villas.svg",
    overlay:
      "linear-gradient(180deg, rgba(17,65,71,0.55) 0%, rgba(17,65,71,0.35) 55%, rgba(17,65,71,0.65) 100%)",
    iconAccentClassName: "bg-secondary/14 text-secondary ring-secondary/25",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 11.25 12 4l9 7.25V20a1 1 0 0 1-1 1h-4.5v-6.25a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1V21H4a1 1 0 0 1-1-1v-8.75Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "shops",
    title: "محلات",
    subtitle: "مواقع تجارية واعدة",
    imageSrc: "/images/property-shops.svg",
    overlay:
      "linear-gradient(180deg, rgba(17,65,71,0.42) 0%, rgba(37,94,96,0.28) 55%, rgba(17,65,71,0.70) 100%)",
    iconAccentClassName: "bg-background/10 text-background ring-background/15",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M4 9h16l-1.2 10.2A2 2 0 0 1 16.82 21H7.18a2 2 0 0 1-1.98-1.8L4 9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 12v6M15 12v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "land",
    title: "أراضي",
    subtitle: "فرص استثمارية مرنة",
    imageSrc: "/images/property-land.svg",
    overlay:
      "linear-gradient(180deg, rgba(11,46,50,0.40) 0%, rgba(17,65,71,0.25) 55%, rgba(11,46,50,0.72) 100%)",
    iconAccentClassName: "bg-secondary/10 text-secondary ring-secondary/20",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 17.5 9.5 14l5 3 5.5-3.5V6.5L14.5 10 9.5 7 4 10.5v7Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function PropertySelectionSection({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <section className={cn("bg-background py-20 lg:py-28", className)} aria-label="Property type selection">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight text-primary lg:text-4xl">اختر ما يناسبك</h2>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {OPTIONS.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => router.push(`/select?type=${opt.id}`)}
              className={cn(
                "group relative overflow-hidden rounded-3xl text-right radius-lux",
                "bg-primary text-background",
                "ring-1 ring-secondary/25",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60",
                "animate-hero-in-up motion-reduce:animate-none",
                i === 0 ? "" : i === 1 ? "delay-75" : "delay-150",
                "transition will-change-transform hover:-translate-y-1 hover:shadow-lux-soft active:scale-[0.99]",
              )}
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
                <div
                  className="absolute -inset-x-16 -top-24 h-72 rotate-6 opacity-0 transition duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px 240px at 50% 50%, rgba(147, 122, 99, 0.28), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="relative flex h-full min-h-[252px] flex-col justify-between p-8">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 backdrop-blur-sm",
                      opt.iconAccentClassName,
                    )}
                  >
                    {opt.icon}
                  </div>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background ring-1 ring-background/15 transition group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                </div>

                <div className="mt-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight">{opt.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-background/75">{opt.subtitle}</p>

                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
                    <span className="h-px w-10 bg-secondary/60" aria-hidden="true" />
                    ابدأ
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-background/0 transition duration-700 group-hover:ring-background/10 group-hover:glow-border"
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

