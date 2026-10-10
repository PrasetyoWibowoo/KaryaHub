# security.md — Aturan Keamanan

> Rujukan: `api.md` (matriks otorisasi), `database.md`, `error-handling.md`.
> Keamanan > kenyamanan > kecepatan. Jika ragu, pilih opsi yang lebih ketat dan tanya manusia.

## 1. Identitas & Autentikasi

- Identitas HANYA dari `session.user.id` (Auth.js v5, JWT). NEVER dari body/query/header buatan client.
- Role ada di session. Cek role di server pada setiap endpoint, jangan mengandalkan frontend.
- `POST /api/register`: role dari body hanya boleh `FREELANCER` atau `UMKM`. Tolak `ADMIN` (dan nilai lain) lewat Zod enum. Akun ADMIN dibuat di luar jalur publik.
- Password: hash dengan algoritma password hashing yang kuat (mis. bcrypt/argon2, sesuai yang sudah dipilih di proyek). Jangan simpan atau log password plaintext.
- `AUTH_SECRET` production = nilai baru, bukan dari `.env.example`.

## 2. Otorisasi (urutan wajib)

`auth check (401) → role check (403) → ownership/row-level check (403/404) → business rule (409/422) → mutate`

- Ownership: UMKM hanya boleh memodifikasi job/proposal/submission miliknya. Freelancer tidak boleh accept proposal milik UMKM lain.
- Row-level check dilakukan lewat query yang menyertakan pemilik (mis. `where: { id, employerId: session.user.id }`), bukan hanya cek role.
- Jangan membocorkan keberadaan resource milik orang lain: gunakan 404 atau 403 konsisten sesuai kebijakan endpoint.

## 3. Pembayaran (Midtrans)

1. Webhook WAJIB verifikasi signature SHA-512: `SHA512(order_id + status_code + gross_amount + ServerKey)` dibandingkan dengan `signature_key` memakai perbandingan constant-time (`crypto.timingSafeEqual`). Invalid → 403, log IP + payload, STOP.
2. `amount` escrow SELALU dari `jobs.budget` di DB. Mismatch dengan `gross_amount` webhook → 400, ALERT admin, STOP.
3. Idempoten: webhook replay (`paymentStatus != PENDING`) → 200 tanpa proses ulang.
4. Satu escrow per job (`job_id @unique`) → tidak ada double charge.
5. Release dana hanya jika submission `APPROVED`; dilakukan atomic.
6. Server key Midtrans hanya di env server. `MIDTRANS_IS_PRODUCTION=true` + kunci Production hanya di production.
7. Jangan percaya status pembayaran dari client/redirect. Hanya webhook tervalidasi (atau verifikasi status ke Midtrans) yang boleh mengubah escrow.

## 4. Input & Data

- Semua input diparse Zod. Malformed → 400.
- Prisma parameterized only. NEVER string interpolation ke SQL.
- `passwordHash` NEVER muncul di response, log, atau error. Gunakan `select` yang eksplisit; periksa dengan grep sebelum selesai.
- Jangan return objek Prisma mentah ke client. Bentuk respons dari field yang dipilih.
- Batasi ukuran/format upload di server (PDF, ≤ 5 MB).

## 5. File & Storage

- CV disimpan di Supabase Storage bucket `resumes` = **Private**. Path: `resumes/{userId}/{uuid}.pdf`.
- NEVER simpan di `public/` atau bucket publik. Akses URL langsung harus 403.
- Service role key Supabase hanya di server (`lib/storage.ts`), tidak boleh sampai ke client bundle (jangan prefix `NEXT_PUBLIC_`).
- Jika perlu membagikan file, gunakan signed URL berumur pendek.

## 6. Secrets & Konfigurasi

- Semua secret dari environment variable. NEVER hardcode di kode, test, seed, atau commit.
- `.env` tidak pernah di-commit. Hanya `.env.example` dengan placeholder.
- Variabel yang boleh diekspos ke client hanya yang memang publik dan diawali `NEXT_PUBLIC_`. Secret tidak boleh.
- Jika secret terlanjur ter-commit: anggap bocor, rotasi, laporkan ke manusia.

## 7. Rate Limiting

Aktif minimal pada `/api/register` dan `/api/ats/scan`. Disarankan juga pada login. Respons 429 dengan `fail()`.

## 8. Logging Aman

- Gunakan `lib/logger.ts`. Jangan log password, token, `Authorization`, server key, isi CV penuh, atau data kartu.
- Webhook invalid: log IP + payload untuk audit (tanpa secret).

## 9. Checklist Pre-Production

- [ ] Semua mutation endpoint return 401 tanpa sesi
- [ ] UMKM tidak bisa akses endpoint khusus FREELANCER (403) dan sebaliknya
- [ ] Freelancer tidak bisa accept proposal milik UMKM lain
- [ ] `passwordHash` tidak pernah muncul di response (cek manual + grep)
- [ ] Signature Midtrans diverifikasi di setiap webhook call
- [ ] Amount escrow selalu dari DB
- [ ] Tidak ada double charge
- [ ] Semua body diparse Zod (kirim body malformed → 400)
- [ ] File CV tidak bisa diakses publik (URL langsung → 403)
- [ ] Rate limiting aktif pada `/api/register` dan `/api/ats/scan`
- [ ] Tidak ada `console.log` tersisa
- [ ] `AUTH_SECRET` production baru
