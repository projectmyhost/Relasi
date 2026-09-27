import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatEmitter, ChatReadPayload } from '@/lib/chatEmitter';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, readerRole } = body;

    if (!reportId || !readerRole) {
      return NextResponse.json(
        { error: 'reportId and readerRole are required' },
        { status: 400 }
      );
    }

    const validReader = readerRole === 'counselor' ? 'counselor' : 'student';
    const targetSender = validReader === 'counselor' ? 'student' : 'counselor';

    // 1. Update database records
    const updateResult = await prisma.message.updateMany({
      where: {
        reportId,
        sender: targetSender,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    // 2. Broadcast read receipt event in real-time
    const payload: ChatReadPayload = {
      type: 'read',
      reportId,
      readerRole: validReader,
      timestamp: new Date().toISOString(),
    };

    chatEmitter.emit(`chat:${reportId}`, payload);

    return NextResponse.json({
      success: true,
      updatedCount: updateResult.count,
    });
  } catch (error) {
    console.error('Failed to mark messages as read:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
