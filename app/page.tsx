"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Info, Target, ChevronDown, ChevronUp, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * REUSABLE ANIMATION COMPONENT
 */
function FadeInSection({ children, delay = "0s", direction = "left" }: { children: React.ReactNode, delay?: string, direction?: "left" | "right" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${direction === "left" ? "-translate-x-12" : "translate-x-12"}`
      }`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    { name: "Lucy R", text: "Celeste was absolutely amazing, her massage was very relaxing.", rating: 5 },
    { name: "Brenda C", text: "Celeste was absolutely magnificent, I had one of the best massage I've never had and can't wait to go back.", rating: 5 },
    { name: "Keith M", text: "I got the Swedish massage, from start to finish it was a great massage.", rating: 5 },
  ];

  const aromatherapyData = [
    { title: "Peppermint", description: "Deeply calming and soothing, perfect for reducing anxiety.", image: "/images/Peppermint.png" },
    { title: "Ravintsara", description: "Clear your mind and breath with this refreshing, invigorating essence.", image: "/images/Ravintsara.png" },
    { title: "True Lavender", description: "Boost energy and focus while soothing tension headaches.", image: "/images/TrueLavender.png" },
    { title: "Ylang-Ylang", description: "Improve mental clarity and stimulate the senses.", image: "/images/YlangYlang.png" },
    { title: "Eucalyptus Radiata", description: "A unique citrus scent that balances both uplifting and calming properties.", image: "/images/Eucalyptus.png" },
    { title: "Helichrysum", description: "Cleanse your energy and brighten your mood with this fresh botanical.", image: "/images/Helichrysum.png" },
    { title: "Frankincense", description: "Promote relaxation and romantic harmony with this exotic floral note.", image: "/images/Frakincense.png" },
    { title: "Geranium Egypt", description: "Known for its purifying properties and ability to refresh.", image: "/images/GeraniumEgypt.png" },
    { title: "Palo Santo", description: "Ground yourself with this earthy, warm scent perfect for meditation.", image: "/images/PaloSanto.png" },
    { title: "SandalWood", description: "An ancient oil used to deepen the breath and quiet the mind.", image: "/images/SandalWood.png" },
    { title: "WinterGreen", description: "Gentle and peaceful, ideal for winding down after a long day.", image: "/images/WinterGreen.png" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === aromatherapyData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? aromatherapyData.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#C4A052] selection:text-white overflow-x-hidden">
      
      {/* INTRODUCTION SECTION */}
      <section className="bg-[#FDFBF7] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection delay="0.1s">
            <h1 className="text-4xl md:text-5xl font-serif text-[#5A4A42] mb-6">Welcome</h1>
          </FadeInSection>
          <FadeInSection delay="0.3s">
            <h2 className="text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#C4A052] font-semibold mb-8">
              Step into my world of Home spa Rituals
            </h2>
          </FadeInSection>
          <FadeInSection delay="0.5s">
            <div className="flex justify-center">
              <div className="w-24 h-[1px] bg-[#C4A052]/40" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="bg-white py-16 md:py-20 px-6 border-y border-[#C4A052]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-serif text-[#5A4A42] mb-6">The Benefits</h2>
            <p className="text-[#7D6B64] mb-6 leading-relaxed text-sm md:text-base">
              Massage therapy is an ancient practice used for thousands of years to harmonize the body and mind.
            </p>
            <ul className="grid grid-cols-1 gap-3 text-[#5A4A42] mb-8">
              {['High Blood Pressure', 'Reduce Stress and Anxiety', 'Chronic Back Pain'].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A052]" />
                  {benefit}
                </li>
              ))}
            </ul>
            {/* Expandable Content Tweak */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-4 pt-4 border-t border-[#FDFBF7] text-[#7D6B64] text-sm leading-relaxed">
                <p>Beyond physical relief, our therapies focus on holistic recovery.</p>
                <div className="grid grid-cols-1 gap-3 text-[#5A4A42]">
                  {['Help Manage Labor Pain', 'Decrease Symptoms of Arthritis', 'Treatment of Sports Injuries'].map((extra) => (
                    <li key={extra} className="flex items-center gap-3 text-sm list-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4A052]" />
                      {extra}
                    </li>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3 border border-[#5A4A42] text-[#5A4A42] uppercase tracking-widest text-xs hover:bg-[#5A4A42] hover:text-white transition-all"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </div>
          <div className="order-1 md:order-2 rounded-sm overflow-hidden shadow-xl">
            <img src="/images/spa-bg.jpg" alt="Maison Celeste" className="w-full h-64 md:h-[500px] object-cover" />
          </div>
        </div>
      </section>

     {/* THE MAISON CELESTE EXPERIENCE */}
<section className="bg-[#7D6B64] text-[#FDFBF7] py-20 md:py-32 px-6 relative overflow-hidden">
  
  {/* Elegant Flowing Lines Background - Matches the Testimonial screenshot */}
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
      <path d="M0,70 Q30,20 60,70 T100,70" fill="none" stroke="white" strokeWidth="0.3" />
      <path d="M-20,90 Q40,40 100,90" fill="none" stroke="white" strokeWidth="0.2" />
    </svg>
  </div>

  <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
    <h2 className="text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase mb-8 leading-tight">
      The Maison Celeste <br className="hidden md:block" /> Experience
    </h2>
    
    <div className="w-16 h-[1px] bg-[#C4A052] mb-10"></div>
    
    <p className="max-w-3xl text-base md:text-xl font-light leading-relaxed mb-16 md:mb-28 text-[#FDFBF7]/90 italic px-4">
      "We believe your home is the ultimate place for healing."
    </p>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full mb-16 md:mb-32">
  {[
    { title: 'At-Home Comfort', desc: 'No travel required. We transform your favorite room into a sanctuary.' },
    { title: 'Full Spa Setup', desc: 'From premium linens to professional tables, we provide it all.' },
    { title: 'Professional Expertise', desc: 'Licensed therapy tailored specifically to your body’s unique needs.' }
  ].map((feature, i) => (
    <div key={i} className="flex flex-col items-center px-4">
      {/* Title changed from text-xs to text-sm for better visibility */}
      <h3 className="text-sm font-serif uppercase tracking-[0.3em] text-[#C4A052] mb-6 text-center">
        {feature.title}
      </h3>
      
      {/* Description changed from text-xs to text-sm and opacity slightly increased for clarity */}
      <p className="text-sm font-light text-[#FDFBF7]/80 leading-relaxed max-w-[280px] text-center">
        {feature.desc}
      </p>
    </div>
  ))}
</div>
    
    <Link href="/booking" className="border border-[#C4A052] text-[#FDFBF7] px-12 py-4 uppercase tracking-widest text-xs font-medium hover:bg-[#C4A052] transition-all">
      Book Now
    </Link>
  </div>
</section>
  {/* ESSENTIAL OILS NARRATIVE SECTION */}
<section className="bg-white py-16 md:py-24 px-6 overflow-hidden">
  <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-20">
    
    {/* Section Header */}
    <div className="text-center mb-4">
      <FadeInSection delay="0.1s">
        <h3 className="text-3xl md:text-4xl font-serif text-black mb-4">
          What exactly are essential oils?
        </h3>
        <div className="w-12 h-[1px] bg-[#C4A052] mx-auto"></div>
      </FadeInSection>
    </div>

    {/* Narrative Cards - Using Flex for better alignment */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      
      {/* Liquid Gold Card */}
      <FadeInSection delay="0.2s" direction="left">
        <div className="h-full border border-[#5A4A42]/20 p-8 md:p-10 bg-[#FDFBF7]/50 rounded-sm shadow-sm flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-serif text-[#5A4A42] mb-4">A pure liquid gold</h3>
          <p className="text-[#7D6B64] font-light leading-relaxed">
            They are highly concentrated plant extracts into a single, powerful drop. 
            It's the <span className="italic">"soul"</span> or the essence of the plant.
          </p>
        </div>
      </FadeInSection>

      {/* Secret Card */}
      <FadeInSection delay="0.3s" direction="right">
        <div className="h-full border border-[#5A4A42]/20 p-8 md:p-10 bg-[#FDFBF7]/50 rounded-sm shadow-sm flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-serif text-[#5A4A42] mb-4">The secret to my massages?</h3>
          <p className="text-[#7D6B64] font-light leading-relaxed mb-6">
            I use premium essential oils to turn your home into a professional sanctuary. 
          </p>
          <span className="text-[#C4A052] font-medium tracking-[0.2em] uppercase text-[10px] border-t border-[#C4A052]/30 pt-4 self-start">
            Ready for some aromatherapy?
          </span>
        </div>
      </FadeInSection>
    </div>

    {/* Image & Certification Section */}
  <div className="pt-8 flex flex-col items-center">
      <FadeInSection delay="0.4s">
        {/* Increased max-w to 4xl and reduced padding to allow the logo to breathe */}
        <div className="w-full max-w-4xl aspect-[16/8] md:aspect-video bg-[#FDFBF7] rounded-sm relative overflow-hidden mb-8 shadow-md border border-[#C4A052]/20 p-2 md:p-4 flex items-center justify-center">
          <img 
            src="/images/HEBBD.png" 
            alt="Organic Essential Oils" 
            
            className="w-[85%] h-[85%] object-contain grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </FadeInSection>
      
      <FadeInSection delay="0.5s">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C4A052] font-semibold text-center">
          Selection of Organic & HEBBD Certified Oils
        </p>
      </FadeInSection>
    </div>

  </div>
</section>
     {/* AROMATHERAPY RITUALS SLIDER */}
<section className="bg-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
  
  {/* Corrected Flowing Background - Large, soft waves like the screenshot */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
    <svg 
      viewBox="0 0 1440 800" 
      className="w-full h-full preserve-3d" 
      preserveAspectRatio="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,160 C320,300 420,0 800,100 C1180,200 1250,500 1440,400 V800 H0 Z" 
        fill="none" 
        stroke="#C4A052" 
        strokeWidth="2"
      />
      <path 
        d="M0,400 C400,600 800,200 1440,500" 
        fill="none" 
        stroke="#C4A052" 
        strokeWidth="1"
      />
      <path 
        d="M-200,200 C200,400 1000,0 1600,300" 
        fill="none" 
        stroke="#C4A052" 
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  </div>

  <div className="max-w-5xl mx-auto relative z-10">
    <div className="text-center mb-12">
      <h2 className="text-xs uppercase tracking-[0.3em] text-[#C4A052] font-semibold mb-3">Botanical Essence</h2>
      <p className="text-2xl md:text-3xl font-serif text-[#5A4A42]">Aromatherapy Rituals</p>
    </div>

    <div className="relative bg-[#FDFBF7] shadow-xl overflow-hidden border border-[#C4A052]/10 rounded-sm">
      <div className="flex flex-col md:flex-row">
        
        {/* Left Side: Images (Fading Transition) */}
        <div className="md:w-1/2 relative h-72 md:h-[500px] bg-[#E8E1D7]/30">
          {aromatherapyData.map((oil, index) => (
            <img 
              key={index} 
              src={oil.image} 
              alt={oil.title}
              className={`absolute inset-0 w-full h-full object-contain p-12 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`} 
            />
          ))}
        </div>

        {/* Right Side: Text Content (Synchronized Slide + Fade) */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative min-h-[400px] bg-[#FDFBF7]">
          <div className="relative h-full flex flex-col justify-center">
            {aromatherapyData.map((oil, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 delay-100 ease-in-out ${
                  index === currentSlide 
                    ? "opacity-100 translate-y-0 relative z-10" 
                    : "opacity-0 translate-y-8 absolute inset-0 pointer-events-none"
                }`}
              >
                <span className="text-[10px] text-[#C4A052] uppercase tracking-[0.2em] mb-4 block font-semibold">
                  Oil {index + 1} of {aromatherapyData.length}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-[#5A4A42] mb-6 leading-tight">
                  {oil.title}
                </h3>
                <p className="text-[#7D6B64] text-base font-light italic leading-relaxed">
                  "{oil.description}"
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-6 mt-12 relative z-20">
            <button 
              onClick={prevSlide} 
              className="group p-4 border border-[#5A4A42]/20 rounded-full hover:bg-[#5A4A42] transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-white transition-colors"/>
            </button>
            <button 
              onClick={nextSlide} 
              className="group p-4 border border-[#5A4A42]/20 rounded-full hover:bg-[#5A4A42] transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-white transition-colors"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* TESTIMONIALS */}
<section className="bg-[#7D6B64] py-20 px-6 relative overflow-hidden">
  
  {/* Flowing Lines Background */}
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="none">
      <path d="M0,160 C320,300 420,0 800,100 C1180,200 1250,500 1440,400" fill="none" stroke="white" strokeWidth="1" />
      <path d="M0,400 C400,600 800,200 1440,500" fill="none" stroke="white" strokeWidth="0.5" />
    </svg>
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <FadeInSection>
      <h2 className="text-3xl font-serif text-[#FDFBF7] mb-12 text-center md:text-left tracking-wide">
        From our guests
      </h2>
    </FadeInSection>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((item, i) => (
        <FadeInSection 
          key={i} 
          delay={`${0.1 + i * 0.1}s`} // Staggers the entrance: 0.1s, 0.2s, 0.3s
          direction="up"
        >
          <div className="h-full bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-sm text-center border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 group">
            <div className="flex justify-center gap-1 mb-4 text-[#C4A052] group-hover:scale-110 transition-transform duration-500">
              ★★★★★
            </div>
            <p className="text-[#FDFBF7] font-light text-sm italic mb-6 leading-relaxed">
              "{item.text}"
            </p>
            <div className="w-8 h-[1px] bg-[#C4A052]/50 mx-auto mb-4"></div>
            <span className="text-[#C4A052] text-[10px] uppercase tracking-[0.3em] font-semibold">
              {item.name}
            </span>
          </div>
        </FadeInSection>
      ))}
    </div>
  </div>
</section>

    {/* THE SANCTUARY NAVIGATION */}
<section className="bg-[#7D6B64] py-20 px-6 border-t border-white/5 relative overflow-hidden">
  
  {/* Flowing Lines Background */}
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="none">
      <path d="M-100,600 C200,400 800,800 1500,500" fill="none" stroke="white" strokeWidth="1" />
      <path d="M0,200 C400,0 1000,400 1440,100" fill="none" stroke="white" strokeWidth="0.5" />
    </svg>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <h2 className="text-3xl md:text-5xl font-serif text-center text-[#FDFBF7] mb-16 uppercase tracking-[0.25em]">The Sanctuary</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "Services", href: "/services", img: "/images/BackMassage.jpg" }, 
        { name: "Booking", href: "/booking", img: "/images/BookMassage.jpg" }, 
        { name: "Contact", href: "/contact", img: "/images/ContactMassage.jpg" }
      ].map((opt) => (
        <Link href={opt.href} key={opt.name} className="group relative aspect-[4/5] overflow-hidden block rounded-sm shadow-2xl">
          {/* Image Layer */}
          <img 
            src={opt.img} 
            alt={opt.name}
            className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-[#7D6B64]/30 transition-colors duration-700" />
          
          {/* Decorative Border and Text */}
          <div className="absolute inset-0 flex items-center justify-center m-6 border border-white/20 group-hover:border-white/50 transition-all duration-700">
            <h3 className="text-white text-xl md:text-2xl font-serif tracking-[0.3em] uppercase">{opt.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}