import type { Lang } from "@/contexts/language-context";

const PLACEHOLDER_IMAGES = [
  "/images/gallery-exhibit/gallery-big.png",
  "/images/gallery-exhibit/gallery-left-1.png",
  "/images/gallery-exhibit/gallery-left-2.png",
  "/images/gallery-exhibit/gallery-right-1.png",
  "/images/gallery-exhibit/gallery-right-2.png",
] as const;

/** تايب ١ — أوبشن A (ضع الصور في public/images/villas/type-1-option-a/1.jpg … 5.jpg) */
const TYPE_1_OPTION_A_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-1-option-a/1.jpg",
  "/images/villas/type-1-option-a/2.jpg",
  "/images/villas/type-1-option-a/3.jpg",
  "/images/villas/type-1-option-a/4.jpg",
  "/images/villas/type-1-option-a/5.jpg",
];

/** تايب ١ — أوبشن B (مصدر الصور: سطح المكتب / حي الملتقى / تايب ٢ اوبشن ٢) */
export const TYPE_1_OPTION_B_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-1-option-b/1.jpg",
  "/images/villas/type-1-option-b/2.jpg",
  "/images/villas/type-1-option-b/3.jpg",
  "/images/villas/type-1-option-b/4.jpg",
  "/images/villas/type-1-option-b/5.jpg",
];

/** تايب ٢ — أوبشن A (مصدر المجلد: سطح المكتب / حي الملتقى / تايب ٢ اوبشن ١) */
export const TYPE_2_OPTION_A_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-2-option-a/1.jpg",
  "/images/villas/type-2-option-a/2.jpg",
  "/images/villas/type-2-option-a/3.jpg",
  "/images/villas/type-2-option-a/4.jpg",
  "/images/villas/type-2-option-a/5.jpg",
];

/** تايب ٢ — أوبشن B (مصدر الصور: سطح المكتب / حي الملتقى / تايب ٢ اوبشن ٢) */
export const TYPE_2_OPTION_B_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-2-option-b/1.jpg",
  "/images/villas/type-2-option-b/2.jpg",
  "/images/villas/type-2-option-b/3.jpg",
  "/images/villas/type-2-option-b/4.jpg",
  "/images/villas/type-2-option-b/5.jpg",
];

/** تايب ٣ — أوبشن A (مصدر الصور: سطح المكتب / حي الملتقى / تايب ٣ اوبشن ١) */
export const TYPE_3_OPTION_A_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-3-option-a/1.jpg",
  "/images/villas/type-3-option-a/2.jpg",
  "/images/villas/type-3-option-a/3.jpg",
  "/images/villas/type-3-option-a/4.jpg",
  "/images/villas/type-3-option-a/5.jpg",
];

/** تايب ٣ — أوبشن B (مصدر الصور: سطح المكتب / حي الملتقى / تايب ٣ اوبشن ٢) */
export const TYPE_3_OPTION_B_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-3-option-b/1.jpg",
  "/images/villas/type-3-option-b/2.jpg",
  "/images/villas/type-3-option-b/3.jpg",
  "/images/villas/type-3-option-b/4.jpg",
  "/images/villas/type-3-option-b/5.jpg",
];

/** تايب ٤ — أوبشن A (مصدر الصور: سطح المكتب / حي الملتقى / تايب ٤ اوبشن ١) */
export const TYPE_4_OPTION_A_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-4-option-a/1.jpg",
  "/images/villas/type-4-option-a/2.jpg",
  "/images/villas/type-4-option-a/3.jpg",
  "/images/villas/type-4-option-a/4.jpg",
  "/images/villas/type-4-option-a/5.jpg",
];

/** تايب ٤ — أوبشن B (مصدر الصور: سطح المكتب / حي الملتقى / تايب ٤ اوبشن ٢) */
export const TYPE_4_OPTION_B_IMAGES: [string, string, string, string, string] = [
  "/images/villas/type-4-option-b/1.jpg",
  "/images/villas/type-4-option-b/2.jpg",
  "/images/villas/type-4-option-b/3.jpg",
  "/images/villas/type-4-option-b/4.jpg",
  "/images/villas/type-4-option-b/5.jpg",
];

