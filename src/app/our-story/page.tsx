import { getContent } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";
import StoryView from "@/components/about/StoryView";

export const metadata = {
  title: `Our Story | ${SITE_CONFIG.name}`,
  description: "Learn about the passion and artistry behind Chamie Cakes, Dallas's premier custom cake studio.",
};

export default function OurStoryPage() {
  const aboutData = getContent("pages/about.md");

  return <StoryView data={aboutData} />;
}
