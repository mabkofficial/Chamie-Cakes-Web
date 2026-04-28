"use client";

import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-heading font-bold text-lg">
                {SITE_CONFIG.name.charAt(0)}
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
              Bespoke artisanal bakes handcrafted in Dallas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white/30 font-bold tracking-[0.2em] uppercase text-[8px]">Explore</h3>
            <ul className="grid grid-cols-1 gap-3">
              <li><Link href="/gallery" className="text-white/60 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">Gallery</Link></li>
              <li><Link href="/our-story" className="text-white/60 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">About</Link></li>
              <li><Link href="/order" className="text-white/60 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest">Inquire</Link></li>
            </ul>
          </div>

          {/* Studio Info */}
          <div className="space-y-6">
            <h3 className="text-white/30 font-bold tracking-[0.2em] uppercase text-[8px]">Studio</h3>
            <div className="space-y-3">
              <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-xs font-medium text-white/60 hover:text-white transition-colors block tracking-widest uppercase">{SITE_CONFIG.contact.phone}</a>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-xs font-medium text-white/60 hover:text-white transition-colors block tracking-widest uppercase">{SITE_CONFIG.contact.email}</a>
              <span className="text-xs font-medium text-white/40 block tracking-widest uppercase">Dallas, TX</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h3 className="text-white/30 font-bold tracking-[0.2em] uppercase text-[8px]">Follow</h3>
            <div className="flex gap-6">
              <a href={SITE_CONFIG.contact.instagram} className="text-white/50 hover:text-white transition-all group flex items-center gap-3">
                <InstagramIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
              </a>
              <a href={SITE_CONFIG.contact.facebook} className="text-white/50 hover:text-white transition-all group flex items-center gap-3">
                <FacebookIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Facebook</span>
              </a>
            </div>
          </div>
          
        </div>

        {/* Minimal Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.2em]">
            &copy; {currentYear} {SITE_CONFIG.name}.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[8px] text-white/30 hover:text-white transition-colors font-bold uppercase tracking-[0.2em]">Privacy</Link>
            <Link href="#" className="text-[8px] text-white/30 hover:text-white transition-colors font-bold uppercase tracking-[0.2em]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
