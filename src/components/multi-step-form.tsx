"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";

type Bedrooms = 3 | 4 | 5;
type Size = "صغير" | "متوسط" | "كبير";
type DesignId = "d1" | "d2" | "d3";

export type VillaSelectionValues = {
  bedrooms: Bedrooms | null;
  size: Size | null;
  design: DesignId | null;
  name: string;
  phone: string;
  email: string;
};

type MultiStepFormProps = {
  className?: string;
  onSubmit?: (values: VillaSelectionValues) => void | Promise<void>;
};

const STEPS = [
  { title: "عدد الغرف", hint: "اختر عدد غرف النوم" },
  { title: "المساحة", hint: "اختر ما يناسب احتياجك" },
  { title: "التصميم", hint: "اختر نمط الواجهة" },
  { title: "بياناتك", hint: "لنؤكد اهتمامك" },
] as const;

type StepIndex = 0 | 1 | 2 | 3;

const DESIGN_OPTIONS: Array<{ id: DesignId; title: string; imageSrc: string }> = [
  { id: "d1", title: "Modern", imageSrc: "/images/villa-design-1.svg" },
  { id: "d2", title: "Contemporary", imageSrc: "/images/villa-design-2.svg" },
  { id: "d3", title: "Signature", imageSrc: "/images/villa-design-3.svg" },
];

