"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const BROWN = "#291507";
const CREAM = "#F5F1E8";
const GOLD = "#C8A96E";
const WHITE = "#FAFAF5";

const waveSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='100'><path d='M0 50 Q100 20 200 50 T400 50 T600 50 T800 50' stroke='%23C8A96E' stroke-width='0.7' fill='none' opacity='0.15'/><path d='M0 68 Q100 38 200 68 T400 68 T600 68 T800 68' stroke='%23C8A96E' stroke-width='0.4' fill='none' opacity='0.08'/><path d='M0 32 Q100 10 200 32 T400 32 T600 32 T800 32' stroke='%23C8A96E' stroke-width='0.3' fill='none' opacity='0.08'/></svg>`;
const wavePattern = `url("data:image/svg+xml,${encodeURIComponent(waveSvg)}")`;

const serif = "'DM Serif Display', Georgia, serif";
const sans = "'Raleway', system-ui, sans-serif";

const packages = [
  {
    title: "The Essential Ritual",
    prices: ["€55 - per person"],
    desc: "30-minute hands-on treatment, perfect for larger groups. Designed for groups of 6 guests or more.",
  },
  {
    title: "The Reset",
    prices: ["€69 - per person"],
    desc: "45-minute treatment with your choice of: Back & Scalp, Back & Legs, Face & Scalp. Designed for groups of 6 guests or more.",
  },
  {
    title: "The Ultimate Ritual",
    prices: ["€110 - per person"],
    desc: "70-minute Bespoke Full-Body Massage. A fully personalized massage, intuitvely designed around your body's needs on the day. Your therapist will combine dofferent techniques tailored specifically to you. Designed for groups of 2 guests or more.",
  },
];

const steps = [
  {
    num: "01",
    heading: "Spa Selection",
    text: "Select your preferred therapy package. Our treatments are fully customizable to your relaxation needs.",
  },
  {
    num: "02",
    heading: "We Handle the Rest",
    text: "We bring everything—a heated premium table, luxury fresh linens, organic oils, and ambient music.",
  },
];

const details = [
  {
    label: "Space Requirements:",
    text: "Please ensure the accommodation has enough clear floor space for a standard massage table (2m × 1m) and room to move around it.",
  },
  {
    label: "Parking:",
    text: "As we carry heavy, premium equipment, access to nearby or on-site parking at the property is greatly appreciated.",
  },
];


const sliderImages = [
  "/images/OilTray1.jpg",
  "/images/Photoshoot2.jpg",
  "/images/PhotoShoot3.jpg",
  "/images/OilTray2.jpg",
  "/images/OilTray3.jpg",
];



export default function App() {
  const [heroCtaHovered, setHeroCtaHovered] = useState(false);
  const [footerCtaHovered, setFooterCtaHovered] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div style={{ fontFamily: sans, WebkitFontSmoothing: "antialiased" }}>
      {/* ────────────────────────────────────────────────
          Section 1 · Hero
      ──────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: CREAM }}
        className="relative px-6 pt-20 pb-32 flex flex-col items-center text-center overflow-hidden"
      >
        <div className="flex flex-col items-center mb-16 select-none">
          <span
            className="text-[9px] tracking-[0.55em] uppercase font-medium"
            style={{ color: GOLD }}
          >
            Maison Celeste
          </span>
          <div className="mt-3 w-px h-10" style={{ backgroundColor: GOLD, opacity: 0.35 }} />
        </div>

        <p
          className="text-[10px] tracking-[0.38em] uppercase font-medium mb-5"
          style={{ color: GOLD }}
        >
          Elevate Your Stay in Limerick
        </p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-9 max-w-3xl"
          style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
        >
          In-Room Spa Experiences
        </h1>

        <div className="flex justify-center mb-10">
          <a
             href="MountEagle/booking"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHeroCtaHovered(true)}
            onMouseLeave={() => setHeroCtaHovered(false)}
            className="inline-block text-[10px] tracking-[0.3em] uppercase px-10 py-[14px] transition-all duration-300 cursor-pointer"
            style={{
              color: heroCtaHovered ? CREAM : BROWN,
              border: `1px solid ${BROWN}`,
              backgroundColor: heroCtaHovered ? BROWN : "transparent",
              fontWeight: 500,
            }}
          >
            Book your Stay Spa
          </a>
        </div>

        <div className="w-16 h-px mb-10" style={{ backgroundColor: GOLD }} />

        <p
          className="max-w-[540px] text-[15px] leading-[1.95] font-light"
          style={{ color: BROWN, opacity: 0.78 }}
        >
          Your Moment of Relaxation.
          <br /><br />
          Take a little time for yourself during your stay at Mount Eagle.
          <br /><br />
          Enjoy a professional massage in the comfort and privacy of your accommodation, tailored to help you relax, release tension and recharge.
        </p>

        <span
          className="absolute top-8 left-8 text-[10px] tracking-widest uppercase hidden md:block"
          style={{ color: GOLD, opacity: 0.4 }}
        >
          Est. Limerick
        </span>
        <span
          className="absolute top-8 right-8 text-[10px] tracking-widest uppercase hidden md:block"
          style={{ color: GOLD, opacity: 0.4 }}
        >
          Private Wellness
        </span>
      </section>

      {/* ────────────────────────────────────────────────
    Section 2 · Image Slider
──────────────────────────────────────────────── */}
<section style={{ backgroundColor: BROWN }} className="py-16 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center">
    
    {/* Left Side: Thumbnail Column (Scrollbar Hidden) */}
    <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[450px] w-full md:w-auto justify-center md:justify-start flex-shrink-0 z-10 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {sliderImages.map((img, idx) => {
        const isActive = currentSlide === idx;
        return (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden transition-all duration-300 p-[2px] cursor-pointer ${
              isActive ? "scale-105 opacity-100" : "opacity-50 hover:opacity-90"
            }`}
            style={{
              border: `1px solid ${isActive ? GOLD : "rgba(200, 169, 110, 0.2)"}`,
              boxShadow: isActive ? `0 0 10px ${GOLD}40` : "none",
            }}
            aria-label={`Select slide ${idx + 1}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        );
      })}
    </div>

    {/* Main Hero Slider Container with Fancy Gold Frame */}
    <div className="relative flex-1 w-full group">
      {/* Outer Fancy Gold Border Frame */}
      <div 
        className="relative p-1.5 rounded-sm transition-all duration-300"
        style={{ border: `1px solid ${GOLD}` }}
      >
        <div 
          className="relative overflow-hidden w-full aspect-[16/9] md:aspect-[21/9] bg-[#1a0e05]"
          style={{ border: `1px solid ${GOLD}80` }}
        >
          {/* Sliding Track (Horizontal Sliding Transition) */}
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(img)}
                className="w-full h-full flex-shrink-0 relative overflow-hidden cursor-pointer group/img"
              >
                <img
                  src={img}
                  alt={`Spa view ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 transition-all opacity-0 group-hover:opacity-100 z-10"
            style={{ border: `1px solid ${GOLD}60` }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: CREAM }} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 transition-all opacity-0 group-hover:opacity-100 z-10"
            style={{ border: `1px solid ${GOLD}60` }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" style={{ color: CREAM }} />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide 
                    ? "bg-[#C8A96E] w-6 h-1.5" 
                    : "bg-[#C8A96E]/30 w-1.5 h-1.5 hover:bg-[#C8A96E]/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Full-Screen Lightbox Modal */}
  {lightboxImage && (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 transition-opacity duration-300"
      onClick={() => setLightboxImage(null)}
    >
      <button
        onClick={() => setLightboxImage(null)}
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
        aria-label="Close preview"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-5xl max-h-[90vh] p-1 bg-[#1a0e05]"
        style={{ border: `1px solid ${GOLD}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={lightboxImage}
          alt="Full size preview"
          className="max-w-full max-h-[85vh] object-contain block mx-auto"
        />
      </div>
    </div>
  )}
</section>

      {/* ────────────────────────────────────────────────
          Section 3 · How It Works
      ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#7D6B64',
          backgroundImage: wavePattern,
          backgroundSize: "800px 100px",
          backgroundRepeat: "repeat",
        }}
        className="px-6 py-28"
      >
        <h2
          className="text-center text-3xl md:text-4xl mb-20 tracking-[0.12em]"
          style={{ color: WHITE, fontFamily: serif, fontWeight: 400 }}
        >
          How It Works for Guests
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col space-y-6">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={s.num}
                className="flex flex-col border border-opacity-20 transition-all duration-500 cursor-pointer"
                style={{
                  borderColor: GOLD,
                  backgroundColor: isActive ? "rgba(200, 169, 110, 0.05)" : "transparent",
                }}
                onClick={() => setActiveStep(isActive ? null : idx)}
              >
                <div className="flex items-center justify-between p-6 md:p-8">
                  <div className="flex items-center space-x-6">
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: GOLD, opacity: 0.7 }}
                    >
                      {s.num}
                    </span>
                    <h3
                      className="text-sm md:text-base tracking-[0.2em] uppercase font-medium"
                      style={{ color: WHITE }}
                    >
                      {s.heading}
                    </h3>
                  </div>
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <div
                      className="absolute w-full h-px transition-all duration-300"
                      style={{
                        backgroundColor: GOLD,
                        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                    <div
                      className="absolute w-px h-full transition-all duration-300"
                      style={{
                        backgroundColor: GOLD,
                        transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                        opacity: isActive ? 0 : 1,
                      }}
                    />
                  </div>
                </div>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out px-6 md:px-8"
                  style={{ maxHeight: isActive ? "200px" : "0px", opacity: isActive ? 1 : 0 }}
                >
                  <p
                    className="text-sm leading-[1.9] font-light pb-8 pl-12"
                    style={{ color: "rgba(250,250,245,0.7)" }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          Section 4 · Pricing
      ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM }} className="px-6 py-28">
        <h2
          className="text-center text-3xl md:text-4xl mb-24 tracking-[0.12em]"
          style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
        >
          The Stay Rituals
        </h2>

        <div className="max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="py-10 md:grid md:grid-cols-12 gap-8 items-start transition-opacity duration-200 hover:opacity-100 opacity-90"
              style={{ borderTop: "1px solid rgba(41,21,7,0.13)" }}
            >
              <div className="md:col-span-4 mb-4 md:mb-0">
                <h3
                  className="text-2xl mb-3 leading-snug"
                  style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
                >
                  {pkg.title}
                </h3>
              </div>

              <div className="md:col-span-5 mb-4 md:mb-0 flex items-center">
                <p
                  className="text-sm leading-[1.95] font-light"
                  style={{ color: BROWN, opacity: 0.68 }}
                >
                  {pkg.desc}
                </p>
              </div>

              <div className="md:col-span-3 flex flex-col md:items-end md:justify-center mt-2 md:mt-0 space-y-2">
                {pkg.prices?.map((price, idx) => (
                  <p
                    key={idx}
                    className="text-[11px] tracking-[0.15em] uppercase font-medium"
                    style={{ color: GOLD }}
                  >
                    {price}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="py-6 text-center text-xs tracking-wider uppercase font-light" style={{ borderTop: "1px solid rgba(41,21,7,0.13)", color: BROWN, opacity: 0.7 }}>
            All treatments are provided in the comfort of Mount Eagle.
          </div>

          <div style={{ borderTop: "1px solid rgba(41,21,7,0.13)" }} />
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          Section 5 · Essential Details
      ──────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#7D6B64',
          backgroundImage: wavePattern,
          backgroundSize: "800px 100px",
          backgroundRepeat: "repeat",
        }}
        className="px-6 py-28"
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-center mb-20 tracking-[0.12em]"
            style={{ color: WHITE, fontFamily: serif, fontWeight: 400 }}
          >
            Essential Details
          </h2>

          <div className="space-y-10">
            {details.map((item, i) => (
              <div
                key={i}
                className="pl-7 py-1"
                style={{ borderLeft: `1px solid ${GOLD}` }}
              >
                <h3
                  className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3"
                  style={{ color: GOLD }}
                >
                  {item.label}
                </h3>
                <p
                  className="text-[15px] leading-[1.9] font-light"
                  style={{ color: "rgba(250,250,245,0.75)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          Section 6 · Final CTA Footer
      ──────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: CREAM }} className="px-6 py-24 text-center">
        <h2
          className="text-3xl md:text-4xl mb-10"
          style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
        >
          Ready to Elevate Your Stay?
        </h2>
        <a
          href="MountEagle/booking"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setFooterCtaHovered(true)}
          onMouseLeave={() => setFooterCtaHovered(false)}
          className="inline-block text-[10px] tracking-[0.3em] uppercase px-10 py-[14px] transition-all duration-300 cursor-pointer"
          style={{
            color: footerCtaHovered ? CREAM : BROWN,
            border: `1px solid ${BROWN}`,
            backgroundColor: footerCtaHovered ? BROWN : "transparent",
            fontWeight: 500,
          }}
        >
          Request a Booking
        </a>
      </footer>
    </div>
  );
}