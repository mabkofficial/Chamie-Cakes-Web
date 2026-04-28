import FilterableGrid from "@/components/gallery/FilterableGrid";
import CTABanner from "@/components/landing/CTABanner";

export const metadata = {
  title: "Cake Gallery | Chamie Cakes",
  description: "Browse our gallery of custom wedding cakes, birthday cakes, and special occasion creations.",
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col min-h-screen pt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Our Creations</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by our past designs. Have something else in mind? We love bringing new visions to life.
          </p>
        </div>
        
        <FilterableGrid />
      </div>
      
      <div className="mt-20">
        <CTABanner />
      </div>
    </main>
  );
}
