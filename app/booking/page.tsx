"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, AlertCircle } from "lucide-react"; 
import { handleBookingForm } from "@/app/actions"; 

// 1. THIS IS THE MISSING PIECE: Define the structure of your form data
interface BookingData {
  name: string;
  email: string;
  address: string;
  date: string;
  time: string;
  massage: string;
  addon: string;
  people: string;
}

export default function BookingPage() {
  // 2. State now knows exactly what fields to expect
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    address: "",
    date: "",
    time: "",
    massage: "",
    addon: "",
    people: "1",
  });
  const today = new Date().toISOString().split('T')[0];
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.massage) newErrors.massage = "Please select a massage ritual";
    if (!formData.address) newErrors.address = "Service address is required";
    if (!formData.date) newErrors.date = "Please select a date";
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
        const result = await handleBookingForm(formData);

        if (result && result.success) {
          // Send Email
          await fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          setIsSuccess(true);
          setFormData({ 
            name: "", email: "", address: "", date: "", 
            time: "", massage: "", people: "1", addon: "" 
          });
        } else {
          alert("Booking failed: " + (result?.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("A server error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <main className="min-h-screen bg-[#5A4A42] py-24 px-6 flex flex-col items-center justify-center font-sans selection:bg-[#C4A052] selection:text-white">
      
      {/* Back Navigation */}
      <div className="max-w-4xl w-full mb-8">
        <Link 
          href="/" 
          className="text-[#C4A052] uppercase tracking-widest text-xs font-semibold hover:text-[#FDFBF7] transition-colors flex items-center gap-2 w-fit"
        >
          ← Back to Home
        </Link>
      </div>

      {/* BOOKING CARD */}
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Info */}
        <div className="md:w-1/3 bg-[#5A4A42] p-10 text-[#FDFBF7] border-r border-[#C4A052]/20">
          <h1 className="text-3xl font-serif mb-6 uppercase tracking-widest text-[#C4A052]">Reserve</h1>
          <p className="text-sm font-light leading-relaxed mb-8 opacity-90">
            Our therapists bring the spa experience to your doorstep in Limerick.
          </p>
          <div className="space-y-4 text-xs tracking-wider font-light">
            <p className="flex items-center gap-3"> Limerick, Ireland</p>
            <p className="flex items-center gap-3"> maisonceleste@outlook.ie</p>
            <p className="flex items-center gap-3"> 7:00 AM – 11:00 PM</p>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="md:w-2/3 p-10 bg-[#FDFBF7]">
          {isSuccess ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-serif text-[#5A4A42]">Request Received</h2>
              <p className="text-[#5A4A42]/70 max-w-sm">We will contact you shortly to confirm your appointment details.</p>
              <button onClick={() => setIsSuccess(false)} className="mt-8 text-[#C4A052] uppercase tracking-widest text-xs font-semibold hover:opacity-70 transition-opacity">
                Book Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Full Name</label>
                  <input 
                    type="text"
                    className={`w-full border-b ${errors.name ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none transition-colors text-sm bg-transparent text-[#5A4A42]`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Email Address</label>
                  <input 
                    type="email"
                    className={`w-full border-b ${errors.email ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none transition-colors text-sm bg-transparent text-[#5A4A42]`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
                </div>
              </div>

              {/* Massage Selection & Conditional Add-on Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Choose Massage</label>
                  <select 
                    className={`w-full border-b ${errors.massage ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
                    value={formData.massage}
                    onChange={(e) => {
                      setFormData({...formData, massage: e.target.value});
                      if (e.target.value === "") {
                        setFormData(prev => ({...prev, massage: "", addon: ""}));
                      }
                    }}
                  >
                    <option value="">Select Ritual...</option>
                    <option value="Back, Neck and Shoulders">Back, Neck and Shoulders</option>
                    <option value="Japanese Face Lift">Japanese Face Lift</option>
                    <option value="Swedish Massage">Swedish Massage</option>
                    <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                    <option value="Californian Massage">Californian Massage</option>
                    <option value="Oriental Massage">Oriental Massage</option>
                    <option value="Oriental Massage">Lymphatic Massage</option>
                  </select>
                  {errors.massage && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.massage}</p>}
                </div>
                
                {formData.massage && (
                  <div className="transition-all duration-500 ease-in-out opacity-100">
                    <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold text-[#C4A052]">Enhance Ritual (Optional)</label>
                    <select 
                      className="w-full border-b border-[#5A4A42]/20 py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer"
                      value={formData.addon}
                      onChange={(e) => setFormData({...formData, addon: e.target.value})}
                    >
                      <option value="">No Add-on needed</option>
                      <option value="Scalp Massage">Scalp Massage (+30 Mins)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Address</label>
                <input 
                  type="text"
                  placeholder="E.g., Eircode XXXX, Limerick"
                  className={`w-full border-b ${errors.address ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none transition-colors text-sm bg-transparent text-[#5A4A42] placeholder:text-[#5A4A42]/30`}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                {errors.address && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.address}</p>}
              </div>

              {/* Date & Time Row */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>
    <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">
      Date
    </label>
    <input 
      type="date"
      /* min={today} prevents them from picking a past date in the calendar */
      min={new Date().toISOString().split('T')[0]} 
      className={`w-full border-b ${errors.date ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
      value={formData.date}
      onChange={(e) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().split('T')[0];
        
        // Manual validation check
        if (selectedDate < today) {
          setErrors({ ...errors, date: "Please select a future date" });
        } else {
          const newErrors = { ...errors };
          delete newErrors.date;
          setErrors(newErrors);
        }
        
        setFormData({...formData, date: selectedDate});
      }}
    />
    {/* Error Message Display */}
    {errors.date && (
      <p className="text-red-400 text-[10px] mt-1 uppercase tracking-tighter">
        {errors.date}
      </p>
    )}
  </div>


  <div>
    <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Guests</label>
    <select 
      className="w-full border-b border-[#5A4A42]/20 py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer"
      value={formData.people}
      onChange={(e) => setFormData({...formData, people: e.target.value})}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num} {num === 1 ? 'Person' : 'People'}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-2 font-semibold">Time</label>
    <select 
      className={`w-full border-b ${errors.time ? 'border-red-400' : 'border-[#5A4A42]/20'} py-2 focus:border-[#C4A052] outline-none text-sm bg-transparent text-[#5A4A42] cursor-pointer`}
      value={formData.time}
      onChange={(e) => setFormData({...formData, time: e.target.value})}
    >
      <option value="">Select Time</option>
      <option value="morning">Morning (7am - 12pm)</option>
      <option value="afternoon">Afternoon (12pm - 5pm)</option>
      <option value="evening">Evening (5pm - 11pm)</option>
    </select>
  </div>
</div>

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