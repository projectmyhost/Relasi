'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDemoRole, setSelectedDemoRole] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Mohon masukkan email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const role = loginWithEmail(email, password);

      if (role === 'super_admin') {
        router.push('/admin/super');
      } else if (role === 'counselor') {
        router.push('/counselor');
      } else {
        router.push('/my-reports');
      }
    }, 450);
  };

  const handleSelectDemo = (role: 'student' | 'counselor' | 'admin') => {
    setSelectedDemoRole(role);
    setErrorMessage('');
    if (role === 'student') {
      setEmail('dimas@sekolah.sch.id');
      setPassword('demo1234');
    } else if (role === 'counselor') {
      setEmail('guru.bk@sekolah.sch.id');
      setPassword('demo1234');
    } else {
      setEmail('admin@sekolah.sch.id');
      setPassword('demo1234');
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 font-sans text-slate-900">
      <div className="max-w-[420px] w-full space-y-4 my-auto">
        
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-[#E02B2B] flex items-center justify-center text-white text-xs font-medium tracking-tight transition-transform group-hover:scale-105">
              <svg 
                className="w-4 h-4 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M6 3.5v17M6 4.5h7.5a5 5 0 0 1 0 10H6M13.5 14.5l6 6.5" 
                  stroke="currentColor" 
                  strokeWidth="2.75" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <circle cx="15.5" cy="9.5" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-[#E02B2B] transition-colors">
              RELASI
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-950 tracking-tight">
            Masuk Portal <span className="text-[#E02B2B]">RELASI</span>
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Akses privat untuk Guru BK dan siswa terdaftar
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <Mail className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Alamat Email *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <Lock className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Kata Sandi *</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in">
                {errorMessage}
              </div>
            )}

            {/* Professional Modern Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm text-white !bg-[#E02B2B] hover:!bg-[#c92424] active:scale-[0.99] transition-all shadow-[0_2px_8px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(201,36,36,0.32)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons (Compact Segmented Pills) */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block text-center">
              Akses Cepat Pengujian Role (Demo):
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleSelectDemo('student')}
                className={`py-1.5 px-2 rounded-lg text-center text-[11px] font-medium transition cursor-pointer border ${
                  selectedDemoRole === 'student'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                1. Siswa
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('counselor')}
                className={`py-1.5 px-2 rounded-lg text-center text-[11px] font-medium transition cursor-pointer border ${
                  selectedDemoRole === 'counselor'
                    ? 'bg-[#E02B2B] text-white border-[#E02B2B] shadow-xs'
                    : 'bg-red-50/70 hover:bg-red-50 text-[#E02B2B] border-red-200/70'
                }`}
              >
                2. Guru BK
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('admin')}
                className={`py-1.5 px-2 rounded-lg text-center text-[11px] font-medium transition cursor-pointer border ${
                  selectedDemoRole === 'admin'
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                3. Super Admin
              </button>
            </div>
          </div>

          <div className="text-center pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-500">Belum punya akun siswa? </span>
            <Link href="/register" className="text-xs font-medium text-[#E02B2B] hover:underline">
              Daftar Sekarang
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400">
          Dilindungi standar kerahasiaan &amp; Permendikbudristek No. 46/2023
        </p>

      </div>
    </div>
  );
}
