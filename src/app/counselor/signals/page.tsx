'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GitMerge, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  Info,
  Check
} from 'lucide-react';
import { RuangSuaraStore } from '@/lib/store';
import { RelationshipSignal, Report } from '@/lib/types';
import { useAuth } from '@/lib/authContext';

export default function CounselorSignalsPage() {
  const { currentUser } = useAuth();
  const [signals, setSignals] = useState<RelationshipSignal[]>([]);
  const [reportsMap, setReportsMap] = useState<Record<string, Report>>({});

  const loadData = () => {
    const s = RuangSuaraStore.getSignals();
    const r = RuangSuaraStore.getReports();
    const map: Record<string, Report> = {};
    r.forEach(item => { map[item.id] = item; });
    setSignals(s);
    setReportsMap(map);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReviewSignal = (signalId: string, action: 'confirmed' | 'dismissed') => {
    RuangSuaraStore.reviewSignal(signalId, action, currentUser.name || 'Guru BK');
    RuangSuaraStore.addAuditLog({
      actor: currentUser.name || 'Guru BK',
      role: 'counselor',
      action: action === 'confirmed' ? 'CONFIRM_AI_SIGNAL' : 'DISMISS_AI_SIGNAL',
      target: signalId,
      detail: action === 'confirmed' 
        ? 'Mengonfirmasi hubungan antar-laporan hasil deteksi pola kesamaan waktu dan tempat'
        : 'Menandai laporan tidak berkaitan (bukan rangkaian kejadian yang sama)',
    });
    loadData();
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] pt-6 sm:pt-8 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Strip */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-3 relative overflow-hidden">
          <Link 
            href="/counselor" 
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E02B2B] hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Inbox Laporan BK</span>
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950">
                Pola Keterkaitan Antar-Laporan Terpisah
              </h1>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-medium font-mono border border-slate-200/80">
              Total Sinyal Terdeteksi: {signals.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-medium flex items-center gap-1.5 text-slate-900">
              <Info className="w-4 h-4 text-slate-600 shrink-0" />
              Prinsip Etika Penanganan PPKSP Permendikbudristek:
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              «Sistem memetakan pola kesamaan lokasi, waktu, dan kata kunci untuk mendeteksi apakah beberapa laporan merupakan rangkaian dari insiden yang sama. <strong>Sistem tidak pernah memvonis siapa yang bersalah</strong>. Telaah dan konfirmasi keabsahan berada sepenuhnya pada kewenangan Guru BK.»
            </p>
          </div>
        </div>

        {/* Signals List */}
        <div className="space-y-6">
          {signals.map((sig) => {
            const reportA = reportsMap[sig.reportAId];
            const reportB = reportsMap[sig.reportBId];

            return (
              <div 
                key={sig.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6 transition"
              >
                {/* Header Sinyal */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-medium">
                      <GitMerge className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-medium text-slate-400 block">{sig.id}</span>
                      <h3 className="text-sm font-medium text-slate-900">
                        Indikasi Keterkaitan Laporan: {sig.reportAId} &amp; {sig.reportBId}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Kesesuaian Pola:</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                      {sig.confidenceScore}% Kesamaan
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sig.status === 'confirmed' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60' 
                        : sig.status === 'dismissed' 
                        ? 'bg-slate-100 text-slate-600' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                    }`}>
                      {sig.status === 'confirmed' ? 'Dikonfirmasi Terkait' : sig.status === 'dismissed' ? 'Bukan Kasus Sama' : 'Menunggu Telaah BK'}
                    </span>
                  </div>
                </div>

                {/* Perbandingan 2 Laporan Bersandingan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Laporan A */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-[#E02B2B]">Laporan A: {sig.reportAId}</span>
                      <span className="text-[10px] uppercase font-medium text-slate-500">{reportA?.role || 'Korban'}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-0.5 font-normal">
                      <div>Lokasi: <span className="text-slate-800 font-medium">{reportA?.location || '-'}</span></div>
                      <div>Waktu: <span className="text-slate-800 font-medium">{reportA?.incidentDate} • {reportA?.incidentTime}</span></div>
                      <div>Pihak: <span className="text-slate-800 font-medium">{reportA?.partiesInvolved || '-'}</span></div>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed font-normal">
                      &ldquo;{reportA?.description}&rdquo;
                    </p>
                  </div>

                  {/* Laporan B */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-[#E02B2B]">Laporan B: {sig.reportBId}</span>
                      <span className="text-[10px] uppercase font-medium text-slate-500">{reportB?.role || 'Saksi'}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-0.5 font-normal">
                      <div>Lokasi: <span className="text-slate-800 font-medium">{reportB?.location || '-'}</span></div>
                      <div>Waktu: <span className="text-slate-800 font-medium">{reportB?.incidentDate} • {reportB?.incidentTime}</span></div>
                      <div>Pihak: <span className="text-slate-800 font-medium">{reportB?.partiesInvolved || '-'}</span></div>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed font-normal">
                      &ldquo;{reportB?.description}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Alasan Deteksi Pola */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-medium text-slate-900 block">
                    Faktor Indikasi Kesamaan yang Teridentifikasi:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 font-normal">
                    {sig.reasons.map((r, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tombol Keputusan Guru BK */}
                {sig.status === 'suggested' ? (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-normal">
                      Apakah kedua laporan ini merupakan rangkaian dari insiden yang sama?
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReviewSignal(sig.id, 'dismissed')}
                        className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4 text-slate-400" />
                        <span>Bukan Insiden Sama</span>
                      </button>
                      <button
                        onClick={() => handleReviewSignal(sig.id, 'confirmed')}
                        className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-[#E02B2B] text-white text-xs font-medium shadow-2xs transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Konfirmasi &amp; Hubungkan Kasus</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 font-normal">
                    <span>
                      Ditinjau oleh: <span className="text-slate-800 font-medium">{sig.reviewedBy || 'Guru BK'}</span> • Status: {sig.reviewNotes || 'Telah ditinjau'}
                    </span>
                    <Link
                      href="/counselor/cases"
                      className="text-[#E02B2B] font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Buka Berkas Kasus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
