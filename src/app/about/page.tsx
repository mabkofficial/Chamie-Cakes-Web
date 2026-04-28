import Image from "next/image";
import CTABanner from "@/components/landing/CTABanner";

export const metadata = {
  title: "About Chamie | Chamie Cakes",
  description: "Learn more about Chamie, the passionate baker behind Dallas/Fort Worth's favorite custom cakes.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen pt-28 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 py-12">
          
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              {/* Fallback image if we don't have Chamie's real picture yet */}
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                 <span className="text-primary font-heading text-2xl font-bold">Photo of Chamie</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-5xl font-heading font-bold text-foreground">Meet Chamie</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Baking has always been more than just a recipe for me—it’s a way to bring joy to life's sweetest moments. 
              Based in the heart of Dallas/Fort Worth, I started Chamie Cakes with a simple mission: to create custom cakes 
              that look spectacular and taste absolutely unforgettable.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every cake that leaves my kitchen is baked from scratch using only the finest ingredients. 
              Whether it's an elegant five-tier wedding cake or a whimsical birthday treat for your little one, 
              I pour my heart into every detail, ensuring your vision comes to life beautifully.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe that a truly great cake should be both a visual centerpiece and a delicious memory. 
              I can't wait to bake for you!
            </p>
          </div>

        </div>
      </div>
      <div className="mt-12">
        <CTABanner />
      </div>
    </main>
  );
}
