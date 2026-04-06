"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { revalidatePath } from "next/cache";

function parseImages(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function updateVillaTypeAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("missing slug");

  const vt = await prisma.villaType.findUnique({ where: { slug } });
  if (!vt) throw new Error("not found");

  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  await prisma.villaType.update({
    where: { slug },
    data: {
      titleAr: String(formData.get("titleAr") ?? "").trim(),
      titleEn: String(formData.get("titleEn") ?? "").trim(),
      descriptionAr: String(formData.get("descriptionAr") ?? "").trim(),
      descriptionEn: String(formData.get("descriptionEn") ?? "").trim(),
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    },
  });

  for (const key of ["a", "b"] as const) {
    const opt = await prisma.villaOption.findFirst({
      where: { villaTypeId: vt.id, optionKey: key },
    });
    if (!opt) continue;

    const p = `opt_${key}_`;
    const images = parseImages(String(formData.get(`${p}images`) ?? ""));

    await prisma.villaOption.update({
      where: { id: opt.id },
      data: {
        titleAr: String(formData.get(`${p}titleAr`) ?? "").trim(),
        titleEn: String(formData.get(`${p}titleEn`) ?? "").trim(),
        priceLabelAr: String(formData.get(`${p}priceLabelAr`) ?? "").trim(),
        priceLabelEn: String(formData.get(`${p}priceLabelEn`) ?? "").trim(),
        areaLabelAr: String(formData.get(`${p}areaLabelAr`) ?? "").trim(),
        areaLabelEn: String(formData.get(`${p}areaLabelEn`) ?? "").trim(),
        bedrooms: Math.max(0, Number(formData.get(`${p}bedrooms`) ?? 0)) || 0,
        roomsLabelAr: String(formData.get(`${p}roomsLabelAr`) ?? "").trim() || null,
        roomsLabelEn: String(formData.get(`${p}roomsLabelEn`) ?? "").trim() || null,
        images: (images.length ? images : ["/images/gallery-exhibit/gallery-big.png"]) as unknown as Prisma.InputJsonValue,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/select");
  revalidatePath("/admin/villas");
}

export async function createLandAction(formData: FormData) {
  await requireAdmin();
  const maxSo = await prisma.landOffering.aggregate({ _max: { sortOrder: true } });
  const sortOrder = (maxSo._max.sortOrder ?? -1) + 1;

  await prisma.landOffering.create({
    data: {
      sortOrder,
      active: true,
      titleAr: String(formData.get("titleAr") ?? "").trim(),
      titleEn: String(formData.get("titleEn") ?? "").trim(),
      subtitleAr: String(formData.get("subtitleAr") ?? "").trim(),
      subtitleEn: String(formData.get("subtitleEn") ?? "").trim(),
      imageSrc: String(formData.get("imageSrc") ?? "").trim() || "/images/property-land.svg",
      overlayCss: String(formData.get("overlayCss") ?? "").trim() || null,
    },
  });
  revalidatePath("/");
  revalidatePath("/select");
  revalidatePath("/admin/lands");
}

export async function updateLandAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("missing id");

  await prisma.landOffering.update({
    where: { id },
    data: {
      titleAr: String(formData.get("titleAr") ?? "").trim(),
      titleEn: String(formData.get("titleEn") ?? "").trim(),
      subtitleAr: String(formData.get("subtitleAr") ?? "").trim(),
      subtitleEn: String(formData.get("subtitleEn") ?? "").trim(),
      imageSrc: String(formData.get("imageSrc") ?? "").trim() || "/images/property-land.svg",
      overlayCss: String(formData.get("overlayCss") ?? "").trim() || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
      active: String(formData.get("active") ?? "1") === "1",
    },
  });
  revalidatePath("/");
  revalidatePath("/select");
  revalidatePath("/admin/lands");
}

export async function deleteLandAction(id: string) {
  await requireAdmin();
  await prisma.landOffering.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/select");
  revalidatePath("/admin/lands");
}

export async function deleteLandFormAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (id) await deleteLandAction(id);
}
