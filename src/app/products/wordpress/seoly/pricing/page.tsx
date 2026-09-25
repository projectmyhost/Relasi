'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Pricing Hero Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Investment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Pricing Plans
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Scalable search marketing engagements with no long-term lock-in and 100% transparent deliverables.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Pricing</span>
          </div>
        </div>
      </section>

      {/* Main Pricing Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Switcher */}
          <div className="flex justify-center mb-16">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  billingCycle === 'annual' ? 'bg-[#E02B2B] text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-red-800 text-[10px] py-0.5 px-1.5 rounded-full text-white">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Free Trial */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-200/60 p-2.5 mb-6">
                  <img src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/search.svg" alt="" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Free Trial</h3>
                <p className="text-xs text-slate-500 mt-1">Foundational site health & keyword test</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-[#0F172A]">Free</span>
                  <span className="text-xs text-slate-500 ml-1">/ 14 Days</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8 divide-y divide-slate-100">
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 10 Keywords Tracking</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Automated Weekly Health Crawl</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Top 3 Competitor Scans</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Community & Email Support</li>
                </ul>
              </div>
              <Link
                href="/products/wordpress/seoly/request"
                className="w-full py-3.5 text-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
              >
                Start Free
              </Link>
            </div>

            {/* Business Plan */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#E02B2B] shadow-2xl relative flex flex-col justify-between scale-105 z-10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E02B2B] text-white text-[10px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
                Most Popular
              </span>
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100 p-2.5 mb-6">
                  <img src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/chart.svg" alt="" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Business</h3>
                <p className="text-xs text-slate-500 mt-1">Accelerate ranking momentum for established brands</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-[#0F172A]">
                    ${billingCycle === 'monthly' ? '119.99' : '95.99'}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8 divide-y divide-slate-100">
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-[#E02B2B] shrink-0" /> 100 Target Keywords Tracking</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-[#E02B2B] shrink-0" /> Deep Content & Heading Optimization</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-[#E02B2B] shrink-0" /> 5 Verified Editorial DA50+ Backlinks</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-[#E02B2B] shrink-0" /> Dedicated Senior SEO Account Manager</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-[#E02B2B] shrink-0" /> Bi-Weekly Video Strategy Consults</li>
                </ul>
              </div>
              <Link
                href="/products/wordpress/seoly/request"
                className="w-full py-4 text-center rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-xs shadow-lg shadow-red-500/30 transition flex items-center justify-center gap-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Ultimate Plan */}
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-200/60 p-2.5 mb-6">
                  <img src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/startup.png" alt="" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Ultimate</h3>
                <p className="text-xs text-slate-500 mt-1">Total search dominance across high-value verticals</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-[#0F172A]">
                    ${billingCycle === 'monthly' ? '159.99' : '127.99'}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 mb-8 divide-y divide-slate-100">
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Keyword Monitoring</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 15 High-Authority Tier-1 Editorial Links</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Daily Google Algorithm Volatility Checks</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 24/7 VIP Phone & Slack Support Channel</li>
                  <li className="flex items-center gap-2 pt-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Conversion Rate Optimization Audits</li>
                </ul>
              </div>
              <Link
                href="/products/wordpress/seoly/request"
                className="w-full py-3.5 text-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Feature Comparison Matrix</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Compare deliverables across all plans</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="p-4 font-bold">Feature Deliverables</th>
                  <th className="p-4 font-bold text-center">Free Trial</th>
                  <th className="p-4 font-bold text-center text-[#E02B2B]">Business</th>
                  <th className="p-4 font-bold text-center">Ultimate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Tracked Keywords</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center font-bold text-slate-900">100</td>
                  <td className="p-4 text-center font-bold text-emerald-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Monthly Editorial Backlinks</td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 text-center font-bold">5 Links</td>
                  <td className="p-4 text-center font-bold text-emerald-600">15 Links</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Core Web Vitals Audit</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center font-bold">Full Deep-Scan</td>
                  <td className="p-4 text-center font-bold text-emerald-600">Continuous Realtime</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Dedicated Account Strategist</td>
                  <td className="p-4 text-center">-</td>
                  <td className="p-4 text-center font-bold text-emerald-600">Included</td>
                  <td className="p-4 text-center font-bold text-emerald-600">Included (VIP Priority)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
