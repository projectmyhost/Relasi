'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Search, 
  Target, 
  BarChart2, 
  Layers, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function KeywordResearchPage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Search className="w-3.5 h-3.5" />
            <span>Single Service Drill-Down</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Keyword Research
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Uncover high-conversion, low-difficulty search queries that connect directly with prospective buyers in your niche.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/products/wordpress/seoly/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Keyword Research</span>
          </div>
        </div>
      </section>

      {/* Main Details & Visual Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Strategic Foundation</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">
                Why Keyword Research Matters More Than Ever
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Comprehensive analysis of keyword difficulty, CPC, and search volume to guide smart targeting. Organize keywords into strategic groups to streamline content planning and SEO structure. Focus on long-tail keywords that are easier to rank and convert faster with high intent.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Intent Categorization: Informational, Commercial & Transactional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Competitor Keyword Gap Analysis & SERP Feature Mapping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Long-Tail Cannibalization Prevention & Silo Architecture</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/products/wordpress/seoly/request"
                  className="px-8 py-4 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-xl shadow-red-500/25 transition inline-flex items-center gap-2"
                >
                  Start Your Keyword Research Today <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c3-1024x846.webp"
                    alt="Keyword Analytics Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Grid */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Deliverables</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-2">What&apos;s Included</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E02B2B] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Niche Keyword Discovery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thorough audit of your specific vertical uncovering untapped search terms with minimal bidding competition.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">In-Depth Keyword Metrics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accurate search volume distributions, CPC benchmarks, seasonal trend swings, and organic click-through rates.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Pillar Topic Mapping</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic clustering of queries into parent topics and sub-articles to establish undeniable topical authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our SEO Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E02B2B]">Step-by-Step Blueprint</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-2">Our SEO Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-[#E02B2B] text-white font-black text-sm flex items-center justify-center mx-auto mb-4">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">Step 1: Ingestion & Seed</h3>
              <p className="text-xs text-slate-500">Analyze current assets, audience personas, and primary core offering seeds.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mx-auto mb-4">
                2
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">Step 2: Competitive Gap</h3>
              <p className="text-xs text-slate-500">Cross-reference top 5 ranking competitors to locate overlooked search phrases.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mx-auto mb-4">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">Step 3: Cluster Structuring</h3>
              <p className="text-xs text-slate-500">Group queries into semantic clusters with dedicated URLs and content blueprints.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-center">
              <span className="w-10 h-10 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center mx-auto mb-4">
                4
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">Step 4: Tracking & Action</h3>
              <p className="text-xs text-slate-500">Daily ranking monitors and automated alerts for sudden position shifts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to Rank Higher?</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3">
            Unlock the exact search terms your prospective customers are typing into Google right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/products/wordpress/seoly/request"
              className="px-8 py-4 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-sm shadow-xl shadow-red-500/25 transition"
            >
              Start Consultation
            </Link>
            <Link
              href="/products/wordpress/seoly/pricing"
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
            >
              See Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
