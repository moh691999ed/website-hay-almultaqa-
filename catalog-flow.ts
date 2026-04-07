import type { Lang } from "@/contexts/language-context";
import type { PublicCatalogPayload, PublicVillaOptionDTO } from "@/lib/public-catalog";

export type FlowVillaOption = {
  id: "a" | "b";
  title: string;
  priceLabel: string;
  areaLabel: string;
  bedrooms: number;
  roomsLabel?: string;
  images: string[];
};

export type FlowVillaType = {
  id: string;
  title: string;
  description: string;
  options: [FlowVillaOption, FlowVillaOption];
};

const PLACEHOLDER = "/images/gallery-exhibit/gallery-big.png";

function padImages(imgs: string[]): string[] {
  const out = [...imgs];
  while (out.length < 5) out.push(PLACEHOLDER);
  return out.slice(0, 5);
}

function mapOption(o: PublicVillaOptionDTO, lang: Lang): FlowVillaOption {
  return {
    id: o.key,
    title: lang === "ar" ? o.titleAr : o.titleEn,
    priceLabel: lang === "ar" ? o.priceLabelAr : o.priceLabelEn,
    areaLabel: lang === "ar" ? o.areaLabelAr : o.areaLabelEn,
    bedrooms: o.bedrooms,
    roomsLabel: (lang === "ar" ? o.roomsLabelAr : o.roomsLabelEn) ?? undefined,
    images: padImages(o.images),
  };
}

export function mapCatalogForLang(catalog: PublicCatalogPayload, lang: Lang): FlowVillaType[] {
  return catalog.villaTypes.map((vt) => {
    const oa = vt.options[0];
    const ob = vt.options[1] ?? vt.options[0];
    if (!oa) {
      throw new Error(`Villa type ${vt.slug} has no options`);
    }
    return {
      id: vt.slug,
      title: lang === "ar" ? vt.titleAr : vt.titleEn,
      description: lang === "ar" ? vt.descriptionAr : vt.descriptionEn,
      options: [mapOption(oa, lang), mapOption(ob!, lang)],
    };
  });
}
