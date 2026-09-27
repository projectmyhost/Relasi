import { NextRequest } from 'next/server';
import { chatEmitter, StudentNotificationPayload } from '@/lib/chatEmitter';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail')?.trim().toLowerCase();
  const userId = searchParams.get('userId')?.trim();

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Initial connection acknowledgment
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ status: 'student_stream_active' })}\n\n`)
      );

      const notifListener = (payload: StudentNotificationPayload) => {
        try {
          // If userId filter is present and payload has userId, must match
          if (userId && payload.userId && payload.userId !== userId) {
            return;
          }
          // If userEmail filter is present and payload has userEmail, must match
          if (userEmail && payload.userEmail && payload.userEmail.toLowerCase() !== userEmail) {
            return;
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          // Stream might be closed
        }
      };

      chatEmitter.on('student-notification', notifListener);

      // Keepalive heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(':keepalive\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        chatEmitter.off('student-notification', notifListener);
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
