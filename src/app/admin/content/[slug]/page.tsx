"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2, Plus, X, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import Link from "next/link"

export default function PageEditor() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<any[]>([])

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
      
      // Ensure all keys exist in state even if not in DB yet
      const merged = keys.map(key => {
        const found = data?.find(d => d.key === key)
        return found || { key, content: getDefaultContent(key) }
      })
      
      setContent(merged)
    } finally {
      setLoading(false)
    }
  }

  function getKeysForPage(page: string) {
    switch (page) {
      case "home": return ["home_hero", "brand_story", "specialties", "how_it_works", "testimonials", "faqs", "categories_list"]
      case "about": return ["about_hero", "about_details"]
      case "gallery": return ["gallery_settings"]
      default: return []
    }
  }

  function getDefaultContent(key: string) {
    if (key === "home_hero") return { title: "", subtitle: "", cta: "", image: "" }
    if (key === "brand_story") return { title: "", content: "", image: "" }
    // ... add more defaults as needed
    return {}
  }

  async function handleSave(key: string, data: any) {
    setSaving(true)
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, content: data })
      if (error) throw error
    } catch (err: any) {
      alert("Save failed: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/content" className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold capitalize">{slug} Page</h1>
          <p className="text-slate-500 text-sm">Edit every element on the {slug} page.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {content.map((item) => (
          <SectionEditor 
            key={item.key} 
            item={item} 
            onSave={(data) => handleSave(item.key, data)}
            saving={saving}
          />
        ))}
      </div>
    </div>
  )
}

function SectionEditor({ item, onSave, saving }: any) {
  const [data, setData] = useState(item.content)
  const title = item.key.replace(/_/g, ' ').toUpperCase()

  return (
    <Card className="border border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between p-6">
        <CardTitle className="text-sm font-bold tracking-widest text-slate-400">{title}</CardTitle>
        <Button 
          size="sm" 
          onClick={() => onSave(data)} 
          disabled={saving}
          className="bg-black text-white rounded-full px-6 text-[10px] uppercase font-bold tracking-widest"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
          Save {title.split(' ')[1] || 'Section'}
        </Button>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {Object.entries(data).map(([key, value]: [string, any]) => {
          if (key === "image" || key.endsWith("Image")) {
            return <ImageUploadField 
              key={key} 
              label={key} 
              value={value} 
              onUpdate={(url) => setData({...data, [key]: url})} 
            />
          }
          if (typeof value === "string") {
            return (
              <div key={key} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{key}</label>
                {value.length > 50 ? (
                  <textarea 
                    value={value}
                    onChange={(e) => setData({...data, [key]: e.target.value})}
                    rows={4}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium outline-none focus:bg-white focus:border-black transition-all"
                  />
                ) : (
                  <input 
                    type="text"
                    value={value}
                    onChange={(e) => setData({...data, [key]: e.target.value})}
                    className="w-full h-12 bg-slate-50 border border-slate-100 rounded-lg px-4 text-sm font-medium outline-none focus:bg-white focus:border-black transition-all"
                  />
                )}
              </div>
            )
          }
          // Support for simple lists like steps, testimonials, faqs
          if (Array.isArray(value)) {
            return (
              <div key={key} className="space-y-4">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{key}</label>
                 <div className="grid gap-4">
                   {value.map((child, idx) => (
                     <div key={idx} className="p-4 border border-slate-100 rounded-lg bg-slate-50/30 relative">
                        <button 
                          onClick={() => {
                            const newValue = [...value]; newValue.splice(idx, 1); setData({...data, [key]: newValue})
                          }}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-white rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {Object.entries(child).map(([ckey, cval]: [string, any]) => (
                          <div key={ckey} className="mt-2">
                             <label className="text-[8px] font-bold uppercase tracking-widest text-slate-300">{ckey}</label>
                             <input 
                               value={cval}
                               onChange={(e) => {
                                 const newValue = [...value]; newValue[idx][ckey] = e.target.value; setData({...data, [key]: newValue})
                               }}
                               className="w-full h-8 bg-transparent border-b border-slate-100 text-sm focus:border-black outline-none"
                             />
                          </div>
                        ))}
                     </div>
                   ))}
                   <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const sample = value[0] ? {...value[0]} : {}
                      Object.keys(sample).forEach(k => sample[k] = "")
                      setData({...data, [key]: [...value, sample]})
                    }}
                    className="border-dashed"
                   >
                     <Plus className="w-3 h-3 mr-2" /> Add Item
                   </Button>
                 </div>
              </div>
            )
          }
          return null
        })}
      </CardContent>
    </Card>
  )
}
