'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function TetherFooter() {
  return (
    <footer className="w-full bg-[#F6F4F0] border-t border-slate-200/80 pt-16 pb-12 text-slate-700 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#E02B2B] flex items-center justify-center text-white shadow-sm font-medium text-sm">
                RS
              </div>
              <span className="text-xl font-medium tracking-tight text-slate-900 group-hover:text-[#E02B2B] transition-colors">
                Ruang<span className="text-[#E02B2B]">Suara</span>
              </span>
            </Link>
            <h3 className="text-base sm:text-lg font-medium text-slate-900 leading-snug max-w-md">
              Membangun Lingkungan Pendidikan yang Bebas Kekerasan dan Ramah Anak.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              Platform pengaduan mandiri terenkripsi bagi siswa dan pendukung investigasi terstruktur guru BK berstandar Permendikbudristek No. 46 Tahun 2023.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Enkripsi PIN 6-Digit Mandiri Aktif</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-medium">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <span className="text-slate-900 font-medium uppercase tracking-wider text-[11px]">Navigasi</span>
              <Link href="/" className="text-slate-600 hover:text-[#E02B2B] transition">Beranda</Link>
              <Link href="/#overview" className="text-slate-600 hover:text-[#E02B2B] transition">Overview</Link>
              <Link href="/#features" className="text-slate-600 hover:text-[#E02B2B] transition">Alur Kasus</Link>
              <Link href="/#faq" className="text-slate-600 hover:text-[#E02B2B] transition">Tanya Jawab</Link>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-3">
              <span className="text-slate-900 font-medium uppercase tracking-wider text-[11px]">Layanan</span>
              <Link href="/report" className="text-[#E02B2B] font-medium hover:underline transition">Buat Laporan</Link>
              <Link href="/track" className="text-slate-600 hover:text-[#E02B2B] transition">Lacak Status PIN</Link>
              <Link href="/counselor" className="text-slate-600 hover:text-[#E02B2B] transition">Portal Guru BK</Link>
              <Link href="/login" className="text-slate-600 hover:text-[#E02B2B] transition">Masuk Akun</Link>
              <Link href="/register" className="text-slate-600 hover:text-[#E02B2B] transition">Daftar Siswa</Link>
            </div>

            {/* Emergency & Support */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-slate-900 font-medium uppercase tracking-wider text-[11px]">Bantuan Darurat</span>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[#E02B2B] font-medium block text-sm">Hotline SAPA: 129</span>
                <span className="text-slate-500 text-[11px] block">Kementerian PPPA RI</span>
              </div>
              <span className="text-slate-500 text-[11px]">Layanan BK Sekolah: Senin–Jumat 07.30–15.00 WIB</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 RuangSuara. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Permendikbudristek No. 46/2023</span>
            <span>•</span>
            <span>Kode Etik ABKIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
