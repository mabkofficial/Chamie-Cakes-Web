"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";
import { SITE_CONFIG } from "@/lib/config";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" } as any
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    } as any
  }
};

export default function ContactView() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Cinematic Header */}
      <Section className="min-h-screen flex items-center pt-32 pb-12 overflow-hidden relative">
        <motion.div 
          className="max-w-4xl space-y-8 relative z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
           >
             <Badge variant="outline" className="border-black/10 text-black/40">Connect</Badge>
           </motion.div>
           <Heading as="h1" size="h1" className="tracking-tighter leading-none">
             Inquire & Inspire.
           </Heading>
           <p className="text-xl md:text-2xl text-slate-400 font-body leading-relaxed max-xl">
             Whether you have a vision in mind or need a professional guide, we're here to help you craft your perfect centerpiece.
           </p>
        </motion.div>
        
        {/* Decorative Blur */}
        <motion.div 
          className="absolute right-0 bottom-0 w-1/4 aspect-square bg-slate-50 rounded-full blur-[100px] -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </Section>

      <Section className="pb-40" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Contact Details */}
          <motion.div 
            className="space-y-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="space-y-12">
              <motion.div className="group space-y-4" variants={fadeInUp}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Call or Text</span>
                </div>
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="block text-3xl font-heading font-bold text-black hover:translate-x-2 transition-transform duration-500">
                  {SITE_CONFIG.contact.phone}
                </a>
              </motion.div>

              <motion.div className="group space-y-4" variants={fadeInUp}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Email</span>
                </div>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="block text-3xl font-heading font-bold text-black hover:translate-x-2 transition-transform duration-500">
                  {SITE_CONFIG.contact.email}
                </a>
              </motion.div>

              <motion.div className="group space-y-4" variants={fadeInUp}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Studio</span>
                </div>
                <p className="text-3xl font-heading font-bold text-black">
                  Dallas, TX Metroplex
                </p>
              </motion.div>
            </div>

            {/* Socials */}
            <motion.div className="pt-16 border-t border-slate-100 space-y-8" variants={fadeInUp}>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Digital Gallery</p>
              <div className="flex gap-8">

                <a href={SITE_CONFIG.contact.instagram} className="flex items-center gap-3 text-slate-400 hover:text-black transition-all group">
                   <InstagramIcon className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">Instagram</span>
                </a>
                <a href={SITE_CONFIG.contact.facebook} className="flex items-center gap-3 text-slate-400 hover:text-black transition-all group">
                   <FacebookIcon className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">Facebook</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div 
            className="bg-slate-50 p-12 md:p-16 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="space-y-4 mb-12 relative z-10">
               <Heading as="h2" size="h3">Send a Message</Heading>
               <p className="text-sm text-slate-500 font-body">We'll get back to you within 24-48 business hours.</p>
             </div>

             <form className="space-y-8 relative z-10" data-netlify="true" name="contact" method="POST">
                <input type="hidden" name="form-name" value="contact" />
                
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="John Doe"
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-100 outline-none focus:border-black transition-all text-sm font-body focus:shadow-lg focus:scale-[1.01]"
                  />
                </motion.div>

                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="hello@example.com"
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-100 outline-none focus:border-black transition-all text-sm font-body focus:shadow-lg focus:scale-[1.01]"
                  />
                </motion.div>

                <motion.div className="space-y-2" variants={fadeInUp}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Your Vision</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={5}
                    placeholder="Tell us about your event, preferred flavors, or any design inspirations you have..."
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-100 outline-none focus:border-black transition-all text-sm font-body resize-none leading-relaxed focus:shadow-lg focus:scale-[1.01]"
                  />
                </motion.div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group"
                >
                   Send Inquiry
                   <Send className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>
             </form>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
