'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { ShieldAlert, AlertTriangle, LogOut, Radio } from 'lucide-react';

export default function UserStatusWatcher() {
  const { currentUser, logout } = useAuth();
  const [isSuspended, setIsSuspended] = useState(false);

  useEffect(() => {
    // Only monitor authenticated non-admin accounts
    if (!currentUser.email || currentUser.role === 'guest' || currentUser.role === 'super_admin') {
      setIsSuspended(false);
      return;
    }

    let es: EventSource | null = null;
    let isMounted = true;

    try {
      const url = `/api/users/status/stream?email=${encodeURIComponent(currentUser.email.toLowerCase())}`;
      es = new EventSource(url);

      es.onmessage = (event) => {
        try {
          if (!event.data || event.data === ':keepalive') return;
          const data = JSON.parse(event.data);

          if (data.status === 'inactive') {
            if (isMounted) setIsSuspended(true);
          } else if (data.status === 'active') {
            if (isMounted) setIsSuspended(false);
          }
        } catch (e) {
          console.error('Error parsing user status SSE payload:', e);
        }
      };

      es.onerror = () => {
        // EventSource will automatically attempt reconnection
      };
    } catch (err) {
      console.error('Failed to establish user status stream:', err);
    }

    return () => {
      isMounted = false;
      if (es) {
        es.close();
      }
    };
  }, [currentUser.email, currentUser.role]);

  if (!isSuspended) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in select-none">
      <div 
        className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-500/30 text-center space-y-5 animate-in zoom-in-95"
        role="alertdialog"
        aria-modal="true"
      >
        {/* Pulsing Alert Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-[#E02B2B] shadow-inner">
          <span className="absolute inset-0 rounded-2xl bg-red-400 opacity-25 animate-ping" />
          <AlertTriangle className="w-8 h-8 text-[#E02B2B] relative z-10" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#E02B2B] text-[11px] font-bold tracking-wide uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Akses Akun Dinonaktifkan</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
            Akun Anda Telah Dinonaktifkan
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Akses untuk akun <strong className="text-slate-900 font-semibold">{currentUser.email}</strong> ({currentUser.name}) sementara ini dibekukan oleh <strong>Administrator Sistem</strong>.
          </p>
        </div>

        {/* Real-time Status Card */}
        <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 text-left space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-red-950">Status Proteksi:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-200/70 text-red-900 font-bold text-[10px]">
              Terkunci Real-Time
            </span>
          </div>
          <p className="text-[11px] text-red-800 leading-relaxed font-normal">
            Anda tidak dapat mengirimkan laporan, mengakses data privat, maupun membalas chat konseling sampai Admin mengaktifkan akun Anda kembali.
          </p>
          <div className="pt-2 border-t border-red-200/60 flex items-center gap-2 text-[10px] text-red-700 font-medium">
            <Radio className="w-3 h-3 text-[#E02B2B] animate-pulse" />
            <span>Menunggu sinyal aktivasi Admin... (Otomatis pulih tanpa reload)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              logout();
              if (typeof window !== 'undefined') window.location.href = '/login';
            }}
            className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar / Gunakan Akun Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}
