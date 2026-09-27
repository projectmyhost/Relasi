import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatEmitter, ChatMessagePayload, CounselorNotificationPayload } from '@/lib/chatEmitter';

export const dynamic = 'force-dynamic';

// Anti-Spam & Rate Limiting tracking (Memory store)
interface SpamTracker {
  lastTimestamp: number;
  lastContent: string;
}

const spamMap = new Map<string, SpamTracker>();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reportId = searchParams.get('reportId');

    if (!reportId) {
      return NextResponse.json(
        { error: 'reportId parameter is required' },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: { reportId },
      orderBy: { timestamp: 'asc' },
    });

    const formattedMessages: ChatMessagePayload[] = messages.map((m) => ({
      id: m.id,
      reportId: m.reportId,
      sender: m.sender as 'student' | 'counselor',
      senderName: m.senderName,
      content: m.content,
      timestamp: m.timestamp.toISOString(),
      isRead: m.isRead,
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error('Failed to get chat messages:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, sender, senderName, content } = body;

    if (!reportId || !content || !content.trim()) {
      return NextResponse.json(
        { error: 'reportId and valid content are required' },
        { status: 400 }
      );
    }

    const trimmedContent = content.trim();

    // 1. Max character length limit
    if (trimmedContent.length > 1000) {
      return NextResponse.json(
        { error: 'Pesan terlalu panjang (maksimal 1.000 karakter).' },
        { status: 400 }
      );
    }

    const validSender = sender === 'counselor' ? 'counselor' : 'student';
    const validSenderName = senderName?.trim() || (validSender === 'counselor' ? 'Guru BK' : 'Pelapor');

    // 2. Anti-Spam Cooldown & Duplicate Check
    const spamKey = `${reportId}:${validSender}`;
    const now = Date.now();
    const existingTracker = spamMap.get(spamKey);

    if (existingTracker) {
      // 1 second cooldown
      if (now - existingTracker.lastTimestamp < 1000) {
        return NextResponse.json(
          { error: 'Mohon tunggu 1 detik sebelum mengirim pesan berikutnya.' },
          { status: 429 }
        );
      }

      // Duplicate message detection within 2 seconds
      if (
        now - existingTracker.lastTimestamp < 2000 &&
        existingTracker.lastContent.toLowerCase() === trimmedContent.toLowerCase()
      ) {
        return NextResponse.json(
          { error: 'Pesan serupa baru saja dikirim. Mohon hindari klik berulang.' },
          { status: 429 }
        );
      }
    }

    spamMap.set(spamKey, { lastTimestamp: now, lastContent: trimmedContent });

    // 1. Ensure report exists in PostgreSQL to prevent foreign key constraint failure
    const existingReport = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!existingReport) {
      await prisma.report.create({
        data: {
          id: reportId,
          pin: '000000',
          role: 'victim',
          isAnonymous: true,
          incidentDate: new Date().toISOString().split('T')[0],
          incidentTime: '10:00 WIB',
          location: 'Sekolah',
          partiesInvolved: 'Dalam Penyelidikan',
          description: 'Laporan aduan siswa',
          urgency: 'normal',
          category: 'lainnya',
          status: 'submitted',
        },
      });
    }

    // 2. Save message to PostgreSQL
    const created = await prisma.message.create({
      data: {
        reportId,
        sender: validSender,
        senderName: validSenderName,
        content: trimmedContent,
        isRead: false,
      },
    });

    // 2. Also log audit if counselor
    if (validSender === 'counselor') {
      await prisma.auditLog.create({
        data: {
          actor: validSenderName,
          role: 'counselor',
          action: 'SEND_MESSAGE',
          target: reportId,
          detail: 'Mengirim pesan klarifikasi tertutup kepada pelapor',
        },
      });
    }

    const payload: ChatMessagePayload = {
      id: created.id,
      reportId: created.reportId,
      sender: created.sender as 'student' | 'counselor',
      senderName: created.senderName,
      content: created.content,
      timestamp: created.timestamp.toISOString(),
      isRead: created.isRead,
    };

    // 3. Emit real-time message event to specific room
    chatEmitter.emit(`chat:${reportId}`, payload);

    // 4. If student is sending, emit global notification to counselor
    if (validSender === 'student') {
      const notifPayload: CounselorNotificationPayload = {
        reportId,
        senderName: validSenderName,
        contentSnippet: payload.content.length > 80 ? payload.content.substring(0, 80) + '...' : payload.content,
        timestamp: payload.timestamp,
      };
      chatEmitter.emit('counselor-notification', notifPayload);
    }

    return NextResponse.json({ success: true, message: payload }, { status: 201 });
  } catch (error) {
    console.error('Failed to post chat message:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
