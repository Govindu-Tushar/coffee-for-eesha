"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, RotateCcw, ArrowUp, Heart, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";
import CoffeeSteam from "./CoffeeSteam";

export default function CoffeeClosingSection() {
  const [wished, setWished] = useState(false);

  // Smoothly scroll back to the beginning of the coffee experience
  const handleExperienceAgain = () => {
    // Trigger festive warm coffee confetti!
    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.75 },
      colors: ["#C58B55", "#D9B47C", "#6F4E37", "#F5EBDD", "#FFF9F0"],
    });

    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: "smooth",
    });
  };

  // Smoothly scroll to the very top hero
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Send warm thoughts with confetti
  const handleSendWish = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.7 },
      colors: ["#D9B47C", "#E3A857", "#C58B55", "#FFF9F0"],
    });
    setWished(true);
    setTimeout(() => setWished(false), 3500);
  };

  return (
    <section
      id="closing"
      className="relative w-full py-28 px-5 sm:px-8 lg:px-12 bg-gradient-to-b from-espresso-950 via-espresso-900 to-espresso-950 overflow-hidden"
    >
      {/* Background radial warmth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-caramel/10 blur-[160px]" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gold-warm/10 blur-[130px]" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Soft floating steam above the card */}
        <div className="mb-2">
          <CoffeeSteam density="medium" className="scale-90" />
        </div>

        {/* Central Personalized Dedication Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card-editorial p-8 sm:p-14 rounded-3xl border border-gold-soft/25 shadow-2xl relative overflow-hidden w-full"
        >
          {/* Corner golden borders */}
          <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-gold-soft/40 pointer-events-none" />
          <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-gold-soft/40 pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-gold-soft/40 pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-gold-soft/40 pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-caramel/30 via-espresso-800 to-espresso-950 border border-gold-soft/40 flex items-center justify-center text-gold-warm mx-auto mb-6 shadow-inner">
            <Coffee className="w-7 h-7 text-gold-soft" />
          </div>

          {/* Section Headline */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-ivory tracking-tight mb-4">
            A Little Coffee, Just for{" "}
            <span className="italic font-normal text-gold-soft text-gold-glow">Eesha</span>{" "}
            <span className="not-italic text-2xl sm:text-4xl">☕</span>
          </h2>

          {/* Supporting Text */}
          <p className="font-serif italic text-lg sm:text-2xl text-caramel-light font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            “Some moments don&apos;t need to be grand. Sometimes, a warm cup of coffee is enough to make an ordinary day feel special.”
          </p>

          {/* Thumbnail reminder of Eesha's authentic smile */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-pill border border-gold-soft/30 mx-auto mb-10">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold-soft/50">
              <Image
                src="/images/eesha with coffee.jpeg"
                alt="Eesha"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <span className="block text-xs font-serif text-warm-ivory font-medium">To Eesha</span>
              <span className="block text-[10px] text-cream/60">May every day bring you warmth & comfort</span>
            </div>
            <Heart className="w-3.5 h-3.5 text-caramel fill-caramel/40 ml-1" />
          </div>

          {/* Working Interactive Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Primary: Experience It Again */}
            <button
              onClick={handleExperienceAgain}
              className="btn-gold w-full sm:w-auto px-8 py-4 rounded-full flex items-center justify-center gap-3 text-sm tracking-wide font-medium cursor-pointer shadow-xl group"
            >
              <RotateCcw className="w-4 h-4 text-espresso-950 transition-transform duration-500 group-hover:-rotate-180" />
              <span>Experience It Again</span>
            </button>

            {/* Secondary: Back to Top */}
            <button
              onClick={handleBackToTop}
              className="btn-ghost-coffee w-full sm:w-auto px-7 py-4 rounded-full flex items-center justify-center gap-2.5 text-sm tracking-wide font-medium cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 text-gold-soft" />
              <span>Back to Top</span>
            </button>

            {/* Micro-interaction: Warm Wishes */}
            <button
              onClick={handleSendWish}
              className="w-full sm:w-auto px-6 py-4 rounded-full glass-pill hover:border-gold-soft/60 flex items-center justify-center gap-2 text-sm text-gold-soft font-medium transition-all"
            >
              {wished ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Warmth Sent!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold-warm" />
                  <span>Send a Smile</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Closing subtle footer credit */}
        <div className="mt-16 text-center text-xs text-cream/40 font-sans tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Coffee for Eesha • Crafted with Care</p>
        </div>

      </div>
    </section>
  );
}
