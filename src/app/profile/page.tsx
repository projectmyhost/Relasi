'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Shield, 
  School, 
  CheckCircle2, 
  Edit3, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email || 'pengguna@sekolah.sch.id');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setIsEditing(false);
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
          <span className="text-xs text-slate-400 font-medium">Relasi ID: {currentUser.id}</span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-xs">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=f8fafc&textColor=0f172a`}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-950">{currentUser.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    <Shield className="w-3 h-3 text-[#E02B2B]" />
                    {currentUser.roleLabel}
                  </span>
                  {currentUser.departmentOrClass && (
                    <span className="text-xs text-slate-500 font-medium">
                      • {currentUser.departmentOrClass}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Batal' : 'Edit Profil'}</span>
            </button>
          </div>

          {saved && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profil berhasil diperbarui.</span>
            </div>
          )}

          {/* Form details */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white disabled:bg-slate-50 disabled:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email Satuan Pendidikan</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white disabled:bg-slate-50 disabled:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Peran Akses</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.roleLabel}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 bg-slate-50 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Satuan Pendidikan / Kelas</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.departmentOrClass || 'SMA Negeri Unggulan 1'}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 bg-slate-50 font-medium"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
