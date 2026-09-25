'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  ChevronRight, 
  Search, 
  Tag, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';

export default function BlogListPage() {
  const posts = [
    {
      title: 'On-Page SEO Strategies to Boost Rankings',
      slug: '/products/wordpress/seoly/on-page-seo-strategies-to-boost-rankings',
      date: 'September 17, 2026',
      author: 'seoly-admin',
      avatar: 'https://reactheme.com/products/wordpress/seoly/wp-content/litespeed/avatar/fbdec0182b8f07c369a7e687e31c6f2e.jpg?ver=1789291855',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/blog-7.jpg',
      category: 'On-Page SEO',
      excerpt: "In today’s rapidly evolving market, staying ahead requires more than just intuition—it demands insight, structure, and systematic page architecture.",
    },
    {
      title: 'Link Building Methods That Still Work in 2025',
      slug: '/products/wordpress/seoly/on-page-seo-strategies-to-boost-rankings',
      date: 'September 14, 2026',
      author: 'seoly-admin',
      avatar: 'https://reactheme.com/products/wordpress/seoly/wp-content/litespeed/avatar/fbdec0182b8f07c369a7e687e31c6f2e.jpg?ver=1789291855',
      image: 'https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c7-1024x608.webp',
      category: 'Outreach & PR',
      excerpt: "In today’s rapidly evolving market, staying ahead requires more than just intuition—it demands insight, structure, and editorial credibility.",
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Blog List Header */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#E02B2B] text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial Feed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Blog List
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Curated list of technical articles, case study breakdowns, and tactical guides.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 uppercase font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#E02B2B]">Blog List</span>
          </div>
        </div>
      </section>

      {/* Main Blog List Content with Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Blog List Feed */}
            <div className="lg:col-span-8 space-y-12">
              {posts.map((post, idx) => (
                <article key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col sm:flex-row items-stretch">
                  <div className="sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden bg-slate-100 relative shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{post.date}</span>
                      </div>

                      <h2 className="text-xl font-bold text-[#0F172A] hover:text-[#E02B2B] transition leading-snug mb-3">
                        <Link href={post.slug}>{post.title}</Link>
                      </h2>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link
                      href={post.slug}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E02B2B] hover:gap-2.5 transition-all pt-3 border-t border-slate-100"
                    >
                      Read Full Article <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Col: Blog Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Search Widget */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Search Articles</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#E02B2B]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              {/* Categories Widget */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Categories</h3>
                <div className="space-y-2 text-xs font-medium text-slate-600">
                  <Link href="/products/wordpress/seoly/blog" className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition">
                    <span>On-Page Optimization</span>
                    <span className="text-slate-400 font-bold">(14)</span>
                  </Link>
                  <Link href="/products/wordpress/seoly/blog" className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition">
                    <span>Backlink Acquisition</span>
                    <span className="text-slate-400 font-bold">(9)</span>
                  </Link>
                  <Link href="/products/wordpress/seoly/blog" className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition">
                    <span>Technical & Crawlability</span>
                    <span className="text-slate-400 font-bold">(12)</span>
                  </Link>
                  <Link href="/products/wordpress/seoly/blog" className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition">
                    <span>AI Overviews & SGE</span>
                    <span className="text-slate-400 font-bold">(7)</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
