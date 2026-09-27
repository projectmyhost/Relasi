'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  X,
  ArrowRight,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';

interface CounselingSession {
  id: string;
  studentName: string;
  studentClass: string;
  date: string;
  time: string;
  topic: string;
  type: 'Tatap Muka Privat' | 'Mediasi Terbimbing' | 'Dukungan Psikososial';
  status: 'scheduled' | 'in_progress' | 'completed';
  notesCount: number;
}

export default function CounselorKonselingPage() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [sessions, setSessions] = useState<CounselingSession[]>([
    {
      id: 'KS-2026-001',
      studentName: 'Dimas Surya Pratama',
      studentClass: 'XI MIPA 2',
      date: 'Besok, 26 Sep 2026',
      time: '09:30 - 10:30 WIB',
      topic: 'Sesi Pemulihan Trauma & Validasi Rasa Aman Pasca-Insiden',
      type: 'Dukungan Psikososial',
      status: 'scheduled',
      notesCount: 2,
    },
    {
      id: 'KS-2026-002',
      studentName: 'Siswa Anonim (RS-2026-0412)',
      studentClass: 'X-E3',
      date: 'Senin, 29 Sep 2026',
      time: '13:00 - 14:00 WIB',
      topic: 'Klarifikasi Kronologi & Pendampingan Perlindungan Identitas',
      type: 'Tatap Muka Privat',
      status: 'scheduled',
      notesCount: 1,
    },
    {
      id: 'KS-2026-003',
      studentName: 'Rian Anggara & Ahmad Maulana',
      studentClass: 'X-E1 & XI IPS 1',
      date: '24 Sep 2026',
      time: '11:00 - 12:30 WIB',
      topic: 'Mediasi Terbimbing & Kesepakatan Tertulis Anti-Intimidasi',
      type: 'Mediasi Terbimbing',
      status: 'completed',
      notesCount: 4,
    },
  ]);

  const upcomingCount = sessions.filter((s) => s.status === 'scheduled').length;
  const completedCount = sessions.filter((s) => s.status === 'completed').length;

  const filteredSessions = sessions.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] pt-6 sm:pt-8 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Header Strip Guru BK Konseling */}
        <div className="bg-white rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-5 sm:py-6 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="space-y-1 max-w-xl">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
              Manajemen Sesi Konseling &amp; Pendampingan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jadwalkan dan kelola sesi konseling empatik tertutup untuk korban, saksi, maupun konseling perubahan perilaku secara aman &amp; terlindungi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/counselor/cases"
              className="px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 transition flex items-center gap-2 shadow-2xs whitespace-nowrap"
            >
              Lihat Kasus Aktif
            </Link>
            <button
              type="button"
              onClick={() => setShowNewModal(true)}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#E02B2B] hover:bg-[#c92424] text-white text-xs sm:text-sm font-semibold shadow-[0_2px_10px_rgba(224,43,43,0.22)] hover:shadow-[0_4px_14px_rgba(224,43,43,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Jadwalkan Konseling</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 transition shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sesi Mendatang</span>
              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            </div>
            <div className="mt-1.5 text-2xl font-bold text-slate-950 tracking-tight">{upcomingCount} Sesi</div>
          </div>

          <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 transition shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Selesai Bulan Ini</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <div className="mt-1.5 text-2xl font-bold text-slate-950 tracking-tight">{completedCount > 0 ? `${completedCount} Sesi` : '14 Sesi'}</div>
          </div>

          <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 transition shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kerahasiaan Ruang BK</span>
              <ShieldCheck className="w-4 h-4 text-[#E02B2B] shrink-0" />
            </div>
            <div className="mt-1.5 text-2xl font-bold text-slate-950 tracking-tight">Terproteksi</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Semua Sesi ({sessions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('scheduled')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              filter === 'scheduled'
                ? 'bg-[#E02B2B] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Terjadwal ({sessions.filter(s => s.status === 'scheduled').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              filter === 'completed'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Selesai ({sessions.filter(s => s.status === 'completed').length})
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-3.5">
          {filteredSessions.map((session) => (
            <div 
              key={session.id}
              className="bg-white rounded-2xl p-5 border border-black/[0.06] shadow-2xs hover:border-black/[0.12] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {session.id}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    session.status === 'scheduled' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  }`}>
                    {session.status === 'scheduled' ? 'Terjadwal' : 'Selesai'}
                  </span>
                  <span className="text-[11px] font-medium text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                    {session.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {session.topic}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800">{session.studentName}</span>
                    <span>({session.studentClass})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{session.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <button
                  type="button"
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  Catatan ({session.notesCount})
                </button>
                <Link
                  href="/counselor/cases"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Buka Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Jadwalkan Konseling Baru */}
      {showNewModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowNewModal(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E02B2B]" />
                <h3 className="text-base font-bold text-slate-900">Jadwalkan Sesi Konseling Baru</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 transition cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newSession: CounselingSession = {
                  id: `KS-2026-${String(sessions.length + 1).padStart(3, '0')}`,
                  studentName: (formData.get('studentName') as string) || 'Siswa Konseling',
                  studentClass: (formData.get('studentClass') as string) || 'X-E1',
                  date: (formData.get('date') as string) || 'Hari Ini',
                  time: (formData.get('time') as string) || '10:00 - 11:00 WIB',
                  topic: (formData.get('topic') as string) || 'Konseling Pendampingan Terjadwal',
                  type: (formData.get('type') as any) || 'Dukungan Psikososial',
                  status: 'scheduled',
                  notesCount: 0,
                };
                setSessions([newSession, ...sessions]);
                setShowNewModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Siswa / Identitas Terproteksi</label>
                <input
                  name="studentName"
                  type="text"
                  required
                  placeholder="Contoh: Dimas Surya Pratama atau Siswa Anonim"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas</label>
                  <input
                    name="studentClass"
                    type="text"
                    required
                    placeholder="Contoh: XI MIPA 2"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Sesi</label>
                  <select
                    name="type"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white"
                  >
                    <option value="Dukungan Psikososial">Dukungan Psikososial</option>
                    <option value="Tatap Muka Privat">Tatap Muka Privat</option>
                    <option value="Mediasi Terbimbing">Mediasi Terbimbing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    name="date"
                    type="text"
                    defaultValue="Besok, 27 Sep 2026"
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Waktu</label>
                  <input
                    name="time"
                    type="text"
                    defaultValue="09:00 - 10:00 WIB"
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fokus / Topik Konseling</label>
                <textarea
                  name="topic"
                  rows={3}
                  required
                  placeholder="Tuliskan fokus sesi konseling secara umum (menjaga kerahasiaan)..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  Simpan Jadwal Sesi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
