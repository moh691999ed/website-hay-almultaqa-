import { HeroSection } from "@/components/hero-section";
import { BigAdsScreen } from "@/components/big-ads-screen";
import { MasterPlanSection } from "@/components/master-plan-section";
import { RegisterInterestSection } from "@/sections/register-interest-section";
import { loadPublicCatalog } from "@/lib/public-catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const catalog = await loadPublicCatalog();
  return (
    <main className="bg-background">
      <BigAdsScreen />
      <MasterPlanSection />
      <HeroSection />
      <RegisterInterestSection landOfferings={catalog.lands} />
    </main>
  );
}
