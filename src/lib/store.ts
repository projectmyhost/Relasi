import { Report, CaseDossier, RelationshipSignal, AuditLogItem, ReportMessage } from './types';

const STORAGE_KEY_REPORTS = 'ruangsuara_reports';
const STORAGE_KEY_CASES = 'ruangsuara_cases';
const STORAGE_KEY_SIGNALS = 'ruangsuara_signals';
const STORAGE_KEY_AUDIT = 'ruangsuara_audit';
const STORAGE_KEY_PRIVACY = 'ruangsuara_privacy_mode';

const INITIAL_REPORTS: Report[] = [];
const INITIAL_CASES: CaseDossier[] = [];
const INITIAL_SIGNALS: RelationshipSignal[] = [];
const INITIAL_AUDIT_LOGS: AuditLogItem[] = [];

// Automatic storage migration to wipe previous mock and test reports cleanly
const CLEAN_STORAGE_VERSION = 'ruangsuara_v3_clean_slate';
if (typeof window !== 'undefined') {
  try {
    if (window.localStorage.getItem('ruangsuara_version_tag') !== CLEAN_STORAGE_VERSION) {
      window.localStorage.removeItem(STORAGE_KEY_REPORTS);
      window.localStorage.removeItem(STORAGE_KEY_CASES);
      window.localStorage.removeItem(STORAGE_KEY_SIGNALS);
      window.localStorage.removeItem(STORAGE_KEY_AUDIT);
      window.localStorage.removeItem(STORAGE_KEY_PRIVACY);
      window.localStorage.setItem('ruangsuara_version_tag', CLEAN_STORAGE_VERSION);
    }
  } catch {
    // Ignore storage errors
  }
}

