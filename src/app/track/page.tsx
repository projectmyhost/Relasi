'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Shield, 
  Clock, 
  MessageSquare, 
  Send, 
  AlertCircle,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { RuangSuaraStore } from '@/lib/store';
import { Report } from '@/lib/types';
import { useAuth } from '@/lib/authContext';
import { ArrowRight } from 'lucide-react';
import { formatTimeWIB } from '@/lib/utils';

function TrackReportContent() {
  const { currentUser } = useAuth();
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const initialPin = searchParams.get('pin') || '';

  const [reportIdInput, setReportIdInput] = useState(initialId);
  const [pinInput, setPinInput] = useState(initialPin);
  const [report, setReport] = useState<Report | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const performLookup = (id: string, pin: string) => {
    setErrorMessage('');
    if (!id.trim() || !pin.trim()) {
      setErrorMessage('Mohon masukkan Report ID dan 6-digit PIN.');
      return;
    }

    const found = RuangSuaraStore.getReportById(id.trim());
    if (found && found.pin === pin.trim()) {
      setReport(found);
    } else {
      // Also check PostgreSQL database
      fetch('/api/reports')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.reports)) {
            const matched = data.reports.find(
              (r: any) => r.id === id.trim() && r.pin === pin.trim()
            );
            if (matched) {
              setReport(matched);
              return;
            }
          }
          setReport(null);
          setErrorMessage('Nomor Report ID atau PIN tidak cocok. Pastikan kombinasi angka sudah sesuai.');
        })
        .catch(() => {
          setReport(null);
          setErrorMessage('Nomor Report ID atau PIN tidak cocok. Pastikan kombinasi angka sudah sesuai.');
        });
    }
  };

  useEffect(() => {
    if (initialId && initialPin) {
      performLookup(initialId, initialPin);
    }
  }, [initialId, initialPin]);

  // Periodic polling for new messages when viewing report on track page
  useEffect(() => {
    if (!report) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/chat/messages?reportId=${encodeURIComponent(report.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.messages)) {
            setReport((prev) => (prev ? { ...prev, messages: data.messages } : null));
          }
        }
      } catch {}
    }, 2500);

    return () => clearInterval(interval);
  }, [report?.id]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(reportIdInput, pinInput);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report || !newMessage.trim()) return;

    const content = newMessage.trim();
    setIsSending(true);

    const isCounselor = currentUser.role === 'counselor' || currentUser.role === 'super_admin';
    const senderRole = isCounselor ? 'counselor' : 'student';
    const senderName = isCounselor
      ? (currentUser.name ? `${currentUser.name} (Guru BK)` : 'Guru BK (Konselor)')
      : (report.isAnonymous ? 'Pelapor (Anonim)' : (report.reporterName || 'Siswa'));

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: report.id,
          sender: senderRole,
          senderName: senderName,
          content,
        }),
      });

      if (res.ok) {
        setNewMessage('');
        const chatRes = await fetch(`/api/chat/messages?reportId=${encodeURIComponent(report.id)}`);
        if (chatRes.ok) {
          const chatData = await chatRes.json();
          if (Array.isArray(chatData.messages)) {
            setReport((prev) => (prev ? { ...prev, messages: chatData.messages } : null));
          }
        }
      }
    } catch (e) {
      console.error('Failed to post message on track page:', e);
    } finally {
      setIsSending(false);
    }
  };

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">Menunggu Telaah BK</span>;
      case 'reviewed':
        return <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">Telah Ditelaah Guru BK</span>;
      case 'investigating':
        return <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200">Dalam Proses Investigasi</span>;
      case 'followup':
        return <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-red-50 text-[#E02B2B] border border-red-200">Tindak Lanjut &amp; Mediasi</span>;
      case 'resolved':
        return <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">Selesai &amp; Pemulihan</span>;
      case 'unsubstantiated':
        return <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Tidak Cukup Bukti</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 sm:py-14 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Strip */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Lacak Status &amp; <span className="text-[#E02B2B]">Komunikasi Anonim</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            Gunakan Report ID dan 6-digit PIN yang Anda terima saat mengirimkan laporan untuk memantau perkembangan penanganan dan berdiskusi secara privat dengan Guru BK.
          </p>
        </div>

        {/* Jika User Bukan Guru BK (Guest atau Siswa): Tampilkan Pesan Akses Terbatas */}
        {currentUser.role !== 'counselor' && currentUser.role !== 'super_admin' ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center space-y-5 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E02B2B] flex items-center justify-center mx-auto border border-red-100">
              <Shield className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Akses Terbatas: Khusus Guru BK
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                Halaman pelacakan dan verifikasi dossier laporan via PIN ini hanya dapat diakses oleh <strong>Guru Bimbingan Konseling (BK)</strong> yang berwenang menangani laporan siswa.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {currentUser.role === 'student' ? (
                <Link
                  href="/my-reports"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-semibold text-xs sm:text-sm shadow-sm transition active:scale-[0.99] cursor-pointer"
                >
                  <span>Buka Riwayat Laporan Saya</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-semibold text-xs sm:text-sm shadow-sm transition active:scale-[0.99] cursor-pointer"
                >
                  <span>Masuk sebagai Guru BK</span>
                </Link>
              )}
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-800 border border-stone-200 font-semibold text-xs sm:text-sm transition active:scale-[0.99] cursor-pointer"
              >
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Form Pencarian Tiket (Khusus Guru BK & Super Admin) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-sm space-y-6">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-6">
                  <label className="text-xs font-semibold text-slate-700 block mb-2">Nomor Tiket (Report ID) *</label>
                  <input
                    type="text"
                    required
                    value={reportIdInput}
                    onChange={(e) => setReportIdInput(e.target.value)}
                    placeholder="Contoh: RS-2026-0412"
                    className="h-12 w-full px-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-mono text-slate-900 placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:border-[#E02B2B] focus:ring-2 focus:ring-red-500/15 transition-all shadow-xs"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-xs font-semibold text-slate-700 block mb-2">6-Digit PIN Rahasia *</label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="6 digit angka PIN"
                    className="h-12 w-full px-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-mono tracking-widest text-slate-900 placeholder:text-slate-400 placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:border-[#E02B2B] focus:ring-2 focus:ring-red-500/15 transition-all shadow-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="h-12 w-full px-5 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] active:bg-[#b01e1e] text-white font-semibold text-sm shadow-[0_2px_10px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Buka</span>
                  </button>
                </div>
              </form>

              {/* Quick Demo Fill Pills */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-600 mr-1">Contoh Tiket Demo:</span>
                <button
                  type="button"
                  onClick={() => {
                    setReportIdInput('RS-2026-0412');
                    setPinInput('491823');
                    performLookup('RS-2026-0412', '491823');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/90 font-mono text-xs font-medium transition-colors cursor-pointer"
                >
                  RS-2026-0412 (PIN: 491823) <span className="font-sans text-slate-500 font-normal">· Korban</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReportIdInput('RS-2026-0415');
                    setPinInput('318592');
                    performLookup('RS-2026-0415', '318592');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/90 font-mono text-xs font-medium transition-colors cursor-pointer"
                >
                  RS-2026-0415 (PIN: 318592) <span className="font-sans text-slate-500 font-normal">· Saksi</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 text-xs sm:text-sm text-red-700 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#E02B2B]" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

        {/* Hasil Laporan Terverifikasi */}
        {report && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                    Tiket Laporan Terbuka:
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 font-mono flex items-center gap-2.5">
                    <span>{report.id}</span>
                    <span className="text-xs font-sans font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {report.isAnonymous ? 'Anonim' : 'Identitas Terbuka'}
                    </span>
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                    Status Penanganan Saat Ini:
                  </span>
                  {getStatusBadge(report.status)}
                </div>
              </div>

              {/* Grid Metadata Laporan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#F6F4F0] border border-slate-200/80">
                  <span className="text-slate-500 font-medium block mb-1">Waktu Kejadian:</span>
                  <span className="font-medium text-slate-900">{report.incidentDate} ({report.incidentTime})</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F6F4F0] border border-slate-200/80">
                  <span className="text-slate-500 font-medium block mb-1">Lokasi:</span>
                  <span className="font-medium text-slate-900">{report.location}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F6F4F0] border border-slate-200/80">
                  <span className="text-slate-500 font-medium block mb-1">Tingkat Urgensi:</span>
                  <span className={`font-medium ${report.urgency === 'urgent' ? 'text-[#E02B2B]' : 'text-slate-900'}`}>
                    {report.urgency.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Isi Narasi Laporan */}
              <div className="p-5 rounded-2xl bg-[#F6F4F0] border border-slate-200/80 space-y-2">
                <span className="text-xs font-medium text-slate-800 block">Kronologi Kejadian Asli:</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-5 rounded-xl border border-slate-200/90 font-normal">
                  &ldquo;{report.description}&rdquo;
                </p>
              </div>

              {/* Step Flow Penanganan */}
              <div className="pt-2">
                <span className="text-xs font-medium text-slate-800 uppercase tracking-wider block mb-3">
                  Tahapan Alur Penanganan di Sekolah:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-medium">
                  <div className={`p-3.5 rounded-2xl border ${report.status !== 'submitted' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-[#E02B2B]'}`}>
                    1. Masuk Antrean BK
                  </div>
                  <div className={`p-3.5 rounded-2xl border ${['investigating', 'followup', 'resolved'].includes(report.status) ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    2. Telaah Bukti &amp; Pola
                  </div>
                  <div className={`p-3.5 rounded-2xl border ${['followup', 'resolved'].includes(report.status) ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    3. Investigasi &amp; Mediasi
                  </div>
                  <div className={`p-3.5 rounded-2xl border ${report.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    4. Penyelesaian &amp; Pulih
                  </div>
                </div>
              </div>
            </div>

            {/* Chatbox Komunikasi Tertutup dengan Guru BK */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-[#E02B2B] flex items-center justify-center font-medium">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-base">Ruang Percakapan Tertutup dengan Guru BK</h3>
                    <p className="text-xs text-slate-500">Pesan terenkripsi dua arah. Tetap anonim tanpa takut identitas tersebar.</p>
                  </div>
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                {report.messages && report.messages.length > 0 ? (
                  report.messages.map((msg) => {
                    const isCounselorViewer = currentUser.role === 'counselor' || currentUser.role === 'super_admin';
                    const isMyMessage = isCounselorViewer
                      ? msg.sender === 'counselor'
                      : msg.sender === 'student';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-500">
                          <span className={`font-semibold ${isMyMessage ? 'text-[#E02B2B]' : 'text-slate-800'}`}>
                            {msg.senderName} {isMyMessage ? '(Anda)' : ''}
                          </span>
                          <span>•</span>
                          <span>{formatTimeWIB(msg.timestamp)}</span>
                        </div>
                        <div
                          className={`p-4 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed ${
                            isMyMessage
                              ? 'bg-[#E02B2B] text-white rounded-br-none shadow-sm'
                              : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80'
                          }`}
                        >
                          {msg.imageUrl && (
                            <div className="mb-2.5 rounded-xl overflow-hidden border border-black/10 bg-black/5">
                              <img
                                src={msg.imageUrl}
                                alt="Lampiran foto bukti"
                                className="max-h-64 w-full object-contain rounded-lg"
                              />
                            </div>
                          )}
                          {msg.content}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Belum ada pesan. Anda dapat memulai mengirim pesan arahan, respon klarifikasi, atau panduan kepada Siswa/Pelapor di bawah.
                  </div>
                )}
              </div>

              {/* Send Box */}
              <form onSubmit={handleSendMessage} className="flex gap-3 pt-4 border-t border-slate-100">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={
                    currentUser.role === 'counselor' || currentUser.role === 'super_admin'
                      ? "Ketik pesan arahan, respon klarifikasi, atau panduan kepada Siswa..."
                      : "Ketik pesan klarifikasi atau keterangan tambahan..."
                  }
                  className="flex-1 h-12 px-4 text-xs sm:text-sm rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E02B2B] focus:ring-2 focus:ring-red-500/15 transition-all shadow-xs"
                />
                <button
                  type="submit"
                  disabled={isSending || !newMessage.trim()}
                  className="h-12 px-6 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] active:bg-[#b01e1e] text-white text-xs sm:text-sm font-semibold shadow-[0_2px_10px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim</span>
                </button>
              </form>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#F6F4F0] flex items-center justify-center p-8">Memuat kanal pelacakan...</div>}>
      <TrackReportContent />
    </Suspense>
  );
}
