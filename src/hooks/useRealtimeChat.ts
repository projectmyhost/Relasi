'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessagePayload } from '@/lib/chatEmitter';
import { playNotificationChime } from '@/lib/audioNotification';

export interface UseRealtimeChatOptions {
  reportId?: string | null;
  currentRole?: 'student' | 'counselor' | 'guest' | 'super_admin';
  initialMessages?: ChatMessagePayload[];
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
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial message history loader from PostgreSQL
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
      }
    } catch (err: unknown) {
      console.error('Error fetching chat history:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat riwayat obrolan');
    } finally {
      setIsLoading(false);
    }
  }, [reportId]);

  // 2. Real-time EventSource connection
  useEffect(() => {
    if (!reportId) {
      setIsConnected(false);
      return;
    }

    // Load initial messages
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
          const incoming: ChatMessagePayload = JSON.parse(event.data);

          setMessages((prev) => {
            const exists = prev.some((m) => m.id === incoming.id);
            if (exists) {
              return prev.map((m) => (m.id === incoming.id ? incoming : m));
            }

            // Play gentle chime if message is from the other party
            if (currentRole && incoming.sender !== currentRole) {
              playNotificationChime();
            }

            return [...prev, incoming];
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
    };
  }, [reportId, currentRole, loadMessages]);

  // 3. Send Message function
  const sendMessage = useCallback(
    async (content: string, sender: 'student' | 'counselor', senderName: string): Promise<boolean> => {
      if (!reportId || !content.trim()) return false;

      setIsSending(true);
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
    [reportId]
  );

  return {
    messages,
    isConnected,
    isLoading,
    isSending,
    error,
    sendMessage,
    reloadMessages: loadMessages,
  };
}
