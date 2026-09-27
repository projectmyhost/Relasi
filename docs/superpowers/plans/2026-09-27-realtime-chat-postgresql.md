# Realtime Chat & PostgreSQL Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun sistem chat real-time dua arah antara Guru BK dan Siswa (dengan notifikasi instan dan audio chime bagi guru saat siswa mengirim pesan) serta migrasi persistensi data lengkap ke PostgreSQL lokal menggunakan Prisma ORM.

**Architecture:** Database PostgreSQL (`relasi_db` port 5432) dimodelkan via Prisma ORM. Pertukaran pesan real-time dikelola oleh Event Hub (Node EventEmitter) pada Next.js API Routes melalui Server-Sent Events (SSE) native `/api/chat/stream` dan notifikasi global `/api/counselor/notifications/stream`. Di sisi frontend, custom hook `useRealtimeChat` dan komponen `CounselorNotificationToast` memberikan pengalaman chat instan tanpa delay atau refresh halaman.

**Tech Stack:** Next.js 14 (App Router), PostgreSQL 14 (Laragon), Prisma ORM 5.x, Server-Sent Events (SSE), Web Audio API, Framer Motion, TailwindCSS.

**Spec:** `docs/superpowers/specs/2026-09-27-realtime-chat-postgresql-design.md`

## Global Constraints

- Database URL: `postgresql://postgres@localhost:5432/relasi_db?schema=public`
- Tidak memerlukan port terpisah untuk WebSocket; semua streaming berjalan secara native di port 3000 via SSE.
- Desain antarmuka mengikuti standar modern luxury / Dribbble, menggunakan palet kanvas `#F6F4F0` dan aksen `#E02B2B` tanpa elemen AI-slop.
- Kerahasiaan identitas siswa tetap terjaga jika status laporan `isAnonymous: true`.

## Review Focus

1. **Koneksi Jaringan Terputus**: `useRealtimeChat` harus memiliki auto-reconnect dengan exponential backoff dan fallback refresh agar pesan tidak hilang saat koneksi tidak stabil.
2. **Koneksi Database Ganda di Dev Mode**: `src/lib/prisma.ts` harus menggunakan global singleton pattern agar tidak terjadi error `too many clients already` saat Next.js hot reload.
3. **Notifikasi Hanya Untuk Guru BK**: Komponen notifikasi `CounselorNotificationToast` hanya aktif jika `currentUser.role === 'counselor'` agar privasi siswa tidak bocor ke publik atau tamu.
4. **Validasi Pesan Kosong / XSS**: Backend `/api/chat/messages` harus menolak pesan kosong atau spasi murni dan membersihkan payload sebelum disimpan.
5. **Transisi Data Lama (Backward Compatibility)**: Seeder harus mengimpor seluruh mock data laporan dan kasus awal (`RS-2026-0412`, dll.) ke PostgreSQL sehingga antarmuka yang ada tetap berfungsi normal.

---

### Task 1: Prisma ORM & Database PostgreSQL Setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `src/lib/prisma.ts`
- Modify: `.env`
- Modify: `package.json`

**Interfaces:**
- Produces: `prisma` client singleton dari `src/lib/prisma.ts` yang mengekspos model `user`, `report`, `message`, `caseDossier`, `auditLog`.

- [ ] **Step 1: Install dependensi Prisma dan TypeScript ts-node**
```bash
npm install @prisma/client
npm install -D prisma ts-node @types/node
```

- [ ] **Step 2: Konfigurasi file `.env` dengan kredensial PostgreSQL**
Buat/perbarui baris berikut di `.env`:
```env
DATABASE_URL="postgresql://postgres@localhost:5432/relasi_db?schema=public"
```

- [ ] **Step 3: Definisikan skema Prisma (`prisma/schema.prisma`)**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  guest
  student
  counselor
  super_admin
}

enum ReporterRole {
  victim
  witness
}

enum UrgencyLevel {
  normal
  urgent
}

enum ReportCategory {
  fisik
  verbal
  relasional
  cyber
  pemalakan
  lainnya
}

