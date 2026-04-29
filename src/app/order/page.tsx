import { SITE_CONFIG } from "@/lib/config";
import MultiStepForm from "@/components/order/MultiStepForm";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";

export const metadata = {
  title: "Order Your Cake | Chamie Cakes",
  description: "Start your order for a custom cake with Chamie Cakes in Dallas.",
};

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-32 pb-24 px-6">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
           <Badge variant="outline" className="border-black/10 text-black/40">Order Form</Badge>
           <Heading as="h1" size="h2" align="center" className="tracking-tighter">
             Order Your Cake.
           </Heading>
           <p className="text-base text-slate-500 font-body max-w-md mx-auto">
             Tell us about your idea, and we'll make a beautiful cake for you.
           </p>
        </div>

        {/* Form */}
        <div className="relative">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
