import { prisma } from "@/lib/prisma";
import { getSiteMessages, getVillaCatalog } from "@/lib/site-i18n";

/** يملأ جداول الفلل/الأراضي من القيم الافتراضية في الموقع عند قاعدة فارغة (مرة واحدة). */
export async function seedCatalogFromSiteI18n() {
  await prisma.$transaction(async (tx) => {
    if ((await tx.villaType.count()) > 0) return;

    const ar = getSiteMessages("ar");
    const en = getSiteMessages("en");
    const arVillas = getVillaCatalog("ar");
    const enVillas = getVillaCatalog("en");

    for (let i = 0; i < arVillas.length; i++) {
      const vtAr = arVillas[i]!;
      const vtEn = enVillas[i]!;
      await tx.villaType.create({
        data: {
          slug: vtAr.id,
          sortOrder: i,
          titleAr: vtAr.title,
          titleEn: vtEn.title,
          descriptionAr: vtAr.description,
          descriptionEn: vtEn.description,
          options: {
            create: vtAr.options.map((optAr, j) => {
              const optEn = vtEn.options[j]!;
              return {
                optionKey: optAr.id,
                titleAr: optAr.title,
                titleEn: optEn.title,
                priceLabelAr: optAr.priceLabel,
                priceLabelEn: optEn.priceLabel,
                areaLabelAr: optAr.areaLabel,
                areaLabelEn: optEn.areaLabel,
                bedrooms: optAr.bedrooms,
                roomsLabelAr: optAr.roomsLabel ?? null,
                roomsLabelEn: optEn.roomsLabel ?? null,
                images: [...optAr.images],
              };
            }),
          },
        },
      });
    }

    if ((await tx.landOffering.count()) === 0) {
      await tx.landOffering.create({
        data: {
          sortOrder: 0,
          active: true,
          titleAr: ar.landTitle,
          titleEn: en.landTitle,
          subtitleAr: ar.landSubtitle,
          subtitleEn: en.landSubtitle,
          imageSrc: "/images/property-land.svg",
          overlayCss: null,
        },
      });
    }
  });
}
