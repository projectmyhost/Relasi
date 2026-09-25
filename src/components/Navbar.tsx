'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, LifeBuoy, Search, Menu, X, Lock, Send, BookOpen, AlertCircle } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isBK = pathname.startsWith('/bk');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Emergency Crisis Ribbon */}
      <div className="bg-rose-50 border-b border-rose-200/80 px-4 py-1.5 text-xs text-rose-900 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
            <span>Sedang dalam bahaya fisik atau butuh perlindungan segera?</span>
          </div>
          <Link
            href="/bantuan-darurat"
            className="flex items-center gap-1 font-semibold text-rose-700 hover:text-rose-900 underline underline-offset-2 ml-2"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Hotline Krisis 24 Jam: SAPA 129</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">RuangSuara</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">PPKSP</span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal leading-tight">Sistem Perlindungan Siswa & Konseling BK</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/' ? 'text-teal-700 bg-teal-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/lapor"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === '/lapor' ? 'text-teal-700 bg-teal-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Send className="w-4 h-4 text-teal-600" />
              <span>Buat Laporan</span>
            </Link>
            <Link
              href="/track"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname.startsWith('/track') ? 'text-teal-700 bg-teal-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Pantau Tiket</span>
            </Link>
            <Link
              href="/panduan-siswa"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/panduan-siswa' ? 'text-teal-700 bg-teal-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Panduan Siswa
            </Link>
            <Link
              href="/sop-penanganan"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/sop-penanganan' ? 'text-teal-700 bg-teal-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              SOP Sekolah
            </Link>
            <Link
              href="/tentang"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/tentang' ? 'text-teal-700 bg-teal-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Etika AI
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/lapor"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              Lapor Aman
            </Link>
            {isBK ? (
              <Link
                href="/bk/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Portal BK</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Masuk Guru BK</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/lapor"
              className="px-3 py-1.5 text-xs font-semibold rounded-md text-white bg-teal-600 hover:bg-teal-700"
            >
              Lapor
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Beranda
          </Link>
          <Link
            href="/lapor"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-teal-700 bg-teal-50"
          >
            Buat Laporan Baru
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Pantau Status Laporan
          </Link>
          <Link
            href="/panduan-siswa"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Panduan Siswa
          </Link>
          <Link
            href="/sop-penanganan"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            SOP Penanganan PPKSP
          </Link>
          <Link
            href="/tentang"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Tentang Sistem & Etika AI
          </Link>
          <Link
            href="/bantuan-darurat"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-rose-700 bg-rose-50"
          >
            Hotline Bantuan Darurat
          </Link>
          <div className="pt-2 border-t border-slate-200">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200"
            >
              <Lock className="w-4 h-4 text-slate-600" />
              <span>Gerbang Masuk Staf & Guru BK</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
