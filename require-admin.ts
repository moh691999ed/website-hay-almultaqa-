import { cookies } from "next/headers";
import { adminCookieName, verifyAdminToken } from "@/lib/admin-auth";

export async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(adminCookieName())?.value;
  if (!(await verifyAdminToken(token))) {
    throw new Error("Unauthorized admin");
  }
}
