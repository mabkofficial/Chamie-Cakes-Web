"use client"

import { useState } from "react"
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onUpdate: (url: string) => void;
  bucket?: string;
  className?: string;
}

export function ImageUploadField({ 
  label, 
  value, 
  onUpdate, 
  bucket = "site-assets",
  className = "" 
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      onUpdate(publicUrl)
    } catch (err: any) {
      alert("Upload failed: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</label>
      
      <div className="flex items-start gap-6">
        {/* Preview */}
        <div className="relative group w-32 aspect-square rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
          {value ? (
            <>
              <img src={value} alt={label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer p-2 bg-white rounded-full text-black hover:bg-slate-50 transition-colors">
                  <UploadCloud className="w-4 h-4" />
                  <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
              </div>
            </>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-colors group">
              <ImageIcon className="w-6 h-6 text-slate-200 group-hover:text-black" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-black mt-2">Upload</span>
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          )}
          
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-black animate-spin" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <input 
            type="text" 
            value={value}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="Or paste URL here..."
            className="w-full h-10 bg-slate-50 border border-slate-100 rounded-lg px-4 text-xs font-medium outline-none focus:bg-white focus:border-black transition-all"
          />
          <p className="text-[9px] text-slate-400 leading-relaxed uppercase tracking-widest">Recommended: High resolution PNG or JPG. Square or 4:5 aspect ratio works best.</p>
        </div>
      </div>
    </div>
  )
}