export type VillaOption = {
  id: "a" | "b";
  title: string;
  priceLabel: string;
  areaLabel: string;
  bedrooms: number;
  roomsLabel?: string;
  images: [string, string, string, string, string];
};

export type VillaType = {
  id: "type-1" | "type-2" | "type-3" | "type-4";
  title: string;
  description: string;
  options: [VillaOption, VillaOption];
};

export type SiteMessages = {
  navHome: string;
  navRegister: string;
  navContact: string;
  langAr: string;
  langEn: string;
  heroSlogan: string;
  heroLogoAlt: string;
  heroGalleryAlt: string;
  statsTitle: string;
  statVillas: string;
  statLands: string;
  statTotalArea: string;
  statThousand: string;
  statM2: string;
  registerTitle: string;
  registerSubtitle: string;
  registerCtaTitle: string;
  registerCtaSubtitle: string;
  registerStart: string;
  registerAriaChoose: string;
  villasTitle: string;
  villasSubtitle: string;
  landTitle: string;
  landSubtitle: string;
  selectBrand: string;
  selectTitle: string;
  selectSubtitle: string;
  selectCurrentChoice: string;
  selectBackHome: string;
  stepPropertyType: string;
  stepVillaType: string;
  stepYourDetails: string;
  sectionPropertyType: string;
  sectionVillaType: string;
  sectionYourDetails: string;
  yourDetailsHint: string;
  labelFullName: string;
  labelEmail: string;
  labelPhone: string;
  labelAddress: string;
  placeholderFullName: string;
  placeholderPhone: string;
  placeholderAddress: string;
  summaryTitle: string;
  prev: string;
  next: string;
  submit: string;
  submitSending: string;
  submitErrorGeneric: string;
  submitErrorDb: string;
  typeVillas: string;
  typeLand: string;
  rooms: (n: number) => string;
  lightboxDialog: string;
  lightboxPrev: string;
  lightboxNext: string;
  lightboxClose: string;
  openImage: (i: number) => string;
  thankTitle: string;
  thankSlogan: string;
  thankBack: string;
  thankEdit: string;
  masterPlanTitle: string;
  masterPlanSubtitle: string;
  masterPlanAlt: string;
  masterPlanExpand: string;
  masterPlanClose: string;
  adAlts: string[];
};

