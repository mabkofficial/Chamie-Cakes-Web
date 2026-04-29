import HeroSection from "@/components/landing/HeroSection";
import CategoryGrid from "@/components/landing/CategoryGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import AboutPreview from "@/components/landing/AboutPreview";
import PortfolioPreview from "@/components/landing/PortfolioPreview";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTABanner from "@/components/landing/CTABanner";
import { SITE_CONFIG } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import Script from "next/script";

export const metadata = {
  title: `${SITE_CONFIG.name} | Custom Cakes in Dallas/Fort Worth`,
  description: "Handcrafted custom cakes for weddings, birthdays, and special events in the Dallas/Fort Worth area.",
};

export default async function Home() {
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .in("key", ["home_hero", "brand_story", "specialties"]);

  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(4);

  const homeHero = content?.find(c => c.key === "home_hero")?.content || {
    title: "Artisan Cakes.",
    subtitle: "Crafted for your most precious moments.",
    cta: "Order Now"
  };

  const brandStory = content?.find(c => c.key === "brand_story")?.content || {
    title: "Our Story",
    content: "Welcome to Chamie Cakes..."
  };

  const specialties = content?.find(c => c.key === "specialties")?.content || {
    title: "Crafted for Every Celebration",
    description: "Explore our most popular cake categories, baked fresh from scratch with love."
  };

  const recentCakes = gallery?.map(item => ({
    id: item.id,
    title: item.title || "Custom Cake",
    image: item.image_url,
    category: item.category || "Cakes"
  })) || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": SITE_CONFIG.name,
    "image": `https://${SITE_CONFIG.domain}/images/hero.png`,
    "description": homeHero.subtitle,
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
        title={homeHero.title} 
        subtitle={homeHero.subtitle} 
      />
      <AboutPreview data={brandStory} />
      <CategoryGrid 
        title={specialties.title} 
        description={specialties.description} 
      />
      <HowItWorks />
      <PortfolioPreview cakes={recentCakes} />
      <Testimonials />
      <FAQ />
      <CTABanner phone={SITE_CONFIG.contact.phone} />
    </main>
  );
}
