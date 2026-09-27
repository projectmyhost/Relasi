import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== 'string' || !description.trim()) {
      return NextResponse.json({ error: 'Deskripsi kronologi wajib diisi' }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA API Key belum dikonfigurasi di server' }, { status: 500 });
    }

    const systemPrompt = `Anda adalah AI Analis Triage Penanganan Kasus Perundungan & Kekerasan Sekolah (PPKSP Permendikbudristek No. 46/2023).
Tugas Anda membaca kronologi kejadian dan menentukan tingkat urgensi serta kategori kejadian secara cerdas, objektif, dan akurat.

PANDUAN TINGKAT URGENSI:
- "urgent":
  * Terjadi kekerasan fisik langsung (pukul, tendang, pengeroyokan, luka, berdarah, memar).
  * Ada ancaman senjata tajam atau ancaman keselamatan fisik/nyawa (dicegat, dibunuh).
  * Pemalakan/pemerasan uang atau barang dengan paksaan atau ancaman fisik.
  * Pelecehan seksual fisik maupun verbal ekstrem.
  * Tanda trauma berat, depresi akut, atau melukai diri sendiri (self-harm).
- "normal":
  * Pelanggaran tata tertib biasa (nyontek saat ujian, tidak mengerjakan PR, terlambat sekolah, buang sampah).
  * Perselisihan verbal ringan spontan satu kali tanpa ancaman bahaya fisik atau mental.
  * Ketidaknyamanan biasa yang tidak membahayakan keselamatan siswa.

PANDUAN KATEGORI:
- "fisik" : kekerasan atau kontak fisik secara langsung.
- "verbal" : ejekan, cacian, penghinaan, body shaming, makian.
- "relasional" : pengucilan sosial, fitnah, dijauhi satu kelas.
- "cyber" : perundungan di media sosial atau grup chat online.
- "pemalakan" : pemerasan uang jajan atau perampasan barang.
- "lainnya" : ketertiban umum (nyontek, bolos, seragam, dll).

WAJIB MERESPONS HANYA DALAM FORMAT JSON MURNI (TANPA PEMBUKA MAUPUN PENUTUP LAIN):
{
  "urgency": "urgent" | "normal",
  "category": "fisik" | "verbal" | "relasional" | "cyber" | "pemalakan" | "lainnya",
  "reasoning": "Penjelasan ringkas 1 kalimat alasan penentuan urgensi & kategori",
  "confidence": 0.95
}`;

    // Priority: meta/llama-3.2-11b-vision-instruct (super fast ~2s & tested working on NVIDIA API)
    const modelToUse = process.env.NVIDIA_MODEL || 'meta/llama-3.2-11b-vision-instruct';

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelToUse,
        temperature: 0.1,
        max_tokens: 350,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Kronologi Kejadian Siswa:\n"${description.trim()}"` },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('NVIDIA NIM API Error:', response.status, errText);
      return NextResponse.json({ error: 'NVIDIA API gagal merespons', detail: errText }, { status: response.status });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim() || '';

    // Strip markdown formatting if AI included it
    const cleanJsonStr = rawContent
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    try {
      const parsed = JSON.parse(cleanJsonStr);
      return NextResponse.json({
        success: true,
        model: modelToUse,
        result: {
          urgency: parsed.urgency === 'urgent' ? 'urgent' : 'normal',
          category: ['fisik', 'verbal', 'relasional', 'cyber', 'pemalakan', 'lainnya'].includes(parsed.category)
            ? parsed.category
            : 'lainnya',
          reasoning: parsed.reasoning || 'Telah dianalisis otomatis berdasarkan standar PPKSP.',
          confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.9,
        },
      });
    } catch {
      console.error('Failed to parse AI JSON:', rawContent);
      return NextResponse.json({
        success: true,
        model: modelToUse,
        result: {
          urgency: rawContent.toLowerCase().includes('urgent') ? 'urgent' : 'normal',
          category: 'lainnya',
          reasoning: rawContent.slice(0, 150),
          confidence: 0.8,
        },
      });
    }
  } catch (error) {
    console.error('AI Triage error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
