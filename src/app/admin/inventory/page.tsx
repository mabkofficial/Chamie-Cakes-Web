"use client"

import { useState, useEffect } from "react"
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Tag,
  Clock,
  ArrowRight,
  Cake,
  Layers,
  Palette,
  DollarSign
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import { supabase } from "@/lib/supabase"

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Wedding",
    price: 0,
    stock: 5,
    status: "available"
  })

  async function handleAddProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select()

      if (error) throw error
      
      setProducts([data[0], ...products])
      setIsAdding(false)
      setNewProduct({
        name: "",
        category: "Wedding",
        price: 0,
        stock: 5,
        status: "available"
      })
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product.")
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to remove this item from the menu?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)
      if (error) throw error
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product. Please try again.")
    }
  }

  async function toggleAvailability(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'available' ? 'sold_out' : 'available'
    try {
      const { error } = await supabase
        .from("products")
        .update({ status: newStatus })
        .eq("id", id)
      
      if (error) throw error
      
      setProducts(products.map(p => 
        p.id === id ? { ...p, status: newStatus } : p
      ))
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  async function editPrice(id: string, currentPrice: number) {
    const newPrice = prompt("Enter new base price:", currentPrice.toString())
    if (newPrice === null || isNaN(parseFloat(newPrice))) return

    try {
      const { error } = await supabase
        .from("products")
        .update({ price: parseFloat(newPrice) })
        .eq("id", id)
      
      if (error) throw error
      
      setProducts(products.map(p => 
        p.id === id ? { ...p, price: parseFloat(newPrice) } : p
      ))
    } catch (error) {
      console.error("Error updating price:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">In Stock</Badge>
      case "limited":
        return <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Low Stock</Badge>
      case "sold_out":
        return <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">Sold Out</Badge>
      default:
        return <Badge variant="outline" className="px-3 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black">Menu</h1>
        <p className="text-slate-500 text-sm font-body">Manage your cake designs, availability, and pricing.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
         {[
           { label: "Total Items", value: products.length, icon: Cake },
           { label: "Categories", value: "5 Active", icon: Palette },
           { label: "Stock Value", value: `$${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}`, icon: Layers }
         ].map((stat, i) => (
           <Card key={i} className="border border-slate-200 shadow-sm bg-white rounded-lg">
             <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center text-slate-600">
                   <stat.icon className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                   <div className="text-lg font-bold text-black">{stat.value}</div>
                </div>
             </CardContent>
           </Card>
         ))}
         <Card className="border-dashed border-slate-300 bg-slate-50/30 rounded-lg cursor-pointer hover:border-black transition-all group" onClick={() => setIsAdding(true)}>
            <CardContent className="p-6 flex items-center justify-center gap-3">
               <Plus className="w-4 h-4 text-slate-400 group-hover:text-black" />
               <span className="text-xs font-semibold text-slate-500 group-hover:text-black">Add Collection</span>
            </CardContent>
         </Card>
      </div>

      {/* Main Inventory Management */}
      <Card className="border border-slate-200 shadow-sm bg-white rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-slate-100">
           <div className="flex items-center gap-3 w-full max-w-md">
              <div className="relative w-full">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                 <Input 
                   placeholder="Search menu..." 
                   className="pl-9 h-10 text-sm"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
                 <Filter className="w-3.5 h-3.5 text-slate-500" />
              </Button>
           </div>
           <Sheet open={isAdding} onOpenChange={setIsAdding}>
             <SheetTrigger asChild>
               <Button className="w-full sm:w-auto h-10 bg-black text-white px-6 text-xs font-semibold">
                  New Product
               </Button>
             </SheetTrigger>
             <SheetContent className="sm:max-w-[450px]">
               <SheetHeader className="pb-6 border-b border-slate-100">
                 <SheetTitle>Add Menu Item</SheetTitle>
                 <SheetDescription>
                   Create a new product listing for your shop.
                 </SheetDescription>
               </SheetHeader>
               <div className="grid gap-8 py-12">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Product Name</label>
                   <Input 
                     placeholder="e.g. Midnight Velvet" 
                     className="h-14 rounded-2xl bg-slate-50 border-none px-6 focus-visible:ring-1 focus-visible:ring-black"
                     value={newProduct.name}
                     onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Category</label>
                      <select 
                        className="w-full h-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-medium focus:ring-1 focus:ring-black outline-none appearance-none"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option>Wedding</option>
                        <option>Birthday</option>
                        <option>Kids</option>
                        <option>Holiday</option>
                        <option>Trending</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Base Price</label>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="h-14 rounded-2xl bg-slate-50 border-none px-6 focus-visible:ring-1 focus-visible:ring-black"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                      />
                    </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Initial Stock</label>
                   <Input 
                     type="number" 
                     className="h-14 rounded-2xl bg-slate-50 border-none px-6 focus-visible:ring-1 focus-visible:ring-black"
                     value={newProduct.stock}
                     onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                   />
                 </div>
               </div>
               <SheetFooter>
                 <Button 
                    className="w-full h-16 rounded-2xl bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-widest shadow-2xl shadow-black/20"
                    onClick={handleAddProduct}
                  >
                   Create Product
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
                  <TableHead className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-500">Product Name</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Category</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Status</TableHead>
                  <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-500">Stock</TableHead>
                  <TableHead className="text-right px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500">Base Price</TableHead>
                  <TableHead className="text-right px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i} className="animate-pulse border-slate-50">
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50" />
                          <div className="flex flex-col gap-2">
                            <div className="h-4 bg-slate-50 rounded-full w-32" />
                            <div className="h-2 bg-slate-50 rounded-full w-16" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell><div className="h-4 bg-slate-50 rounded-full w-24" /></TableCell>
                      <TableCell><div className="h-8 bg-slate-50 rounded-full w-20" /></TableCell>
                      <TableCell><div className="h-4 bg-slate-50 rounded-full w-20" /></TableCell>
                      <TableCell className="text-right px-10"><div className="h-6 bg-slate-50 rounded-full w-16 ml-auto" /></TableCell>
                      <TableCell className="px-10 text-right"><div className="h-10 bg-slate-50 rounded-full w-10 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center text-slate-400 font-body italic">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                             <Cake className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm text-black">{product.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">ID: {product.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </TableCell>
                    <TableCell>
                       <span className="text-xs font-semibold text-slate-600">{product.category}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(product.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          product.stock > 10 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"
                        )} />
                        <span className="text-xs font-semibold text-slate-600">{product.stock} units</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-6">
                       <span className="font-bold text-sm text-black">${product.price}</span>
                    </TableCell>
                    <TableCell className="px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 rounded-md">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-md shadow-lg border-slate-200 bg-white">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => toggleAvailability(product.id, product.status)}
                          >
                            <Clock className="mr-2 h-4 w-4 text-slate-400" />
                            <span className="text-sm">
                              {product.status === 'available' ? 'Mark Sold Out' : 'Mark Available'}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => editPrice(product.id, product.price)}
                          >
                            <DollarSign className="mr-2 h-4 w-4 text-slate-400" />
                            <span className="text-sm">Edit Price</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 cursor-pointer"
                            onClick={() => deleteProduct(product.id)}
                          >
                             <Trash2 className="mr-2 h-4 w-4" />
                             <span className="text-sm">Delete Product</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total: {products.length} products</p>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-wider">Previous</Button>
              <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-wider">Next</Button>
           </div>
        </CardFooter>
      </Card>
    </div>
  )
}
