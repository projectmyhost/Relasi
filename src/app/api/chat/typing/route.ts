import { NextRequest, NextResponse } from 'next/server';
import { chatEmitter, ChatTypingPayload } from '@/lib/chatEmitter';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reportId, senderRole, senderName, isTyping } = body;

    if (!reportId || !senderRole) {
      return NextResponse.json(
        { error: 'reportId and senderRole are required' },
        { status: 400 }
      );
    }

    const payload: ChatTypingPayload = {
      type: 'typing',
      reportId,
      senderRole: senderRole === 'counselor' ? 'counselor' : 'student',
      senderName: senderName?.trim() || (senderRole === 'counselor' ? 'Guru BK' : 'Pelapor (Anonim)'),
      isTyping: Boolean(isTyping),
    };

    chatEmitter.emit(`chat:${reportId}`, payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to broadcast typing status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
