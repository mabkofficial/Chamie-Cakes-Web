"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      console.error("Error fetching inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name?.toLowerCase().includes(search.toLowerCase()) ||
    inquiry.email?.toLowerCase().includes(search.toLowerCase()) ||
    inquiry.event_type?.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "new":
        return <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">New Request</Badge>
      case "converted":
        return <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Accepted</Badge>
      case "archived":
        return <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Archived</Badge>
      default:
        return <Badge variant="outline" className="px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">{status || "Pending"}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Requests</h1>
        <p className="text-slate-500 text-sm font-body">Read your messages and cake requests.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
         {[
           { label: "Total Requests", value: inquiries.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
           { label: "New Messages", value: inquiries.filter(i => i.status?.toLowerCase() === 'new').length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
           { label: "Accepted", value: inquiries.filter(i => i.status?.toLowerCase() === 'converted').length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" }
         ].map((stat, i) => (
           <Card key={i} className="border border-slate-200 shadow-sm bg-white rounded-lg">
             <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded flex items-center justify-center", stat.bg, stat.color)}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                   <div className="text-lg font-bold text-black">{stat.value}</div>
                </div>
             </CardContent>
           </Card>
         ))}
      </div>

      {/* Search and Table */}
      <Card className="border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-slate-100">
           <div className="flex items-center gap-3 w-full max-w-md">
              <div className="relative w-full">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                 <Input 
                   placeholder="Search requests..." 
                   className="pl-9 h-10 text-sm"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
                 <Filter className="w-3.5 h-3.5 text-slate-500" />
              </Button>
           </div>
           <Button className="w-full sm:w-auto h-10 bg-black text-white px-6 text-xs font-semibold">
              Export Data
           </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100 bg-slate-50/50">
                  <TableHead className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-500">Customer</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Event Type</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Status</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Received</TableHead>
                  <TableHead className="text-right px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i} className="animate-pulse border-slate-50">
                      <TableCell className="px-10 py-8"><div className="h-5 bg-slate-50 rounded-full w-48" /></TableCell>
                      <TableCell><div className="h-5 bg-slate-50 rounded-full w-24" /></TableCell>
                      <TableCell><div className="h-8 bg-slate-50 rounded-full w-20" /></TableCell>
                      <TableCell><div className="h-5 bg-slate-50 rounded-full w-24" /></TableCell>
                      <TableCell className="px-10 text-right"><div className="h-10 bg-slate-50 rounded-full w-10 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-slate-400 font-body italic">
                      No inquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} className="hover:bg-slate-50 transition-colors border-slate-100 cursor-pointer" onClick={() => window.location.href = `/admin/inquiries/${inquiry.id}`}>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {inquiry.name?.[0]}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm text-black">{inquiry.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{inquiry.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                         <span className="text-xs font-semibold text-slate-600">{inquiry.event_type}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(inquiry.status)}
                      </TableCell>
                      <TableCell className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        {new Date(inquiry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="px-6 text-right">
                        <div className="flex justify-end">
                           <div className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 hover:text-black hover:border-black transition-all">
                              <Eye className="w-4 h-4" />
                           </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
