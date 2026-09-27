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

  // 2. Initial message history loader from PostgreSQL
  const loadMessages = useCallback(async () => {
    if (!reportId) {
      setMessages([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/chat/messages?reportId=${encodeURIComponent(reportId)}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
        // Automatically mark incoming messages as read when opening
        markAsRead();
      }
    } catch (err: unknown) {
      console.error('Error fetching chat history:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat riwayat obrolan');
    } finally {
      setIsLoading(false);
    }
  }, [reportId, markAsRead]);

  // 3. Real-time EventSource connection
  useEffect(() => {
    if (!reportId) {
      setIsConnected(false);
      setTypingStatus(null);
      return;
    }

    // Load initial messages and mark as read
    loadMessages();

    let isMounted = true;

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

          // Handle incoming chat message
          const msg: ChatMessagePayload = incoming;
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === msg.id);
            if (exists) {
              return prev.map((m) => (m.id === msg.id ? msg : m));
            }

            // Play gentle chime if message is from the other party
            if (currentRole && msg.sender !== currentRole) {
              playNotificationChime();
              // If user is currently looking at this active report, immediately mark as read
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

  // 5. Send Message function
  const sendMessage = useCallback(
    async (content: string, sender: 'student' | 'counselor', senderName: string): Promise<boolean> => {
      if (!reportId || !content.trim()) return false;

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
            content: content.trim(),
          }),
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(result.error || `Failed to send message: ${res.statusText}`);
        }

        if (result.success && result.message) {
          // Optimistically append if SSE hasn't arrived yet
          setMessages((prev) => {
            if (prev.some((m) => m.id === result.message.id)) return prev;
            return [...prev, result.message];
          });
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
