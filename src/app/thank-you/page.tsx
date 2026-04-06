"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/contexts/language-context";
import { getSiteMessages } from "@/lib/site-i18n";

export default function ThankYouPage() {
  const { lang } = useLanguage();
  const t = getSiteMessages(lang);

  return (
    <main className="bg-background min-h-[calc(100vh-5rem)]">
      <div className="container-page py-14 lg:py-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] bg-white ring-1 ring-black/[0.06] shadow-lux-soft">
          <div
            className="relative overflow-hidden p-8 sm:p-12"
            style={{
              background:
                "radial-gradient(900px 360px at 50% -10%, rgba(17,65,71,0.16), transparent 60%), radial-gradient(520px 260px at 25% 40%, rgba(147,122,99,0.22), transparent 70%)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/al-multaqa-logo.png"
                alt={t.heroLogoAlt}
                width={520}
                height={260}
                priority
                className="h-auto w-full max-w-[520px] object-contain"
              />

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                {t.thankTitle}
              </h1>

              <p className="mt-4 text-lg font-semibold tracking-[0.06em] text-primary/75 sm:text-xl">
                {t.thankSlogan}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-primary px-8 py-4 text-sm font-semibold text-background shadow-lux-soft transition hover:-translate-y-0.5 hover:bg-accent active:scale-[0.99]"
                >
                  {t.thankBack}
                </Link>

                <Link
                  href="/#interest"
                  className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary ring-1 ring-primary/15 transition hover:bg-primary/5 active:scale-[0.99]"
                >
                  {t.thankEdit}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
