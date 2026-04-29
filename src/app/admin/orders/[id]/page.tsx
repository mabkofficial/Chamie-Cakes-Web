"use client";

import { useState, useEffect, use } from "react";
import { 
  ChevronLeft, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  MapPin, 
  Cake, 
  Users, 
  DollarSign, 
  Package,
  CheckCircle2,
  AlertCircle,
  Printer,
  Trash2,
  ArrowRight,
  CreditCard,
  Truck,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

const orderStatusConfig: Record<string, { label: string, color: string, icon: any, desc: string }> = {
  pending: { label: "Order Pending", color: "bg-black text-white", icon: Clock, desc: "Awaiting final confirmation and deposit." },
  deposit_paid: { label: "Deposit Paid", color: "bg-slate-900 text-white", icon: DollarSign, desc: "Deposit received. The order is officially booked." },
  in_progress: { label: "In Production", color: "bg-slate-100 text-black border-slate-200", icon: Package, desc: "Currently being made in our kitchen." },
  ready: { label: "Ready for Pickup", color: "bg-slate-50 text-black border-black", icon: CheckCircle2, desc: "The cake is finished and ready for the customer." },
  delivered: { label: "Finished", color: "bg-slate-50 text-slate-400 border-slate-100", icon: CheckCircle2, desc: "Order delivered and completed." },
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          inquiries (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error: any) {
      console.error("Error fetching order:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus: string) {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      setOrder({ ...order, status: newStatus });
    } catch (error: any) {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  async function cancelOrder() {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: "delivered" })
        .eq("id", id);

      if (error) throw error;
      setOrder({ ...order, status: "delivered" });
    } catch (error: any) {
      alert("Failed to cancel order");
    } finally {
      setUpdating(false);
    }
  }

  async function deleteOrder() {
    if (!confirm("Are you sure you want to permanently delete this order? This cannot be undone.")) return;
    setUpdating(true);
    try {
      if (order.inquiry_id) {
        await supabase
          .from("inquiries")
          .update({ status: "new" })
          .eq("id", order.inquiry_id);
      }

      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

      if (error) throw error;
      window.location.href = "/admin/orders";
    } catch (error: any) {
      alert("Failed to delete order");
    } finally {
      setUpdating(false);
    }
  }

  async function togglePayment() {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ is_fully_paid: !order.is_fully_paid })
        .eq("id", id);

      if (error) throw error;
      setOrder({ ...order, is_fully_paid: !order.is_fully_paid });
    } catch (error: any) {
      alert("Failed to update payment status");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
       <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Loading Order...</p>
    </div>
  );

  if (!order) return (
    <div className="p-20 text-center space-y-6">
       <h2 className="text-3xl font-bold tracking-tight">Order Not Found</h2>
       <p className="text-sm text-slate-400 font-body">This order record could not be found.</p>
       <Link href="/admin/orders" className="inline-block px-10 py-4 bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest">Back to Orders</Link>
    </div>
  );

  const status = orderStatusConfig[order.status] || orderStatusConfig.pending;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4">
          <Link href="/admin/orders" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors group">
             <ChevronLeft className="w-4 h-4" />
             Back to Orders
          </Link>
          <div className="space-y-2">
             <div className="flex items-center gap-4 flex-wrap">
               <h1 className="text-4xl font-bold tracking-tight text-black">Order #{order.id.slice(0, 8)}</h1>
               <Badge className={cn(
                  "px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
                  status.color
               )}>
                  {status.label}
               </Badge>
             </div>
             <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
               <span className="text-black font-bold">{order.inquiries?.name}</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-slate-400" /> 
                 {order.inquiries?.event_date ? format(new Date(order.inquiries.event_date), 'MMMM dd, yyyy') : 'Date TBD'}
               </span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
           <button className="h-10 px-4 bg-white border border-slate-200 rounded hover:border-black transition-all flex items-center justify-center text-slate-500">
             <Printer className="w-4 h-4" />
           </button>
           <button 
             onClick={() => updateStatus(order.status === 'pending' ? 'deposit_paid' : order.status === 'deposit_paid' ? 'in_progress' : 'ready')}
             disabled={updating || order.status === 'delivered'}
             className="h-10 px-6 bg-black text-white rounded text-[10px] font-bold uppercase tracking-wider shadow hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
           >
             {updating ? "Processing..." : "Advance Status"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           
           {/* Financial Overview */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Financial Overview</h3>
                 <Badge variant="outline" className={cn(
                    "px-3 py-1 rounded text-[10px] font-bold tracking-wider",
                    order.is_fully_paid ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-amber-600 bg-amber-50 border-amber-100"
                 )}>
                    {order.is_fully_paid ? "Fully Paid" : "Balance Pending"}
                 </Badge>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
                 <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Grand Total</span>
                    <p className="text-3xl font-bold text-black tracking-tight">${order.total_amount}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Deposit Received</span>
                    <p className="text-3xl font-bold text-slate-400 tracking-tight">${order.deposit_amount || '0.00'}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Remaining Balance</span>
                    <p className="text-3xl font-bold text-black tracking-tight">${(order.total_amount - (order.deposit_amount || 0)).toFixed(2)}</p>
                 </div>
              </div>
           </div>

           {/* Workflow Progress */}
           <div className="space-y-6">
              <div className="px-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Order Workflow</h3>
              </div>
              <div className="bg-slate-50 rounded-lg p-10 space-y-10 border border-slate-200">
                 <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded bg-black text-white flex items-center justify-center shrink-0">
                       <status.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-xl font-bold tracking-tight text-black">{status.label}</h4>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">{status.desc}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {['pending', 'deposit_paid', 'in_progress', 'ready', 'delivered'].map((s, i) => (
                       <button
                         key={s}
                         onClick={() => updateStatus(s)}
                         className={cn(
                            "h-10 rounded text-[9px] font-bold uppercase tracking-wider transition-all border",
                            order.status === s 
                              ? "bg-black border-black text-white shadow" 
                              : "bg-white border-slate-200 text-slate-400 hover:border-black hover:text-black"
                         )}
                       >
                          Stage {i + 1}
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-8 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cake Metadata</h3>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Cake className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Flavor Profile</span>
                       <span className="text-sm font-bold text-black">{order.inquiries?.flavor || 'Custom Selection'}</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Users className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Scale</span>
                       <span className="text-sm font-bold text-black">{order.inquiries?.servings} Guests · {order.inquiries?.tiers}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Truck className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Fulfillment</span>
                       <span className="text-sm font-bold text-black capitalize">{order.inquiries?.delivery_method}</span>
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                 <Link href={`/admin/inquiries/${order.inquiry_id}`} className="w-full h-10 bg-black text-white rounded text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow">
                    View Full Inquiry
                 </Link>
              </div>
           </div>

           <div className="bg-slate-50 rounded-lg p-8 space-y-6 border border-slate-200">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Actions</h3>
              <div className="grid gap-2">
                 <button 
                    onClick={togglePayment}
                    className={cn(
                      "w-full h-10 border rounded text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                      order.is_fully_paid ? "bg-white border-slate-200 text-emerald-600" : "bg-white border-slate-200 text-black hover:border-black"
                    )}
                 >
                    {order.is_fully_paid ? "Mark as Unpaid" : "Confirm Payment"}
                 </button>
                 <div className="grid grid-cols-2 gap-2">
                    {order.status !== 'delivered' && (
                      <button 
                        onClick={cancelOrder}
                        className="h-10 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-black transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button 
                      onClick={deleteOrder}
                      className="h-10 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-all"
                    >
                       Delete
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
