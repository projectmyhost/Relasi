'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function RegisterPage() {
  const router = useRouter();
  const { loginWithEmail } = useAuth();
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreedToTerms) {
      setErrorMessage('Anda wajib menyetujui Syarat & Ketentuan serta Kebijakan Privasi untuk mendaftar.');
      return;
    }

    if (!name.trim() || !nisn.trim() || !studentClass.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Mohon lengkapi seluruh formulir data pendaftaran.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      loginWithEmail(email, password);
      router.push('/my-reports');
    }, 550);
  };

  return (
    <div className="w-full flex items-center justify-center px-4 font-sans text-slate-900">
      <div className="max-w-[440px] w-full space-y-3.5 my-auto">
        
        {/* Brand Header */}
        <div className="text-center space-y-1">
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
            Pendaftaran Akun <span className="text-[#E02B2B]">Siswa</span>
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Daftarkan diri untuk memantau riwayat laporan &amp; konseling BK
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-3.5">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Nama Lengkap Siswa *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap sesuai data sekolah"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">NISN / No. Induk *</label>
                <input
                  type="text"
                  required
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="0078123456"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Kelas Saat Ini *</label>
                <input
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: XI MIPA 2"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition"
                />
              </div>
            </div>

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
                placeholder="siswa@sekolah.sch.id"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <Lock className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Kata Sandi Baru *</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition"
              />
            </div>

            {/* Checklist Box Syarat & Ketentuan */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-[11px] sm:text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#E02B2B] focus:ring-[#E02B2B] border-slate-300 cursor-pointer accent-[#E02B2B] shrink-0"
                />
                <span className="leading-tight">
                  Saya menyetujui <span className="text-[#E02B2B] font-medium underline">Syarat &amp; Ketentuan</span> serta Kebijakan Privasi perlindungan data siswa RELASI *
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in">
                {errorMessage}
              </div>
            )}

            {/* Professional Modern Button */}
            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className={`w-full py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm text-white transition-all flex items-center justify-center gap-2 ${
                agreedToTerms && !isSubmitting
                  ? '!bg-[#E02B2B] hover:!bg-[#c92424] active:scale-[0.99] shadow-[0_2px_8px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(201,36,36,0.32)] cursor-pointer'
                  : 'bg-slate-400 opacity-50 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Mendaftarkan Akun...</span>
                </>
              ) : (
                <>
                  <span>Daftar Akun Siswa</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-500">Sudah memiliki akun? </span>
            <Link href="/login" className="text-xs font-medium text-[#E02B2B] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400">
          Data identitas dilindungi enkripsi &amp; hanya diakses Guru BK berwenang
        </p>

      </div>
    </div>
  );
}
