'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Tag, 
  MessageSquare, 
  Share2, 
  Check, 
  Send,
  Bookmark,
  ChevronRight
} from 'lucide-react';

export default function SingleBlogPage() {
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  });

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 5000);
    setCommentData({ comment: '', name: '', email: '', website: '', saveInfo: false });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Blog Detail Header */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-900/60 border border-red-700/80 text-red-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Tag className="w-3.5 h-3.5" />
            <span>On-Page SEO Technical Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            On-Page SEO Strategies to Boost Rankings
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E02B2B] text-white flex items-center justify-center font-bold text-[10px]">
                SA
              </span>
              <span className="font-semibold text-white">seoly-admin</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#E02B2B]" />
              <span>September 17, 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>3 Comments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Graphic */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 mb-12">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white p-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
            <img
              src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/blog-7.jpg"
              alt="On-Page SEO Strategies to Boost Rankings"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Body & Comments */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-slate-700 leading-relaxed text-base space-y-8">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          In today’s rapidly evolving market, staying ahead requires more than just intuition—it demands insight, structure, and algorithmic accuracy. Modern on-page search engine optimization is no longer about keyword stuffing; it is about semantic clarity, user intent resolution, and structured data entity modeling.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
          Master financial planning and investment tips for long-term wealth.
        </h2>

        <p>
          Search engines evaluate your content through the lens of helpfulness, experience, and authority (E-E-A-T). By prioritizing comprehensive topic coverage and clean technical DOM markup, your articles naturally establish topical ownership across your entire competitive keyword cluster.
        </p>

        <div className="p-6 rounded-2xl bg-[#F8FAFC] border-l-4 border-[#E02B2B] space-y-2">
          <p className="font-bold text-slate-900 text-sm">Key On-Page Checklist Takeaways:</p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Optimize single H1 per page aligned with primary search intent.</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Structure secondary subtopics using hierarchical H2 and H3 tags.</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Wrap images in responsive aspect-ratio containers with descriptive alt text.</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Embed JSON-LD Schema (Article, FAQ, BreadcrumbList) for rich snippet capture.</li>
          </ul>
        </div>

        {/* Secondary Article Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md my-8">
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
            <img
              src="https://reactheme.com/products/wordpress/seoly/wp-content/uploads/2025/09/c4-1024x667.webp"
              alt="Strategic Process Analytics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Leave a Reply</h3>
          <p className="text-xs text-slate-500 mb-6">
            Your email address will not be published. Required fields are marked *
          </p>

          <form onSubmit={handleComment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Comment *</label>
              <textarea
                rows={5}
                required
                value={commentData.comment}
                onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                placeholder="Share your thoughts or observations on this strategy..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Name *</label>
                <input
                  type="text"
                  required
                  value={commentData.name}
                  onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={commentData.email}
                  onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Website</label>
                <input
                  type="url"
                  value={commentData.website}
                  onChange={(e) => setCommentData({ ...commentData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#E02B2B]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="saveInfo"
                checked={commentData.saveInfo}
                onChange={(e) => setCommentData({ ...commentData, saveInfo: e.target.checked })}
                className="rounded border-slate-300 text-[#E02B2B] focus:ring-[#E02B2B]"
              />
              <label htmlFor="saveInfo" className="text-xs text-slate-600">
                Save my name, email, and website in this browser for the next time I comment.
              </label>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Post Comment
            </button>

            {commentSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold">
                Your comment has been submitted and is awaiting moderation!
              </div>
            )}
          </form>
        </div>
      </article>
    </div>
  );
}
