'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroHeadlineTypewriter from '@/components/HeroHeadlineTypewriter';

export default function RelasiHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Initialize and load all Salient Tether scripts in strict sequential order
  useEffect(() => {
    // Prevent browser scroll-restore jump on reload
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Set Salient global configuration options
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
      '/assets/js/4d2ee472_nectar-chat-thread.js',
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

      // Re-trigger Salient layout calculation and events
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
                    className="nectar_section wpb_row vc_row top-level full-width-section loaded first-section"
                    data-bottom-percent="6%"
                    data-column-margin="default"
                    data-midnight="dark"
                    data-top-percent="6%"
                    id="fws_6ab47266cfb7e"
                    style={{ paddingTop: 'calc(6vw)', paddingBottom: 'calc(6vw)', zIndex: 110 }}
                  >
                    <div className="row-bg-wrap">
                      <div className="inner-wrap row-bg-layer">
                        <div className="row-bg viewport-desktop"></div>
                      </div>
                    </div>

                    <div className="row_col_wrap_12 span_12 dark">
                      <div
                        className="wpb_row vc_row-fluid vc_row full-width-section first-section loaded"
                        data-column-margin="default"
                        data-midnight="dark"
                        id="overview"
                        style={{ paddingTop: 0, paddingBottom: 0, zIndex: 110 }}
                      >
                        <div className="row_col_wrap_12 col span_12 dark left">
                          <div className="vc_col-sm-12 wpb_column column_container vc_column_container col no-extra-padding inherit_tablet inherit_phone flex_layout_desktop_column flex_justify_content_desktop_start flex_align_items_desktop_flex-start flex_wrap_desktop_nowrap">
                            <div className="vc_column-inner">
                              <div className="wpb_wrapper flex flex-col items-start text-left max-w-[640px]">

                                {/* Dynamic Hero Headline with Typewriter Animation */}
                                <HeroHeadlineTypewriter />

                                {/* Subtitle Description */}
                                <p 
                                  className="text-slate-600 text-lg sm:text-xl font-normal mt-5 mb-8 sm:mb-10 leading-relaxed tether-hero-fade text-left max-w-[620px]" 
                                  style={{ animationDelay: '340ms' }}
                                >
                                  Saluran pelaporan mandiri bagi korban dan saksi perundungan dengan perlindungan identitas, enkripsi PIN, dan tindak lanjut yang terukur.
                                </p>

                                {/* Action Buttons */}
                                <div 
                                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto tether-hero-fade"
                                  style={{ animationDelay: '460ms' }}
                                >
                                  {/* Primary Button: “Buat Laporan — Terenkripsi” (solid red, rounded) */}
                                  <Link
                                    href="/report"
                                    className="inline-flex items-center justify-center px-8 py-4 sm:px-9 sm:py-4.5 rounded-full bg-[#E02B2B] hover:bg-[#c92424] text-white text-base sm:text-lg font-semibold tracking-tight shadow-[0_8px_25px_rgba(224,43,43,0.28)] hover:shadow-[0_12px_32px_rgba(224,43,43,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200"
                                  >
                                    Buat Laporan — Terenkripsi
                                  </Link>

                                  {/* Secondary Button: “Lacak Status PIN” (outline style) */}
                                  <Link
                                    href="/track"
                                    className="inline-flex items-center justify-center px-8 py-4 sm:px-9 sm:py-4.5 rounded-full border-2 border-slate-300 hover:border-slate-800 text-slate-800 hover:text-slate-900 bg-white/70 hover:bg-white text-base sm:text-lg font-semibold tracking-tight shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200"
                                  >
                                    Lacak Status PIN
                                  </Link>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 4. THE SIGNATURE SALIENT STICKY MEDIA SCROLL SECTIONS (ALUR 4 LANGKAH PENANGANAN) */}
                  <div
                    className="wpb_row vc_row-fluid vc_row has-global-section full-width-section"
                    id="cara-kerja"
                    style={{ paddingTop: 'calc(100vw * 0.05)', paddingBottom: 'calc(100vw * 0.05)' }}
                  >
                    <div className="row_col_wrap_12 col span_12 dark left">
                      <div className="vc_col-sm-12 wpb_column column_container vc_column_container col">
                        <div className="vc_column-inner">
                          <div className="wpb_wrapper">

                            {/* Section Header */}
                            <div className="text-center max-w-2xl mx-auto mb-10">
                              <span className="text-xs font-bold text-[#E02B2B] uppercase tracking-wider">SOP &amp; ALUR KERJA BK</span>
                              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                                4 Langkah Alur Penanganan Kasus
                              </h2>
                              <p className="text-slate-600 text-sm mt-2">
                                Setiap kesaksian dan aduan ditangani secara berjenjang dengan prinsip objektivitas, kerahasiaan, dan pemulihan murid.
                              </p>
                            </div>

                            {/* STICKY STACKING ENGINE */}
                            <div
                              className="nectar-sticky-media-sections media-border-radius-15px type--scroll-pinned-sections content-alignment-stretch section-height-75vh subtract-nav-height effect-overlapping overlapping-overlap-amount-desktop-20px overlapping-overlap-amount-tablet-40px stacking-effect"
                              style={{ '--section-count': 3 } as any}
                            >
                              <div className="nectar-sticky-media-section__content__wrap">

                                {/* STACKING CARD 1: Pengaduan Terenkripsi */}
                                <div className="nectar-sticky-media-section__content-section" style={{ top: '186px', '--progress': 1 } as any}>
                                  <div className="nectar-sticky-media-section__content-section__wrap">
                                    <div className="nectar-sticky-media-content__media-wrap">
                                      <div className="nectar-sticky-media-section__media" data-type="color" style={{ backgroundColor: '#FFFFFF' }}></div>
                                    </div>
                                    <div className="nectar-sticky-media-section__content-section-inner">
                                      <div className="wpb_row vc_row-fluid vc_row inner_row vc_row-o-equal-height vc_row-flex right_padding_30px left_padding_30px column-margin-40px" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                                        <div className="row_col_wrap_12_inner col span_12 left">

                                          {/* Left Info Column */}
                                          <div className="vc_col-sm-6 wpb_column column_container vc_column_container col child_column flex_layout_desktop_column flex_justify_content_desktop_center flex_align_items_desktop_flex-start flex_gap_desktop_15px">
                                            <div className="vc_column-inner p-4">
                                              <div className="wpb_wrapper">
                                                <span className="text-xs font-bold uppercase tracking-wider text-red-600">Langkah 01</span>
                                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
                                                  Pengaduan Terenkripsi &amp; Anonim
                                                </h2>
                                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                                  Murid atau saksi mengirimkan kronologi kejadian secara tertutup. Tersedia tombol samarkan identitas agar terlindungi penuh dari tekanan sosial atau retaliasi.
                                                </p>
                                                <div className="nectar-cta border_radius_100px" data-color="accent-color" data-style="text-reveal" data-using-bg="true" style={{ '--nectar-text-color': '#FFFFFF', '--nectar-button-color': '#E02B2B' } as any}>
                                                  <span className="nectar-button-type" style={{ color: '#FFFFFF' }}>
                                                    <span className="link_wrap shadow-sm" style={{ paddingTop: '0.5em', paddingRight: '1.4em', paddingBottom: '0.5em', paddingLeft: '1.4em', backgroundColor: '#E02B2B' }}>
                                                      <Link className="link_text" href="/report">
                                                        <span className="text nectar-text-reveal-button__text font-bold" data-text="Isi Pengaduan">
                                                          Isi Pengaduan
                                                        </span>
                                                      </Link>
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right Media Column */}
                                          <div className="vc_col-sm-6 wpb_column column_container vc_column_container col child_column flex_layout_desktop_column flex_justify_content_desktop_center flex_align_items_desktop_stretch" style={{ borderRadius: '15px' }}>
                                            <div className="vc_column-inner overflow-hidden rounded-2xl relative min-h-[320px] shadow-sm border border-slate-200">
                                              <div className="column-image-bg-wrap column-bg-layer absolute inset-0">
                                                <div className="column-image-bg loaded w-full h-full" style={{ backgroundImage: "url('/images/hero_sanctuary.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                              </div>
                                              {/* Overlay Card Widget */}
                                              <div className="relative z-10 m-6 p-5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">Laporan Baru Masuk</span>
                                                  <span className="text-xs font-semibold text-slate-500">08:30 WIB</span>
                                                </div>
                                                <h5 className="font-bold text-slate-900 text-sm">Kesaksian Dugaan Perundungan Verbal</h5>
                                                <p className="text-xs text-slate-600 mt-1">Identitas pelapor: <span className="font-mono text-emerald-700 font-semibold">[DISAMARKAN - ENCRYPTED]</span></p>
                                                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                                                  <span>Kategori: Sikap Merendahkan</span>
                                                  <span className="text-emerald-600 font-bold">Status: Enkripsi Aktif</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* STACKING CARD 2: Penerbitan PIN & Telaah Objektif */}
                                <div className="nectar-sticky-media-section__content-section" style={{ top: '186px', '--progress': 0.5 } as any}>
                                  <div className="nectar-sticky-media-section__content-section__wrap">
                                    <div className="nectar-sticky-media-content__media-wrap">
                                      <div className="nectar-sticky-media-section__media" data-type="color" style={{ backgroundColor: '#DBD7D1' }}></div>
                                    </div>
                                    <div className="nectar-sticky-media-section__content-section-inner">
                                      <div className="wpb_row vc_row-fluid vc_row inner_row vc_row-o-equal-height vc_row-flex right_padding_30px left_padding_30px column-margin-40px" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                                        <div className="row_col_wrap_12_inner col span_12 left">

                                          {/* Left Info Column */}
                                          <div className="vc_col-sm-6 wpb_column column_container vc_column_container col child_column flex_layout_desktop_column flex_justify_content_desktop_center flex_align_items_desktop_flex-start flex_gap_desktop_15px">
                                            <div className="vc_column-inner p-4">
                                              <div className="wpb_wrapper">
                                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Langkah 02 &amp; 03</span>
                                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
                                                  Penerbitan PIN &amp; Telaah Objektif BK
                                                </h2>
                                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                                  Sistem otomatis menerbitkan Report ID &amp; PIN unik. Pelapor dapat memantau status secara rahasia tanpa login publik. Konselor BK memvalidasi bukti tanpa praduga sepihak.
                                                </p>
                                                <div className="nectar-cta border_radius_100px" data-color="black" data-style="text-reveal" data-using-bg="true" style={{ '--nectar-text-color': '#FFFFFF', '--nectar-button-color': '#0F172A' } as any}>
                                                  <span className="nectar-button-type" style={{ color: '#FFFFFF' }}>
                                                    <span className="link_wrap shadow-sm" style={{ paddingTop: '0.5em', paddingRight: '1.4em', paddingBottom: '0.5em', paddingLeft: '1.4em', backgroundColor: '#0F172A' }}>
                                                      <Link className="link_text" href="/track">
                                                        <span className="text nectar-text-reveal-button__text font-bold" data-text="Lacak Progres via PIN">
                                                          Lacak Progres via PIN
                                                        </span>
                                                      </Link>
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right Media Column */}
                                          <div className="vc_col-sm-6 wpb_column column_container vc_column_container col child_column flex_layout_desktop_column flex_justify_content_desktop_center flex_align_items_desktop_stretch" style={{ borderRadius: '15px' }}>
                                            <div className="vc_column-inner overflow-hidden rounded-2xl relative min-h-[320px] shadow-sm border border-slate-300">
                                              <div className="column-image-bg-wrap column-bg-layer absolute inset-0">
                                                <div className="column-image-bg loaded w-full h-full" style={{ backgroundImage: "url('/images/neural_pattern.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                              </div>
                                              {/* Floating Dossier Insight Box */}
                                              <div className="relative z-10 m-6 p-5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 text-white shadow-xl">
                                                <div className="flex items-center justify-between mb-3">
                                                  <span className="text-xs font-bold text-slate-300">Dossier Penanganan Kasus</span>
                                                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">SOP Terverifikasi BK</span>
                                                </div>
                                                <div className="text-xl sm:text-2xl font-bold tracking-tight">Investigasi Terstruktur</div>
                                                <div className="flex flex-col gap-1.5 mt-3 text-xs text-slate-300">
                                                  <span className="flex items-center gap-2 font-medium">✓ Telaah Kronologi &amp; Bukti Faktual</span>
                                                  <span className="flex items-center gap-2 font-medium">✓ Klasifikasi Derajat Risiko Siswa</span>
                                                  <span className="flex items-center gap-2 font-medium">✓ Mediasi &amp; Konseling Tertutup</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* STACKING CARD 3: Pendampingan, Mediasi & Pemulihan */}
                                <div className="nectar-sticky-media-section__content-section" style={{ top: '186px' } as any}>
                                  <div className="nectar-sticky-media-section__content-section__wrap">
                                    <div className="nectar-sticky-media-content__media-wrap">
                                      <div className="nectar-sticky-media-section__media" data-type="color" style={{ backgroundColor: '#FFFF00' }}></div>
                                    </div>
                                    <div className="nectar-sticky-media-section__content-section-inner">
                                      <div className="wpb_row vc_row-fluid vc_row inner_row vc_row-o-equal-height vc_row-flex right_padding_30px left_padding_30px column-margin-40px" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                                        <div className="row_col_wrap_12_inner col span_12 left">

                                          {/* Left Info Column */}
                                          <div className="vc_col-sm-6 wpb_column column_container vc_column_container col child_column flex_layout_desktop_column flex_justify_content_desktop_center flex_align_items_desktop_flex-start flex_gap_desktop_15px">
                                            <div className="vc_column-inner p-4">
                                              <div className="wpb_wrapper">
                                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Langkah 04</span>
                                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
                                                  Pendampingan, Mediasi &amp; Pemulihan
                                                </h2>
                                                <p className="text-slate-800 text-sm leading-relaxed mb-4">
                                                  Pelaksanaan konseling aman, mediasi tertutup, serta perlindungan penuh murid dari tindakan retaliasi, pembalasan, maupun intimidasi sosial lanjutan.
                                                </p>
                                                <div className="nectar-cta border_radius_100px" data-color="black" data-style="text-reveal" data-using-bg="true" style={{ '--nectar-text-color': '#FFFFFF', '--nectar-button-color': '#161514' } as any}>
                                                  <span className="nectar-button-type" style={{ color: '#FFFFFF' }}>
                                                    <span className="link_wrap shadow-sm" style={{ paddingTop: '0.5em', paddingRight: '1.4em', paddingBottom: '0.5em', paddingLeft: '1.4em', backgroundColor: '#161514' }}>
                                                      <a className="link_text" href="#faq">
                                                        <span className="text nectar-text-reveal-button__text font-bold" data-text="Pelajari Kode Etik">
                                                          Pelajari Kode Etik
                                                        </span>
                                                      </a>
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right Media Column */}
                                          <div className="vc_col-sm-6 wpb_column column_container vc_column_container col child_column flex_layout_desktop_column flex_justify_content_desktop_space-between flex_align_items_desktop_stretch flex_gap_desktop_30px" style={{ borderRadius: '15px' }}>
                                            <div className="vc_column-inner overflow-hidden rounded-2xl relative min-h-[320px] shadow-sm border border-slate-300">
                                              <div className="column-image-bg-wrap column-bg-layer absolute inset-0">
                                                <div className="column-image-bg loaded w-full h-full" style={{ backgroundImage: "url('/images/sanctuary_portal.jpg')", backgroundSize: 'cover', backgroundPosition: 'center top' }}></div>
                                              </div>
                                              {/* Floating Badges */}
                                              <div className="relative z-10 m-6 flex flex-col gap-2.5">
                                                <div className="nectar-badge nectar-inherit-body text-color-F4F2EF padding-amount-small badge-style-default border-radius-20px backdrop_filter_blur_16 shadow-md" data-bg-color-custom="#161514D9">
                                                  <div className="nectar-badge__inner font-semibold text-xs sm:text-sm text-white">✓ Pendampingan Psikologis Korban</div>
                                                </div>
                                                <div className="nectar-badge nectar-inherit-body text-color-F4F2EF padding-amount-small badge-style-default border-radius-20px backdrop_filter_blur_16 shadow-md ml-auto" data-bg-color-custom="#161514D9">
                                                  <div className="nectar-badge__inner font-semibold text-xs sm:text-sm text-white">✓ Mediasi Berimbang Bebas Vonis Sepihak</div>
                                                </div>
                                                <div className="nectar-badge nectar-inherit-body text-color-F4F2EF padding-amount-small badge-style-default border-radius-20px backdrop_filter_blur_16 shadow-md mx-auto" data-bg-color-custom="#161514D9">
                                                  <div className="nectar-badge__inner font-semibold text-xs sm:text-sm text-white">✓ Pemantauan Pasca-Kasus Berkelanjutan</div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. INTERACTIVE CHAT THREAD & SECURITY ASSURANCE */}
                  <div className="wpb_row vc_row-fluid vc_row full-width-section" id="keamanan" style={{ paddingTop: 'calc(100vw * 0.04)', paddingBottom: 0 }}>
                    <div className="row_col_wrap_12 col span_12 dark left">
                      <div className="vc_col-sm-12 wpb_column column_container vc_column_container col no-extra-padding force-desktop-text-align-center">
                        <div className="vc_column-inner">
                          <div className="wpb_wrapper flex flex-col items-center">
                            <span className="text-xs font-bold text-[#E02B2B] uppercase tracking-wider">KEAMANAN &amp; PRIVASI</span>
                            <div className="nectar-responsive-text" style={{ maxWidth: '700px' }}>
                              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
                                Konseling &amp; Pelaporan Cepat Interaktif
                              </h2>
                            </div>
                            <p className="text-slate-600 text-sm max-w-xl text-center mt-2">
                              Siswa dapat mencurahkan isi hati dan kesaksian dengan rasa aman. Sistem menjamin privasi penuh di setiap tahap komunikasi.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="wpb_row vc_row-fluid vc_row full-width-section vc_row-o-equal-height vc_row-flex"
                    id="fws_6ab47266ddc0c"
                    style={{ paddingTop: 'calc(100vw * 0.04)', paddingBottom: 'calc(100vw * 0.06)' }}
                  >
                    <div className="row_col_wrap_12 col span_12 dark left">

                      {/* Left: Chat Thread Typing Demo */}
                      <div className="vc_col-sm-6 wpb_column column_container vc_column_container col left_padding_desktop_30px top_padding_desktop_30px right_padding_desktop_30px bottom_padding_desktop_30px flex_layout_desktop_column flex_justify_content_desktop_space-between" style={{ borderRadius: '15px' }}>
                        <div className="vc_column-inner p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                          <div className="wpb_wrapper">
                            <div
                              className="nectar-chat-thread"
                              data-animation="typing"
                              data-animation-speed="1"
                              data-auto-height-animation="true"
                              data-bubble-delay="1100"
                              data-loop-animation="true"
                              style={{
                                '--outgoing-bubble-color': '#E02B2B',
                                '--outgoing-text-color': '#FFFFFF',
                                '--incoming-bubble-color': '#FFFFFF',
                                '--incoming-text-color': '#161514',
                                '--image-size': '32px',
                                '--border-radius': '20px'
                              } as any}
                            >
                              {/* Bubble 1: Incoming from Bot/BK */}
                              <div className="nectar-chat-thread__bubble img-loaded" data-direction="incoming" style={{ opacity: 1 }}>
                                <div className="w-8 h-8 rounded-full bg-[#E02B2B] text-white flex items-center justify-center font-medium text-xs shrink-0 select-none">BK</div>
                                <div className="nectar-chat-thread__bubble-content" style={{ clipPath: 'inset(0% round 20px 20px 20px 0px)' }}>
                                  <div className="nectar-chat-thread__bubble-name"><strong>Konselor RELASI</strong></div>
                                  <div className="nectar-chat-thread__bubble-content__inner text-xs sm:text-sm">
                                    Halo, ceritakan apa yang kamu lihat atau alami. Ruang ini terenkripsi dan privasimu terjaga.
                                  </div>
                                </div>
                              </div>

                              {/* Bubble 2: Outgoing from Student */}
                              <div className="nectar-chat-thread__bubble img-loaded" data-direction="outgoing" style={{ opacity: 1 }}>
                                <div className="nectar-chat-thread__bubble-content" style={{ clipPath: 'inset(0% round 20px 20px 0px 20px)', backgroundColor: '#E02B2B', color: '#fff' }}>
                                  <div className="nectar-chat-thread__bubble-name"><strong className="text-white">Saksi Murid (Anonim)</strong></div>
                                  <div className="nectar-chat-thread__bubble-content__inner text-xs sm:text-sm text-white">
                                    Saya melihat pemerasan dan perundungan di lorong lantai 2 saat jam istirahat. Tolong samarkan nama saya.
                                  </div>
                                </div>
                              </div>

                              {/* Bubble 3: Confirmation */}
                              <div className="nectar-chat-thread__bubble img-loaded" data-direction="incoming" style={{ opacity: 1 }}>
                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-medium text-xs shrink-0 select-none">✓</div>
                                <div className="nectar-chat-thread__bubble-content" style={{ clipPath: 'inset(0% round 20px 20px 20px 0px)' }}>
                                  <div className="nectar-chat-thread__bubble-name"><strong>Sistem Keamanan</strong></div>
                                  <div className="nectar-chat-thread__bubble-content__inner text-xs sm:text-sm">
                                    Identitas Anda disamarkan. PIN pelacakan rahasia Anda telah diterbitkan: <strong>RL-7821</strong>. Guru BK akan menindaklanjuti secara tertutup.
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Security & Ethics Principles */}
                      <div className="vc_col-sm-6 wpb_column column_container vc_column_container col flex_layout_desktop_column flex_gap_desktop_10px">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">

                          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
                            <div>
                              <span className="text-xs font-bold text-[#E02B2B] uppercase tracking-wider block mb-2">ZERO-METADATA</span>
                              <h3 className="font-bold text-slate-900 text-base">Anonimitas Mutlak</h3>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Siswa dapat melapor tanpa menyertakan nama, tanpa pelacakan alamat IP maupun identitas perangkat.</p>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 mt-4">Privasi Penuh Pelapor</span>
                          </div>

                          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
                            <div>
                              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">ENKRIPSI KUAT</span>
                              <h3 className="font-bold text-slate-900 text-base">PIN Akses Mandiri</h3>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Pantau perkembangan langsung tanpa perlu registrasi akun publik bagi yang menginginkan kerahasiaan penuh.</p>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 mt-4">Kunci 256-Bit Unik</span>
                          </div>

                          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
                            <div>
                              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">KODE ETIK ABKIN</span>
                              <h3 className="font-bold text-slate-900 text-base">Objektivitas Penuh</h3>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Tim konselor menangani setiap aduan secara berimbang, empatik, dan bebas intimidasi sosial.</p>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 mt-4">Standar Profesi Konseling</span>
                          </div>

                          <div className="p-6 bg-[#0F172A] text-white rounded-2xl flex flex-col justify-between border border-slate-800 shadow-2xs">
                            <div>
                              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">AKSES CEPAT</span>
                              <h3 className="font-bold text-white text-base mt-1">Punya Info Kejadian?</h3>
                              <p className="text-xs text-slate-300 mt-1 leading-relaxed">Jangan biarkan temanmu berjuang sendirian. Suaramu dilindungi penuh.</p>
                            </div>
                            <Link href="/report" className="mt-4 px-4 py-2 !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs rounded-xl text-center transition shadow-sm hover:shadow-md cursor-pointer">
                              Buat Laporan Sekarang →
                            </Link>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 8. FAQ ACCORDION SECTION */}
                  <div
                    className="wpb_row vc_row-fluid vc_row full-width-section column-margin-70px"
                    id="faq"
                    style={{ paddingTop: 'calc(100vw * 0.05)', paddingBottom: 'calc(100vw * 0.05)' }}
                  >
                    <div className="row_col_wrap_12 col span_12 dark left">

                      {/* Left: Heading & Callout */}
                      <div className="vc_col-sm-2/5 wpb_column column_container vc_column_container col right_padding_desktop_42pct right_padding_tablet_0px flex_layout_desktop_column flex_gap_desktop_10px">
                        <div className="vc_column-inner">
                          <div className="wpb_wrapper">
                            <span className="text-xs font-bold text-[#E02B2B] uppercase tracking-wider">TANYA JAWAB RESMI</span>
                            <div className="nectar-responsive-text mt-1">
                              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Segala Hal yang Perlu Kamu Ketahui
                              </h2>
                            </div>
                            <p className="text-slate-600 text-sm mt-2 mb-4 leading-relaxed">
                              Pelajari bagaimana sistem menjamin keamanan data pelapor dan hak perlindungan siswa dari tindakan retaliasi.
                            </p>
                            <div className="nectar-cta border_radius_100px" data-color="black" data-style="text-reveal" data-using-bg="true" style={{ '--nectar-text-color': '#FFFFFF', '--nectar-button-color': '#0F172A' } as any}>
                              <span className="nectar-button-type" style={{ color: '#FFFFFF' }}>
                                <span className="link_wrap shadow-sm" style={{ paddingTop: '0.5em', paddingRight: '1.4em', paddingBottom: '0.5em', paddingLeft: '1.4em', backgroundColor: '#0F172A' }}>
                                  <a className="link_text" href="tel:129">
                                    <span className="text nectar-text-reveal-button__text font-bold" data-text="Hotline SAPA 129">
                                      Hotline SAPA 129
                                    </span>
                                  </a>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Accordion Items */}
                      <div className="vc_col-sm-3/5 wpb_column column_container vc_column_container col left_padding_desktop_10px top_padding_desktop_10px right_padding_desktop_10px bottom_padding_desktop_10px">
                        <div className="vc_column-inner">
                          <div className="wpb_wrapper">

                            {/* FAQ Item 1 */}
                            <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm">
                              <button
                                type="button"
                                onClick={() => toggleFaq(0)}
                                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-[#E02B2B] transition"
                              >
                                <span>Apakah identitas saya benar-benar dirahasiakan?</span>
                                <span className="text-lg font-bold ml-2">{activeFaq === 0 ? '−' : '+'}</span>
                              </button>
                              {activeFaq === 0 && (
                                <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                                  Ya. Sistem RELASI mematuhi prinsip zero-metadata logging. Jika Anda memilih opsi "Samarkan Identitas", nama dan kelas Anda dienkripsi dan digantikan oleh Report ID dan PIN rahasia unik.
                                </div>
                              )}
                            </div>

                            {/* FAQ Item 2 */}
                            <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm">
                              <button
                                type="button"
                                onClick={() => toggleFaq(1)}
                                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-[#E02B2B] transition"
                              >
                                <span>Bagaimana cara memantau status laporan tanpa membuat akun?</span>
                                <span className="text-lg font-bold ml-2">{activeFaq === 1 ? '−' : '+'}</span>
                              </button>
                              {activeFaq === 1 && (
                                <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                                  Setelah laporan berhasil dikirim, sistem menerbitkan nomor tiket dan PIN 4-digit. Anda cukup membuka menu "Lacak Status PIN" dan memasukkan kode tersebut untuk melihat tahapan penanganan secara langsung.
                                </div>
                              )}
                            </div>

                            {/* FAQ Item 3 */}
                            <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm">
                              <button
                                type="button"
                                onClick={() => toggleFaq(2)}
                                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-[#E02B2B] transition"
                              >
                                <span>Siapa saja yang memiliki wewenang membaca isi laporan?</span>
                                <span className="text-lg font-bold ml-2">{activeFaq === 2 ? '−' : '+'}</span>
                              </button>
                              {activeFaq === 2 && (
                                <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                                  Hanya Guru Bimbingan Konseling (BK) berlisensi yang terikat kode etik ABKIN dan Tim Satgas Pencegahan dan Penanganan Kekerasan (TPPK) sekolah yang memiliki kunci akses ke dossier kasus.
                                </div>
                              )}
                            </div>

                            {/* FAQ Item 4 */}
                            <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm">
                              <button
                                type="button"
                                onClick={() => toggleFaq(3)}
                                className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:text-[#E02B2B] transition"
                              >
                                <span>Bagaimana perlindungan bagi saksi yang melapor?</span>
                                <span className="text-lg font-bold ml-2">{activeFaq === 3 ? '−' : '+'}</span>
                              </button>
                              {activeFaq === 3 && (
                                <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                                  Berdasarkan Permendikbudristek No. 46 Tahun 2023, saksi berhak mendapatkan perlindungan hukum dan fisik dari pihak sekolah. Segala tindakan intimidasi terhadap saksi dikategorikan sebagai pelanggaran berat.
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 9. BOTTOM PARALLAX CTA BANNER */}
                  <section
                    className="nectar_section wpb_row vc_row full-width-content vc_row-o-equal-height vc_row-flex right_padding_10px left_padding_10px mt-10"
                    style={{ paddingTop: 'calc(100vw * 0.04)', paddingBottom: '0px' }}
                  >
                    <div className="row_col_wrap_12 span_12 dark">
                      <div
                        className="wpb_row vc_row-fluid vc_row full-width-section parallax_section rounded-2xl overflow-hidden relative"
                        style={{ paddingTop: 'calc(8vw)', paddingBottom: 'calc(8vw)', minHeight: '440px' }}
                      >
                        <div className="row-bg-wrap absolute inset-0">
                          <div
                            className="column-image-bg parallax-layer translate loaded w-full h-full"
                            style={{
                              backgroundImage: "url('/images/voice_resonance.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              filter: 'brightness(0.3)'
                            }}
                          ></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto px-6 text-white text-center flex flex-col items-center">
                          <div className="nectar-badge border-radius-20px mb-4" data-bg-color-custom="#EDE9DE1A">
                            <div className="nectar-badge__inner px-4 py-1 bg-white/10 rounded-full text-xs font-semibold">
                              Platform RELASI
                            </div>
                          </div>
                          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                            Wujudkan Sekolah yang Aman, Setara, dan Ramah Bagi Setiap Anak
                          </h2>
                          <p className="text-slate-300 text-sm mt-3 max-w-xl">
                            Kekerasan dan perundungan berhenti ketika kita berani bersuara. Mulai pengaduan mandiri sekarang dengan proteksi penuh.
                          </p>
                          <div className="mt-6">
                            <Link
                              href="/report"
                              className="px-8 py-3.5 !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition inline-block cursor-pointer"
                            >
                              Mulai Pengaduan — Aman &amp; Terenkripsi
                            </Link>
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
