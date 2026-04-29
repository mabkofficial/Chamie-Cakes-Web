"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Image as ImageIcon, Settings, Layout, UploadCloud, Plus, X, Loader2, Save } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ContentAdminPage() {
  const [activeTab, setActiveTab] = useState("gallery")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // Gallery State
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  // Content State
  const [brandStory, setBrandStory] = useState({ title: "", content: "" })
  const [homeHero, setHomeHero] = useState({ title: "", subtitle: "", cta: "" })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      // Fetch Gallery
      const { data: gallery } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true })
      
      if (gallery) setGalleryItems(gallery)

      // Fetch Site Content
      const { data: content } = await supabase
        .from("site_content")
        .select("*")
      
      content?.forEach(item => {
        if (item.key === "brand_story") setBrandStory(item.content)
        if (item.key === "home_hero") setHomeHero(item.content)
      })
    } finally {
      setLoading(false)
    }
  }

  async function saveContent(key: string, data: any) {
    setSaving(true)
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, content: data })
      
      if (error) throw error
      alert("Content saved successfully.")
    } catch (err: any) {
      alert("Error saving: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(uploadData.path)

      const { data: newItem, error: insertError } = await supabase
        .from("gallery")
        .insert([{ 
          image_url: publicUrl, 
          display_order: galleryItems.length 
        }])
        .select()
        .single()

      if (insertError) throw insertError
      setGalleryItems([...galleryItems, newItem])
    } catch (err: any) {
      alert("Upload failed: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  async function deleteGalleryItem(id: string) {
    if (!confirm("Are you sure?")) return
    try {
      await supabase.from("gallery").delete().eq("id", id)
      setGalleryItems(galleryItems.filter(item => item.id !== id))
    } catch (err: any) {
      alert("Delete failed")
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Website Content</h1>
        <p className="text-slate-500 text-sm font-medium">Manage your brand's digital presence directly.</p>
      </div>

      <Tabs defaultValue="gallery" onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-2">
          <TabsList className="bg-transparent gap-8 h-auto p-0">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 data-[state=active]:text-black transition-all">
              <ImageIcon className="w-3.5 h-3.5 mr-2" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 data-[state=active]:text-black transition-all">
              <FileText className="w-3.5 h-3.5 mr-2" /> Brand Story
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 data-[state=active]:text-black transition-all">
              <Layout className="w-3.5 h-3.5 mr-2" /> Hero Section
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 border border-slate-100 rounded text-slate-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
             <span className="text-[9px] font-bold uppercase tracking-widest">Connected</span>
          </div>
        </div>

        <TabsContent value="gallery" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Upload Placeholder */}
            <label className="aspect-square border-2 border-dashed border-slate-100 rounded-lg flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-black transition-all cursor-pointer group">
              <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              {uploading ? (
                <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-slate-200 group-hover:text-black transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-black mt-3">Add Photo</span>
                </>
              )}
            </label>

            {galleryItems.map((item) => (
              <div key={item.id} className="aspect-square relative group rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                <img src={item.image_url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => deleteGalleryItem(item.id)}
                    className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="story" className="mt-0">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden max-w-3xl">
            <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50">
              <CardTitle className="text-xl font-bold tracking-tight text-black flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-400" /> Brand Narrative
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Section Title</label>
                <input 
                  type="text" 
                  value={brandStory.title}
                  onChange={(e) => setBrandStory({...brandStory, title: e.target.value})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-lg px-4 text-sm font-medium outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content</label>
                <textarea 
                  rows={10}
                  value={brandStory.content}
                  onChange={(e) => setBrandStory({...brandStory, content: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium outline-none focus:border-black focus:bg-white transition-all resize-none leading-relaxed"
                />
              </div>
              <Button 
                onClick={() => saveContent("brand_story", brandStory)}
                disabled={saving}
                className="bg-black hover:bg-zinc-800 text-white px-8 h-12 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero" className="mt-0">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden max-w-3xl">
            <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50">
              <CardTitle className="text-xl font-bold tracking-tight text-black flex items-center gap-3">
                <Layout className="w-5 h-5 text-slate-400" /> Homepage Hero
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Main Heading</label>
                <input 
                  type="text" 
                  value={homeHero.title}
                  onChange={(e) => setHomeHero({...homeHero, title: e.target.value})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-lg px-4 text-sm font-medium outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subheading</label>
                <input 
                  type="text" 
                  value={homeHero.subtitle}
                  onChange={(e) => setHomeHero({...homeHero, subtitle: e.target.value})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-lg px-4 text-sm font-medium outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Button Label</label>
                <input 
                  type="text" 
                  value={homeHero.cta}
                  onChange={(e) => setHomeHero({...homeHero, cta: e.target.value})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-lg px-4 text-sm font-medium outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
              <Button 
                onClick={() => saveContent("home_hero", homeHero)}
                disabled={saving}
                className="bg-black hover:bg-zinc-800 text-white px-8 h-12 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
