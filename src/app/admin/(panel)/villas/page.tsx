import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { seedCatalogFromSiteI18n } from "@/lib/seed-catalog";
import { VillasAdmin } from "./villas-admin";

export default async function AdminVillasPage() {
  await requireAdmin();
  await seedCatalogFromSiteI18n();
  const types = await prisma.villaType.findMany({
    orderBy: { sortOrder: "asc" },
    include: { options: { orderBy: { optionKey: "asc" } } },
  });
  return <VillasAdmin types={types} />;
}
