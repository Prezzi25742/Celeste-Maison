"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Booking", href: "/booking" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-[#E8E1D7] py-6 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand with Professional Tagline */}
        <div className="flex flex-col">
          <Link href="/" className="font-serif italic text-3xl text-[#5A4A42]">
            Maison Celeste
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C4A052] font-medium mt-1">
            Massages at your home
          </span>
        </div>
        
        {/* Nav Links */}
        <nav>
          <ul className="flex gap-10 text-xs tracking-widest uppercase text-[#5A4A42]">
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={`hover:text-[#C4A052] transition-colors ${
                    pathname === link.href ? "font-semibold text-[#C4A052]" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}