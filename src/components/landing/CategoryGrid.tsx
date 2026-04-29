"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";

const categories = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Elegant tiers for your special day",
    image: "/images/wedding.png",
    link: "/gallery?filter=wedding"
  },
  {
    id: "birthday",
    title: "Birthday",
    description: "Custom creations for any age",
    image: "/images/birthday.png",
    link: "/gallery?filter=birthday"
  },
  {
    id: "kids",
    title: "Kids",
    description: "Fun, colorful, and imaginative",
    image: "/images/kids.png",
    link: "/gallery?filter=kids"
  },
  {
    id: "holiday",
    title: "Holiday & Special",
    description: "Seasonal treats & themed bakes",
    image: "/images/holiday.png",
    link: "/gallery?filter=holiday"
  },
  {
    id: "corporate",
    title: "Corporate",
    description: "Branded treats for your business",
    image: "/images/hero.png", // Reusing image for placeholder
    link: "/gallery?filter=corporate"
  },
  {
    id: "cupcakes",
    title: "Cupcakes",
    description: "Small, tasty cupcakes",
    image: "/images/about-preview.png", // Reusing image for placeholder
    link: "/gallery?filter=cupcakes"
  }
];

export default function CategoryGrid({ 
  title = "Our Specialities", 
  description = "Explore our most popular cake categories, baked fresh from scratch with love." 
}: { 
  title?: string; 
  description?: string; 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const scrollTo = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const cardWidth = 350; // approximate card width
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <Section className="overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline">Our Cakes</Badge>
          </motion.div>
          
          <Heading size="h2">
            {title || "Crafted for Every Celebration"}
          </Heading>
          
          <p className="text-slate-500 text-lg font-body leading-relaxed">
            {description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button 
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
            aria-label="Next category"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        <motion.div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {categories.map((cat, index) => (
            <div 
              key={cat.id}
              className="flex-shrink-0 w-[240px] md:w-[280px] snap-start"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group/card h-full">
                <Link href={cat.link} className="flex flex-col h-full">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3 bg-white flex-grow flex flex-col">
                    <div className="space-y-1">
                      <Heading as="h3" size="h4" className="text-base tracking-tight">{cat.title}</Heading>
                      <p className="text-slate-400 text-[12px] leading-relaxed font-body line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                currentIndex === index ? "w-8 bg-black" : "w-1.5 bg-slate-200"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

// Utility function to hide scrollbar
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
