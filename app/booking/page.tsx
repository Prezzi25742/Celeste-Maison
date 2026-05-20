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
  addon: string;
  people: string;
}

export default function BookingPage() {
  // Calculate minimum date (tomorrow) to prevent early/past bookings
  const minDate = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "", 
    address: "",
    date: "",
    time: "",
    massage: "",
    addon: "",
    people: "1",
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.massage) newErrors.massage = "Please select a ritual";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await handleBookingForm(formData);
      if (result?.success) {
        setIsSuccess(true);
        setFormData({ 
          name: "", email: "", phone: "", address: "", date: "",
          time: "", massage: "", people: "1", addon: "" 
        });
      } else {
        alert("Error: " + (result?.error || "Submission failed"));
      }
    } catch (error) {
      alert("A server error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p className="text-sm font-light leading-relaxed mb-8 opacity-90">Our therapists bring the spa experience to your doorstep in Limerick.</p>
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
              <button onClick={() => setIsSuccess(false)} className="mt-8 text-[#C4A052] uppercase tracking-widest text-xs font-semibold">Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full border-b py-2 outline-none bg-transparent" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full border-b py-2 outline-none bg-transparent" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="tel" placeholder="Phone Number" className="w-full border-b py-2 outline-none bg-transparent" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <input type="text" placeholder="Address (Eircode/Limerick)" className="w-full border-b py-2 outline-none bg-transparent" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select className="w-full border-b py-2 outline-none bg-transparent cursor-pointer" value={formData.massage} onChange={(e) => setFormData({...formData, massage: e.target.value, addon: ""})}>
                  <option value="">Select Ritual...</option>
                  <option value="Swedish Massage">Swedish Massage</option>
                  <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                  <option value="Japanese Face Lift">Japanese Face Lift</option>
                  <option value="Back, Neck and Shoulders">Back, Neck and Shoulders</option>
                  <option value="Californian Massage">Californian Massage</option>
                  <option value="Oriental Massage">Oriental Massage</option>
                  <option value="Lymphatic Massage">Lymphatic Massage</option>
                </select>
                
                <select className="w-full border-b py-2 outline-none bg-transparent cursor-pointer" value={formData.addon} onChange={(e) => setFormData({...formData, addon: e.target.value})}>
                  <option value="">No Add-on</option>
                  <option value="Scalp Massage">Scalp Massage (+20 Mins)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#5A4A42] mb-1 opacity-50">Select Date</label>
                  <input 
                    type="date" 
                    min={minDate} 
                    className="w-full border-b py-2 outline-none bg-transparent cursor-pointer" 
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  />
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
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#C4A052] text-white py-4 uppercase tracking-widest text-xs font-semibold disabled:opacity-50 transition-colors hover:bg-[#5A4A42]">
                {isSubmitting ? "Processing..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
