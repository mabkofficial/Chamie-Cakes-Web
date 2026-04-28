"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = ["All", "Wedding", "Birthday", "Kids", "Holiday", "Trending"];

interface Cake {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export default function FilterableGrid({ initialCakes = [] }: { initialCakes?: Cake[] }) {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fallback items if CMS is empty
  const defaultItems = [
    { id: "1", title: "Classic Floral Tier", category: "Wedding", image: "/images/wedding.png" },
    { id: "2", title: "Pastel Birthday Dream", category: "Birthday", image: "/images/birthday.png" },
    { id: "3", title: "Woodland Creatures", category: "Kids", image: "/images/kids.png" },
    { id: "4", title: "Winter Wonderland", category: "Holiday", image: "/images/holiday.png" },
  ];

  const displayItems = initialCakes.length > 0 ? initialCakes : defaultItems;

  const filteredItems = displayItems.filter(item => 
    filter === "All" ? true : item.category.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="py-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Gallery filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === cat 
                ? "bg-primary text-white shadow-md transform -translate-y-1" 
                : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid (using CSS columns) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid"
            >
              <button 
                className="w-full relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-border/50 bg-white block text-left"
                onClick={() => setSelectedImage(item.image)}
                aria-label={`View full image of ${item.title}`}
              >
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.category} cake`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" aria-hidden="true">
                    <span className="text-white/90 text-sm font-medium uppercase tracking-wider mb-1">{item.category}</span>
                    <h3 className="text-white text-xl font-heading font-bold">{item.title}</h3>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/5] md:aspect-square lg:aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
