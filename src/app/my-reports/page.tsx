'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Plus, 
  ArrowRight, 
  MessageSquare,
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  User,
  Lock,
  X,
  Send,
  AlertTriangle,
  FileText,
  ChevronRight,
  Eye,
  Check,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { RuangSuaraStore } from '@/lib/store';
import { Report } from '@/lib/types';
import { useRealtimeChat } from '@/hooks/useRealtimeChat';

export default function MyReportsPage() {
  const { currentUser } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [scopeTab, setScopeTab] = useState<'my_reports' | 'all_reports'>('my_reports');
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'resolved'>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Ownership verification: Does this report belong to the currently logged in student?
  const isReportOwner = (r: Report | null | undefined): boolean => {
    if (!r) return false;
    // Counselor or Super Admin has authorized staff access
    if (currentUser.role === 'counselor' || currentUser.role === 'super_admin') return true;

    // Match by explicit userId
    if (r.userId && currentUser.id && r.userId === currentUser.id) return true;
    // Match by userEmail
    if (r.userEmail && currentUser.email && r.userEmail.toLowerCase() === currentUser.email.toLowerCase()) return true;
    // Match by reporterContact
    if (r.reporterContact && currentUser.email && r.reporterContact.toLowerCase() === currentUser.email.toLowerCase()) return true;
    // Match by reporterName
    if (r.reporterName && currentUser.name && r.reporterName.toLowerCase() === currentUser.name.toLowerCase()) return true;

    return false;
  };

  const canChat = Boolean(selectedReport && isReportOwner(selectedReport));

  // Only subscribe to realtime stream if the user has permission to chat
  const {
    messages: realtimeMessages,
    isConnected,
    isSending,
    typingStatus,
    sendMessage: sendRealtimeMessage,
    sendTypingIndicator,
  } = useRealtimeChat({
    reportId: canChat ? selectedReport?.id : null,
    currentRole: 'student',
    initialMessages: canChat ? ((selectedReport?.messages || []) as any) : [],
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [realtimeMessages]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const loadReports = async () => {
    const all = RuangSuaraStore.getReports();
    if (all.length > 0) {
      setReports(all);
    }

    try {
      const res = await fetch('/api/reports');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.reports)) {
          setReports(data.reports);
          data.reports.forEach((r: Report) => RuangSuaraStore.addReport(r));
        }
      }
    } catch (e) {
      console.error('Failed to sync reports from server:', e);
    }
  };

  useEffect(() => {
    loadReports();
  }, [currentUser]);

  // Keep selected report updated with fresh store data
  useEffect(() => {
    if (selectedReport) {
      const fresh = RuangSuaraStore.getReportById(selectedReport.id);
      if (fresh) setSelectedReport(fresh);
    }
  }, [reports]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport || !chatMessage.trim() || cooldown > 0 || !canChat) return;

    const senderName = selectedReport.isAnonymous ? 'Pelapor (Anonim)' : (selectedReport.reporterName || currentUser.name || 'Siswa');
    const textToSend = chatMessage.trim();
    setChatMessage('');
    setCooldown(2);

    const success = await sendRealtimeMessage(textToSend, 'student', senderName);
    if (success) {
      RuangSuaraStore.addReportMessage(selectedReport.id, {
        sender: 'student',
        senderName,
        content: textToSend,
      });
      loadReports();
    } else {
      setChatMessage(textToSend);
      setCooldown(0);
    }
  };

  // 1. Separate My Reports and All Reports
  const myReports = reports.filter((r) => isReportOwner(r));
  const myReportsCount = myReports.length;
  const allReportsCount = reports.length;

  const activeScopeReports = scopeTab === 'my_reports' ? myReports : reports;

  // 2. Status Filters
  const filteredReports = activeScopeReports.filter((r) => {
    if (filterTab === 'active') {
      return r.status !== 'resolved' && r.status !== 'unsubstantiated';
    }
    if (filterTab === 'resolved') {
      return r.status === 'resolved' || r.status === 'unsubstantiated';
    }
    return true;
  });

  const activeCount = activeScopeReports.filter(r => r.status !== 'resolved' && r.status !== 'unsubstantiated').length;
  const resolvedCount = activeScopeReports.filter(r => r.status === 'resolved' || r.status === 'unsubstantiated').length;

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Menunggu Telaah BK</span>
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Ditinjau Guru BK</span>
          </span>
        );
      case 'investigating':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
            <span>Dalam Investigasi</span>
          </span>
        );
      case 'followup':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>Tindak Lanjut Mediasi</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>Tuntas &amp; Selesai</span>
          </span>
        );
      case 'unsubstantiated':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Selesai (Dihentikan)</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-7">
        
        {/* Editorial Page Top Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#E02B2B] text-xs font-medium tracking-wide border border-red-200/60">
              <Shield className="w-3.5 h-3.5" />
              <span>Portal Siswa &amp; Rekam Pengaduan Aman</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Pusat Pelaporan <span className="text-[#E02B2B]">Siswa</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
              Halo, <strong className="text-slate-900">{currentUser.name || 'Siswa'}</strong> ({currentUser.email || 'Akun Siswa'}). 
              Anda memiliki kendali penuh atas laporan yang Anda buat dan dapat berkomunikasi langsung dengan Guru BK.
            </p>
          </div>

          <Link
            href="/report"
            className="shrink-0 px-5 sm:px-6 py-3 rounded-full !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Laporan Baru</span>
          </Link>
        </div>

        {/* Primary Scope Tabs: Laporan Saya vs Semua Laporan */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setScopeTab('my_reports');
                setSelectedReport(null);
              }}
              className={`flex-1 sm:flex-initial py-2.5 px-5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                scopeTab === 'my_reports'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4 text-[#E02B2B]" />
              <span>Laporan Saya</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                scopeTab === 'my_reports' ? 'bg-[#E02B2B] text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {myReportsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setScopeTab('all_reports');
                setSelectedReport(null);
              }}
              className={`flex-1 sm:flex-initial py-2.5 px-5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                scopeTab === 'all_reports'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-blue-500" />
              <span>Semua Laporan Siswa</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                scopeTab === 'all_reports' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {allReportsCount}
              </span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 px-2 sm:px-3">
            {scopeTab === 'my_reports' ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Menampilkan laporan milik akun Anda (Chat Guru BK Aktif)</span>
              </span>
            ) : (
              <span className="text-slate-600 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Menampilkan seluruh arsip sekolah (Chat hanya aktif di laporan sendiri)</span>
              </span>
            )}
          </div>
        </div>

        {/* Symmetrical Stats Overview - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-black/[0.08] shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200/60">
              <FileText className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {scopeTab === 'my_reports' ? 'Laporan Saya' : 'Total Semua Laporan'}
              </span>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{activeScopeReports.length}</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-black/[0.08] shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">Dalam Pendampingan BK</span>
              <span className="text-2xl font-bold text-amber-700 tracking-tight">{activeCount}</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-black/[0.08] shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">Kasus Tuntas &amp; Pulih</span>
              <span className="text-2xl font-bold text-emerald-700 tracking-tight">{resolvedCount}</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
              filterTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]'
            }`}
          >
            Semua Status ({activeScopeReports.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('active')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
              filterTab === 'active'
                ? 'bg-[#E02B2B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]'
            }`}
          >
            Dalam Proses ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('resolved')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
              filterTab === 'resolved'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]'
            }`}
          >
            Tuntas &amp; Selesai ({resolvedCount})
          </button>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-10 sm:p-14 border border-black/[0.08] shadow-xs text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E02B2B] flex items-center justify-center mx-auto border border-red-100">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-slate-900">
                  {scopeTab === 'my_reports' ? 'Belum Ada Laporan dari Anda' : 'Belum Ada Laporan Terdaftar'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {scopeTab === 'my_reports'
                    ? 'Anda belum pernah mengirimkan laporan pengaduan. Jika Anda mengalami atau menyaksikan perundungan di sekolah, jangan ragu untuk melapor secara rahasia.'
                    : 'Belum ada laporan yang tercatat dalam sistem pada kategori ini.'}
                </p>
              </div>
              <Link
                href="/report"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Pengaduan Pertama Anda</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredReports.map((r) => {
                const isOwner = isReportOwner(r);
                return (
                  <div 
                    key={r.id}
                    className={`bg-white/95 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border transition-all space-y-4 ${
                      isOwner 
                        ? 'border-emerald-200/90 shadow-[0_6px_25px_rgba(16,185,129,0.05)]' 
                        : 'border-black/[0.08] shadow-[0_6px_25px_rgba(0,0,0,0.02)]'
                    }`}
                  >
                    {/* Card Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm sm:text-base font-semibold text-slate-900 bg-slate-100/90 px-3 py-1 rounded-lg border border-slate-200/80">
                          {r.id}
                        </span>

                        {/* Ownership Badge */}
                        {isOwner ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Laporan Saya (Chat Aktif)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Laporan Siswa Lain (Pantau Saja)</span>
                          </span>
                        )}

                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/70">
                          {r.isAnonymous ? 'Anonim' : 'Identitas Terbuka ke BK'}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase ${
                          r.urgency === 'urgent' 
                            ? 'bg-red-50 text-[#E02B2B] border border-red-200/80' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200/70'
                        }`}>
                          {r.urgency}
                        </span>
                      </div>

                      <div>
                        {getStatusBadge(r.status)}
                      </div>
                    </div>

                    {/* Symmetrical Incident Metadata 3-Columns Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#E02B2B] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-slate-400 block font-normal text-[11px]">Waktu Kejadian:</span>
                          <span className="text-slate-800 font-medium truncate block">{r.incidentDate} • {r.incidentTime}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E02B2B] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-slate-400 block font-normal text-[11px]">Lokasi Spesifik:</span>
                          <span className="text-slate-800 font-medium truncate block">{r.location}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-3.5 h-3.5 text-[#E02B2B] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-slate-400 block font-normal text-[11px]">Pihak Disebutkan:</span>
                          <span className="text-slate-800 font-medium truncate block">{r.partiesInvolved || 'Tidak dicantumkan'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Kronologi Description */}
                    <div className="p-4 rounded-xl bg-[#F8F7F4] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed break-words font-normal">
                      &ldquo;{r.description}&rdquo;
                    </div>

                    {/* Bottom Action & Status Footer */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-normal">
                        <span className="inline-flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Enkripsi Berlapis</span>
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                          <MessageSquare className="w-3.5 h-3.5 text-[#E02B2B]" />
                          <span>{r.messages ? r.messages.length : 0} Pesan BK</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedReport(r)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer ${
                          isOwner 
                            ? '!bg-[#E02B2B] hover:!bg-[#c92424] !text-white' 
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isOwner ? (
                          <>
                            <span>Buka Chat &amp; Rincian Saya</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-slate-300" />
                            <span>Pantau Perkembangan Kasus</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Built-in Interactive Report Detail & Secure Counseling Chat Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/50 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-slate-900">{selectedReport.id}</span>
                  {getStatusBadge(selectedReport.status)}
                  {canChat ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Laporan Anda
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200 text-slate-700">
                      Laporan Siswa Lain
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Kategori: <strong className="text-slate-700 uppercase">{selectedReport.category}</strong> • Prioritas: <strong className="text-slate-700 uppercase">{selectedReport.urgency}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                aria-label="Tutup Detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
              {/* Incident Facts Box */}
              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-slate-200/80 space-y-3">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Data Kejadian Dilaporkan
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Waktu:</span>
                    <span className="text-slate-800 font-medium">{selectedReport.incidentDate} • {selectedReport.incidentTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Lokasi:</span>
                    <span className="text-slate-800 font-medium">{selectedReport.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Pihak:</span>
                    <span className="text-slate-800 font-medium">{selectedReport.partiesInvolved || '-'}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/60 text-slate-700 leading-relaxed break-words font-normal">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Kronologi Verbatim:</span>
                  &ldquo;{selectedReport.description}&rdquo;
                </div>
              </div>

              {/* Secure Chat with Counselor Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#E02B2B]" />
                    <span>
                      {canChat 
                        ? 'Ruang Komunikasi Privat Guru BK & Siswa (Laporan Anda)' 
                        : 'Ruang Komunikasi Privat Guru BK (Dilindungi Privasi)'}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    {canChat ? (
                      isConnected ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Live Terhubung</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Terenkripsi Privat</span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200">
                        <Lock className="w-3 h-3 text-slate-500" />
                        <span>Hanya Pemilik Laporan</span>
                      </span>
                    )}
                  </div>
                </div>

                {canChat ? (
                  <>
                    <div 
                      ref={chatContainerRef}
                      className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 min-h-[160px] max-h-[260px] overflow-y-auto space-y-2.5"
                    >
                      {realtimeMessages && realtimeMessages.length > 0 ? (
                        realtimeMessages.map((m) => {
                          const isMe = m.sender === 'student';
                          return (
                            <div 
                              key={m.id}
                              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                            >
                              <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed break-words shadow-2xs ${
                                isMe 
                                  ? 'bg-slate-900 !text-white rounded-br-xs' 
                                  : 'bg-white !text-slate-900 border border-slate-200/90 rounded-bl-xs'
                              }`}>
                                <div className="flex items-center justify-between gap-3 mb-1.5">
                                  <span className={`font-semibold text-[11px] ${isMe ? 'text-slate-200' : 'text-slate-800'}`}>
                                    {m.senderName}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] ${isMe ? 'text-slate-300' : 'text-slate-500'}`}>
                                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {isMe && (
                                      m.isRead ? (
                                        <span 
                                          title="Pesan sudah dibuka oleh Guru BK" 
                                          className="inline-flex items-center gap-0.5 text-[10px] text-sky-300 font-semibold"
                                        >
                                          <Eye className="w-3 h-3 text-sky-300" />
                                          <span>Dilihat</span>
                                        </span>
                                      ) : (
                                        <span 
                                          title="Pesan terkirim" 
                                          className="inline-flex items-center gap-0.5 text-[10px] text-slate-400"
                                        >
                                          <Check className="w-3 h-3 text-slate-400" />
                                          <span>Terkirim</span>
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                                <p className={`${isMe ? '!text-white' : '!text-slate-900'} text-xs leading-relaxed font-normal`}>
                                  {m.content}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-6 text-center text-xs text-slate-400 space-y-1">
                          <p>Belum ada pesan tercatat pada berkas laporan Anda ini.</p>
                          <p className="text-[11px]">Anda dapat mengirim pesan keterangan tambahan kepada Guru BK di bawah ini.</p>
                        </div>
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

                    {/* Input to send response to Counselor */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={chatMessage}
                        onChange={(e) => {
                          setChatMessage(e.target.value);
                          const sName = selectedReport?.isAnonymous ? 'Pelapor (Anonim)' : (selectedReport?.reporterName || currentUser.name || 'Siswa');
                          sendTypingIndicator(e.target.value.length > 0, sName);
                        }}
                        onBlur={() => {
                          const sName = selectedReport?.isAnonymous ? 'Pelapor (Anonim)' : (selectedReport?.reporterName || currentUser.name || 'Siswa');
                          sendTypingIndicator(false, sName);
                        }}
                        placeholder={cooldown > 0 ? `Menunggu proteksi anti-spam (${cooldown}d)...` : "Tulis pesan atau keterangan tambahan ke Guru BK..."}
                        disabled={cooldown > 0}
                        className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E02B2B]/20 focus:border-[#E02B2B] bg-white transition disabled:bg-slate-100 disabled:text-slate-400"
                      />
                      <button
                        type="submit"
                        disabled={isSending || !chatMessage.trim() || cooldown > 0}
                        className="px-4 py-2.5 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white text-xs font-medium transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isSending ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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
                  </>
                ) : (
                  /* Locked Chat State for Other Students' Reports */
                  <div className="space-y-3">
                    <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/70 text-center space-y-2">
                      <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                        <Lock className="w-5 h-5 text-slate-500" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">
                        Isi Obrolan Dilindungi Hak Privasi Pelapor
                      </h4>
                      <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
                        Sesuai standar perlindungan PPKSP, komunikasi tertutup dengan Guru BK bersifat rahasia dan hanya dapat diakses serta dibalas oleh pelapor pemilik berkas ini.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-900 flex items-start gap-3 shadow-2xs">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-xs text-amber-950">
                          Akses Kirim Pesan Dibatasi
                        </h5>
                        <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                          Anda sedang memantau berkas laporan siswa lain. Anda tidak dapat mengirimkan pesan ke Guru BK di berkas ini karena ini bukan laporan Anda. Jika Anda ingin berkonsultasi, buatlah laporan Anda sendiri.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
