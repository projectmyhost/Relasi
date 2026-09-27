'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { RuangSuaraStore } from '@/lib/store';
import { playNotificationChime } from '@/lib/audioNotification';
import { formatTimeWIB } from '@/lib/utils';

interface NotificationItem {
  id: string;
  reportId: string;
  senderName: string;
  contentSnippet: string;
  timestamp: string;
}

export default function StudentNotificationToast() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const lastChimeTimeRef = useRef<number>(0);
  const knownMessageIdsRef = useRef<Set<string>>(new Set());
  const initialFetchDoneRef = useRef(false);

  // Active for student or guest who has submitted reports
  const isStudent = currentUser.role === 'student' || currentUser.role === 'guest';

  useEffect(() => {
    if (!isStudent) {
      setNotifications([]);
      knownMessageIdsRef.current.clear();
      initialFetchDoneRef.current = false;
      return;
    }

    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;

    async function checkUnreadNotifications() {
      if (!isMounted) return;
      try {
        const params = new URLSearchParams();
        params.set('role', 'student');
        if (currentUser.email) params.set('userEmail', currentUser.email);
        if (currentUser.id) params.set('userId', currentUser.id);

        const myReportIds = RuangSuaraStore.getMyReportIds();
        if (myReportIds.length > 0) {
          params.set('reportIds', myReportIds.slice(0, 20).join(','));
        }

        const res = await fetch(`/api/notifications/unread?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();

        if (Array.isArray(data.notifications) && data.notifications.length > 0) {
          // On first run, register existing unread messages so we don't spam toasts on page load
          if (!initialFetchDoneRef.current) {
            data.notifications.forEach((n: any) => knownMessageIdsRef.current.add(n.id));
            initialFetchDoneRef.current = true;
            return;
          }

          // Find brand new incoming messages
          const newItems = data.notifications.filter(
            (n: any) => !knownMessageIdsRef.current.has(n.id)
          );

          if (newItems.length > 0) {
            newItems.forEach((n: any) => knownMessageIdsRef.current.add(n.id));

            // Don't show toast if student is currently on /my-reports and viewing this exact report
            const currentViewingReportId =
              typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('reportId')
                : null;
            const filteredNewItems = newItems.filter((item: any) => {
              if (pathname === '/my-reports' && currentViewingReportId === item.reportId) {
                return false;
              }
              return true;
            });

            if (filteredNewItems.length > 0) {
              const now = Date.now();
              if (now - lastChimeTimeRef.current > 2500) {
                playNotificationChime();
                lastChimeTimeRef.current = now;
              }

              setNotifications((prev) => {
                const combined = [...filteredNewItems, ...prev];
                return combined.slice(0, 2);
              });
            }
          }
        } else {
          initialFetchDoneRef.current = true;
        }
      } catch (err) {
        console.error('Failed to poll student notifications:', err);
      }
    }

    // Initial check
    checkUnreadNotifications();

    // Poll every 3 seconds for rock-solid serverless compatibility
    pollInterval = setInterval(checkUnreadNotifications, 3000);

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isStudent, currentUser.email, currentUser.id, pathname]);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenReport = (reportId: string, notifId: string) => {
    handleDismiss(notifId);
    router.push(`/my-reports?reportId=${encodeURIComponent(reportId)}`);
  };

  if (!isStudent || notifications.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Pemberitahuan Pesan dari Guru BK"
      className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-3 max-w-[370px] w-full pointer-events-none"
    >
      <AnimatePresence>
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.92, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-[0_18px_45px_rgba(0,0,0,0.12)] rounded-2xl p-4 text-stone-900 font-sans"
          >
            {/* Header Toast */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Balasan Guru BK
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200/60">
                  {item.reportId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDismiss(item.id)}
                className="w-6 h-6 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition cursor-pointer"
                title="Tutup Notifikasi"
                aria-label="Tutup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Isi Cuplikan Pesan */}
            <div className="pt-2.5 space-y-1.5">
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <p className="text-xs font-semibold text-stone-900 truncate">
                    {item.senderName}
                  </p>
                </div>
                <span className="text-[10px] text-stone-400 shrink-0">
                  {formatTimeWIB(item.timestamp)}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed line-clamp-2 pl-5 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/70">
                "{item.contentSnippet}"
              </p>
            </div>

            {/* Tombol Aksi Cepat */}
            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenReport(item.reportId, item.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-medium text-xs shadow-xs transition active:scale-[0.98] cursor-pointer"
              >
                <span>Buka Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
}
