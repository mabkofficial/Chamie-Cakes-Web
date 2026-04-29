import { SITE_CONFIG } from "@/lib/config";
import GalleryView from "@/components/gallery/GalleryView";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: `Cake Gallery | ${SITE_CONFIG.name}`,
  description: "Browse our collection of custom cakes, handcrafted in Dallas/Fort Worth.",
};

export default async function GalleryPage() {
  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  // Map database structure to component structure
  const cakes = gallery?.map(item => ({
    id: item.id,
    title: item.title || "Custom Cake",
    image: item.image_url,
    category: item.category || "Cakes"
  })) || [];

  return <GalleryView cakes={cakes} />;
}
