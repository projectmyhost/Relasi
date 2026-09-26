'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
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

  const filteredSessions = sessions.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Strip Guru BK Konseling */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E02B2B] text-xs font-semibold uppercase tracking-wider border border-red-100">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Unit Bimbingan Konseling &amp; Pemulihan PPKSP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Manajemen Sesi Konseling &amp; Pendampingan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jadwalkan dan kelola sesi konseling empatik tertutup untuk korban, saksi, maupun konseling perubahan perilaku terduga pelaku secara aman &amp; terlindungi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/counselor/cases"
              className="px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Lihat Kasus Aktif
            </Link>
            <button
              type="button"
              onClick={() => setShowNewModal(true)}
              className="px-4.5 py-2.5 rounded-full bg-[#E02B2B] hover:bg-[#c92424] text-white text-xs sm:text-sm font-semibold transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Jadwalkan Konseling</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Sesi Mendatang</span>
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">2 Sesi</div>
            <p className="text-[11px] text-slate-500 mt-1">Terjadwal dalam 7 hari ke depan</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Selesai Bulan Ini</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">14 Sesi</div>
            <p className="text-[11px] text-slate-500 mt-1">Tingkat kepuasan pendampingan 100%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-black/[0.06] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Kerahasiaan Ruang BK</span>
              <ShieldCheck className="w-4 h-4 text-[#E02B2B]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">Terproteksi</div>
            <p className="text-[11px] text-slate-500 mt-1">Sesuai Permendikbudristek No. 46/2023</p>
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
    </div>
  );
}
