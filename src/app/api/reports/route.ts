import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatEmitter } from '@/lib/chatEmitter';
import { getCurrentDateWIB, getCurrentTimeWIB } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    const userId = searchParams.get('userId');
    const reportId = searchParams.get('reportId');

    let whereClause: any = {};
    if (reportId) {
      whereClause = { id: reportId };
    } else if (userEmail) {
      whereClause = {
        OR: [
          { userEmail: { equals: userEmail, mode: 'insensitive' } },
          { reporterContact: { equals: userEmail, mode: 'insensitive' } },
        ],
      };
    } else if (userId) {
      whereClause = { userId };
    }

    const reports = await prisma.report.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });

    const formatted = reports.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      messages: r.messages.map((m) => ({
        id: m.id,
        sender: m.sender as 'student' | 'counselor',
        senderName: m.senderName,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
        isRead: m.isRead,
      })),
    }));

    return NextResponse.json({ reports: formatted });
  } catch (error) {
    console.error('Failed to get reports from database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      pin,
      userId,
      userEmail,
      role = 'victim',
      isAnonymous = true,
      reporterName,
      reporterClass,
      reporterContact,
      incidentDate,
      incidentTime,
      location,
      partiesInvolved,
      category = 'fisik',
      urgency = 'normal',
      description,
      aiUrgency,
      aiCategory,
      aiReasoning,
      aiConfidence,
    } = body;

    if (!id || !description || !location) {
      return NextResponse.json({ error: 'Missing required report fields' }, { status: 400 });
    }

    const created = await prisma.report.upsert({
      where: { id },
      update: {
        userId: userId || null,
        userEmail: userEmail || null,
        reporterName: reporterName || null,
        reporterClass: reporterClass || null,
        reporterContact: reporterContact || null,
        description,
        location,
        partiesInvolved: partiesInvolved || '',
        category,
        urgency,
        aiUrgency: aiUrgency || null,
        aiCategory: aiCategory || null,
        aiReasoning: aiReasoning || null,
        aiConfidence: typeof aiConfidence === 'number' ? aiConfidence : null,
      },
      create: {
        id,
        pin: pin || '000000',
        userId: userId || null,
        userEmail: userEmail || null,
        role: role === 'witness' ? 'witness' : 'victim',
        isAnonymous: Boolean(isAnonymous),
        reporterName: reporterName || null,
        reporterClass: reporterClass || null,
        reporterContact: reporterContact || null,
        incidentDate: incidentDate || getCurrentDateWIB(),
        incidentTime: incidentTime || getCurrentTimeWIB(),
        description,
        location,
        partiesInvolved: partiesInvolved || 'Dalam Penyelidikan',
        category,
        urgency,
        status: 'submitted',
        aiUrgency: aiUrgency || null,
        aiCategory: aiCategory || null,
        aiReasoning: aiReasoning || null,
        aiConfidence: typeof aiConfidence === 'number' ? aiConfidence : null,
      },
    });

    const formattedReport = {
      ...created,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
      messages: [],
    };

    // Broadcast in real-time to Counselor dashboard via SSE stream
    chatEmitter.emit('counselor-notification', {
      type: 'new_report',
      reportId: created.id,
      senderName: created.isAnonymous ? 'Pelapor (Anonim)' : (created.reporterName || 'Siswa'),
      contentSnippet: created.description.slice(0, 80),
      timestamp: new Date().toISOString(),
      report: formattedReport,
    });

    return NextResponse.json({ success: true, report: formattedReport }, { status: 201 });
  } catch (error) {
    console.error('Failed to create report in database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, urgency, caseId, aiUrgency, aiCategory, aiReasoning, aiConfidence } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing report id' }, { status: 400 });
    }

    const updated = await prisma.report.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(urgency ? { urgency } : {}),
        ...(caseId !== undefined ? { caseId } : {}),
        ...(aiUrgency !== undefined ? { aiUrgency } : {}),
        ...(aiCategory !== undefined ? { aiCategory } : {}),
        ...(aiReasoning !== undefined ? { aiReasoning } : {}),
        ...(aiConfidence !== undefined ? { aiConfidence } : {}),
      },
    });

    return NextResponse.json({ success: true, report: updated });
  } catch (error) {
    console.error('Failed to update report status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
