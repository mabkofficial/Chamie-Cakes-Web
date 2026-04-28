"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    description: "Fill out our order form with your event details, desired flavors, and any inspiration photos."
  },
  {
    number: "02",
    title: "We Design & Bake",
    description: "Chamie creates a custom sketch for your approval, then bakes your cake from scratch using premium ingredients."
  },
  {
    number: "03",
    title: "Enjoy Your Creation",
    description: "Pick up your cake or have it delivered directly to your venue, ready to wow your guests."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-20">
          <h2 id="how-it-works-heading" className="text-4xl font-heading font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Your dream cake in three simple steps</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 z-0" aria-hidden="true" />

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 list-none p-0 m-0">
            {steps.map((step, index) => (
              <motion.li
                key={step.number}
                className="flex flex-col items-center text-center bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold font-heading mb-6 shadow-md shadow-primary/20" aria-hidden="true">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
