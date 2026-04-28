import { Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | Chamie Cakes",
  description: "Get in touch with Chamie Cakes in Dallas/Fort Worth for custom cake inquiries and general questions.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen pt-28 bg-white">
      <div className="container mx-auto px-4 max-w-5xl pb-24">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Contact Chamie</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question before you start your custom order? Reach out directly! 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h2 className="text-2xl font-heading font-bold mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              <a href="tel:7132693696" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Call or Text</p>
                  <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">713.269.3696</p>
                </div>
              </a>

              <a href="mailto:hello@chamiecakes.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Email</p>
                  <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">hello@chamiecakes.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Service Area</p>
                  <p className="text-lg font-semibold text-foreground">Dallas / Fort Worth Metroplex</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-bold mb-4">Follow Along</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#D4AF37] hover:text-white transition-colors text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#D4AF37] hover:text-white transition-colors text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* General Inquiry Form */}
          <div className="bg-white rounded-2xl p-8 border border-border shadow-lg">
            <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
            <form className="space-y-4" data-netlify="true" name="contact" method="POST">
              <input type="hidden" name="form-name" value="contact" />
              
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" name="name" required className="w-full p-3 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" required className="w-full p-3 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea name="message" required rows={5} className="w-full p-3 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#b8952b] text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
