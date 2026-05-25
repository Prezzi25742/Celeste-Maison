import Link from 'next/link';

export default function RitualsPage() {
  const services = [
    { name: "Back Neck and Shoulders", slug: "back-neck-shoulders", img: "/images/service-back.jpg" },
    { name: "Japanese Face Lift", slug: "japanese-face-lift", img: "/images/service-face.jpg" },
    { name: "Swedish Massage", slug: "swedish-massage", img: "/images/service-swedish.jpg" },
    { name: "Deep Tissue Massage", slug: "deep-tissue-massage", img: "/images/service-deep.jpg" },
    { name: "Scalp Massage", slug: "scalp-massage", img: "/images/service-scalp.jpg" },
    { name: "Californian Massage", slug: "californian-massage", img: "/images/service-californian.jpg" },
    { name: "Oriental Massage", slug: "oriental-massage", img: "/images/service-oriental.jpg" },
    { name: "Lymphatic Massage", slug: "lymphatic-massage", img: "/images/service-lymphatic.jpg" },
    { name: "Duo Treatment Massage", slug: "duo-massage", img: "/images/service-duo.jpg" },
  ];

  return (
    <section className="bg-[#FDFBF7] py-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif text-[#7D6B64] uppercase tracking-widest mb-4">Our Rituals</h1>
          <div className="w-24 h-px bg-[#C4A052] mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <Link 
              href={`/services/${service.slug}`} 
              key={service.slug} 
              className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl bg-[#7D6B64]"
            >
              {/* Background Image with Maison Celeste filters */}
              <img 
                src={service.img} 
                alt={service.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 opacity-80" 
              />
              
              {/* Overlay - transitions from dark to brand brown */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-[#7D6B64]/40 transition-all duration-500" />
              
              {/* Decorative Border Frame */}
              <div className="absolute inset-0 border border-white/10 m-6 pointer-events-none transition-colors duration-500 group-hover:border-[#C4A052]/50" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-[#FDFBF7] text-xl md:text-2xl font-serif tracking-[0.2em] uppercase mb-4 leading-tight">
                  {service.name}
                </h3>
                <span className="text-[#C4A052] text-sm uppercase tracking-widest opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Discover Ritual
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}