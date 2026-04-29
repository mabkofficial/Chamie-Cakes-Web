"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, UploadCloud, Loader2, Calendar, Users, Palette, MessageSquare, Heart, Gift, Baby, Briefcase, Clock, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

const STEPS = [
  { id: 1, name: "The Basics", icon: Calendar },
  { id: 2, name: "The Cake", icon: Users },
  { id: 3, name: "The Design", icon: Palette },
  { id: 4, name: "Contact", icon: MessageSquare }
];

const OCCASIONS = [
  { id: "wedding", name: "Wedding", icon: Heart },
  { id: "birthday", name: "Birthday", icon: Gift },
  { id: "kids", name: "Kids Party", icon: Baby },
  { id: "corporate", name: "Corporate", icon: Briefcase }
];

const TIER_OPTIONS = [
  { id: "1-tier", name: "1 Tier", desc: "Small & Modern" },
  { id: "2-tier", name: "2 Tiers", desc: "Great Design" },
  { id: "3-tier", name: "3+ Tiers", desc: "Large & Grand" }
];

const BUDGET_RANGES = [
  { id: "under-500", name: "$200 - $500" },
  { id: "500-1000", name: "$500 - $1,000" },
  { id: "over-1000", name: "$1,000+" }
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    time: "12:00",
    servings: 20,
    tiers: "1-tier",
    flavor: "Signature Velvet",
    filling: "",
    dietary: [] as string[],
    description: "",
    colors: "",
    budget: "$500 - $1,000",
    name: "",
    email: "",
    phone: "",
    contactMethod: "email",
    deliveryMethod: "pickup",
    address: "",
    imageFile: null as File | null,
    imagePreview: ""
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const toggleDietary = (need: string) => {
    const current = [...formData.dietary];
    const index = current.indexOf(need);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(need);
    }
    updateForm("dietary", current);
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.eventType) newErrors.eventType = "Required";
      if (!formData.date) newErrors.date = "Required";
      if (formData.deliveryMethod === "delivery" && !formData.address) newErrors.address = "Required";
    }
    if (step === 4) {
      if (!formData.name) newErrors.name = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.phone) newErrors.phone = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Sync Customer Profile
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .upsert(
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone,
            favorite_flavor: formData.flavor 
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (customerError) throw customerError;

      let imageUrl = null;

      if (formData.imageFile) {
        const fileExt = formData.imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("reference-images")
          .upload(fileName, formData.imageFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);
        } else if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from("reference-images")
            .getPublicUrl(uploadData.path);
          imageUrl = publicUrl;
        }
      }

      // 2. Insert Inquiry
      const { error } = await supabase
        .from("inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            contact_method: formData.contactMethod,
            event_type: formData.eventType,
            event_date: formData.date,
            event_time: formData.time,
            delivery_method: formData.deliveryMethod,
            address: formData.address,
            servings: formData.servings,
            tiers: formData.tiers,
            flavor: formData.flavor,
            filling: formData.filling,
            dietary: formData.dietary,
            description: formData.description,
            colors: formData.colors,
            budget: formData.budget,
            image_url: imageUrl,
          }
        ]);

      if (error) throw error;
      
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Submission error:", error.message);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white rounded-xl shadow-2xl border border-slate-100 p-20 text-center space-y-8"
      >
        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-black" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold tracking-tighter">Order Sent.</h2>
          <p className="text-slate-500 font-body leading-relaxed max-w-sm mx-auto">
            Thank you for your order. Chamie will review your details and reach out within 24-48 hours.
          </p>
        </div>
        <Button 
          variant="outline" 
          className="rounded-full px-10 py-6 border-slate-100 text-slate-400 hover:text-black transition-all"
          onClick={() => window.location.href = "/"}
        >
          Return Home
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
      {/* Progress Nav */}
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex gap-4">
           {STEPS.map((step) => {
             return (
               <div key={step.id} className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                   currentStep === step.id ? "bg-black text-white" : currentStep > step.id ? "bg-black text-white" : "bg-white border border-slate-100 text-slate-300"
                 }`}>
                   {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                 </div>
                 <span className={`hidden lg:block text-[9px] font-bold uppercase tracking-widest ${
                   currentStep >= step.id ? "text-black" : "text-slate-300"
                 }`}>{step.name}</span>
                 {step.id < 4 && <div className="w-4 h-px bg-slate-100 mx-1 hidden lg:block" />}
               </div>
             );
           })}
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 hidden sm:block">
          Ordering
        </div>
      </div>

      <div className="p-8 md:p-10 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 max-w-2xl mx-auto"
          >
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">Step 01 / Basics</p>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter text-black">Event Details.</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {OCCASIONS.map(occasion => {
                    const Icon = occasion.icon;
                    return (
                      <button
                        key={occasion.id}
                        onClick={() => updateForm("eventType", occasion.id)}
                        className={`flex flex-col items-center justify-center gap-3 p-6 rounded-lg border-2 transition-all group ${
                          formData.eventType === occasion.id 
                            ? "border-black bg-black text-white shadow-xl" 
                            : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          formData.eventType === occasion.id ? "bg-white/10" : "bg-white group-hover:bg-slate-100"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{occasion.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                       <Calendar className="w-3 h-3" /> Event Date
                    </label>
                    <input 
                      type="date"
                      className="w-full p-3.5 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs text-black transition-all"
                      value={formData.date}
                      onChange={(e) => updateForm("date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                       <Clock className="w-3 h-3" /> Setup Time
                    </label>
                    <input 
                      type="time"
                      className="w-full p-3.5 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs text-black transition-all"
                      value={formData.time}
                      onChange={(e) => updateForm("time", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                     <MapPin className="w-3 h-3" /> Fulfillment
                  </label>
                  <div className="flex gap-2">
                    {["pickup", "delivery"].map(method => (
                      <button
                        key={method}
                        onClick={() => updateForm("deliveryMethod", method)}
                        className={`flex-1 py-3.5 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all ${
                          formData.deliveryMethod === method ? "bg-black text-white border-black shadow-lg" : "bg-slate-50 border-slate-100 text-slate-400"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  {formData.deliveryMethod === "delivery" && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                      <input 
                        type="text"
                        placeholder="Venue Name or Full Delivery Address"
                        className="w-full p-3.5 mt-2 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs transition-all"
                        value={formData.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: The Cake */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">Step 02 / The Cake</p>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter text-black">Size & Flavor.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TIER_OPTIONS.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => updateForm("tiers", tier.id)}
                      className={`p-5 rounded-lg border-2 transition-all text-left space-y-2 ${
                        formData.tiers === tier.id 
                          ? "border-black bg-slate-50 shadow-md" 
                          : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase text-black tracking-[0.1em]">{tier.name}</p>
                      <p className="text-[9px] text-slate-500 font-body leading-relaxed">{tier.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Guest Servings</label>
                    <span className="text-black font-bold text-xs">{formData.servings} guests</span>
                  </div>
                  <input 
                    type="range" min="10" max="250" step="10"
                    className="w-full accent-black h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    value={formData.servings}
                    onChange={(e) => updateForm("servings", parseInt(e.target.value))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Signature Flavor</label>
                     <div className="relative">
                        <select 
                          className="w-full p-3.5 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs appearance-none cursor-pointer transition-all"
                          value={formData.flavor}
                          onChange={(e) => updateForm("flavor", e.target.value)}
                        >
                          <option>Signature Velvet</option>
                          <option>Lemon Lavender</option>
                          <option>Salted Caramel</option>
                          <option>Seasonal Selection</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rotate-90 text-slate-300 pointer-events-none" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Cake Filling</label>
                     <input 
                        type="text"
                        placeholder="e.g. Raspberry Coulis"
                        className="w-full p-3.5 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs transition-all"
                        value={formData.filling}
                        onChange={(e) => updateForm("filling", e.target.value)}
                     />
                   </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Dietary Restrictions</label>
                  <div className="flex flex-wrap gap-2">
                    {["Gluten-Free", "Vegan", "Dairy-Free", "Nut-Free"].map(need => (
                      <button
                        key={need}
                        onClick={() => toggleDietary(need)}
                        className={`px-5 py-2.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${
                          formData.dietary.includes(need) ? "bg-black text-white border-black shadow-md" : "border-slate-50 bg-slate-50/50 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {need}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Design */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">Step 03 / Design</p>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter text-black">Look & Color.</h2>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Design Vision
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full p-6 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none transition-all resize-none font-body text-xs text-black leading-relaxed"
                    placeholder="Describe the mood, themes, or the specific 'feeling' of the event..."
                    value={formData.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                        <Palette className="w-3.5 h-3.5" /> Color Palette
                     </label>
                     <input 
                        type="text"
                        placeholder="e.g. Muted Sage, Pearl, Gold"
                        className="w-full p-3.5 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs transition-all"
                        value={formData.colors}
                        onChange={(e) => updateForm("colors", e.target.value)}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5" /> Budget
                     </label>
                     <div className="relative">
                        <select 
                          className="w-full p-3.5 bg-slate-50 rounded-lg border border-slate-100 focus:bg-white focus:border-black outline-none font-body text-xs appearance-none cursor-pointer transition-all"
                          value={formData.budget}
                          onChange={(e) => updateForm("budget", e.target.value)}
                        >
                          {BUDGET_RANGES.map(r => <option key={r.id}>{r.name}</option>)}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rotate-90 text-slate-300 pointer-events-none" />
                     </div>
                   </div>
                </div>

                <div className="relative border-2 border-dashed border-slate-100 rounded-lg p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-black transition-all cursor-pointer group overflow-hidden">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        updateForm("imageFile", file);
                        const reader = new FileReader();
                        reader.onload = (e) => updateForm("imagePreview", e.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.imagePreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={formData.imagePreview} alt="Reference Preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <Check className="w-10 h-10 mb-3 text-black" />
                         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Image Selected</p>
                         <p className="text-[8px] uppercase tracking-widest text-slate-500 mt-1">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 mb-3 text-slate-200 group-hover:text-black transition-colors" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-black">Upload Reference</p>
                      <p className="text-[8px] uppercase tracking-widest text-slate-400 mt-2 text-center max-w-[200px]">Optional. Share an image that inspired your vision.</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">Step 04 / Contact</p>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter text-black">Let's Connect.</h2>
                </div>

                <div className="grid grid-cols-1 gap-5">
                   {[
                     { label: "Full Name", field: "name", type: "text", placeholder: "John Doe" },
                     { label: "Email", field: "email", type: "email", placeholder: "hello@example.com" },
                     { label: "Phone", field: "phone", type: "tel", placeholder: "713.000.0000" }
                   ].map(input => (
                     <div key={input.field} className="space-y-1.5">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">{input.label}</label>
                       <input 
                         type={input.type}
                         placeholder={input.placeholder}
                         className={`w-full p-3.5 bg-slate-50 rounded-lg border outline-none transition-all font-body text-xs text-black focus:bg-white ${errors[input.field] ? 'border-red-300' : 'border-slate-100 focus:border-black'}`}
                         value={(formData as any)[input.field]}
                         onChange={(e) => updateForm(input.field, e.target.value)}
                       />
                     </div>
                   ))}
                </div>

                <div className="space-y-3">
                   <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 ml-1">Preferred Contact</label>
                   <div className="flex gap-2">
                     {["email", "text"].map(m => (
                       <button
                         key={m}
                         onClick={() => updateForm("contactMethod", m)}
                         className={`flex-1 py-3.5 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all ${
                           formData.contactMethod === m ? "bg-black text-white border-black shadow-lg" : "bg-slate-50 border-slate-100 text-slate-400"
                         }`}
                       >
                         {m}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Nav */}
      <div className="px-10 py-6 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between">
        <button 
          onClick={prevStep}
          disabled={currentStep === 1 || isSubmitting}
          className={`${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'} text-slate-400 hover:text-black font-bold uppercase tracking-[0.3em] text-[9px] flex items-center gap-2 transition-all`}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={currentStep === 4 ? handleSubmit : nextStep}
          disabled={isSubmitting}
          className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-zinc-800 transition-all flex items-center gap-3"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentStep === 4 ? (
            <>Submit <ChevronRight className="w-4 h-4" /></>
          ) : (
            <>Next <ChevronRight className="w-4 h-4" /></>
          )}
        </motion.button>
      </div>
    </div>
  );
}
