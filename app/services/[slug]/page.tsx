"use client";

import { useState, use } from "react";
import Link from 'next/link';
import { ChevronLeft, Clock, Info } from 'lucide-react';

// Next.js 15+ requires params to be unwrapped with React.use() in Client Components
export default function RitualTemplate({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [showModal, setShowModal] = useState(false);

  const RitualDetails: Record<string, any> = {
    "back-neck-shoulders": {
      title: "Back, Neck and Shoulders",
      duration: "45 Mins — €65",
      durationTwo: "70 Mins — €110",
    durationThree: "90 Mins — €130",
    
      description: "Experience the ultimate relief with our full personalized; Back, Neck and Shoulder Massage. Tailored 100% to your specific tensions, this deep-tissue treatment targets stubborn knots and releases accumulated stress. From the lower back to the base of the skull, every stroke is adapted to your body's unique needs. Restore your mobility and find instant calm in one powerful, focused session.",
    },
    "japanese-face-lift": {
      title: "Japanese Face Lift",
      duration: "70 Mins — €110",
    durationTwo: "90 Mins — €130",
    durationThree: "120 Mins — €170",
      description: "Experience the ultimate needle-free rejuvenation. This ancient Japanese technique naturally sculpt your contours, smoothes fine line and restores a radiant glow through deep-tissue massage. Achieve visible lifting and profound relaxation in one powerful, holistic treatment.",
    },
    "swedish-massage": {
      title: "Swedish Massage",
       duration: "70 Mins — €110",
    durationTwo: "90 Mins — €130",
    durationThree: "120 Mins — €170",
      description: "An iconic and refined treatment, combining long, flowing strokes with expert kneading and delicate friction. This ritual awakens the body, enchances circulation, and restores vitality. A perfect introduction to art of massage.",
    },
    "deep-tissue-massage": {
      title: "Deep Tissue Massage",
       duration: "70 Mins — €110",
    durationTwo: "90 Mins — €130",
    durationThree: "120 Mins — €170",
      description: "A powerful and targeted technique designed to release deeply rooted tension. Through slow, precise and sustained presssure, it works into the deeper layers of muscle tissue, offering relief, recovery, and renewed mobility.",
    },
    "scalp-massage": {
      title: "Scalp Massage",
      duration: "25 Mins — €25 ADD-ON ONLY",
      description: "Experience our Scalp Massage to instantly melt away any mental fatigue and leave you deeply recharged.",
    },
    "californian-massage": {
      title: "Californian Massage",
       duration: "70 Mins — €110",
    durationTwo: "90 Mins — €130",
    durationThree: "120 Mins — €170",
      description: "Often described as a 'massage of the soul' this deeply enveloping ritual feature slow, graceful and continous movements and mind, inviting profound relaxation an emotional relaease.",
    },
    "oriental-massage": {
      title: "Oriental Massage",
       duration: "70 Mins — €110",
    durationTwo: "90 Mins — €130",
    durationThree: "120 Mins — €170",
      description: "Inspired by ancestral traditions, this holitic ritual blends rhythmic movements with precise pressure along the body's energy pathways. It rebalances the flo of energy, detoxifies the body, and restores inner harmony.",
    },

    "lymphatic-massage": {
    title: "Lymphatic Massage",
    duration: "70 Mins — €110",
    durationTwo: "90 Mins — €130",
    durationThree: "120 Mins — €170",
   
    description: "A gentle, rhythmic treatment designed to stimulate the lymphatic system and encourage the natural drainage of toxins. This soothing ritual reduces fluid retention, boosts the immune system, and leaves you feeling deeply cleansed, incredibly light, and completely revitalized.",
  },
  
  "duo-massage": {
    title: "Duo Treatment Massage",
    duration: "70 Mins — €210",
    durationTwo: "90 Mins — €270",
    durationThree: "120 Mins — €360",
    
    description: "Escape the noise of the world and reconnect in a sanctuary designed for two. Side by side in our private couples suite, you and your companion will enjoy synchronized massages tailored to your individual needs. Soft lighting, calming aromatherapy, and the soothing rhythm of expert touch create a shared space of deep relaxation and harmony. Perfect for partners, best friends, or family looking to unwind together,"
  }
  };

  const service = RitualDetails[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#7D6B64] mb-4">Ritual Not Found</h1>
          <Link href="/services" className="text-[#C4A052] underline uppercase tracking-widest text-sm">
            Return to Rituals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#7D6B64] relative">
      {/* Hero Header */}
      <div className="bg-[#7D6B64] py-24 px-6 text-center text-[#FDFBF7]">
        <Link href="/services" className="inline-flex items-center gap-2 text-[#C4A052] uppercase tracking-widest text-xs mb-8 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Rituals
        </Link>
        
        <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tight mb-6">
          {service.title}
        </h1>

        {/* PRICE & DURATION */}
        <div className="flex justify-center items-center gap-3 text-[#C4A052] tracking-[0.3em] text-xl md:text-2xl uppercase font-medium">
          <Clock className="w-6 h-6" /> 
          <span>{service.duration}</span>
        </div>

        <div className="flex justify-center items-center gap-3 text-[#C4A052] tracking-[0.3em] text-xl md:text-2xl uppercase font-medium">
          <Clock className="w-6 h-6" /> 
          <span>{service.durationTwo}</span>
        </div>

        <div className="flex justify-center items-center gap-3 text-[#C4A052] tracking-[0.3em] text-xl md:text-2xl uppercase font-medium">
          <Clock className="w-6 h-6" /> 
          <span>{service.durationThree}</span>
        </div>

      </div>

      
      
      

      {/* Content Section */}
      <div className="max-w-3xl mx-auto py-20 px-6">
        <div className="flex items-start gap-6 mb-12">
          <Info className="w-8 h-8 text-[#C4A052] shrink-0 mt-1" />
          <p className="text-xl md:text-2xl font-light leading-relaxed italic opacity-90 border-l-2 border-[#C4A052]/30 pl-6">
            {service.description}
          </p>
        </div>
        
        <div className="h-px bg-[#C4A052]/20 w-full my-16" />

        <div className="text-center">
          <h2 className="font-serif text-3xl uppercase mb-8 tracking-widest">Begin Your Journey</h2>
          
          {/* Conditional Button Logic */}
          {slug === "scalp-massage" ? (
            <button 
              onClick={() => setShowModal(true)}
              className="inline-block bg-[#7D6B64] text-white px-12 py-5 uppercase tracking-[0.25em] text-sm font-bold hover:bg-[#C4A052] transition-all shadow-lg hover:shadow-2xl border-none cursor-pointer"
            >
              Request a Booking
            </button>
          ) : (
            <Link 
              href="/booking" 
              className="inline-block bg-[#7D6B64] text-white px-12 py-5 uppercase tracking-[0.25em] text-sm font-bold hover:bg-[#C4A052] transition-all shadow-lg hover:shadow-2xl"
            >
              Request a Booking
            </Link>
          )}
        </div>
      </div>

      {/* Add-on Warning Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5A4A42]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] p-10 max-w-lg w-full shadow-2xl border border-[#C4A052]/30 text-center">
            <h3 className="text-2xl font-serif text-[#7D6B64] mb-4 uppercase tracking-widest">Add-On Service Only</h3>
            <p className="text-[#7D6B64]/80 mb-8 font-light leading-relaxed">
              Please note that the <strong>Scalp Massage</strong> is an enhancement ritual. It can only be requested as an add-on alongside one of our main massage rituals and cannot be booked as a standalone appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-4 w-full sm:w-auto border border-[#7D6B64] text-[#7D6B64] uppercase tracking-widest text-xs font-bold hover:bg-[#7D6B64] hover:text-[#FDFBF7] transition-colors"
              >
                Go Back
              </button>
              <Link 
                href="/booking"
                className="px-8 py-4 w-full sm:w-auto bg-[#C4A052] text-white uppercase tracking-widest text-xs font-bold hover:bg-[#7D6B64] transition-colors text-center"
              >
                I Understand
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