function clampStep(next: number): StepIndex {
  if (next <= 0) return 0;
  if (next >= 3) return 3;
  return next as StepIndex;
}

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white/65 p-6 ring-1 ring-primary/10 backdrop-blur-sm lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-primary">{title}</div>
          <div className="mt-2 text-sm leading-6 text-neutral">{hint}</div>
        </div>
        <span className="hidden rounded-full bg-secondary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-secondary/20 lg:inline-flex">
          Al Multaqa
        </span>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Progress({ step }: { step: StepIndex }) {
  const pct = ((step + 1) / STEPS.length) * 100;
  return (
    <div className="rounded-3xl bg-primary p-6 text-background ring-1 ring-secondary/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-background/75">الخطوة {step + 1} من {STEPS.length}</div>
          <div className="mt-1 text-lg font-semibold">{STEPS[step].title}</div>
        </div>
        <div className="text-sm text-secondary">{Math.round(pct)}%</div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background/10">
        <div className="h-full rounded-full bg-secondary" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 flex gap-2">
        {STEPS.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <div
              key={s.title}
              className={cn(
                "h-2.5 w-2.5 rounded-full ring-1 ring-inset",
                active
                  ? "bg-secondary ring-secondary/80"
                  : done
                    ? "bg-background/55 ring-background/30"
                    : "bg-background/20 ring-background/10",
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}

function CardChoice({
  selected,
  title,
  subtitle,
  onClick,
}: {
  selected: boolean;
  title: string;
  subtitle?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl p-5 text-right ring-1 transition",
        selected
          ? "bg-primary text-background ring-primary shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          : "bg-background text-primary ring-primary/15 hover:bg-primary/5",
        "will-change-transform hover:-translate-y-0.5 active:scale-[0.99]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle ? <div className={cn("mt-1 text-sm", selected ? "text-background/70" : "text-neutral")}>{subtitle}</div> : null}
        </div>
        <span
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full ring-1",
            selected ? "bg-secondary/15 text-secondary ring-secondary/25" : "bg-primary/5 text-primary ring-primary/10",
          )}
          aria-hidden="true"
        >
          {selected ? "✓" : "←"}
        </span>
      </div>
    </button>
  );
}

export function MultiStepForm({ className, onSubmit }: MultiStepFormProps) {
  const [step, setStep] = useState<StepIndex>(0);

  const form = useForm<VillaSelectionValues>({
    mode: "onSubmit",
    defaultValues: {
      bedrooms: null,
      size: null,
      design: null,
      name: "",
      phone: "",
      email: "",
    },
  });

  const values = form.watch();

  const canNext = useMemo(() => {
    if (step === 0) return values.bedrooms != null;
    if (step === 1) return values.size != null;
    if (step === 2) return values.design != null;
    return true;
  }, [step, values.bedrooms, values.size, values.design]);

  function next() {
    if (!canNext) return;
    setStep((s) => clampStep(s + 1));
  }

  function prev() {
    setStep((s) => clampStep(s - 1));
  }

  async function submit(values: VillaSelectionValues) {
    await onSubmit?.(values);
  }

  return (
    <section className={cn("grid gap-6 lg:grid-cols-[420px_1fr]", className)} aria-label="Villa selection form">
      <Progress step={step} />

      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        <div key={step} className="animate-hero-in-up motion-reduce:animate-none">
            {step === 0 && (
              <StepShell title={STEPS[0].title} hint={STEPS[0].hint}>
                <div className="grid gap-3 lg:grid-cols-3">
                  {([3, 4, 5] as const).map((b) => (
                    <CardChoice
                      key={b}
                      selected={values.bedrooms === b}
                      title={`${b} غرف`}
                      subtitle="غرف نوم"
                      onClick={() => form.setValue("bedrooms", b, { shouldDirty: true })}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title={STEPS[1].title} hint={STEPS[1].hint}>
                <div className="grid gap-3 lg:grid-cols-3">
                  {(["صغير", "متوسط", "كبير"] as const).map((s) => (
                    <CardChoice
                      key={s}
                      selected={values.size === s}
                      title={s}
                      subtitle={s === "صغير" ? "نمط عملي" : s === "متوسط" ? "توازن مثالي" : "مساحة رحبة"}
                      onClick={() => form.setValue("size", s, { shouldDirty: true })}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title={STEPS[2].title} hint={STEPS[2].hint}>
                <div className="grid gap-4 lg:grid-cols-3">
                  {DESIGN_OPTIONS.map((d) => {
                    const selected = values.design === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => form.setValue("design", d.id, { shouldDirty: true })}
                        className={cn(
                          "group overflow-hidden rounded-2xl text-right ring-1 transition",
                          selected ? "ring-secondary/40" : "ring-primary/15 hover:ring-secondary/30",
                          "will-change-transform hover:-translate-y-0.5 active:scale-[0.99]",
                        )}
                      >
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={d.imageSrc}
                            alt=""
                            fill
                            className={cn(
                              "object-cover transition duration-700",
                              selected ? "scale-[1.02] opacity-95" : "opacity-85 group-hover:opacity-95 group-hover:scale-[1.03]",
                            )}
                            sizes="(min-width: 1024px) 33vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-primary/40 transition duration-700 group-hover:bg-primary/30" />
                          <div
                            className={cn(
                              "absolute inset-0 ring-1 ring-inset transition duration-700",
                              selected ? "ring-secondary/25" : "ring-background/0 group-hover:ring-background/10",
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <div className={cn("p-5", selected ? "bg-primary text-background" : "bg-background text-primary")}>
                          <div className="flex items-center justify-between gap-4">
                            <div className="text-sm font-semibold">{d.title}</div>
                            <span
                              className={cn(
                                "inline-flex h-8 w-8 items-center justify-center rounded-full ring-1",
                                selected ? "bg-secondary/15 text-secondary ring-secondary/25" : "bg-primary/5 text-primary ring-primary/10",
                              )}
                              aria-hidden="true"
                            >
                              {selected ? "✓" : "←"}
                            </span>
                          </div>
                          <div className={cn("mt-2 text-sm", selected ? "text-background/70" : "text-neutral")}>
                            صورة مؤقتة — سيتم استبدالها لاحقًا.
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title={STEPS[3].title} hint={STEPS[3].hint}>
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-primary">الاسم</span>
                    <input
                      className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                      placeholder="الاسم الكامل"
                      {...form.register("name", { required: "الاسم مطلوب" })}
                    />
                    {form.formState.errors.name ? (
                      <span className="text-xs text-secondary">{form.formState.errors.name.message}</span>
                    ) : null}
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-primary">رقم الهاتف</span>
                    <input
                      className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                      inputMode="tel"
                      placeholder="مثال: 9xxxxxxx"
                      {...form.register("phone", { required: "رقم الهاتف مطلوب" })}
                    />
                    {form.formState.errors.phone ? (
                      <span className="text-xs text-secondary">{form.formState.errors.phone.message}</span>
                    ) : null}
                  </label>

                  <label className="grid gap-2 lg:col-span-2">
                    <span className="text-sm font-semibold text-primary">البريد الإلكتروني</span>
                    <input
                      className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                      inputMode="email"
                      placeholder="name@email.com"
                      {...form.register("email", {
                        required: "البريد مطلوب",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "بريد غير صالح" },
                      })}
                    />
                    {form.formState.errors.email ? (
                      <span className="text-xs text-secondary">{form.formState.errors.email.message}</span>
                    ) : null}
                  </label>
                </div>

                <div className="mt-6 rounded-2xl bg-primary/5 p-5 ring-1 ring-primary/10">
                  <div className="text-sm font-semibold text-primary">ملخص الاختيار</div>
                  <div className="mt-2 text-sm text-neutral">
                    {values.bedrooms ?? "—"} غرف • {values.size ?? "—"} • {values.design ?? "—"}
                  </div>
                </div>
              </StepShell>
            )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prev}
            className="rounded-full px-5 py-2 text-sm font-semibold text-primary ring-1 ring-primary/15 hover:bg-primary/5 disabled:opacity-40"
            disabled={step === 0}
          >
            السابق
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-background hover:bg-accent disabled:opacity-50"
              disabled={!canNext}
            >
              التالي
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-primary ring-1 ring-secondary/25 transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.20)] active:scale-[0.99]"
            >
              تأكيد وإرسال
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

