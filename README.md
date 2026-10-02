# RELASI — Sistem Pelaporan Mandiri & Perlindungan Siswa

> **Platform Tata Kelola Pencegahan & Penanganan Kekerasan di Satuan Pendidikan (PPKSP)**  
> Berstandar resmi **Permendikbudristek No. 46 Tahun 2023** dan Kode Etik Bimbingan Konseling (ABKIN).

---

## 🌟 Ringkasan Platform

**RELASI** adalah platform pelaporan insiden ramah anak yang dirancang untuk menjamin keamanan psikologis siswa pelapor, kecepatan tindak lanjut Guru Bimbingan Konseling (BK), serta akuntabilitas tata kelola sistem bagi Satuan Tugas PPKSP sekolah.

### Fitur Utama:
1. **AI Triage & Urgensi Otomatis**: Analisis otomatis tingkat urgensi laporan (Normal vs Urgent), klasifikasi bentuk kekerasan, dan rekomendasi respons awal menggunakan model AI **Meta Llama 3.2 via NVIDIA NIM API**.
2. **Real-time Closed Counseling Chat**: Komunikasi tertutup privat antara siswa pemilik berkas dan Guru BK dengan status *Live Terhubung*, centang terkirim/dilihat (*read receipts*), indikator mengetik, proteksi anti-spam, dan **lampiran bukti foto/gambar langsung**.
3. **Real-time Account Suspension Guard**: Fitur Super Admin untuk menonaktifkan atau mengaktifkan akun pengguna secara instan melalui Server-Sent Events (SSE) tanpa perlu refresh/reload halaman.
4. **Enkripsi PIN & Perlindungan Anonim**: Pelapor dapat melapor secara anonim tanpa membuka data diri dan memantau perkembangan berkas menggunakan kode PIN unik 6-digit.
5. **Dossier Kasus & Pola Sinyal Kejadian**: Membantu Guru BK mengonsolidasikan laporan terpisah menjadi berkas investigasi terpadu.

---

## 🚀 Panduan Instalasi & Menjalankan Proyek (Untuk Kolaborator)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di perangkat lokal Anda:

### 1. Prasyarat
- **Node.js**: Versi 18.x atau 20.x
- **PostgreSQL**: Pastikan layanan PostgreSQL telah aktif di komputer Anda (misalnya via Laragon, Docker, atau PostgreSQL Service lokal).

### 2. Clone Repository & Install Dependensi
```bash
git clone <url-repository-anda>
cd 18September2026
npm install
```

### 3. Konfigurasi Environment (`.env`)
Salin berkas `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan nilai `DATABASE_URL` dengan kredensial PostgreSQL lokal Anda:
```env
DATABASE_URL="postgresql://postgres:password_anda@localhost:5432/relasi_db?schema=public"
NVIDIA_API_KEY="your_nvidia_api_key_here"
```
*(Catatan: Pastikan database `relasi_db` telah dibuat di PostgreSQL).*

### 4. Sinkronisasi Skema Database & Data Awal (Seeding)
Jalankan perintah berikut untuk membuat seluruh tabel database dan mengisinya dengan data awal:
```bash
# Sinkronkan skema prisma ke PostgreSQL
npm run db:push

# Isi data awal (Akun default, sampel laporan, dan kasus konseling)
npm run db:seed
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Buka browser Anda di: **[http://localhost:3000](http://localhost:3000)**

---

## 👥 Akun Pengguna Bawaan (Untuk Pengujian & Demo)

Sistem telah dilengkapi akun bawaan pada database PostgreSQL:

| Peran (Role) | Email | Nama Pengguna | Akses Halaman |
| :--- | :--- | :--- | :--- |
| **Siswa (Pelapor)** | `murid@gmail.com` | Dimas Surya Pratama | `/my-reports` & `/report` |
| **Guru BK / Satgas** | `guru@gmail.com` | Ibu Siti Rahmawati, S.Psi., M.Pd. | `/counselor` |
| **Super Admin** | `admin@gmail.com` | Administrator Super Panel | `/admin/super` |

---

## 📁 Struktur Direktori Bersih

```
├── prisma/
│   ├── schema.prisma       # Skema database PostgreSQL
│   └── seed.ts             # Script seeding data awal
├── public/
│   ├── assets/             # Aset styling dan library statis
│   └── uploads/chat/       # Direktori penyimpanan bukti foto chat
├── src/
│   ├── app/
│   │   ├── admin/super/    # Panel Tata Kelola Super Admin
│   │   ├── api/            # API Endpoints (Chat, AI, Users, Reports, SSE)
│   │   ├── counselor/      # Dashboard Guru BK & Manajemen Kasus
│   │   ├── my-reports/     # Portal Pantau Laporan & Chat Siswa
│   │   ├── report/         # Formulir Pelaporan & AI Triage
│   │   ├── track/          # Pelacakan Laporan dengan Kode PIN
│   │   ├── login/          # Halaman Masuk Akun
│   │   ├── register/       # Formulir Pendaftaran Siswa Baru
│   │   └── page.tsx        # Beranda Utama Edukatif RELASI
│   ├── components/         # Komponen UI Reusable & Real-time Watchers
│   ├── hooks/              # Custom React Hooks (Real-time Chat, dsb.)
│   └── lib/                # Prisma Client, Auth Context, EventEmitter
```

---

## 🛡️ Standar Kepatuhan Hukum & Etika
- **Permendikbudristek No. 46 Tahun 2023**: Pencegahan & Penanganan Kekerasan di Lingkungan Satuan Pendidikan.
- **UU Perlindungan Anak No. 35 Tahun 2014**: Penjaminan kerahasiaan identitas saksi dan korban anak.
- **Kode Etik Asosiasi Bimbingan dan Konseling Indonesia (ABKIN)**.
