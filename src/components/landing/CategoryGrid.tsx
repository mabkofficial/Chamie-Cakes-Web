"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "wedding",
    title: "Wedding",
    description: "Elegant tiers for your special day",
    bgColor: "bg-primary/20",
    image: "/images/wedding.png",
    link: "/gallery?filter=wedding"
  },
  {
    id: "birthday",
    title: "Birthday",
    description: "Custom creations for any age",
    bgColor: "bg-secondary/20",
    image: "/images/birthday.png",
    link: "/gallery?filter=birthday"
  },
  {
    id: "kids",
    title: "Kids",
    description: "Fun, colorful, and imaginative",
    bgColor: "bg-accent",
    image: "/images/kids.png",
    link: "/gallery?filter=kids"
  },
  {
    id: "holiday",
    title: "Holiday & Special",
    description: "Seasonal treats & themed bakes",
    bgColor: "bg-primary/10",
    image: "/images/holiday.png",
    link: "/gallery?filter=holiday"
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Our Specialities</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our most popular cake categories, baked fresh from scratch with love.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.link} className="block group h-full">
                <div className={`h-full rounded-2xl overflow-hidden flex flex-col justify-between ${category.bgColor} border border-border/50 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]`}>
                  
                  {/* Image section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Text section */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold mb-2 text-foreground">{category.title}</h3>
                      <p className="text-foreground/80">{category.description}</p>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
