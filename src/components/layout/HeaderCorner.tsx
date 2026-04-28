"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderCorner({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 p-12 flex justify-between items-start pointer-events-none", className)}>
      <Link href="/" className="pointer-events-auto group">
        <h1 className="font-heading text-3xl font-bold tracking-tighter leading-none flex flex-col">
          <span>{SITE_CONFIG.name.split(' ')[0]}</span>
          <span className="text-slate-300 text-sm tracking-[0.5em] uppercase font-light mt-1">{SITE_CONFIG.name.split(' ')[1]}</span>
        </h1>
      </Link>
      
      <div className="pointer-events-auto flex flex-col items-end gap-10">
        <nav className="flex flex-col items-end gap-4">
           {["Gallery", "Story", "Contact"].map(item => (
             <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-black hover:translate-x-[-4px] transition-all">
               {item}
             </Link>
           ))}
        </nav>
        <Link href="/order" className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xl">
           <Menu className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
