import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type PropertyType = "villas" | "shops" | "land";

type LeadPayload = {
  name: unknown;
  phone: unknown;
  email: unknown;
  propertyType: unknown;
  selectionDetails: unknown;
};

type Lead = {
  name: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  selectionDetails: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPropertyType(value: unknown): value is PropertyType {
  return value === "villas" || value === "shops" || value === "land";
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 7 && digits.length <= 16;
}

function validate(payload: LeadPayload): { ok: true; data: Lead } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const name = normalizeString(payload.name);
  const phone = normalizeString(payload.phone);
  const email = normalizeString(payload.email).toLowerCase();

  if (name.length < 2) errors.name = "الاسم مطلوب";
  if (!isValidPhone(phone)) errors.phone = "رقم الهاتف غير صالح";
  if (!isValidEmail(email)) errors.email = "البريد الإلكتروني غير صالح";

  if (!isPropertyType(payload.propertyType)) {
    errors.propertyType = "نوع العقار غير صالح";
  }

  if (!isRecord(payload.selectionDetails)) {
    errors.selectionDetails = "تفاصيل الاختيار غير صالحة";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  // Validated above: isPropertyType + isRecord
  const propertyType = payload.propertyType as PropertyType;
  const selectionDetails = payload.selectionDetails as Record<string, unknown>;

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      propertyType,
      selectionDetails,
    },
  };
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  if (!isRecord(json)) {
    return NextResponse.json({ ok: false, error: "INVALID_BODY" }, { status: 400 });
  }

  const result = validate({
    name: json.name,
    phone: json.phone,
    email: json.email,
    propertyType: json.propertyType,
    selectionDetails: json.selectionDetails,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", fields: result.errors }, { status: 400 });
  }

  try {
    const created = await prisma.lead.create({
      data: {
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        propertyType: result.data.propertyType,
        details: result.data.selectionDetails as Prisma.InputJsonValue,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        propertyType: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, lead: created }, { status: 201 });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[POST /api/leads] DB error:", err);
    }
    return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
  }
}

