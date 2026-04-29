"use client"

import * as React from "react"
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Users,
  Image as ImageIcon,
  Package,
  Settings,
  HelpCircle,
  Cake
} from "lucide-react"

import { NavMain } from "@/components/admin/NavMain"
import { NavUser } from "@/components/admin/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin User",
    email: "admin@chamiecakes.com",
    avatar: "/images/logo.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Requests",
      url: "/admin/inquiries",
      icon: MessageSquare,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      title: "Customers",
      url: "/admin/customers",
      icon: Users,
    },
    {
      title: "Website Content",
      url: "/admin/content",
      icon: ImageIcon,
    },
    {
      title: "Menu",
      url: "/admin/inventory",
      icon: Package,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200 bg-white">
      <SidebarHeader className="h-16 flex items-center border-b border-slate-100 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-transparent"
            >
              <a href="/admin" className="flex items-center gap-3 px-2">
                <div className="flex size-8 items-center justify-center rounded bg-black text-white shadow-sm">
                  <Cake className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[10px] uppercase tracking-tighter text-black leading-none">Chamie Cakes</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-6">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-slate-100 bg-slate-50">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
