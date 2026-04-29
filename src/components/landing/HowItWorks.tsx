"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksData {
  title: string;
  subtitle: string;
  steps: Step[];
}

const defaultSteps: Step[] = [
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

export default function HowItWorks({ data }: { data?: HowItWorksData }) {
  const title = data?.title || "Your dream cake, in three simple steps.";
  const subtitle = data?.subtitle || "A simple process to help you plan your celebration.";
  const steps = data?.steps || defaultSteps;
  return (
    <Section className="py-40 bg-white" aria-labelledby="how-it-works-heading">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
        <div className="space-y-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="border-black/10 text-black/40">How it works</Badge>
          </motion.div>
          <Heading id="how-it-works-heading" size="h2">
            {title.includes('<br') ? (
              <span dangerouslySetInnerHTML={{ __html: title }} />
            ) : title}
          </Heading>
        </div>
        <p className="text-slate-400 text-lg font-body max-w-sm leading-relaxed pt-4">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-slate-100 z-0" />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="relative z-10 flex flex-col group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            {/* Number Circle */}
            <div className="w-24 h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center text-3xl font-heading font-light text-black mb-10 shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-700">
              {step.number}
            </div>

            <div className="space-y-4 pr-8">
              <h3 className="text-xl font-heading font-bold tracking-tight text-black group-hover:translate-x-1 transition-transform duration-500">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-body">
                {step.description}
              </p>
            </div>

            {/* Vertical accent line for mobile */}
            <div className="md:hidden absolute left-12 top-24 bottom-[-64px] w-[1px] bg-slate-100 last:hidden" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
