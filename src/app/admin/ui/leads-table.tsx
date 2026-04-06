"use client";

import type { LeadStatus } from "@prisma/client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LeadRow } from "./leads.types";
import { deleteLeadAction, getLeadsAction, updateLeadStatusAction } from "./leads.actions";

type PropertyTypeFilter = "all" | "villas" | "shops" | "land";
type StatusFilter = "all" | LeadStatus;

function statusLabel(s: LeadStatus) {
  if (s === "NEW") return "جديد";
  if (s === "RECEIVED") return "تم استلام الطلب";
  if (s === "IN_PROGRESS") return "قيد الإجراء";
  return "رفض الطلب";
}

function typeLabel(t: string) {
  if (t === "villas") return "فلل";
  if (t === "shops") return "محلات";
  if (t === "land") return "أراضي";
  return t;
}

const DETAIL_LABELS: Record<string, string> = {
  address: "العنوان",
  language: "اللغة",
  propertyCategoryLabel: "التصنيف (نوع الوحدة)",
  villaTypeId: "معرّف التايب",
  villaTypeTitle: "نوع الفيلا / التصميم",
  villaOptionId: "معرّف الخيار",
  villaOptionTitle: "الخيار (أ / ب)",
  villaOptionAreaLabel: "المساحة والوصف",
  villaOptionRoomsLabel: "توزيع الغرف",
  villaOptionBedrooms: "عدد غرف النوم",
  landOfferingId: "معرّف عرض الأرض",
  landTitleAr: "عنوان الأرض (عربي)",
  landTitleEn: "عنوان الأرض (إنجليزي)",
};

const DETAIL_ORDER = [
  "propertyCategoryLabel",
  "villaTypeTitle",
  "villaOptionTitle",
  "villaOptionAreaLabel",
  "villaOptionRoomsLabel",
  "villaOptionBedrooms",
  "address",
  "language",
  "villaTypeId",
  "villaOptionId",
  "landOfferingId",
  "landTitleAr",
  "landTitleEn",
] as const;

function formatDetailValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function LeadDetailsSummary({ details }: { details: Record<string, unknown> }) {
  const parts: string[] = [];
  const cat = details.propertyCategoryLabel;
  if (typeof cat === "string" && cat) parts.push(cat);
  const vt = details.villaTypeTitle;
  if (typeof vt === "string" && vt) parts.push(vt);
  const vo = details.villaOptionTitle;
  if (typeof vo === "string" && vo) parts.push(vo);
  const addr = details.address;
  if (typeof addr === "string" && addr) parts.push(addr.length > 48 ? `${addr.slice(0, 48)}…` : addr);
  return parts.length ? parts.join(" · ") : "—";
}

