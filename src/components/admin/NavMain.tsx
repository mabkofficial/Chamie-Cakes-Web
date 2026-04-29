"use client"

import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="space-y-6">
        <div className="space-y-1">
          <div className="px-4 mb-2">
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigation</span>
          </div>
          <SidebarMenu className="px-2">
            {items.map((item) => {
              const isActive = pathname === item.url || (item.url !== '/admin' && pathname.startsWith(item.url))
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    asChild 
                    className={cn(
                      "h-10 px-3 rounded transition-all",
                      isActive 
                        ? "bg-black text-white shadow-sm" 
                        : "text-slate-500 hover:bg-slate-100 hover:text-black"
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      {item.icon && <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-black")} />}
                      <span className="text-[11px] font-bold uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
