"use server";

import type { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { revalidatePath } from "next/cache";

type PropertyTypeFilter = "all" | "villas" | "shops" | "land";
type StatusFilter = "all" | LeadStatus;

export async function getLeadsAction({
  q,
  type,
  status,
}: {
  q: string;
  type: PropertyTypeFilter;
  status: StatusFilter;
}) {
  await requireAdmin();
  const query = q.trim();

  const where: {
    propertyType?: "villas" | "shops" | "land";
    status?: LeadStatus;
    OR?: Array<Record<string, unknown>>;
  } = {};

  if (type !== "all") where.propertyType = type;
  if (status !== "all") where.status = status;

  if (query) {
    where.OR = [
      { name: { contains: query } },
      { phone: { contains: query } },
      { email: { contains: query } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      propertyType: true,
      status: true,
      details: true,
      createdAt: true,
    },
    take: 250,
  });

  return leads.map((l) => {
    const raw = l.details;
    const details =
      typeof raw === "object" && raw !== null && !Array.isArray(raw)
        ? (raw as Record<string, unknown>)
        : {};
    return {
      id: l.id,
      name: l.name,
      phone: l.phone,
      email: l.email,
      propertyType: l.propertyType,
      status: l.status,
      createdAt: l.createdAt.toISOString(),
      details,
    };
  });
}

export async function deleteLeadAction(id: string) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function updateLeadStatusAction(id: string, next: LeadStatus) {
  await requireAdmin();
  await prisma.lead.update({ where: { id }, data: { status: next } });
  revalidatePath("/admin");
}

