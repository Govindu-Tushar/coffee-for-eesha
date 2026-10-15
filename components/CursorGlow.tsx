"use client";

import React, { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer fine (desktop)
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 overflow-hidden"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, rgba(217, 180, 124, 0.08) 0%, rgba(197, 139, 85, 0.03) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
