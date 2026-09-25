'use client';

import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  HeartHandshake,
  Lock,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export default function HeroIntelligenceConsole() {
  const workflowSteps = [
    {
      step: '01',
      title: 'Pelaporan Berenkripsi PIN',
      desc: 'Kerahasiaan nama pelapor terjamin utuh. Akses pelacakan hanya melalui kode unik.',
      icon: Lock,
      accent: 'text-[#E02B2B] bg-red-50'
    },
    {
      step: '02',
      title: 'Telaah Objektif Guru BK',
      desc: 'Verifikasi fakta kejadian oleh tim konselor sekolah berdasar kode etik tanpa vonis sepihak.',
      icon: UserCheck,
      accent: 'text-slate-800 bg-slate-100'
    },
    {
      step: '03',
      title: 'Pendampingan & Pemulihan',
      desc: 'Tindakan kuratif, perlindungan dari aksi balas dendam, dan pemulihan psikologis murid.',
      icon: HeartHandshake,
      accent: 'text-emerald-700 bg-emerald-50'
    },
  ];

  return (
    <div className="w-full">
      {/* KARTU EDITORIAL INSTITUSI RESMI SEKOLAH */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-7 space-y-5">
        
        {/* Header Kartu */}
        <div className="pb-4 border-b border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              SOP Terstandarisasi
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Sesuai Permendikbudristek</span>
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Protokol Perlindungan Hak Siswa
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Alur resmi Satuan Tugas PPKSP dalam menangani setiap laporan insiden di lingkungan sekolah.
          </p>
        </div>

        {/* 3 Langkah Alur Terstruktur */}
        <div className="space-y-3">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-colors flex items-start gap-3.5"
              >
                <div className={`w-9 h-9 rounded-lg ${item.accent} flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/60`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      Tahap {item.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Jaminan Keamanan */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
              Jaminan Keamanan
            </span>
            <p className="text-xs text-slate-300 font-normal">
              Bebas intimidasi dan stigmatisasi seumur masa studi.
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/10 text-white border border-white/20">
              100% Rahasia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
