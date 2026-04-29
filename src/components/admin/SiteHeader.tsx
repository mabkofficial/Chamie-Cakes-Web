"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length <= 1) return "Dashboard"
    const lastSegment = segments[segments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ")
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white sticky top-0 z-30 px-6">
      <div className="flex w-full items-center gap-4">
        <SidebarTrigger className="-ml-1 text-slate-500 hover:text-black transition-colors" />
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin</span>
           <span className="text-slate-300 text-[10px]">/</span>
           <h2 className="text-[10px] font-bold uppercase tracking-widest text-black">{getPageTitle()}</h2>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 px-3 h-8 bg-slate-50 border border-slate-200 rounded group hover:border-black transition-all cursor-pointer">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-black" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-black">Search...</span>
           </div>
           
           <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded w-8 h-8 relative hover:bg-slate-50">
                 <Bell className="w-4 h-4 text-slate-500" />
                 <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full border border-white" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded w-8 h-8 hover:bg-slate-50">
                 <User className="w-4 h-4 text-slate-500" />
              </Button>
           </div>
        </div>
      </div>
    </header>
  )
}
