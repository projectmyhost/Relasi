'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function BlogDefaultPage() {
  const articles = [
    {
      title: 'On-Page SEO Strategies to Boost Rankings',
      slug: '/products/wordpress/seoly/on-page-seo-strategies-to-boost-rankings',
      date: 'September 17, 2026',
      author: 'seoly-admin',
      category: 'SEO Strategy',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/blog-7.jpg',
      excerpt: "In today’s rapidly evolving market, staying ahead requires more than just intuition—it demands insight, structure, and proven on-page optimization principles.",
    },
    {
      title: 'Link Building Methods That Still Work in 2025',
      slug: '/products/wordpress/seoly/on-page-seo-strategies-to-boost-rankings',
      date: 'September 12, 2026',
      author: 'seoly-admin',
      category: 'Backlinks',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/blog-6.webp',
      excerpt: "In today’s rapidly evolving market, staying ahead requires more than just intuition—it demands insight, structure, and ethical high-tier digital outreach.",
    },
    {
      title: 'Mastering Semantic Entity Optimization for Generative AI',
      slug: '/products/wordpress/seoly/on-page-seo-strategies-to-boost-rankings',
      date: 'August 28, 2026',
      author: 'Benny Quirke',
      category: 'AI Overviews',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c7-1024x608.webp',
      excerpt: "In today’s rapidly evolving market, staying ahead requires more than just intuition—it demands insight, structure, and precise Knowledge Graph entity alignment.",
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Blog Header Banner */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Search Knowledge Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Blog
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Actionable insights, algorithm teardowns, and advanced tactical playbooks from our search architects.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Blog</span>
          </div>
        </div>
      </section>

      {/* Main Blog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item, idx) => (
              <article key={idx} className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E02B2B]" /> {item.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {item.author}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#0F172A] group-hover:text-[#E02B2B] transition-colors leading-snug mb-3">
                      <Link href={item.slug}>{item.title}</Link>
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={item.slug}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E02B2B] hover:gap-2.5 transition-all"
                  >
                    <span>Read Full Article</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-16">
            <span className="w-10 h-10 rounded-xl bg-[#E02B2B] text-white font-bold text-xs flex items-center justify-center shadow-md">
              1
            </span>
            <Link href="/products/wordpress/seoly/blog-list" className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:border-slate-300 font-bold text-xs flex items-center justify-center transition">
              2
            </Link>
            <Link href="/products/wordpress/seoly/blog-list" className="px-4 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:border-slate-300 font-bold text-xs flex items-center justify-center transition">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
