import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { chatEmitter, UserStatusPayload } from '@/lib/chatEmitter';

export const dynamic = 'force-dynamic';

import { userStatusMap } from '@/lib/userStatusStore';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const emailParam = searchParams.get('email')?.trim().toLowerCase();

    if (emailParam) {
      const user = await prisma.user.findFirst({
        where: { email: { equals: emailParam, mode: 'insensitive' } },
      });
      const inMemory = userStatusMap.get(emailParam);
      const isInactive = inMemory ? inMemory === 'inactive' : user?.avatar === 'inactive';
      return NextResponse.json({
        success: true,
        email: emailParam,
        status: isInactive ? 'inactive' : 'active',
      });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      users: users.map((u) => {
        const inMemory = userStatusMap.get(u.email.toLowerCase());
        const isInactive = inMemory ? inMemory === 'inactive' : u.avatar === 'inactive';
        return {
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          roleLabel: u.roleLabel || (u.role === 'counselor' ? 'Guru BK' : u.role === 'super_admin' ? 'Super Admin' : 'Siswa'),
          departmentOrClass: u.departmentOrClass || '-',
          status: isInactive ? 'inactive' : 'active',
          createdAt: u.createdAt,
        };
      }),
    });
  } catch (error: any) {
    console.error('Error fetching users from database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memuat pengguna' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, role = 'student', roleLabel, departmentOrClass, avatar } = body;

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Email dan Nama wajib diisi' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const finalRoleLabel = roleLabel || (role === 'counselor' ? 'Guru Bimbingan Konseling (BK)' : role === 'super_admin' ? 'Super Admin' : `Siswa (${departmentOrClass || 'Reguler'})`);

    const user = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: {
        name: cleanName,
        role: role as any,
        roleLabel: finalRoleLabel,
        departmentOrClass: departmentOrClass || undefined,
        avatar: avatar || undefined,
      },
      create: {
        email: cleanEmail,
        name: cleanName,
        role: role as any,
        roleLabel: finalRoleLabel,
        departmentOrClass: departmentOrClass || undefined,
        avatar: avatar || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Error creating/updating user in database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menyimpan pengguna' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, email, status } = body;

    if (!status || (!id && !email)) {
      return NextResponse.json(
        { success: false, error: 'Target user (id / email) and status wajib diisi' },
        { status: 400 }
      );
    }

    const targetStatus: 'active' | 'inactive' = status === 'inactive' ? 'inactive' : 'active';

    // 1. Locate user in DB
    const existing = await prisma.user.findFirst({
      where: id ? { id } : { email: { equals: email, mode: 'insensitive' } },
    });

    let targetEmail = (email || existing?.email || '').trim().toLowerCase();
    let targetId = id || existing?.id || '';

    // 2. Persist in PostgreSQL
    if (existing) {
      await prisma.user.update({
        where: { id: existing.id },
        data: {
          avatar: targetStatus === 'inactive' ? 'inactive' : null,
        },
      });
      targetEmail = existing.email.toLowerCase();
      targetId = existing.id;
    }

    // 3. Update fast in-memory map
    if (targetEmail) {
      userStatusMap.set(targetEmail, targetStatus);
    }

    // 4. Emit Real-time SSE event to all connected clients
    const eventPayload: UserStatusPayload = {
      userId: targetId,
      email: targetEmail,
      status: targetStatus,
      timestamp: new Date().toISOString(),
    };

    chatEmitter.emit('user_status_changed', eventPayload);

    return NextResponse.json({
      success: true,
      user: {
        id: targetId,
        email: targetEmail,
        status: targetStatus,
      },
    });
  } catch (error: any) {
    console.error('Error updating user status in database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memperbarui status pengguna' },
      { status: 500 }
    );
  }
}
