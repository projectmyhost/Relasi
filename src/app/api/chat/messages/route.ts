import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatEmitter, ChatMessagePayload, CounselorNotificationPayload, StudentNotificationPayload } from '@/lib/chatEmitter';
import { getCurrentDateWIB, getCurrentTimeWIB } from '@/lib/utils';

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

    const formattedMessages: ChatMessagePayload[] = messages.map((m) => {
      let text = m.content;
      let imageUrl: string | null = null;
      if (m.content.startsWith('{') && m.content.includes('__isImage')) {
        try {
          const parsed = JSON.parse(m.content);
          if (parsed && typeof parsed === 'object' && parsed.__isImage) {
            text = parsed.text || '';
            imageUrl = parsed.imageUrl || null;
          }
        } catch {
          // Keep raw content if parse fails
        }
      }
      return {
        id: m.id,
        reportId: m.reportId,
        sender: m.sender as 'student' | 'counselor',
        senderName: m.senderName,
        content: text,
        imageUrl,
        timestamp: m.timestamp.toISOString(),
        isRead: m.isRead,
      };
    });

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
    const { reportId, sender, senderName, content, imageUrl } = body;

    const trimmedContent = typeof content === 'string' ? content.trim() : '';
    const cleanImageUrl = typeof imageUrl === 'string' && imageUrl.trim() ? imageUrl.trim() : null;

    if (!reportId || (!trimmedContent && !cleanImageUrl)) {
      return NextResponse.json(
        { error: 'ID laporan dan pesan teks atau lampiran foto harus disertakan' },
        { status: 400 }
      );
    }

    // 1. Max character length limit
    if (trimmedContent.length > 1000) {
      return NextResponse.json(
        { error: 'Pesan terlalu panjang (maksimal 1.000 karakter).' },
        { status: 400 }
      );
    }

    // 2. Strict Role Constraint: Only Counselor and Student are allowed to exchange messages
    if (sender !== 'counselor' && sender !== 'student') {
      return NextResponse.json(
        { error: 'Akses ditolak: Sistem chat tertutup hanya mengizinkan komunikasi antara Guru BK dan Siswa Pelapor.' },
        { status: 403 }
      );
    }

    const validSender = sender;
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
          incidentDate: getCurrentDateWIB(),
          incidentTime: getCurrentTimeWIB(),
          location: 'Sekolah',
          partiesInvolved: 'Dalam Penyelidikan',
          description: 'Laporan aduan siswa',
          urgency: 'normal',
          category: 'lainnya',
          status: 'submitted',
        },
      });
    } else if (validSender === 'student' && existingReport.userEmail) {
      const incomingEmail = body.userEmail?.trim().toLowerCase();
      if (incomingEmail && existingReport.userEmail.toLowerCase() !== incomingEmail) {
        return NextResponse.json(
          { error: 'Akses ditolak: Anda tidak memiliki hak mengirim pesan pada laporan milik siswa lain.' },
          { status: 403 }
        );
      }
    }

    // 2. Save message to PostgreSQL
    const dbContent = cleanImageUrl
      ? JSON.stringify({ __isImage: true, text: trimmedContent, imageUrl: cleanImageUrl })
      : trimmedContent;

    const created = await prisma.message.create({
      data: {
        reportId,
        sender: validSender,
        senderName: validSenderName,
        content: dbContent,
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
          detail: cleanImageUrl 
            ? 'Mengirim pesan klarifikasi tertutup beserta lampiran foto kepada pelapor'
            : 'Mengirim pesan klarifikasi tertutup kepada pelapor',
        },
      });
    }

    const payload: ChatMessagePayload = {
      id: created.id,
      reportId: created.reportId,
      sender: created.sender as 'student' | 'counselor',
      senderName: created.senderName,
      content: trimmedContent,
      imageUrl: cleanImageUrl,
      timestamp: created.timestamp.toISOString(),
      isRead: created.isRead,
    };

    // 3. Emit real-time message event to specific room
    chatEmitter.emit(`chat:${reportId}`, payload);

    // Formatted snippet for notifications (includes 📷 [Foto] indicator if image is attached)
    const notifSnippet = cleanImageUrl
      ? `📷 [Foto] ${trimmedContent ? (trimmedContent.length > 50 ? trimmedContent.substring(0, 50) + '...' : trimmedContent) : 'Lampiran foto baru'}`
      : (trimmedContent.length > 80 ? trimmedContent.substring(0, 80) + '...' : trimmedContent);

    // 4. If student is sending, emit global notification to counselor
    if (validSender === 'student') {
      const notifPayload: CounselorNotificationPayload = {
        reportId,
        senderName: validSenderName,
        contentSnippet: notifSnippet,
        timestamp: payload.timestamp,
      };
      chatEmitter.emit('counselor-notification', notifPayload);
    }

    // 5. If counselor is sending, emit notification to student
    if (validSender === 'counselor') {
      const studentNotifPayload: StudentNotificationPayload = {
        reportId,
        userId: existingReport?.userId || null,
        userEmail: existingReport?.userEmail || (existingReport?.reporterContact?.includes('@') ? existingReport.reporterContact : null),
        senderName: validSenderName,
        contentSnippet: notifSnippet,
        timestamp: payload.timestamp,
      };
      chatEmitter.emit('student-notification', studentNotifPayload);
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
