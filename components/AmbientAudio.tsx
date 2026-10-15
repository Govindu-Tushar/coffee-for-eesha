"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft warm low-frequency cafe hum (drone 1: 110Hz, drone 2: 165Hz with lowpass filter)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const lowpass = ctx.createBiquadFilter();

      lowpass.type = "lowpass";
      lowpass.frequency.value = 240;

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.04;

      osc1.connect(lowpass);
      osc2.connect(lowpass);
      lowpass.connect(oscGain);
      oscGain.connect(masterGain);

      osc1.start();
      osc2.start();

      // Soft vinyl/ambient coffee shop tape warmth (filtered pink noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 650;
      noiseFilter.Q.value = 0.8;

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(masterGain);
      whiteNoise.start();

      noiseSourceRef.current = whiteNoise;
      setIsPlaying(true);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setTimeout(() => {
        try {
          ctx.close();
        } catch {}
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 650);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 glass-pill text-cream/90 hover:text-warm-ivory hover:border-gold-soft/50 shadow-sm"
      title={isPlaying ? "Mute warm cafe ambience" : "Listen to warm cafe ambience"}
      aria-label="Toggle ambient coffee shop sound"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-warm opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-warm" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-mocha-light/60" />
        )}
      </span>

      {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-gold-warm" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}

      <span className="hidden sm:inline">
        {isPlaying ? "Cafe Ambience On" : "Play Cafe Ambience"}
      </span>

      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-0.5">
          <span className="w-0.5 h-2.5 bg-gold-warm rounded-full animate-pulse" style={{ animationDuration: "0.8s" }} />
          <span className="w-0.5 h-3.5 bg-gold-warm rounded-full animate-pulse" style={{ animationDuration: "1.2s" }} />
          <span className="w-0.5 h-2 bg-gold-warm rounded-full animate-pulse" style={{ animationDuration: "0.6s" }} />
        </span>
      )}
    </button>
  );
}
