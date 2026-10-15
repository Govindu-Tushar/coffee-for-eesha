"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Heart } from "lucide-react";
import AmbientAudio from "./AmbientAudio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-espresso-900/85 backdrop-blur-md py-3 border-b border-gold-soft/10 shadow-lg shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand / Title */}
        <Link
          href="#hero"
          className="group flex items-center gap-3 text-cream hover:text-warm-ivory transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-caramel/30 via-espresso-800 to-espresso-950 border border-gold-soft/30 flex items-center justify-center text-gold-warm group-hover:border-gold-soft/60 group-hover:scale-105 transition-all duration-300 shadow-inner">
            <Coffee className="w-4 h-4 text-gold-soft transition-transform group-hover:rotate-12 duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wide font-medium text-warm-ivory group-hover:text-gold-soft transition-colors">
              Coffee for <span className="italic font-semibold text-gold-soft">Eesha</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-cream/50 -mt-0.5 font-sans">
              Personalized Experience
            </span>
          </div>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-cream/70">
          <Link
            href="#hero"
            className="hover:text-gold-soft transition-colors duration-200 py-1 relative group"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-warm transition-all duration-300 group-hover:w-full" />
          </Link>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: window.innerHeight * 0.95, behavior: "smooth" });
            }}
            className="hover:text-gold-soft transition-colors duration-200 py-1 relative group cursor-pointer"
          >
            <span>The Journey</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-warm transition-all duration-300 group-hover:w-full" />
          </a>
          <Link
            href="#notes"
            className="hover:text-gold-soft transition-colors duration-200 py-1 relative group"
          >
            <span>Flavor Notes</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-warm transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="#closing"
            className="hover:text-gold-soft transition-colors duration-200 py-1 relative group flex items-center gap-1.5"
          >
            <span>A Little Note</span>
            <Heart className="w-3 h-3 text-caramel/70 group-hover:text-caramel transition-colors" />
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-warm transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Right Action / Ambient Sound Toggle */}
        <div className="flex items-center gap-3">
          <AmbientAudio />
        </div>
      </div>
    </header>
  );
}
