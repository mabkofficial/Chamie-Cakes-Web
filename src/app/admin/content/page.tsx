"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Image as ImageIcon, Settings, Layout } from "lucide-react"

export default function ContentAdminPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Website Content</h1>
        <p className="text-slate-500 text-sm font-medium">Manage your gallery, collections, and brand story.</p>
      </div>

      <Card className="border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden flex flex-col h-[800px]">
         <CardHeader className="p-8 border-b border-slate-100 bg-slate-50 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
               <div>
                  <CardTitle className="text-xl font-bold tracking-tight text-black flex items-center gap-3">
                    <Layout className="w-5 h-5" /> Content Editor
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 font-medium mt-1">Directly edit site records and media using Decap CMS</CardDescription>
               </div>
               <div className="flex items-center gap-4 px-4 py-2 bg-white border border-slate-200 rounded">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                     Systems Ready
                  </span>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-0 flex-1 relative">
            {/* 
              We use an iframe here to load the static Decap CMS bundle from /cms/index.html 
              This prevents React Hydration/Concurrent Mode errors (like the removeChild error) 
              that happen when Decap CMS tries to aggressively modify the Next.js DOM.
            */}
            <iframe 
              src="/cms/index.html" 
              className="absolute inset-0 w-full h-full border-0"
              title="Decap CMS Content Editor"
            />
         </CardContent>
      </Card>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
         {[
           { label: "Photo Gallery", sub: "Media & Imagery", icon: ImageIcon },
           { label: "Our Story", sub: "Brand Narrative", icon: FileText },
           { label: "Site Settings", sub: "Global Config", icon: Settings }
         ].map((tool, i) => (
           <Card key={i} className="hover:border-black hover:shadow transition-all cursor-pointer group rounded-lg border-slate-200 bg-white">
              <CardContent className="p-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                       <tool.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                       <div className="font-bold text-sm text-black">{tool.label}</div>
                       <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{tool.sub}</div>
                    </div>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>
    </div>
  )
}
