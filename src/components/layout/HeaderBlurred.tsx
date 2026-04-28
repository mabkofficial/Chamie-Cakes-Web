"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderBlurred({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-3xl border-b border-black/5", className)}>
      <div className="container mx-auto px-10 h-24 flex items-center justify-between max-w-7xl">
        <div className="flex-1 flex gap-10">
          <Link href="/gallery" className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/60">Gallery</Link>
          <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/60">Story</Link>
        </div>
        
        <Link href="/" className="font-heading text-3xl font-bold tracking-tighter text-black">
          {SITE_CONFIG.name.split(' ')[0]}
        </Link>
        
        <div className="flex-1 flex justify-end gap-10">
          <Link href="/contact" className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/60">Contact</Link>
          <Link href="/order" className="text-[10px] font-bold uppercase tracking-[0.4em] text-black font-black">Order</Link>
        </div>
      </div>
    </header>
  );
}
