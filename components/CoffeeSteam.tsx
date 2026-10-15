"use client";

import React from "react";

interface CoffeeSteamProps {
  className?: string;
  density?: "light" | "medium" | "rich";
}

export default function CoffeeSteam({ className = "", density = "medium" }: CoffeeSteamProps) {
  const wisps = density === "light" ? [1, 2] : density === "rich" ? [1, 2, 3, 4, 5] : [1, 2, 3];

  return (
    <div
      className={`pointer-events-none relative flex items-end justify-center overflow-visible select-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-28 h-40 flex justify-center">
        {wisps.map((id, index) => {
          const delays = ["0s", "1.6s", "3.2s", "0.8s", "2.4s"];
          const durations = ["5.5s", "6.5s", "4.8s", "7s", "5.2s"];
          const offsets = ["-12px", "4px", "16px", "-6px", "10px"];

          return (
            <svg
              key={id}
              className="absolute bottom-0 w-16 h-36 opacity-0"
              style={{
                left: `calc(50% + ${offsets[index % offsets.length]})`,
                transform: "translateX(-50%)",
                animation: `steamFloat ${durations[index % durations.length]} ease-in-out infinite`,
                animationDelay: delays[index % delays.length],
                filter: "blur(4px)",
              }}
              viewBox="0 0 60 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 160 C 20 120, 42 90, 26 50 C 18 25, 34 10, 30 0"
                stroke="url(#steamGradient)"
                strokeWidth={index === 1 ? "10" : "7"}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="steamGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#C58B55" stopOpacity="0.3" />
                  <stop offset="40%" stopColor="#F5EBDD" stopOpacity="0.45" />
                  <stop offset="80%" stopColor="#FFF9F0" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFF9F0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes steamFloat {
          0% {
            transform: translateX(-50%) translateY(0) scaleX(0.9) scaleY(0.9);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          50% {
            transform: translateX(calc(-50% + 14px)) translateY(-60px) scaleX(1.3) scaleY(1.2);
            opacity: 0.4;
          }
          80% {
            opacity: 0.15;
          }
          100% {
            transform: translateX(calc(-50% - 10px)) translateY(-130px) scaleX(1.8) scaleY(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
