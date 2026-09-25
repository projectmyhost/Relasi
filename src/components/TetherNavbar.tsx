'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { 
  Menu, 
  X, 
  LogOut,
  AlertCircle
} from 'lucide-react';

export default function TetherNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const role = currentUser?.role || 'guest';

  // Uniform link class: text-sm, font-medium, perfectly aligned
  const getLinkClass = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
      active
        ? 'text-slate-900 bg-black/[0.06]'
        : 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.03]'
    }`;

  return (
    <>
      {/* Floating Centered Capsule Navbar (Inter Typography & Role-Based Navigation) */}
      <header 
        id="header-outer"
        style={{ opacity: 1 }}
        className="force-contained-rows fixed top-0 left-0 right-0 z-50 w-fit max-w-[calc(100vw-24px)] sm:max-w-[calc(100vw-48px)] mx-auto mt-4 sm:mt-6 bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.06)] px-3 sm:px-5 py-2 flex items-center gap-3 sm:gap-5 transition-all font-sans text-slate-900"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" id="logo">
          <div className="w-7 h-7 rounded-lg bg-[#E02B2B] flex items-center justify-center text-white text-xs font-medium tracking-tight transition-transform group-hover:scale-105">
            RS
          </div>
          <span className="text-base font-medium tracking-tight text-slate-900 group-hover:text-[#E02B2B] transition-colors">
            Ruang<span className="text-[#E02B2B]">Suara</span>
          </span>
        </Link>

        {/* Desktop Navigation Links — All text-sm font-medium, uniform size & weight */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          {/* 1. Beranda (Universal for all roles) */}
          <Link
            href="/"
            className={getLinkClass(isActive('/'))}
          >
            Beranda
          </Link>

          {/* 2. GUEST (Tamu / Pengunjung Umum / Belum Login) */}
          {role === 'guest' && (
            <Link
              href="/track"
              className={getLinkClass(isActive('/track'))}
            >
              Lacak PIN
            </Link>
          )}

          {/* 3. STUDENT (Siswa Terdaftar) - Hanya Laporan Saya, tidak cek PIN manual */}
          {role === 'student' && (
            <Link
              href="/my-reports"
              className={getLinkClass(isActive('/my-reports'))}
            >
              Laporan Saya
            </Link>
          )}

          {/* 4. COUNSELOR (Guru BK) — Tersedia saat login akun Guru BK */}
          {role === 'counselor' && (
            <>
              <Link
                href="/counselor"
                className={getLinkClass(pathname === '/counselor')}
              >
                Guru BK
              </Link>
              <Link
                href="/counselor/cases"
                className={getLinkClass(isActive('/counselor/cases'))}
              >
                Berkas Kasus
              </Link>
              <Link
                href="/counselor/signals"
                className={getLinkClass(isActive('/counselor/signals'))}
              >
                Pola Kejadian
              </Link>
              <Link
                href="/track"
                className={getLinkClass(isActive('/track'))}
              >
                Lacak PIN
              </Link>
            </>
          )}

          {/* 5. SUPER ADMIN (Data Super Admin untuk mengelola website & sistem) */}
          {role === 'super_admin' && (
            <>
              <Link
                href="/admin/super"
                className={getLinkClass(isActive('/admin/super'))}
              >
                Panel Admin
              </Link>
              <Link
                href="/counselor"
                className={getLinkClass(pathname === '/counselor')}
              >
                Guru BK
              </Link>
              <Link
                href="/counselor/cases"
                className={getLinkClass(isActive('/counselor/cases'))}
              >
                Berkas Kasus
              </Link>
            </>
          )}
        </nav>

        {/* Right Action Area: Auth & CTA — Standardized text-sm font-medium */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* User Logged In Badge & Logout */}
          {role !== 'guest' ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border truncate max-w-[140px] ${
                role === 'super_admin' 
                  ? 'bg-slate-900 text-white border-slate-800' 
                  : role === 'counselor'
                  ? 'bg-red-50 text-[#E02B2B] border-red-200/70'
                  : 'bg-slate-100 text-slate-800 border-slate-200/80'
              }`}>
                {role === 'super_admin' ? 'Super Admin' : role === 'counselor' ? 'Guru BK' : currentUser.name}
              </span>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                title="Keluar Akun"
                className="p-1.5 text-slate-500 hover:text-[#E02B2B] hover:bg-red-50 rounded-full transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
              <Link
                href="/login"
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/login') 
                    ? 'text-[#E02B2B] bg-red-50' 
                    : 'hover:text-slate-900 hover:bg-black/[0.03]'
                }`}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/register') 
                    ? 'text-[#E02B2B] bg-red-50' 
                    : 'hover:text-slate-900 hover:bg-black/[0.03]'
                }`}
              >
                Daftar
              </Link>
            </div>
          )}

          {/* Primary Action Button: Buat Laporan (ALWAYS RED #E02B2B, never black) */}
          <Link
            href="/report"
            style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
            className="shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm font-medium !bg-[#E02B2B] hover:!bg-[#c92424] !text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Buat Laporan</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-700 hover:bg-black/[0.05] transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown Card */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden font-sans"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-black/[0.08] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Navigasi ({role === 'super_admin' ? 'Super Admin' : role === 'counselor' ? 'Guru BK' : role === 'student' ? 'Siswa' : 'Publik'})
              </span>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-2xl transition ${
                  isActive('/') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                }`}
              >
                Beranda
              </Link>

              {/* Guest links */}
              {role === 'guest' && (
                <Link
                  href="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl transition ${
                    isActive('/track') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                  }`}
                >
                  Lacak Status PIN
                </Link>
              )}

              {/* Student links - Hanya Laporan Saya */}
              {role === 'student' && (
                <Link
                  href="/my-reports"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl transition ${
                    isActive('/my-reports') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                  }`}
                >
                  Riwayat Laporan Saya
                </Link>
              )}

              {/* Counselor links */}
              {role === 'counselor' && (
                <>
                  <Link
                    href="/counselor"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      pathname === '/counselor' ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Dashboard Guru BK
                  </Link>
                  <Link
                    href="/counselor/cases"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      isActive('/counselor/cases') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Berkas Kasus Aktif
                  </Link>
                  <Link
                    href="/counselor/signals"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      isActive('/counselor/signals') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Pola Korelasi Kejadian
                  </Link>
                  <Link
                    href="/track"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      isActive('/track') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Lacak Status PIN
                  </Link>
                </>
              )}

              {/* Super Admin links */}
              {role === 'super_admin' && (
                <>
                  <Link
                    href="/admin/super"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      isActive('/admin/super') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Panel Tata Kelola Web &amp; Sistem
                  </Link>
                  <Link
                    href="/counselor"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      pathname === '/counselor' ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Portal Guru BK
                  </Link>
                  <Link
                    href="/counselor/cases"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl transition ${
                      isActive('/counselor/cases') ? 'bg-red-50 text-[#E02B2B]' : 'hover:bg-slate-50'
                    }`}
                  >
                    Manajemen Berkas Kasus
                  </Link>
                </>
              )}

              {/* Mobile CTA: ALWAYS RED */}
              <Link
                href="/report"
                onClick={() => setMobileMenuOpen(false)}
                style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                className="px-4 py-2.5 rounded-2xl font-medium !bg-[#E02B2B] hover:!bg-[#c92424] !text-white transition text-center shadow-xs cursor-pointer"
              >
                + Buat Laporan Baru
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100">
              {role !== 'guest' ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-800">{currentUser.name}</span>
                    <span className="text-[11px] text-slate-500">{currentUser.roleLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="text-xs text-red-600 font-medium hover:underline cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-medium">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Masuk Akun
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Daftar Siswa
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal Popup */}
      {showLogoutConfirm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div 
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E02B2B] flex items-center justify-center mx-auto border border-red-100">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-medium text-slate-900 tracking-tight">
                Konfirmasi Keluar Akun
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apakah Anda yakin ingin keluar dari akun <strong className="text-slate-800">{currentUser.name}</strong>? Anda harus masuk kembali untuk mengakses berkas dan laporan Anda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setShowLogoutConfirm(false);
                  router.push('/');
                }}
                className="w-full py-2.5 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] text-white text-xs font-medium transition cursor-pointer shadow-sm hover:shadow-md"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
