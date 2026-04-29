"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  DollarSign,
  ChevronRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Calendar,
  LayoutDashboard
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    revenue: 0,
    newInquiries: 0,
    activeOrders: 0,
    totalCustomers: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      setLoading(true)
      
      const { data: ordersData } = await supabase.from("orders").select("total_amount, status")
      const { count: inquiryCount } = await supabase.from("inquiries").select("*", { count: 'exact', head: true }).eq('status', 'new')
      const { count: orderCount } = await supabase.from("orders").select("*", { count: 'exact', head: true }).in('status', ['in_progress', 'ready'])
      const { count: customerCount } = await supabase.from("customers").select("*", { count: 'exact', head: true })

      const totalRevenue = ordersData?.reduce((acc, order) => acc + (order.total_amount || 0), 0) || 0

      setStats({
        revenue: totalRevenue,
        newInquiries: inquiryCount || 0,
        activeOrders: orderCount || 0,
        totalCustomers: customerCount || 0
      })

      const { data: recentInqs } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentActivity(recentInqs || [])

    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium">
          Real-time performance metrics and business operations overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Gross Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-black", bg: "bg-slate-50", note: "Total lifetime earnings" },
          { label: "New Requests", value: stats.newInquiries, icon: MessageSquare, color: "text-black", bg: "bg-slate-50", note: "Awaiting response" },
          { label: "Active Orders", value: stats.activeOrders, icon: ShoppingBag, color: "text-black", bg: "bg-slate-50", note: "Currently in production" },
          { label: "Total Customers", value: stats.totalCustomers, icon: Users, color: "text-black", bg: "bg-slate-50", note: "Registered members" }
        ].map((stat, i) => (
          <Card key={i} className="border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</CardDescription>
              <div className={cn("w-8 h-8 rounded flex items-center justify-center border border-slate-100", stat.bg)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold text-black">{loading ? "..." : stat.value}</CardTitle>
              <p className="text-[9px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{stat.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden">
          <CardHeader className="px-8 py-6 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/50">
            <div>
              <CardTitle className="text-lg font-bold text-black">Recent Inquiries</CardTitle>
              <CardDescription className="text-xs text-slate-500 font-medium">Latest customer cake requests</CardDescription>
            </div>
            <Link 
              href="/admin/inquiries" 
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded h-8 text-[10px] font-bold uppercase tracking-widest border-slate-200"
              )}
            >
              View All
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="p-6 animate-pulse flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-slate-50" />
                      <div className="space-y-1">
                        <div className="h-4 w-32 bg-slate-50 rounded" />
                        <div className="h-3 w-20 bg-slate-50 rounded" />
                      </div>
                    </div>
                  </div>
                ))
              ) : recentActivity.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-sm font-medium">No recent inquiries found.</div>
              ) : (
                recentActivity.map((inquiry, i) => (
                  <Link key={i} href={`/admin/inquiries/${inquiry.id}`} className="p-6 hover:bg-slate-50 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {inquiry.name[0]}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-black group-hover:underline">{inquiry.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{inquiry.event_type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge className="text-[9px] font-bold uppercase tracking-widest rounded px-2 py-0.5 bg-slate-100 text-slate-600 border-none shadow-none">
                        {inquiry.status}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-black transition-colors" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-lg p-6">
            <CardHeader className="p-0 pb-4 mb-6 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-black">
                Kitchen Load
              </CardTitle>
              <CardDescription className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Operations</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Capacity</span>
                  <span className="text-black">75%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-black w-[75%] transition-all" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                You have <span className="text-black font-bold">{stats.activeOrders} active orders</span> in production. Kitchen capacity is optimal for new requests.
              </p>
              <Button asChild variant="outline" className="w-full rounded h-10 text-[10px] font-bold uppercase tracking-widest border-slate-200 mt-2">
                 <Link href="/admin/orders">Manage Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white rounded-lg p-6 overflow-hidden">
            <CardHeader className="p-0 pb-4 mb-6 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-black">Delivery Schedule</CardTitle>
              <CardDescription className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Next 7 Days</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold tracking-tight text-black">12</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orders</div>
               </div>
               <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Pending Fulfillment</div>
               <Button asChild className="w-full rounded h-10 text-[10px] font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 mt-8 shadow-sm">
                 <Link href="/admin/orders">View Full Schedule</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
