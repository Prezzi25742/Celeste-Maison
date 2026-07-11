"use client";

import React, { useState } from "react";

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
    title: "Back, Neck and Shoulders",
    prices: ["45 Mins — €65", "70 Mins — €110", "90 Mins — €130"],
    desc: "Experience the ultimate relief with our full personalized; Back, Neck and Shoulder Massage. Tailored 100% to your specific tensions, this deep-tissue treatment targets stubborn knots and releases accumulated stress. From the lower back to the base of the skull, every stroke is adapted to your body's unique needs. Restore your mobility and find instant calm in one powerful, focused session.",
  },
  {
    title: "Japanese Face Lift",
    prices: ["70 Mins — €110", "90 Mins — €130", "120 Mins — €170"],
    desc: "Experience the ultimate needle-free rejuvenation. This ancient Japanese technique naturally sculpt your contours, smoothes fine line and restores a radiant glow through deep-tissue massage. Achieve visible lifting and profound relaxation in one powerful, holistic treatment.",
  },
  {
    title: "Swedish Massage",
    prices: ["70 Mins — €110", "90 Mins — €130", "120 Mins — €170"],
    desc: "An iconic and refined treatment, combining long, flowing strokes with expert kneading and delicate friction. This ritual awakens the body, enchances circulation, and restores vitality. A perfect introduction to art of massage.",
  },
  {
    title: "Deep Tissue Massage",
    prices: ["70 Mins — €110", "90 Mins — €130", "120 Mins — €170"],
    desc: "A powerful and targeted technique designed to release deeply rooted tension. Through slow, precise and sustained presssure, it works into the deeper layers of muscle tissue, offering relief, recovery, and renewed mobility.",
  },
  {
    title: "Scalp Massage",
    prices: ["25 Mins — €25 ADD-ON ONLY"],
    desc: "Experience our Scalp Massage to instantly melt away any mental fatigue and leave you deeply recharged.",
  },
  {
    title: "Californian Massage",
    prices: ["70 Mins — €110", "90 Mins — €130", "120 Mins — €170"],
    desc: "Often described as a 'massage of the soul' this deeply enveloping ritual feature slow, graceful and continous movements and mind, inviting profound relaxation an emotional relaease.",
  },
  {
    title: "Oriental Massage",
    prices: ["70 Mins — €110", "90 Mins — €130", "120 Mins — €170"],
    desc: "Inspired by ancestral traditions, this holitic ritual blends rhythmic movements with precise pressure along the body's energy pathways. It rebalances the flo of energy, detoxifies the body, and restores inner harmony.",
  },
  {
    title: "Lymphatic Massage",
    prices: ["70 Mins — €110", "90 Mins — €130", "120 Mins — €170"],
    desc: "A gentle, rhythmic treatment designed to stimulate the lymphatic system and encourage the natural drainage of toxins. This soothing ritual reduces fluid retention, boosts the immune system, and leaves you feeling deeply cleansed, incredibly light, and completely revitalized.",
  },
  {
    title: "Duo Treatment Massage",
    prices: ["70 Mins — €210", "90 Mins — €270", "120 Mins — €360"],
    desc: "Escape the noise of the world and reconnect in a sanctuary designed for two. Side by side in our private couples suite, you and your companion will enjoy synchronized massages tailored to your individual needs. Soft lighting, calming aromatherapy, and the soothing rhythm of expert touch create a shared space of deep relaxation and harmony. Perfect for partners, best friends, or family looking to unwind together.",
  },
];

const steps = [
 
  {
    num: "01",
    heading: "Spa Selection",
    text: "Select your preferred therapy package. Our treatments are fully customizable to your relaxation needs.",
  },
  {
    num: "0",
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
    label: "Travel Radius:",
    text: "We service Limerick City, Castletroy, Adare, and surrounding suburbs. Minor travel fees may apply for remote rural holiday rentals.",
  },
  {
    label: "Parking:",
    text: "As we carry heavy, premium equipment, access to nearby or on-site parking at the property is greatly appreciated.",
  },
];

