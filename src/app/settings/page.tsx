'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Settings, 
  Bell, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Smartphone
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);
  const [waNotif, setWaNotif] = useState(false);
  const [privacyMask, setPrivacyMask] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href={currentUser.role === 'counselor' ? '/counselor' : currentUser.role === 'super_admin' ? '/admin/super' : '/'}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>
          <span className="text-xs text-slate-400 font-medium">Pengaturan Akun &amp; Keamanan</span>
        </div>

        {/* Settings Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-950 flex items-center gap-2.5">
              <Settings className="w-6 h-6 text-slate-700" />
              <span>Pengaturan Akun &amp; Preferensi</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Atur notifikasi pembaruan status laporan, keamanan otentikasi, dan preferensi privasi Anda.
            </p>
          </div>

          {saved && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pengaturan berhasil disimpan.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Notification settings */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Notifikasi Pembaruan Laporan</span>
              </h2>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/70 transition cursor-pointer">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Email Notifikasi Status</p>
                    <p className="text-[11px] text-slate-500">Terima email instan ketika ada respon atau tindak lanjut dari Guru BK.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotif}
                    onChange={(e) => setEmailNotif(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E02B2B] focus:ring-[#E02B2B]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/70 transition cursor-pointer">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Pemberitahuan SMS / WhatsApp Darurat</p>
                    <p className="text-[11px] text-slate-500">Kirimkan nomor PIN pelacakan jika laporan berstatus darurat / urgent.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={waNotif}
                    onChange={(e) => setWaNotif(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E02B2B] focus:ring-[#E02B2B]"
                  />
                </label>
              </div>
            </div>

            {/* Privacy settings */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Kerahasiaan &amp; Proteksi Identitas</span>
              </h2>

              <div className="p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">Samarkan Jejak Perangkat</p>
                  <p className="text-[11px] text-slate-500">Jangan simpan riwayat cache formulir di browser perangkat publik atau lab sekolah.</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacyMask}
                  onChange={(e) => setPrivacyMask(e.target.checked)}
                  className="w-4 h-4 rounded text-[#E02B2B] focus:ring-[#E02B2B]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
