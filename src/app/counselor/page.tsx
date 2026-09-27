'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Shield, 
  Inbox, 
  AlertTriangle, 
  GitMerge, 
  Layers, 
  Clock, 
  Search, 
  User, 
  EyeOff, 
  MessageSquare, 
  Send, 
  ArrowRight,
  Eye,
  Check,
} from 'lucide-react';
import { RuangSuaraStore } from '@/lib/store';
import { Report, ReportStatus } from '@/lib/types';
import { useAuth } from '@/lib/authContext';
import { useRealtimeChat } from '@/hooks/useRealtimeChat';

function CounselorDashboardContent() {
  const { currentUser } = useAuth();
  const searchParams = useSearchParams();
  const urlReportId = searchParams.get('reportId');

  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'needs_review' | 'urgent' | 'anonymous'>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [counselorReply, setCounselorReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const counselorChatContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    messages: realtimeMessages,
    isConnected,
    isSending: isRealtimeSending,
    typingStatus,
    sendMessage: sendRealtimeMessage,
    sendTypingIndicator,
  } = useRealtimeChat({
    reportId: selectedReport?.id,
    currentRole: 'counselor',
    initialMessages: (selectedReport?.messages || []) as any,
  });

  const loadData = () => {
    const list = RuangSuaraStore.getReports();
    setReports(list);
    if (!selectedReport && list.length > 0) {
      if (urlReportId) {
        const match = list.find((r) => r.id === urlReportId);
        setSelectedReport(match || list[0]);
      } else {
        setSelectedReport(list[0]);
      }
    } else if (selectedReport) {
      const refreshed = list.find(r => r.id === selectedReport.id);
      if (refreshed) setSelectedReport(refreshed);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (urlReportId && reports.length > 0) {
      const target = reports.find((r) => r.id === urlReportId);
      if (target) setSelectedReport(target);
    }
  }, [urlReportId, reports]);

  // WhatsApp-style real-time unread messages listener
  useEffect(() => {
    if (currentUser.role !== 'counselor') return;

    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/counselor/notifications/stream');
      es.onmessage = (event) => {
        try {
          if (!event.data || event.data === ':keepalive') return;
          const data = JSON.parse(event.data);
          if (data.reportId) {
            setUnreadCounts((prev) => {
              if (selectedReport?.id === data.reportId) return prev;
              return {
                ...prev,
                [data.reportId]: (prev[data.reportId] || 0) + 1,
              };
            });
          }
        } catch (e) {
          console.error(e);
        }
      };
    } catch (err) {
      console.error(err);
    }

    return () => {
      if (es) es.close();
    };
  }, [currentUser.role, selectedReport?.id]);

  // Scroll ONLY the chat box internally without touching the browser window!
  useEffect(() => {
    if (counselorChatContainerRef.current) {
      counselorChatContainerRef.current.scrollTop = counselorChatContainerRef.current.scrollHeight;
    }
  }, [realtimeMessages]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSelectReport = (r: Report) => {
    setSelectedReport(r);
    setUnreadCounts((prev) => {
      if (!prev[r.id]) return prev;
      const next = { ...prev };
      delete next[r.id];
      return next;
    });
  };

  // Metrik Utama Sesuai Dokumen PPKSP Permendikbudristek No. 46/2023
  const countNeedsReview = reports.filter(r => r.status === 'submitted').length;
  const countUrgent = reports.filter(r => r.urgency === 'urgent').length;
  const signals = RuangSuaraStore.getSignals();
  const countSignals = signals.filter(s => s.status === 'suggested').length;
  const cases = RuangSuaraStore.getCases();
  const countActiveCases = cases.filter(c => c.status === 'under_investigation' || c.status === 'follow_up_required').length;
  const countFollowup = reports.filter(r => r.status === 'followup').length;

  const filteredReports = reports.filter(r => {
    const matchSearch = 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.partiesInvolved && r.partiesInvolved.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchSearch) return false;

    if (activeTab === 'needs_review') return r.status === 'submitted';
    if (activeTab === 'urgent') return r.urgency === 'urgent';
    if (activeTab === 'anonymous') return r.isAnonymous;
    return true;
  });

  const handleUpdateStatus = (newStatus: ReportStatus) => {
    if (!selectedReport) return;
    RuangSuaraStore.updateReportStatus(selectedReport.id, newStatus);
    RuangSuaraStore.addAuditLog({
      actor: currentUser.name || 'Guru BK',
      role: 'counselor',
      action: 'UPDATE_STATUS',
      target: selectedReport.id,
      detail: `Mengubah status laporan menjadi ${newStatus}`,
    });
    loadData();
  };

  const handleSendCounselorMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport || !counselorReply.trim() || cooldown > 0) return;

    const senderName = currentUser.name || 'Guru BK (Ibu Siti Rahmawati)';
    const textToSend = counselorReply.trim();
    setCounselorReply('');
    setCooldown(2);
    setIsReplying(true);

    const success = await sendRealtimeMessage(textToSend, 'counselor', senderName);
    if (success) {
      RuangSuaraStore.addReportMessage(selectedReport.id, {
        sender: 'counselor',
        senderName,
        content: textToSend,
      });

      RuangSuaraStore.addAuditLog({
        actor: currentUser.name || 'Guru BK',
        role: 'counselor',
        action: 'SEND_MESSAGE',
        target: selectedReport.id,
        detail: `Mengirim pesan klarifikasi tertutup kepada pelapor`,
      });
      loadData();
    } else {
      setCounselorReply(textToSend);
      setCooldown(0);
    }
    setIsReplying(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 lg:py-12 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#E02B2B] text-xs font-medium uppercase tracking-wider border border-red-200/60">
              <Shield className="w-3.5 h-3.5" />
              <span>Ruang Kerja Bimbingan Konseling (Kanal Tertutup)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-slate-950 tracking-tight">
              Dashboard Penanganan <span className="text-[#E02B2B]">Laporan Siswa</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Pengelola: <span className="text-slate-800 font-medium">{currentUser.name}</span> • Hak Akses: <span className="text-emerald-700 font-medium">Privat Konseling BK Terbuka</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/counselor/cases"
              className="px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium transition flex items-center gap-2 shadow-2xs"
            >
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Berkas Kasus ({cases.length})</span>
            </Link>
            <Link
              href="/counselor/signals"
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition flex items-center gap-2 shadow-2xs"
            >
              <GitMerge className="w-4 h-4 text-slate-300" />
              <span>Korelasi Kejadian ({countSignals})</span>
            </Link>
          </div>
        </div>

        {/* 5 Metrik Inti (Kartu Biasa yang Bersih & Berbobot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div 
            onClick={() => setActiveTab('needs_review')}
            className={`p-5 rounded-2xl border transition cursor-pointer ${
              activeTab === 'needs_review' ? 'border-[#E02B2B] bg-red-50/40 shadow-xs' : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Perlu Ditinjau</span>
              <Inbox className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-slate-900">{countNeedsReview}</div>
            <span className="text-[11px] text-amber-700 font-normal mt-1 block">Laporan baru masuk</span>
          </div>

          <div 
            onClick={() => setActiveTab('urgent')}
            className={`p-5 rounded-2xl border transition cursor-pointer ${
              activeTab === 'urgent' ? 'border-[#E02B2B] bg-red-50/40 shadow-xs' : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mendesak</span>
              <AlertTriangle className="w-4 h-4 text-[#E02B2B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-[#E02B2B]">{countUrgent}</div>
            <span className="text-[11px] text-red-600 font-normal mt-1 block">Tindakan pencegahan cepat</span>
          </div>

          <Link 
            href="/counselor/signals"
            className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Pola Kejadian</span>
              <GitMerge className="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-slate-900">{countSignals}</div>
            <span className="text-[11px] text-slate-600 font-normal mt-1 block">Indikasi saling terkait &rarr;</span>
          </Link>

          <Link 
            href="/counselor/cases"
            className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition shadow-2xs group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Berkas Aktif</span>
              <Layers className="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-slate-900">{countActiveCases}</div>
            <span className="text-[11px] text-slate-600 font-normal mt-1 block">Investigasi &amp; mediasi</span>
          </Link>

          <div 
            onClick={() => setActiveTab('all')}
            className={`p-5 rounded-2xl border transition cursor-pointer col-span-2 sm:col-span-1 ${
              activeTab === 'all' ? 'border-[#E02B2B] bg-red-50/40 shadow-xs' : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Tindak Lanjut</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-slate-900">{countFollowup}</div>
            <span className="text-[11px] text-emerald-700 font-normal mt-1 block">Pendampingan siswa</span>
          </div>
        </div>

        {/* Layout 2 Kolom: Inbox Laporan (Kiri) vs Detail & Chat (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Daftar Laporan (5 Kolom) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            {/* Filter Tabs & Search */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-[#E02B2B]" />
                  <span>Antrean Laporan Masuk ({filteredReports.length})</span>
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nomor register, lokasi, uraian..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white font-normal shadow-2xs"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 border-b border-slate-100 pb-2 text-[11px] font-medium overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Semua ({reports.length})
                </button>
                <button
                  onClick={() => setActiveTab('needs_review')}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'needs_review' ? 'bg-[#E02B2B] text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Belum Ditinjau ({countNeedsReview})
                </button>
                <button
                  onClick={() => setActiveTab('urgent')}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'urgent' ? 'bg-red-700 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Mendesak ({countUrgent})
                </button>
                <button
                  onClick={() => setActiveTab('anonymous')}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeTab === 'anonymous' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Anonim
                </button>
              </div>
            </div>

            {/* List Report Items */}
            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredReports.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 font-normal">
                  Tidak ada laporan yang sesuai kriteria pencarian.
                </div>
              ) : (
                filteredReports.map((r) => {
                  const isSelected = selectedReport?.id === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => handleSelectReport(r)}
                      className={`p-4 rounded-xl border cursor-pointer transition text-left ${
                        isSelected 
                          ? 'border-[#E02B2B] bg-red-50/30 shadow-2xs' 
                          : 'border-slate-200/70 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-medium text-slate-900">{r.id}</span>
                          {r.isAnonymous ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 flex items-center gap-1">
                              <EyeOff className="w-2.5 h-2.5" /> Anonim
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 flex items-center gap-1">
                              <User className="w-2.5 h-2.5" /> Terbuka
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* WhatsApp-Style Unread Counter Badge */}
                          {(unreadCounts[r.id] || 0) > 0 && (
                            <span 
                              title={`${unreadCounts[r.id]} pesan baru dari siswa`}
                              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#E02B2B] text-white text-[10px] font-bold shadow-xs animate-pulse"
                            >
                              {unreadCounts[r.id]}
                            </span>
                          )}

                          {r.urgency === 'urgent' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-red-100 text-red-700">
                              Mendesak
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 line-clamp-2 font-normal leading-relaxed">
                        {r.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-100">
                        <span>{r.location}</span>
                        <span className="font-medium text-slate-600 uppercase">{r.status}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Kolom Kanan: Detail Laporan Lengkap & Chat Klarifikasi (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedReport ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
                {/* Header Detail */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xl font-medium text-slate-900">{selectedReport.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedReport.urgency === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Tingkat: {selectedReport.urgency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal">
                      Diterima: {new Date(selectedReport.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                    </p>
                  </div>

                  {/* Dropdown Update Status */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Status Penanganan:</span>
                    <select
                      value={selectedReport.status}
                      onChange={(e) => handleUpdateStatus(e.target.value as ReportStatus)}
                      className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-slate-400"
                    >
                      <option value="submitted">1. Baru Masuk (Perlu Ditinjau)</option>
                      <option value="reviewed">2. Telah Ditelaah BK</option>
                      <option value="investigating">3. Dalam Investigasi</option>
                      <option value="followup">4. Tindak Lanjut / Mediasi</option>
                      <option value="resolved">5. Selesai &amp; Pemulihan</option>
                      <option value="unsubstantiated">6. Tidak Cukup Bukti</option>
                    </select>
                  </div>
                </div>

                {/* Identitas Pelapor (Privat BK) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">
                    Keterangan Pelapor (Hanya Terlihat oleh Tim Bimbingan Konseling):
                  </span>
                  {selectedReport.isAnonymous ? (
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                      <EyeOff className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Pelapor menggunakan kanal <strong>Anonim Murni</strong>. Komunikasi dilakukan melalui kode PIN privat.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-800 font-normal">
                      <div>Nama: <span className="text-slate-900 font-medium">{selectedReport.reporterName}</span></div>
                      <div>Kelas: <span className="text-slate-900 font-medium">{selectedReport.reporterClass}</span></div>
                      <div>Kontak: <span className="text-slate-900 font-medium">{selectedReport.reporterContact || '-'}</span></div>
                    </div>
                  )}
                </div>

                {/* Lokasi & Pihak Terlibat */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80">
                    <span className="text-slate-500 font-medium block mb-1">Lokasi &amp; Waktu Kejadian:</span>
                    <p className="font-medium text-slate-900">{selectedReport.location}</p>
                    <p className="text-slate-600 mt-0.5 font-normal">{selectedReport.incidentDate} • {selectedReport.incidentTime}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80">
                    <span className="text-slate-500 font-medium block mb-1">Pihak yang Terlibat / Disebutkan:</span>
                    <p className="font-medium text-slate-900">{selectedReport.partiesInvolved || 'Tidak ada nama spesifik'}</p>
                    <p className="text-slate-600 mt-0.5 font-normal">Peran Pelapor: <span className="font-medium uppercase">{selectedReport.role}</span></p>
                  </div>
                </div>

                {/* Kesaksian Asli (Verbatim) */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">
                    Uraian Kejadian dari Murid (Verbatim):
                  </span>
                  <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/90">
                    <p className="text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                      &ldquo;{selectedReport.description}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Aksi Case Dossier */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-medium text-slate-900 block">Status Pengelompokan Berkas Kasus:</span>
                    <span className="text-xs text-slate-500 font-normal">
                      {selectedReport.caseId ? `Terhubung ke Berkas Kasus ${selectedReport.caseId}` : 'Belum digabungkan ke berkas kasus manapun'}
                    </span>
                  </div>
                  <Link
                    href="/counselor/cases"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Kelola Berkas Kasus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Ruang Komunikasi / Chat Privat dengan Murid */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#E02B2B]" />
                      <span>Komunikasi Tertutup dengan Siswa</span>
                    </h4>
                    <div className="flex items-center gap-2">
                      {isConnected ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Live Terhubung</span>
                        </span>
                      ) : null}
                      <span className="text-[11px] text-slate-400 font-normal">
                        Kanal Terenkripsi Dua Arah
                      </span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div 
                    ref={counselorChatContainerRef}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 max-h-64 overflow-y-auto space-y-3"
                  >
                    {realtimeMessages.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 font-normal py-6">
                        Belum ada riwayat percakapan. Kirimkan pesan klarifikasi atau jadwalkan sesi tatap muka tertutup.
                      </p>
                    ) : (
                      realtimeMessages.map((msg) => {
                        const isCounselor = msg.sender === 'counselor';
                        return (
                          <div 
                            key={msg.id}
                            className={`flex flex-col ${isCounselor ? 'items-end' : 'items-start'}`}
                          >
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1 px-1">
                              <span className="font-semibold text-slate-800">{msg.senderName}</span>
                              <span>•</span>
                              <span>{new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                              {isCounselor && (
                                msg.isRead ? (
                                  <span 
                                    title="Pesan sudah dilihat oleh siswa"
                                    className="inline-flex items-center gap-0.5 text-[10px] text-sky-600 font-semibold pl-1"
                                  >
                                    <Eye className="w-3 h-3 text-sky-600" />
                                    <span>Dilihat</span>
                                  </span>
                                ) : (
                                  <span 
                                    title="Pesan terkirim"
                                    className="inline-flex items-center gap-0.5 text-[10px] text-slate-400 pl-1"
                                  >
                                    <Check className="w-3 h-3 text-slate-400" />
                                    <span>Terkirim</span>
                                  </span>
                                )
                              )}
                            </div>
                            <div className={`p-3.5 rounded-xl max-w-md text-xs leading-relaxed font-normal shadow-2xs ${
                              isCounselor 
                                ? 'bg-slate-900 !text-white rounded-tr-xs' 
                                : 'bg-white border border-slate-200/90 !text-slate-900 rounded-tl-xs'
                            }`}>
                              <p className={`${isCounselor ? '!text-white' : '!text-slate-900'} text-xs leading-relaxed font-normal`}>
                                {msg.content}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}

                    {/* Realtime Typing Indicator */}
                    {typingStatus?.isTyping && (
                      <div className="flex items-center gap-2 pt-1 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] text-slate-700">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-[#E02B2B] rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-[#E02B2B] rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-[#E02B2B] rounded-full animate-bounce" />
                          </span>
                          <span className="font-medium text-slate-800">{typingStatus.senderName} sedang mengetik...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Send Form */}
                  <form onSubmit={handleSendCounselorMessage} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={counselorReply}
                      onChange={(e) => {
                        setCounselorReply(e.target.value);
                        sendTypingIndicator(
                          e.target.value.length > 0,
                          currentUser.name || 'Guru BK (Ibu Siti Rahmawati)'
                        );
                      }}
                      onBlur={() => {
                        sendTypingIndicator(false, currentUser.name || 'Guru BK');
                      }}
                      placeholder={cooldown > 0 ? `Menunggu proteksi anti-spam (${cooldown}d)...` : "Tulis pesan klarifikasi atau jadwal sesi konseling terlindungi..."}
                      disabled={cooldown > 0}
                      className="flex-1 px-4 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white font-normal shadow-2xs disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={isReplying || cooldown > 0}
                      className="px-6 py-2.5 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      {isReplying ? (
                        <span>Mengirim...</span>
                      ) : cooldown > 0 ? (
                        <span>{cooldown}s</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200/90 font-normal">
                Pilih salah satu laporan dari antrean di sebelah kiri.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CounselorDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#F6F4F0] flex items-center justify-center text-xs text-slate-500 font-medium">
          Memuat portal bimbingan konseling...
        </div>
      }
    >
      <CounselorDashboardContent />
    </Suspense>
  );
}