enum ReportStatus {
  submitted
  reviewed
  investigating
  followup
  resolved
  unsubstantiated
}

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  name              String
  role              UserRole  @default(student)
  roleLabel         String
  departmentOrClass String?
  avatar            String?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

model Report {
  id              String         @id
  pin             String
  role            ReporterRole
  isAnonymous     Boolean        @default(true)
  reporterName    String?
  reporterClass   String?
  reporterContact String?
  incidentDate    String
  incidentTime    String
  location        String
  partiesInvolved String
  description     String         @db.Text
  urgency         UrgencyLevel   @default(normal)
  category        ReportCategory @default(fisik)
  status          ReportStatus   @default(submitted)
  caseId          String?
  caseDossier     CaseDossier?   @relation(fields: [caseId], references: [id])
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  messages        Message[]
}

model Message {
  id         String   @id @default(cuid())
  reportId   String
  report     Report   @relation(fields: [reportId], references: [id], onDelete: Cascade)
  sender     String   // "student" | "counselor"
  senderName String
  content    String   @db.Text
  timestamp  DateTime @default(now())
  isRead     Boolean  @default(false)

  @@index([reportId])
}

model CaseDossier {
  id              String      @id
  title           String
  summary         String      @db.Text
  status          String
  location        String
  partiesInvolved String[]
  leadCounselor   String
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  reports         Report[]
}

model AuditLog {
  id        String   @id @default(cuid())
  actor     String
  role      String
  action    String
  target    String
  detail    String   @db.Text
  timestamp DateTime @default(now())
}
```

- [ ] **Step 4: Push skema ke database PostgreSQL & generate client**
```bash
npx prisma db push
```
Pastikan output menampilkan: `Your database is now in sync with your Prisma schema.`

- [ ] **Step 5: Buat singleton Prisma Client (`src/lib/prisma.ts`)**
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

- [ ] **Step 6: Buat script database seeder (`prisma/seed.ts`) & jalankan**
Pindahkan data `INITIAL_REPORTS`, `INITIAL_CASES`, dan akun preset ke PostgreSQL:
```bash
npx prisma db seed
```

- [ ] **Step 7: Commit task 1**
```bash
git add prisma/ .env src/lib/prisma.ts package.json package-lock.json
git commit -m "feat(db): setup prisma orm, postgresql models, and initial seed"
```

---

### Task 2: Realtime Event Hub & Server-Sent Events (SSE) Routes

**Files:**
- Create: `src/lib/chatEmitter.ts`
- Create: `src/app/api/chat/messages/route.ts`
- Create: `src/app/api/chat/stream/route.ts`
- Create: `src/app/api/counselor/notifications/stream/route.ts`

**Interfaces:**
- Consumes: `prisma` dari `src/lib/prisma.ts`
- Produces: 
  - `chatEmitter` singleton (`emitMessage`, `onMessage`, `emitCounselorNotification`, `onCounselorNotification`)
  - `GET /api/chat/messages?reportId=...` -> JSON `{ messages: ReportMessage[] }`
  - `POST /api/chat/messages` -> JSON `{ success: true, message: ReportMessage }`
  - `GET /api/chat/stream?reportId=...` -> SSE Stream
  - `GET /api/counselor/notifications/stream` -> SSE Notification Stream

- [ ] **Step 1: Buat Event Hub PubSub (`src/lib/chatEmitter.ts`)**
```typescript
import { EventEmitter } from 'events';

class ChatEventEmitter extends EventEmitter {}

const globalForEmitter = globalThis as unknown as {
  chatEmitter: ChatEventEmitter | undefined;
};

export const chatEmitter = globalForEmitter.chatEmitter ?? new ChatEventEmitter();
chatEmitter.setMaxListeners(100);

