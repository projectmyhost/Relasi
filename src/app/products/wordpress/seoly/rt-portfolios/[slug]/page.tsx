'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, TrendingUp, ExternalLink, ChevronRight, ShieldCheck } from 'lucide-react';

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'google';
  const isGoogle = slug.toLowerCase().includes('google');

  const title = isGoogle ? 'Google Ecosystem Search Dominance' : 'Honda Regional Automotive Expansion';
  const metric = isGoogle ? '+450% Organic Traffic Lift' : '+320% Inbound Dealer Inquiries';
  const image = isGoogle 
    ? 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/project-7.webp'
    : 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c3-1024x846.webp';

  return (
    <div className="flex-1 flex flex-col bg-white">
      <section className="bg-slate-900 text-white py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/products/wordpress/seoly/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E02B2B] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Case Studies
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black">{title}</h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3">{metric} achieved across 12 consecutive months.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Project Overview & Background</h2>
            <p>
              We’ll explore how our tailored strategies transformed business online visibility, driving increased targeted traffic and revenue. Starting from a thorough technical audit to resolve crawling bottlenecks, our team systematically re-architected topical clusters and deployed high-tier editorial backlinks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl font-black text-[#E02B2B]">{metric.split(' ')[0]}</span>
                <p className="text-xs text-slate-500 mt-1 font-semibold">Primary Growth Metric</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900">140+</span>
                <p className="text-xs text-slate-500 mt-1 font-semibold">Page-1 Keyword Ranks</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-2xl font-black text-emerald-600">0</span>
                <p className="text-xs text-slate-500 mt-1 font-semibold">Crawl Errors Remaining</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6">Strategic Milestones</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Full migration to clean semantic HTML5 and lightweight React components.</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Resolution of canonicalization and parameter URL dilution.</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Strategic editorial PR placement on Tier-1 industry domains.</li>
            </ul>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/products/wordpress/seoly/request"
              className="px-8 py-4 !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-xs rounded-xl shadow-lg transition"
            >
              Request Strategy Consultation
            </Link>
            <Link
              href="/products/wordpress/seoly/case-studies"
              className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
            >
              See Other Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
