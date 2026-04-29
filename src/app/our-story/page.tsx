import { SITE_CONFIG } from "@/lib/config";
import StoryView from "@/components/about/StoryView";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: `Our Story | ${SITE_CONFIG.name}`,
  description: "Learn about the passion behind Chamie Cakes, a custom cake studio in Dallas.",
};

export default async function OurStoryPage() {
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("key", "brand_story")
    .single();

  const brandStory = content?.content || {
    title: "Our Story",
    content: "Welcome to Chamie Cakes, where we believe every celebration deserves a centerpiece that is as unique as the moment itself."
  };

  return <StoryView data={brandStory} />;
}
