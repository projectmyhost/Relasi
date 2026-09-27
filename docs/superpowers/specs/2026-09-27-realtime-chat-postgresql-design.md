# Desain Arsitektur: Sistem Chat Real-time & Integrasi PostgreSQL (RELASI)

- **Tanggal**: 27 September 2026
- **Status**: Disetujui (Approved)
- **Topik**: Realtime Chat Guru BK & Murid + Persistensi Database PostgreSQL via Prisma ORM

---

## 1. Ringkasan Eksekutif & Tujuan

Sistem pelaporan dan bimbingan konseling **RELASI** memerlukan saluran komunikasi dua arah yang aman, rahasia, dan instan antara murid (pelapor) dan Guru Bimbingan Konseling (BK). 

Saat ini, sistem obrolan tersimpan pada `localStorage` per peramban, sehingga pesan yang dikirim murid tidak dapat langsung diterima di layar guru BK tanpa sinkronisasi server bersama.

Dokumen ini menetapkan arsitektur lengkap untuk:
1. Mengintegrasikan database **PostgreSQL** lokal (`relasi_db` pada `localhost:5432`) menggunakan **Prisma ORM**.
2. Mengembangkan mesin chat **Real-Time** berbasis **Server-Sent Events (SSE)** yang terintegrasi secara native di Next.js App Router (port 3000), tanpa memerlukan daemon WebSocket eksternal yang terpisah.
3. Menghubungkan antarmuka **Siswa** (`/my-reports`) dan antarmuka **Guru BK** (`/counselor`) agar setiap pesan yang dikirim langsung muncul secara instan di layar lawan bicara.

---

## 2. Arsitektur Database PostgreSQL & Prisma Schema

### 2.1 Konfigurasi Koneksi
- **Koneksi Database**: `DATABASE_URL="postgresql://postgres@localhost:5432/relasi_db?schema=public"`
- **ORM**: Prisma Client v5.x
- **Lokasi Skema**: `prisma/schema.prisma`

### 2.2 Skema Data (Prisma Models)

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

### 2.3 Seeding Database (`prisma/seed.ts`)
Memindahkan seluruh master data laporan awal (`RS-2026-0412`, `RS-2026-0415`, `RS-2026-0419`, `RS-2026-0422`), berkas kasus (`CASE-2026-001`), serta akun default (Guru BK Ibu Siti Rahmawati, Siswa Dimas Surya Pratama, Super Admin) ke PostgreSQL sehingga aplikasi siap digunakan tanpa kehilangan histori pengujian.

---

## 3. Mesin Real-Time Chat (Server-Sent Events / SSE)

### 3.1 Diagram Alir Pesan

```
[ Siswa / My-Reports ]           [ Next.js API (Port 3000) ]           [ PostgreSQL (5432) ]           [ Guru BK / Counselor ]
         |                                    |                                  |                               |
         | --- 1. POST /api/chat/messages --> |                                  |                               |
         |    (reportId, sender, content)     | --- 2. prisma.message.create --> |                               |
         |                                    | <------- 3. Saved OK ----------- |                               |
         |                                    |                                                                  |
         |                                    | --- 4. EventBus.emit(reportId, message) ------------------------> |
         |                                    |    (via SSE GET /api/chat/stream?reportId=...)                   |
         | <--- 5. Immediate UI Delivery ---- |                                                                  |
```

### 3.2 Modul In-Memory Hub (`src/lib/chatEmitter.ts`)
Menggunakan instance `EventEmitter` global singleton pada runtime Node.js Next.js untuk menyiarkan pesan baru ke semua client aktif yang terhubung pada saluran `reportId` terkait:
- `chatEmitter.emit(`chat:${reportId}`, message)`
- `chatEmitter.on(`chat:${reportId}`, handler)`

### 3.3 Endpoint API
1. **`GET /api/chat/messages?reportId=[ID]`**:
   Mengambil riwayat obrolan lengkap yang diurutkan berdasarkan waktu pembuatan (`timestamp: asc`).
