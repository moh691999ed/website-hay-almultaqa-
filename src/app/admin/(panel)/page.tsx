import { Suspense } from "react";
import { LeadsTable } from "../ui/leads-table";

function LeadsFallback() {
  return (
    <div className="rounded-3xl bg-white/65 p-10 text-center ring-1 ring-primary/10 backdrop-blur-sm">
      <p className="text-sm font-semibold text-primary">جاري تحميل لوحة الطلبات…</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<LeadsFallback />}>
      <LeadsTable />
    </Suspense>
  );
}
