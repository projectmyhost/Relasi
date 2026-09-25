'use client';

import React, { useState, useEffect } from 'react';

const WORDS = ['aman', 'terenkripsi', 'terpercaya'];

export default function HeroHeadlineTypewriter() {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener?.('change', listener);
    return () => mediaQuery.removeEventListener?.('change', listener);
  }, []);

  // Typewriter animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText('aman');
      return;
    }

    const currentWord = WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase: character by character
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 90);
      } else {
        // Word completed: pause briefly
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting phase: character by character
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 45);
      } else {
        // Word cleared: pause briefly before moving to next word
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
        }, 320);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, prefersReducedMotion]);

  return (
    <div className="hero-split-heading w-full flex justify-start text-left">
      {/* Accessible screen reader announcement */}
      <span className="sr-only">
        Ruang aman, terenkripsi, terpercaya bagi siswa
      </span>

      <h1
        className="text-slate-900 text-left font-bold sm:font-extrabold tracking-tight min-h-[1.2em] select-none"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(2.5rem, 6.2vw, 4.85rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.035em',
        }}
      >
        <span>Ruang</span>{' '}
        <span className="text-[#E02B2B] inline-flex items-baseline whitespace-nowrap">
          <span>{displayText}</span>
          {!prefersReducedMotion && (
            <span
              className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-[#E02B2B] ml-1 sm:ml-1.5 align-baseline rounded-full animate-pulse"
              aria-hidden="true"
            />
          )}
        </span>{' '}
        <span className="inline">bagi siswa</span>
      </h1>
    </div>
  );
}
