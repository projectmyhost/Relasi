import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatEmitter, UserStatusPayload } from '@/lib/chatEmitter';
import { userStatusMap } from '@/lib/userStatusStore';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get('email')?.trim().toLowerCase();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // 1. Send initial status snapshot immediately
      let initialStatus: 'active' | 'inactive' = 'active';
      if (emailParam) {
        const inMemory = userStatusMap?.get(emailParam);
        if (inMemory) {
          initialStatus = inMemory;
        } else {
          try {
            const user = await prisma.user.findFirst({
              where: { email: { equals: emailParam, mode: 'insensitive' } },
            });
            if (user?.avatar === 'inactive') {
              initialStatus = 'inactive';
            }
          } catch (e) {
            console.error('Error checking initial user status:', e);
          }
        }
      }

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ status: initialStatus, email: emailParam })}\n\n`)
      );

      // 2. Real-time Event Listener for instant status change broadcasts
      const statusListener = (payload: UserStatusPayload) => {
        try {
          if (!emailParam) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
            return;
          }

          if (payload.email && payload.email.toLowerCase() === emailParam) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
          }
        } catch {
          // Stream might be closed
        }
      };

      chatEmitter.on('user_status_changed', statusListener);

      // 3. Keepalive heartbeat
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(':keepalive\n\n'));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        chatEmitter.off('user_status_changed', statusListener);
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
