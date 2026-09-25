'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Shield, CheckCircle2 } from 'lucide-react';

export default function SeolyFooter() {
  return (
    <footer id="colophon" className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-sm mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E02B2B] flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-tight">
                  Ruang<span className="text-[#E02B2B]">Suara</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                  Sistem Penanganan Kasus Siswa
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              Kanal pelaporan tertutup dan pendukung kerja objektif Guru BK dalam penanganan perundungan di lingkungan sekolah.
            </p>
            <div className="p-3.5 bg-slate-800/90 border border-slate-700/80 rounded-xl max-w-sm">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Kepatuhan Standar PPKSP:</span>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Beroperasi di bawah koordinasi Tim Satgas Sekolah sesuai Permendikbudristek No. 46 Tahun 2023.
              </p>
            </div>
          </div>

          {/* Navigasi Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kanal Siswa</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda Utama</Link></li>
              <li><Link href="/report" className="hover:text-white transition-colors text-red-400 font-medium">Buat Laporan Baru</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Lacak Laporan via PIN</Link></li>
              <li><Link href="/#workflow" className="hover:text-white transition-colors">Alur Penanganan</Link></li>
              <li><Link href="/#principles" className="hover:text-white transition-colors">Prinsip Etika &amp; Privasi</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">Tanya Jawab (FAQ)</Link></li>
            </ul>
          </div>

          {/* Penanganan & Fitur */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Alur Kasus BK</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li><span className="text-slate-300">1. Pelaporan Terenkripsi PIN</span></li>
              <li><span className="text-slate-300">2. Verifikasi &amp; Klarifikasi BK</span></li>
              <li><span className="text-slate-300">3. Pemetaan Sinyal Faktual</span></li>
              <li><span className="text-slate-300">4. Manajemen Dossier Kasus</span></li>
              <li><span className="text-slate-300">5. Mediasi &amp; Konseling Pemulihan</span></li>
            </ul>
          </div>

          {/* Office Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bantuan &amp; Kontak</h4>
            <div className="space-y-3 text-xs text-slate-400 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E02B2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Unit Bimbingan Konseling</span>
                  <span>Gedung Konseling Lt. 1 (Akses Khusus)</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#E02B2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Surat Pengaduan BK</span>
                  <a href="mailto:bk-konseling@sekolah.sch.id" className="hover:text-white transition">bk-konseling@sekolah.sch.id</a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E02B2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Hotline Darurat PPKSP</span>
                  <a href="tel:02177889900" className="hover:text-white transition">(021) 7788-9900</a>
                  <span className="block text-[11px] text-slate-400 font-normal mt-0.5">Hotline Nasional SAPA 129</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© 2026 RELASI – Sistem Penanganan Kasus Satuan Pendidikan.</p>
          <div className="flex items-center gap-6">
            <Link href="/#principles" className="hover:text-slate-300 transition">
              Kebijakan Privasi
            </Link>
            <Link href="/#principles" className="hover:text-slate-300 transition">
              SOP Permendikbudristek 46/2023
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
