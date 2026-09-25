'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Star, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Layers, 
  RefreshCw, 
  FileText, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  ShoppingCart,
  Eye
} from 'lucide-react';

export default function ProductDetailPage() {
  const [selectedLicense, setSelectedLicense] = useState<'regular' | 'extended' | 'lifetime'>('regular');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const prices = {
    regular: { current: 29, original: 59, label: 'Regular License (Single Site)' },
    extended: { current: 99, original: 149, label: 'Extended License (5 Sites)' },
    lifetime: { current: 159, original: 299, label: 'Agency Unlimited (Lifetime Updates)' },
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribeSuccess(true);
      setTimeout(() => setSubscribeSuccess(false), 4000);
      setSubscribedEmail('');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner Promo Notice */}
      <div className="bg-[#0F172A] text-white py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="bg-[#E02B2B] text-white px-2.5 py-0.5 rounded-full font-bold text-xs uppercase tracking-wider animate-pulse">
              Limited Offer
            </span>
            <span className="text-slate-300">
              Now available — get our themes directly at <strong className="text-white">reactheme.com</strong>. Pay less, get supported longer, update in one click.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/wordpress-themes" 
              className="text-[#E02B2B] hover:text-red-400 font-bold transition inline-flex items-center gap-1"
            >
              Grab The Deal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/my-account" className="text-slate-400 hover:text-white transition">
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Breadcrumb & Header Hero */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            <Link href="/" className="hover:text-[#E02B2B]">Home</Link>
            <span>/</span>
            <Link href="/wordpress-themes" className="hover:text-[#E02B2B]">WordPress Themes</Link>
            <span>/</span>
            <span className="text-slate-900">Seoly – SEO & Digital Marketing Theme</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Col: Product Overview & Previews */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">5.0 (48 Customer Reviews)</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Elementor 3.x Ready
                </span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  WordPress 6.7+
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4">
                Seoly — SEO & Digital Marketing WordPress Theme
              </h1>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Now available — get our themes directly at reactheme.com. Pay less, get supported longer, update in one click. Experience a user-friendly interface and unmatched flexibility with one of WordPress’s most intuitive page builders — the perfect solution for building stunning websites without the hassle.
              </p>

              {/* Product Mockup Showcase */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 mb-8">
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img 
                    src="https://reactheme.com/wp-content/uploads/2026/01/seoly.png" 
                    alt="Seoly — SEO & Digital Marketing WordPress Theme"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <Link 
                    href="/products/wordpress/seoly"
                    className="bg-white/95 backdrop-blur text-slate-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg hover:bg-[#E02B2B] hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Live Preview
                  </Link>
                  <a 
                    href="https://docs.reactheme.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-slate-900/90 backdrop-blur text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg hover:bg-slate-800 transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" /> Documentation
                  </a>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E02B2B] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Elementor – No Code Page Builder</h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Experience intuitive drag-and-drop website creation with 45+ bespoke Seoly widgets and real-time visual styling.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Included – Header Builder</h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Design and manage your website’s header with total freedom — no coding required. With front-end editing powered by Elementor.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Ultra-Fast 98/100 Core Web Vitals</h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Lightweight clean DOM structure engineered specifically for fast indexation and top SERP ranking outcomes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">1-Click Template Setup</h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Deploy the full institutional agency pages, portfolios, case studies, and audit tools in under 60 seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Extended Presentation Graphic */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Complete Feature & Layout Presentation</h3>
                <div className="relative w-full rounded-xl overflow-hidden bg-slate-100">
                  <img 
                    src="https://camo.envatousercontent.com/d4e48dafca71ffd219234e0b9d7b2955748e9fa5/68747470733a2f2f726561637468656d657362616e6e65722e76657263656c2e6170702f73656f6c792f696d6167652d312e706e67" 
                    alt="Seoly — SEO & Digital Marketing WordPress Theme - 1"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Sticky Purchase & License Box */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6">
                <div className="flex items-baseline justify-between mb-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500">Theme License</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-[#0F172A]">
                        ${prices[selectedLicense].current}
                      </span>
                      <span className="text-base text-slate-400 line-through">
                        ${prices[selectedLicense].original}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Save 50%
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">USD</span>
                </div>

                {/* License Selectors */}
                <div className="space-y-2 mb-6">
                  {(['regular', 'extended', 'lifetime'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedLicense(tier)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        selectedLicense === tier
                          ? 'border-[#E02B2B] bg-red-50/50 text-[#0F172A] shadow-sm font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          selectedLicense === tier ? 'border-[#E02B2B] bg-[#E02B2B]' : 'border-slate-300'
                        }`}>
                          {selectedLicense === tier && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </span>
                        <span>{prices[tier].label}</span>
                      </div>
                      <span className="font-extrabold text-slate-900">${prices[tier].current}</span>
                    </button>
                  ))}
                </div>

                {/* Guarantee & Inclusions */}
                <div className="space-y-2.5 text-xs text-slate-600 mb-6 bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Quality verified by Envato & ReacTheme</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Future updates included for lifetime</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>6 months dedicated support from developers</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant download & 1-click import files</span>
                  </div>
                </div>

                {/* Purchase Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-4 !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium rounded-xl shadow-lg shadow-red-500/25 transition-all text-center flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" /> Purchase Now
                  </Link>
                  <Link
                    href="/products/wordpress/seoly"
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-center flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" /> Live Preview
                  </Link>
                </div>

                {/* External Deals Links */}
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Partner Marketplace Deals
                  </span>
                  <a
                    href="https://themeforest.net/item/entro-all-in-one-elementor-wordpress-theme/59965389"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#E02B2B] p-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    <span>Grab the Deal on ThemeForest</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://themewant.com/downloads/easy-hotel-booking/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#E02B2B] p-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    <span>Grab the Deal on ThemeWant</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Payment Logos */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                  <img 
                    src="https://reactheme.com/wp-content/uploads/2023/08/card.png" 
                    alt="Secure Payments"
                    className="h-6 w-auto object-contain opacity-70"
                  />
                </div>
              </div>

              {/* Theme Details Card */}
              <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 text-xs">
                <h3 className="text-sm font-bold text-[#0F172A] mb-3">Theme Technical Specifications</h3>
                <div className="divide-y divide-slate-200/60 space-y-2">
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Last Update:</span>
                    <span className="font-semibold text-slate-900">September 2026</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Gutenberg Optimized:</span>
                    <span className="font-semibold text-emerald-600">Yes</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">High Resolution:</span>
                    <span className="font-semibold text-emerald-600">Yes (Retina Ready)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Compatible Browsers:</span>
                    <span className="font-semibold text-slate-900">Chrome, Edge, Firefox, Safari</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Compatible With:</span>
                    <span className="font-semibold text-slate-900">Elementor, WooCommerce, WPML</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Software Version:</span>
                    <span className="font-semibold text-slate-900">WordPress 6.7.x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Bar Section */}
      <section className="bg-[#0F172A] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Subscribe for Theme Updates & Exclusive Discounts
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Receive new feature releases, changelogs, and updates directly in your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                id="custom_submit_button-5_1"
                type="email"
                placeholder="Enter your email address..."
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#E02B2B] w-full sm:w-80"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-sm transition shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
          {subscribeSuccess && (
            <div className="mt-4 p-3 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-emerald-300 text-sm text-center">
              Thank you! You have been successfully subscribed to Seoly theme updates.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