function LeadDetailsExpand({ details }: { details: Record<string, unknown> }) {
  const shown = new Set<string>();
  const rows: { key: string; label: string; value: string }[] = [];
  for (const k of DETAIL_ORDER) {
    if (Object.prototype.hasOwnProperty.call(details, k)) {
      shown.add(k);
      rows.push({ key: k, label: DETAIL_LABELS[k] ?? k, value: formatDetailValue(details[k]) });
    }
  }
  for (const k of Object.keys(details)) {
    if (shown.has(k)) continue;
    rows.push({ key: k, label: DETAIL_LABELS[k] ?? k, value: formatDetailValue(details[k]) });
  }
  if (rows.length === 0) {
    return <p className="text-sm text-neutral">لا توجد تفاصيل إضافية.</p>;
  }
  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2">
      {rows.map(({ key, label, value }) => (
        <div key={key} className="rounded-2xl bg-background/80 p-3 ring-1 ring-primary/10">
          <dt className="text-xs font-semibold text-secondary">{label}</dt>
          <dd className="mt-1 break-words font-medium text-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl bg-white/65 p-8 text-center ring-1 ring-primary/10 backdrop-blur-sm">
      <div className="text-sm font-semibold text-primary">لا توجد نتائج</div>
      <div className="mt-2 text-sm text-neutral">جرّب تغيير البحث أو الفلترة.</div>
    </div>
  );
}

function ReceiptActions({
  row,
  loading,
  onStatusChange,
}: {
  row: LeadRow;
  loading: boolean;
  onStatusChange: (id: string, next: LeadStatus) => void | Promise<void>;
}) {
  const actionBtn = (target: LeadStatus, label: string) => {
    const active = row.status === target;
    return (
      <button
        type="button"
        disabled={loading || active}
        onClick={() => void onStatusChange(row.id, target)}
        className={[
          "w-full rounded-2xl px-2 py-2 text-center text-[11px] font-semibold leading-snug ring-1 transition",
          active
            ? "bg-primary text-background ring-primary cursor-default"
            : "bg-background text-primary ring-primary/15 hover:bg-primary/5 disabled:opacity-50",
        ].join(" ")}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-w-[9.5rem] max-w-[13rem] space-y-2">
      <div className="text-[10px] font-bold tracking-wide text-secondary">استلام الطلب</div>
      <div
        className={[
          "inline-flex w-full justify-center rounded-full px-2 py-1 text-[10px] font-semibold ring-1",
          row.status === "NEW"
            ? "bg-amber-50 text-amber-900 ring-amber-200"
            : row.status === "RECEIVED"
              ? "bg-emerald-50 text-emerald-900 ring-emerald-200"
              : row.status === "IN_PROGRESS"
                ? "bg-sky-50 text-sky-900 ring-sky-200"
                : "bg-red-50 text-red-900 ring-red-200",
        ].join(" ")}
      >
        {statusLabel(row.status)}
      </div>
      <div className="flex flex-col gap-1.5">
        {actionBtn("RECEIVED", "تم استلام الطلب")}
        {actionBtn("IN_PROGRESS", "قيد الإجراء")}
        {actionBtn("REJECTED", "رفض الطلب")}
      </div>
      <button
        type="button"
        disabled={loading || row.status === "NEW"}
        onClick={() => void onStatusChange(row.id, "NEW")}
        className="w-full text-[10px] font-medium text-neutral underline-offset-2 hover:underline disabled:opacity-40 disabled:no-underline"
      >
        إعادة إلى «جديد»
      </button>
    </div>
  );
}

export function LeadsTable() {
  const router = useRouter();
  const sp = useSearchParams();

  const initialQ = sp.get("q") ?? "";
  const initialType = (sp.get("type") ?? "all") as PropertyTypeFilter;
  const initialStatus = (sp.get("status") ?? "all") as StatusFilter;

  const [q, setQ] = useState(initialQ);
  const [type, setType] = useState<PropertyTypeFilter>(initialType);
  const [leadStatus, setLeadStatus] = useState<StatusFilter>(initialStatus);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<LeadRow[] | null>(null);

  const queryKey = useMemo(() => `${q}::${type}::${leadStatus}`, [q, type, leadStatus]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getLeadsAction({ q: initialQ, type: initialType, status: initialStatus });
        if (alive) setRows(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const data = await getLeadsAction({ q, type, status: leadStatus });
      setRows(data);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (type !== "all") params.set("type", type);
      if (leadStatus !== "all") params.set("status", leadStatus);
      router.replace(`/admin?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  }

  async function onStatusChange(id: string, next: LeadStatus) {
    setLoading(true);
    try {
      await updateLeadStatusAction(id, next);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("حذف هذا الطلب؟")) return;
    setLoading(true);
    try {
      await deleteLeadAction(id);
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-secondary text-sm tracking-wide">Al Multaqa</p>
          <h1 className="mt-2 text-3xl font-semibold text-primary">الطلبات (Leads)</h1>
          <p className="mt-2 text-sm leading-6 text-neutral">
            طلبات الموقع تُحفظ تلقائياً في قاعدة البيانات. من عمود «استلام الطلب» يمكنك تمييز كل طلب كـ تم استلام الطلب، أو قيد الإجراء، أو رفض الطلب.
          </p>
        </div>
        <button
          onClick={refresh}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-background hover:bg-accent disabled:opacity-60 transition will-change-transform hover:-translate-y-0.5 active:scale-[0.99]"
          disabled={loading}
        >
          {loading ? "جاري التحديث…" : "تحديث"}
        </button>
      </div>

      <div className="rounded-3xl bg-white/65 p-5 ring-1 ring-primary/10 backdrop-blur-sm lg:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_200px_140px]">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-primary">بحث</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="اسم أو هاتف أو بريد…"
              className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-primary">نوع الاهتمام</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PropertyTypeFilter)}
              className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
            >
              <option value="all">الكل</option>
              <option value="villas">فلل</option>
              <option value="shops">محلات</option>
              <option value="land">أراضي</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-primary">حالة الطلب</span>
            <select
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value as StatusFilter)}
              className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
            >
              <option value="all">الكل</option>
              <option value="NEW">جديد</option>
              <option value="RECEIVED">تم استلام الطلب</option>
              <option value="IN_PROGRESS">قيد الإجراء</option>
              <option value="REJECTED">رفض الطلب</option>
            </select>
          </label>

          <button
            onClick={refresh}
            className="h-11 rounded-2xl bg-secondary px-5 text-sm font-semibold text-primary ring-1 ring-secondary/25 transition will-change-transform hover:-translate-y-0.5 active:scale-[0.99]"
            disabled={loading}
          >
            تطبيق
          </button>
        </div>
      </div>

      <div key={queryKey} className="animate-hero-in-up motion-reduce:animate-none">
        {rows === null && loading ? (
          <div className="rounded-3xl bg-white/65 p-10 text-center ring-1 ring-primary/10 backdrop-blur-sm">
            <p className="text-sm font-semibold text-primary">جاري تحميل الطلبات…</p>
          </div>
        ) : rows === null ? (
          <div className="rounded-3xl bg-white/65 p-8 ring-1 ring-primary/10 backdrop-blur-sm">
            <div className="text-sm font-semibold text-primary">اضغط «تحديث» أو «تطبيق» لعرض الطلبات</div>
          </div>
        ) : rows.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white/65 ring-1 ring-primary/10 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-right text-sm">
                <thead className="bg-primary/5 text-primary">
                  <tr>
                    <th className="px-4 py-4 font-semibold whitespace-nowrap">التاريخ</th>
                    <th className="px-4 py-4 font-semibold">الاسم</th>
                    <th className="px-4 py-4 font-semibold whitespace-nowrap">الهاتف</th>
                    <th className="px-4 py-4 font-semibold">البريد</th>
                    <th className="px-4 py-4 font-semibold whitespace-nowrap">النوع</th>
                    <th className="min-w-[180px] px-4 py-4 font-semibold whitespace-nowrap">استلام الطلب</th>
                    <th className="min-w-[200px] px-4 py-4 font-semibold">ملخص التفاصيل</th>
                    <th className="px-4 py-4 font-semibold whitespace-nowrap">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {rows.map((r) => (
                    <Fragment key={r.id}>
                      <tr className="hover:bg-primary/5 align-top">
                        <td className="px-4 py-4 text-xs text-neutral whitespace-nowrap">
                          {new Date(r.createdAt).toLocaleString("ar-SA", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="px-4 py-4 font-semibold text-primary">{r.name}</td>
                        <td className="px-4 py-4 text-neutral whitespace-nowrap" dir="ltr">
                          {r.phone}
                        </td>
                        <td className="max-w-[180px] px-4 py-4 break-all text-neutral text-xs" dir="ltr">
                          {r.email}
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-secondary/20">
                            {typeLabel(r.propertyType)}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <ReceiptActions row={r} loading={loading} onStatusChange={onStatusChange} />
                        </td>
                        <td className="px-4 py-4 text-xs text-neutral leading-relaxed">
                          <LeadDetailsSummary details={r.details} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onDelete(r.id)}
                            className="rounded-full px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/15 hover:bg-primary/5"
                            disabled={loading}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-primary/[0.03]">
                        <td colSpan={8} className="px-4 py-3">
                          <details className="group rounded-2xl ring-1 ring-primary/10 bg-white/50">
                            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-primary marker:ms-2">
                              عرض كل البيانات (العنوان، التايب، الخيار…)
                            </summary>
                            <div className="border-t border-primary/10 px-4 py-4">
                              <LeadDetailsExpand details={r.details} />
                            </div>
                          </details>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

