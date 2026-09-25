'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  User,
  FileText,
  Settings,
  Briefcase
} from 'lucide-react';

export default function TetherNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchRole, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const role = currentUser?.role || 'guest';

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setGuestDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route changes
  useEffect(() => {
    setGuestDropdownOpen(false);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Nav link style: soft gray rounded pill for active state
  const getLinkClass = (active: boolean) =>
    `px-3.5 lg:px-4 py-2 rounded-full text-sm font-medium transition-all ${
      active
        ? 'text-slate-950 bg-black/[0.06] font-semibold'
        : 'text-slate-600 hover:text-slate-950 hover:bg-black/[0.03]'
    }`;

  // Role-based navigation links
  const getNavLinks = () => {
    if (role === 'student') {
      return [
        { label: 'Beranda', href: '/' },
        { label: 'Cara Kerja', href: '/#cara-kerja' },
        { label: 'Keamanan', href: '/#keamanan' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Laporan Saya', href: '/my-reports' },
      ];
    }
    if (role === 'counselor') {
      return [
        { label: 'Beranda', href: '/' },
        { label: 'Cara Kerja', href: '/#cara-kerja' },
        { label: 'Keamanan', href: '/#keamanan' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Kasus', href: '/counselor/cases' },
      ];
    }
    // Guest default
    return [
      { label: 'Beranda', href: '/' },
      { label: 'Cara Kerja', href: '/#cara-kerja' },
      { label: 'Keamanan', href: '/#keamanan' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Lacak Laporan', href: '/track' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Role Switcher Demo Pill (bottom-left) for quick role toggle */}
      <aside aria-label="Demo Role Switcher" className="fixed bottom-4 left-4 z-50 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl border border-black/[0.08] flex items-center gap-1.5 text-xs font-sans">
        <span className="text-[11px] font-bold text-slate-700 pl-0.5 pr-1">Peran:</span>
        <button
          type="button"
          onClick={() => switchRole('guest')}
          className={`px-2.5 py-1 rounded-xl font-medium transition cursor-pointer ${
            role === 'guest' ? 'bg-[#E02B2B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Guest
        </button>
        <button
          type="button"
          onClick={() => switchRole('student')}
          className={`px-2.5 py-1 rounded-xl font-medium transition cursor-pointer ${
            role === 'student' ? 'bg-[#E02B2B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          User (Siswa)
        </button>
        <button
          type="button"
          onClick={() => switchRole('counselor')}
          className={`px-2.5 py-1 rounded-xl font-medium transition cursor-pointer ${
            role === 'counselor' ? 'bg-[#E02B2B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Guru BK
        </button>
      </aside>

      {/* Floating Centered Capsule Navbar (3-Group Balanced Layout) */}
      <header 
        id="header-outer"
        style={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1040px] mx-auto mt-4 sm:mt-5 px-3 sm:px-4 pointer-events-none font-sans"
        aria-label="Main Navigation"
      >
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-all w-full text-slate-900">
          
          {/* GROUP 1 (LEFT): Logo with generous padding & strong optical weight */}
          <div className="flex items-center min-w-[140px] sm:min-w-[170px] lg:min-w-[190px] justify-start pl-2 sm:pl-3">
            <Link href="/" className="flex items-center group py-0.5" id="logo">
              <span className="text-xl sm:text-[22px] font-black tracking-[-0.035em] text-slate-950 group-hover:text-[#E02B2B] transition-colors select-none">
                RELASI
              </span>
            </Link>
          </div>

          {/* GROUP 2 (CENTER): Navigation links with comfortable breathing room */}
          <nav className="hidden md:flex items-center justify-center gap-1.5 lg:gap-2 flex-1">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={getLinkClass(active)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* GROUP 3 (RIGHT): Auth (Light text dropdown) + Primary Action (Solid red) */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 min-w-[140px] sm:min-w-[170px] lg:min-w-[190px] pr-1 sm:pr-2">
            {/* Guest: Light text button with Dropdown */}
            {role === 'guest' ? (
              <div className="relative hidden sm:block" ref={guestDropdownRef}>
                <button
                  type="button"
                  onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                  className="px-3 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-950 hover:bg-black/[0.03] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Masuk</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${guestDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {guestDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-44 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-1.5 space-y-0.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/login"
                      onClick={() => setGuestDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Masuk</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setGuestDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>Daftar</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-in User & Guru BK: Avatar + Name + Dropdown */
              <div className="relative hidden sm:block" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-black/[0.03] p-1 pr-2 rounded-full transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=f8fafc&textColor=0f172a`}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 truncate max-w-[100px] sm:max-w-[115px]">
                    {role === 'student' ? 'Dimas Surya...' : currentUser.name.split(',')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.roleLabel}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Profil Saya</span>
                    </Link>

                    {role === 'student' ? (
                      <Link
                        href="/my-reports"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>Laporan Saya</span>
                      </Link>
                    ) : (
                      <Link
                        href="/counselor/cases"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                      >
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span>Kasus Saya</span>
                      </Link>
                    )}

                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Pengaturan</span>
                    </Link>

                    <div className="h-px bg-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#E02B2B] hover:bg-red-50/70 transition text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-[#E02B2B]" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Primary Action Button: Solid red, rounded-full */}
            <Link
              href="/report"
              style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
              className="shrink-0 px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold !bg-[#E02B2B] hover:!bg-[#c92424] !text-white shadow-[0_2px_10px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Buat Laporan</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-slate-700 hover:bg-black/[0.05] transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
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
              <span className="text-lg font-black tracking-tight text-slate-900">RELASI</span>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl transition ${
                    isActive(item.href) ? 'bg-black/[0.06] text-slate-900 font-semibold' : 'hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/report"
                onClick={() => setMobileMenuOpen(false)}
                style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                className="mt-2 px-4 py-2.5 rounded-2xl font-semibold !bg-[#E02B2B] hover:!bg-[#c92424] !text-white transition text-center shadow-xs cursor-pointer"
              >
                Buat Laporan
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100">
              {role !== 'guest' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden shrink-0">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=f8fafc&textColor=0f172a`}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
                      <span className="text-[11px] text-slate-500">{currentUser.roleLabel}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Profil Saya
                    </Link>
                    <Link
                      href={role === 'student' ? '/my-reports' : '/counselor/cases'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      {role === 'student' ? 'Laporan Saya' : 'Kasus Saya'}
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Pengaturan
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="px-3 py-2 text-left text-xs text-[#E02B2B] font-semibold hover:bg-red-50 rounded-xl cursor-pointer"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-medium">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Daftar
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
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Konfirmasi Keluar Akun
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apakah Anda yakin ingin keluar dari akun <strong className="text-slate-800">{currentUser.name}</strong>?
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
                className="w-full py-2.5 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] text-white text-xs font-semibold transition cursor-pointer shadow-sm hover:shadow-md"
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
