"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Heading } from "@/components/ui/heading";

const categories = ["All", "Wedding", "Birthday", "Kids", "Holiday", "Trending"];

interface Cake {
  id: string;
  title?: string;
  category?: string;
  image?: string;
  description?: string;
}

const ITEMS_PER_PAGE = 8;

export default function FilterableGrid({ initialCakes = [] }: { initialCakes?: Cake[] }) {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const defaultItems = [
    { id: "1", title: "Midnight Bloom", category: "Wedding", image: "/images/wedding.png" },
    { id: "2", title: "Astronaut Dreams", category: "Kids", image: "/images/kids.png" },
    { id: "3", title: "Gilded Velvet", category: "Birthday", image: "/images/hero.png" },
    { id: "4", title: "Winter Solstice", category: "Holiday", image: "/images/holiday.png" },
    { id: "5", title: "Sculpted Marble", category: "Wedding", image: "/images/wedding.png" },
    { id: "6", title: "Neon Safari", category: "Trending", image: "/images/kids.png" },
    { id: "7", title: "Floral Cascade", category: "Wedding", image: "/images/wedding.png" },
    { id: "8", title: "Pink Galaxy", category: "Kids", image: "/images/kids.png" },
    { id: "9", title: "Golden Age", category: "Birthday", image: "/images/hero.png" },
    { id: "10", title: "Silver Lining", category: "Holiday", image: "/images/holiday.png" },
    { id: "11", title: "Pearl Petals", category: "Wedding", image: "/images/wedding.png" },
    { id: "12", title: "Cloud Nine", category: "Kids", image: "/images/kids.png" },
  ];

  const displayItems = initialCakes.length > 0 ? initialCakes : defaultItems;

  const filteredItems = useMemo(() => {
    const items = displayItems.filter(item => 
      filter === "All" ? true : (item.category || "").toLowerCase() === filter.toLowerCase()
    );
    return items;
  }, [displayItems, filter]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Clean Luxury Filter Tabs (No Separator) */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange(cat)}
            className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
              filter === cat 
                ? "bg-black text-white border-black shadow-xl scale-105" 
                : "bg-white text-slate-600 border-slate-200 hover:border-black hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Standard Clean Grid (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {paginatedItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative"
            >
              <div 
                className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 shadow-sm cursor-pointer border border-slate-100"
                onClick={() => setSelectedImage(item.image || "/images/placeholder.png")}
              >
                <Image
                  src={item.image || "/images/placeholder.png"}
                  alt={item.title || "Cake"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Clean Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-1">
                      <span className="text-[8px] font-bold text-white/60 uppercase tracking-[0.2em]">
                        {item.category}
                      </span>
                      <Heading as="h3" size="h6" className="text-white tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                        {item.title}
                      </Heading>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Homepage Style Navigation (Arrows + Dots) */}
      {totalPages > 1 && (
        <div className="mt-20 flex flex-col items-center gap-10">
           {/* Dots */}
           <div className="flex justify-center gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    currentPage === i + 1 ? "w-8 bg-black" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
           </div>

           {/* Arrows */}
           <div className="flex gap-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all shadow-sm group"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all shadow-sm group"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
           </div>
        </div>
      )}

      {/* Clean Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            
            <motion.div 
              className="relative w-full max-w-4xl aspect-square md:aspect-[4/5] lg:aspect-square"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
