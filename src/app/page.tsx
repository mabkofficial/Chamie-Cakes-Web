import HeroSection from "@/components/landing/HeroSection";
import CategoryGrid from "@/components/landing/CategoryGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import CTABanner from "@/components/landing/CTABanner";

export const metadata = {
  title: "Chamie Cakes | Custom Cakes in Dallas/Fort Worth",
  description: "Handcrafted, artisanal custom cakes for weddings, birthdays, and special events in the Dallas/Fort Worth area.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Chamie Cakes",
    "image": "https://chamiecakes.com/images/hero.png",
    "description": "Custom cakes for life's sweetest moments, handcrafted in Dallas/Fort Worth.",
    "url": "https://chamiecakes.com",
    "telephone": "7132693696",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dallas",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "servesCuisine": "Custom Cakes",
    "priceRange": "$$"
  };

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      {/* Testimonial component will go here in Phase 3 */}
      <CTABanner />
    </main>
  );
}
