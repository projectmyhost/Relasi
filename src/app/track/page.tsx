'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Shield, 
  Lock, 
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
      setReport(null);
      setErrorMessage('Nomor Report ID atau PIN tidak cocok. Pastikan kombinasi angka sudah sesuai.');
    }
  };

  useEffect(() => {
    if (initialId && initialPin) {
      performLookup(initialId, initialPin);
    }
  }, [initialId, initialPin]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(reportIdInput, pinInput);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!report || !newMessage.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      const updated = RuangSuaraStore.addReportMessage(report.id, {
        sender: 'student',
        senderName: report.isAnonymous ? 'Pelapor (Anonim)' : (report.reporterName || 'Siswa'),
        content: newMessage.trim(),
      });

      if (updated) {
        setReport(updated);
        setNewMessage('');
      }
      setIsSending(false);
    }, 400);
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
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 shadow-xs text-slate-700 text-xs font-medium tracking-wide">
            <Lock className="w-3.5 h-3.5 text-[#E02B2B]" />
            <span>Kanal Pelacakan Privat &amp; Aman</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-950 tracking-tight leading-[1.2]">
            Lacak Status &amp; <span className="text-[#E02B2B]">Komunikasi Anonim</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Gunakan Report ID dan 6-digit PIN yang Anda terima saat mengirimkan laporan untuk memantau perkembangan penanganan dan berdiskusi secara privat dengan Guru BK.
          </p>
        </div>

        {/* Jika User Login Sebagai Siswa: Gabisa Cek Lacak PIN (Arahkan ke Laporan Saya) */}
        {currentUser.role === 'student' ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-300 shadow-md text-center space-y-5 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Shield className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight">
                Lacak PIN Hanya Khusus Guru BK &amp; Tamu
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Halo <strong className="text-slate-800">{currentUser.name}</strong>, akun Anda telah masuk sebagai <strong>Siswa</strong>. Seluruh riwayat laporan, perkembangan status investigasi, dan ruang chat rahasia Anda langsung terhubung di halaman <strong>Laporan Saya</strong> tanpa perlu mengingat PIN secara manual.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/my-reports"
                style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <span>Buka Riwayat Laporan Saya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Form Pencarian Tiket (Khusus Guru BK & Tamu) */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-300 shadow-md space-y-5">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-6">
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">Nomor Tiket (Report ID) *</label>
                  <input
                    type="text"
                    required
                    value={reportIdInput}
                    onChange={(e) => setReportIdInput(e.target.value)}
                    placeholder="Contoh: RS-2026-0412"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">6-Digit PIN Rahasia *</label>
                  <input
                    type="password"
                    required
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="6 digit angka PIN"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-mono tracking-widest text-slate-900 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                    className="w-full py-3.5 px-5 rounded-full !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Buka</span>
                  </button>
                </div>
              </form>

              {/* Quick Demo Fill Pills */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Contoh Tiket Demo:</span>
                <button
                  type="button"
                  onClick={() => {
                    setReportIdInput('RS-2026-0412');
                    setPinInput('491823');
                    performLookup('RS-2026-0412', '491823');
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-medium transition cursor-pointer"
                >
                  RS-2026-0412 (PIN: 491823) - Korban
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReportIdInput('RS-2026-0415');
                    setPinInput('318592');
                    performLookup('RS-2026-0415', '318592');
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-medium transition cursor-pointer"
                >
                  RS-2026-0415 (PIN: 318592) - Saksi
                </button>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#E02B2B]" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

        {/* Hasil Laporan Terverifikasi */}
        {report && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-black/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.04)] space-y-6">
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
            <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-black/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.04)] space-y-6">
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
                  report.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-500">
                        <span className="font-medium text-slate-800">{msg.senderName}</span>
                        <span>•</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'student'
                            ? 'bg-[#E02B2B] text-white rounded-br-none shadow-sm'
                            : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-slate-400">
                    Belum ada pesan. Anda dapat memulai mengirim pesan klarifikasi atau menambahkan keterangan kepada Guru BK di bawah.
                  </div>
                )}
              </div>

              {/* Send Box */}
              <form onSubmit={handleSendMessage} className="flex gap-3 pt-3 border-t border-slate-200">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ketik pesan klarifikasi atau keterangan tambahan..."
                  className="flex-1 px-5 py-3 text-xs sm:text-sm rounded-full border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={isSending || !newMessage.trim()}
                  style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                  className="px-6 py-3 rounded-full !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-xs sm:text-sm font-medium shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
