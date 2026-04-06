import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, verifyAdminToken } from "@/lib/admin-auth";
import { adminLogout } from "../login/actions";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/10 hover:bg-primary/5"
    >
      {label}
    </Link>
  );
}

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const token = jar.get(adminCookieName())?.value;
  if (!(await verifyAdminToken(token))) {
    redirect("/admin/login?next=/admin");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-primary/10 bg-white/60 p-6 backdrop-blur-sm lg:border-b-0 lg:border-l lg:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs tracking-wide text-secondary">Al Multaqa</div>
              <div className="mt-1 text-lg font-semibold text-primary">لوحة التحكم</div>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-background ring-1 ring-secondary/20">
              A
            </span>
          </div>

          <nav className="mt-8 grid gap-2" aria-label="قائمة الإدارة">
            <NavLink href="/admin" label="الطلبات" />
            <NavLink href="/admin/villas" label="الفلل (التايبات)" />
            <NavLink href="/admin/lands" label="الأراضي" />
          </nav>

          <form action={adminLogout} className="mt-8">
            <button
              type="submit"
              className="w-full rounded-2xl px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/10 hover:bg-primary/5"
            >
              تسجيل خروج
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-primary/5 p-4 ring-1 ring-primary/10">
            <div className="text-xs text-neutral">نصيحة</div>
            <div className="mt-1 text-sm font-semibold text-primary">استخدم البحث والفلترة لعرض النتائج بسرعة.</div>
          </div>
        </aside>

        <div className="min-w-0 p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
