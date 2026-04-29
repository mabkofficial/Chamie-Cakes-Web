import { getContent } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/config";
import StoryView, { StoryData } from "@/components/about/StoryView";

export const metadata = {
  title: `Our Story | ${SITE_CONFIG.name}`,
  description: "Learn about the passion behind Chamie Cakes, a custom cake studio in Dallas.",
};

export default function OurStoryPage() {
  const aboutData = getContent("pages/about.md") as unknown as StoryData;

  return <StoryView data={aboutData} />;
}
