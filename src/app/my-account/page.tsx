'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Key, 
  Download, 
  ShoppingBag
} from 'lucide-react';

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<'downloads' | 'orders' | 'profile'>('downloads');

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Account Hero Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E02B2B] text-white font-medium text-xl flex items-center justify-center shadow-md">
                RS
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-medium">Dashboard Akun Pengguna</h1>
                <p className="text-xs text-slate-400 mt-1 font-normal">pengguna@sekolah.sch.id • Status Akun Terverifikasi</p>
              </div>
            </div>
            <Link
              href="/"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition border border-slate-700"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      {/* Account Workspace */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('downloads')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                  activeTab === 'downloads' ? 'bg-[#E02B2B] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Download className="w-4 h-4" /> Dokumen &amp; Panduan
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                  activeTab === 'orders' ? 'bg-[#E02B2B] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> Riwayat Verifikasi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${
                  activeTab === 'profile' ? 'bg-[#E02B2B] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Key className="w-4 h-4" /> Kredensial Keamanan
              </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
              {activeTab === 'downloads' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h2 className="text-base font-medium text-slate-900">Panduan Resmi &amp; Format SOP</h2>
                    <span className="text-xs text-slate-500 font-normal">Tersedia untuk Pengguna</span>
                  </div>

                  <div className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Buku Panduan Perlindungan Murid PPKSP 2026</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-normal">Pedoman teknis penanganan insiden dan hak privasi korban di sekolah</p>
                    </div>

                    <a
                      href="#modal-action"
                      className="px-5 py-2 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs shadow-2xs transition shrink-0 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh PDF
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-base font-medium text-slate-900 border-b border-slate-100 pb-4">Aktivitas Terverifikasi</h2>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-4 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-slate-900">Verifikasi NISN Siswa</span>
                        <p className="text-slate-500 font-normal">18 September 2026 • Validasi Data Pokok Pendidikan</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-emerald-600">Terverifikasi</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-base font-medium text-slate-900 border-b border-slate-100 pb-4">Kredensial Keamanan Akun</h2>
                  <div className="p-4 rounded-xl bg-slate-50 font-mono text-xs text-slate-700 flex items-center justify-between font-normal">
                    <span>TOKEN-SEC-8924-XXXX-9912</span>
                    <span className="text-emerald-700 font-sans font-medium">Aktif &amp; Terlindungi</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
