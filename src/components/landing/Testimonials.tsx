"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
}

interface TestimonialsData {
  title: string;
  subtitle: string;
  list: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  { name: "Sarah Jenkins", role: "Wedding Client", rating: 5, text: "The cake was absolutely breathtaking. Not only did it look like a piece of art, but every guest raved about the flavor. Chamie truly listened to our vision." },
  { name: "Michael Chen", role: "Birthday Party", rating: 5, text: "I ordered a custom space-themed cake for my son's 5th birthday. The level of detail was incredible! It was the talk of the party." },
  { name: "Elena Rodriguez", role: "Anniversary", rating: 5, text: "Simple, elegant, and delicious. The salted caramel flavor is out of this world. We'll be ordering for every event from now on." },
  { name: "David Thompson", role: "Corporate Event", rating: 5, text: "Professional, timely, and the cakes were perfect. They captured our brand colors beautifully in the decorations." }
];

export default function Testimonials({ data }: { data?: TestimonialsData }) {
  const title = data?.title || "Loved by our clients.";
  const subtitle = data?.subtitle || "Nothing makes us happier than being part of your most special moments.";
  const testimonials = data?.list || defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const cardWidth = 320; // approximate card width
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };

  const next = () => scrollTo((currentIndex + 1) % testimonials.length);
  const prev = () => scrollTo((currentIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <Section className="py-40 bg-slate-50 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline">Testimonials</Badge>
          </motion.div>
          <Heading size="h2">{title}</Heading>
          <p className="text-slate-400 text-lg font-body leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button 
            onClick={prev}
            className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next}
            className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative">
        <motion.div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="flex-shrink-0 w-[300px] md:w-[350px] snap-start"
            >
              <div className="bg-white p-10 md:p-12 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col group hover:shadow-2xl hover:border-black/5 transition-all duration-700">
                <div className="text-slate-100 group-hover:text-black transition-colors duration-700 mb-8">
                  <Quote className="w-10 h-10 fill-current" />
                </div>
                
                <div className="flex text-black mb-6 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                
                <p className="text-base text-slate-500 mb-10 leading-relaxed font-body italic flex-grow">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-black border border-slate-100 flex items-center justify-center font-bold group-hover:bg-black group-hover:text-white transition-colors">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black tracking-tight">{testimonial.name}</h4>
                    <p className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-bold mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Dynamic Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                currentIndex === index ? "w-8 bg-black" : "w-1.5 bg-slate-200"
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