if (process.env.NODE_ENV !== 'production') {
  globalForEmitter.chatEmitter = chatEmitter;
}
```

- [ ] **Step 2: Buat route handler `GET` & `POST` pesan (`src/app/api/chat/messages/route.ts`)**
- `GET`: Ambil pesan berdasarkan `reportId` dari PostgreSQL, urutkan `timestamp: 'asc'`.
- `POST`: Simpan pesan baru ke PostgreSQL via `prisma.message.create`, lalu pancarkan:
  - `chatEmitter.emit(`chat:${reportId}`, createdMessage)`
  - Jika `sender === 'student'`, pancarkan juga notifikasi:
    `chatEmitter.emit('counselor-notification', { reportId, senderName, content, timestamp })`

- [ ] **Step 3: Buat SSE stream handler untuk obrolan laporan (`src/app/api/chat/stream/route.ts`)**
Implementasikan `ReadableStream` dengan header `text/event-stream`, `Cache-Control: no-cache`, dan `Connection: keep-alive`. Kirim pesan baru ke client segera saat event `chat:${reportId}` diterima.

- [ ] **Step 4: Buat SSE stream notifikasi global untuk Guru BK (`src/app/api/counselor/notifications/stream/route.ts`)**
Mengalirkan event `counselor-notification` secara real-time ke semua peramban Guru BK yang sedang membuka aplikasi.

- [ ] **Step 5: Verifikasi API endpoint secara lokal**
Test dengan curl untuk memastikan GET `/api/chat/messages?reportId=RS-2026-0412` mengembalikan array pesan dengan kode 200 OK.

- [ ] **Step 6: Commit task 2**
```bash
git add src/lib/chatEmitter.ts src/app/api/chat/ src/app/api/counselor/
git commit -m "feat(api): implement realtime sse streaming and message handlers"
```

---

### Task 3: Client Real-Time Hook & Audio Chime Utility

**Files:**
- Create: `src/hooks/useRealtimeChat.ts`
- Create: `src/lib/audioNotification.ts`

**Interfaces:**
- Produces: 
  - `useRealtimeChat(reportId)`: `{ messages, isConnected, isSending, error, sendMessage }`
  - `playNotificationChime()`: Web Audio API sound generator

- [ ] **Step 1: Buat utility audio chime (`src/lib/audioNotification.ts`)**
Menggunakan Web Audio API native:
```typescript
export function playNotificationChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    
    // Nada 1: 523.25 Hz (C5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.35);

    // Nada 2: 659.25 Hz (E5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
    gain2.gain.setValueAtTime(0.14, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.55);
  } catch {
    // Abaikan jika browser membatasi autoplay
  }
}
```

- [ ] **Step 2: Buat hook `useRealtimeChat` (`src/hooks/useRealtimeChat.ts`)**
- Fetch riwayat awal dari `/api/chat/messages?reportId=...`
- Buka `EventSource('/api/chat/stream?reportId=...')`
- Handler `onmessage`: parse pesan, append ke daftar pesan jika belum ada (id deduplication).
- Fungsi `sendMessage(content, sender, senderName)`: POST ke `/api/chat/messages`.
- Auto-reconnection logic saat EventSource error.

- [ ] **Step 3: Commit task 3**
```bash
git add src/hooks/useRealtimeChat.ts src/lib/audioNotification.ts
git commit -m "feat(client): add useRealtimeChat hook and web audio chime"
```

---

### Task 4: Komponen Notifikasi Real-time Guru BK

**Files:**
- Create: `src/components/CounselorNotificationToast.tsx`
- Modify: `src/components/AppLayoutWrapper.tsx`

**Interfaces:**
- Consumes: `useAuth` dari `@/lib/authContext`, `playNotificationChime` dari `@/lib/audioNotification`
- Produces: In-App toast notification yang melayang di pojok kanan atas layar dengan tombol navigasi instan ke laporan.

- [ ] **Step 1: Buat komponen `CounselorNotificationToast.tsx`**
- Hubungkan ke `/api/counselor/notifications/stream` via `EventSource` hanya jika `currentUser.role === 'counselor'`.
- Saat menerima notifikasi:
  - Mainkan `playNotificationChime()`.
  - Tampilkan toast bergaya Dribbble (kartu putih berbayang halus, badge `#E02B2B`, avatar inisial pelapor, cuplikan pesan 2 baris, dan tombol "Buka Kasus").
  - Auto-dismiss setelah 8 detik atau tombol "X" diklik.
  - Klik "Buka Kasus" mengarahkan guru BK langsung ke `/counselor?reportId=[ID]`.

