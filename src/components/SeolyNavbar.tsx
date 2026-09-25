'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Shield, 
  User, 
  Lock, 
  LogOut, 
  FileText, 
  Layers, 
  GitMerge, 
  ChevronDown,
  Phone,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function SeolyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [counselorMenuOpen, setCounselorMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white transition-all duration-200">
      {/* WORDPRESS INSTITUTIONAL TOP UTILITY BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden md:block font-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#E02B2B]" />
              <span>Hotline Darurat SAPA: <strong className="text-white font-semibold">129</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Layanan BK: Senin–Jumat 07.30–15.00 WIB</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-slate-300">Enkripsi PIN Aktif (PPKSP No. 46/2023)</span>
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION HEADER */}
      <div className={`transition-all duration-200 ${
        scrolled ? 'shadow-sm py-3 border-b border-slate-200' : 'border-b border-slate-200/90 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo Brand RELASI */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#E02B2B] flex items-center justify-center text-white shadow-sm transition-transform duration-150 group-hover:scale-[1.02]">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                  Ruang<span className="text-[#E02B2B]">Suara</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                  Sistem Penanganan Kasus Siswa
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
              <Link 
                href="/" 
                className={`hover:text-[#E02B2B] transition-colors py-1 ${
                  pathname === '/' ? 'text-[#E02B2B] font-semibold border-b-2 border-[#E02B2B]' : ''
                }`}
              >
                Beranda
              </Link>

              <Link 
                href="/#workflow" 
                className="hover:text-[#E02B2B] transition-colors py-1"
              >
                Alur Penanganan
              </Link>

              <Link 
                href="/#services" 
                className="hover:text-[#E02B2B] transition-colors py-1"
              >
                Layanan BK
              </Link>

              <Link 
                href="/#principles" 
                className="hover:text-[#E02B2B] transition-colors py-1"
              >
                Prinsip &amp; SOP
              </Link>

              <Link 
                href="/#faq" 
                className="hover:text-[#E02B2B] transition-colors py-1"
              >
                Tanya Jawab
              </Link>

              {/* Menu Khusus Role Siswa */}
              {currentUser.role === 'student' && (
                <Link
                  href="/my-reports"
                  className={`hover:text-[#E02B2B] transition-colors py-1 ${
                    pathname === '/my-reports' ? 'text-[#E02B2B] font-semibold' : ''
                  }`}
                >
                  Laporan Saya
                </Link>
              )}

              {/* Menu Khusus Role Guru BK */}
              {currentUser.role === 'counselor' && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCounselorMenuOpen(!counselorMenuOpen)}
                    onBlur={() => setTimeout(() => setCounselorMenuOpen(false), 200)}
                    className={`flex items-center gap-1 hover:text-[#E02B2B] transition-colors py-1 ${
                      pathname.startsWith('/counselor') ? 'text-[#E02B2B] font-semibold' : ''
                    }`}
                  >
                    <span>Menu Guru BK</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${counselorMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {counselorMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                      <Link
                        href="/counselor"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E02B2B] transition"
                      >
                        <Shield className="w-4 h-4 text-[#E02B2B]" />
                        <span>Antrean Laporan</span>
                      </Link>
                      <Link
                        href="/counselor/cases"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E02B2B] transition"
                      >
                        <Layers className="w-4 h-4 text-amber-600" />
                        <span>Dossier &amp; Timeline</span>
                      </Link>
                      <Link
                        href="/counselor/signals"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E02B2B] transition"
                      >
                        <GitMerge className="w-4 h-4 text-blue-600" />
                        <span>Pemetaan Sinyal</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* Desktop Right Action: Clean Institutional CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/track"
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Lacak Status PIN</span>
              </Link>

              <Link
                href="/report"
                className="px-4 py-2 rounded-lg text-xs font-medium !text-white !bg-[#E02B2B] hover:!bg-[#c92424] shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Buat Laporan Baru</span>
              </Link>

              {currentUser.role === 'guest' ? (
                <div className="flex items-center pl-2 border-l border-slate-200 gap-1.5">
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-lg font-medium text-xs text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Masuk</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold border border-slate-200">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {currentUser.roleLabel}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    title="Keluar / Logout"
                    className="p-1.5 ml-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/report"
                className="px-3 py-1.5 rounded-lg text-xs font-medium !text-white !bg-[#E02B2B] hover:!bg-[#c92424] transition cursor-pointer"
              >
                Lapor
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Buka Menu Navigasi"
                className="p-2 rounded-lg text-slate-700 hover:text-[#E02B2B] hover:bg-slate-100 transition border border-slate-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E02B2B] flex items-center justify-center text-white">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 text-base">RELASI</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Role Indicator in Mobile */}
              {currentUser.role !== 'guest' && (
                <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-0.5">Akun Aktif:</span>
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <span className="text-[11px] text-[#E02B2B] font-medium">{currentUser.roleLabel}</span>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1 text-sm font-medium text-slate-700 mt-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#E02B2B] transition"
                >
                  Beranda
                </Link>

                <Link
                  href="/#workflow"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#E02B2B] transition"
                >
                  Alur Penanganan
                </Link>

                <Link
                  href="/#services"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#E02B2B] transition"
                >
                  Layanan BK
                </Link>

                <Link
                  href="/#principles"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#E02B2B] transition"
                >
                  Prinsip &amp; SOP
                </Link>

                <Link
                  href="/#faq"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#E02B2B] transition"
                >
                  Tanya Jawab
                </Link>

                <Link
                  href="/track"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#E02B2B] transition"
                >
                  Lacak Status Laporan (PIN)
                </Link>

                {currentUser.role === 'student' && (
                  <Link
                    href="/my-reports"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-[#E02B2B] font-semibold transition"
                  >
                    Laporan Saya
                  </Link>
                )}

                {currentUser.role === 'counselor' && (
                  <div className="pt-2 border-t border-slate-200 mt-2 space-y-1">
                    <span className="px-3 text-[10px] uppercase font-semibold text-slate-400 block">Workspace Guru BK:</span>
                    <Link
                      href="/counselor"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-xs text-slate-700 hover:text-[#E02B2B]"
                    >
                      Antrean Laporan
                    </Link>
                    <Link
                      href="/counselor/cases"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-xs text-slate-700 hover:text-[#E02B2B]"
                    >
                      Dossier &amp; Timeline
                    </Link>
                    <Link
                      href="/counselor/signals"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-xs text-slate-700 hover:text-[#E02B2B]"
                    >
                      Pemetaan Sinyal
                    </Link>
                  </div>
                )}
              </nav>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-5 border-t border-slate-200 space-y-2">
              <Link
                href="/report"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 rounded-lg !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs text-center shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Buat Laporan Baru</span>
              </Link>

              {currentUser.role === 'guest' ? (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs text-center hover:bg-slate-50 block"
                >
                  Masuk ke Portal
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
