"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Star,
  History,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Users,
  ArrowRight,
  Sparkles
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [isAdding, setIsAdding] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    total_orders: 0,
    total_spend: 0
  })

  async function handleAddCustomer() {
    try {
      const { data, error } = await supabase
        .from("customers")
        .insert([newCustomer])
        .select()

      if (error) throw error
      
      setCustomers([data[0], ...customers])
      setIsAdding(false)
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        total_orders: 0,
        total_spend: 0
      })
    } catch (error) {
      console.error("Error adding customer:", error)
      alert("Failed to add customer.")
    }
  }

  async function deleteCustomer(id: string) {
    if (!confirm("Are you sure you want to remove this customer?")) return
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id)
      if (error) throw error
      setCustomers(customers.filter(c => c.id !== id))
    } catch (error) {
      console.error("Error deleting customer:", error)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("name", { ascending: true })

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(customer => 
    customer.name?.toLowerCase().includes(search.toLowerCase()) ||
    customer.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Customers</h1>
        <p className="text-slate-500 text-sm font-body">Manage your client base and loyalty tracking.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
         {[
           { label: "Total Members", value: customers.length, icon: Users, color: "text-slate-600", bg: "bg-slate-50" },
           { label: "VIP Customers", value: customers.filter(c => (c.total_orders || 0) > 2).length, icon: Star, color: "text-emerald-600", bg: "bg-emerald-50" },
           { label: "Lifetime Value", value: `$${customers.reduce((acc, c) => acc + (c.total_spend || 0), 0).toLocaleString()}`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" }
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
                   placeholder="Search customers..." 
                   className="pl-9 h-10 text-sm"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
           </div>
           <Sheet open={isAdding} onOpenChange={setIsAdding}>
             <SheetTrigger asChild>
               <Button className="w-full sm:w-auto h-10 bg-black text-white px-6 text-xs font-semibold">
                  Add Customer
               </Button>
             </SheetTrigger>
             <SheetContent className="sm:max-w-[450px]">
               <SheetHeader className="space-y-1 pt-4">
                 <SheetTitle className="text-2xl font-bold">New Client</SheetTitle>
                 <SheetDescription className="text-slate-500 text-sm">
                   Add a new member to the Chamie Cakes family.
                 </SheetDescription>
               </SheetHeader>
               <div className="grid gap-6 py-8">
                 <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-700">Full Name</label>
                   <Input 
                     placeholder="e.g. Arabella Stone" 
                     value={newCustomer.name}
                     onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-700">Email Address</label>
                   <Input 
                     type="email"
                     placeholder="hello@example.com" 
                     value={newCustomer.email}
                     onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                   <Input 
                     placeholder="+1 (555) 000-0000" 
                     value={newCustomer.phone}
                     onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                   />
                 </div>
               </div>
               <SheetFooter className="pt-4 border-t border-slate-100">
                 <Button 
                    className="w-full h-10 bg-black text-white"
                    onClick={handleAddCustomer}
                  >
                   Register Customer
                 </Button>
               </SheetFooter>
             </SheetContent>
           </Sheet>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100 bg-slate-50/50">
                  <TableHead className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-500">Customer</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Status</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Orders</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Lifetime Spend</TableHead>
                  <TableHead className="text-right px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i} className="animate-pulse border-slate-50">
                      <TableCell className="px-10 py-8"><div className="h-5 bg-slate-50 rounded-full w-48" /></TableCell>
                      <TableCell><div className="h-8 bg-slate-50 rounded-full w-24" /></TableCell>
                      <TableCell><div className="h-5 bg-slate-50 rounded-full w-12" /></TableCell>
                      <TableCell><div className="h-5 bg-slate-50 rounded-full w-24" /></TableCell>
                      <TableCell className="px-10 text-right"><div className="h-10 bg-slate-50 rounded-full w-10 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-slate-400 font-body italic">
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-slate-50 transition-colors border-slate-100 cursor-pointer">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
                            {customer.name?.[0]}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm text-black">{customer.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{customer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {(customer.total_orders || 0) > 2 ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                            VIP Member
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500 border-slate-200 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Standard</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                         <span className="text-xs font-semibold text-slate-600">{customer.total_orders || 0} orders</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-sm text-black">${(customer.total_spend || 0).toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="px-6 text-right">
                        <div className="flex justify-end items-center gap-2">
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" className="h-8 w-8 p-0 rounded-md">
                                 <MoreHorizontal className="h-4 w-4 text-slate-400" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end" className="w-48 rounded-md shadow-lg border-slate-200 bg-white">
                               <DropdownMenuLabel className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-3 py-2">Actions</DropdownMenuLabel>
                               <DropdownMenuItem className="cursor-pointer">
                                 <Mail className="mr-2 h-4 w-4 text-slate-400" />
                                 <span className="text-sm">Send Email</span>
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               <DropdownMenuItem 
                                 className="text-red-600 cursor-pointer"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   deleteCustomer(customer.id);
                                 }}
                               >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span className="text-sm">Remove Client</span>
                               </DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                           <div className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 hover:text-black hover:border-black transition-all">
                              <ArrowRight className="w-4 h-4" />
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
