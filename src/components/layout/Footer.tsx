import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/5 pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Intro */}
          <div className="md:col-span-1">
            <Link href="/" className="font-heading font-bold text-2xl tracking-wide text-foreground block mb-4">
              CHAMIE CAKES
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Handcrafted, artisanal custom cakes for life's sweetest moments in the Dallas/Fort Worth area.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cake Gallery</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Chamie</Link></li>
              <li><Link href="/order" className="text-muted-foreground hover:text-primary transition-colors text-sm">Start an Order</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:7132693696" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  713.269.3696
                </a>
              </li>
              <li>
                <a href="mailto:hello@chamiecakes.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  hello@chamiecakes.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                Dallas / Fort Worth
              </li>
            </ul>
          </div>

          {/* Social / Newsletter (Placeholder) */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#D4AF37] hover:text-white transition-colors text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#D4AF37] hover:text-white transition-colors text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Chamie Cakes. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
