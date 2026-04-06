"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/contexts/language-context";
import { getSiteMessages } from "@/lib/site-i18n";

const WHATSAPP_OMAN_LINKS = [
  { tel: "96871113723", display: "71113723" },
  { tel: "96871113742", display: "71113742" },
] as const;

function whatsappHref(telE164Digits: string) {
  return `https://wa.me/${telE164Digits}`;
}

function telHref(telE164Digits: string) {
  return `tel:+${telE164Digits}`;
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.04 2C6.52 2 2.03 6.5 2.03 12.02c0 1.78.47 3.44 1.35 4.88L2 22l5.2-1.35c1.4.76 2.98 1.16 4.64 1.16 5.51 0 10-4.5 10-10.02S17.55 2 12.04 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M20.52 17.22c-.24.65-1.03 1.05-1.76 1.1-.43.03-.86.03-1.29.01-3.08-.14-5.98-1.79-7.87-4.33-1.14-1.53-1.92-3.38-1.98-5.31-.01-.34.02-.68.1-1 .18-.75.92-1.32 1.68-1.35.44-.02.82.13 1.06.49.36.53.71 1.07 1.02 1.63.21.39.25.83.1 1.24-.18.52-.58.88-.84 1.35-.13.24-.1.43.04.66.46.73.99 1.41 1.63 2.01.67.63 1.41 1.17 2.19 1.61.22.12.4.13.6 0 .5-.31.9-.76 1.46-.97.48-.18.96-.12 1.35.16.57.41 1.11.86 1.62 1.33.37.34.49.76.33 1.21Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TopNav() {
  const { lang, setLang } = useLanguage();
  const t = getSiteMessages(lang);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/80 backdrop-blur">
      <div className="container-page py-3">
        <div className="flex items-center">
          <div className="shrink-0">
            <Link href="/" aria-label={t.heroLogoAlt}>
              <Image
                src="/images/al-multaqa-logo.png"
                alt={t.heroLogoAlt}
                width={84}
                height={44}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-primary transition hover:text-secondary"
            >
              {t.navHome}
            </Link>

            <Link
              href="/#interest"
              className="text-sm font-semibold text-primary transition hover:text-secondary"
            >
              {t.navRegister}
            </Link>

            <div
              className="inline-flex max-w-[min(100%,18rem)] flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:max-w-none"
              role="group"
              aria-label={t.navContact}
            >
              <a
                href={whatsappHref(WHATSAPP_OMAN_LINKS[0].tel)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-secondary"
                aria-label={
                  lang === "ar"
                    ? `واتساب — ${WHATSAPP_OMAN_LINKS[0].display}`
                    : `WhatsApp — ${WHATSAPP_OMAN_LINKS[0].display}`
                }
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary ring-1 ring-primary/10 hover:bg-primary/10">
                  <WhatsAppIcon />
                </span>
                <span className="hidden sm:inline">{t.navContact}</span>
              </a>
              <span
                className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tabular-nums text-primary sm:text-sm"
                dir="ltr"
              >
                {WHATSAPP_OMAN_LINKS.map((item, i) => (
                  <span key={item.tel} className="inline-flex items-center gap-1">
                    {i > 0 ? (
                      <span className="select-none text-primary/35" aria-hidden="true">
                        –
                      </span>
                    ) : null}
                    <a
                      href={telHref(item.tel)}
                      className="rounded-md px-1 py-0.5 underline-offset-2 transition hover:text-secondary hover:underline"
                      aria-label={
                        lang === "ar"
                          ? `اتصال هاتفي — ${item.display}`
                          : `Call — ${item.display}`
                      }
                    >
                      {item.display}
                    </a>
                    <a
                      href={whatsappHref(item.tel)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E] ring-1 ring-[#25D366]/30 transition hover:bg-[#25D366]/28"
                      aria-label={
                        lang === "ar"
                          ? `واتساب — ${item.display}`
                          : `WhatsApp — ${item.display}`
                      }
                    >
                      <WhatsAppIcon />
                    </a>
                  </span>
                ))}
              </span>
            </div>
          </nav>

          <div className="shrink-0 flex items-center gap-2 rounded-full bg-black/[0.03] p-1 ring-1 ring-black/[0.06]">
            <button
              type="button"
              onClick={() => setLang("ar")}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                lang === "ar"
                  ? "bg-primary text-background"
                  : "text-primary hover:bg-primary/5",
              ].join(" ")}
            >
              {t.langAr}
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                lang === "en"
                  ? "bg-primary text-background"
                  : "text-primary hover:bg-primary/5",
              ].join(" ")}
            >
              {t.langEn}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