export default function App() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [bookHovered, setBookHovered] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: sans, WebkitFontSmoothing: "antialiased" }}>
      {/* ────────────────────────────────────────────────
         Section 1 · Hero
      ──────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: CREAM }}
        className="relative px-6 pt-20 pb-32 flex flex-col items-center text-center overflow-hidden"
      >
        {/* Wordmark */}
        <div className="flex flex-col items-center mb-16 select-none">
          <span
            className="text-[9px] tracking-[0.55em] uppercase font-medium"
            style={{ color: GOLD }}
          >
            Maison Celeste
          </span>
          <div className="mt-3 w-px h-10" style={{ backgroundColor: GOLD, opacity: 0.35 }} />
        </div>

        {/* Supra-label */}
        <p
          className="text-[10px] tracking-[0.38em] uppercase font-medium mb-5"
          style={{ color: GOLD }}
        >
          Elevate Your Stay in Limerick
        </p>

        {/* Display heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-9 max-w-3xl"
          style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
        >
          In-Room Spa Experiences
        </h1>

        {/* CTA */}
        <div className="flex justify-center mb-10">
         <a
  href="https://www.fresha.com/book-now/maison-celeste-xhfjvqzl/all-offer?share=true&pId=3036669" 
  target="_blank" 
  rel="noopener noreferrer"
  onMouseEnter={() => setCtaHovered(true)}
  onMouseLeave={() => setCtaHovered(false)}
  className="inline-block text-[10px] tracking-[0.3em] uppercase px-10 py-[14px] transition-all duration-300 cursor-pointer"
  style={{
    color: ctaHovered ? CREAM : BROWN,
    border: `1px solid ${BROWN}`,
    backgroundColor: ctaHovered ? BROWN : "transparent",
    fontWeight: 500,
  }}
>
  Book your Stay Spa
</a>
        </div>

        {/* Gold rule */}
        <div className="w-16 h-px mb-10" style={{ backgroundColor: GOLD }} />

        {/* Body copy */}
        <p
          className="max-w-[540px] text-[15px] leading-[1.95] font-light"
          style={{ color: BROWN, opacity: 0.78 }}
        >
          Turn your Airbnb, boutique stay, or holiday rental into a private wellness sanctuary.
          Whether you are visiting Limerick for a weekend getaway, a wedding celebration, or a
          relaxing staycation, Maison Celeste brings the ultimate 5-star spa ritual directly to
          your doorstep.
        </p>

        {/* Decorative corner marks */}
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
         Section 2 · How It Works
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
         Section 3 · Pricing
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
              {/* Title block */}
              <div className="md:col-span-4 mb-4 md:mb-0">
                <h3
                  className="text-2xl mb-3 leading-snug"
                  style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
                >
                  {pkg.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-5 mb-4 md:mb-0 flex items-center">
                <p
                  className="text-sm leading-[1.95] font-light"
                  style={{ color: BROWN, opacity: 0.68 }}
                >
                  {pkg.desc}
                </p>
              </div>

              {/* Pricing breakdown */}
              <div className="md:col-span-3 flex flex-col md:items-end md:justify-center mt-2 md:mt-0 space-y-2">
                {pkg.prices.map((price, idx) => (
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

          {/* closing rule */}
          <div style={{ borderTop: "1px solid rgba(41,21,7,0.13)" }} />
        </div>
      </section>

      {/* ────────────────────────────────────────────────
         Section 4 · Essential Details
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
         Section 5 · Final CTA Footer
      ──────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: CREAM }} className="px-6 py-24 text-center">
        <h2
          className="text-3xl md:text-4xl mb-10"
          style={{ color: BROWN, fontFamily: serif, fontWeight: 400 }}
        >
          Ready to Elevate Your Stay?
        </h2>
        <a
  href="https://www.fresha.com/book-now/maison-celeste-xhfjvqzl/all-offer?share=true&pId=3036669" 
  target="_blank" 
  rel="noopener noreferrer"
  onMouseEnter={() => setCtaHovered(true)}
  onMouseLeave={() => setCtaHovered(false)}
  className="inline-block text-[10px] tracking-[0.3em] uppercase px-10 py-[14px] transition-all duration-300 cursor-pointer"
  style={{
    color: ctaHovered ? CREAM : BROWN,
    border: `1px solid ${BROWN}`,
    backgroundColor: ctaHovered ? BROWN : "transparent",
    fontWeight: 500,
  }}
>
  Request a Booking
</a>
      </footer>
    </div>
  );
}