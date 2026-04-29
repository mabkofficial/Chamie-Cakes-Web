"use client";

import { useState, useEffect, use } from "react";
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  Cake, 
  Users, 
  Palette, 
  MessageSquare,
  DollarSign,
  Download,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Printer,
  Trash2,
  Sparkles,
  ArrowRight,
  Send,
  History
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [inquiry, setInquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [showConvertModal, setShowConvertModal] = useState(false);
  const [orderTotal, setOrderTotal] = useState("");
  const [orderDeposit, setOrderDeposit] = useState("");
  const [comms, setComms] = useState<any[]>([]);
  const [commType, setCommType] = useState("email");
  const [commContent, setCommContent] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    fetchInquiry();
    fetchComms();
  }, [id]);

  async function fetchInquiry() {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setInquiry(data);
    } catch (error: any) {
      console.error("Error fetching inquiry:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchComms() {
    try {
      const { data, error } = await supabase
        .from("communications")
        .select("*")
        .eq("inquiry_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComms(data || []);
    } catch (error: any) {
      console.error("Error fetching communications:", error.message);
    }
  }

  async function logComm() {
    if (!commContent) return;
    setIsLogging(true);
    try {
      const { data, error } = await supabase
        .from("communications")
        .insert([{ inquiry_id: id, type: commType, content: commContent }])
        .select()
        .single();

      if (error) throw error;
      setComms([data, ...comms]);
      setCommContent("");
    } catch (error: any) {
      alert("Failed to save message");
    } finally {
      setIsLogging(false);
    }
  }

  async function archiveInquiry() {
    if (!confirm("Are you sure you want to archive this inquiry?")) return;
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: "archived" })
        .eq("id", id);

      if (error) throw error;
      setInquiry({ ...inquiry, status: "archived" });
    } catch (error: any) {
      alert("Failed to archive inquiry");
    } finally {
      setUpdating(false);
    }
  }

  async function deleteInquiry() {
    if (!confirm("Are you sure you want to permanently delete this inquiry? This cannot be undone.")) return;
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      window.location.href = "/admin/inquiries";
    } catch (error: any) {
      alert("Failed to delete inquiry");
    } finally {
      setUpdating(false);
    }
  }

  async function convertToOrder() {
    if (!orderTotal) return;
    setUpdating(true);
    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([{
          inquiry_id: id,
          total_amount: parseFloat(orderTotal),
          deposit_amount: parseFloat(orderDeposit || "0"),
          status: "pending",
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      const { error: inqError } = await supabase
        .from("inquiries")
        .update({ status: "converted" })
        .eq("id", id);

      if (inqError) throw inqError;

      setInquiry({ ...inquiry, status: "converted" });
      setShowConvertModal(false);
    } catch (error: any) {
      alert("Failed to convert inquiry: " + error.message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
       <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Loading Inquiry...</p>
    </div>
  );

  if (!inquiry) return (
    <div className="p-20 text-center space-y-6">
       <h2 className="text-3xl font-bold tracking-tight">Not Found</h2>
       <p className="text-sm text-slate-400 font-body">This inquiry could not be found.</p>
       <Link href="/admin/inquiries" className="inline-block px-10 py-4 bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest">Back to Inquiries</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Convert Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl space-y-8 border border-slate-200">
            <div className="space-y-2">
               <h3 className="text-xl font-bold text-black">Confirm Order</h3>
               <p className="text-sm text-slate-500 font-medium">Set the price and deposit to turn this inquiry into an order.</p>
            </div>
            
            <div className="space-y-4">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Price</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                     <input 
                       type="number" 
                       placeholder="0.00"
                       className="w-full h-10 bg-white border border-slate-200 rounded px-8 text-sm font-bold outline-none focus:ring-1 focus:ring-black transition-all"
                       value={orderTotal}
                       onChange={(e) => setOrderTotal(e.target.value)}
                     />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Deposit Amount</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                     <input 
                       type="number" 
                       placeholder="0.00"
                       className="w-full h-10 bg-white border border-slate-200 rounded px-8 text-sm font-bold outline-none focus:ring-1 focus:ring-black transition-all"
                       value={orderDeposit}
                       onChange={(e) => setOrderDeposit(e.target.value)}
                     />
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
               <button 
                 onClick={convertToOrder}
                 disabled={updating || !orderTotal}
                 className="w-full h-10 bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest shadow hover:bg-zinc-800 transition-all disabled:opacity-50"
               >
                 {updating ? "Processing..." : "Confirm Order"}
               </button>
               <button 
                 onClick={() => setShowConvertModal(false)}
                 className="w-full h-10 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors"
               >
                 Cancel
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4">
          <Link href="/admin/inquiries" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors group">
             <ChevronLeft className="w-4 h-4" />
             Back to Inquiries
          </Link>
          <div className="space-y-2">
             <div className="flex items-center gap-4 flex-wrap">
               <h1 className="text-4xl font-bold tracking-tight text-black">{inquiry.name}</h1>
               <Badge className={cn(
                  "px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
                  inquiry.status === 'converted' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-black text-white"
               )}>
                  {inquiry.status === 'converted' ? 'Converted' : 'New Request'}
               </Badge>
             </div>
             <p className="text-sm font-medium text-slate-500 flex items-center gap-3">
               {inquiry.event_type} <span className="w-1 h-1 rounded-full bg-slate-300" /> {inquiry.event_date ? format(new Date(inquiry.event_date), 'MMMM dd, yyyy') : 'Date TBD'}
             </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
           <button className="h-10 px-4 bg-white border border-slate-200 rounded hover:border-black transition-all flex items-center justify-center text-slate-500">
             <Printer className="w-4 h-4" />
           </button>
           {inquiry.status !== 'converted' && (
             <button 
               onClick={() => setShowConvertModal(true)}
               disabled={updating}
               className="h-10 px-6 bg-black text-white rounded text-[10px] font-bold uppercase tracking-widest shadow hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
             >
               {updating ? "Processing..." : "Convert to Order"}
             </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           
           {/* Cake Design */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vision & Design</h3>
                 <Badge variant="outline" className="px-3 py-1 rounded text-[10px] font-bold tracking-wider text-slate-500 border-slate-200 bg-slate-50">{inquiry.servings} Guests</Badge>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-8 shadow-sm">
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded">
                    <p className="text-base font-medium leading-relaxed text-slate-700 italic">
                      "{inquiry.description || "No specific vision notes provided."}"
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                    <div className="space-y-1.5">
                       <div className="flex items-center gap-2 text-slate-400">
                          <Palette className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Color Palette</span>
                       </div>
                       <p className="text-base font-bold text-black">{inquiry.colors || 'To be determined'}</p>
                    </div>
                    <div className="space-y-1.5">
                       <div className="flex items-center gap-2 text-slate-400">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Expected Budget</span>
                       </div>
                       <p className="text-base font-bold text-black">{inquiry.budget || 'Quote Pending'}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Communications */}
           <div className="space-y-8">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Communication Log</h3>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comms.length} Records</span>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6 shadow-sm">
                 <div className="flex items-center gap-2">
                    {['email', 'text', 'call'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setCommType(type)}
                        className={cn(
                            "h-9 px-4 rounded text-[10px] font-bold uppercase tracking-widest transition-all border",
                            commType === type 
                              ? "bg-black border-black text-white shadow-sm" 
                              : "bg-white border-slate-200 text-slate-400 hover:text-black hover:border-black"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                    <div className="flex-1 relative">
                       <input 
                          type="text"
                          placeholder="Log a message..."
                          className="w-full h-9 bg-slate-50 border border-slate-200 rounded px-4 text-xs font-medium outline-none focus:bg-white focus:ring-1 focus:ring-black/5 transition-all"
                          value={commContent}
                          onChange={(e) => setCommContent(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && logComm()}
                       />
                       <button 
                         onClick={logComm}
                         disabled={isLogging || !commContent}
                         className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded bg-black text-white flex items-center justify-center disabled:opacity-20 transition-all hover:bg-zinc-800"
                       >
                          <Send className="w-3 h-3" />
                       </button>
                    </div>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-slate-100">
                    {comms.length === 0 ? (
                      <div className="py-12 text-center">
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No messages recorded.</p>
                      </div>
                    ) : (
                      comms.map((comm) => (
                        <div key={comm.id} className="p-5 bg-white border border-slate-100 rounded space-y-3 relative hover:border-slate-200 transition-all">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest px-2 py-0 bg-slate-50 border-none shadow-none text-slate-500">{comm.type}</Badge>
                                 <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{format(new Date(comm.created_at), 'MMM dd, yyyy · h:mm a')}</span>
                              </div>
                           </div>
                           <p className="text-sm text-slate-700 font-medium leading-relaxed">{comm.content}</p>
                        </div>
                      ))
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="bg-white rounded-lg border border-slate-200 p-8 space-y-8 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Specifications</h3>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Cake className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Tiers</span>
                       <span className="text-sm font-bold text-black">{inquiry.tiers || 'Custom'}</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Users className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Servings</span>
                       <span className="text-sm font-bold text-black">{inquiry.servings} guests</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Palette className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Flavor</span>
                       <span className="text-sm font-bold text-black">{inquiry.flavor || 'Pending'}</span>
                    </div>
                 </div>
              </div>

              {inquiry.dietary && inquiry.dietary.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-3">
                   <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Dietary Needs</span>
                   <div className="flex flex-wrap gap-1.5">
                      {inquiry.dietary.map((need: string) => (
                        <Badge key={need} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0 rounded-sm bg-slate-100 text-slate-500 border-none shadow-none">
                           {need}
                        </Badge>
                      ))}
                   </div>
                </div>
              )}
           </div>

           <div className="bg-slate-50 rounded-lg p-8 space-y-8 border border-slate-200">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Customer Data</h3>
              
              <div className="space-y-6">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email</span>
                    <span className="text-sm font-bold text-black truncate">{inquiry.email}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Phone</span>
                    <span className="text-sm font-bold text-black">{inquiry.phone || 'Pending'}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Delivery</span>
                    <span className="text-sm font-bold text-black capitalize">{inquiry.delivery_method || 'Pending'}</span>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col gap-2">
                 <button className="w-full h-10 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wider hover:border-black transition-all flex items-center justify-center gap-2">
                    <Download className="w-3.5 h-3.5" /> Export PDF
                 </button>
                 <div className="grid grid-cols-2 gap-2">
                    {inquiry.status !== 'archived' && inquiry.status !== 'converted' && (
                      <button 
                        onClick={archiveInquiry}
                        disabled={updating}
                        className="h-10 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-black transition-colors"
                      >
                        Archive
                      </button>
                    )}
                    <button 
                      onClick={deleteInquiry}
                      disabled={updating}
                      className="h-10 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors"
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
