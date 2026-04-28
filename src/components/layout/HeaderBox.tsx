"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderBox({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 p-6 flex justify-center", className)}>
      <div className="bg-white border-2 border-black p-1 flex items-center gap-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Link href="/" className="bg-black text-white px-4 py-2 font-heading font-bold text-lg">
          {SITE_CONFIG.name.charAt(0)}
        </Link>
        <nav className="flex items-center px-4 gap-6">
          {["Gallery", "Story", "Contact"].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white px-3 py-1 transition-all">
              {item}
            </Link>
          ))}
          <Link href="/order" className="bg-slate-100 text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest border border-black/10">
            Order
          </Link>
        </nav>
      </div>
    </header>
  );
}
