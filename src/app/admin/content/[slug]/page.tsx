"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Loader2, Plus, X, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PageEditor() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [content, setContent] = useState<any[]>([])
  const [lastSaved, setLastSaved] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchPageContent()
  }, [slug])

  async function fetchPageContent() {
    setLoading(true)
    try {
      const keys = getKeysForPage(slug)
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .in("key", keys)
      
      const merged = keys.map(key => {
        const found = data?.find(d => d.key === key)
        return found || { key, content: getDefaultContent(key) }
      })
      
      setContent(merged)
      
      // Store original versions to track changes
      const savedMap: Record<string, string> = {}
      merged.forEach(item => {
        savedMap[item.key] = JSON.stringify(item.content)
      })
      setLastSaved(savedMap)
    } finally {
      setLoading(false)
    }
  }

  function getKeysForPage(page: string) {
    switch (page) {
      case "home": return ["home_hero", "brand_story", "specialties", "categories_list", "how_it_works", "testimonials", "faqs"]
      case "about": return ["about_hero", "about_details"]
      case "gallery": return ["gallery_settings"]
      default: return []
    }
  }

  function getDefaultContent(key: string) {
    if (key === "home_hero") return { title: "", subtitle: "", cta: "", image: "" }
    if (key === "brand_story") return { title: "", content: "", image: "" }
    return {}
  }

  async function handleSave(key: string, data: any) {
    setSaving(key)
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, content: data })
      
      if (error) throw error
      
      setLastSaved(prev => ({ ...prev, [key]: JSON.stringify(data) }))
    } catch (err: any) {
      alert("Save failed: " + err.message)
    } finally {
      setSaving(null)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-10 h-10 text-black animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading editor...</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/content" className="w-12 h-12 flex items-center justify-center border border-slate-200 rounded-full hover:border-black transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold capitalize tracking-tight">{slug} Page</h1>
               <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[8px] font-bold uppercase tracking-widest text-slate-400">Editor</div>
            </div>
            <p className="text-slate-500 text-sm font-medium">Refine every detail of your {slug} page in real-time.</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-16">
          {content.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <SectionEditor 
                item={item} 
                onSave={(data) => handleSave(item.key, data)}
                isSaving={saving === item.key}
                isModified={lastSaved[item.key] !== JSON.stringify(item.content)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

function SectionEditor({ item, onSave, isSaving, isModified }: any) {
  const [data, setData] = useState(item.content)
  const title = item.key.replace(/_/g, ' ')

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{title}</h2>
          {isModified && (
            <div className="flex items-center gap-1.5 text-amber-500">
               <AlertCircle className="w-3 h-3" />
               <span className="text-[8px] font-bold uppercase tracking-widest">Unsaved Changes</span>
            </div>
          )}
          {!isModified && (
            <div className="flex items-center gap-1.5 text-emerald-500">
               <CheckCircle2 className="w-3 h-3" />
               <span className="text-[8px] font-bold uppercase tracking-widest">Synced</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onSave(data)} 
          disabled={isSaving || !isModified}
          className={`h-10 px-8 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all gap-2 ${
            isModified ? "bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/5" : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          Update Section
        </Button>
      </div>

      <Card className="border border-slate-100 shadow-sm overflow-hidden bg-white hover:border-slate-300 transition-colors duration-500">
        <CardContent className="p-10 space-y-10">
          {Object.entries(data).map(([key, value]: [string, any]) => {
            // Simple Fields (Image, Text, Textarea)
            return renderField(key, value, (newVal) => setData({ ...data, [key]: newVal }))
          })}
        </CardContent>
      </Card>
    </div>
  )
}

function renderField(key: string, value: any, onChange: (val: any) => void) {
  const label = key.replace(/_/g, ' ')

  // Image Fields
  if (key === "image" || key.endsWith("Image") || key === "image_url") {
    return (
      <ImageUploadField 
        key={key} 
        label={label} 
        value={value} 
        onUpdate={onChange} 
      />
    )
  }

  // Large Text Fields
  if (typeof value === "string" && (value.length > 50 || key === "content" || key === "description")) {
    return (
      <div key={key} className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-black transition-all leading-relaxed"
        />
      </div>
    )
  }

  // Short Text Fields
  if (typeof value === "string") {
    return (
      <div key={key} className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl px-6 text-sm font-medium outline-none focus:bg-white focus:border-black transition-all"
        />
      </div>
    )
  }

  // Lists (Steps, Testimonials, FAQ, Categories)
  if (Array.isArray(value)) {
    return (
      <div key={key} className="space-y-6 pt-4 border-t border-slate-50">
         <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 block mb-2">{label}</label>
         <div className="grid gap-6">
           {value.map((child, idx) => (
             <div key={idx} className="p-8 border border-slate-100 rounded-2xl bg-slate-50/20 relative group hover:bg-white hover:border-slate-200 transition-all duration-500">
                <button 
                  onClick={() => {
                    const newValue = [...value]; newValue.splice(idx, 1); onChange(newValue)
                  }}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="space-y-8">
                  {Object.entries(child).map(([ckey, cval]: [string, any]) => (
                    <div key={ckey}>
                       {renderField(ckey, cval, (newChildVal) => {
                         const newValue = [...value]
                         newValue[idx] = { ...newValue[idx], [ckey]: newChildVal }
                         onChange(newValue)
                       })}
                    </div>
                  ))}
                </div>
             </div>
           ))}
           
           <Button 
            variant="outline" 
            onClick={() => {
              const sample = value[0] ? { ...value[0] } : {}
              Object.keys(sample).forEach(k => {
                if (k === "number") sample[k] = (value.length + 1).toString().padStart(2, '0')
                else sample[k] = ""
              })
              onChange([...value, sample])
            }}
            className="w-full h-20 border-dashed border-2 border-slate-100 text-slate-300 hover:text-black hover:border-black hover:bg-white rounded-2xl transition-all"
           >
             <Plus className="w-5 h-5 mr-3" /> Add {label.slice(0, -1)}
           </Button>
         </div>
      </div>
    )
  }

  return null
}
