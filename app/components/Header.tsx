"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="logo-section">
        <h1 className="logo-text">Maison Celeste</h1>
        <p className="logo-subtitle">Massages at your home</p>
      </div>

      {/* Hamburger button with 3 lines */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {/* The 'active' class only applies when isOpen is true */}
     <nav className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link href="/booking" onClick={() => setIsOpen(false)}>Booking</Link>
        <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
      </nav>
    </header>
  );
}