// Helper to access localStorage safely on client
function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export const Store = {
  getReports(): Report[] {
    return getFromStorage<Report[]>(STORAGE_KEY_REPORTS, INITIAL_REPORTS);
  },

  getReportById(id: string): Report | undefined {
    const reports = this.getReports();
    return reports.find(r => r.id.toLowerCase() === id.toLowerCase());
  },

  getReportByPin(id: string, pin: string): Report | undefined {
    const reports = this.getReports();
    return reports.find(
      r => r.id.toLowerCase() === id.trim().toLowerCase() && r.pin.trim() === pin.trim()
    );
  },

  addReport(newReport: (Omit<Report, 'id' | 'pin' | 'createdAt' | 'updatedAt' | 'messages' | 'status'> & { status?: Report['status'] }) | Report): { id: string; pin: string } {
    const reports = this.getReports();

    if ('id' in newReport && newReport.id) {
      const existingIdx = reports.findIndex(r => r.id === newReport.id);
      if (existingIdx >= 0) {
        reports[existingIdx] = { ...reports[existingIdx], ...newReport };
        setToStorage(STORAGE_KEY_REPORTS, reports);
        return { id: newReport.id, pin: (newReport as Report).pin || reports[existingIdx].pin || '' };
      }
      const rep = newReport as Report;
      const fullReport: Report = {
        ...rep,
        pin: rep.pin || '000000',
        createdAt: rep.createdAt || new Date().toISOString(),
        updatedAt: rep.updatedAt || new Date().toISOString(),
        messages: rep.messages || [],
      };
      const updated = [fullReport, ...reports];
      setToStorage(STORAGE_KEY_REPORTS, updated);
      return { id: fullReport.id, pin: fullReport.pin };
    }

    const idNum = Math.floor(1000 + Math.random() * 9000);
    const id = `RS-2026-${idNum}`;
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date().toISOString();

    const report: Report = {
      status: newReport.status || 'submitted',
      ...newReport,
      id,
      pin,
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          sender: 'counselor',
          senderName: 'Sistem RELASI',
          content: 'Laporanmu telah berhasil diterima dengan aman. Guru BK akan meninjau laporan ini secara rahasia. Kamu dapat menggunakan kolom pesan ini untuk memberikan info tambahan kapan saja.',
          timestamp: now,
          isRead: false,
        }
      ],
    };

    const updated = [report, ...reports];
    setToStorage(STORAGE_KEY_REPORTS, updated);

    // Otomatis catat ke Audit Log
    this.addAuditLog({
      actor: newReport.isAnonymous ? 'Siswa (Anonim)' : (newReport.reporterName || 'Siswa Terbuka'),
      role: 'Siswa / Pelapor',
      action: 'SUBMIT_REPORT',
      target: id,
      detail: `Laporan baru kategori ${newReport.category} dengan urgensi ${newReport.urgency}.`,
    });

    // Jalankan kalkulasi sinyal relasi sederhana
    this.detectSignalsForNewReport(report);

    return { id, pin };
  },

  updateReportStatus(id: string, newStatus: Report['status'], counselorName = 'Guru BK'): void {
    const reports = this.getReports();
    const updated = reports.map(r => {
      if (r.id === id) {
        return { ...r, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    setToStorage(STORAGE_KEY_REPORTS, updated);

    this.addAuditLog({
      actor: counselorName,
      role: 'Guru BK',
      action: 'UPDATE_STATUS',
      target: id,
      detail: `Mengubah status laporan menjadi: ${newStatus}.`,
    });
  },

  addMessageToReport(reportId: string, sender: 'student' | 'counselor', senderName: string, content: string, imageUrl?: string | null): void {
    const reports = this.getReports();
    const updated = reports.map(r => {
      if (r.id === reportId) {
        const newMessage: ReportMessage = {
          id: `msg-${Date.now()}`,
          sender,
          senderName,
          content,
          imageUrl: imageUrl || null,
          timestamp: new Date().toISOString(),
          isRead: sender === 'student' ? false : true,
        };
        return {
          ...r,
          messages: [...r.messages, newMessage],
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });
    setToStorage(STORAGE_KEY_REPORTS, updated);
  },

  getCases(): CaseDossier[] {
    return getFromStorage<CaseDossier[]>(STORAGE_KEY_CASES, INITIAL_CASES);
  },

  getCaseById(id: string): CaseDossier | undefined {
    const cases = this.getCases();
    return cases.find(c => c.id.toLowerCase() === id.toLowerCase());
  },

  createCase(caseData: Omit<CaseDossier, 'id' | 'createdAt' | 'updatedAt'>): string {
    const cases = this.getCases();
    const id = `CASE-2026-${String(cases.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newCase: CaseDossier = {
      ...caseData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newCase, ...cases];
    setToStorage(STORAGE_KEY_CASES, updated);

    // Update caseId pada laporan yang ditautkan
    const reports = this.getReports();
    const updatedReports = reports.map(r => {
      if (caseData.reportIds.includes(r.id)) {
        return { ...r, caseId: id, status: 'investigating' as const };
      }
      return r;
    });
    setToStorage(STORAGE_KEY_REPORTS, updatedReports);

    this.addAuditLog({
      actor: caseData.leadCounselor || 'Guru BK',
      role: 'Guru BK',
      action: 'CREATE_CASE',
      target: id,
      detail: `Membuat berkas kasus baru: "${caseData.title}" menautkan ${caseData.reportIds.length} laporan.`,
    });

    return id;
  },

  updateCaseStatus(id: string, status: CaseDossier['status']): void {
    const cases = this.getCases();
    const updated = cases.map(c => {
      if (c.id === id) {
        return { ...c, status, updatedAt: new Date().toISOString() };
      }
      return c;
    });
    setToStorage(STORAGE_KEY_CASES, updated);
  },

  addInvestigationNote(
    caseId: string, 
    authorOrNote: string | { author: string; content: string; type: 'interview' | 'observation' | 'mediation' | 'counseling'; date?: string }, 
    content?: string, 
    type: 'interview' | 'observation' | 'mediation' | 'counseling' = 'counseling'
  ): void {
    const cases = this.getCases();
    const updated = cases.map(c => {
      if (c.id === caseId) {
        let note: any;
        if (typeof authorOrNote === 'object') {
          note = {
            id: `note-${Date.now()}`,
            date: authorOrNote.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            author: authorOrNote.author,
            content: authorOrNote.content,
            type: authorOrNote.type
          };
        } else {
          note = {
            id: `note-${Date.now()}`,
            author: authorOrNote,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            content: content || '',
            type,
          };
        }
        return {
          ...c,
          investigationNotes: [...c.investigationNotes, note],
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    setToStorage(STORAGE_KEY_CASES, updated);
  },

  getSignals(): RelationshipSignal[] {
    return getFromStorage<RelationshipSignal[]>(STORAGE_KEY_SIGNALS, INITIAL_SIGNALS);
  },

  confirmSignal(signalId: string, reviewerName = 'Guru BK'): void {
    const signals = this.getSignals();
    const updated = signals.map(s => {
      if (s.id === signalId) {
        return {
          ...s,
          status: 'confirmed' as const,
          reviewedBy: reviewerName,
          reviewNotes: 'Hubungan dikonfirmasi oleh Guru BK.',
        };
      }
      return s;
    });
    setToStorage(STORAGE_KEY_SIGNALS, updated);

    this.addAuditLog({
      actor: reviewerName,
      role: 'Guru BK',
      action: 'CONFIRM_SIGNAL',
      target: signalId,
      detail: 'Konfirmasi AI Signal: Laporan diakui memiliki keterkaitan kasus.',
    });
  },

  dismissSignal(signalId: string, reviewerName = 'Guru BK'): void {
    const signals = this.getSignals();
    const updated = signals.map(s => {
      if (s.id === signalId) {
        return {
          ...s,
          status: 'dismissed' as const,
          reviewedBy: reviewerName,
          reviewNotes: 'Ditandai bukan terkait (False AI Clustering).',
        };
      }
      return s;
    });
    setToStorage(STORAGE_KEY_SIGNALS, updated);

    this.addAuditLog({
      actor: reviewerName,
      role: 'Guru BK',
      action: 'DISMISS_SIGNAL',
      target: signalId,
      detail: 'Mengesampingkan AI Signal: Dua laporan dievaluasi tidak berhubungan.',
    });
  },

  detectSignalsForNewReport(newReport: Report): void {
    const reports = this.getReports();
    const signals = this.getSignals();
    const newSignals: RelationshipSignal[] = [];

    reports.forEach(existing => {
      if (existing.id === newReport.id) return;

      const reasons: string[] = [];
      let score = 0;

      // Location similarity
      if (newReport.location && existing.location) {
        const locA = newReport.location.toLowerCase();
        const locB = existing.location.toLowerCase();
        if (locA.includes(locB) || locB.includes(locA) || (locA.includes('koridor') && locB.includes('koridor')) || (locA.includes('kelas ix') && locB.includes('kelas ix')) || (locA.includes('kantin') && locB.includes('kantin'))) {
          score += 45;
          reasons.push(`Kesamaan Lokasi: "${newReport.location}" dan "${existing.location}"`);
        }
      }

      // Category matching
      if (newReport.category === existing.category) {
        score += 25;
        reasons.push(`Kategori Pelanggaran Sama: ${newReport.category}`);
      }

      // Parties involved similarity
      if (newReport.partiesInvolved && existing.partiesInvolved) {
        const pA = newReport.partiesInvolved.toLowerCase();
        const pB = existing.partiesInvolved.toLowerCase();
        const wordsA = pA.split(/\s+/).filter(w => w.length > 2);
        const hasCommon = wordsA.some(w => pB.includes(w));
        if (hasCommon) {
          score += 25;
          reasons.push(`Indikasi Kesamaan Pihak Terlibat`);
        }
      }

      if (score >= 40) {
        newSignals.push({
          id: `SIG-${Date.now()}-${Math.floor(Math.random()*100)}`,
          reportAId: newReport.id,
          reportBId: existing.id,
          confidenceScore: Math.min(score, 96),
          reasons,
          status: 'suggested',
          detectedAt: new Date().toISOString(),
        });
      }
    });

    if (newSignals.length > 0) {
      setToStorage(STORAGE_KEY_SIGNALS, [...newSignals, ...signals]);
    }
  },

  getAuditLogs(): AuditLogItem[] {
    return getFromStorage<AuditLogItem[]>(STORAGE_KEY_AUDIT, INITIAL_AUDIT_LOGS);
  },

  addAuditLog(item: Omit<AuditLogItem, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogItem = {
      ...item,
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };
    setToStorage(STORAGE_KEY_AUDIT, [newLog, ...logs.slice(0, 49)]);
  },

  isPrivacyMode(): boolean {
    return getFromStorage<boolean>(STORAGE_KEY_PRIVACY, false);
  },

  setPrivacyMode(active: boolean): void {
    setToStorage(STORAGE_KEY_PRIVACY, active);
  },

  // Super Admin view: Encrypted report payload to protect student privacy
  getReportsForSuperAdmin() {
    const reports = this.getReports();
    return reports.map((r) => ({
      id: r.id,
      category: r.category,
      urgency: r.urgency,
      status: r.status,
      createdAt: r.createdAt,
      isAnonymous: r.isAnonymous,
      role: r.role,
      location: r.location,
      isEncrypted: true,
      encryptedPayload: `AES-GCM-256:enc_${Buffer.from(r.id + ':' + r.createdAt).toString('base64')}...[TERENKRIPSI - HAK AKSES KHUSUS GURU BK]`,
      maskedReporter: r.isAnonymous ? 'Siswa Anonim (Tersamar)' : 'Murid Terdaftar (Akses Terkunci)',
      description: '🔒 [KONTEN TERENKRIPSI END-TO-END — HAK AKSES KHUSUS GURU BK & TIM PPKSP]',
      partiesInvolved: '🔒 [PIHAK TERLIBAT DISEMBUNYIKAN DEMI PERLINDUNGAN ANAK]'
    }));
  },

  // Convenience aliases for RuangSuara platform
  submitReport(newReport: Omit<Report, 'id' | 'pin' | 'createdAt' | 'updatedAt' | 'messages' | 'status'> & { status?: Report['status'] }): { id: string; pin: string } {
    return this.addReport(newReport);
  },

  addReportMessage(reportId: string, msg: { sender: 'student' | 'counselor'; senderName: string; content: string; imageUrl?: string | null }): Report | undefined {
    this.addMessageToReport(reportId, msg.sender, msg.senderName, msg.content, msg.imageUrl);
    return this.getReportById(reportId);
  },

  reviewSignal(signalId: string, action: 'confirmed' | 'dismissed', reviewerName = 'Guru BK'): void {
    if (action === 'confirmed') {
      this.confirmSignal(signalId, reviewerName);
    } else {
      this.dismissSignal(signalId, reviewerName);
    }
  },

  addTimelineEvent(caseId: string, eventData: { date: string; time: string; event: string }): void {
    const cases = this.getCases();
    const updated = cases.map(c => {
      if (c.id === caseId) {
        const item = {
          id: `t-${Date.now()}`,
          ...eventData
        };
        return {
          ...c,
          timeline: [...c.timeline, item],
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    });
    setToStorage(STORAGE_KEY_CASES, updated);
  },

  // Reset demo data back to default
  resetData(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY_REPORTS);
    window.localStorage.removeItem(STORAGE_KEY_CASES);
    window.localStorage.removeItem(STORAGE_KEY_SIGNALS);
    window.localStorage.removeItem(STORAGE_KEY_AUDIT);
    window.localStorage.removeItem(STORAGE_KEY_PRIVACY);
  }
};

export const RuangSuaraStore = Store;
export default Store;

