import { PrismaClient, UserRole, ReporterRole, UrgencyLevel, ReportCategory, ReportStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PostgreSQL database relasi_db...');

  // 1. Users
  const users = [
    {
      id: 'usr-student-1',
      name: 'Dimas Surya Pratama',
      email: 'murid@gmail.com',
      role: UserRole.student,
      roleLabel: 'Siswa (Pelapor Terdaftar)',
      departmentOrClass: 'XI MIPA 2',
    },
    {
      id: 'usr-bk-1',
      name: 'Ibu Siti Rahmawati, S.Psi., M.Pd.',
      email: 'guru@gmail.com',
      role: UserRole.counselor,
      roleLabel: 'Guru Bimbingan Konseling (BK)',
      departmentOrClass: 'Koordinator Unit BK & Tim PPKSP',
    },
    {
      id: 'usr-admin-1',
      name: 'Administrator Super Panel',
      email: 'admin@gmail.com',
      role: UserRole.super_admin,
      roleLabel: 'Super Admin Website & Sistem',
      departmentOrClass: 'Tata Kelola IT & Infrastruktur Satuan Pendidikan',
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }

  // 2. Case Dossier
  const case1 = await prisma.caseDossier.upsert({
    where: { id: 'CASE-2026-001' },
    update: {
      title: 'Dugaan Intimidasi Fisik & Pemalakan Berulang Koridor Belakang Kelas IX',
      summary: 'Konsolidasi 3 laporan terpisah mengenai pola intimidasi dan pemerasan uang saku di area koridor belakang kelas IX dan tangga gedung timur yang melibatkan terduga siswa berinisial R.',
      status: 'under_investigation',
      location: 'Koridor Belakang Kelas IX-B & Tangga Gedung Timur',
      partiesInvolved: [
        'Terduga Pelaku: Siswa R (Kelas IX-D)',
        'Terduga Rekan Pelaku: Siswa F & D',
        'Korban 1: Siswa Anonim (RS-2026-0412)',
        'Saksi Terbuka: Dimas Surya Pratama (XI MIPA 2)',
      ],
      leadCounselor: 'Ibu Siti Rahmawati, S.Psi., M.Pd.',
    },
    create: {
      id: 'CASE-2026-001',
      title: 'Dugaan Intimidasi Fisik & Pemalakan Berulang Koridor Belakang Kelas IX',
      summary: 'Konsolidasi 3 laporan terpisah mengenai pola intimidasi dan pemerasan uang saku di area koridor belakang kelas IX dan tangga gedung timur yang melibatkan terduga siswa berinisial R.',
      status: 'under_investigation',
      location: 'Koridor Belakang Kelas IX-B & Tangga Gedung Timur',
      partiesInvolved: [
        'Terduga Pelaku: Siswa R (Kelas IX-D)',
        'Terduga Rekan Pelaku: Siswa F & D',
        'Korban 1: Siswa Anonim (RS-2026-0412)',
        'Saksi Terbuka: Dimas Surya Pratama (XI MIPA 2)',
      ],
      leadCounselor: 'Ibu Siti Rahmawati, S.Psi., M.Pd.',
    },
  });

  // 3. Reports
  const reports = [
    {
      id: 'RS-2026-0412',
      pin: '491823',
      role: ReporterRole.victim,
      isAnonymous: true,
      incidentDate: '2026-09-17',
      incidentTime: '10:15 WIB (Istirahat Pertama)',
      location: 'Lorong Belakang Kelas IX-B',
      partiesInvolved: 'Siswa kelas IX berinisial R dan 2 temannya',
      description: 'Kemarin waktu istirahat pertama saya dipukul di belakang kelas IX-B. Mereka memojokkan saya di dekat loker rusak dan meminta uang saku Rp 50.000 secara paksa. Saat saya menolak, bahu dan lengan kiri saya didorong keras ke dinding hingga memar.',
      urgency: UrgencyLevel.urgent,
      category: ReportCategory.fisik,
      status: ReportStatus.investigating,
      caseId: 'CASE-2026-001',
      messages: [
        {
          id: 'msg-1',
          sender: 'counselor',
          senderName: 'Guru BK (Ibu Siti Rahmawati)',
          content: 'Halo, terima kasih atas keberanianmu melapor. Kami telah menerima laporanmu dan saat ini sedang memeriksa rekaman CCTV koridor. Bisakah kamu menjelaskan apakah saat kejadian ada siswa lain yang melintas?',
          timestamp: new Date('2026-09-17T13:00:00Z'),
          isRead: true,
        },
        {
          id: 'msg-2',
          sender: 'student',
          senderName: 'Pelapor (Anonim)',
          content: 'Ada beberapa anak kelas VIII yang sempat lewat hendak ke toilet, tapi mereka langsung lari karena takut pada R.',
          timestamp: new Date('2026-09-17T13:45:00Z'),
          isRead: true,
        },
      ],
    },
    {
      id: 'RS-2026-0415',
      pin: '318592',
      role: ReporterRole.witness,
      isAnonymous: true,
      incidentDate: '2026-09-17',
      incidentTime: '10:20 WIB (Istirahat Pertama)',
      location: 'Koridor Belakang Kelas IX',
      partiesInvolved: 'Siswa R (seragam dikeluarkan) dan seorang anak bertubuh kecil',
      description: 'Saya melihat siswa tersebut mendorong lalu memukul siswa lain di koridor belakang kelas. Korban tampak ketakutan dan menyerahkan uang kertas dari sakunya. Saya tidak berani mendekat karena mereka beramai-ramai.',
      urgency: UrgencyLevel.normal,
      category: ReportCategory.fisik,
      status: ReportStatus.investigating,
      caseId: 'CASE-2026-001',
      messages: [
        {
          id: 'msg-w-1',
          sender: 'counselor',
          senderName: 'Guru BK (Bpk. Ahmad Fauzi)',
          content: 'Terima kasih atas laporan saksi ini. Kesaksianmu sangat berharga dan identitasmu terjamin aman 100%. Apakah kamu mengenali salah satu teman yang bersama siswa R?',
          timestamp: new Date('2026-09-17T14:15:00Z'),
          isRead: true,
        },
      ],
    },
    {
      id: 'RS-2026-0419',
      pin: '829104',
      role: ReporterRole.witness,
      isAnonymous: false,
      reporterName: 'Dimas Surya Pratama',
      reporterClass: 'XI MIPA 2',
      reporterContact: '0812-9847-2291',
      incidentDate: '2026-09-11',
      incidentTime: '12:45 WIB (Setelah Sholat Dzuhur)',
      location: 'Tangga Belakang Gedung Timur dekat Kantin',
      partiesInvolved: 'Kelompok siswa yang sering nongkrong di area loker belakang',
      description: 'Saya melihat kejadian yang mirip minggu lalu. Ada pemalakan berulang di tangga belakang gedung timur. Mereka menahan adik kelas dan meminta uang parkir/jajan. Kejadian ini sudah beberapa kali terjadi.',
      urgency: UrgencyLevel.normal,
      category: ReportCategory.pemalakan,
      status: ReportStatus.reviewed,
      caseId: 'CASE-2026-001',
      messages: [],
    },
    {
      id: 'RS-2026-0422',
      pin: '119482',
      role: ReporterRole.victim,
      isAnonymous: false,
      reporterName: 'Larasati Putri Ayu',
      reporterClass: 'X-E3',
      reporterContact: '0857-1123-9900',
      incidentDate: '2026-09-18',
      incidentTime: '19:30 WIB (Daring/Malam)',
      location: 'Grup WhatsApp Angkatan & Instagram Story',
      partiesInvolved: 'Akun anonim @shadow_truth_99',
      description: 'Saya terus menerima pesan intimidasi dan ejekan di grup WhatsApp dan direct message. Akun anonim tersebut mengancam akan menyebarkan foto editan wajah saya jika saya tidak menuruti perkataannya. Saya merasa sangat cemas untuk masuk sekolah besok.',
      urgency: UrgencyLevel.urgent,
      category: ReportCategory.cyber,
      status: ReportStatus.submitted,
      caseId: null,
      messages: [],
    },
    {
      id: 'RS-2026-0430',
      pin: '550291',
      role: ReporterRole.witness,
      isAnonymous: true,
      incidentDate: '2026-09-16',
      incidentTime: '11:00 WIB (Pergantian Jam Pelajaran)',
      location: 'Laboratorium Biologi Lantai 2',
      partiesInvolved: '3 siswi kelas XI IPS',
      description: 'Ejekan verbal dan pengucilan secara terus-menerus terhadap salah satu siswi yang duduk di pojok. Barang-barang miliknya disembunyikan di atas ventilasi lemari lab dan korban menangis sendirian.',
      urgency: UrgencyLevel.normal,
      category: ReportCategory.relasional,
      status: ReportStatus.submitted,
      caseId: null,
      messages: [],
    },
  ];

  for (const r of reports) {
    const { messages, ...reportData } = r;
    await prisma.report.upsert({
      where: { id: reportData.id },
      update: reportData,
      create: reportData,
    });

    if (messages && messages.length > 0) {
      for (const m of messages) {
        await prisma.message.upsert({
          where: { id: m.id },
          update: {
            content: m.content,
            sender: m.sender,
            senderName: m.senderName,
            isRead: m.isRead,
            timestamp: m.timestamp,
          },
          create: {
            id: m.id,
            reportId: reportData.id,
            content: m.content,
            sender: m.sender,
            senderName: m.senderName,
            isRead: m.isRead,
            timestamp: m.timestamp,
          },
        });
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
