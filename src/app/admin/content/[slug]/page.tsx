"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Loader2, Plus, X, ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Define logical order for fields (Question before Answer, Title before Subtitle, etc.)
const FIELD_ORDER = [
  "title", "heading", "name", "question", "number",
  "subtitle", "subheading", "role", "answer",
  "content", "description", "text", "cta",
  "image", "image_url", "items", "list", "steps", "questions"
]

export default function PageEditor() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [content, setContent] = useState<any[]>([])
  const [lastSaved, setLastSaved] = useState<Record<string, string>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

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
      
      // Open first section by default
      if (merged.length > 0) {
        setOpenSections({ [merged[0].key]: true })
      }
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
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading boutique editor...</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-12">
        <div className="flex items-center gap-8">
          <Link href="/admin/content" className="w-14 h-14 flex items-center justify-center border border-slate-200 rounded-full hover:border-black transition-all group bg-white shadow-sm">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform text-slate-600 group-hover:text-black" />
          </Link>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
               <h1 className="text-4xl font-bold capitalize tracking-tight text-black">{slug}</h1>
               <div className="px-4 py-1.5 bg-black text-white rounded-full text-[9px] font-bold uppercase tracking-[0.2em]">Management</div>
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-wide">Customize every element of your {slug} page with precision.</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {content.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <SectionEditor 
                item={item} 
                onSave={(data) => handleSave(item.key, data)}
                isSaving={saving === item.key}
                isModified={lastSaved[item.key] !== JSON.stringify(item.content)}
                isOpen={!!openSections[item.key]}
                onToggle={() => setOpenSections(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

function SectionEditor({ item, onSave, isSaving, isModified, isOpen, onToggle }: any) {
  const [data, setData] = useState(item.content)
  const title = item.key.replace(/_/g, ' ')

  const sortedEntries = Object.entries(data).sort(([a], [b]) => {
    const indexA = FIELD_ORDER.indexOf(a as string)
    const indexB = FIELD_ORDER.indexOf(b as string)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return (
    <div className={`group border rounded-3xl transition-all duration-500 overflow-hidden ${
      isOpen ? "border-black bg-white shadow-2xl shadow-black/5" : "border-slate-100 bg-slate-50/30 hover:border-slate-300"
    }`}>
      {/* Section Header (Clickable) */}
      <div 
        onClick={onToggle}
        className="flex items-center justify-between p-8 cursor-pointer select-none"
      >
        <div className="flex items-center gap-6">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${
            isOpen ? "bg-black border-black text-white" : "bg-white border-slate-100 text-slate-300"
          }`}>
            <GripVertical className="w-4 h-4 opacity-50" />
          </div>
          <div className="space-y-1">
            <h2 className={`text-xs font-bold uppercase tracking-[0.3em] transition-colors ${
              isOpen ? "text-black" : "text-slate-400"
            }`}>{title}</h2>
            <div className="flex items-center gap-3">
               {isModified ? (
                 <span className="text-[8px] font-bold uppercase tracking-widest text-amber-500">Unsaved Edits</span>
               ) : (
                 <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-500">Synced</span>
               )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isModified && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Button 
                  onClick={(e) => { e.stopPropagation(); onSave(data); }} 
                  disabled={isSaving}
                  className="h-10 px-8 rounded-full bg-black text-white text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all gap-2 shadow-lg shadow-black/10"
                >
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save Changes
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`p-2 rounded-full transition-all ${isOpen ? "rotate-180 bg-slate-100" : "bg-transparent text-slate-300"}`}>
             <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Section Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-10 pb-12 space-y-12 border-t border-slate-50 pt-10">
              {sortedEntries.map(([key, value]: [string, any]) => (
                renderField(key, value, (newVal) => setData({ ...data, [key]: newVal }))
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  if (typeof value === "string" && (value.length > 50 || key === "content" || key === "description" || key === "answer" || key === "text")) {
    return (
      <div key={key} className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">{label}</label>
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full p-8 bg-slate-50/50 border border-slate-100 rounded-3xl text-sm font-medium outline-none focus:bg-white focus:border-black transition-all leading-relaxed placeholder:text-slate-300"
          placeholder={`Enter ${label}...`}
        />
      </div>
    )
  }

  // Short Text Fields
  if (typeof value === "string") {
    return (
      <div key={key} className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">{label}</label>
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-8 text-sm font-medium outline-none focus:bg-white focus:border-black transition-all placeholder:text-slate-300"
          placeholder={`Enter ${label}...`}
        />
      </div>
    )
  }

  // Lists (Steps, Testimonials, FAQ, Categories)
  if (Array.isArray(value)) {
    return (
      <div key={key} className="space-y-8 pt-8 border-t border-slate-50">
         <div className="flex items-center justify-between">
           <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-black">{label}</label>
           <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const sample = value[0] ? { ...value[0] } : {}
              Object.keys(sample).forEach(k => {
                if (k === "number") sample[k] = (value.length + 1).toString().padStart(2, '0')
                else sample[k] = ""
              })
              onChange([...value, sample])
            }}
            className="rounded-full border-slate-200 text-[9px] font-bold uppercase tracking-widest hover:border-black transition-all"
           >
             <Plus className="w-3 h-3 mr-2" /> New {label.slice(0, -1)}
           </Button>
         </div>
         
         <div className="grid gap-8">
           {value.map((child, idx) => (
             <div key={idx} className="p-10 border border-slate-100 rounded-[2.5rem] bg-white relative group hover:shadow-xl hover:shadow-black/5 transition-all duration-700">
                <button 
                  onClick={() => {
                    const newValue = [...value]; newValue.splice(idx, 1); onChange(newValue)
                  }}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="space-y-10">
                  {Object.entries(child)
                    .sort(([a], [b]) => {
                      const indexA = FIELD_ORDER.indexOf(a)
                      const indexB = FIELD_ORDER.indexOf(b)
                      if (indexA === -1 && indexB === -1) return a.localeCompare(b)
                      if (indexA === -1) return 1
                      if (indexB === -1) return -1
                      return indexA - indexB
                    })
                    .map(([ckey, cval]: [string, any]) => (
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
         </div>
      </div>
    )
  }

  return null
}
