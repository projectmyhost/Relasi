'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Copy, 
  Check, 
  Lock, 
  ArrowRight, 
  User, 
  Clock, 
  FileCheck,
  Users,
  HeartHandshake
} from 'lucide-react';

export default function SopWorkflowSection() {
  // State Card 1: Toggle Mode Samarkan Identitas
  const [isAnonymous, setIsAnonymous] = useState(true);

  // State Card 2: Salin PIN Display
  const [copied, setCopied] = useState(false);
  const PIN_CODE = 'RLS-9482-XK';

  const handleCopyPin = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(PIN_CODE).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // State Card 3: 3 Tahap Penanganan BK Selector
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  const STEP_DETAILS = {
    1: {
      label: 'Tahap 1: Verifikasi Laporan',
      time: '1x24 Jam Pertama',
      icon: FileCheck,
      notes: 'Konselor BK melakukan telaah kronologi dan verifikasi materi aduan secara tertutup. Penilaian tingkat urgensi keselamatan dilakukan tanpa prasangka sepihak.',
    },
    2: {
      label: 'Tahap 2: Mediasi Tertutup',
      time: 'Sesi Terjadwal Privat',
      icon: Users,
      notes: 'Pertemuan terpisah difasilitasi di ruang konseling yang aman dan kondusif. Tidak ada konfrontasi langsung ataupun tekanan antar pihak.',
    },
    3: {
      label: 'Tahap 3: Konseling Berkala',
      time: 'Pemantauan Berkelanjutan',
      icon: HeartHandshake,
      notes: 'Pendampingan psikologis pasca-penanganan untuk memulihkan rasa percaya diri murid dan memastikan kenyamanan interaksi belajar di sekolah.',
    },
  };

  // State Card 4: Checklist Pakta Perlindungan Siswa
  const [checkedRetaliation, setCheckedRetaliation] = useState(true);
  const [checkedFollowup, setCheckedFollowup] = useState(true);

  // Synchronize right text column height with Card 4 for seamless simultaneous scroll exit
  const [card4Height, setCard4Height] = useState<number | null>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card4Ref.current) return;

    const updateHeight = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        if (card4Ref.current) {
          setCard4Height(card4Ref.current.offsetHeight);
        }
      } else {
        setCard4Height(null);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(card4Ref.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <section 
      id="cara-kerja" 
      className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative">
        
        {/* KOLOM KANAN (HEADER TEKS STICKY / FIXED) */}
        <div 
          className="lg:sticky lg:top-32 z-10 self-start w-full lg:w-[42%] order-1 lg:order-2 text-left lg:text-right pt-2 lg:pt-4 flex flex-col justify-between"
          style={card4Height ? { top: '128px', minHeight: `${card4Height}px` } : { top: '128px' }}
        >
          <div>
            <span className="inline-block text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              KOMITMEN PENDAMPINGAN &amp; PRIVASI
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Setiap Suara Didengar, Setiap Langkah Menjagamu.
            </h2>
            <p className="text-slate-600 text-sm lg:text-base leading-relaxed mt-3 max-w-md lg:ml-auto">
              Dari saat kamu mengirim cerita hingga ruang pemulihan, setiap proses dirancang untuk memastikan kamu aman, didampingi secara adil, dan bebas dari rasa takut.
            </p>

            {/* Status Protocol Box */}
            <div className="pt-6 flex flex-col items-start lg:items-end">
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                <span className="text-emerald-500 font-bold mr-1">●</span>
                <strong className="text-slate-700 font-semibold">Ruang Aman Terlindungi</strong> — Dipantau langsung oleh Guru BK terpercaya tanpa risiko intimidasi.
              </p>
            </div>
          </div>
        </div>

        {/* KOLOM KIRI (DAFTAR KARTU SCROLL DENGAN STACKING EFECT) */}
        <div className="w-full lg:w-[54%] order-2 lg:order-1 flex flex-col gap-8 pb-0">
          
          {/* KARTU 1: Pengaduan Terenkripsi & Anonim */}
          <div className="sticky top-24 lg:top-32 z-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                Langkah 01
              </span>
              <span className="text-xs text-slate-400 font-medium">Kerahasiaan Awal</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Pengaduan Terenkripsi &amp; Anonim
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Murid atau saksi mengirimkan kronologi kejadian secara tertutup. Tersedia opsi menyamarkan identitas agar terlindungi penuh dari tekanan sosial maupun retaliasi.
            </p>

            {/* Komponen Interaktif: Toggle Switch Samarkan Identitas */}
            <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                    Mode Samarkan Identitas
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Klik tombol untuk mensimulasikan mode pelaporan
                  </span>
                </div>
                
                {/* Toggle Button */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={isAnonymous}
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isAnonymous ? 'bg-red-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      isAnonymous ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Status Box */}
              {isAnonymous ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-2.5 animate-in fade-in duration-150">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-emerald-950">Identitas Disamarkan:</span>{' '}
                    <span className="font-mono text-emerald-800 font-bold">[Anonim #824]</span>{' '}
                    <span className="text-emerald-700/90">(Data terenkripsi)</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-2.5 animate-in fade-in duration-150">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">Nama asli:</span>{' '}
                    Ahmad (Kelas XI-B) terlihat oleh Guru BK
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* KARTU 2: Penerbitan Token & PIN Rahasia */}
          <div className="sticky top-24 lg:top-32 z-20 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                Langkah 02
              </span>
              <span className="text-xs text-slate-400 font-medium">Akses Pantau</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Penerbitan Token &amp; PIN Rahasia
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Sistem otomatis menerbitkan Report ID dan PIN rahasia. Pelapor dapat memantau perkembangan aduan kapan saja secara mandiri tanpa memerlukan login publik.
            </p>

            {/* Komponen Interaktif: Kotak Display PIN Mini & Copy Button */}
            <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Display PIN Pelapor (Contoh Simulasi):
                </span>
                <span className="text-[11px] font-mono text-slate-400">Keamanan PIN 6-Karakter</span>
              </div>

              <div className="flex items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-mono text-base sm:text-lg font-bold text-slate-900 tracking-wider">
                  {PIN_CODE}
                </span>
                
                <button
                  type="button"
                  onClick={handleCopyPin}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copied 
                      ? 'bg-emerald-600 text-white shadow-2xs' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin PIN</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Simpan PIN ini untuk mengecek balasan konselor BK di menu Lacak Laporan.
              </p>
            </div>
          </div>

          {/* KARTU 3: Telaah Objektif & Mediasi BK */}
          <div className="sticky top-24 lg:top-32 z-30 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                Langkah 03
              </span>
              <span className="text-xs text-slate-400 font-medium">Validasi &amp; Mediasi</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Telaah Objektif &amp; Mediasi BK
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Konselor BK memvalidasi bukti tanpa prasangka sepihak, menyusun jadwal konseling tertutup, dan mengawal penyelesaian masalah dengan tenang.
            </p>

            {/* Komponen Interaktif: 3 Tahap Penanganan Selector */}
            <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-3.5">
              <span className="text-xs font-semibold text-slate-700 block">
                Pilih Tahap Penanganan untuk Melihat Catatan BK:
              </span>

              {/* 3 Step Buttons */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className={`py-2 px-2 rounded-xl text-center text-[11px] sm:text-xs font-semibold transition-all cursor-pointer border ${
                    activeStep === 1
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  1. Verifikasi
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className={`py-2 px-2 rounded-xl text-center text-[11px] sm:text-xs font-semibold transition-all cursor-pointer border ${
                    activeStep === 2
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  2. Mediasi
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className={`py-2 px-2 rounded-xl text-center text-[11px] sm:text-xs font-semibold transition-all cursor-pointer border ${
                    activeStep === 3
                      ? 'bg-red-600 text-white border-red-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  3. Konseling
                </button>
              </div>

              {/* Step Detail Card */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {STEP_DETAILS[activeStep].label}
                  </span>
                  <span className="text-[11px] font-medium text-red-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {STEP_DETAILS[activeStep].time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {STEP_DETAILS[activeStep].notes}
                </p>
              </div>
            </div>
          </div>

          {/* KARTU 4: Pemulihan & Jaminan Perlindungan */}
          <div 
            ref={card4Ref}
            className="sticky top-24 lg:top-32 z-40 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/60 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                Langkah 04
              </span>
              <span className="text-xs text-slate-400 font-medium">Jaminan Sekolah</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Pemulihan &amp; Jaminan Perlindungan
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Sekolah menjamin lingkungan belajar bebas intimidasi pasca penanganan. Hak privasi dan perlindungan masa depan murid dijaga sepenuhnya.
            </p>

            {/* Komponen Interaktif: Checklist Pakta Perlindungan Siswa */}
            <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-4">
              <span className="text-xs font-semibold text-slate-800 block">
                Pakta Perlindungan Siswa (Komitmen Sekolah):
              </span>

              <div className="space-y-2.5">
                {/* Checklist 1 */}
                <label 
                  onClick={() => setCheckedRetaliation(!checkedRetaliation)}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors select-none"
                >
                  <div className="pt-0.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      checkedRetaliation ? 'bg-red-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {checkedRetaliation && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="text-xs leading-snug">
                    <span className="font-semibold text-slate-900 block">Jaminan Bebas Retaliasi</span>
                    <span className="text-slate-500">Perlindungan dari sanksi sosial atau intimidasi balasan.</span>
                  </div>
                </label>

                {/* Checklist 2 */}
                <label 
                  onClick={() => setCheckedFollowup(!checkedFollowup)}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors select-none"
                >
                  <div className="pt-0.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      checkedFollowup ? 'bg-red-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {checkedFollowup && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="text-xs leading-snug">
                    <span className="font-semibold text-slate-900 block">Sesi Follow-up Mingguan Aktif</span>
                    <span className="text-slate-500">Monitoring berkala kondisi sosial siswa di kelas.</span>
                  </div>
                </label>
              </div>

              {/* Tombol CTA */}
              <div className="pt-1">
                <Link
                  href="/report"
                  className="w-full py-3 px-5 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 group"
                >
                  <span>Coba Buat Aduan Sekarang</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
