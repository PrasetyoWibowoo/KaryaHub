# backend.md — Aturan Utama Backend KaryaHub

> Wajib dibaca AI agent SEBELUM menulis atau mengubah kode backend apapun.
> Sumber kebenaran: `KaryaHub - Backend Architecture`. Jika kode dan dokumen bertentangan, STOP dan tanya manusia (lihat `anti-hallucination.md`).
> File terkait: `architecture.md` · `database.md` · `api.md` · `security.md` · `testing.md` · `error-handling.md` · `dependencies.md` · `git.md` · `anti-hallucination.md`

## 1. Stack Tetap

| Area | Pilihan |
| --- | --- |
| Framework | Next.js 15+ (App Router, Route Handlers) |
| Bahasa | TypeScript (strict) |
| Runtime / package manager | Bun |
| ORM | Prisma 7 + PrismaPg adapter |
| DB | PostgreSQL (Supabase) |
| Auth | Auth.js v5 (Credentials, JWT) |
| Validasi | Zod |
| Payment | Midtrans Snap |
| Storage | Supabase Storage (bucket `resumes`, Private) |
| PDF | `unpdf` |

Jangan ganti atau tambah stack tanpa persetujuan manusia (lihat `dependencies.md`).

## 2. Larangan Mutlak (NEVER)

1. NEVER menerima `userId`, `employerId`, `freelancerId` dari request body untuk mutation. Selalu `session.user.id`.
2. NEVER membaca `amount` dari body untuk charge escrow. Selalu `jobs.budget` dari DB.
3. NEVER skip verifikasi signature SHA-512 pada webhook Midtrans.
4. NEVER simpan file CV di `public/uploads/`. Pakai Supabase Storage bucket private.
5. NEVER pakai `Float` untuk uang. Pakai `Decimal @db.Decimal(14,2)`.
6. NEVER update status escrow tanpa atomic transaction bersama status job.
7. NEVER return `passwordHash` / `password_hash` di response apapun.
8. NEVER pakai `console.log`. Pakai `lib/logger.ts` (structured JSON).
9. NEVER hardcode server key Midtrans, key Supabase, atau secret lain.
10. NEVER buat lebih dari satu `EscrowTransaction` per job.
11. NEVER release dana sebelum submission `APPROVED`.
12. NEVER buat review sebelum job `COMPLETED`.
13. NEVER interpolasi string mentah ke SQL. Pakai Prisma parameterized query.

## 3. Wajib Dilakukan (ALWAYS)

1. Setiap mutation endpoint mengikuti urutan: **auth check → role check → ownership check → business rule → mutate**.
2. Semua body diparse dengan Zod. Gagal parse → 400 + pesan spesifik.
3. Semua error dicatat `log.error(event, err, context)` sebelum return 500.
4. Guardrail tarif divalidasi di `POST /api/jobs` sebelum insert DB.
5. Response selalu `{ success, message, data? }` lewat `ok()` dan `fail()` dari `lib/api-response.ts`.
6. Query pakai `select` spesifik, bukan `include` semua relasi secara default.
7. Idempotensi diverifikasi sebelum operasi yang bisa replay (webhook, escrow charge).

## 4. Urutan Kerja Agent

1. Baca file `.rules/*` yang relevan dengan tugas.
2. Identifikasi milestone (M1–M7) tugas ini. Jangan lompat milestone sebelum Definition of Done terpenuhi.
3. Cek file/fungsi yang sudah ada sebelum membuat baru (jangan duplikasi helper).
4. Implementasi minimal yang memenuhi spesifikasi. Tanpa fitur tambahan yang tidak diminta.
5. Jalankan `bun run typecheck` dan test terkait.
6. Laporkan apa yang diubah, apa yang diverifikasi, apa yang BELUM diverifikasi.

## 5. Performa

- Query dengan 1000 row harus < 100 ms.
- `POST /api/ats/scan` < 8 detik total.
- Panggilan eksternal (Midtrans) timeout 8 detik via `AbortController`.
- Hindari N+1: gunakan `select` + relasi terarah atau satu query batch.
- Daftar publik (`GET /api/jobs`) wajib paginasi. Tanpa paginasi = ditolak.

## 6. Definition of Done (per perubahan)

- [ ] `bun run typecheck` → 0 error
- [ ] Tidak ada `console.log`, tidak ada secret di kode
- [ ] Zod schema untuk setiap input
- [ ] Auth/role/ownership check ada dan diuji
- [ ] Response memakai `ok()` / `fail()`
- [ ] Test sesuai `testing.md` ditambahkan atau diperbarui
- [ ] Tidak ada field sensitif di response
