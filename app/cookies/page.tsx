export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-24 px-6 font-sans text-[#5A4A42]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-[#C4A052] mb-8 uppercase tracking-widest">Cookie Policy</h1>
        
        <section className="space-y-6">
          <p className="leading-relaxed">Maison Celeste uses cookies to improve your experience. These are small text files stored on your device.</p>
          
          <div>
            <h2 className="text-xl font-serif text-[#C4A052] mb-2 uppercase">Essential Cookies</h2>
            <p className="leading-relaxed">These are necessary for the website to function, such as remembering your booking progress or your cookie consent preferences.</p>
          </div>

          <div>
            <h2 className="text-xl font-serif text-[#C4A052] mb-2 uppercase">Managing Cookies</h2>
            <p className="leading-relaxed">You can choose to disable cookies through your browser settings, though some parts of our booking ritual may not function correctly.</p>
          </div>
        </section>
      </div>
    </main>
  );
}