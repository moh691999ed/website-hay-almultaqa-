import { prisma } from "@/lib/prisma";
import { seedCatalogFromSiteI18n } from "@/lib/seed-catalog";

export type PublicLandCard = {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  imageSrc: string;
  overlayCss: string | null;
};

export type PublicVillaOptionDTO = {
  key: "a" | "b";
  titleAr: string;
  titleEn: string;
  priceLabelAr: string;
  priceLabelEn: string;
  areaLabelAr: string;
  areaLabelEn: string;
  bedrooms: number;
  roomsLabelAr: string | null;
  roomsLabelEn: string | null;
  images: string[];
};

export type PublicVillaTypeDTO = {
  slug: string;
  sortOrder: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  options: PublicVillaOptionDTO[];
};

export type PublicCatalogPayload = {
  villaTypes: PublicVillaTypeDTO[];
  lands: PublicLandCard[];
};

function parseImagesJson(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === "string");
}

export async function loadPublicCatalog(): Promise<PublicCatalogPayload> {
  await seedCatalogFromSiteI18n();

  const [villaTypes, lands] = await Promise.all([
    prisma.villaType.findMany({
      orderBy: { sortOrder: "asc" },
      include: { options: { orderBy: { optionKey: "asc" } } },
    }),
    prisma.landOffering.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        titleAr: true,
        titleEn: true,
        subtitleAr: true,
        subtitleEn: true,
        imageSrc: true,
        overlayCss: true,
      },
    }),
  ]);

  return {
    villaTypes: villaTypes.map((vt) => ({
      slug: vt.slug,
      sortOrder: vt.sortOrder,
      titleAr: vt.titleAr,
      titleEn: vt.titleEn,
      descriptionAr: vt.descriptionAr,
      descriptionEn: vt.descriptionEn,
      options: vt.options.map((o) => ({
        key: (o.optionKey === "b" ? "b" : "a") as "a" | "b",
        titleAr: o.titleAr,
        titleEn: o.titleEn,
        priceLabelAr: o.priceLabelAr,
        priceLabelEn: o.priceLabelEn,
        areaLabelAr: o.areaLabelAr,
        areaLabelEn: o.areaLabelEn,
        bedrooms: o.bedrooms,
        roomsLabelAr: o.roomsLabelAr,
        roomsLabelEn: o.roomsLabelEn,
        images: parseImagesJson(o.images),
      })),
    })),
    lands: lands.map((l) => ({ ...l })),
  };
}
