'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { playNotificationChime } from '@/lib/audioNotification';

interface NotificationItem {
  id: string;
  reportId: string;
  senderName: string;
  contentSnippet: string;
  timestamp: string;
}

export default function CounselorNotificationToast() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const lastChimeTimeRef = useRef<number>(0);

  // Only active when logged in as counselor
  const isCounselor = currentUser.role === 'counselor';

  useEffect(() => {
    if (!isCounselor) {
      setNotifications([]);
      return;
    }

    let es: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let isMounted = true;

    function connectNotificationStream() {
      if (!isMounted) return;

      try {
        es = new EventSource('/api/counselor/notifications/stream');

        es.onmessage = (event) => {
          try {
            if (!event.data || event.data === ':keepalive') return;
            const data = JSON.parse(event.data);

            if (data.reportId && data.contentSnippet) {
              const now = Date.now();

              // 1. Play soft audio chime (Debounced by 2.5s to prevent audio spam)
              if (now - lastChimeTimeRef.current > 2500) {
                playNotificationChime();
                lastChimeTimeRef.current = now;
              }

              // 2. Strict limit: MAXIMAL 2 POPUP TOASTS ON SCREEN
              setNotifications((prev) => {
                // If there are already 2 popups displayed, do not spawn extra popups
                if (prev.length >= 2) {
                  return prev;
                }

                const newItem: NotificationItem = {
                  id: `${data.reportId}-${now}-${Math.random().toString(36).substring(2, 5)}`,
                  reportId: data.reportId,
                  senderName: data.senderName || 'Siswa Pelapor',
                  contentSnippet: data.contentSnippet,
                  timestamp: data.timestamp || new Date().toISOString(),
                };

                // Auto dismiss this item after 7.5 seconds
                setTimeout(() => {
                  if (isMounted) {
                    setNotifications((current) => current.filter((item) => item.id !== newItem.id));
                  }
                }, 7500);

                return [newItem, ...prev].slice(0, 2);
              });
            }
          } catch (err) {
            console.error('Error parsing counselor notification payload:', err);
          }
        };

        es.onerror = () => {
          if (es) es.close();
          if (isMounted) {
            reconnectTimeout = setTimeout(connectNotificationStream, 4000);
          }
        };
      } catch (err) {
        console.error('Failed to initialize counselor notification stream:', err);
      }
    }

    connectNotificationStream();

    return () => {
      isMounted = false;
      if (es) es.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [isCounselor]);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenReport = (reportId: string, notifId: string) => {
    handleDismiss(notifId);
    router.push(`/counselor?reportId=${encodeURIComponent(reportId)}`);
  };

  if (!isCounselor || notifications.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Pemberitahuan Pesan Masuk Guru BK"
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#E02B2B] animate-pulse shrink-0" />
                <span className="text-[11px] font-bold text-[#E02B2B] uppercase tracking-wider">
                  Pesan Masuk Baru
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
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#E02B2B] shrink-0" />
                <p className="text-xs font-semibold text-stone-900 truncate">
                  {item.senderName}
                </p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 pl-5 bg-stone-50/70 p-2 rounded-xl border border-stone-100">
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
                <span>Buka Chat Kasus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
}
