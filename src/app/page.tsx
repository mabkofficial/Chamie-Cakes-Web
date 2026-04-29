import HeroSection from "@/components/landing/HeroSection";
import CategoryGrid from "@/components/landing/CategoryGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import AboutPreview from "@/components/landing/AboutPreview";
import PortfolioPreview from "@/components/landing/PortfolioPreview";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTABanner from "@/components/landing/CTABanner";
import { getContent } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";
import Script from "next/script";

export const metadata = {
  title: `${SITE_CONFIG.name} | Custom Cakes in Dallas/Fort Worth`,
  description: "Handcrafted custom cakes for weddings, birthdays, and special events in the Dallas/Fort Worth area.",
};

export default function Home() {
  const homeData = getContent("pages/home.md");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": SITE_CONFIG.name,
    "image": `https://${SITE_CONFIG.domain}/images/hero.png`,
    "description": homeData.heroSubtitle || "Custom cakes for life's sweetest moments, handcrafted in Dallas/Fort Worth.",
    "url": `https://${SITE_CONFIG.domain}`,
    "telephone": SITE_CONFIG.contact.phone,
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
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        title={homeData.heroTitle} 
        subtitle={homeData.heroSubtitle} 
      />
      <AboutPreview />
      <CategoryGrid 
        title={homeData.specialtiesTitle} 
        description={homeData.specialtiesIntro} 
      />
      <HowItWorks />
      <PortfolioPreview />
      <Testimonials />
      <FAQ />
      <CTABanner phone={SITE_CONFIG.contact.phone} />
    </main>
  );
}
