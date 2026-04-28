"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";

const recentBakes = [
  { id: 1, title: "Summer Blossom", category: "Wedding", image: "/images/wedding.png" },
  { id: 2, title: "Dino Adventure", category: "Birthday", image: "/images/kids.png" },
  { id: 3, title: "Golden Elegance", category: "Anniversary", image: "/images/hero.png" },
  { id: 4, title: "Berry Bliss", category: "Holiday", image: "/images/birthday.png" }
];

export default function PortfolioPreview() {
  return (
    <Section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="text-center md:text-left space-y-4">
          <Badge variant="outline">Recent Creations</Badge>
          <Heading size="h2">From our studio to you</Heading>
        </div>
        <Link 
          href="/gallery" 
          className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
        >
          Explore All Creations
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recentBakes.map((bake, index) => (
          <motion.div
            key={bake.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-square"
          >
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
              <Image
                src={bake.image}
                alt={bake.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <Badge variant="dark" className="bg-white/20 text-white w-fit mb-2">
                  {bake.category}
                </Badge>
                <Heading as="h4" size="h5" className="text-white">{bake.title}</Heading>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
