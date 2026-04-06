import { adminLogin } from "../../login/actions";
import { Container } from "@/components/Container";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const nextPath = sp.next?.startsWith("/admin") && !sp.next.includes("..") ? sp.next : "/admin";
  const showError = sp.error === "1";

  return (
    <main className="min-h-screen bg-background">
      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white/70 p-7 ring-1 ring-primary/10 backdrop-blur-sm lg:p-8">
            <p className="text-secondary text-sm tracking-wide">Al Multaqa</p>
            <h1 className="mt-2 text-2xl font-semibold text-primary">تسجيل الدخول</h1>
            <p className="mt-2 text-sm leading-6 text-neutral">لوحة التحكم الإدارية</p>

            {showError ? (
              <div className="mt-5 rounded-2xl bg-secondary/10 p-4 text-sm text-primary ring-1 ring-secondary/20">
                كلمة المرور غير صحيحة.
              </div>
            ) : null}

            <form action={adminLogin} className="mt-6 space-y-4">
              <input type="hidden" name="next" value={nextPath} />

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-primary">كلمة المرور</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="h-11 rounded-2xl bg-background px-4 text-sm text-primary ring-1 ring-primary/15 outline-none transition focus:ring-2 focus:ring-secondary/40"
                  placeholder="••••••••"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background hover:bg-accent"
              >
                دخول
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-neutral">
            في التطوير: كلمة المرور الافتراضية <code className="font-semibold">123456</code> إن لم تُضبط{" "}
            <code className="font-semibold">ADMIN_PASSWORD</code>. للإنتاج عيّن أيضاً{" "}
            <code className="font-semibold">ADMIN_SECRET</code> في <code className="font-semibold">.env</code>.
          </p>
        </div>
      </Container>
    </main>
  );
}
