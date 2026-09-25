'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  ExternalLink, 
  Eye, 
  ShoppingCart, 
  Check, 
  Sparkles,
  Send,
  Zap,
  Layers
} from 'lucide-react';

export default function HtmlTemplatesPage() {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribeSuccess(true);
      setTimeout(() => setSubscribeSuccess(false), 4000);
      setSubscribedEmail('');
    }
  };

  const templates = [
    {
      title: 'MuchWow – Meme coin ICO and Crypto HTML Template',
      category: 'Crypto & Web3',
      price: 19,
      originalPrice: 39,
      image: 'https://reactheme.com/wp-content/uploads/2026/06/muchwow__large_preview.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
    },
    {
      title: 'Luminos – IT Solutions & Technology HTML Template',
      category: 'Corporate & Tech',
      price: 17,
      originalPrice: 34,
      image: 'https://reactheme.com/wp-content/uploads/2026/06/luminos__large_preview.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
    },
    {
      title: 'Saafiy – Cleaning Service & Sanitization HTML Template',
      category: 'Services & Business',
      price: 16,
      originalPrice: 30,
      image: 'https://reactheme.com/wp-content/uploads/2024/11/saafiy-html.png',
      link: '/product/seoly-seo-digital-marketing-wordpress-theme',
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Banner Notice */}
      <div className="bg-[#0F172A] text-white py-2.5 px-4 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p className="text-slate-300">
            Now available — get our themes directly at <strong className="text-white">reactheme.com</strong>. Pay less, get supported longer, update in one click.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/wordpress-themes" className="text-[#E02B2B] hover:text-red-400 font-bold transition">
              WordPress Themes
            </Link>
            <Link href="/my-account" className="text-slate-400 hover:text-white transition">
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Catalog Header */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>Clean Frontend Codebases</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            HTML Templates - WordPress Themes & Plugin
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3">
            Our core value is regularity, responsiveness, and innovation. This is why people love us With the qualified dedicated support.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((tpl, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={tpl.image}
                      alt={tpl.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{tpl.category}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#0F172A]">${tpl.price}</span>
                        <span className="text-xs text-slate-400 line-through">${tpl.originalPrice}</span>
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[#E02B2B] transition leading-snug mb-3">
                      {tpl.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-2">
                  <Link
                    href="/checkout"
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Purchase
                  </Link>
                  <Link
                    href="/products/wordpress/seoly"
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/wordpress-themes"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Browse More Themes & Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="bg-[#0F172A] py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Subscribe for New HTML Release Alerts
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Get early-bird 50% discount codes whenever our developers ship new templates.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                id="custom_submit_button-5_1"
                type="email"
                placeholder="Enter email address..."
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#E02B2B] w-full sm:w-80"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs sm:text-sm transition shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
          {subscribeSuccess && (
            <div className="mt-4 p-3 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs sm:text-sm text-center">
              Thank you! You have been successfully subscribed to ReacTheme releases.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
