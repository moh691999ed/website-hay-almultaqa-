import type { Prisma } from "@prisma/client";

export type VillaTypeWithOptions = Prisma.VillaTypeGetPayload<{ include: { options: true } }>;
