import MultiStepForm from "@/components/order/MultiStepForm";

export const metadata = {
  title: "Start Your Order | Chamie Cakes",
  description: "Request a custom cake from Chamie Cakes. Fill out our multi-step form to get started.",
};

export default function OrderPage() {
  return (
    <main className="flex flex-col min-h-screen pt-28 pb-20 bg-background bg-[url('/images/pattern-bg.png')] bg-repeat">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Start Your Order</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your sweet vision to life? Fill out the details below and Chamie will be in touch shortly.
          </p>
        </div>
        
        <MultiStepForm />
      </div>
    </main>
  );
}
