import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const userEmail = searchParams.get('userEmail')?.trim().toLowerCase();
    const userId = searchParams.get('userId')?.trim();

    if (role === 'student') {
      if (!userEmail && !userId) {
        return NextResponse.json({ unreadCount: 0, notifications: [] });
      }

      const orConditions: any[] = [];
      if (userEmail) {
        orConditions.push({ userEmail: { equals: userEmail, mode: 'insensitive' } });
        orConditions.push({ reporterContact: { contains: userEmail, mode: 'insensitive' } });
      }
      if (userId) {
        orConditions.push({ userId });
      }

      const unreadMessages = await prisma.message.findMany({
        where: {
          sender: 'counselor',
          isRead: false,
          report: {
            OR: orConditions,
          },
        },
        include: {
          report: {
            select: {
              id: true,
              category: true,
              description: true,
            },
          },
        },
        orderBy: { timestamp: 'desc' },
        take: 10,
      });

      const notifications = unreadMessages.map((msg) => {
        let contentSnippet = msg.content;
        if (msg.content.startsWith('{') && msg.content.includes('__isImage')) {
          try {
            const parsed = JSON.parse(msg.content);
            contentSnippet = parsed.text ? `📷 [Foto] ${parsed.text}` : '📷 [Lampiran Foto]';
          } catch {}
        }
        if (contentSnippet.length > 80) {
          contentSnippet = contentSnippet.substring(0, 80) + '...';
        }

        return {
          id: msg.id,
          reportId: msg.reportId,
          senderName: msg.senderName || 'Guru BK (Konselor)',
          contentSnippet,
          timestamp: msg.timestamp.toISOString(),
          category: msg.report?.category || 'Aduan',
        };
      });

      return NextResponse.json({
        unreadCount: notifications.length,
        notifications,
      });
    }

    if (role === 'counselor') {
      const unreadMessages = await prisma.message.findMany({
        where: {
          sender: 'student',
          isRead: false,
        },
        include: {
          report: {
            select: {
              id: true,
              category: true,
              reporterName: true,
              isAnonymous: true,
            },
          },
        },
        orderBy: { timestamp: 'desc' },
        take: 10,
      });

      const notifications = unreadMessages.map((msg) => {
        let contentSnippet = msg.content;
        if (msg.content.startsWith('{') && msg.content.includes('__isImage')) {
          try {
            const parsed = JSON.parse(msg.content);
            contentSnippet = parsed.text ? `📷 [Foto] ${parsed.text}` : '📷 [Lampiran Foto]';
          } catch {}
        }
        if (contentSnippet.length > 80) {
          contentSnippet = contentSnippet.substring(0, 80) + '...';
        }

        return {
          id: msg.id,
          reportId: msg.reportId,
          senderName: msg.senderName || 'Siswa Pelapor',
          contentSnippet,
          timestamp: msg.timestamp.toISOString(),
          category: msg.report?.category || 'Aduan',
        };
      });

      return NextResponse.json({
        unreadCount: notifications.length,
        notifications,
      });
    }

    return NextResponse.json({ unreadCount: 0, notifications: [] });
  } catch (error) {
    console.error('Failed to query unread notifications:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
