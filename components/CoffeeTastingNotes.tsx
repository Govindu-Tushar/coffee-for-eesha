"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Droplets, Feather, Coffee } from "lucide-react";

interface NoteCard {
  title: string;
  tagline: string;
  description: string;
  aroma: string;
  icon: React.ElementType;
  temperature: string;
}

const TASTING_NOTES: NoteCard[] = [
  {
    title: "Velvet Cocoa & Dark Roast",
    tagline: "Deep, rich, and grounding",
    description: "Hand-selected slow roasted beans delivering deep chocolate undertones and a quiet, comforting warmth for your morning thoughts.",
    aroma: "Notes of roasted hazelnut & 70% dark cocoa",
    icon: Flame,
    temperature: "Hot & Comforting",
  },
  {
    title: "Salted Caramel Swirl",
    tagline: "Sweet solace in every drop",
    description: "Golden buttery caramel ribbons folded gently through velvety espresso, adding just the right sweetness to brighten any afternoon.",
    aroma: "Toasted sugar cane & Madagascar vanilla bean",
    icon: Droplets,
    temperature: "Chilled & Decadent",
  },
  {
    title: "Whispering Cream Cloud",
    tagline: "Soft, gentle, and peaceful",
    description: "A delicate cloud of chilled sweet cream crowned with freshly cracked roasted beans. A gentle reminder to pause and breathe.",
    aroma: "Silky dairy sweetness & gentle espresso crema",
    icon: Feather,
    temperature: "Light & Dreamy",
  },
];

export default function CoffeeTastingNotes() {
  const [activeNote, setActiveNote] = useState<number>(0);

  const playChime = (index: number) => {
    setActiveNote(index);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freqs = [440, 523.25, 659.25]; // Warm A, C, E notes
      osc.type = "sine";
      osc.frequency.setValueAtTime(freqs[index % freqs.length], ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {}
  };

  return (
    <section id="notes" className="relative w-full py-24 px-5 sm:px-8 lg:px-12 bg-espresso-950 border-t border-b border-mocha/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-caramel/10 blur-[130px]" />
        <div className="absolute inset-0 bg-grain opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs uppercase tracking-widest text-gold-soft mb-3 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold-warm" />
            <span>The Flavor Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-warm-ivory tracking-tight mb-4">
            Notes of Warmth, Crafted for{" "}
            <span className="italic font-normal text-gold-soft text-gold-glow">Eesha</span>
          </h2>
          <p className="font-sans text-cream/70 text-sm sm:text-base font-light">
            Each layer in this coffee journey was chosen to reflect warmth, balance, and quiet joy.
          </p>
        </div>

        {/* 3 Editorial Tasting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TASTING_NOTES.map((note, index) => {
            const Icon = note.icon;
            const isSelected = activeNote === index;

            return (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                onClick={() => playChime(index)}
                className={`cursor-pointer rounded-2xl p-7 transition-all duration-300 relative group overflow-hidden ${
                  isSelected
                    ? "glass-card-editorial border-gold-soft/40 shadow-2xl scale-[1.02]"
                    : "glass-coffee border-gold-soft/15 hover:border-gold-soft/30 hover:scale-[1.01]"
                }`}
              >
                {/* Active golden corner indicator */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                    <div className="absolute transform rotate-45 bg-gradient-to-r from-gold-warm to-caramel text-[9px] font-bold text-espresso-950 py-0.5 right-[-24px] top-[10px] w-[80px] text-center shadow-sm">
                      FAV
                    </div>
                  </div>
                )}

                {/* Card Icon */}
                <div className="w-12 h-12 rounded-xl bg-espresso-800 border border-gold-soft/25 flex items-center justify-center text-gold-warm mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-gold-soft" />
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-gold-warm/80 mb-1">
                  Layer 0{index + 1} • {note.temperature}
                </div>

                <h3 className="font-serif text-2xl text-warm-ivory mb-2 group-hover:text-gold-soft transition-colors">
                  {note.title}
                </h3>

                <p className="font-serif italic text-sm text-caramel-light mb-4">
                  “{note.tagline}”
                </p>

                <p className="text-xs sm:text-sm text-cream/70 font-sans leading-relaxed mb-6">
                  {note.description}
                </p>

                <div className="pt-4 border-t border-mocha/30 flex items-center gap-2 text-[11px] text-cream/50">
                  <Coffee className="w-3.5 h-3.5 text-caramel" />
                  <span>{note.aroma}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
