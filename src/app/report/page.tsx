'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  EyeOff, 
  User, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Users, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  Info,
  Lock,
  Calendar,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { RuangSuaraStore } from '@/lib/store';
import { ReporterRole, ReportCategory, UrgencyLevel } from '@/lib/types';
import { useAuth } from '@/lib/authContext';

export default function ReportPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [role, setRole] = useState<ReporterRole>('victim');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('');
  const [reporterClass, setReporterClass] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState('10:15 WIB (Jam Istirahat)');
  const [location, setLocation] = useState('');
  const [partiesInvolved, setPartiesInvolved] = useState('');
  const [category, setCategory] = useState<ReportCategory>('fisik');
  const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
  const [description, setDescription] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; pin: string } | null>(null);
  const [copiedPin, setCopiedPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) {
      alert('Mohon lengkapi lokasi dan kronologi kejadian.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const reportPayload = {
        role,
        isAnonymous,
        userId: currentUser.id || undefined,
        userEmail: currentUser.email || undefined,
        reporterName: isAnonymous ? undefined : (reporterName || (currentUser.role === 'student' ? currentUser.name : undefined)),
        reporterClass: isAnonymous ? undefined : (reporterClass || (currentUser.role === 'student' ? currentUser.departmentOrClass : undefined)),
        reporterContact: isAnonymous ? undefined : (reporterContact || (currentUser.role === 'student' ? currentUser.email : undefined)),
        incidentDate,
        incidentTime,
        location,
        partiesInvolved,
        category,
        urgency,
        description,
      };

      const created = RuangSuaraStore.submitReport(reportPayload);

      // Persist directly to PostgreSQL database
      fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reportPayload,
          id: created.id,
          pin: created.pin,
        }),
      }).catch((err) => console.error('Failed to sync report to PostgreSQL:', err));

      setSubmittedData({ id: created.id, pin: created.pin });
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  const handleCopyPin = () => {
    if (submittedData) {
      navigator.clipboard.writeText(`ID: ${submittedData.id} | PIN: ${submittedData.pin}`);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] py-8 sm:py-14 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-300 shadow-xs text-slate-700 text-xs font-medium tracking-wide">
            <Shield className="w-3.5 h-3.5 text-[#E02B2B]" />
            <span>Kanal Pelaporan Siswa Terenkripsi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-950 tracking-tight leading-[1.2]">
            Formulir Pelaporan <span className="text-[#E02B2B]">Perundungan</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Laporkan kejadian yang Anda alami atau saksikan secara aman. Anda memiliki kendali penuh apakah ingin mengirimkan secara anonim dengan proteksi PIN atau mencantumkan identitas untuk pendampingan langsung oleh Guru BK.
          </p>
        </div>

        {/* Modal / Card Sukses Pengiriman (Aesthetic Voucher Style) */}
        {submittedData ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-300 shadow-md text-center space-y-8 animate-fade-in max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-medium text-slate-950 tracking-tight">
                Laporan Anda <span className="text-emerald-700">Berhasil Disimpan</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Terima kasih telah berani bersuara. Laporan Anda telah tersimpan secara terenkripsi dan langsung diteruskan ke ruang privat kerja Guru BK.
              </p>
            </div>

            {/* Secret PIN Voucher Card */}
            <div className="p-6 sm:p-8 bg-[#F6F4F0] rounded-2xl border border-slate-300 shadow-xs space-y-5 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-300">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Nomor Tiket Laporan</span>
                  <span className="text-base font-medium text-slate-900 font-mono">{submittedData.id}</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 font-medium border border-emerald-200">
                  Tersimpan Privat
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-medium block mb-1">PIN Rahasia Pelacakan Anda</span>
                <div className="bg-white rounded-2xl p-4 border border-slate-300 flex items-center justify-between shadow-2xs">
                  <span className="text-2xl sm:text-3xl font-medium text-slate-950 font-mono tracking-[0.25em]">
                    {submittedData.pin}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPin}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {copiedPin ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin PIN</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-medium">Simpan PIN ini baik-baik!</strong> PIN adalah kunci rahasia untuk membuka percakapan klarifikasi dua arah dengan Guru BK tanpa perlu membuka identitas Anda.
                </p>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {currentUser.role === 'student' ? (
                <Link
                  href="/my-reports"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-medium text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buka Riwayat Laporan Saya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : currentUser.role === 'counselor' ? (
                <Link
                  href="/counselor/cases"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-medium text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buka Daftar Kasus BK</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#E02B2B] hover:bg-[#c92424] text-white font-medium text-sm shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <User className="w-4 h-4" />
                  <span>Masuk Akun Siswa</span>
                </Link>
              )}
              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-800 border border-stone-200 font-medium text-sm transition text-center cursor-pointer active:scale-[0.99]"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-300 shadow-md space-y-10"
          >
            {/* Bagian 1: Peran & Opsi Anonimitas */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#E02B2B] text-white text-xs font-medium flex items-center justify-center shrink-0 -translate-y-[1.5px] select-none shadow-xs">
                  1
                </span>
                <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight m-0 p-0 leading-none">
                  Peran Pelapor &amp; Kerahasiaan Identitas
                </h2>
              </div>

              {/* Pilihan Korban vs Saksi Mata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setRole('victim')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    role === 'victim' 
                      ? 'border-[#E02B2B] bg-red-50/40 shadow-xs' 
                      : 'border-slate-300 hover:border-slate-400 bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-slate-900">Saya adalah Korban</span>
                    <input 
                      type="radio" 
                      name="reporter_role" 
                      checked={role === 'victim'} 
                      onChange={() => setRole('victim')} 
                      className="text-[#E02B2B] focus:ring-[#E02B2B] w-4 h-4 accent-[#E02B2B]"
                    />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Saya mengalami perlakuan tidak menyenangkan, ancaman, atau intimidasi secara langsung.
                  </p>
                </div>

                <div 
                  onClick={() => setRole('witness')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    role === 'witness' 
                      ? 'border-[#E02B2B] bg-red-50/40 shadow-xs' 
                      : 'border-slate-300 hover:border-slate-400 bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-slate-900">Saya adalah Saksi Mata</span>
                    <input 
                      type="radio" 
                      name="reporter_role" 
                      checked={role === 'witness'} 
                      onChange={() => setRole('witness')} 
                      className="text-[#E02B2B] focus:ring-[#E02B2B] w-4 h-4 accent-[#E02B2B]"
                    />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Saya melihat atau mengetahui kejadian perundungan yang menimpa siswa lain di sekolah.
                  </p>
                </div>
              </div>

              {/* Opsi Anonimitas Toggle */}
              <div className="p-5 rounded-2xl bg-[#F6F4F0] border-2 border-slate-300 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-[#E02B2B]" />
                      <span className="text-sm font-medium text-slate-900">Kirim Secara Anonim (Direkomendasikan)</span>
                    </div>
                    <p className="text-xs text-slate-600 font-normal">
                      Nama dan kontak Anda tidak disimpan di server. Sistem memberikan Report ID &amp; PIN unik untuk pelacakan.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input 
                      type="checkbox" 
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E02B2B]"></div>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-200 animate-fade-in">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1.5">Nama Lengkap *</label>
                      <input
                        type="text"
                        required
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="Contoh: Dimas Surya"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1.5">Kelas *</label>
                      <input
                        type="text"
                        required
                        value={reporterClass}
                        onChange={(e) => setReporterClass(e.target.value)}
                        placeholder="Contoh: XI MIPA 2"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1.5">No. WhatsApp / Kontak</label>
                      <input
                        type="text"
                        value={reporterContact}
                        onChange={(e) => setReporterContact(e.target.value)}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bagian 2: Waktu, Lokasi & Pihak Terlibat */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#E02B2B] text-white text-xs font-medium flex items-center justify-center shrink-0 -translate-y-[1.5px] select-none shadow-xs">
                  2
                </span>
                <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight m-0 p-0 leading-none">
                  Waktu, Lokasi &amp; Pihak yang Terlibat
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Tanggal Kejadian *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Perkiraan Jam / Waktu *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={incidentTime}
                    onChange={(e) => setIncidentTime(e.target.value)}
                    placeholder="Contoh: Jam 10:15 WIB (Istirahat Pertama)"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Lokasi Spesifik Kejadian *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Belakang gedung lab kimia, Kantin pojok"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Pihak yang Terlibat / Terduga</span>
                  </label>
                  <input
                    type="text"
                    value={partiesInvolved}
                    onChange={(e) => setPartiesInvolved(e.target.value)}
                    placeholder="Contoh: Inisial R dan 2 teman sekelasnya"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 3: Kategori & Tingkat Urgensi */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#E02B2B] text-white text-xs font-medium flex items-center justify-center shrink-0 -translate-y-[1.5px] select-none shadow-xs">
                  3
                </span>
                <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight m-0 p-0 leading-none">
                  Kategori Perundungan &amp; Urgensi
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Kategori Kejadian
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="fisik">Kekerasan Fisik (Pemukulan, Mendorong, Menahan)</option>
                    <option value="verbal">Kekerasan Verbal (Ejekan, Caci Maki, Merendahkan)</option>
                    <option value="relasional">Relasional / Sosial (Pengucilan, Menghasut Teman)</option>
                    <option value="cyber">Cyberbullying (Intimidasi Grup WA, Medsos)</option>
                    <option value="pemalakan">Pemalakan / Pemerasan (Uang Saku Paksa)</option>
                    <option value="lainnya">Bentuk Perundungan Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#E02B2B] shrink-0" />
                    <span>Tingkat Urgensi Respons</span>
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="normal">Normal (Dapat ditinjau dalam alur rutin BK)</option>
                    <option value="urgent">Urgent (Ada ancaman fisik / butuh pendampingan segera)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bagian 4: Kronologi Asli */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-[#E02B2B] text-white text-xs font-medium flex items-center justify-center shrink-0 -translate-y-[1.5px] select-none shadow-xs">
                  4
                </span>
                <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight m-0 p-0 leading-none">
                  Kronologi Kejadian Asli (Verbatim)
                </h2>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700 block">
                  Ceritakan Apa yang Sebenarnya Terjadi *
                </label>
                <textarea
                  rows={6}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan secara runtut apa yang terjadi, apa yang mereka katakan atau lakukan, siapa saja yang ada di sekitar tempat kejadian, dan apa yang Anda rasakan..."
                  className="w-full p-4 sm:p-5 text-xs sm:text-sm rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#E02B2B] focus:ring-4 focus:ring-red-500/10 leading-relaxed bg-white transition-all font-normal shadow-2xs"
                ></textarea>
                <span className="text-[11px] text-slate-500 block">
                  Prinsip sistem PPKSP: «Original report remains intact». Laporan asli Anda disimpan utuh tanpa diubah atau dipotong.
                </span>
              </div>
            </div>

            {/* Tombol Kirim Form */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Enkripsi privasi aktif. Data Anda dijaga sesuai Kode Etik ABKIN.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: '#E02B2B', color: '#ffffff' }}
                className="w-full sm:w-auto px-9 py-3.5 rounded-full !bg-[#E02B2B] hover:!bg-[#c92424] !text-white font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Menyimpan Laporan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirimkan Laporan Terenkripsi</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
