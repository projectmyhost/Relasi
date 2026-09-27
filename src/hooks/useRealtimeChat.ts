'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessagePayload } from '@/lib/chatEmitter';
import { playNotificationChime } from '@/lib/audioNotification';

export interface UseRealtimeChatOptions {
  reportId?: string | null;
  currentRole?: 'student' | 'counselor' | 'guest' | 'super_admin';
  initialMessages?: ChatMessagePayload[];
}

export interface TypingStatus {
  isTyping: boolean;
  senderName: string;
}

export function useRealtimeChat({
  reportId,
  currentRole,
  initialMessages = [],
}: UseRealtimeChatOptions) {
  const [messages, setMessages] = useState<ChatMessagePayload[]>(initialMessages);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [typingStatus, setTypingStatus] = useState<TypingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingPingRef = useRef<number>(0);
  const currentReportIdRef = useRef<string | null | undefined>(reportId);

  // Keep currentReportIdRef strictly synchronized and reset message history immediately on report switch
  useEffect(() => {
    currentReportIdRef.current = reportId;
    setMessages([]);
    setTypingStatus(null);
    setError(null);
  }, [reportId]);

  // 1. Mark as read handler
  const markAsRead = useCallback(async () => {
    if (!reportId || !currentRole || currentRole === 'guest') return;

    try {
      await fetch('/api/chat/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          readerRole: currentRole,
        }),
      });
    } catch (e) {
      console.error('Failed to mark chat as read:', e);
    }
  }, [reportId, currentRole]);

  // 2. Initial message history loader from PostgreSQL with race condition protection
  const loadMessages = useCallback(async () => {
    const targetId = reportId;
    if (!targetId) {
      setMessages([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/chat/messages?reportId=${encodeURIComponent(targetId)}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      
      // Ensure we only update state if user is still viewing this exact report
      if (currentReportIdRef.current === targetId && Array.isArray(data.messages)) {
        setMessages(data.messages);
        markAsRead();
      }
    } catch (err: unknown) {
      console.error('Error fetching chat history:', err);
      if (currentReportIdRef.current === targetId) {
        setError(err instanceof Error ? err.message : 'Gagal memuat riwayat obrolan');
      }
    } finally {
      if (currentReportIdRef.current === targetId) {
        setIsLoading(false);
      }
    }
  }, [reportId, markAsRead]);

  // 3. Real-time EventSource connection
  useEffect(() => {
    if (!reportId) {
      setIsConnected(false);
      setTypingStatus(null);
      setMessages([]);
      return;
    }

    // 1. Initial message load
    loadMessages();

    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;

    // 2. High-Frequency Smart Polling (2.5s) to guarantee instant delivery on Vercel/serverless
    async function pollChatMessages() {
      if (!isMounted || !reportId) return;
      try {
        const res = await fetch(`/api/chat/messages?reportId=${encodeURIComponent(reportId)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && currentReportIdRef.current === reportId && Array.isArray(data.messages)) {
          setMessages((prev) => {
            const prevIds = new Set(prev.map((m) => m.id));
            let hasChanges = false;
            let hasNewIncoming = false;

            for (const incoming of data.messages) {
              if (!prevIds.has(incoming.id)) {
                hasChanges = true;
                if (currentRole && incoming.sender !== currentRole) {
                  hasNewIncoming = true;
                }
              }
            }

            if (!hasChanges && prev.length === data.messages.length) {
              const statusChanged = data.messages.some((m: ChatMessagePayload, idx: number) => {
                return prev[idx] && prev[idx].isRead !== m.isRead;
              });
              if (statusChanged) hasChanges = true;
            }

            if (hasNewIncoming) {
              playNotificationChime();
              markAsRead();
            }

            return hasChanges ? data.messages : prev;
          });
        }
      } catch {
        // Silent fail on polling interval
      }
    }

    pollInterval = setInterval(pollChatMessages, 2500);

    function connectSSE() {
      if (!reportId) return;

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const sseUrl = `/api/chat/stream?reportId=${encodeURIComponent(reportId)}`;
      const es = new EventSource(sseUrl);
      eventSourceRef.current = es;

      es.onopen = () => {
        if (isMounted) setIsConnected(true);
      };

      es.onmessage = (event) => {
        try {
          if (!event.data || event.data === ':keepalive') return;
          const incoming = JSON.parse(event.data);

          // Handle Typing Indicator event
          if (incoming.type === 'typing') {
            if (incoming.senderRole !== currentRole) {
              if (incoming.isTyping) {
                setTypingStatus({
                  isTyping: true,
                  senderName: incoming.senderName || 'Lawan Bicara',
                });

                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = setTimeout(() => {
                  if (isMounted) setTypingStatus(null);
                }, 3500);
              } else {
                setTypingStatus(null);
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
              }
            }
            return;
          }

          // Handle Read Receipt event
          if (incoming.type === 'read') {
            if (incoming.readerRole !== currentRole) {
              // The other party has viewed our messages -> mark sent messages as read
              setMessages((prev) =>
                prev.map((m) => (m.sender === currentRole ? { ...m, isRead: true } : m))
              );
            }
            return;
          }

          // Handle incoming chat message with strict reportId match
          const msg: ChatMessagePayload = incoming;
          if (msg.reportId && msg.reportId !== reportId) {
            return;
          }

          setMessages((prev) => {
            const exists = prev.some((m) => m.id === msg.id);
            if (exists) {
              return prev.map((m) => (m.id === msg.id ? msg : m));
            }

            if (currentRole && msg.sender !== currentRole) {
              playNotificationChime();
              markAsRead();
            }

            return [...prev, msg];
          });
        } catch (e) {
          console.error('Failed to parse SSE chat message:', e);
        }
      };

      es.onerror = () => {
        if (isMounted) setIsConnected(false);
        es.close();

        // Auto-reconnect after 3 seconds with backoff
        if (isMounted) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) connectSSE();
          }, 3000);
        }
      };
    }

    connectSSE();

    return () => {
      isMounted = false;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [reportId, currentRole, loadMessages, markAsRead]);

  // 4. Send Typing Ping
  const sendTypingIndicator = useCallback(
    async (isTyping: boolean, senderName?: string) => {
      if (!reportId || !currentRole || currentRole === 'guest') return;

      const now = Date.now();
      if (isTyping && now - lastTypingPingRef.current < 1800) {
        return; // throttle typing pings to every 1.8s
      }
      lastTypingPingRef.current = now;

      try {
        await fetch('/api/chat/typing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reportId,
            senderRole: currentRole,
            senderName,
            isTyping,
          }),
        });
      } catch (err) {
        console.error('Failed to send typing ping:', err);
      }
    },
    [reportId, currentRole]
  );

  // 5. Send Message function (supports text and/or attached photo)
  const sendMessage = useCallback(
    async (
      content: string,
      sender: 'student' | 'counselor',
      senderName: string,
      imageUrl?: string | null
    ): Promise<boolean> => {
      const text = content.trim();
      if (!reportId || (!text && !imageUrl)) return false;

      setIsSending(true);
      // Clear typing indicator immediately on message send
      sendTypingIndicator(false, senderName);

      try {
        const res = await fetch('/api/chat/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reportId,
            sender,
            senderName,
            content: text,
            imageUrl: imageUrl || null,
          }),
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(result.error || `Failed to send message: ${res.statusText}`);
        }

        if (result.success && result.message) {
          // Optimistically append only if user is still on this exact report
          if (result.message.reportId === currentReportIdRef.current) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === result.message.id)) return prev;
              return [...prev, result.message];
            });
          }
        }

        return true;
      } catch (err: unknown) {
        console.error('Error sending chat message:', err);
        setError(err instanceof Error ? err.message : 'Gagal mengirim pesan');
        return false;
      } finally {
        setIsSending(false);
      }
    },
    [reportId, sendTypingIndicator]
  );

  return {
    messages,
    isConnected,
    isLoading,
    isSending,
    typingStatus,
    error,
    sendMessage,
    sendTypingIndicator,
    markAsRead,
    reloadMessages: loadMessages,
  };
}
