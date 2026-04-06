import type { LeadStatus } from "@prisma/client";

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: "villas" | "shops" | "land";
  status: LeadStatus;
  createdAt: string;
  /** تفاصيل الاختيار والعنوان كما أرسلها الزائر */
  details: Record<string, unknown>;
};

