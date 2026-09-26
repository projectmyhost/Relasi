import React from 'react';

const TRUST_PILLARS = [
  {
    icon: (
      <svg 
        className="w-5 h-5 text-[#E02B2B]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Identitas terlindungi',
    description: 'Pilihan pelaporan anonim tanpa pencatatan nama, identitas perangkat, atau alamat IP.',
  },
  {
    icon: (
      <svg 
        className="w-5 h-5 text-[#E02B2B]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Laporan terenkripsi',
    description: 'Setiap kronologi dan berkas aduan diamankan enkripsi dan hanya diakses Guru BK berlisensi.',
  },
  {
    icon: (
      <svg 
        className="w-5 h-5 text-[#E02B2B]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
      </svg>
    ),
    title: 'Status dapat dilacak',
    description: 'Pantau perkembangan penanganan secara mandiri tanpa login publik menggunakan PIN rahasia unik.',
  },
];

export default function HeroTrustSection() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 sm:mt-14 tether-hero-fade" style={{ animationDelay: '550ms' }}>
      <div className="rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-xs p-5 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:divide-x md:divide-slate-200/80">
          {TRUST_PILLARS.map((pillar, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3.5 ${index > 0 ? 'md:pl-8' : ''}`}
            >
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100/70 mt-0.5 shadow-2xs">
                {pillar.icon}
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                  {pillar.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
