"use client";

import { useState, useEffect, use } from "react"
import { supabase } from "@/lib/supabase"
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  ShoppingBag, 
  Calendar,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Star,
  Clock,
  Printer
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [customer, setCustomer] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomerData()
  }, [id])

  async function fetchCustomerData() {
    try {
      setLoading(true)
      
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .single()
      
      if (customerError) throw customerError
      setCustomer(customerData)

      const { data: ordersData } = await supabase
        .from("orders")
        .select(`
          *,
          inquiries (
            event_type,
            event_date
          )
        `)
        .eq("email", customerData.email)
        .order("created_at", { ascending: false })
      
      setOrders(ordersData || [])

      const { data: inquiriesData } = await supabase
        .from("inquiries")
        .select("*")
        .eq("email", customerData.email)
        .order("created_at", { ascending: false })
      
      setInquiries(inquiriesData || [])

    } catch (error: any) {
      console.error("Error fetching customer:", error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
       <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Loading Client Profile...</p>
    </div>
  )

  if (!customer) return (
    <div className="p-20 text-center space-y-6">
       <h2 className="text-3xl font-bold tracking-tight">Client Not Found</h2>
       <p className="text-sm text-slate-400 font-body">This customer record could not be found.</p>
       <Link href="/admin/customers" className="inline-block px-10 py-4 bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest">Back to Customers</Link>
    </div>
  )

  const isVip = (customer.total_orders || 0) > 2

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4">
          <Link href="/admin/customers" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors group">
             <ChevronLeft className="w-4 h-4" />
             Back to Customers
          </Link>
          <div className="space-y-2">
             <div className="flex items-center gap-4 flex-wrap">
               <h1 className="text-4xl font-bold tracking-tight text-black">{customer.name}</h1>
               {isVip && (
                 <Badge className="bg-black text-white border-none px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-current" /> VIP
                 </Badge>
               )}
             </div>
             <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
               <span className="flex items-center gap-2 text-black font-bold">
                 <Mail className="w-4 h-4 text-slate-400" /> {customer.email}
               </span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className="flex items-center gap-2">
                 <Phone className="w-4 h-4 text-slate-400" /> {customer.phone || 'No phone provided'}
               </span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
           <button className="h-10 px-6 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wider text-black hover:border-black transition-all">
              Edit Profile
           </button>
           <button className="h-10 px-6 bg-black text-white rounded text-[10px] font-bold uppercase tracking-wider shadow hover:bg-zinc-800 transition-all flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           
           {/* Order History */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Purchase History</h3>
                 <Badge variant="outline" className="px-3 py-1 border-slate-200 text-[10px] font-bold tracking-wider text-slate-500">{orders.length} Orders</Badge>
              </div>
              
              <div className="space-y-3">
                 {orders.length === 0 ? (
                    <Card className="border border-slate-200 border-dashed bg-slate-50/50 rounded-lg p-12 text-center">
                       <p className="text-slate-400 text-sm font-medium italic">No confirmed orders yet.</p>
                    </Card>
                 ) : (
                    orders.map((order) => (
                      <Link key={order.id} href={`/admin/orders/${order.id}`} className="block group">
                        <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-between hover:border-black transition-all shadow-sm">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                                 <ShoppingBag className="w-5 h-5" />
                              </div>
                              <div className="space-y-0.5">
                                 <div className="text-sm font-bold text-black flex items-center gap-3">
                                   Order #{order.id.slice(0, 8)}
                                   <Badge className="text-[8px] font-bold uppercase tracking-widest py-0 bg-slate-100 text-slate-500 border-none shadow-none">{order.status}</Badge>
                                 </div>
                                 <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{order.inquiries?.event_type} · {format(new Date(order.created_at), 'MMM dd, yyyy')}</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-8">
                              <div className="text-right">
                                 <div className="text-sm font-bold text-black">${order.total_amount?.toLocaleString()}</div>
                                 <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Amount</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-black transition-all" />
                           </div>
                        </div>
                      </Link>
                    ))
                 )}
              </div>
           </div>

           {/* Inquiry Log */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Communication Log</h3>
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inquiries.length} Requests</span>
              </div>

              <div className="space-y-4">
                 {inquiries.length === 0 ? (
                    <p className="text-slate-400 text-sm font-medium italic py-4">No communication history found.</p>
                 ) : (
                    inquiries.map((inq) => (
                      <div key={inq.id} className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3 hover:bg-white transition-all shadow-sm group">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                                  <MessageSquare className="w-4 h-4" />
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-black">{inq.event_type} Request</span>
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{format(new Date(inq.created_at), 'MMM dd, yyyy')}</span>
                               </div>
                            </div>
                            <Link href={`/admin/inquiries/${inq.id}`} className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-black border-b border-transparent hover:border-black transition-all pb-0.5">View Inquiry</Link>
                         </div>
                         <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">"{inq.description || 'No description provided.'}"</p>
                      </div>
                    ))
                 )}
              </div>
           </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
           <Card className="bg-white rounded-lg border border-slate-200 p-8 space-y-8 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Customer Insights</h3>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-slate-50 border border-slate-100 text-black flex items-center justify-center shadow-sm">
                       <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Lifetime Value</span>
                       <span className="text-xl font-bold tracking-tight text-black">${(customer.total_spend || 0).toLocaleString()}</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-slate-50 border border-slate-100 text-black flex items-center justify-center shadow-sm">
                       <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Orders</span>
                       <span className="text-xl font-bold tracking-tight text-black">{customer.total_orders || 0}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-slate-50 border border-slate-100 text-black flex items-center justify-center shadow-sm">
                       <Star className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Fav Flavor</span>
                       <span className="text-sm font-bold tracking-tight text-black">{customer.favorite_flavor || 'No preference'}</span>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-6">
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress to VIP</span>
                       <span className="text-[10px] font-bold text-black">{customer.total_orders || 0} / 3 Orders</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-black transition-all duration-700" 
                         style={{ width: `${Math.min(((customer.total_orders || 0) / 3) * 100, 100)}%` }} 
                       />
                    </div>
                 </div>
                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider text-center leading-relaxed">
                    VIP status is granted after 3 confirmed orders.
                 </p>
              </div>
           </Card>

           <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">CRM Actions</h3>
              <div className="grid gap-2 mt-6">
                 <button className="h-10 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wider text-black hover:border-black transition-all">
                   Manage Loyalty
                 </button>
                 <button className="h-10 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-all">
                    Flag Customer
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
