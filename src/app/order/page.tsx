import { SITE_CONFIG } from "@/lib/config";
import MultiStepForm from "@/components/order/MultiStepForm";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";

export const metadata = {
  title: "Commission Your Piece | Chamie Cakes",
  description: "Begin the journey of creating your bespoke custom cake with Chamie Cakes.",
};

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-32 pb-24 px-6">
      <div className="w-full max-w-5xl space-y-12">
        {/* Focused Minimal Header */}
        <div className="text-center space-y-4">
           <Badge variant="outline" className="border-black/10 text-black/40">The Commission</Badge>
           <Heading as="h1" size="h2" align="center" className="tracking-tighter">
             Start Your Journey.
           </Heading>
           <p className="text-base text-slate-500 font-body max-w-md mx-auto">
             Tell us about your vision, and we'll translate it into a sculptural masterpiece.
           </p>
        </div>

        {/* Compact Form Centerpiece */}
        <div className="relative">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
