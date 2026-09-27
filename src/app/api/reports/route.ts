import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('userEmail');
    const userId = searchParams.get('userId');

    let whereClause = {};
    if (userEmail) {
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

    return NextResponse.json({ reports });
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
        incidentDate: incidentDate || new Date().toISOString().split('T')[0],
        incidentTime: incidentTime || '10:00 WIB',
        description,
        location,
        partiesInvolved: partiesInvolved || 'Dalam Penyelidikan',
        category,
        urgency,
        status: 'submitted',
      },
    });

    return NextResponse.json({ success: true, report: created }, { status: 201 });
  } catch (error) {
    console.error('Failed to create report in database:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
