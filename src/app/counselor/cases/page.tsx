'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Clock, 
  Plus, 
  ArrowLeft,
  FileText,
  ClipboardList
} from 'lucide-react';
import { RuangSuaraStore } from '@/lib/store';
import { CaseDossier, CaseStatus } from '@/lib/types';
import { useAuth } from '@/lib/authContext';
import { formatDateTimeWIB } from '@/lib/utils';

export default function CounselorCasesPage() {
  const { currentUser } = useAuth();
  const [cases, setCases] = useState<CaseDossier[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseDossier | null>(null);
  
  // State for new note
  const [newNoteAuthor, setNewNoteAuthor] = useState(currentUser.name || 'Guru BK');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState<'interview' | 'observation' | 'mediation' | 'counseling'>('counseling');

  // State for new timeline event
  const [newTimelineDate, setNewTimelineDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTimelineTime, setNewTimelineTime] = useState('10:00 WIB');
  const [newTimelineEvent, setNewTimelineEvent] = useState('');

  const loadCases = () => {
    const list = RuangSuaraStore.getCases();
    setCases(list);
    if (!selectedCase && list.length > 0) {
      setSelectedCase(list[0]);
    } else if (selectedCase) {
      const refreshed = list.find(c => c.id === selectedCase.id);
      if (refreshed) setSelectedCase(refreshed);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleUpdateStatus = (newStatus: CaseStatus) => {
    if (!selectedCase) return;
    RuangSuaraStore.updateCaseStatus(selectedCase.id, newStatus);
    RuangSuaraStore.addAuditLog({
      actor: currentUser.name || 'Guru BK',
      role: 'counselor',
      action: 'UPDATE_CASE_STATUS',
      target: selectedCase.id,
      detail: `Memperbarui status kasus ${selectedCase.id} menjadi ${newStatus}`,
    });
    loadCases();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase || !newNoteContent.trim()) return;

    RuangSuaraStore.addInvestigationNote(selectedCase.id, {
      author: newNoteAuthor,
      content: newNoteContent.trim(),
      type: newNoteType,
      date: formatDateTimeWIB(new Date())
    });

    setNewNoteContent('');
    loadCases();
  };

  const handleAddTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase || !newTimelineEvent.trim()) return;

    RuangSuaraStore.addTimelineEvent(selectedCase.id, {
      date: newTimelineDate,
      time: newTimelineTime,
      event: newTimelineEvent.trim(),
    });

    setNewTimelineEvent('');
    loadCases();
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'under_investigation':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60">Dalam Investigasi</span>;
      case 'follow_up_required':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200/60">Tindak Lanjut &amp; Mediasi</span>;
      case 'resolved':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60">Selesai &amp; Pemulihan</span>;
      case 'unsubstantiated':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">Tidak Terbukti / Gugur</span>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 sm:py-14 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Header Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Link 
              href="/counselor" 
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E02B2B] hover:underline mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Inbox Laporan BK</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-medium text-slate-950 tracking-tight flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-[#E02B2B]" />
              <span>Manajemen Kasus &amp; Timeline Investigasi</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Mengonsolidasikan laporan-laporan terpisah menjadi kronologi tunggal dan rencana aksi terstruktur.
            </p>
          </div>
        </div>

        {/* Layout 2 Kolom: Daftar Berkas Kasus (Kiri) vs Detail Kasus & Timeline (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Daftar Berkas Kasus (4 Kolom) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-medium text-slate-900 uppercase tracking-wider">
                Berkas Kasus Terdaftar ({cases.length})
              </h3>
            </div>

            <div className="space-y-3">
              {cases.map((c) => {
                const isSelected = selectedCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className={`p-4 rounded-xl border cursor-pointer transition text-left space-y-2 ${
                      isSelected 
                        ? 'border-[#E02B2B] bg-red-50/30 shadow-2xs' 
                        : 'border-slate-200/70 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-slate-900">{c.id}</span>
                      {getStatusBadge(c.status)}
                    </div>
                    <h4 className="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">
                      {c.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-normal">
                      <span>{c.reportIds.length} Laporan Terkait</span>
                      <span>{c.timeline.length} Titik Kronologi</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Detail Kasus, Timeline, & Rencana Aksi (8 Kolom) */}
          <div className="lg:col-span-8 space-y-6">
            {selectedCase ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-8">
                {/* Header Info Kasus */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-medium text-slate-900">{selectedCase.id}</span>
                      {getStatusBadge(selectedCase.status)}
                    </div>
                    <h2 className="text-lg sm:text-xl font-medium text-slate-900">
                      {selectedCase.title}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1 font-normal">
                      {selectedCase.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Status Berkas:</span>
                    <select
                      value={selectedCase.status}
                      onChange={(e) => handleUpdateStatus(e.target.value as CaseStatus)}
                      className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-slate-400"
                    >
                      <option value="under_investigation">Dalam Investigasi</option>
                      <option value="follow_up_required">Tindak Lanjut &amp; Mediasi</option>
                      <option value="resolved">Selesai &amp; Pemulihan</option>
                      <option value="unsubstantiated">Tidak Cukup Bukti</option>
                    </select>
                  </div>
                </div>

                {/* Pihak Terlibat & Laporan Terhubung */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">
                      Laporan Terhubung dalam Berkas Ini:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCase.reportIds.map((rid) => (
                        <Link
                          key={rid}
                          href={`/counselor?search=${rid}`}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-xs font-medium text-[#E02B2B] hover:border-[#E02B2B] transition"
                        >
                          {rid}
                        </Link>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 block pt-1 font-normal">
                      Prinsip: «Multiple reports are signals, not proof».
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">
                      Pihak Terkait / Disebutkan:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1 font-normal">
                      {selectedCase.partiesInvolved.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E02B2B]"></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* TIMELINE BUILDER KRONOLOGI */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#E02B2B]" />
                      <span>Kronologi Kejadian (Timeline)</span>
                    </h3>
                  </div>

                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {selectedCase.timeline.map((item) => (
                      <div key={item.id} className="relative group">
                        <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#E02B2B] shadow-2xs"></div>
                        <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80 space-y-1 hover:bg-white transition">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-900">{item.date} • {item.time}</span>
                            {item.sourceReportId && (
                              <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-red-50 text-[#E02B2B] border border-red-100">
                                Sumber: {item.sourceReportId}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-normal">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Form Tambah Titik Kronologi Baru */}
                  <form onSubmit={handleAddTimeline} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <span className="text-xs font-medium text-slate-800 block">Tambah Titik Kronologi Baru:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="date"
                        required
                        value={newTimelineDate}
                        onChange={(e) => setNewTimelineDate(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white font-normal shadow-2xs"
                      />
                      <input
                        type="text"
                        required
                        value={newTimelineTime}
                        onChange={(e) => setNewTimelineTime(e.target.value)}
                        placeholder="Jam (cth: 10:15 WIB)"
                        className="px-3 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white font-normal shadow-2xs"
                      />
                      <input
                        type="text"
                        required
                        value={newTimelineEvent}
                        onChange={(e) => setNewTimelineEvent(e.target.value)}
                        placeholder="Deskripsi kronologi peristiwa..."
                        className="px-3 py-2 text-xs rounded-xl border-2 border-slate-300 bg-white font-normal sm:col-span-1 shadow-2xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#E02B2B] text-white text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambahkan ke Timeline</span>
                    </button>
                  </form>
                </div>

                {/* CATATAN INVESTIGASI & KONSELING */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#E02B2B]" />
                    <span>Catatan Investigasi &amp; Konseling Guru BK</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedCase.investigationNotes.map((note) => (
                      <div key={note.id} className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80 space-y-1">
                        <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200/60">
                          <span className="font-medium text-slate-900">{note.author}</span>
                          <span className="text-[11px] text-slate-400 font-normal">{note.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed pt-1 font-normal">{note.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Form Tambah Catatan */}
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      rows={3}
                      required
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      placeholder="Tuliskan hasil observasi, wawancara saksi, atau konseling privat dengan korban..."
                      className="w-full p-3 text-xs rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white leading-relaxed font-normal shadow-2xs"
                    ></textarea>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Simpan Catatan Konseling</span>
                    </button>
                  </form>
                </div>

                {/* RENCANA AKSI & TINDAK LANJUT */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-medium text-slate-900 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-[#E02B2B]" />
                    <span>Rencana Aksi &amp; Tindak Lanjut Pemulihan</span>
                  </h3>

                  <div className="space-y-2">
                    {selectedCase.actionPlans.map((act) => (
                      <div key={act.id} className="p-4 rounded-xl bg-white border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                        <div className="space-y-0.5">
                          <span className="font-medium text-xs text-slate-900 block">{act.action}</span>
                          <span className="text-[11px] text-slate-500 font-normal">Target: <span className="text-slate-800 font-medium">{act.target}</span> • Penanggung Jawab: {act.pic} • Batas: {act.deadline}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                          act.status === 'completed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                        }`}>
                          {act.status === 'completed' ? 'Selesai' : 'Sedang Berjalan'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200/90 font-normal">
                Pilih salah satu berkas kasus di sebelah kiri.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
