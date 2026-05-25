"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, AlertCircle } from "lucide-react"; 
import { handleBookingForm } from "@/app/actions"; 

interface BookingData {
  name: string;
  email: string;
  phone: string; 
  address: string;
  date: string;
  time: string;
  massage: string;
  duration: string;
  addon: string;
  people: string;
}

// 1. Define pricing structures
const BASE_PRICES: { [key: string]: number } = {
  "45": 80,   // Added 45 Mins (Price assumed as €80, adjust if needed)
  "70": 110,  
  "90": 130,  
  "120": 170, 
};

// Dedicated Duo pricing map
const DUO_PRICES: { [key: string]: number } = {
  "70": 210,
  "90": 270,
  "120": 360,
};

const ADDON_PRICE = 20; // €20 for the Scalp Massage

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "", 
    address: "",
    date: "",
    time: "",
    massage: "",
    duration: "",
    addon: "",
    people: "1",
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 2. Calculate dynamic price
  const calculateTotal = () => {
    const isDuo = formData.massage === "Duo Treatment Massage";
    const basePrice = isDuo 
      ? (DUO_PRICES[formData.duration] || 0) 
      : (BASE_PRICES[formData.duration] || 0);
      
    const addonPrice = formData.addon ? ADDON_PRICE : 0;
    const guests = parseInt(formData.people, 10) || 1;

    if (isDuo) {
      // Duo is a flat package for 2 people. If they select 4 people, it counts as 2 Duo packages.
      const multiplier = Math.max(1, Math.floor(guests / 2));
      return (basePrice + addonPrice) * multiplier;
    }

    return (basePrice + addonPrice) * guests;
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.duration) newErrors.duration = "Please select a duration";
    if (!formData.massage) newErrors.massage = "Please select a massage ritual";
    if (!formData.address) newErrors.address = "Service address is required";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time preference";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      try {
        const result = await handleBookingForm({
          ...formData,
        });

      if (result && result.success) {
        setIsSuccess(true);
        setFormData({ 
          name: "", email: "", phone: "", address: "", date: "",
          time: "", massage: "", duration: "", people: "1", addon: "" 
        });
      } else {
        alert("Booking failed: " + (result?.error || "Unknown error"));
      }
    } catch (error) { // Keep this one
      console.error("Submission error:", error);
      alert("A server error occurred.");
    } finally { // Keep this one
      setIsSubmitting(false);
    }
  }; // This closes your function
  // Handle duration changes to enforce ritual logic (45m or 120m)
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration = e.target.value;
    setFormData(prev => {
      let newMassage = prev.massage;
      
      // If 45 mins is picked, force ritual to Back, Neck and Shoulders
      if (newDuration === "45") {
        newMassage = "Back, Neck and Shoulders";
      } 
      // If 120 mins is picked and they currently have Back, Neck and Shoulders selected, clear it
      else if (newDuration === "120" && prev.massage === "Back, Neck and Shoulders") {
        newMassage = "";
      }
      // If changing away from a duration that supported Duo, and Duo was selected but new duration doesn't support it (e.g., 45m)
      else if (newDuration === "45" && prev.massage === "Duo Treatment Massage") {
        newMassage = "Back, Neck and Shoulders";
      }

      return { ...prev, duration: newDuration, massage: newMassage, addon: "" };
    });
  };

  // Handle ritual changes (auto-adjust guests to 2 for Duo)
  const handleMassageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev, 
      massage: val, 
      addon: "",
      people: val === "Duo Treatment Massage" ? "2" : prev.people 
    }));
  };

  const totalPrice = calculateTotal();

  return (
    <main className="min-h-screen bg-[#5A4A42] py-24 px-6 flex flex-col items-center justify-center font-sans selection:bg-[#C4A052] selection:text-white">
      <div className="max-w-4xl w-full mb-8">
        <Link href="/" className="text-[#C4A052] uppercase tracking-widest text-xs font-semibold hover:text-[#FDFBF7] transition-colors flex items-center gap-2 w-fit">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-[#5A4A42] p-10 text-[#FDFBF7] border-r border-[#C4A052]/20">
          <h1 className="text-3xl font-serif mb-6 uppercase tracking-widest text-[#C4A052]">Reserve</h1>
          
          <p className="text-sm font-light leading-relaxed mb-4 opacity-90">
            Our therapists bring the spa experience to your doorstep in Limerick.
          </p>
          
          {/* Newly added message section */}
          <div className="mb-8 p-4 bg-[#C4A052]/10 border border-[#C4A052]/20 rounded-sm">
            <p className="text-sm font-light leading-relaxed text-[#FDFBF7]">
              Mobile treatments within 10km. <br className="hidden lg:block md:hidden sm:block"/>
              <span className="text-[#C4A052] font-medium">Duo, Trio booking or more available up to 30km.</span>
            </p>
          </div>

          <div className="space-y-4 text-xs tracking-wider font-light">
            <p>Limerick, Ireland</p>
            <p>maisonceleste@outlook.ie</p>
          </div>
        </div>

        <div className="md:w-2/3 p-10 bg-[#FDFBF7]">
          {isSuccess ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4"><Check /></div>
              <h2 className="text-3xl font-serif text-[#5A4A42]">Request Received</h2>
              <p className="text-[#5A4A42]/70 max-w-sm">
                We will contact you shortly via email to confirm your ritual details. <br/><br/>
                <strong>Please check your email to enter your consultation form.</strong>
              </p>
              <button onClick={() => setIsSuccess(false)} className="mt-8 text-[#C4A052] uppercase tracking-widest text-xs font-semibold hover:opacity-70 transition-opacity">
                Book Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full border-b py-2 outline-none bg-transparent" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full border-b py-2 outline-none bg-transparent" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder="Phone Number" className="w-full border-b py-2 outline-none bg-transparent" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <input type="text" placeholder="Address (Eircode/Limerick)" className="w-full border-b py-2 outline-none bg-transparent" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>

              {/* Row 2: Phone and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Phone Number</label>
                  <input 
                    type="tel"
                    className={`w-full border-b ${errors.phone ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none transition-colors text-sm bg-transparent text-[#5A4A42]`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Duration</label>
                  <select 
                    className={`w-full border-b ${errors.duration ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
                    value={formData.duration}
                    onChange={handleDurationChange}
                  >
                    <option value="">Select Duration</option>
                    <option value="45">45 Minutes (€{BASE_PRICES["45"]})</option>
                    <option value="70">70 Minutes (€{BASE_PRICES["70"]})</option>
                    <option value="90">90 Minutes (€{BASE_PRICES["90"]})</option>
                    <option value="120">120 Minutes (€{BASE_PRICES["120"]})</option>
                  </select>
                  {errors.duration && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.duration}</p>}
                </div>
              </div>

              {/* Row 3: Ritual and Addon */}
              {formData.duration && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Choose Massage</label>
                    <select 
                      className={`w-full border-b ${errors.massage ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
                      value={formData.massage}
                      onChange={handleMassageChange}
                    >
                      {formData.duration === "45" ? (
                        <option value="Back, Neck and Shoulders">Back, Neck and Shoulders</option>
                      ) : (
                        <>
                          <option value="">Select Ritual...</option>
                          {formData.duration !== "120" && (
                            <option value="Back, Neck and Shoulders">Back, Neck and Shoulders</option>
                          )}
                          <option value="Japanese Face Lift">Japanese Face Lift</option>
                          <option value="Swedish Massage">Swedish Massage</option>
                          <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                          <option value="Californian Massage">Californian Massage</option>
                          <option value="Oriental Massage">Oriental Massage</option>
                          <option value="Lymphatic Massage">Lymphatic Massage</option>
                          <option value="Duo Treatment Massage">Duo Treatment Massage</option>
                        </>
                      )}
                    </select>
                    {errors.massage && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.massage}</p>}
                  </div>

                  {/* Addon */}
                  {formData.massage && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-[10px] uppercase tracking-widest text-[#C4A052] mb-2 font-semibold font-semibold">Enhance Ritual (+€{ADDON_PRICE})</label>
                      <select 
                        className="w-full border-b border-[#5A4A42]/20 py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer"
                        value={formData.addon}
                        onChange={(e) => setFormData({...formData, addon: e.target.value})}
                      >
                        <option value="">No Add-on needed</option>
                        <option value="Scalp Massage">Scalp Massage (+25 Mins)</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Row 4: Address */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Address</label>
                <input 
                  type="text"
                  placeholder="E.g., Eircode, Limerick"
                  className={`w-full border-b ${errors.address ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none transition-colors text-sm bg-transparent text-[#5A4A42] placeholder:text-[#5A4A42]/30`}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                {errors.address && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.address}</p>}
              </div>

              {/* Row 5: Date, Guests, Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-1 opacity-50">Select Date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]} 
                    className={`w-full border-b ${errors.date ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                  {errors.date && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.date}</p>}
                </div>
                
                <div>
                   <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-1 opacity-50">Guests</label>
                   <select className="w-full border-b py-2 outline-none bg-transparent cursor-pointer" value={formData.people} onChange={(e) => setFormData({...formData, people: e.target.value})}>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-1 opacity-50">Preference</label>
                  <select className="w-full border-b py-2 outline-none bg-transparent cursor-pointer" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}>
                    <option value="">Time...</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                  {errors.time && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.time}</p>}
                </div>
              </div>

              {/* 3. Dynamic Price Display Section */}
              {totalPrice > 0 && (
                <div className="mt-8 pt-4 border-t border-[#5A4A42]/10 flex justify-between items-center animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#5A4A42]/60 font-semibold">Estimated Total</h3>
                    <p className="text-[10px] text-[#5A4A42]/40 font-light mt-0.5">
                      {formData.massage === "Duo Treatment Massage" ? "Duo Booking" : `${formData.people} ${parseInt(formData.people) === 1 ? 'guest' : 'guests'}`} × {formData.duration} Mins {formData.addon && "+ add-on"}
                    </p>
                  </div>
                  <div className="text-2xl font-serif text-[#5A4A42] flex items-center gap-0.5">
                    <span className="text-lg font-sans text-[#C4A052] font-light">€</span>
                    {totalPrice}
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-[#C4A052] text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#5A4A42] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}