"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";
import { SITE_CONFIG } from "@/lib/config";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactView() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Section className="min-h-[50vh] flex items-center pt-32 pb-12">
        <div className="max-w-4xl space-y-8">
          <Badge variant="outline" className="border-black/10 text-black/40">Connect</Badge>
          <Heading as="h1" size="h1" className="tracking-tighter leading-none">
            Get in touch.
          </Heading>
          <p className="text-xl md:text-2xl text-slate-400 font-body leading-relaxed">
            Whether you have a vision in mind or need help with your cake, we're here to help you create something truly special.
          </p>
        </div>
      </Section>

      <Section className="pb-40" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Contact Details */}
          <div className="space-y-16">
            <div className="space-y-12">
              <div className="group space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Call or Text</span>
                </div>
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="block text-3xl font-heading font-bold text-black hover:translate-x-2 transition-transform duration-500">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>

              <div className="group space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Email</span>
                </div>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="block text-3xl font-heading font-bold text-black hover:translate-x-2 transition-transform duration-500">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div className="group space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Studio</span>
                </div>
                <p className="text-3xl font-heading font-bold text-black">
                  Dallas, TX Metroplex
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-16 border-t border-slate-100 space-y-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Our Social Media</p>
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
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-slate-50 p-12 md:p-16 rounded-xl border border-slate-100 shadow-sm">
            <div className="space-y-4 mb-12">
              <Heading as="h2" size="h3">Message Us</Heading>
              <p className="text-sm text-slate-500 font-body">We'll get back to you within 24-48 business hours.</p>
            </div>

            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
                <CheckCircle2 className="w-12 h-12 text-black" />
                <div className="space-y-2">
                  <p className="font-bold text-lg text-black">Message Received!</p>
                  <p className="text-sm text-slate-500">We'll be in touch within 24-48 hours.</p>
                </div>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-100 outline-none focus:border-black transition-all text-sm font-body"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-100 outline-none focus:border-black transition-all text-sm font-body"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Your Idea</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your event, preferred flavors, or any designs you like..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-100 outline-none focus:border-black transition-all text-sm font-body resize-none leading-relaxed"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500 font-medium">Something went wrong. Please try emailing us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <Send className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
