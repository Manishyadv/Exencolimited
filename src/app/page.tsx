// File Path: src/app/page.tsx
import PremiumHero from "@/components/PremiumHero";
import PremiumPrintersSection from "@/components/PremiumPrintersSection";


export default function HomePage() {
  return (
    <div>
      <PremiumHero />

      <PremiumPrintersSection />
    </div>
  );
}