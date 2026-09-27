'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LuxuryCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Raw coordinates for instantaneous, zero-latency inner dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Magnetic / target coordinates for the luxury outer ring
  const targetRingX = useMotionValue(-100);
  const targetRingY = useMotionValue(-100);

  // Outer luxury follower ring: smooth elastic agency lag
  const ringSpringConfig = { damping: 25, stiffness: 220, mass: 0.55 };
  const ringX = useSpring(targetRingX, ringSpringConfig);
  const ringY = useSpring(targetRingY, ringSpringConfig);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    document.body.classList.add('luxury-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseX.set(clientX);
      mouseY.set(clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect inputs/textareas to restore native I-beam cursor
        const inputElem = target.closest('input, textarea, select, [contenteditable="true"]');
        if (inputElem) {
          setIsOverInput(true);
          targetRingX.set(clientX);
          targetRingY.set(clientY);
          return;
        } else {
          setIsOverInput(false);
        }

        // Detect interactive targets (buttons, links, clickable items)
        const interactive = target.closest(
          'a, button, label, [role="button"], [data-cursor-interactive], .cursor-pointer'
        ) as HTMLElement | null;

        if (interactive) {
          setIsHovered(true);

          // Subtle magnetic attraction for compact interactive elements
          const rect = interactive.getBoundingClientRect();
          if (rect.width > 0 && rect.width < 260 && rect.height > 0 && rect.height < 90) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            // 20% magnetic pull toward center
            const magneticX = clientX + (centerX - clientX) * 0.22;
            const magneticY = clientY + (centerY - clientY) * 0.22;
            targetRingX.set(magneticX);
            targetRingY.set(magneticY);
          } else {
            targetRingX.set(clientX);
            targetRingY.set(clientY);
          }
        } else {
          setIsHovered(false);
          targetRingX.set(clientX);
          targetRingY.set(clientY);
        }

        // Detect optional custom cursor text (e.g., data-cursor-text="Buka")
        const textTarget = target.closest('[data-cursor-text]') as HTMLElement | null;
        if (textTarget) {
          setCursorText(textTarget.getAttribute('data-cursor-text'));
        } else {
          setCursorText(null);
        }
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setIsPressed(false);
      setIsOverInput(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('luxury-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, targetRingX, targetRingY]);

  if (!isEnabled) return null;

  const showCursor = isVisible && !isOverInput;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-[999999] overflow-hidden"
    >
      {/* Outer Fluid Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 72 : isHovered ? 54 : 34,
          height: cursorText ? 72 : isHovered ? 54 : 34,
          opacity: showCursor ? 1 : 0,
          scale: isPressed ? 0.82 : 1,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 280 },
          height: { type: 'spring', damping: 20, stiffness: 280 },
          scale: { type: 'spring', damping: 18, stiffness: 450 },
          opacity: { duration: 0.15 },
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-200 flex items-center justify-center backdrop-blur-[0.5px] ${
            isHovered
              ? 'border-[#E02B2B]/70 bg-[#E02B2B]/[0.08] shadow-[0_0_18px_rgba(224,43,43,0.18)]'
              : 'border-slate-800/40 bg-white/[0.04]'
          }`}
        >
          {cursorText && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-800 select-none">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Inner Precision Dot: zero-lag hardware sync */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform bg-slate-900"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 4 : 6,
          height: isHovered ? 4 : 6,
          opacity: showCursor ? (cursorText ? 0 : isHovered ? 0.5 : 1) : 0,
          scale: isPressed ? 0.75 : 1,
        }}
        transition={{
          width: { duration: 0.15 },
          height: { duration: 0.15 },
          opacity: { duration: 0.12 },
          scale: { duration: 0.1 },
        }}
      />
    </div>
  );
}
