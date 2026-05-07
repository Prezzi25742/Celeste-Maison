export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-24 px-6 font-sans text-[#5A4A42]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-[#C4A052] mb-8 uppercase tracking-widest">Privacy Policy</h1>
        <p className="mb-4 opacity-80 italic">Last Updated: May 2026</p>
        
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-serif text-[#C4A052] mb-2 uppercase">1. Information We Collect</h2>
            <p className="leading-relaxed">To provide our mobile massage services, we collect your name, email, phone number, and home address. We also collect health information via our consultation form to ensure your safety during rituals.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-[#C4A052] mb-2 uppercase">2. How We Use Data</h2>
            <p className="leading-relaxed">Your data is used strictly for booking appointments, contacting you regarding your ritual, and ensuring treatments are medically safe. We do not sell your data.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-[#C4A052] mb-2 uppercase">3. Third-Party Services</h2>
            <p className="leading-relaxed">We use trusted partners to operate: <strong>Supabase</strong> (Database), <strong>Resend</strong> (Emails), and <strong>Tally</strong> (Health Consultations). Each adheres to strict security standards.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-[#C4A052] mb-2 uppercase">4. Your Rights</h2>
            <p className="leading-relaxed">As a client in Ireland, you have the right to request access to your data or ask for its deletion at any time by emailing maisonceleste@outlook.ie.</p>
          </div>
        </section>
      </div>
    </main>
  );
}