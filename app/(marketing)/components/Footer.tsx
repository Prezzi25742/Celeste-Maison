export default function Footer() {
  return (
    <footer className="relative bg-[#7D6B64] text-[#FDFBF7] font-sans border-t border-[#C4A052]">
      {/* 1. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
        
        {/* Column 1: ADDRESS */}
        <div className="flex flex-col">
          <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-[#C4A052]">ADDRESS</h3>
          <p className="text-sm font-light leading-relaxed">Limerick, County Limerick</p>
          <p className="text-sm font-light leading-relaxed">Ireland</p>
        </div>

        {/* Column 2: CONTACT */}
        <div className="flex flex-col">
          <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-[#C4A052]">CONTACT</h3>
          <p className="text-sm font-light leading-relaxed mb-1">
            maisonceleste@outlook.ie
          </p>
          <p className="text-sm font-light leading-relaxed lowercase">
            maison.celeste.wellness
          </p>
          <p className="text-sm font-light leading-relaxed lowercase">
             +330683378384
          </p>
        </div>

        {/* Column 3: OPENING HOURS */}
        <div className="flex flex-col md:items-end md:text-right">
          <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-[#C4A052] md:w-full md:text-right">OPENING HOURS</h3>
          <p className="text-sm font-light leading-relaxed mb-1">Open Every Day</p>
          <p className="text-sm font-light leading-relaxed">7:00 AM – 11:00 PM</p>
        </div>
      </div>

      {/* 2. Bottom Copyright Bar */}
      <div className="border-t border-[#C4A052]/20 py-8 text-center px-6">
        <div className="max-w-7xl mx-auto text-[10px] tracking-widest uppercase font-light text-[#FDFBF7]/60 flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 Maison Celeste Limerick, Ireland</p>

          <div className="flex gap-8">
            <a href="/cookies" className="hover:text-[#C4A052] transition-colors">Cookie Policy</a>
            <a href="/privacy" className="hover:text-[#C4A052] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
