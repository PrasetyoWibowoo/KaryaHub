# database.md — Aturan Database & Prisma

> Rujukan: `architecture.md` (invariants), `security.md`, `error-handling.md`.

## 1. Tipe Data & Skema Wajib

| Field | Wajib |
| --- | --- |
| `Job.budget` | `Decimal @db.Decimal(14,2)` |
| `Proposal.bidAmount` | `Decimal @db.Decimal(14,2)` |
| `EscrowTransaction.amount` | `Decimal @db.Decimal(14,2)` |
| `EscrowTransaction.midtransOrderId` | `String @unique` |
| `EscrowTransaction.jobId` | `@unique` (satu escrow per job) |
| `EscrowStatus` | 6 nilai: `PENDING, HELD_IN_ESCROW, RELEASED, REFUNDED, FAILED, EXPIRED` |
| `Job.estimatedHours` | `Int @map("estimated_hours")` |
| `Review` | `@@unique([jobId, reviewerId])` (dua arah) |
| `Proposal` | `@@unique([jobId, freelancerId])` |
| `JobSubmission.updatedAt` | `DateTime @updatedAt` |
| `Profile.cityCode` | `String?` |

- NEVER `Float` untuk uang. Jangan konversi `Decimal` ke `number` untuk perhitungan/perbandingan uang. Pakai operasi Decimal (`Prisma.Decimal`).
- Jangan ubah nama enum/field yang sudah ada di `schema.prisma` tanpa migrasi dan persetujuan manusia.
- Constraint unik adalah garis pertahanan terakhir. Tangkap error unik Prisma (`P2002`) dan petakan ke 409.

## 2. Akses Prisma

- Singleton di `src/lib/prisma.ts` dengan PrismaPg adapter. Jangan buat client lain.
- Gunakan `select` spesifik. `include` hanya bila memang butuh seluruh relasi dan alasannya jelas.
- NEVER `passwordHash` di `select` untuk query yang hasilnya dikirim ke client. Hanya modul auth yang boleh membacanya.
- NEVER `$queryRawUnsafe` / `$executeRawUnsafe`. Jika raw query tak terhindarkan, pakai tagged template `Prisma.sql` / `$queryRaw` parameterized dan minta persetujuan manusia.
- Paginasi wajib untuk list publik. Batasi `take` maksimum (mis. 50) di server, jangan percaya `limit` dari client.

## 3. Transaksi

- Operasi yang mengubah lebih dari satu tabel terkait status (escrow + job + submission + notifikasi) wajib `prisma.$transaction`.
- Cek kondisi (status saat ini, ownership) DI DALAM transaksi, bukan sebelum.
- Pemilihan proposal `ACCEPTED`: dalam TX, pastikan belum ada proposal `ACCEPTED` lain untuk job tersebut, lalu tolak/biarkan sisanya sesuai aturan bisnis.
- Panggilan jaringan eksternal (Midtrans) jangan di dalam TX yang panjang. Jika DB write gagal setelah Midtrans sukses → rollback + batalkan order di Midtrans.

## 4. Migrasi

- Perubahan skema HANYA lewat `bunx prisma migrate dev --name <deskripsi>`. Jangan edit DB manual.
- Commit file migrasi bersama perubahan `schema.prisma`.
- Production: `bunx prisma migrate deploy` (jangan `migrate dev` / `db push` di production).
- Migrasi destruktif (drop kolom/tabel, ubah tipe uang) butuh persetujuan manusia eksplisit.
- `DATABASE_URL` = pooler (port 6543) untuk runtime. `DIRECT_URL` = direct (port 5432) untuk migrate.

## 5. Seed

- `prisma/seed.ts`: skill master, 1 UMKM demo, 1 FREELANCER demo.
- Seed idempoten (`upsert`). Password demo di-hash, tidak ada kredensial production di seed.

## 6. Nilai Uang

- Simpan dan hitung sebagai `Decimal`. Format `Rp` hanya di lapisan presentasi (`formatRupiah()` di `lib/utils.ts`).
- Perbandingan amount webhook vs DB: bandingkan sebagai Decimal, bukan string/float.
- `midtrans_order_id` dibuat dengan `generateOrderId(jobId)` → `ESCROW-{jobId.slice(0,8)}-{epoch_detik}`.

## 7. Index

Tambah index hanya jika ada query nyata yang melanggar target (1000 row < 100 ms) dan sudah diukur. Jangan menebak index.
