"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Heart, Coffee } from "lucide-react";
import CoffeeSteam from "./CoffeeSteam";

export default function CoffeeHero() {
  const scrollToExperience = () => {
    const target = document.getElementById("story");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-10 px-5 sm:px-8 lg:px-12 bg-espresso-950 overflow-hidden"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Warm top-left caramel glow */}
        <div className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-caramel/15 blur-[120px]" />
        {/* Soft center-right golden spotlight behind photo */}
        <div className="absolute top-1/4 right-5 sm:right-20 w-[600px] h-[600px] rounded-full bg-gold-warm/10 blur-[140px]" />
        {/* Bottom espresso depth */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-espresso-950 via-espresso-900/60 to-transparent" />
        {/* Subtle texture grid */}
        <div className="absolute inset-0 bg-grain opacity-60" />
      </div>

      {/* Main Hero Content: Asymmetrical Editorial Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Dedication (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            {/* Subtle Pill Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill text-gold-soft text-xs tracking-wider uppercase font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-warm animate-pulse" />
              <span>A Personal Moment Dedicated to You</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-warm-ivory leading-[1.08]"
              >
                Coffee for{" "}
                <span className="block sm:inline font-normal italic text-gold-soft text-gold-glow">
                  Eesha
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="font-serif italic text-lg sm:text-2xl text-caramel-light font-light max-w-xl"
              >
                “Every little moment feels warmer with coffee.”
              </motion.p>
            </div>

            {/* Story dedication paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9 }}
              className="text-sm sm:text-base text-cream/75 leading-relaxed font-sans max-w-xl font-light"
            >
              Step into an intimate digital coffee pause crafted especially for you.
              From roasted whole beans to slow-motion chocolate swirls, let the rush of
              the day fade into rich aroma and cozy warmth.
            </motion.p>

            {/* Interactive Call-to-Action Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={scrollToExperience}
                className="btn-gold px-7 py-3.5 rounded-full flex items-center gap-3 text-sm tracking-wide font-medium cursor-pointer shadow-lg"
              >
                <Coffee className="w-4 h-4 text-espresso-950" />
                <span>Begin the Coffee Journey</span>
              </button>

              <a
                href="#closing"
                className="btn-ghost-coffee px-6 py-3.5 rounded-full flex items-center gap-2 text-sm tracking-wide font-medium cursor-pointer"
              >
                <Heart className="w-4 h-4 text-caramel" />
                <span>Read Your Note</span>
              </a>
            </motion.div>

            {/* Sensory Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 1 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-mocha/20 w-full max-w-lg"
            >
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-cream/40">Blend</span>
                <span className="text-xs sm:text-sm font-serif text-warm-ivory font-medium">Bespoke Dark Mocha</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-cream/40">Mood</span>
                <span className="text-xs sm:text-sm font-serif text-gold-soft font-medium">Calm & Cozy</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-cream/40">Dedicated To</span>
                <span className="text-xs sm:text-sm font-serif text-caramel-light font-medium">Eesha</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: The Provided Photograph of Eesha with Coffee (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[410px]">
              {/* Outer soft ambient halo */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-caramel/25 via-gold-warm/15 to-mocha/20 blur-2xl -z-10 opacity-70"
                aria-hidden="true"
              />

              {/* Deluxe Photo Card Container */}
              <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-espresso-700/60 via-espresso-800/80 to-espresso-950/90 border border-gold-soft/25 shadow-2xl backdrop-blur-sm overflow-hidden group">
                
                {/* Image Wrapper */}
                <div className="relative w-full aspect-[9/15] rounded-xl sm:rounded-2xl overflow-hidden bg-espresso-950">
                  <Image
                    src="/images/eesha with coffee.jpeg"
                    alt="Eesha enjoying her coffee moment"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 410px"
                    className="object-cover object-center filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Soft bottom vignette for luxury editorial depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-espresso-950/20 to-transparent pointer-events-none" />

                  {/* Gentle Coffee Steam rising from the cup in Eesha's hands */}
                  <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none">
                    <CoffeeSteam density="light" className="scale-75" />
                  </div>

                  {/* Floating Photo Pill Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-coffee border border-gold-soft/20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-caramel/25 border border-gold-soft/40 flex items-center justify-center">
                        <Coffee className="w-3.5 h-3.5 text-gold-warm" />
                      </div>
                      <div>
                        <p className="text-xs font-serif font-medium text-warm-ivory">Eesha’s Coffee Moment</p>
                        <p className="text-[10px] text-cream/60">Brewed with heartfelt warmth</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-gold-soft/90 px-2 py-0.5 rounded-full bg-espresso-900/60 border border-gold-soft/20">
                      100% Authentic
                    </span>
                  </div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-gold-soft/40 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-gold-soft/40 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-gold-soft/40 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-gold-soft/40 pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM: Refined "Scroll to Discover" Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center pt-4"
      >
        <button
          onClick={scrollToExperience}
          className="group flex flex-col items-center gap-2 text-cream/60 hover:text-gold-soft transition-colors duration-300 focus:outline-none"
          aria-label="Scroll down to the coffee experience"
        >
          <span className="text-[11px] uppercase tracking-widest font-sans font-light group-hover:tracking-[0.2em] transition-all duration-300">
            Scroll to discover the story
          </span>
          <div className="w-6 h-10 rounded-full border border-gold-soft/30 flex items-start justify-center p-1 group-hover:border-gold-soft/60 transition-colors">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-gold-warm"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-gold-soft/60 -mt-1 group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
