import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada berkas foto yang diunggah' },
        { status: 400 }
      );
    }

    // Validasi tipe berkas foto
    const validMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/jpg',
      'image/heic',
      'image/heif',
    ];
    if (!validMimes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Format berkas tidak didukung. Harap pilih gambar JPG, PNG, WEBP, atau GIF.' },
        { status: 400 }
      );
    }

    // Batas ukuran maksimal 8 MB
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran foto maksimal 8 MB.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Simpan ke direktori public/uploads/chat
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'chat');
    await fs.promises.mkdir(uploadDir, { recursive: true });

    const rawExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif'].includes(rawExt)
      ? rawExt
      : 'jpg';
    const filename = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${safeExt}`;
    const filePath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/chat/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error('Failed to upload chat image:', error);
    return NextResponse.json(
      { error: 'Gagal mengunggah gambar. Silakan coba kembali.' },
      { status: 500 }
    );
  }
}
