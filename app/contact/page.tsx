"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react"; // Or use a standard SVG if not using lucide
// Import the action at the top
import { handleContactForm } from "@/app/actions";

// ... inside your component


export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    try {
      // This sends the data to your Gmail and Supabase
      await handleContactForm(formData); 
      setIsSubmitted(true); // Shows the "Request Received" screen
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  }
};

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Valid email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl text-[#5A4A42] mb-4">Request Received</h1>
          <p className="text-[#7D6B64] mb-10 leading-relaxed">
            We will contact you shortly to confirm your <br /> message details.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", email: "", phone: "", message: "" });
            }}
            className="text-[#C4A052] uppercase tracking-widest text-xs font-bold hover:opacity-70 transition-opacity"
          >
            Send Another Message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl text-[#5A4A42] uppercase tracking-widest mb-4">Contact Us</h1>
          <div className="w-24 h-px bg-[#C4A052] mx-auto"></div>
        </div>

        <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-[#E8E1D7] flex flex-col md:flex-row">
          {/* Info Sidebar */}
          <div className="bg-[#7D6B64] p-12 text-[#FDFBF7] md:w-1/3">
            <h2 className="font-serif text-2xl mb-6 italic">Get in Touch</h2>
            <p className="text-sm leading-relaxed opacity-90 mb-8">
              Have questions about our rituals or want to discuss a personalized plan? Send us a message and we will get back to you shortly.
            </p>
            <div className="space-y-4 text-xs tracking-widest uppercase">
              <p className="text-[#C4A052]">Limerick, Ireland</p>
              <p>maisonceleste@outlook.ie</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="p-12 md:w-2/3 bg-[#FDFBF7]" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8">
              {/* Name Field */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#7D6B64] mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${errors.name ? 'border-red-400' : 'border-[#7D6B64]/30'} py-2 focus:outline-none focus:border-[#C4A052] transition-colors text-[#5A4A42]`}
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 italic tracking-wide">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email Field */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#7D6B64] mb-2">Email Address</label>
                  <input 
                    type="text" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-[#7D6B64]/30'} py-2 focus:outline-none focus:border-[#C4A052] transition-colors text-[#5A4A42]`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 italic tracking-wide">{errors.email}</p>}
                </div>
                {/* Phone Field */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#7D6B64] mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-400' : 'border-[#7D6B64]/30'} py-2 focus:outline-none focus:border-[#C4A052] transition-colors text-[#5A4A42]`}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 italic tracking-wide">{errors.phone}</p>}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#7D6B64] mb-2">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${errors.message ? 'border-red-400' : 'border-[#7D6B64]/30'} py-2 focus:outline-none focus:border-[#C4A052] transition-colors text-[#5A4A42] resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-[10px] mt-1 italic tracking-wide">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                className="mt-4 bg-[#7D6B64] text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#C4A052] transition-all self-start"
              >
                Send Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}