- [ ] **Step 2: Pasang komponen di `src/components/AppLayoutWrapper.tsx`**
Tambahkan `<CounselorNotificationToast />` di dalam wrapper utama agar aktif secara global di seluruh halaman saat Guru BK login.

- [ ] **Step 3: Commit task 4**
```bash
git add src/components/CounselorNotificationToast.tsx src/components/AppLayoutWrapper.tsx
git commit -m "feat(counselor): add realtime in-app notification toast and chime for incoming student messages"
```

---

### Task 5: Integrasi UI Chat pada Halaman Siswa & Guru BK

**Files:**
- Modify: `src/app/my-reports/page.tsx`
- Modify: `src/app/counselor/page.tsx`
- Modify: `src/lib/store.ts` (sinkronisasi fallback)

**Interfaces:**
- Mengganti pemanggilan lokal `RuangSuaraStore.addReportMessage()` dengan `useRealtimeChat` terintegrasi PostgreSQL.

- [ ] **Step 1: Perbarui Halaman Siswa (`src/app/my-reports/page.tsx`)**
- Pasang hook `useRealtimeChat(selectedReport?.id)`.
- Hubungkan textarea chat dan submit handler ke `sendMessage`.
- Tambahkan status indikator visual (*Live Terhubung* / *Kanal Aman*).
- Auto-scroll pesan obrolan ke bawah setiap ada pesan baru.

- [ ] **Step 2: Perbarui Halaman Guru BK (`src/app/counselor/page.tsx`)**
- Pasang hook `useRealtimeChat(selectedReport?.id)` pada panel obrolan kanan.
- Hubungkan input balasan konselor ke `sendMessage`.
- Ketika siswa mengirim pesan, pesan langsung tampil di panel Guru BK secara real-time tanpa perlu klik tombol refresh.

- [ ] **Step 3: Dukungan query param `?reportId=[ID]` pada dashboard Guru BK**
Pastikan jika guru BK mengklik notifikasi toast, dashboard otomatis membuka dan memilih laporan yang bersangkutan.

- [ ] **Step 4: Commit task 5**
```bash
git add src/app/my-reports/page.tsx src/app/counselor/page.tsx src/lib/store.ts
git commit -m "feat(ui): integrate realtime chat in student my-reports and counselor dashboard"
```

---

### Task 6: Verifikasi End-to-End & Uji Coba Multi-Client

**Files:**
- Test check across the entire application.

- [ ] **Step 1: Jalankan `npm run build`**
Pastikan tidak ada error kompilasi Next.js 14, TypeScript check, atau lint failure.

- [ ] **Step 2: Pengujian Realtime Siswa -> Guru BK**
- Buka dua tab peramban (Tab A: Masuk sebagai Siswa Dimas Surya Pratama di `/my-reports`, Tab B: Masuk sebagai Guru BK di `/counselor`).
- Kirim pesan dari Tab A -> Periksa bahwa di Tab B pesan langsung muncul seketika, toast notifikasi muncul, dan audio chime berbunyi.

- [ ] **Step 3: Pengujian Realtime Guru BK -> Siswa**
- Balas pesan dari Tab B -> Periksa bahwa di Tab A pesan balasan Guru BK langsung muncul secara instan.

- [ ] **Step 4: Verifikasi Persistensi PostgreSQL**
Jalankan query `SELECT * FROM "Message" ORDER BY "timestamp" DESC LIMIT 5;` untuk memastikan pesan benar-benar tersimpan permanen di database PostgreSQL `relasi_db`.

- [ ] **Step 5: Final Git Commit**
```bash
git add -A
git commit -m "chore: complete realtime chat and postgresql integration"
```
