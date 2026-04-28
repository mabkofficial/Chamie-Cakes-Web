import HeroSectionFull from "@/components/landing/HeroSectionFull";
import { getContent } from "@/lib/content";

export default function HeroV2Page() {
  const homeData = getContent("pages/home.md");

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSectionFull 
        title={homeData.heroTitle} 
        subtitle={homeData.heroSubtitle} 
      />
      <div className="py-20 text-center bg-white">
        <p className="text-slate-400 font-body">This is a showcase of the Full Width Hero Variation.</p>
        <a href="/" className="text-black font-bold underline mt-4 inline-block">Back to Standard Hero</a>
      </div>
    </main>
  );
}
