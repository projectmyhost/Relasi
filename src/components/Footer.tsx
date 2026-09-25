import React from 'react';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, HeartHandshake, EyeOff, Scale, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">RuangSuara</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sistem pendukung pelaporan dan penanganan kasus perundungan sekolah. Mengedepankan prinsip:
              <span className="block text-teal-400 font-semibold mt-1">«Sistem menemukan pola. Guru BK menentukan konteks.»</span>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
                <EyeOff className="w-3.5 h-3.5 text-teal-400" />
                <span>Collect less, reveal less</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Assists, Humans Decide</span>
              </span>
            </div>
          </div>

          {/* Kolom 1: Navigasi Siswa */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kanal Siswa</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/lapor" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Buat Laporan Rahasia
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Cek Status Laporan (Report ID)
                </Link>
              </li>
              <li>
                <Link href="/track/komunikasi" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Komunikasi Dua Arah Anonim
                </Link>
              </li>
              <li>
                <Link href="/panduan-siswa" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Panduan Pelapor (Korban & Saksi)
                </Link>
              </li>
              <li>
                <Link href="/bantuan-darurat" className="text-rose-400 hover:text-rose-300 font-medium transition-colors">
                  Pusat Bantuan Krisis 24 Jam
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 2: SOP & Prinsip */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tata Kelola & SOP</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sop-penanganan" className="text-slate-400 hover:text-teal-400 transition-colors">
                  SOP Penanganan PPKSP
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Filosofi Sistem & Batasan AI
                </Link>
              </li>
              <li>
                <a
                  href="https://sahabatperempuansekolah.kemdikbud.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal PPKSP Kemendikbud</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:129"
                  className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span>Layanan SAPA 129 (Telepon)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Portal Guru BK */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Portal Guru BK</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/bk/dashboard" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Dashboard Triage BK
                </Link>
              </li>
              <li>
                <Link href="/bk/inbox" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Kotak Masuk Laporan
                </Link>
              </li>
              <li>
                <Link href="/bk/signals" className="text-slate-400 hover:text-teal-400 transition-colors">
                  AI Relationship Detection
                </Link>
              </li>
              <li>
                <Link href="/bk/cases" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Manajemen Berkas Kasus
                </Link>
              </li>
              <li>
                <Link href="/bk/investigasi" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Catatan Wawancara & Klarifikasi
                </Link>
              </li>
              <li>
                <Link href="/bk/tindak-lanjut" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Pemulihan & Tindak Lanjut
                </Link>
              </li>
              <li>
                <Link href="/bk/audit-log" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Audit Log Akses & Keamanan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 RuangSuara. Sesuai Permendikbudristek No. 46 Tahun 2023 tentang Pencegahan dan Penanganan Kekerasan di Lingkungan Satuan Pendidikan.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Prinsip Etika: Multiple Reports ≠ Proof</span>
            <span>•</span>
            <Link href="/tentang" className="text-teal-400 hover:underline">
              Transparansi Algoritma
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
