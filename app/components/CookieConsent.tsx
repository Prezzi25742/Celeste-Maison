"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-[#5A4A42] text-[#FDFBF7] p-6 shadow-2xl border border-[#C4A052]/30 rounded-sm">
        <h3 className="font-serif text-[#C4A052] uppercase tracking-widest text-sm mb-2">Cookie Policy</h3>
        <p className="text-xs font-light leading-relaxed mb-4 opacity-90">
          We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={acceptCookies}
            className="flex-1 bg-[#C4A052] text-white py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-[#FDFBF7] hover:text-[#5A4A42] transition-all"
          >
            Accept
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-1 border border-[#FDFBF7]/30 text-[#FDFBF7] py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}