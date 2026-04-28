"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Save, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: 1, name: "Event Basics" },
  { id: 2, name: "Cake Preferences" },
  { id: 3, name: "Design Vision" },
  { id: 4, name: "Contact & Review" }
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    servings: 20,
    flavor: "",
    icing: "",
    dietary: [] as string[],
    description: "",
    colors: "",
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "pickup"
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chamie_order_draft");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, []);

  const saveForLater = () => {
    localStorage.setItem("chamie_order_draft", JSON.stringify(formData));
    alert("Your order draft has been saved!");
  };

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDietary = (need: string) => {
    setFormData(prev => ({
      ...prev,
      dietary: prev.dietary.includes(need)
        ? prev.dietary.filter(i => i !== need)
        : [...prev.dietary, need]
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("chamie_order_draft");
    // Redirect to Stripe or external payment flow
    window.location.href = "https://buy.stripe.com/test_payment_link";
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* Progress Bar Header */}
      <div className="bg-primary/5 px-8 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-heading font-bold text-foreground">Custom Order Request</h2>
          <button 
            onClick={saveForLater}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
        </div>

        <div className="relative flex justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 z-0"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          ></div>

          {STEPS.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  currentStep > step.id 
                    ? "bg-primary text-white" 
                    : currentStep === step.id 
                      ? "bg-[#D4AF37] text-white ring-4 ring-[#D4AF37]/20" 
                      : "bg-white border-2 border-border text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span className={`absolute top-10 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8 pt-12 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Event Basics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold mb-4">Tell us about your event</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="eventType">Event Type <span className="text-destructive">*</span></label>
                    <select 
                      id="eventType"
                      required
                      className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.eventType}
                      onChange={(e) => updateForm("eventType", e.target.value)}
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="eventDate">Event Date <span className="text-destructive">*</span></label>
                    <input 
                      id="eventDate"
                      type="date"
                      required
                      className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.date}
                      onChange={(e) => updateForm("date", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium">Estimated Servings</label>
                    <span className="text-2xl font-bold text-primary">{formData.servings}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="200" step="5"
                    className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    value={formData.servings}
                    onChange={(e) => updateForm("servings", parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 (Small gathering)</span>
                    <span>200+ (Large wedding)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Cake Preferences */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h3 className="text-xl font-heading font-bold mb-4">Flavor & Fillings</h3>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Cake Flavor</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Vanilla Bean", "Rich Chocolate", "Red Velvet", "Lemon Raspberry"].map(flavor => (
                      <div 
                        key={flavor}
                        onClick={() => updateForm("flavor", flavor)}
                        className={`p-4 border rounded-xl cursor-pointer text-center transition-all ${
                          formData.flavor === flavor 
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                            : "border-border hover:border-primary/50 bg-white"
                        }`}
                      >
                        <span className="font-medium text-sm">{flavor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Dietary Accommodations</label>
                  <div className="flex flex-wrap gap-3">
                    {["Gluten-Free", "Vegan", "Dairy-Free", "Nut-Free"].map(need => (
                      <div 
                        key={need}
                        onClick={() => toggleDietary(need)}
                        className={`px-4 py-2 border rounded-full cursor-pointer transition-all text-sm font-medium ${
                          formData.dietary.includes(need)
                            ? "bg-secondary text-secondary-foreground border-secondary"
                            : "border-border text-muted-foreground hover:border-secondary"
                        }`}
                      >
                        {need}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">* Additional fees may apply for special dietary requests.</p>
                </div>
              </div>
            )}

            {/* Step 3: Design Vision */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold mb-4">Your Vision</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Describe your dream cake</label>
                  <textarea 
                    rows={4}
                    className="w-full p-4 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                    placeholder="Theme, colors, special decorations, written message..."
                    value={formData.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Inspiration Photos (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer">
                    <UploadCloud className="w-10 h-10 mb-3 text-primary" />
                    <p className="text-sm font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold mb-4">Final Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">Full Name <span className="text-destructive">*</span></label>
                    <input 
                      id="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">Email Address <span className="text-destructive">*</span></label>
                    <input 
                      id="email"
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="phone">Phone Number <span className="text-destructive">*</span></label>
                    <input 
                      id="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Delivery Method</label>
                    <select 
                      className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      value={formData.deliveryMethod}
                      onChange={(e) => updateForm("deliveryMethod", e.target.value)}
                    >
                      <option value="pickup">Bakery Pickup</option>
                      <option value="delivery">Delivery (DFW Area)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg mt-6 flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">
                    By submitting this form, you will be redirected to pay a $50 non-refundable deposit to secure your date. Chamie will contact you within 24 hours to confirm details and provide the final quote.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="px-8 py-6 bg-muted/30 border-t border-border flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`${currentStep === 1 ? 'opacity-0' : 'opacity-100'} transition-opacity rounded-full px-6`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        {currentStep < STEPS.length ? (
          <Button 
            onClick={nextStep}
            className="bg-primary hover:bg-[#d69f9f] text-white rounded-full px-8 shadow-md"
          >
            Next Step <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="bg-[#D4AF37] hover:bg-[#b8952b] text-white rounded-full px-8 shadow-xl hover:scale-105 transition-all"
          >
            Submit & Pay Deposit
          </Button>
        )}
      </div>
    </div>
  );
}
