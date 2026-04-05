import { Suspense } from "react";
import { loadPublicCatalog } from "@/lib/public-catalog";
import { SelectionFlow } from "./selection-flow";

export const dynamic = "force-dynamic";

export default async function SelectPage() {
  const catalog = await loadPublicCatalog();
  return (
    <Suspense fallback={null}>
      <SelectionFlow catalog={catalog} />
    </Suspense>
  );
}
