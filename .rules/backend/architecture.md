# architecture.md — Arsitektur, State Machine, dan Alur Bisnis

> Rujukan: `backend.md`, `database.md`, `api.md`, `security.md`.

## 1. Struktur Folder (acuan)

```
src/
├── app/api/
│   ├── register/route.ts
│   ├── auth/[...nextauth]/route.ts
│   ├── health/route.ts
│   ├── ats/{scan,history}/route.ts
│   ├── jobs/route.ts            (GET, POST)
│   ├── jobs/[id]/route.ts       (GET, PATCH, DELETE)
│   ├── proposals/route.ts       (GET, POST)
│   ├── proposals/[id]/route.ts  (PATCH)
│   ├── submissions/route.ts     (POST)
│   ├── submissions/[id]/route.ts(GET, PATCH)
│   ├── escrow/{charge,release}/route.ts
│   ├── webhooks/midtrans/route.ts
│   ├── reviews/route.ts         (GET, POST)
│   ├── skills/route.ts
│   └── notifications/{route.ts,[id]/route.ts}
├── lib/
│   ├── prisma.ts      (PrismaPg adapter)
│   ├── auth.ts        (Auth.js v5)
│   ├── api-response.ts (ok / fail)
│   ├── logger.ts      (structured JSON)
│   ├── guardrails.ts  (validateFairRate, UMK_HOURLY)
│   ├── midtrans.ts    (Snap instance)
│   ├── storage.ts     (Supabase service role)
│   ├── ats-engine.ts  (extractText, calculateScore)
│   └── utils.ts       (generateOrderId, formatRupiah)
├── types/ats.ts       (ATSFeedback)
prisma/{schema.prisma,seed.ts}
```

Struktur ini adalah acuan dari dokumen arsitektur. Jangan membuat folder/layer baru (mis. `services/`, `repositories/`) tanpa persetujuan manusia.

## 2. Pembagian Tanggung Jawab

- **Route handler** (`route.ts`): auth, parse Zod, panggil logika, return `ok()`/`fail()`. Tipis.
- **`lib/*`**: logika murni dan integrasi (guardrail, ATS, Midtrans, storage). Tidak membaca `Request` langsung.
- **Prisma**: hanya diakses lewat `lib/prisma.ts` (singleton). Jangan `new PrismaClient()` di tempat lain.
- Bisnis rule yang menyentuh lebih dari satu tabel → `prisma.$transaction`.

## 3. Invariants (tidak boleh dilanggar)

1. `escrow_transactions.amount` == `jobs.budget`, diambil dari DB.
2. Satu `EscrowTransaction` per job (`job_id @unique`).
3. `Proposal`: hanya `PENDING → ACCEPTED` atau `PENDING → REJECTED` (forward-only).
4. Hanya satu proposal `ACCEPTED` per job (business logic + DB transaction).
5. Review hanya setelah job `COMPLETED`.
6. Tarif per jam = `budget ÷ estimated_hours ≥ UMK_FLOOR[kota]`.
7. `midtrans_order_id` unik global, format `ESCROW-{jobId8}-{epoch}` (maks 50 karakter).

## 4. State Machines

```
Job:         OPEN ──[escrow HELD]──► IN_PROGRESS ──[sub APPROVED]──► COMPLETED
             OPEN | IN_PROGRESS ──[cancel]──► CANCELLED

Proposal:    PENDING ──[accept]──► ACCEPTED
             PENDING ──[reject]──► REJECTED

Submission:  PENDING_REVIEW ──[approve]──► APPROVED
             PENDING_REVIEW ──[revise]──► REVISION_REQUESTED
             REVISION_REQUESTED ──[resubmit]──► PENDING_REVIEW

Escrow:      PENDING ──[settlement]──► HELD_IN_ESCROW
             PENDING ──[expire]──► EXPIRED
             PENDING ──[deny/cancel]──► FAILED
             HELD_IN_ESCROW ──[sub approved]──► RELEASED
             HELD_IN_ESCROW ──[cancelled]──► REFUNDED
```

Aturan implementasi:
- Semua transisi lewat satu fungsi pengecek transisi legal. Transisi di luar tabel di atas → 409.
- Jangan set status langsung dari input client. Status ditentukan oleh aksi (accept, approve, dst.).
- Transisi yang menyentuh lebih dari satu entitas wajib atomic.

## 5. Alur Utama (flowchart → endpoint)

| Langkah | Endpoint |
| --- | --- |
| UMKM buat proyek | `POST /api/jobs` (guardrail tarif) |
| Freelancer melamar | `POST /api/proposals` (unique `[jobId, freelancerId]`) |
| Pilih freelancer | `PATCH /api/proposals/[id]` `{status: ACCEPTED}` |
| Deposit escrow | `POST /api/escrow/charge` (amount dari DB) |
| Pembayaran sukses/gagal/expire | `POST /api/webhooks/midtrans` |
| Freelancer submit hasil | `POST /api/submissions` (proposal ACCEPTED) |
| UMKM review hasil | `PATCH /api/submissions/[id]` (APPROVED / REVISION_REQUESTED) |
| Release dana | `POST /api/escrow/release` (submission APPROVED dulu) |
| Saling rating | `POST /api/reviews` (job COMPLETED, dua arah) |

Tidak boleh ada node alur tanpa endpoint, dan tidak boleh ada endpoint di luar peta ini tanpa persetujuan manusia.

## 6. Pola Atomic Transaction

Submission APPROVED → release escrow + complete job + notifikasi dalam SATU transaksi:

```ts
await prisma.$transaction(async (tx) => {
  await tx.jobSubmission.update({ where: { id: submissionId }, data: { status: 'APPROVED' } })
  await tx.escrowTransaction.update({ where: { jobId }, data: { paymentStatus: 'RELEASED' } })
  await tx.job.update({ where: { id: jobId }, data: { status: 'COMPLETED' } })
  await tx.notification.create({ data: { userId: freelancerId, title: '...', message: '...' } })
})
```

Webhook settlement: update escrow → `HELD_IN_ESCROW` dan job → `IN_PROGRESS` dalam satu TX.
Di dalam TX: baca ulang status terkini sebelum update (cegah race / double-process).

## 7. Urutan Milestone

M1 Fondasi → M2 Core Marketplace → M3 Escrow & Payment (paling berisiko, uji di Sandbox Midtrans) → M4 ATS CV Checker → M5 Penutup Siklus Kerja → M6 Frontend Integration → M7 Testing & Hardening.
Jangan mulai M4 sebelum DoD M3 lolos. Jangan lanjut milestone sebelum DoD milestone saat ini terpenuhi.

## 8. Alur ATS Scan (`POST /api/ats/scan`)

1. Auth check (sesi, role FREELANCER)
2. Parse `FormData.get('file')`
3. Validasi MIME = `application/pdf`, ukuran ≤ 5 MB
4. Upload ke Supabase `resumes/{userId}/{uuid}.pdf` (gagal → 500, STOP)
5. `unpdf.extractText(buffer)` (gagal/terenkripsi/kosong → 422)
6. `calculateScore(text, skills)`
7. Simpan `prisma.resumeATS.create(...)`
8. Return `{ atsScore, feedback, scoreBreakdown }`

Skor = Keyword×0.40 + Structure×0.30 + Quant×0.20 + Links×0.10. Struktur `ATSFeedback` ada di `types/ats.ts`.
