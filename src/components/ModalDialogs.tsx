'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Globe, Mail } from 'lucide-react';

export default function ModalDialogs() {
  const [proposalOpen, setProposalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#modal-action' || hash === '#modal-proposal' || hash === '#modal-consultation') {
        setProposalOpen(true);
        setSubmitted(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Intercept click on any button or anchor targeting #modal-action
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href === '#modal-action' || href === '#modal-proposal' || href === '#modal-consultation') {
        e.preventDefault();
        setProposalOpen(true);
        setSubmitted(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const closeProposal = () => {
    setProposalOpen(false);
    if (window.location.hash.startsWith('#modal-')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeProposal();
      setSubmitted(false);
    }, 2500);
  };

  return (
    <>
      {/* Consultation Modal */}
      {proposalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E02B2B]"></div>
                <h3 className="text-sm font-medium text-slate-900">Konsultasi Terlindung &amp; Layanan</h3>
              </div>
              <button
                onClick={closeProposal}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-medium text-slate-900">Pesan Terkirim</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto font-normal">
                    Tim penanganan akan segera meninjau permohonan Anda melalui jalur yang aman.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500 font-normal">
                    Silakan isi rincian kontak atau topik koordinasi yang ingin diajukan:
                  </p>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Tautan / Referensi Satuan Pendidikan</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="https://sekolah.sch.id"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 font-normal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700">Nama Lengkap *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 font-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700">Email Resmi *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          placeholder="nama@sekolah.sch.id"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 font-normal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Keperluan Konsultasi</label>
                    <select className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white font-normal">
                      <option>Penerapan PPKSP Satuan Pendidikan</option>
                      <option>SOP Bimbingan Konseling &amp; Privasi</option>
                      <option>Sosialisasi Pencegahan Kekerasan Siswa</option>
                      <option>Konsultasi Tata Kelola Sistem</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl text-xs font-medium !text-white !bg-[#E02B2B] hover:!bg-[#c92424] transition shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirimkan Permintaan</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
