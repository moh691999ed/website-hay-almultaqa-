"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, makeAdminSessionCookie, validateAdminPassword } from "@/lib/admin-auth";

export async function adminLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");

  if (!validateAdminPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(nextPath)}`);
  }

  const cookie = await makeAdminSessionCookie();
  const jar = await cookies();
  jar.set(cookie.name, cookie.value, cookie.options);

  redirect(nextPath);
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(adminCookieName());
  redirect("/admin/login");
}

