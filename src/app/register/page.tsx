'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, User, Mail, Lock, ShieldCheck, Hash, GraduationCap } from 'lucide-react';
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
    <div className="w-full flex items-center justify-center px-4 py-6 sm:py-10 font-sans text-slate-900">
      <div className="max-w-[490px] w-full space-y-5 my-auto">
        
        {/* 1. Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pendaftaran Akun <span className="text-[#E02B2B]">Siswa</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-sm mx-auto">
            Daftarkan diri untuk memantau riwayat laporan &amp; konseling BK secara aman
          </p>
        </div>

        {/* 2. Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
            {/* Nama Lengkap: full width */}
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5 tracking-tight">
                <User className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Nama Lengkap Siswa *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap sesuai data sekolah"
                className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E02B2B]/10 focus:border-[#E02B2B] text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* NISN + Kelas: 2 kolom di desktop, 1 kolom di mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5 tracking-tight">
                  <Hash className="w-3.5 h-3.5 text-[#E02B2B]" />
                  <span>NISN / No. Induk *</span>
                </label>
                <input
                  type="text"
                  required
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="0078123456"
                  className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E02B2B]/10 focus:border-[#E02B2B] text-slate-900 placeholder:text-slate-400 transition-all font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5 tracking-tight">
                  <GraduationCap className="w-3.5 h-3.5 text-[#E02B2B]" />
                  <span>Kelas Saat Ini *</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: XI MIPA 2"
                  className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E02B2B]/10 focus:border-[#E02B2B] text-slate-900 placeholder:text-slate-400 transition-all"
                />
              </div>
            </div>

            {/* Email: full width */}
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5 tracking-tight">
                <Mail className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Alamat Email *</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="siswa@sekolah.sch.id"
                className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E02B2B]/10 focus:border-[#E02B2B] text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Kata Sandi: full width */}
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5 tracking-tight">
                <Lock className="w-3.5 h-3.5 text-[#E02B2B]" />
                <span>Kata Sandi Baru *</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#E02B2B]/10 focus:border-[#E02B2B] text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Checkbox Syarat & Ketentuan */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-slate-600 bg-slate-50/70 hover:bg-slate-50 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/80 transition-colors">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#E02B2B] focus:ring-[#E02B2B] border-slate-300 cursor-pointer accent-[#E02B2B] shrink-0"
                />
                <span className="leading-snug">
                  Saya menyetujui <span className="text-[#E02B2B] font-semibold hover:underline">Syarat &amp; Ketentuan</span> serta Kebijakan Privasi perlindungan data siswa RELASI *
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl sm:rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 font-medium">
                {errorMessage}
              </div>
            )}

            {/* 4. Primary Button */}
            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className={`w-full py-3 sm:py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 group ${
                agreedToTerms && !isSubmitting
                  ? 'bg-[#E02B2B] hover:bg-[#c92424] text-white shadow-[0_4px_16px_rgba(224,43,43,0.22)] hover:shadow-[0_8px_24px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-transparent shadow-none'
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
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* 5. Footer */}
          <div className="text-center pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5">
            <span className="text-xs sm:text-sm text-slate-500">Sudah memiliki akun?</span>
            <Link href="/login" className="text-xs sm:text-sm font-semibold text-[#E02B2B] hover:text-[#c92424] hover:underline transition-colors">
              Masuk di sini
            </Link>
          </div>
        </div>

        {/* Security & Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Data identitas dilindungi enkripsi &amp; hanya diakses Guru BK berwenang</span>
        </div>

      </div>
    </div>
  );
}
