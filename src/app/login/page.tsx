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
  Info,
  X
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
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [selectedDemoRole, setSelectedDemoRole] = useState<'student' | 'counselor' | 'admin' | null>(null);

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
      setEmail('siswa@sekolah.sch.id');
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
    <div className="relative w-full min-h-[calc(100vh-5.5rem)] flex items-center justify-center px-4 py-8 sm:py-12 overflow-hidden">
      <div className="w-full max-w-[440px] space-y-6 sm:space-y-7 my-auto">
        
        {/* 1. Branding & Header */}
        <div className="text-center space-y-2">
          {/* Empathetic Headline */}
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-950 tracking-tight leading-tight">
            Ruang <span className="text-[#E02B2B]">Aman</span> Dimulai dari Sini
          </h1>

          {/* Reassuring Subtitle */}
          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-sm mx-auto">
            Identitasmu terlindungi. Ceritakan keluh kesah dan laporanmu tanpa rasa was-was.
          </p>
        </div>

        {/* 2 & 3. Styling Card Form (Auth Box) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100/80 shadow-xl shadow-slate-200/50 space-y-5 transition-all">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field Email */}
            <div className="space-y-1.5 group">
              <label 
                htmlFor="login-email" 
                className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                <span>Alamat Email</span>
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSelectedDemoRole(null);
                }}
                placeholder="contoh: siswa@sekolah.sch.id"
                className="w-full px-3.5 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/40 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>

            {/* Field Kata Sandi */}
            <div className="space-y-1.5 group">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="login-password" 
                  className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                  <span>Kata Sandi</span>
                </label>
                
                {/* Lupa Kata Sandi Helper Link */}
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(!showForgotNotice)}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:underline cursor-pointer"
                >
                  Lupa kata sandi?
                </button>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSelectedDemoRole(null);
                  }}
                  placeholder="Masukkan sandi rahasiamu"
                  className="w-full px-3.5 pr-11 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/40 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-red-500"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Reassuring Helpful Notice for Forgot Password */}
            {showForgotNotice && (
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900 flex items-start justify-between gap-2.5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <p className="font-semibold text-amber-950 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Pemulihan Kata Sandi
                  </p>
                  <p className="text-amber-900/90 leading-relaxed">
                    Demi keamanan dan kerahasiaan identitasmu, pemulihan akun dapat divalidasi langsung secara privat melalui Guru BK atau Admin IT sekolah.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(false)}
                  className="text-amber-600 hover:text-amber-800 p-1 shrink-0 rounded hover:bg-amber-100/60 cursor-pointer transition-colors"
                  aria-label="Tutup pemberitahuan pemulihan kata sandi"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in">
                {errorMessage}
              </div>
            )}

            {/* 4. Tombol Utama (CTA) */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
              className="group w-full py-3 sm:py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm !text-white !bg-[#E02B2B] hover:!bg-[#c92424] shadow-[0_2px_10px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Melanjutkan ke Ruang Aman...</span>
                </>
              ) : (
                <>
                  <span>Lanjutkan ke Ruang Aman</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* 4. Section Demo Role Pill Switcher */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase block text-center">
              UJI COBA ROLE (MODE DEMO)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectDemo('student')}
                className={`py-2 px-2 rounded-xl text-center text-xs font-medium transition cursor-pointer border flex items-center justify-center ${
                  selectedDemoRole === 'student'
                    ? 'bg-red-50 border-red-300 text-[#E02B2B]'
                    : 'bg-slate-100/80 border-slate-200/60 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                1. Siswa
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('counselor')}
                className={`py-2 px-2 rounded-xl text-center text-xs font-medium transition cursor-pointer border flex items-center justify-center ${
                  selectedDemoRole === 'counselor'
                    ? 'bg-red-50 border-red-300 text-[#E02B2B]'
                    : 'bg-slate-100/80 border-slate-200/60 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                2. Guru BK
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo('admin')}
                className={`py-2 px-2 rounded-xl text-center text-xs font-medium transition cursor-pointer border flex items-center justify-center ${
                  selectedDemoRole === 'admin'
                    ? 'bg-red-50 border-red-300 text-[#E02B2B]'
                    : 'bg-slate-100/80 border-slate-200/60 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                3. Super Admin
              </button>
            </div>
          </div>

          {/* Link Registrasi Bawah */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Belum punya akun?{' '}
              <Link 
                href="/register" 
                className="font-medium text-[#E02B2B] hover:text-[#c92424] hover:underline transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E02B2B] rounded"
              >
                Daftarkan akunmu secara mandiri &amp; aman.
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
