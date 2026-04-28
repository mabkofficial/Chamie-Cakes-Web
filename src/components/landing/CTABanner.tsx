"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 bg-primary/10 border-t border-primary/20" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="cta-heading" className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">Ready to Create Your Custom Cake?</h2>
          

          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 4, repeatDelay: 1, ease: "easeInOut" }}
            className="inline-block mt-4 mb-8"
          >
            <Link 
              href="/order" 
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#D4AF37] hover:bg-[#b8952b] text-white rounded-full px-12 py-8 text-xl font-medium shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all"
              )}
            >
              Start Your Order &rarr;
            </Link>
          </motion.div>
          
          <div className="flex items-center justify-center gap-3 text-muted-foreground text-lg">
            <PhoneCall className="w-5 h-5 text-primary" />
            <p>
              Or call Chamie directly at <a href="tel:7132693696" className="text-foreground font-semibold hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">713.269.3696</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
