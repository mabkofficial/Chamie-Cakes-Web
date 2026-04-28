import { SITE_CONFIG } from "@/lib/config";
import ContactView from "@/components/contact/ContactView";

export const metadata = {
  title: `Contact Us | ${SITE_CONFIG.name}`,
  description: "Get in touch with Chamie Cakes in Dallas/Fort Worth for custom cake inquiries and general questions.",
};

export default function ContactPage() {
  return <ContactView />;
}
