"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Coffee, Sparkles, Compass, Heart, ChevronDown, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import CoffeeSteam from "./CoffeeSteam";

const TOTAL_FRAMES = 300;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/images/ezgif-frame-${padded}.jpg`;
}

interface StoryBeat {
  id: string;
  stageName: string;
  stageNum: string;
  headline: string;
  subtitle: string;
  narrative: string;
  range: [number, number]; // [startProgress, endProgress]
  accent: string;
}

const STORY_BEATS: StoryBeat[] = [
  {
    id: "beat-1",
    stageNum: "01",
    stageName: "The Awakening",
    headline: "Coffee for Eesha",
    subtitle: "Every little moment feels warmer with coffee.",
    narrative: "Before the day asks anything of you, there is this quiet pause. Whole roasted beans, dark velvet aromas, and pure comfort suspended in time.",
    range: [0.15, 0.35],
    accent: "text-gold-soft",
  },
  {
    id: "beat-2",
    stageNum: "02",
    stageName: "The Swirl & Blend",
    headline: "A Moment of Quiet Calm",
    subtitle: "Slow down, take a breath, and enjoy the little things.",
    narrative: "Rich chocolate ribbons folding into chilled espresso. A gentle reminder to pause, breathe, and savor the sweetness of today.",
    range: [0.38, 0.58],
    accent: "text-caramel-light",
  },
  {
    id: "beat-3",
    stageNum: "03",
    stageName: "The Creation",
    headline: "Layer by Sweet Layer",
    subtitle: "A little comfort, one beautiful cup at a time.",
    narrative: "Every layer comes together with quiet harmony. Simple ingredients transformed into quiet joy.",
    range: [0.61, 0.79],
    accent: "text-gold-warm",
  },
  {
    id: "beat-4",
    stageNum: "04",
    stageName: "The Masterpiece",
    headline: "Brewed Just for Eesha",
    subtitle: "May your day be filled with warmth, little joys, and lovely moments.",
    narrative: "Your coffee is ready, Eesha. Freshly prepared, warm at heart, and made especially for you.",
    range: [0.82, 0.98],
    accent: "text-warm-ivory",
  },
];

export default function CoffeeScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preloading & progress state
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(300);

  // Cache of loaded images (1-indexed, size 301)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentRenderedFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Framer Motion scroll binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Silky smooth spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.0004,
  });

  // Hero Opening Viewport Transforms (Transitions smoothly between 0.00 and 0.14)
  const heroOpacity = useTransform(smoothProgress, [0.0, 0.12], [1, 0]);
  const heroY = useTransform(smoothProgress, [0.0, 0.12], [0, -45]);
  const heroScale = useTransform(smoothProgress, [0.0, 0.12], [1, 0.94]);
  const heroPointerEvents = useTransform(smoothProgress, (p) => (p > 0.10 ? "none" : "auto"));

  // Persistent floating medallion transforms (appears smoothly when hero fades)
  const medallionOpacity = useTransform(smoothProgress, [0.11, 0.16, 0.96, 0.99], [0, 1, 1, 0]);
  const medallionScale = useTransform(smoothProgress, [0.11, 0.16], [0.85, 1]);

  // Canvas background veil (softly brightens as we enter the coffee sequence)
  const canvasBrightness = useTransform(smoothProgress, [0.0, 0.12], [0.55, 1]);

  // Bottom scrubber bar opacity
  const scrubberOpacity = useTransform(smoothProgress, [0.08, 0.14, 0.97, 1.0], [0, 1, 1, 0]);

  // High quality canvas rendering with DPI support & responsive mobile framing
  const renderFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find nearest loaded frame if current isn't ready
    let img = imagesRef.current[frameNumber];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 35; offset++) {
        const back = frameNumber - offset;
        const forward = frameNumber + offset;
        if (back >= 1 && imagesRef.current[back]?.complete) {
          img = imagesRef.current[back];
          break;
        }
        if (forward <= TOTAL_FRAMES && imagesRef.current[forward]?.complete) {
          img = imagesRef.current[forward];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep espresso clear
    ctx.fillStyle = "#0D0907";
    ctx.fillRect(0, 0, width, height);

    // Calculate aspect ratio scaling
    const imgRatio = img.naturalWidth / img.naturalHeight; // 1920 / 1080 = 1.777
    const canvasRatio = width / height;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio < 1.0) {
      // Mobile / vertical screens: scale up so coffee glass fills ~75% of screen height
      drawH = height * 0.82;
      drawW = drawH * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = (height - drawH) / 2;
    } else if (canvasRatio > imgRatio) {
      // Wide screens
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    } else {
      // Intermediate laptop / tablet landscape
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Left and right subtle vignette blending to seamlessly dissolve into dark background
    if (drawX > 0) {
      const edgeL = ctx.createLinearGradient(drawX, 0, drawX + 70, 0);
      edgeL.addColorStop(0, "rgba(13, 9, 7, 0.95)");
      edgeL.addColorStop(1, "rgba(13, 9, 7, 0)");
      ctx.fillStyle = edgeL;
      ctx.fillRect(drawX, drawY, 70, drawH);

      const edgeR = ctx.createLinearGradient(drawX + drawW, 0, drawX + drawW - 70, 0);
      edgeR.addColorStop(0, "rgba(13, 9, 7, 0.95)");
      edgeR.addColorStop(1, "rgba(13, 9, 7, 0)");
      ctx.fillStyle = edgeR;
      ctx.fillRect(drawX + drawW - 70, drawY, 70, drawH);
    }

    // Top and bottom subtle vignette blending
    const topG = ctx.createLinearGradient(0, 0, 0, 90);
    topG.addColorStop(0, "rgba(13, 9, 7, 0.85)");
    topG.addColorStop(1, "rgba(13, 9, 7, 0)");
    ctx.fillStyle = topG;
    ctx.fillRect(0, 0, width, 90);

    const bottomG = ctx.createLinearGradient(0, height - 90, 0, height);
    bottomG.addColorStop(0, "rgba(13, 9, 7, 0)");
    bottomG.addColorStop(1, "rgba(13, 9, 7, 0.9)");
    ctx.fillStyle = bottomG;
    ctx.fillRect(0, height - 90, width, 90);

    ctx.restore();
    currentRenderedFrameRef.current = frameNumber;
  }, []);

  // Preload image sequence progressively with high-priority keyframes first
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;

    // 1. Instant load of frame 300 (Opening state)
    const firstImg = new window.Image();
    firstImg.src = getFrameUrl(300);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[300] = firstImg;
      loaded++;
      setLoadedCount(loaded);
      renderFrame(300);
    };

    // 2. High priority keyframes: frame 1, 75, 150, 225
    const priorityIndices = [1, 75, 150, 225, 50, 100, 180, 260];
    priorityIndices.forEach((idx) => {
      const pImg = new window.Image();
      pImg.src = getFrameUrl(idx);
      pImg.onload = () => {
        if (isCancelled) return;
        imagesRef.current[idx] = pImg;
        loaded++;
        setLoadedCount((c) => c + 1);
      };
    });

    // 3. Queue up remaining frames with concurrent pool
    const remaining: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i !== 300 && !priorityIndices.includes(i)) {
        remaining.push(i);
      }
    }

    let activeWorkers = 0;
    const MAX_CONCURRENT = 8;
    let queueIdx = 0;

    const pumpQueue = () => {
      if (isCancelled) return;
      while (activeWorkers < MAX_CONCURRENT && queueIdx < remaining.length) {
        const frameIdx = remaining[queueIdx++];
        activeWorkers++;

        const img = new window.Image();
        img.src = getFrameUrl(frameIdx);

        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[frameIdx] = img;
          setLoadedCount((c) => c + 1);
          activeWorkers--;
          pumpQueue();
        };

        img.onerror = () => {
          if (isCancelled) return;
          activeWorkers--;
          pumpQueue();
        };
      }
    };

    pumpQueue();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Hook into scroll spring to drive the 300-frame animation
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const p = Math.max(0, Math.min(1, latest));

      // In the narrative timeline:
      // When p = 0 to 0.12: Hero is active, frame stays at 300.
      // When p = 0.12 to 0.98: Sequence smoothly plays from Frame 300 down to Frame 1.
      let frameIndex = 300;
      if (p > 0.12) {
        const coffeeProgress = Math.min(1, Math.max(0, (p - 0.12) / 0.86));
        frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(300 - coffeeProgress * 299)));
      }

      setCurrentFrameNum(frameIndex);

      if (frameIndex !== currentRenderedFrameRef.current) {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          renderFrame(frameIndex);
        });
      }

      // Update current active stage
      let foundIndex = 0;
      for (let i = 0; i < STORY_BEATS.length; i++) {
        if (p >= STORY_BEATS[i].range[0] && p <= STORY_BEATS[i].range[1]) {
          foundIndex = i;
          break;
        } else if (p > STORY_BEATS[i].range[1]) {
          foundIndex = i;
        }
      }
      setActiveStageIndex(foundIndex);
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [smoothProgress, renderFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (currentRenderedFrameRef.current > 0) {
        renderFrame(currentRenderedFrameRef.current);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Smooth scroll helper to jump directly into the coffee journey
  const scrollToCoffeeJourney = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetY = containerTop + containerHeight * 0.18;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Jump to specific story beat
  const jumpToStage = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetBeat = STORY_BEATS[index];
    const targetY = containerTop + containerHeight * (targetBeat.range[0] + 0.05);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Celebratory confetti trigger for Act IV
  const handleSipConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#D9B47C", "#E3A857", "#C58B55", "#F5EBDD", "#FFF9F0"],
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-espresso-950"
      style={{ height: "560vh" }}
    >
      {/* STICKY STAGE CONTAINER (Pinned across the entire 560vh journey) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Background Ambient Studio Lighting */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-caramel/10 blur-[150px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold-warm/10 blur-[140px]" />
          <div className="absolute inset-0 bg-grain opacity-45" />
        </div>

        {/* Cinematic Canvas */}
        <motion.canvas
          ref={canvasRef}
          style={{ filter: useTransform(canvasBrightness, (v) => `brightness(${v})`) }}
          className="scrolly-canvas relative z-10 w-full h-full block select-none pointer-events-none"
        />

        {/* ------------------------------------------------------------- */}
        {/* SCENE 0: OPENING HERO VIEWPORT (Immediately visible at 0 scroll) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
            pointerEvents: heroPointerEvents as unknown as "auto" | "none",
          }}
          className="absolute inset-0 z-30 flex flex-col justify-between pt-20 pb-6 px-5 sm:px-8 lg:px-14 max-w-7xl mx-auto w-full my-auto"
        >
          {/* Main Hero Row: Editorial Left + Eesha's Actual Photo Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center my-auto w-full">
            
            {/* LEFT COLUMN: Editorial Typography & Intimate Dedication (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6 order-2 lg:order-1">
              
              {/* Subtle Luxury Tag */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-gold-soft text-xs tracking-wider uppercase font-medium shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-warm animate-pulse" />
                <span>A Personal Moment Dedicated to You</span>
              </div>

              {/* Grand Headline: Immediately displays Eesha's name and title */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-ivory tracking-tight leading-[1.08]">
                  Coffee for{" "}
                  <span className="font-normal italic text-gold-soft text-gold-glow">
                    Eesha
                  </span>
                </h1>

                {/* Tagline */}
                <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-caramel-light font-light max-w-xl">
                  “Every little moment feels warmer with coffee.”
                </p>
              </div>

              {/* Story dedication paragraph */}
              <p className="text-xs sm:text-sm lg:text-base text-cream/80 leading-relaxed font-sans max-w-xl font-light">
                Step into an intimate digital coffee pause crafted especially for you.
                From roasted whole beans to slow-motion chocolate swirls, let the rush of
                the day fade into rich aroma and cozy warmth.
              </p>

              {/* Interactive Call-to-Action Group */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={scrollToCoffeeJourney}
                  className="btn-gold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full flex items-center gap-3 text-xs sm:text-sm tracking-wide font-medium cursor-pointer shadow-xl group"
                >
                  <Coffee className="w-4 h-4 text-espresso-950 transition-transform group-hover:rotate-12 duration-300" />
                  <span>Begin the Coffee Journey</span>
                  <ArrowRight className="w-4 h-4 text-espresso-950 transition-transform group-hover:translate-x-1 duration-200" />
                </button>

                <a
                  href="#closing"
                  className="btn-ghost-coffee px-5 sm:px-6 py-3 sm:py-3.5 rounded-full flex items-center gap-2 text-xs sm:text-sm tracking-wide font-medium cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-caramel fill-caramel/20" />
                  <span>A Little Note</span>
                </a>
              </div>

              {/* Sensory Badges */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-mocha/25 w-full max-w-md text-left">
                <div>
                  <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-cream/40">Blend</span>
                  <span className="text-xs sm:text-sm font-serif text-warm-ivory font-medium">Dark Mocha Swirl</span>
                </div>
                <div>
                  <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-cream/40">Mood</span>
                  <span className="text-xs sm:text-sm font-serif text-gold-soft font-medium">Calm & Cozy</span>
                </div>
                <div>
                  <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-cream/40">Dedicated To</span>
                  <span className="text-xs sm:text-sm font-serif text-caramel-light font-medium">Eesha</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Eesha's Actual Provided Photograph (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[360px]">
                
                {/* Outer warm ambient halo */}
                <div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-caramel/30 via-gold-warm/20 to-mocha/25 blur-xl -z-10 opacity-80"
                  aria-hidden="true"
                />

                {/* Deluxe Photo Card Container */}
                <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-espresso-800/80 via-espresso-900/90 to-espresso-950/95 border border-gold-soft/30 shadow-2xl backdrop-blur-md overflow-hidden group">
                  
                  {/* Image Wrapper */}
                  <div className="relative w-full aspect-[9/14] sm:aspect-[9/15] rounded-xl sm:rounded-2xl overflow-hidden bg-espresso-950">
                    <Image
                      src="/images/eesha with coffee.jpeg"
                      alt="Eesha enjoying her coffee moment"
                      fill
                      priority
                      sizes="(max-width: 640px) 270px, (max-width: 1024px) 320px, 360px"
                      className="object-cover object-center filter brightness-[1.03] contrast-[1.04] saturate-[1.06] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    {/* Editorial warm vignette dissolving harsh hallway background into dark espresso */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/25 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-espresso-950/50 pointer-events-none" />

                    {/* Animated Coffee Steam rising from the cup in Eesha's hands */}
                    <div className="absolute bottom-[32%] left-[48%] -translate-x-1/2 pointer-events-none">
                      <CoffeeSteam density="light" className="scale-75" />
                    </div>

                    {/* Floating Photo Pill Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 rounded-xl glass-coffee border border-gold-soft/25 flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-caramel/25 border border-gold-soft/40 flex items-center justify-center shrink-0">
                          <Coffee className="w-3.5 h-3.5 text-gold-warm" />
                        </div>
                        <div>
                          <p className="text-xs font-serif font-medium text-warm-ivory">Eesha’s Coffee Moment</p>
                          <p className="text-[10px] text-cream/60">Brewed with heartfelt warmth</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gold-soft/90 px-2 py-0.5 rounded-full bg-espresso-900/80 border border-gold-soft/25 shrink-0">
                        Authentic
                      </span>
                    </div>
                  </div>

                  {/* Decorative golden corner accents */}
                  <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-gold-soft/40 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-gold-soft/40 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-gold-soft/40 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-gold-soft/40 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom "Scroll to Discover" Indicator */}
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              onClick={scrollToCoffeeJourney}
              className="group flex flex-col items-center gap-1.5 text-cream/60 hover:text-gold-soft transition-colors duration-300 focus:outline-none"
              aria-label="Scroll down to begin the coffee experience"
            >
              <span className="text-[10px] uppercase tracking-widest font-sans font-light group-hover:tracking-[0.2em] transition-all duration-300">
                Scroll to explore the journey
              </span>
              <div className="w-5 h-8 rounded-full border border-gold-soft/30 flex items-start justify-center p-1 group-hover:border-gold-soft/60 transition-colors">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-gold-warm"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gold-soft/60 -mt-1 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* PERSISTENT FLOATING EESHA MEDALLION (Active during sequence) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: medallionOpacity, scale: medallionScale }}
          className="absolute top-20 right-5 sm:right-8 z-30 pointer-events-auto"
        >
          <div className="glass-card-editorial px-3 py-1.5 rounded-full border border-gold-soft/30 flex items-center gap-2.5 shadow-xl hover:border-gold-soft/60 transition-colors group cursor-default">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gold-soft/50 ring-2 ring-caramel/30">
              <Image
                src="/images/eesha with coffee.jpeg"
                alt="Eesha"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-gold-soft font-serif font-medium">
                Dedicated to Eesha
              </span>
            </div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-warm opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-warm" />
            </span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* TOP STATUS PILL & STAGE NAVIGATION */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scrubberOpacity }}
          className="absolute top-20 left-5 sm:left-8 z-30 flex items-center gap-2 pointer-events-auto"
        >
          <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs text-gold-soft font-sans tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-gold-warm animate-spin-slow" />
            <span>{STORY_BEATS[activeStageIndex]?.stageName || "The Journey"}</span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* CHOREOGRAPHED STORY BEAT OVERLAYS (Acts I to IV) */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-5 sm:p-10">
          {STORY_BEATS.map((beat, idx) => (
            <StoryBeatCard
              key={beat.id}
              beat={beat}
              progress={smoothProgress}
              onSip={idx === STORY_BEATS.length - 1 ? handleSipConfetti : undefined}
            />
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM INTERACTIVE STAGE SCRUBBER & FRAME COUNTER */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scrubberOpacity }}
          className="absolute bottom-6 left-6 right-6 z-30 flex flex-col items-center gap-2 pointer-events-auto"
        >
          <div className="glass-card-editorial px-4 py-2 rounded-full border border-gold-soft/20 shadow-2xl flex items-center gap-4 sm:gap-6 backdrop-blur-xl">
            {/* Stage clickable bullets */}
            <div className="flex items-center gap-2">
              {STORY_BEATS.map((beat, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={beat.id}
                    onClick={() => jumpToStage(idx)}
                    className="group relative flex items-center gap-1.5 focus:outline-none"
                    title={`Jump to Act ${beat.stageNum}: ${beat.stageName}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-6 bg-gradient-to-r from-caramel to-gold-warm shadow-sm"
                          : "w-2 bg-espresso-700 hover:bg-gold-soft/50"
                      }`}
                    />
                    <span className="hidden md:inline text-[10px] font-mono text-cream/50 group-hover:text-gold-soft transition-colors">
                      {beat.stageNum}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Vertical Divider */}
            <span className="w-px h-3 bg-mocha/30" />

            {/* Frame Counter */}
            <div className="text-[11px] font-mono text-cream/70 flex items-center gap-1.5">
              <span className="text-gold-soft font-semibold">{currentFrameNum}</span>
              <span className="text-cream/40">/</span>
              <span className="text-cream/50">300</span>
            </div>

            {/* Preload Status indicator */}
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-cream/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Buffered {loadedCount}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// Individual Story Beat Card with smooth cubic-bezier transitions
function StoryBeatCard({
  beat,
  progress,
  onSip,
}: {
  beat: StoryBeat;
  progress: ReturnType<typeof useSpring>;
  onSip?: () => void;
}) {
  const [start, end] = beat.range;
  const fadeInEnd = start + 0.05;
  const fadeOutStart = end - 0.05;

  const opacity = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [35, 0, 0, -35]
  );

  const scale = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [0.95, 1, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute max-w-xl w-full text-center px-4 pointer-events-auto"
    >
      <div className="glass-card-editorial p-6 sm:p-9 rounded-2xl sm:rounded-3xl border border-gold-soft/25 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        
        {/* Subtle accent corner highlights */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-gold-soft/40 pointer-events-none" />
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-gold-soft/40 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-gold-soft/40 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-gold-soft/40 pointer-events-none" />

        {/* Stage Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-espresso-950/80 border border-gold-soft/30 text-[11px] uppercase tracking-widest text-gold-soft mb-3 font-sans shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-warm" />
          <span>Act {beat.stageNum} • {beat.stageName}</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-warm-ivory tracking-tight mb-2">
          {beat.headline.includes("Eesha") ? (
            <>
              {beat.headline.replace("Eesha", "")}
              <span className="italic font-normal text-gold-soft text-gold-glow">Eesha</span>
            </>
          ) : (
            beat.headline
          )}
        </h2>

        {/* Subtitle / Poetic Quote */}
        <p className="font-serif italic text-sm sm:text-lg text-caramel-light font-light max-w-md mx-auto mb-3">
          “{beat.subtitle.replace(/^“|”$/g, "")}”
        </p>

        {/* Narrative Dedication Copy */}
        <p className="text-xs sm:text-sm text-cream/75 font-sans leading-relaxed max-w-md mx-auto font-light">
          {beat.narrative}
        </p>

        {/* Interactive "Sip the Moment" button for the final act */}
        {onSip && (
          <div className="mt-5 pt-4 border-t border-mocha/30 flex justify-center">
            <button
              onClick={onSip}
              className="btn-gold px-6 py-2.5 rounded-full flex items-center gap-2 text-xs font-medium cursor-pointer shadow-lg group"
            >
              <Coffee className="w-3.5 h-3.5 text-espresso-950 group-hover:rotate-12 transition-transform" />
              <span>Sip the Moment</span>
              <Sparkles className="w-3 h-3 text-espresso-950" />
            </button>
          </div>
        )}

      </div>
    </motion.div>
  );
}
