import { getAllCakes } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";
import GalleryView from "@/components/gallery/GalleryView";

export const metadata = {
  title: `Cake Gallery | ${SITE_CONFIG.name}`,
  description: "Browse our collection of custom cakes, handcrafted in Dallas/Fort Worth.",
};

export default function GalleryPage() {
  const cakes = getAllCakes();

  return <GalleryView cakes={cakes} />;
}
