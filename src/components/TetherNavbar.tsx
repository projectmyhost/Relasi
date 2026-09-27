'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAuth } from '@/lib/authContext';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  FileText,
  Settings,
  ShieldAlert
} from 'lucide-react';

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.16,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.16,
      ease: 'easeOut',
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: 'easeOut',
    },
  },
};

export default function TetherNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, switchRole, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [currentHash, setCurrentHash] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const role = currentUser?.role || 'guest';

  // Track hash and query string for exact active link pill styling
  useEffect(() => {
    const updateLocationState = () => {
      if (typeof window !== 'undefined') {
        setCurrentHash(window.location.hash || '');
        setCurrentSearch(window.location.search || '');
      }
    };

    updateLocationState();
    window.addEventListener('hashchange', updateLocationState);
    window.addEventListener('popstate', updateLocationState);
    return () => {
      window.removeEventListener('hashchange', updateLocationState);
      window.removeEventListener('popstate', updateLocationState);
    };
  }, [pathname]);

  // Smooth scroll helper with header offset
  const scrollToSection = (targetId: string) => {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(targetId);
    if (!element) return;

    // Offset for floating capsule header (approx 90px)
    const navbarOffset = 90;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - navbarOffset);

    // If Lenis smooth scroll instance is present
    if ((window as any).lenis && typeof (window as any).lenis.scrollTo === 'function') {
      (window as any).lenis.scrollTo(offsetPosition, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    if ((window as any).lenis && typeof (window as any).lenis.scrollTo === 'function') {
      (window as any).lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll smoothly if page loaded with a section hash
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        scrollToSection(hashId);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Nav link click handler for smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        setMobileMenuOpen(false);
        scrollToSection(targetId);
        setCurrentHash(`#${targetId}`);
        window.history.pushState(null, '', `#${targetId}`);
      } else {
        setMobileMenuOpen(false);
      }
      return;
    }

    if (href === '/') {
      if (pathname === '/') {
        e.preventDefault();
        setMobileMenuOpen(false);
        scrollToTop();
        setCurrentHash('');
        window.history.pushState(null, '', '/');
      } else {
        setMobileMenuOpen(false);
      }
      return;
    }

    setMobileMenuOpen(false);
  };

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

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Logo destination based on role focus
  const getLogoHref = () => {
    if (role === 'counselor') return '/counselor';
    if (role === 'super_admin') return '/admin/super';
    return '/';
  };

  // Nav link style: soft gray rounded pill for active state
  const getLinkClass = (active: boolean) =>
    `px-3.5 lg:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${active
      ? 'text-slate-950 bg-black/[0.06] font-semibold'
      : 'text-slate-600 hover:text-slate-950 hover:bg-black/[0.03]'
    }`;

  // Role-based navigation links specification
  const getNavLinks = () => {
    if (role === 'student') {
      // 2. User / Siswa: Beranda, Cara Kerja, Keamanan, FAQ, Laporan Saya
      return [
        { label: 'Beranda', href: '/' },
        { label: 'Cara Kerja', href: '/#cara-kerja' },
        { label: 'Keamanan', href: '/#keamanan' },
        { label: 'FAQ', href: '/#faq' },
        { label: 'Laporan Saya', href: '/my-reports' },
      ];
    }

    if (role === 'counselor') {
      // 3. Guru BK: Kasus, Dashboard, Lacak Laporan, Konseling
      return [
        { label: 'Kasus', href: '/counselor/cases' },
        { label: 'Dashboard', href: '/counselor' },
        { label: 'Lacak Laporan', href: '/track' },
        { label: 'Konseling', href: '/counselor/konseling' },
      ];
    }

    if (role === 'super_admin') {
      // 4. Super Admin: Dashboard, Manajemen Guru, Laporan Statistik only
      return [
        { label: 'Dashboard', href: '/admin/super' },
        { label: 'Manajemen Guru', href: '/admin/super?tab=users' },
        { label: 'Laporan Statistik', href: '/admin/super?tab=encrypted_reports' },
      ];
    }

    // 1. Guest (Not logged in): Beranda, Cara Kerja, Keamanan, FAQ
    return [
      { label: 'Beranda', href: '/' },
      { label: 'Cara Kerja', href: '/#cara-kerja' },
      { label: 'Keamanan', href: '/#keamanan' },
      { label: 'FAQ', href: '/#faq' },
    ];
  };

  const navLinks = getNavLinks();

  // Active link check
  const isActive = (itemHref: string) => {
    // Hash links on homepage (/#cara-kerja, /#keamanan, /#faq)
    if (itemHref.startsWith('/#')) {
      const targetHash = itemHref.replace('/', '');
      return pathname === '/' && currentHash === targetHash;
    }

    // Homepage exact link
    if (itemHref === '/') {
      return pathname === '/' && (!currentHash || currentHash === '#');
    }

    // Parameterized links (e.g. /admin/super?tab=users)
    if (itemHref.includes('?')) {
      const [path, query] = itemHref.split('?');
      if (pathname !== path) return false;
      const targetParams = new URLSearchParams(query);
      const activeParams = new URLSearchParams(currentSearch);
      let match = true;
      targetParams.forEach((val, key) => {
        if (activeParams.get(key) !== val) match = false;
      });
      return match;
    }

    // Admin Super Dashboard link (active if no tab query or tab=settings)
    if (itemHref === '/admin/super' && pathname === '/admin/super') {
      const activeParams = new URLSearchParams(currentSearch);
      const tab = activeParams.get('tab');
      return !tab || tab === 'settings';
    }

    // Exact path match
    if (pathname === itemHref) return true;

    // Cases dossier subroutes
    if (itemHref === '/counselor/cases' && pathname.startsWith('/counselor/cases')) return true;

    // Counselor dashboard root only
    if (itemHref === '/counselor') return pathname === '/counselor';

    // Other nested paths
    if (itemHref !== '/' && pathname.startsWith(itemHref + '/')) return true;

    return false;
  };

  // User display name helper
  const getDisplayName = () => {
    if (role === 'student') {
      return currentUser.name ? currentUser.name.split(' ').slice(0, 2).join(' ') : 'Dimas Surya';
    }
    if (role === 'counselor') {
      return currentUser.name ? currentUser.name.split(',')[0] : 'Ibu Siti Rahmawati';
    }
    if (role === 'super_admin') {
      return 'Administrator';
    }
    return currentUser.name;
  };

  // Whether current role shows "Buat Laporan" button
  const hasReportButton = role === 'guest' || role === 'student';

  return (
    <>
      {/* Main Grid-Aligned Navigation Bar */}
      <header
        id="header-outer"
        style={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-xl border-b border-black/[0.06] transition-all font-sans"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full h-16 sm:h-20 flex items-center justify-between text-slate-900">

          {/* GROUP 1 (LEFT): Wordmark “RELASI” aligned with Hero Content Grid */}
          <div className="flex items-center min-w-[120px] sm:min-w-[160px] lg:min-w-[180px] justify-start">
            <Link
              href={getLogoHref()}
              onClick={(e) => {
                if ((role === 'guest' || role === 'student') && pathname === '/') {
                  e.preventDefault();
                  scrollToTop();
                  setCurrentHash('');
                  window.history.pushState(null, '', '/');
                }
              }}
              className="flex items-center group py-0.5 !m-0"
              id="logo"
              aria-label="RELASI Beranda"
            >
              <span className="text-xl sm:text-[22px] font-black tracking-[-0.035em] text-slate-950 group-hover:text-[#E02B2B] transition-colors select-none">
                RELASI
              </span>
            </Link>
          </div>

          {/* GROUP 2 (CENTER): Navigation links with soft gray pill active style & smooth scroll */}
          <nav className="hidden md:flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 flex-1">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={getLinkClass(active)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* GROUP 3 (RIGHT): Auth & Role Profile Actions (Balanced, Work-focused, No heaviness) */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-[120px] sm:min-w-[160px] lg:min-w-[180px]">

            {/* 1. GUEST RIGHT SIDE: “Masuk ▾” dropdown + Red button “Buat Laporan” */}
            {role === 'guest' && (
              <div className="relative hidden sm:block" ref={guestDropdownRef}>
                <button
                  type="button"
                  onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-950 hover:bg-black/[0.03] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Masuk</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${guestDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {guestDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-44 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-1.5 space-y-0.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/login"
                      onClick={() => setGuestDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Masuk</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setGuestDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>Daftar</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* 2, 3, 4. LOGGED-IN USERS (Siswa, Guru BK, Super Admin): Avatar + Name with dropdown */}
            {role !== 'guest' && (
              <div className="relative hidden sm:block" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-black/[0.03] p-1 pr-2.5 rounded-full transition-all cursor-pointer border border-transparent hover:border-black/[0.04]"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=f8fafc&textColor=0f172a`}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-medium text-slate-700 truncate max-w-[95px] sm:max-w-[130px]">
                    {getDisplayName()}
                  </span>

                  {/* Subtle role badge for work focus on counselor & admin */}
                  {role === 'counselor' && (
                    <span className="hidden xl:inline-flex text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
                      Guru BK
                    </span>
                  )}
                  {role === 'super_admin' && (
                    <span className="hidden xl:inline-flex text-[10px] font-semibold text-slate-100 bg-slate-900 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}

                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.roleLabel}</p>
                    </div>

                    {/* Profil Saya: Included for User / Siswa & Guru BK. EXCLUDED for Super Admin */}
                    {role !== 'super_admin' && (
                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Profil Saya</span>
                      </Link>
                    )}

                    {/* Pengaturan: Available for User/Siswa, Guru BK, and Super Admin */}
                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Pengaturan</span>
                    </Link>

                    <div className="h-px bg-slate-100 my-1"></div>

                    {/* Keluar: Triggers logout confirmation modal */}
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

            {/* Desktop "Buat Laporan" Button */}
            {hasReportButton && (
              <Link
                href="/report"
                style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                className="hidden md:inline-flex shrink-0 px-4 sm:px-4.5 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-semibold !bg-[#E02B2B] hover:!bg-[#c92424] !text-white shadow-[0_2px_10px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 items-center gap-1.5 cursor-pointer"
              >
                <span>Buat Laporan</span>
              </Link>
            )}

            {/* Mobile Actions: "Buat Laporan" button (when closed) + Toggle */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
              <AnimatePresence>
                {!mobileMenuOpen && hasReportButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link
                      href="/report"
                      style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                      className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold !bg-[#E02B2B] hover:!bg-[#c92424] !text-white shadow-[0_2px_8px_rgba(224,43,43,0.2)] active:scale-[0.99] transition-all flex items-center cursor-pointer"
                    >
                      <span>Buat Laporan</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 p-1.5 rounded-full text-slate-700 hover:bg-black/[0.05] transition cursor-pointer flex items-center justify-center relative overflow-hidden"
                aria-label={mobileMenuOpen ? "Tutup Menu Navigasi" : "Buka Menu Navigasi"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="icon-close"
                      initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-slate-900" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon-menu"
                      initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex items-center justify-center"
                    >
                      <Menu className="w-5 h-5 text-slate-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Attached Dropdown Menu (Directly below navbar, NOT a centered modal) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 px-4 pt-2 pb-4 pointer-events-auto">
              <motion.div 
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full bg-white rounded-3xl p-5 shadow-2xl border border-slate-200/90 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-3.5 origin-top"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Menu links vertikal: Beranda (active state), Cara Kerja, Keamanan, FAQ */}
                <nav className="flex flex-col gap-1 text-sm font-medium" aria-label="Menu Mobile">
                  {navLinks.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div key={item.label} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`px-4 py-3 rounded-2xl transition-all block ${
                            active 
                              ? 'bg-[#ECE9E2] text-slate-900 font-semibold' 
                              : 'text-slate-800 font-medium hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Primary Action: 1 tombol merah "Buat Laporan" */}
                {hasReportButton && (
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/report"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                      className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-center shadow-[0_2px_10px_rgba(224,43,43,0.22)] active:scale-[0.99] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      Buat Laporan
                    </Link>
                  </motion.div>
                )}

                {/* Secondary Actions: Dua tombol berdampingan ("Masuk" dan "Daftar") for guest, or profile for logged in */}
                <motion.div variants={itemVariants}>
                  {role === 'guest' ? (
                    <div className="grid grid-cols-2 gap-3 text-center text-sm font-semibold">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm text-center transition flex items-center justify-center cursor-pointer shadow-2xs"
                      >
                        Masuk
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm text-center transition flex items-center justify-center cursor-pointer shadow-2xs"
                      >
                        Daftar
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-3 px-2 py-1">
                        <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=f8fafc&textColor=0f172a`}
                            alt={currentUser.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</span>
                          <span className="text-[11px] text-slate-500 truncate">{currentUser.roleLabel}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {role !== 'super_admin' && (
                          <Link
                            href="/profile"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition flex items-center gap-2"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            <span>Profil Saya</span>
                          </Link>
                        )}
                        <Link
                          href="/settings"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span>Pengaturan</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="w-full px-3 py-2 text-left text-xs font-semibold text-[#E02B2B] hover:bg-red-50/70 rounded-xl transition flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-[#E02B2B]" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

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
