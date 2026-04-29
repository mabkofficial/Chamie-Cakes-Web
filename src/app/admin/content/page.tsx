"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Layout, Image as ImageIcon, FileText, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

const pages = [
  {
    title: "Homepage",
    slug: "home",
    description: "Edit hero, brand story, process, and testimonials.",
    icon: Layout,
    color: "bg-blue-50 text-blue-500"
  },
  {
    title: "Gallery Page",
    slug: "gallery",
    description: "Manage filter categories and display settings.",
    icon: ImageIcon,
    color: "bg-purple-50 text-purple-500"
  },
  {
    title: "About Page",
    slug: "about",
    description: "Edit your biography, images, and brand mission.",
    icon: FileText,
    color: "bg-emerald-50 text-emerald-500"
  },
  {
    title: "Global Settings",
    slug: "settings",
    description: "Social links, contact info, and site-wide banners.",
    icon: Settings,
    color: "bg-slate-50 text-slate-500"
  }
]

export default function ContentDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Website Content</h1>
        <p className="text-slate-500 text-sm font-medium">Select a page to manage its content and imagery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <Link key={page.slug} href={`/admin/content/${page.slug}`}>
            <Card className="group hover:border-black transition-all cursor-pointer border border-slate-200 shadow-sm overflow-hidden h-full">
              <CardContent className="p-8 flex items-start gap-6">
                <div className={`p-4 rounded-xl ${page.color} transition-transform group-hover:scale-110`}>
                  <page.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-lg text-black flex items-center justify-between">
                    {page.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{page.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
