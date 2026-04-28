"use client";

import Header from "@/components/layout/Header";
import HeaderMinimal from "@/components/layout/HeaderMinimal";
import HeaderClassic from "@/components/layout/HeaderClassic";
import HeaderHidden from "@/components/layout/HeaderHidden";
import HeaderNoir from "@/components/layout/HeaderNoir";
import HeaderVertical from "@/components/layout/HeaderVertical";
import HeaderUnderline from "@/components/layout/HeaderUnderline";
import HeaderSidekick from "@/components/layout/HeaderSidekick";
import HeaderBlurred from "@/components/layout/HeaderBlurred";
import HeaderBox from "@/components/layout/HeaderBox";
import HeaderGlassBar from "@/components/layout/HeaderGlassBar";
import HeaderDoubleStack from "@/components/layout/HeaderDoubleStack";
import HeaderCorner from "@/components/layout/HeaderCorner";
import HeaderSharp from "@/components/layout/HeaderSharp";

import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";

export default function HeaderShowcase() {
  const options = [
    { id: "01", name: "Floating Glass Pill", component: Header, tags: ["Modern", "Glassmorphism"] },
    { id: "02", name: "Boutique Gallery", component: HeaderMinimal, tags: ["Ultra-Minimal", "Editorial"] },
    { id: "03", name: "Signature Classic", component: HeaderClassic, tags: ["Traditional", "Heritage"] },
    { id: "04", name: "The Hidden Drawer", component: HeaderHidden, tags: ["Clean", "Interactive"] },
    { id: "05", name: "The Dark Noir", component: HeaderNoir, tags: ["Bold", "High-Contrast"] },
    { id: "06", name: "The Vertical Strip", component: HeaderVertical, tags: ["Avant-Garde", "Unique"] },
    { id: "07", name: "The Underline Mono", component: HeaderUnderline, tags: ["Typographic", "Sharp"] },
    { id: "08", name: "The Glass Sidekick", component: HeaderSidekick, tags: ["Asymmetrical", "Playful"] },
    { id: "09", name: "The Blurred Split", component: HeaderBlurred, tags: ["Airy", "Symmetrical"] },
    { id: "10", name: "Brutalist Box", component: HeaderBox, tags: ["Bold", "Structure"] },
    { id: "11", name: "Full Glass Bar", component: HeaderGlassBar, tags: ["Full-Width", "Pure Glass"] },
    { id: "12", name: "Double Stack", component: HeaderDoubleStack, tags: ["Utility", "Service-Focused"] },
    { id: "13", name: "Corner Anchor", component: HeaderCorner, tags: ["Whitespace", "Artistic"] },
    { id: "14", name: "Floating Sharp Bar", component: HeaderSharp, tags: ["Bold", "Contemporary"] },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="text-center space-y-4">
          <Badge>Design Review v3.0</Badge>
          <Heading size="h1">The Master Header Collection</Heading>
          <p className="text-slate-500 max-w-2xl mx-auto font-body">
            Explore 14 unique architectural directions for the Chamie Cakes navigation. 
            From ultra-minimalist strips to bold brutalist boxes, find the frame that tells your story.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-40">
          {options.map((opt) => (
            <section key={opt.id} className="space-y-8">
              <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Option {opt.id}</h3>
                  <Heading size="h3">{opt.name}</Heading>
                </div>
                <div className="flex gap-2">
                  {opt.tags.map(tag => <Badge key={tag} variant="outline" className="text-[9px] uppercase tracking-widest">{tag}</Badge>)}
                </div>
              </div>
              
              <div className="relative h-[450px] bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-200 group">
                 <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10 grayscale group-hover:opacity-20 transition-opacity" />
                 
                 <div className="absolute inset-x-0 top-0 h-full">
                    <opt.component className="absolute" />
                 </div>
                 
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-slate-300 text-xs uppercase tracking-[0.5em] font-bold">Interactive Preview Area</p>
                 </div>
              </div>
            </section>
          ))}
        </div>

        <div className="py-40 text-center space-y-6">
           <Heading size="h2">Select Your Frame</Heading>
           <p className="text-slate-400 font-body">Ready to commit? Mention the option number and we'll apply it site-wide.</p>
        </div>
      </div>
    </main>
  );
}
