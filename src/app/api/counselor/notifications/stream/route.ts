import { NextRequest } from 'next/server';
import { chatEmitter, CounselorNotificationPayload } from '@/lib/chatEmitter';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Initial connection ack
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ status: 'counselor_stream_active' })}\n\n`)
      );

      const notifListener = (payload: CounselorNotificationPayload) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          // Stream might be closed
        }
      };

      chatEmitter.on('counselor-notification', notifListener);

      // Keepalive heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(':keepalive\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        chatEmitter.off('counselor-notification', notifListener);
        clearInterval(heartbeat);
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
