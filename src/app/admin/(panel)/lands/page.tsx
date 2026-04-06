import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { seedCatalogFromSiteI18n } from "@/lib/seed-catalog";
import { LandsAdmin } from "./lands-admin";

export default async function AdminLandsPage() {
  await requireAdmin();
  await seedCatalogFromSiteI18n();
  const lands = await prisma.landOffering.findMany({ orderBy: { sortOrder: "asc" } });
  return <LandsAdmin lands={lands} />;
}
