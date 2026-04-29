"use client"

import React from "react"
import { AppSidebar } from "@/components/admin/AppSidebar"
import { SiteHeader } from "@/components/admin/SiteHeader"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "4rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-white">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <main className="p-6 md:p-8 lg:p-12 max-w-[1400px] mx-auto w-full">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
