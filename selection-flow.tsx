"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/Container";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/cn";
import { mapCatalogForLang } from "@/lib/catalog-flow";
import type { PublicCatalogPayload } from "@/lib/public-catalog";
import { getSiteMessages, typeLabel } from "@/lib/site-i18n";

type PropertyType = "villas" | "land";

type StepIndex = 0 | 1 | 2;

type Props = { catalog: PublicCatalogPayload };

export function SelectionFlow({ catalog }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const { lang } = useLanguage();
  const t = getSiteMessages(lang);
  const villaCatalog = useMemo(() => mapCatalogForLang(catalog, lang), [catalog, lang]);
  const firstSlug = catalog.villaTypes[0]?.slug ?? "";
  const stepLabels = useMemo(() => {
    const m = getSiteMessages(lang);
    return [m.stepPropertyType, m.stepVillaType, m.stepYourDetails] as const;
  }, [lang]);

  const rawType = sp.get("type");
  const type: PropertyType = rawType === "land" ? "land" : "villas";
  const from = sp.get("from");
  const landIdParam = sp.get("landId");

  const isVillas = type === "villas";

  const activeLand = useMemo(() => {
    if (type !== "land") return null;
    if (landIdParam) {
      const found = catalog.lands.find((l) => l.id === landIdParam);
      if (found) return found;
    }
    return catalog.lands[0] ?? null;
  }, [type, landIdParam, catalog.lands]);

  const [step, setStep] = useState<StepIndex>(
    from === "interest" ? (isVillas ? 1 : 2) : 0,
  );

  const [villaType, setVillaType] = useState<string>(firstSlug);
  const [villaOption, setVillaOption] = useState<"a" | "b">("a");
  const defaultExpanded = useMemo(() => {
    const o: Record<string, "a" | "b" | null> = {};
    for (const v of catalog.villaTypes) o[v.slug] = "a";
    return o;
  }, [catalog.villaTypes]);
  const [expandedOption, setExpandedOption] = useState<Record<string, "a" | "b" | null>>(defaultExpanded);

  useEffect(() => {
    setExpandedOption(defaultExpanded);
  }, [defaultExpanded]);

  useEffect(() => {
    if (villaCatalog.some((v) => v.id === villaType)) return;
    setVillaType(firstSlug || villaCatalog[0]?.id || "");
  }, [villaCatalog, villaType, firstSlug]);
  const [lightbox, setLightbox] = useState<{ open: boolean; images: string[]; index: number }>({
    open: false,
    images: [],
    index: 0,
  });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const canSend = fullName.trim() && email.trim() && phone.trim() && address.trim();

  async function submitLead() {
    if (!canSend) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const propertyType = type === "land" ? "land" : "villas";
      const selectionDetails: Record<string, unknown> = {
        address: address.trim(),
        language: lang,
        propertyCategoryLabel: typeLabel(lang, type),
      };
      if (type === "land" && activeLand) {
        selectionDetails.landOfferingId = activeLand.id;
        selectionDetails.landTitleAr = activeLand.titleAr;
        selectionDetails.landTitleEn = activeLand.titleEn;
      }
      if (type === "villas" && summary.villaType && summary.villaOption) {
        selectionDetails.villaTypeId = summary.villaType.id;
        selectionDetails.villaTypeTitle = summary.villaType.title;
        selectionDetails.villaOptionId = summary.villaOption.id;
        selectionDetails.villaOptionTitle = summary.villaOption.title;
        selectionDetails.villaOptionAreaLabel = summary.villaOption.areaLabel;
        if (summary.villaOption.roomsLabel) {
          selectionDetails.villaOptionRoomsLabel = summary.villaOption.roomsLabel;
        }
        selectionDetails.villaOptionBedrooms = summary.villaOption.bedrooms;
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          propertyType,
          selectionDetails,
        }),
      });

      let body: { ok?: boolean; error?: string; fields?: Record<string, string> };
      try {
        body = (await res.json()) as typeof body;
      } catch {
        setSubmitError(t.submitErrorGeneric);
        return;
      }

      if (!res.ok || !body.ok) {
        if (body.error === "VALIDATION_ERROR" && body.fields && Object.keys(body.fields).length > 0) {
          setSubmitError(Object.values(body.fields).join(" "));
        } else if (body.error === "DB_ERROR") {
          setSubmitError(t.submitErrorDb);
        } else {
          setSubmitError(t.submitErrorGeneric);
        }
        return;
      }

      router.push("/thank-you");
    } catch {
      setSubmitError(t.submitErrorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  const summary = useMemo(() => {
    const v = villaCatalog.find((x) => x.id === villaType) ?? null;
    const o = v?.options.find((x) => x.id === villaOption) ?? null;
    return { type, villaType: v, villaOption: o };
  }, [type, villaOption, villaType, villaCatalog]);

  return (
    <main className="min-h-screen bg-background">
      <Container className="py-14 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-secondary text-sm tracking-wide">{t.selectBrand}</p>
            <h1 className="mt-2 text-3xl font-semibold text-primary lg:text-4xl">{t.selectTitle}</h1>
            <p className="mt-3 text-sm leading-6 text-neutral">{t.selectSubtitle}</p>
          </div>

          <div className="rounded-2xl bg-primary/5 px-5 py-4 ring-1 ring-primary/10">
            <div className="text-xs text-neutral">{t.selectCurrentChoice}</div>
            <div className="mt-1 text-sm font-semibold text-primary">
              {typeLabel(lang, summary.type)}
              {type === "land" && activeLand
                ? ` • ${lang === "ar" ? activeLand.titleAr : activeLand.titleEn}`
                : null}
              {type === "villas" && summary.villaType ? ` • ${summary.villaType.title}` : null}
              {type === "villas" && summary.villaOption ? ` • ${summary.villaOption.title}` : null}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white/60 p-6 ring-1 ring-primary/10 backdrop-blur-sm lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {stepLabels.map((label, i) => {
                const isActive = i === step;
                const isDone = i < step && (isVillas || i !== 1);
                return (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ring-1",
                        isActive
                          ? "bg-primary text-background ring-primary"
                          : isDone
                            ? "bg-secondary/15 text-primary ring-secondary/25"
                            : "bg-background text-neutral ring-primary/10",
                      ].join(" ")}
                    >
                      {i + 1}
                    </div>
                    <div className={isActive ? "text-primary font-semibold" : "text-neutral"}>{label}</div>
                    {i !== stepLabels.length - 1 ? (
                      <span className="h-px w-10 bg-primary/10" aria-hidden="true" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/15 hover:bg-primary/5"
            >
              {t.selectBackHome}
            </button>
          </div>

          <div className="mt-8">
            <div key={step} className="animate-hero-in-up motion-reduce:animate-none">
              {step === 0 && (
                <div>
                  <div className="text-sm font-semibold text-primary">{t.sectionPropertyType}</div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["villas", "land"] as PropertyType[]).map((pty) => {
                      const selected = pty === type;
                      return (
                        <button
                          key={pty}
                          type="button"
                          onClick={() => {
                            if (pty === "land") {
                              const first = catalog.lands[0];
                              const q = first ? `type=land&landId=${first.id}` : "type=land";
                              router.push(`/select?${q}`);
                            } else {
                              router.push(`/select?type=villas`);
                            }
                          }}
                          className={[
                            "rounded-full px-5 py-2 text-sm font-semibold ring-1 transition",
                            selected
                              ? "bg-primary text-background ring-primary"
                              : "bg-background text-primary ring-primary/15 hover:bg-primary/5",
                          ].join(" ")}
                        >
                          {typeLabel(lang, pty)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && isVillas && (
                <div>
                  <div className="text-sm font-semibold text-primary">{t.sectionVillaType}</div>
                  <div className="mt-3 grid gap-4">
                    {villaCatalog.map((vt) => {
                      const selected = vt.id === villaType;
                      const openOpt = expandedOption[vt.id] ?? null;
                      return (
                        <button
                          key={vt.id}
                          type="button"
                          onClick={() => {
                            setVillaType(vt.id);
                            setVillaOption("a");
                            setExpandedOption((m) => ({ ...m, [vt.id]: m[vt.id] ?? "a" }));
                          }}
                          className={[
                            "relative overflow-hidden rounded-[1.75rem] p-4 ring-1 transition",
                            selected
                              ? "bg-primary text-background ring-primary shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                              : "bg-background text-primary ring-primary/15 hover:bg-primary/5",
                          ].join(" ")}
                          aria-label={`${t.registerAriaChoose} ${vt.title}`}
                        >
                          <div className="flex flex-col gap-4 text-start">
                            <div>
                              <div className="text-base font-semibold">{vt.title}</div>
                              <div
                                className={
                                  selected ? "mt-1 text-sm text-background/75" : "mt-1 text-sm text-neutral"
                                }
                              >
                                {vt.description}
                              </div>
                            </div>

                            <div className={selected ? "text-background" : "text-primary"}>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {vt.options.map((opt) => {
                                  const optSelected = selected && opt.id === villaOption;
                                  const optOpen = selected && openOpt === opt.id;
                                  return (
                                    <button
                                      key={`${vt.id}-${opt.id}`}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setVillaType(vt.id);
                                        setVillaOption(opt.id);
                                        setExpandedOption((m) => ({
                                          ...m,
                                          [vt.id]: m[vt.id] === opt.id ? null : opt.id,
                                        }));
                                      }}
                                      className={[
                                        "rounded-3xl p-5 text-start ring-1 transition will-change-transform",
                                        optSelected
                                          ? "bg-secondary/15 text-background ring-secondary/40"
                                          : selected
                                            ? "bg-background/10 text-background ring-background/20 hover:bg-background/15"
                                            : "bg-white text-primary ring-black/[0.08] hover:bg-black/[0.02]",
                                        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.995]",
                                      ].join(" ")}
                                    >
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                          <div className="text-base font-semibold">{opt.title}</div>
                                          <div
                                            className={cn(
                                              "mt-2 flex flex-wrap items-center gap-2",
                                              optOpen ? "opacity-100" : "opacity-90",
                                            )}
                                          >
                                            <span
                                              className={cn(
                                                "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1",
                                                selected
                                                  ? "bg-background/10 text-background ring-background/20"
                                                  : "bg-primary/5 text-primary ring-primary/10",
                                              )}
                                            >
                                              {opt.priceLabel}
                                            </span>
                                            <span
                                              className={cn(
                                                "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1",
                                                selected
                                                  ? "bg-background/10 text-background ring-background/20"
                                                  : "bg-primary/5 text-primary ring-primary/10",
                                              )}
                                            >
                                              {opt.areaLabel}
                                            </span>
                                            <span
                                              className={cn(
                                                "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1",
                                                selected
                                                  ? "bg-background/10 text-background ring-background/20"
                                                  : "bg-primary/5 text-primary ring-primary/10",
                                              )}
                                            >
                                              {opt.roomsLabel ?? t.rooms(opt.bedrooms)}
                                            </span>
                                          </div>
                                        </div>

                                        <span
                                          className={cn(
                                            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 transition",
                                            optOpen
                                              ? "bg-secondary/15 text-secondary ring-secondary/25"
                                              : "bg-primary/5 text-primary ring-primary/10",
                                          )}
                                          aria-hidden="true"
                                        >
                                          {optOpen ? "×" : optSelected ? "✓" : "←"}
                                        </span>
                                      </div>

                                      <div
                                        className={cn(
                                          "grid gap-3 overflow-hidden transition-all duration-500 ease-in-out",
                                          optOpen ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0",
                                        )}
                                        aria-hidden={!optOpen}
                                      >
                                        <div className="grid grid-cols-5 gap-2">
                                          {opt.images.map((src, idx) => (
                                            <button
                                              key={`${vt.id}-${opt.id}-${idx}`}
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setLightbox({ open: true, images: opt.images, index: idx });
                                              }}
                                              className="relative aspect-[1/1] overflow-hidden rounded-2xl bg-black/[0.03] ring-1 ring-black/[0.08] transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                                              aria-label={t.openImage(idx + 1)}
                                            >
                                              <Image src={src} alt="" fill className="object-cover" sizes="60px" />
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="text-sm font-semibold text-primary">{t.sectionYourDetails}</div>
                  <p className="mt-2 text-sm leading-6 text-neutral">{t.yourDetailsHint}</p>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <label className="grid gap-2 lg:col-span-2">
                      <span className="text-sm font-semibold text-primary">{t.labelFullName}</span>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-12 rounded-2xl bg-background px-4 text-base text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                        placeholder={t.placeholderFullName}
                        autoComplete="name"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-semibold text-primary">{t.labelEmail}</span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-2xl bg-background px-4 text-base text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                        placeholder="name@email.com"
                        inputMode="email"
                        autoComplete="email"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-semibold text-primary">{t.labelPhone}</span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 rounded-2xl bg-background px-4 text-base text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                        placeholder={t.placeholderPhone}
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </label>

                    <label className="grid gap-2 lg:col-span-2">
                      <span className="text-sm font-semibold text-primary">{t.labelAddress}</span>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-12 rounded-2xl bg-background px-4 text-base text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                        placeholder={t.placeholderAddress}
                        autoComplete="street-address"
                      />
                    </label>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-primary/5 p-5 ring-1 ring-primary/10">
                    <div className="text-sm font-semibold text-primary">{t.summaryTitle}</div>
                    <div className="text-sm text-neutral">
                      {typeLabel(lang, type)}
                      {type === "land" && activeLand
                        ? ` • ${lang === "ar" ? activeLand.titleAr : activeLand.titleEn}`
                        : ""}
                      {type === "villas" && summary.villaType ? ` • ${summary.villaType.title}` : ""}
                      {type === "villas" && summary.villaOption ? ` • ${summary.villaOption.title}` : ""}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {submitError ? (
            <div
              className="mt-6 rounded-2xl bg-secondary/15 p-4 text-sm font-semibold text-primary ring-1 ring-secondary/25"
              role="alert"
            >
              {submitError}
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                if (step === 2) setStep(isVillas ? 1 : 0);
                else if (step === 1) setStep(0);
              }}
              className="rounded-full px-5 py-2 text-sm font-semibold text-primary ring-1 ring-primary/15 hover:bg-primary/5 disabled:opacity-40"
              disabled={step === 0}
            >
              {t.prev}
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 0) setStep(isVillas ? 1 : 2);
                  else if (step === 1) setStep(2);
                }}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-background hover:bg-accent"
              >
                {t.next}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void submitLead()}
                className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-primary ring-1 ring-secondary/25 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.20)] active:scale-[0.99] disabled:opacity-50"
                disabled={!canSend || submitting}
              >
                {submitting ? t.submitSending : t.submit}
              </button>
            )}
          </div>
        </div>
      </Container>

      {lightbox.open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.lightboxDialog}
          onClick={() => setLightbox({ open: false, images: [], index: 0 })}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox({ open: false, images: [], index: 0 });
            if (e.key === "ArrowLeft")
              setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));
            if (e.key === "ArrowRight")
              setLightbox((s) => ({
                ...s,
                index: (s.index - 1 + s.images.length) % s.images.length,
              }));
          }}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-white ring-1 ring-black/[0.10]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-black/[0.02]">
              <Image
                src={lightbox.images[lightbox.index]}
                alt=""
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
              <button
                type="button"
                onClick={() =>
                  setLightbox((s) => ({
                    ...s,
                    index: (s.index - 1 + s.images.length) % s.images.length,
                  }))
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary ring-1 ring-black/[0.08] hover:bg-background/70"
                aria-label={t.lightboxPrev}
              >
                ←
              </button>

              <div className="text-sm font-semibold text-primary">
                {lightbox.index + 1} / {lightbox.images.length}
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightbox((s) => ({
                    ...s,
                    index: (s.index + 1) % s.images.length,
                  }))
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary ring-1 ring-black/[0.08] hover:bg-background/70"
                aria-label={t.lightboxNext}
              >
                →
              </button>

              <button
                type="button"
                onClick={() => setLightbox({ open: false, images: [], index: 0 })}
                className="ms-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-primary ring-1 ring-black/[0.10] hover:bg-black/[0.06]"
                aria-label={t.lightboxClose}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
