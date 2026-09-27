'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroHeadlineTypewriter from '@/components/HeroHeadlineTypewriter';
import SopWorkflowSection from '@/components/SopWorkflowSection';
import { Plus, Minus, PhoneCall, Clock, ShieldCheck, Lock, HeartHandshake } from 'lucide-react';

export default function RelasiHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Initialize and load UI animations and smooth-scrolling scripts in strict sequential order
  useEffect(() => {
    // Prevent browser scroll-restore jump on reload
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Set UI runtime configuration options
    (window as any).wpbCustomElement = 1;
    (window as any).nectarLove = {
      ajaxurl: '',
      postID: '667',
      rooturl: '',
      disqusComments: 'false',
      loveNonce: '',
      mapApiKey: ''
    };
    (window as any).nectarOptions = {
      delay_js: '0',
      smooth_scroll: 'true',
      smooth_scroll_strength: '80',
      quick_search: 'false',
      react_compat: 'disabled',
      header_entrance: 'true',
      body_border_func: 'default',
      disable_box_roll_mobile: 'off',
      body_border_mobile: '0',
      dropdown_hover_intent: 'default',
      simplify_ocm_mobile: '0',
      mobile_header_format: 'default',
      ocm_btn_position: 'default',
      left_header_dropdown_func: 'default',
      ajax_add_to_cart: '0',
      ocm_remove_ext_menu_items: 'remove_images',
      woo_product_filter_toggle: '0',
      woo_sidebar_toggles: 'true',
      woo_sticky_sidebar: '0',
      woo_minimal_product_hover: 'default',
      woo_minimal_product_effect: 'default',
      woo_related_upsell_carousel: 'false',
      woo_product_variable_select: 'default',
      woo_using_cart_addons: 'false',
      view_transitions_effect: ''
    };
    (window as any).nectar_front_i18n = {
      menu: 'Menu',
      next: 'Berikutnya',
      previous: 'Sebelumnya',
      close: 'Tutup',
      slide_of: 'Slide %1$s dari %2$s',
      slide: 'slide'
    };

    const scriptsToLoad = [
      '/assets/js/cb6f2d32_jquery.min.js',
      '/assets/js/5274f11e_jquery-migrate.min.js',
      '/assets/js/15a71d32_jquery.easing.min.js',
      '/assets/js/2ff736ab_priority.js',
      '/assets/js/fdcb39ee_transit.min.js',
      '/assets/js/3c9eb9bb_waypoints.js',
      '/assets/js/96abf166_imagesLoaded.min.js',
      '/assets/js/86a156b8_hoverintent.min.js',
      '/assets/js/bc36f248_jquery.fancybox.js',
      '/assets/js/5cbda29e_anime.min.js',
      '/assets/js/5f180304_superfish.js',
      '/assets/js/cb8a1560_init.js',
      '/assets/js/a64d3a83_nectar-sticky-media-sections.js',
      '/assets/js/5245f7da_nectar-smooth-scroll.js',
      '/assets/js/a516c686_flickity.js',
      '/assets/js/cb225cbe_touchswipe.min.js',
      '/assets/js/b460f2f0_js_composer_front.min.js'
    ];

    let isMounted = true;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if ((window as any).nectarDOMInfo) {
        (window as any).nectarDOMInfo.scrollTop = scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loadScripts = async () => {
      for (const src of scriptsToLoad) {
        if (!isMounted) return;
        await new Promise<void>((resolve) => {
          const existing = document.querySelector(`script[src="${src}"]`);
          if (existing) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => resolve();
          document.body.appendChild(script);
        });
      }

      // Re-trigger dynamic layout calculations and scroll events
      if (typeof (window as any).jQuery !== 'undefined') {
        const $ = (window as any).jQuery;
        setTimeout(() => {
          handleScroll();
          $(window).trigger('resize');
          $(window).trigger('salient-parallax-minimal-refresh');
          $(window).trigger('scroll');
        }, 150);
      }
    };

    loadScripts();

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full relative bg-[#F6F4F0] min-h-screen text-slate-900">

      {/* SKIP LINK */}
      <nav aria-label="Skip links" className="nectar-skip-to-content-wrap" data-nosnippet="">
        <a className="nectar-skip-to-content" href="#ajax-content-wrap">Lewati ke konten utama</a>
      </nav>

      <div className="ocm-effect-wrap">
        <div className="ocm-effect-wrap-inner">
          <div data-header-mobile-fixed="1" id="header-space" style={{ display: 'none', height: 0 }}></div>

          {/* MAIN PAGE CONTAINER */}
          <div id="ajax-content-wrap" className="tether-page-entrance">
            <div className="container-wrap" style={{ paddingBottom: 0, paddingTop: 0 }}>
              <div className="container main-content" role="main" style={{ '--nectar-sticky-top-distance': '128px' } as any}>
                <div className="row">

                  {/* 1. HERO SECTION */}
                  <section
                    className="nectar_section wpb_row vc_row top-level full-width-section loaded first-section min-h-[calc(100vh-100px)] flex flex-col justify-center pt-32 pb-20 sm:pt-36 sm:pb-24 relative overflow-hidden"
                    data-bottom-percent="6%"
                    data-column-margin="default"
                    data-midnight="dark"
                    data-top-percent="6%"
                    id="fws_6ab47266cfb7e"
                    style={{ zIndex: 110 }}
                  >
                    {/* Ambient Glowing Aura Background Layer (Living, Slow-Drifting Warm Crimson & Soft Peach Gradient) */}
                    <div 
                      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" 
                      aria-hidden="true"
                    >
                      {/* Aura Orb 1: Soft Coral / Crimson Red pudar behind and slightly above hero typography */}
                      <div 
                        className="hero-aura-1 absolute -top-[12%] -left-[6%] sm:left-[6%] lg:left-[10%] w-[420px] sm:w-[540px] lg:w-[650px] h-[420px] sm:h-[540px] lg:h-[650px] rounded-full bg-gradient-to-tr from-rose-500/18 via-red-500/16 to-amber-300/14 blur-[80px] sm:blur-[110px]"
                      />

                      {/* Aura Orb 2: Warm Peach / Amber lembut spreading gracefully to the empty space on the right */}
                      <div 
                        className="hero-aura-2 absolute top-[8%] -right-[10%] sm:right-[4%] lg:right-[8%] w-[440px] sm:w-[580px] lg:w-[700px] h-[440px] sm:h-[580px] lg:h-[700px] rounded-full bg-gradient-to-bl from-amber-400/20 via-orange-300/16 to-rose-400/14 blur-[90px] sm:blur-[120px]"
                      />

                      {/* Aura Orb 3: Subtle warm accent connecting lower hero toward the next section */}
                      <div 
                        className="hero-aura-3 absolute -bottom-[15%] left-[20%] sm:left-[30%] lg:left-[35%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-r from-red-400/14 via-rose-300/14 to-amber-200/18 blur-[85px] sm:blur-[105px]"
                      />
                    </div>

                    <div className="row-bg-wrap">
                      <div className="inner-wrap row-bg-layer">
                        <div className="row-bg viewport-desktop"></div>
                      </div>
                    </div>

                    <div className="row_col_wrap_12 span_12 dark w-full relative z-10">
                      <div
                        className="wpb_row vc_row-fluid vc_row full-width-section first-section loaded w-full"
                        data-column-margin="default"
                        data-midnight="dark"
                        id="overview"
                        style={{ paddingTop: 0, paddingBottom: 0, zIndex: 110 }}
                      >
                        <div className="row_col_wrap_12 col span_12 dark left w-full">
                          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                              {/* Left Column: Typographic Narrative & Actions */}
                              <div className="lg:col-span-7 flex flex-col items-start text-left">
                                {/* Eyebrow Pill */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-2xs text-stone-800 text-xs font-semibold mb-6 tracking-wide backdrop-blur-xs">
                                  <span className="w-2 h-2 rounded-full bg-[#E02B2B] animate-pulse" />
                                  <span>Platform Perlindungan &amp; Konseling Siswa Terenkripsi</span>
                                </div>

                                {/* Dynamic Hero Headline with Typewriter Animation */}
                                <HeroHeadlineTypewriter />

                                {/* Subtitle Description */}
                                <p 
                                  className="text-stone-600 text-base sm:text-lg font-normal mt-5 mb-8 leading-relaxed max-w-xl text-left" 
                                >
                                  Saluran aman dan rahasia untuk menyuarakan apa yang kamu alami. Identitasmu terjaga sepenuhnya, dipantau dan ditangani langsung oleh Guru BK terpercaya.
                                </p>

                                {/* Action Buttons - Dribbble Modern Aesthetics */}
                                <div className="flex flex-wrap items-center gap-3.5">
                                  {/* Tombol 1: Buat Laporan */}
                                  <Link
                                    href="/report"
                                    className="h-12 px-7 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer inline-flex items-center justify-center tracking-tight"
                                  >
                                    Buat Laporan Sekarang
                                  </Link>

                                  {/* Tombol 2: Pelajari Cara Kerja */}
                                  <Link
                                    href="/#cara-kerja"
                                    className="h-12 px-6 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 font-semibold text-sm shadow-xs transition-all active:scale-[0.99] cursor-pointer inline-flex items-center justify-center tracking-tight"
                                  >
                                    Pelajari Cara Kerja
                                  </Link>
                                </div>

                                {/* Quick Trust Micro-Metrics */}
                                <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-stone-200/70 w-full max-w-lg">
                                  <div>
                                    <div className="text-sm font-bold text-stone-900">100% Anonim</div>
                                    <div className="text-[11px] text-stone-500 mt-0.5">Tanpa pelacakan IP</div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-stone-900">Enkripsi 256-Bit</div>
                                    <div className="text-[11px] text-stone-500 mt-0.5">Standar data rahasia</div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-stone-900">Guru BK Siaga</div>
                                    <div className="text-[11px] text-stone-500 mt-0.5">Etik resmi ABKIN</div>
                                  </div>
                                </div>
                              </div>

                              {/* Right Column: Dribbble-Grade Live Security & Tracking Preview Widget */}
                              <div className="lg:col-span-5 relative w-full pt-4 lg:pt-0">
                                <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                                  
                                  {/* Ambient Card Glow */}
                                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-red-500/12 via-amber-500/8 to-stone-400/10 blur-xl opacity-80 pointer-events-none" />

                                  {/* Main Showcase Card */}
                                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-stone-200/90 shadow-[0_20px_50px_-12px_rgba(28,25,23,0.08)] p-6 sm:p-7 space-y-5">
                                    
                                    {/* Top Bar of Card */}
                                    <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E02B2B] flex items-center justify-center font-bold text-xs border border-red-100/80 shrink-0">
                                          <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <div className="text-xs font-bold text-stone-900">Tiket Terenkripsi</div>
                                          <div className="text-[11px] font-mono text-stone-500">#RL-2026-9042</div>
                                        </div>
                                      </div>
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Dalam Penanganan
                                      </span>
                                    </div>

                                    {/* Timeline Progress */}
                                    <div className="space-y-3">
                                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Tahapan Penanganan</div>
                                      
                                      <div className="space-y-2.5">
                                        {/* Step 1: Terkirim */}
                                        <div className="flex items-center gap-3 text-xs">
                                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                            ✓
                                          </div>
                                          <div className="flex-1 flex items-center justify-between">
                                            <span className="font-medium text-stone-800">Laporan Anonim Terkirim</span>
                                            <span className="text-[11px] text-stone-400">08.12 WIB</span>
                                          </div>
                                        </div>

                                        {/* Step 2: Enkripsi */}
                                        <div className="flex items-center gap-3 text-xs">
                                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                            ✓
                                          </div>
                                          <div className="flex-1 flex items-center justify-between">
                                            <span className="font-medium text-stone-800">Identitas Divalidasi &amp; Dienkripsi</span>
                                            <span className="text-[11px] text-stone-400">08.13 WIB</span>
                                          </div>
                                        </div>

                                        {/* Step 3: Pendampingan Aktif */}
                                        <div className="flex items-center gap-3 text-xs">
                                          <div className="w-5 h-5 rounded-full bg-[#E02B2B] text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">
                                            •
                                          </div>
                                          <div className="flex-1 flex items-center justify-between">
                                            <span className="font-semibold text-stone-900">Konseling Tertutup Guru BK</span>
                                            <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">Berlangsung</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Message Quote Box */}
                                    <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-3.5 text-xs text-stone-700 leading-relaxed">
                                      <div className="flex items-center gap-1.5 mb-1.5 font-bold text-stone-900 text-[11px]">
                                        <Lock className="w-3.5 h-3.5 text-stone-600" />
                                        <span>Catatan Rahasia Konselor</span>
                                      </div>
                                      &ldquo;Identitas pelapor sepenuhnya disamarkan. Jadwal klarifikasi tertutup telah disiapkan bersama TPPK sekolah.&rdquo;
                                    </div>

                                    {/* Counselor Profile Footer */}
                                    <div className="flex items-center justify-between pt-2 text-xs border-t border-stone-100">
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px]">
                                          BK
                                        </div>
                                        <div>
                                          <div className="font-bold text-stone-900 text-xs">Dra. Nurhayati, M.Pd</div>
                                          <div className="text-[10px] text-stone-500">Konselor Berlisensi ABKIN</div>
                                        </div>
                                      </div>
                                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                                        Siaga Hari Ini
                                      </span>
                                    </div>

                                  </div>

                                  {/* Floating Micro-Badge */}
                                  <div className="hidden sm:flex absolute -top-4 -right-3 bg-white/95 backdrop-blur-md border border-stone-200 shadow-md rounded-2xl px-3.5 py-1.5 items-center gap-2 text-xs text-stone-800">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="font-bold text-xs">Zero-Metadata</span>
                                    <span className="text-stone-400 text-[11px]">Bebas Jejak</span>
                                  </div>

                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 4. SOP & ALUR KERJA BK SECTION (INTERACTIVE STICKY 2-COLUMN) */}
                  <SopWorkflowSection />

                  {/* 5. INTERACTIVE CHAT THREAD & SECURITY ASSURANCE */}
                  <section className="w-full pt-16 sm:pt-20 pb-4" id="keamanan">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-[#E02B2B] uppercase tracking-wider">KEAMANAN &amp; PRIVASI</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                          Konseling &amp; Pelaporan Cepat Interaktif
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base max-w-xl text-center mt-2">
                          Siswa dapat mencurahkan isi hati dan kesaksian dengan rasa aman. Sistem menjamin privasi penuh di setiap tahap komunikasi.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section
                    className="w-full pt-8 pb-16 sm:pb-24"
                    id="fws_6ab47266ddc0c"
                  >
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

                        {/* Left: Chat Thread Message Exchange - Dribbble Crafted Interface */}
                        <div className="lg:col-span-6 flex flex-col justify-center">
                          <div className="p-6 sm:p-7 lg:p-8 bg-white rounded-3xl border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col justify-center overflow-hidden">
                            {/* Panel Micro-Header */}
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-semibold text-stone-800">Simulasi Ruang Aman Terenkripsi</span>
                              </div>
                              <span className="text-[11px] font-mono text-stone-400 bg-stone-50 px-2 py-0.5 rounded border border-stone-200/60">
                                256-bit AES
                              </span>
                            </div>

                            <div className="flex flex-col gap-4 sm:gap-5 w-full">
                              
                              {/* Bubble 1: Incoming from BK */}
                              <div className="flex items-start gap-3 w-full">
                                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs shrink-0 select-none shadow-xs mt-0.5">
                                  BK
                                </div>
                                <div className="bg-stone-100/90 text-stone-800 rounded-2xl rounded-tl-xs p-3.5 sm:p-4 max-w-[85%] sm:max-w-[82%] border border-stone-200/50">
                                  <div className="text-xs font-bold text-stone-900 mb-1">Konselor RELASI</div>
                                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                                    Halo, ceritakan apa yang kamu lihat atau alami. Ruang ini terenkripsi dan privasimu terjaga rapat.
                                  </div>
                                </div>
                              </div>

                              {/* Bubble 2: Outgoing from Student */}
                              <div className="flex items-start justify-end w-full">
                                <div className="bg-[#E02B2B] text-white rounded-2xl rounded-tr-xs p-3.5 sm:p-4 max-w-[88%] sm:max-w-[84%] shadow-sm">
                                  <div className="text-xs font-bold text-white/90 mb-1 text-right">Saksi Murid (Anonim)</div>
                                  <div className="text-xs sm:text-sm text-white leading-relaxed">
                                    Saya melihat pemerasan dan perundungan di lorong lantai 2 saat jam istirahat. Tolong samarkan nama saya.
                                  </div>
                                </div>
                              </div>

                              {/* Bubble 3: Confirmation from System */}
                              <div className="flex items-start gap-3 w-full">
                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 select-none shadow-xs mt-0.5">
                                  ✓
                                </div>
                                <div className="bg-[#FAF8F5] text-stone-800 rounded-2xl rounded-tl-xs p-3.5 sm:p-4 max-w-[88%] sm:max-w-[84%] border border-stone-200/80 shadow-xs">
                                  <div className="text-xs font-bold text-stone-900 mb-1 flex items-center gap-1.5 flex-wrap">
                                    <span>Sistem Keamanan</span>
                                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                                      Terenkripsi
                                    </span>
                                  </div>
                                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                                    Identitas Anda disamarkan. PIN pelacakan rahasia Anda telah diterbitkan:{' '}
                                    <strong className="font-mono text-stone-900 font-bold bg-white px-2 py-0.5 rounded border border-stone-200 shadow-2xs">
                                      RL-7821
                                    </strong>
                                    . Guru BK akan menindaklanjuti secara tertutup.
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* Right: Security & Ethics Principles */}
                        <div className="lg:col-span-6 flex flex-col justify-center">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">

                            <div className="p-6 bg-white border border-stone-200/90 rounded-2xl flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors">
                              <div>
                                <span className="text-xs font-bold text-[#E02B2B] uppercase tracking-wider block mb-2">ZERO-METADATA</span>
                                <h3 className="font-bold text-stone-900 text-base">Anonimitas Mutlak</h3>
                                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">Siswa dapat melapor tanpa menyertakan nama, tanpa pelacakan alamat IP maupun identitas perangkat.</p>
                              </div>
                              <span className="text-[11px] font-semibold text-stone-400 mt-4">Privasi Penuh Pelapor</span>
                            </div>

                            <div className="p-6 bg-white border border-stone-200/90 rounded-2xl flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors">
                              <div>
                                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">ENKRIPSI KUAT</span>
                                <h3 className="font-bold text-stone-900 text-base">PIN Akses Mandiri</h3>
                                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">Pantau perkembangan langsung tanpa perlu registrasi akun publik bagi yang menginginkan kerahasiaan penuh.</p>
                              </div>
                              <span className="text-[11px] font-semibold text-stone-400 mt-4">Kunci 256-Bit Unik</span>
                            </div>

                            <div className="p-6 bg-white border border-stone-200/90 rounded-2xl flex flex-col justify-between shadow-xs hover:border-stone-300 transition-colors">
                              <div>
                                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">KODE ETIK ABKIN</span>
                                <h3 className="font-bold text-stone-900 text-base">Objektivitas Penuh</h3>
                                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">Tim konselor menangani setiap aduan secara berimbang, empatik, dan bebas intimidasi sosial.</p>
                              </div>
                              <span className="text-[11px] font-semibold text-stone-400 mt-4">Standar Profesi Konseling</span>
                            </div>

                            <div className="p-6 bg-stone-900 text-white rounded-2xl flex flex-col justify-between border border-stone-800 shadow-sm">
                              <div>
                                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">AKSES CEPAT</span>
                                <h3 className="font-bold text-white text-base mt-1">Punya Info Kejadian?</h3>
                                <p className="text-xs text-stone-300 mt-1 leading-relaxed">Jangan biarkan temanmu berjuang sendirian. Suaramu dilindungi penuh.</p>
                              </div>
                              <Link href="/report" className="mt-4 px-4 py-2.5 bg-[#E02B2B] hover:bg-[#c92424] text-white font-medium text-xs rounded-xl text-center transition shadow-xs active:scale-[0.98] cursor-pointer">
                                Buat Laporan Sekarang
                              </Link>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </section>

                  {/* 8. FAQ ACCORDION SECTION */}
                  <section
                    className="w-full py-16 sm:py-24"
                    id="faq"
                  >
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">

                        {/* Left: Heading & Callout */}
                        <div className="w-full lg:w-[42%] flex flex-col items-start">
                          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
                            Punya Kekhawatiran? Mari Bicara Terbuka.
                          </h2>
                          <p className="text-base text-slate-600 leading-relaxed max-w-sm mt-4 mb-8">
                            Wajar jika kamu merasa ragu atau takut. Di sini, kami jelaskan bagaimana suaramu dijaga rapat-rapat tanpa risiko apa pun bagimu.
                          </p>
                          <div>
                            <a
                              href="tel:129"
                              className="px-6 py-3 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-md inline-flex items-center gap-2 transition-all duration-200 active:scale-[0.99]"
                            >
                              <PhoneCall className="w-4 h-4 text-white" />
                              <span>Hotline SAPA 129</span>
                            </a>
                          </div>
                        </div>

                        {/* Right: Accordion Items with Smooth Transition & Trigger Button */}
                        <div className="w-full lg:w-[54%] space-y-3">
                          {[
                            {
                              question: 'Apakah identitas saya benar-benar dirahasiakan?',
                              answer: 'Ya. Sistem RELASI mematuhi prinsip zero-metadata logging. Jika Anda memilih opsi "Samarkan Identitas", nama dan kelas Anda dienkripsi dan digantikan oleh Report ID dan PIN rahasia unik.'
                            },
                            {
                              question: 'Bagaimana cara memantau status laporan tanpa membuat akun?',
                              answer: 'Setelah laporan berhasil dikirim, sistem menerbitkan nomor tiket dan PIN 4-digit. Anda cukup membuka menu "Lacak Status PIN" dan memasukkan kode tersebut untuk melihat tahapan penanganan secara langsung.'
                            },
                            {
                              question: 'Siapa saja yang memiliki wewenang membaca isi laporan?',
                              answer: 'Hanya Guru Bimbingan Konseling (BK) berlisensi yang terikat kode etik ABKIN dan Tim Satgas Pencegahan dan Penanganan Kekerasan (TPPK) sekolah yang memiliki kunci akses ke dossier kasus.'
                            },
                            {
                              question: 'Bagaimana perlindungan bagi saksi yang melapor?',
                              answer: 'Berdasarkan Permendikbudristek No. 46 Tahun 2023, saksi berhak mendapatkan perlindungan hukum dan fisik dari pihak sekolah. Segala tindakan intimidasi terhadap saksi dikategorikan sebagai pelanggaran berat.'
                            }
                          ].map((item, index) => {
                            const isOpen = activeFaq === index;
                            return (
                              <div 
                                key={index}
                                className={`bg-white border rounded-xl sm:rounded-2xl transition-[border-color,box-shadow] duration-200 overflow-hidden ${
                                  isOpen 
                                    ? 'border-slate-200 shadow-sm ring-1 ring-slate-900/5' 
                                    : 'border-slate-200/70 shadow-2xs hover:border-slate-300'
                                }`}
                              >
                                {/* 1. Independent Header / Trigger Row */}
                                <button
                                  type="button"
                                  onClick={() => toggleFaq(index)}
                                  aria-expanded={isOpen}
                                  className="w-full px-5 py-4 flex items-center justify-between text-left group cursor-pointer focus:outline-none transition-colors"
                                >
                                  <span className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-red-600 transition-colors leading-snug flex-1 pr-4">
                                    {item.question}
                                  </span>
                                  
                                  {/* Clean Trigger Icon */}
                                  <span 
                                    className="shrink-0 flex items-center justify-center w-6 h-6 text-slate-400 group-hover:text-slate-700 transition-colors"
                                    aria-hidden="true"
                                  >
                                    {isOpen ? (
                                      <Minus className="w-5 h-5 text-red-600 transition-colors duration-200" />
                                    ) : (
                                      <Plus className="w-5 h-5 transition-colors duration-200" />
                                    )}
                                  </span>
                                </button>

                                {/* 2. Isolated Content / Answer Block */}
                                <div 
                                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <div className="mx-5 border-t border-slate-100 pt-3 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
                                      {item.answer}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </div>
                  </section>

                  {/* 9. DUAL-CARD FUNCTIONAL CTA BANNER (Akses Cepat Pelaporan & Bantuan Darurat - Dribbble Modern Luxury Design) */}
                  <section
                    className="w-full mt-4 mb-16 sm:mb-20"
                    aria-label="Akses Pelaporan dan Bantuan Cepat"
                  >
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-6 sm:p-8 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

                          {/* Sisi A: Akses Laporan Anonim */}
                          <div className="lg:col-span-7 flex flex-col justify-between">
                            <div>
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold tracking-wide mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E02B2B]" />
                                <span>Saluran Pelaporan Terenkripsi</span>
                              </div>
                              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-[1.2]">
                                Jangan Simpan Bebanmu Sendirian
                              </h3>
                              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3 max-w-xl">
                                Suaramu berharga. Laporkan insiden dengan proteksi identitas penuh dan tanpa risiko pembalasan dari pihak mana pun.
                              </p>

                              {/* Jaminan Keamanan Ringkas Bergaya Dribbble */}
                              <div className="flex flex-wrap items-center gap-2.5 mt-6">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-700 text-xs font-medium">
                                  <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                                  <span>Identitas Disamarkan</span>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-700 text-xs font-medium">
                                  <Lock className="w-3.5 h-3.5 text-stone-600" />
                                  <span>Pantau Progres via PIN</span>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-700 text-xs font-medium">
                                  <HeartHandshake className="w-3.5 h-3.5 text-stone-600" />
                                  <span>Didampingi Konselor BK</span>
                                </div>
                              </div>
                            </div>

                            {/* Tombol Aksi Utama */}
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                              <Link
                                href="/report"
                                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer inline-flex items-center justify-center"
                              >
                                <span>Buat Laporan Sekarang</span>
                              </Link>
                              <Link
                                href="/#cara-kerja"
                                className="px-5 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-800 border border-stone-200 font-semibold text-sm transition-all cursor-pointer inline-flex items-center justify-center active:scale-[0.99]"
                              >
                                <span>Pelajari Cara Kerja</span>
                              </Link>
                            </div>
                          </div>

                          {/* Sisi B: Bantuan Cepat & Kontak Darurat */}
                          <div className="lg:col-span-5 flex flex-col justify-between">
                            <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between h-full space-y-5">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="w-2 h-2 rounded-full bg-[#E02B2B] animate-pulse" />
                                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                                    Layanan Tanggap Darurat
                                  </span>
                                </div>
                                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                                  Jika kamu atau temanmu berada dalam situasi krisis atau membutuhkan perlindungan fisik segera, hubungi kontak resmi ini:
                                </p>
                              </div>

                              {/* Box Hotline SAPA 129 */}
                              <div className="p-4 rounded-xl bg-white border border-stone-200/90 flex items-center justify-between gap-3 shadow-xs">
                                <div className="flex items-center gap-3.5">
                                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E02B2B] flex items-center justify-center shrink-0 border border-red-100">
                                    <PhoneCall className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-stone-900 tracking-tight">Hotline SAPA 129</div>
                                    <div className="text-[11px] text-stone-500">KemenPPPA RI, Bebas Pulsa 24 Jam</div>
                                  </div>
                                </div>
                                <a
                                  href="tel:129"
                                  className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition shrink-0 shadow-xs active:scale-[0.98]"
                                >
                                  Panggil
                                </a>
                              </div>

                              {/* Info Jam Pendampingan Guru BK */}
                              <div className="flex items-start gap-2.5 text-xs text-stone-500 bg-white/70 p-3 rounded-lg border border-stone-200/50">
                                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                                <span>Layanan Tatap Muka Ruang BK: Senin s.d. Jumat, 07.30 - 15.00 WIB (Privat &amp; Tertutup)</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