const AR: SiteMessages = {
  navHome: "الصفحة الرئيسية",
  navRegister: "تسجيل اهتمام",
  navContact: "تواصل معنا",
  langAr: "العربية",
  langEn: "English",
  heroSlogan: "نعيد للحي معناه",
  heroLogoAlt: "حي الملتقى",
  heroGalleryAlt: "صورة من المشروع",
  statsTitle: "الإحصائيات",
  statVillas: "عدد الفلل",
  statLands: "عدد الاراضي",
  statTotalArea: "المساحة الاجمالية",
  statThousand: "ألف",
  statM2: "م",
  registerTitle: "تسجيل اهتمام",
  registerSubtitle:
    "أكمل خطوات سريعة لاختيار نوع العقار ثم أكمل نموذج تسجيل الاهتمام.",
  registerCtaTitle: "سجل اهتمامك",
  registerCtaSubtitle: "اختيار نوع العقار",
  registerStart: "ابدأ",
  registerAriaChoose: "اختيار",
  villasTitle: "فلل",
  villasSubtitle: "إطلالات ومساحات رحبة",
  landTitle: "أراضي",
  landSubtitle: "فرص استثمارية مرنة",
  selectBrand: "حي الملتقى",
  selectTitle: "خطوات الاختيار",
  selectSubtitle: "اختر تفضيلاتك بخطوات سريعة، ثم أكمل تسجيل الاهتمام.",
  selectCurrentChoice: "اختيارك الحالي",
  selectBackHome: "رجوع للرئيسية",
  stepPropertyType: "نوع العقار",
  stepVillaType: "نوع الفلة",
  stepYourDetails: "بياناتك",
  sectionPropertyType: "نوع العقار",
  sectionVillaType: "نوع الفلة",
  sectionYourDetails: "بياناتك",
  yourDetailsHint: "أدخل بياناتك لإرسال طلب تسجيل الاهتمام.",
  labelFullName: "الاسم الكامل",
  labelEmail: "البريد الإلكتروني",
  labelPhone: "رقم الهاتف",
  labelAddress: "العنوان",
  placeholderFullName: "اكتب اسمك الكامل",
  placeholderPhone: "مثال: 9xxxxxxx",
  placeholderAddress: "مثال: مسقط، ...",
  summaryTitle: "ملخص اختيارك",
  prev: "السابق",
  next: "التالي",
  submit: "إرسال",
  submitSending: "جاري الإرسال…",
  submitErrorGeneric: "تعذر حفظ طلبك. تحقق من الاتصال وحاول مرة أخرى.",
  submitErrorDb: "تعذر حفظ الطلب في قاعدة البيانات. تأكد أن المشروع مهيأ (نفّذ في مجلد المشروع: npx prisma db push).",
  typeVillas: "فلل",
  typeLand: "أراضي",
  rooms: (n) => `${n} غرف`,
  lightboxDialog: "عرض الصورة",
  lightboxPrev: "السابق",
  lightboxNext: "التالي",
  lightboxClose: "إغلاق",
  openImage: (i) => `فتح الصورة ${i}`,
  thankTitle: "شكرًا لاختياركم حي الملتقى",
  thankSlogan: "نعيد للحي معناه",
  thankBack: "العودة للرئيسية",
  thankEdit: "تعديل اختيارك",
  masterPlanTitle: "مخطط المشروع",
  masterPlanSubtitle: "نظرة شاملة على تخطيط حي الملتقى وتوزيع المرافق والمساحات",
  masterPlanAlt: "مخطط عام ثلاثي الأبعاد لحي الملتقى",
  masterPlanExpand: "اضغط لتكبير المخطط",
  masterPlanClose: "إغلاق",
  adAlts: [
    "إعلان حي الملتقى 1",
    "إعلان حي الملتقى 2",
    "إعلان حي الملتقى 3",
    "إعلان حي الملتقى 4",
    "إعلان حي الملتقى 5",
  ],
};

const EN: SiteMessages = {
  navHome: "Home",
  navRegister: "Register Interest",
  navContact: "Contact Us",
  langAr: "العربية",
  langEn: "English",
  heroSlogan: "We restore meaning to the neighborhood",
  heroLogoAlt: "Al Multaqa",
  heroGalleryAlt: "Project gallery image",
  statsTitle: "Statistics",
  statVillas: "Villas",
  statLands: "Plots",
  statTotalArea: "Total project area",
  statThousand: "k",
  statM2: "m",
  registerTitle: "Register your interest",
  registerSubtitle:
    "Complete a few quick steps to choose your property type, then submit the interest form.",
  registerCtaTitle: "Register your interest",
  registerCtaSubtitle: "Choose a property type",
  registerStart: "Start",
  registerAriaChoose: "Choose",
  villasTitle: "Villas",
  villasSubtitle: "Spacious living and views",
  landTitle: "Land",
  landSubtitle: "Flexible investment opportunities",
  selectBrand: "Al Multaqa",
  selectTitle: "Selection steps",
  selectSubtitle: "Choose your preferences in a few steps, then complete registration.",
  selectCurrentChoice: "Your current choice",
  selectBackHome: "Back to home",
  stepPropertyType: "Property type",
  stepVillaType: "Villa type",
  stepYourDetails: "Your details",
  sectionPropertyType: "Property type",
  sectionVillaType: "Villa type",
  sectionYourDetails: "Your details",
  yourDetailsHint: "Enter your details to submit your interest request.",
  labelFullName: "Full name",
  labelEmail: "Email",
  labelPhone: "Phone number",
  labelAddress: "Address",
  placeholderFullName: "Enter your full name",
  placeholderPhone: "e.g. 9xxxxxxx",
  placeholderAddress: "e.g. Muscat, ...",
  summaryTitle: "Your selection summary",
  prev: "Previous",
  next: "Next",
  submit: "Submit",
  submitSending: "Sending…",
  submitErrorGeneric: "We could not save your request. Check your connection and try again.",
  submitErrorDb: "Could not save to the database. From the project folder run: npx prisma db push",
  typeVillas: "Villas",
  typeLand: "Land",
  rooms: (n) => `${n} ${n === 1 ? "bedroom" : "bedrooms"}`,
  lightboxDialog: "Image viewer",
  lightboxPrev: "Previous image",
  lightboxNext: "Next image",
  lightboxClose: "Close",
  openImage: (i) => `Open image ${i}`,
  thankTitle: "Thank you for choosing Al Multaqa",
  thankSlogan: "We restore meaning to the neighborhood",
  thankBack: "Back to home",
  thankEdit: "Change your selection",
  masterPlanTitle: "Master plan",
  masterPlanSubtitle: "A full overview of Al Multaqa layout, amenities, and zoning",
  masterPlanAlt: "3D master plan of Al Multaqa neighborhood",
  masterPlanExpand: "Click to enlarge the plan",
  masterPlanClose: "Close",
  adAlts: [
    "Al Multaqa advertisement 1",
    "Al Multaqa advertisement 2",
    "Al Multaqa advertisement 3",
    "Al Multaqa advertisement 4",
    "Al Multaqa advertisement 5",
  ],
};