2. **`POST /api/chat/messages`**:
   Menerima payload JSON `{ reportId, sender, senderName, content }`. Memvalidasi teks, menyimpan ke tabel `Message` PostgreSQL, mencatat ke `AuditLog`, lalu memancarkan event ke emitter.
3. **`GET /api/chat/stream?reportId=[ID]`**:
   Menginisialisasi koneksi `ReadableStream` dengan format `text/event-stream`. Mengirimkan heartbeat (`:keep-alive\n\n`) setiap 15 detik dan mengirim data pesan `data: JSON.stringify(msg)\n\n` begitu event terpancar.

---

## 4. Integrasi Frontend Komponen

### 4.1 Custom Hook: `useRealtimeChat` (`src/hooks/useRealtimeChat.ts`)
- Menerima `reportId`.
- Melakukan pengambilan awal (initial fetch) riwayat pesan dari `/api/chat/messages`.
- Membuka koneksi `new EventSource('/api/chat/stream?reportId=...')`.
- Mengelola state status koneksi: `'connecting' | 'connected' | 'disconnected'`.
- Menyediakan fungsi `sendMessage(content: string, sender: string, senderName: string)`.
- Mengimplementasikan auto-reconnection jika koneksi jaringan terputus.

### 4.2 Sisi Siswa ([src/app/my-reports/page.tsx](file:///c:/laragon/www/18September2026/src/app/my-reports/page.tsx))
- Menggantikan penulisan pesan lokal dengan `useRealtimeChat(selectedReport.id)`.
- Menampilkan indikator status koneksi hijau (*Kanal Terenkripsi Aktif*).
- Ketika Guru BK mengirim balasan, balon obrolan baru langsung muncul secara otomatis disertai scroll halus ke baris paling bawah.

### 4.3 Sisi Guru BK ([src/app/counselor/page.tsx](file:///c:/laragon/www/18September2026/src/app/counselor/page.tsx))
- Mengintegrasikan obrolan di panel kanan dengan `useRealtimeChat(selectedReport.id)`.
- Pesan klarifikasi dari murid langsung muncul di layar tanpa guru BK perlu berpindah halaman atau merefresh peramban.

---

## 5. Keamanan & Anonimitas

1. **Proteksi Akses Saluran**:
   Setiap pertukaran pesan terikat pada `reportId`. Siswa hanya memiliki akses ke pesan laporannya sendiri melalui sesi login atau verifikasi token PIN.
2. **Anonimitas Siswa**:
   Jika laporan berstatus `isAnonymous: true`, backend secara otomatis menjaga `senderName` tetap menggunakan alias aman seperti *"Pelapor (Anonim)"* saat ditampilkan ke konselor.
3. **Penyimpanan Terverifikasi**:
   Setiap interaksi disimpan permanen di tabel PostgreSQL `Message` dengan foreign key berindeks ke `Report`.

---

## 6. Rencana Pengujian & Verifikasi

1. **Verifikasi Database**:
   - `npx prisma db push` berhasil mengeksekusi migrasi ke `relasi_db`.
   - `npx prisma db seed` berhasil mengisi tabel `Report`, `Message`, `User`, `CaseDossier`.
2. **Verifikasi REST API**:
   - `POST /api/chat/messages` mengembalikan HTTP `201 Created` dan data tersimpan di PostgreSQL.
   - `GET /api/chat/messages?reportId=RS-2026-0412` mengembalikan seluruh pesan terurut.
3. **Verifikasi Real-Time Streaming**:
   - Buka dua sesi peramban berdampingan (Siswa di `/my-reports` dan Guru BK di `/counselor`).
   - Kirim pesan dari Siswa -> verifikasi pesan langsung muncul seketika di panel Guru BK tanpa reload.
   - Kirim balasan dari Guru BK -> verifikasi pesan langsung diterima di layar Siswa secara instan.
4. **Verifikasi Build**:
   - Menjalankan `npm run build` untuk menjamin tidak ada regresi TypeScript atau error SSR.
