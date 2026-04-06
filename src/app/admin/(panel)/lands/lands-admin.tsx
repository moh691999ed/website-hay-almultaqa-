"use client";

import type { LandOffering } from "@prisma/client";
import { createLandAction, deleteLandFormAction, updateLandAction } from "../../catalog.actions";

type Props = { lands: LandOffering[] };

export function LandsAdmin({ lands }: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-primary">الأراضي</h1>
        <p className="mt-2 text-sm text-neutral">إضافة وتعديل بطاقات الأراضي في الصفحة الرئيسية ومسار تسجيل الاهتمام.</p>
      </div>

      <div className="rounded-3xl bg-white/65 p-6 ring-1 ring-primary/10 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-primary">إضافة أرض جديدة</h2>
        <form action={createLandAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-semibold text-primary">العنوان (عربي)</span>
            <input name="titleAr" required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-semibold text-primary">العنوان (إنجليزي)</span>
            <input name="titleEn" required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-semibold text-primary">الوصف (عربي)</span>
            <input name="subtitleAr" required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-semibold text-primary">الوصف (إنجليزي)</span>
            <input name="subtitleEn" required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-semibold text-primary">مسار الصورة (مثال: /images/property-land.svg)</span>
            <input name="imageSrc" className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" placeholder="/images/property-land.svg" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-semibold text-primary">تدرج CSS اختياري (overlay)</span>
            <input name="overlayCss" className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-background hover:bg-accent"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {lands.map((land) => (
          <div key={land.id} className="rounded-3xl bg-white/65 p-6 ring-1 ring-primary/10 backdrop-blur-sm">
            <form action={updateLandAction} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={land.id} />
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-primary">العنوان (عربي)</span>
                <input name="titleAr" defaultValue={land.titleAr} required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-primary">العنوان (إنجليزي)</span>
                <input name="titleEn" defaultValue={land.titleEn} required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-semibold text-primary">الوصف (عربي)</span>
                <input name="subtitleAr" defaultValue={land.subtitleAr} required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-semibold text-primary">الوصف (إنجليزي)</span>
                <input name="subtitleEn" defaultValue={land.subtitleEn} required className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-semibold text-primary">مسار الصورة</span>
                <input name="imageSrc" defaultValue={land.imageSrc} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-semibold text-primary">تدرج CSS</span>
                <input name="overlayCss" defaultValue={land.overlayCss ?? ""} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-primary">ترتيب العرض</span>
                <input name="sortOrder" type="number" defaultValue={land.sortOrder} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15" />
              </label>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <span className="font-semibold text-primary">نشط</span>
                <select name="active" defaultValue={land.active ? "1" : "0"} className="rounded-2xl bg-background px-3 py-2 ring-1 ring-primary/15">
                  <option value="1">نعم</option>
                  <option value="0">مخفي</option>
                </select>
              </label>
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-primary ring-1 ring-secondary/25"
                >
                  حفظ
                </button>
              </div>
            </form>
            <form action={deleteLandFormAction} className="mt-4">
              <input type="hidden" name="id" value={land.id} />
              <button
                type="submit"
                onClick={(e) => {
                  if (!confirm("حذف هذه الأرض نهائياً؟")) e.preventDefault();
                }}
                className="rounded-full px-4 py-2 text-xs font-semibold text-red-800 ring-1 ring-red-200 hover:bg-red-50"
              >
                حذف نهائي
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
