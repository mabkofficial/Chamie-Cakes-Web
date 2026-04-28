import Image from "next/image";
import CTABanner from "@/components/landing/CTABanner";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "About Chamie | Chamie Cakes",
  description: "Learn more about Chamie, the passionate baker behind Dallas/Fort Worth's favorite custom cakes.",
};

export default function AboutPage() {
  const aboutData = getContent("pages/about.md");
  const contactData = getContent("settings/contact.json");

  return (
    <main className="flex flex-col min-h-screen pt-28 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 py-12">
          
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              {aboutData.bakerImage ? (
                <Image 
                  src={aboutData.bakerImage} 
                  alt="Chamie, the baker" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-heading text-2xl font-bold">Photo of Chamie</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-5xl font-heading font-bold text-foreground">{aboutData.title || "Meet Chamie"}</h1>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              {aboutData.body.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className="mt-12">
        <CTABanner phone={contactData.phone} />
      </div>
    </main>
  );
}