export function getSiteMessages(lang: Lang): SiteMessages {
  return lang === "ar" ? AR : EN;
}

export function typeLabel(lang: Lang, type: "villas" | "land"): string {
  const t = getSiteMessages(lang);
  return type === "villas" ? t.typeVillas : t.typeLand;
}

export function getVillaCatalog(lang: Lang): VillaType[] {
  const dash = "—";
  const price = lang === "ar" ? `سعر: ${dash}` : `Price: ${dash}`;
  const area = lang === "ar" ? `مساحة: ${dash}` : `Area: ${dash}`;
  const optA = lang === "ar" ? "أوبشن A" : "Option A";
  const optB = lang === "ar" ? "أوبشن B" : "Option B";
  const desc =
    lang === "ar"
      ? "اختلاف في المساحة والشكل وعدد الغرف"
      : "Variations in area, layout, and bedroom count";
  const titles =
    lang === "ar"
      ? (["تايب 1", "تايب 2", "تايب 3", "تايب 4"] as const)
      : (["Type 1", "Type 2", "Type 3", "Type 4"] as const);

  const mkType = (
    id: VillaType["id"],
    title: string,
    aBeds: number,
    bBeds: number,
    optionAImages?: [string, string, string, string, string],
    optionBImages?: [string, string, string, string, string],
  ): VillaType => ({
    id,
    title,
    description: desc,
    options: [
      {
        id: "a",
        title: optA,
        priceLabel: price,
        areaLabel: area,
        bedrooms: aBeds,
        images: optionAImages ?? [...PLACEHOLDER_IMAGES],
      },
      {
        id: "b",
        title: optB,
        priceLabel: price,
        areaLabel: area,
        bedrooms: bBeds,
        images: optionBImages ?? [...PLACEHOLDER_IMAGES],
      },
    ],
  });

  const type1Area =
    lang === "ar" ? "أرض 400 م² • بناء 212 م²" : "Land 400 m² • Built-up 212 m²";
  const type1Rooms =
    lang === "ar"
      ? "3 غرف • صالة • غرفة شغالة"
      : "3 bedrooms • hall • maid room";

  const type1: VillaType = {
    id: "type-1",
    title: titles[0],
    description: desc,
    options: [
      {
        id: "a",
        title: optA,
        priceLabel: price,
        areaLabel: type1Area,
        bedrooms: 3,
        roomsLabel: type1Rooms,
        images: TYPE_1_OPTION_A_IMAGES,
      },
      {
        id: "b",
        title: optB,
        priceLabel: price,
        areaLabel: type1Area,
        bedrooms: 3,
        roomsLabel: type1Rooms,
        images: TYPE_1_OPTION_B_IMAGES,
      },
    ],
  };

  return [
    type1,
    mkType("type-2", titles[1], 3, 5, TYPE_2_OPTION_A_IMAGES, TYPE_2_OPTION_B_IMAGES),
    mkType("type-3", titles[2], 4, 5, TYPE_3_OPTION_A_IMAGES, TYPE_3_OPTION_B_IMAGES),
    mkType("type-4", titles[3], 3, 4, TYPE_4_OPTION_A_IMAGES, TYPE_4_OPTION_B_IMAGES),
  ];
}
