'use client';

import React, { useState, useEffect } from 'react';

const WORDS = ['Aman,', 'Terenkripsi,', 'Terpercaya,'];

export default function HeroHeadlineTypewriter() {
  const [currentText, setCurrentText] = useState('Aman,');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter animation loop
  useEffect(() => {
    const fullWord = WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // If typing and current word not yet fully typed
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, 90);
      } else {
        // Full word typed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, 45);
      } else {
        // Finished deleting word, switch to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <div className="w-full flex justify-start text-left">
      {/* Accessible screen reader announcement */}
      <span className="sr-only">
        Ruang Aman, Terenkripsi, Terpercaya Bagi Siswa
      </span>

      <h1
        className="text-slate-950 text-left font-black tracking-[-0.035em] select-none"
        aria-hidden="true"
        style={{
          fontFamily: "'Inter', var(--font-inter), sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2.75rem, 6.5vw, 5rem)',
          lineHeight: 1.12,
        }}
      >
        {/* Baris 1: "Ruang " + dynamic text + blinking cursor "|" */}
        <span className="block whitespace-nowrap">
          <span className="font-black text-slate-950" style={{ fontWeight: 900 }}>Ruang </span>
          <span className="text-red-600 font-extrabold sm:font-black inline-flex items-baseline" style={{ fontWeight: 900 }}>
            <span>{currentText}</span>
            <span
              className="text-red-500 animate-pulse ml-1 select-none font-bold"
              aria-hidden="true"
              style={{ fontWeight: 700 }}
            >
              |
            </span>
          </span>
        </span>

        {/* Baris 2: Bagi Siswa */}
        <span 
          className="block mt-1 sm:mt-2 text-slate-950 font-black" 
          style={{ fontWeight: 900 }}
        >
          Bagi Siswa
        </span>
      </h1>
    </div>
  );
}
