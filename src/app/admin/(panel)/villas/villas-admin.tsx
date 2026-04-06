"use client";

import type { VillaTypeWithOptions } from "./villas-types";
import { updateVillaTypeAction } from "../../catalog.actions";

type Props = { types: VillaTypeWithOptions[] };

function imagesToText(images: unknown): string {
  if (!Array.isArray(images)) return "";
  return images.filter((x): x is string => typeof x === "string").join("\n");
}

function OptionFields({ opt, slug }: { opt: VillaTypeWithOptions["options"][number]; slug: string }) {
  const p = `opt_${opt.optionKey}_`;
  return (
    <div className="rounded-2xl bg-background/80 p-4 ring-1 ring-primary/10">
      <div className="text-sm font-semibold text-primary">
        خيار {opt.optionKey.toUpperCase()} — {slug}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs">
          <span>عنوان (عربي)</span>
          <input name={`${p}titleAr`} defaultValue={opt.titleAr} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs">
          <span>عنوان (إنجليزي)</span>
          <input name={`${p}titleEn`} defaultValue={opt.titleEn} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs">
          <span>السعر / التسعير (عربي)</span>
          <input name={`${p}priceLabelAr`} defaultValue={opt.priceLabelAr} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs">
          <span>السعر / التسعير (إنجليزي)</span>
          <input name={`${p}priceLabelEn`} defaultValue={opt.priceLabelEn} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs">
          <span>المساحة (عربي)</span>
          <input name={`${p}areaLabelAr`} defaultValue={opt.areaLabelAr} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs">
          <span>المساحة (إنجليزي)</span>
          <input name={`${p}areaLabelEn`} defaultValue={opt.areaLabelEn} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs">
          <span>عدد غرف النوم</span>
          <input name={`${p}bedrooms`} type="number" min={0} defaultValue={opt.bedrooms} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs sm:col-span-2">
          <span>توزيع الغرف (عربي) — اختياري</span>
          <input name={`${p}roomsLabelAr`} defaultValue={opt.roomsLabelAr ?? ""} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs sm:col-span-2">
          <span>توزيع الغرف (إنجليزي)</span>
          <input name={`${p}roomsLabelEn`} defaultValue={opt.roomsLabelEn ?? ""} className="rounded-xl px-2 py-1.5 ring-1 ring-primary/15" />
        </label>
        <label className="grid gap-1 text-xs sm:col-span-2">
          <span>مسارات الصور (سطر لكل مسار، يُفضّل 5 صور)</span>
          <textarea
            name={`${p}images`}
            rows={5}
            defaultValue={imagesToText(opt.images)}
            className="rounded-xl px-2 py-1.5 font-mono text-xs ring-1 ring-primary/15"
          />
        </label>
      </div>
    </div>
  );
}

export function VillasAdmin({ types }: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-primary">الفلل (التايبات)</h1>
        <p className="mt-2 text-sm text-neutral">
          تعديل العناوين، الأسعار، المساحات، الغرف، ومسارات الصور لكل تايب وخيار أ/ب. المعرف slug (مثل type-1) ثابت للروابط.
        </p>
      </div>

      {types.map((vt) => (
        <form
          key={vt.id}
          action={updateVillaTypeAction}
          className="space-y-4 rounded-3xl bg-white/65 p-6 ring-1 ring-primary/10 backdrop-blur-sm"
        >
          <input type="hidden" name="slug" value={vt.slug} />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary">تايب {vt.slug}</h2>
              <p className="text-xs text-neutral">ترتيب العرض في الموقع</p>
            </div>
            <label className="grid gap-1 text-sm">
              <span className="font-semibold text-primary">sortOrder</span>
              <input name="sortOrder" type="number" defaultValue={vt.sortOrder} className="w-24 rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="font-semibold text-primary">عنوان التايب (عربي)</span>
              <input name="titleAr" defaultValue={vt.titleAr} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-semibold text-primary">عنوان التايب (إنجليزي)</span>
              <input name="titleEn" defaultValue={vt.titleEn} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
            </label>
            <label className="grid gap-1 text-sm sm:col-span-2">
              <span className="font-semibold text-primary">وصف (عربي)</span>
              <textarea name="descriptionAr" rows={2} defaultValue={vt.descriptionAr} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
            </label>
            <label className="grid gap-1 text-sm sm:col-span-2">
              <span className="font-semibold text-primary">وصف (إنجليزي)</span>
              <textarea name="descriptionEn" rows={2} defaultValue={vt.descriptionEn} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
            </label>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {vt.options.map((opt) => (
              <OptionFields key={opt.id} opt={opt} slug={vt.slug} />
            ))}
          </div>
          <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-background hover:bg-accent">
            حفظ التايب {vt.slug}
          </button>
        </form>
      ))}
    </div>
  );
}
