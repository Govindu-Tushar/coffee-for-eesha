import React from "react";
import Navbar from "@/components/Navbar";
import CoffeeScrollExperience from "@/components/CoffeeScrollExperience";
import CoffeeTastingNotes from "@/components/CoffeeTastingNotes";
import CoffeeClosingSection from "@/components/CoffeeClosingSection";
import CursorGlow from "@/components/CursorGlow";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-espresso-950 text-cream selection:bg-caramel/40 selection:text-warm-ivory">
      {/* Desktop ambient cursor spotlight */}
      <CursorGlow />

      {/* Minimal luxury navbar */}
      <Navbar />

      {/* Continuous cinematic coffee experience: Opening Hero Viewport + 300-Frame Scrollytelling */}
      <CoffeeScrollExperience />

      {/* Flavor Architecture & Sensory Dedication */}
      <CoffeeTastingNotes />

      {/* Closing personalized section with working action buttons & coffee confetti */}
      <CoffeeClosingSection />
    </main>
  );
}
