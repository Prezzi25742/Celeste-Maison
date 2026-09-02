"use client";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from "react";
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
  addonCount: string;
  people: string;
}

const BASE_PRICES: { [key: string]: number } = {
  "30": 55,  
  "45": 69,  
  "70": 110,  
};

const ADDON_PRICE = 15;

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingData>({
    name: "", email: "", phone: "", address: "Mount Eagle",
    date: "", time: "", massage: "", duration: "",
    addon: "", addonCount: "1", people: "2",
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getMinGuests = (duration: string) => {
    if (duration === "30" || duration === "45") return 6;
    if (duration === "70") return 2;
    return 2;
  };

  const calculateTotal = () => {
    const basePrice = BASE_PRICES[formData.duration] || 0;
    const guests = parseInt(formData.people, 10) || 1;
    const addonGuests = formData.addon ? (parseInt(formData.addonCount, 10) || 0) : 0;

    return (basePrice * guests) + (ADDON_PRICE * addonGuests);
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
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time preference";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    
    if (validate()) {
      setIsSubmitting(true);
      try {
        const result = await handleBookingForm({
          ...formData,
          address: "Mount Eagle",
        });

        if (result && result.success) {
          setIsSuccess(true);
          setFormData({ 
            name: "", email: "", phone: "", address: "Mount Eagle", date: "",
            time: "", massage: "", duration: "", people: "2", addon: "", addonCount: "1" 
          });
        } else {
          setServerError(result?.error || "Unable to verify booking details. Please try again.");
        }
      } catch (error) { 
        console.error("Submission error:", error);
        setServerError("A server error occurred. Please try again later.");
      } finally { 
        setIsSubmitting(false);
      }
    }
  }; 

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration = e.target.value;
    const minGuests = getMinGuests(newDuration);

    setFormData(prev => {
      let newMassage = prev.massage;
      
      if (newDuration === "30") {
        newMassage = "Back, Neck & Shoulders";
      } else {
        newMassage = "";
      }

      const currentPeople = parseInt(prev.people, 10) || 1;
      const updatedPeople = currentPeople < minGuests ? minGuests.toString() : prev.people;

      return { 
        ...prev, 
        duration: newDuration, 
        massage: newMassage, 
        addon: "",
        addonCount: "1",
        people: updatedPeople 
      };
    });
  };

  const handleMassageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const isScalpIncluded = val === "Back & Scalp" || val === "Face & Scalp";

    setFormData(prev => ({
      ...prev, 
      massage: val, 
      addon: isScalpIncluded ? "" : prev.addon,
      addonCount: isScalpIncluded ? "0" : prev.addonCount
    }));
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeople = e.target.value;
    const newPeopleNum = parseInt(newPeople, 10) || 1;

    setFormData(prev => {
      const currentAddonCount = parseInt(prev.addonCount, 10) || 1;
      return {
        ...prev,
        people: newPeople,
        addonCount: currentAddonCount > newPeopleNum ? newPeople : prev.addonCount
      };
    });
  };

  const totalPrice = calculateTotal();
  const minGuests = getMinGuests(formData.duration);
  const totalGuests = parseInt(formData.people, 10) || minGuests;
  const isScalpIncluded = formData.massage === "Back & Scalp" || formData.massage === "Face & Scalp";

  return (
    <main className="min-h-screen bg-[#5A4A42] py-24 px-6 flex flex-col items-center justify-center font-sans selection:bg-[#C4A052] selection:text-white">
      <div className="max-w-4xl w-full mb-8">
        <Link href="/PatriotBar" className="text-[#C4A052] uppercase tracking-widest text-xs font-semibold hover:text-[#FDFBF7] transition-colors flex items-center gap-2 w-fit">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-[#5A4A42] p-10 text-[#FDFBF7] border-r border-[#C4A052]/20">
          <h1 className="text-3xl font-serif mb-6 uppercase tracking-widest text-[#C4A052]">Reserve</h1>
          
          <p className="text-sm font-light leading-relaxed mb-4 opacity-90">
            Our therapists bring the spa experience to the next level in Limerick.
          </p>
          
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
                <input type="text" placeholder="Full Name" className="w-full border-b py-2 outline-none bg-transparent text-[#5A4A42]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full border-b py-2 outline-none bg-transparent text-[#5A4A42]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-1 opacity-50">Location</label>
                  <input 
                    type="text" 
                    value="Sally Mount" 
                    disabled 
                    readOnly 
                    className="w-full border-b py-2 outline-none bg-transparent text-[#5A4A42]/40 cursor-not-allowed select-none font-medium" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Phone Number</label>
                  <PhoneInput
                    defaultCountry="IE" 
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(value) => setFormData({...formData, phone: value || ""})}
                    className={`w-full border-b ${errors.phone ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none transition-colors text-sm bg-transparent text-[#5A4A42]`}
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
                    <option value="30">The Essential Ritual - 30 Minutes (€{BASE_PRICES["30"]})</option>
                    <option value="45">The Reset - 45 Minutes (€{BASE_PRICES["45"]})</option>
                    <option value="70">The Ultimate Experience - 70 Minutes (€{BASE_PRICES["70"]})</option>
                  </select>
                  {errors.duration && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.duration}</p>}
                </div>
              </div>

              {formData.duration && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">
                      Choose Massage
                    </label>
                    <select
                      className={`w-full border-b ${errors.massage ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
                      value={formData.massage}
                      onChange={handleMassageChange}
                    >
                      {formData.duration === "30" ? (
                        <option value="Back, Neck & Shoulders">Back, Neck & Shoulders</option>
                      ) : formData.duration === "45" ? (
                        <>
                          <option value="">Select Ritual...</option>
                          <option value="Back & Scalp">Back & Scalp</option>
                          <option value="Back & Legs">Back & Legs</option>
                          <option value="Face & Scalp">Face & Scalp</option>
                        </>
                      ) : (
                        <>
                          <option value="">Select Ritual...</option>
                          <option value="Deep Tissue">Deep Tissue</option>
                          <option value="Swedish Massage">Swedish Massage</option>
                          <option value="Californian Massage">Californian Massage</option>
                          <option value="Oriental Massage">Oriental Massage</option>
                        </>
                      )}
                    </select>
                    {errors.massage && (
                      <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.massage}
                      </p>
                    )}
                  </div>

                  {formData.massage && !isScalpIncluded && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[#C4A052] mb-2 font-semibold">
                          Enhance Ritual (+€{ADDON_PRICE}/person)
                        </label>
                        <select
                          className="w-full border-b border-[#5A4A42]/20 py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer"
                          value={formData.addon}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({ 
                              ...formData, 
                              addon: value,
                              addonCount: value ? (formData.addonCount || "1") : "0"
                            });
                          }}
                        >
                          <option value="">No Add-on needed</option>
                          <option value="Scalp Massage">Scalp Massage (+10 Mins)</option>
                        </select>
                      </div>

                      {formData.addon && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">
                            Guests Receiving Scalp Add-on
                          </label>
                          <select
                            className="w-full border-b border-[#5A4A42]/20 py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer"
                            value={formData.addonCount}
                            onChange={(e) => setFormData({ ...formData, addonCount: e.target.value })}
                          >
                            {Array.from({ length: totalGuests }, (_, i) => i + 1).map((num) => (
                              <option key={num} value={num.toString()}>
                                {num} {num === 1 ? "Guest" : "Guests"} (+€{ADDON_PRICE * num})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

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
                  <select 
                    className="w-full border-b py-2 outline-none bg-transparent cursor-pointer text-[#5A4A42]" 
                    value={formData.people} 
                    onChange={handlePeopleChange}
                  >
                    {Array.from({ length: 30 - minGuests + 1 }, (_, i) => minGuests + i).map((num) => (
                      <option key={num} value={num}>
                        {num} People
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-1 opacity-50">Preference</label>
                  <select className="w-full border-b py-2 outline-none bg-transparent cursor-pointer text-[#5A4A42]" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}>
                    <option value="">Time...</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                  {errors.time && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.time}</p>}
                </div>
              </div>

              {totalPrice > 0 && (
                <div className="mt-8 pt-4 border-t border-[#5A4A42]/10 flex justify-between items-center animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#5A4A42]/60 font-semibold">Estimated Total</h3>
                    <p className="text-[10px] text-[#5A4A42]/40 font-light mt-0.5">
                      {formData.people} guests × {formData.duration} Mins
                      {formData.addon && parseInt(formData.addonCount, 10) > 0 && (
                        <> + {formData.addonCount} scalp massage{parseInt(formData.addonCount, 10) > 1 ? "s" : ""}</>
                      )}
                    </p>
                  </div>
                  <div className="text-2xl font-serif text-[#5A4A42] flex items-center gap-0.5">
                    <span className="text-lg font-sans text-[#C4A052] font-light">€</span>
                    {totalPrice}
                  </div>
                </div>
              )}

              {serverError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3 animate-in fade-in duration-300">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 leading-relaxed font-light">
                    {serverError}
                  </p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-[#6] bg-[#C4A052] text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#5A4A42] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Verifying Details..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}