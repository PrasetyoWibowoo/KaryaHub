# api.md — Kontrak API

> Rujukan: `security.md`, `error-handling.md`, `architecture.md`.

## 1. Format Response (WAJIB)

Selalu lewat `ok()` / `fail()` di `lib/api-response.ts`. Jangan `NextResponse.json(...)` langsung.

```ts
{ success: true,  message: string, data?: T }
{ success: false, message: string, errors?: unknown }
```

Format konsisten di semua endpoint, termasuk error.

## 2. Status Code

| Kode | Pemakaian |
| --- | --- |
| 200 | OK (termasuk webhook replay idempoten) |
| 201 | Resource dibuat |
| 400 | Body malformed / gagal Zod / amount mismatch webhook / file bukan PDF / file > 5 MB |
| 401 | Tidak ada sesi aktif |
| 403 | Role salah / bukan pemilik / signature webhook invalid |
| 404 | Resource / `order_id` tidak ditemukan |
| 409 | Konflik state/duplikat (proposal duplikat, escrow sudah ada, review duplikat, transisi ilegal, review sebelum COMPLETED) |
| 422 | Valid secara format tapi tidak bisa diproses (guardrail tarif, PDF terenkripsi/kosong) |
| 500 | Error internal (wajib `log.error` dulu) |
| 502 | Midtrans timeout / gangguan upstream |

Pesan error spesifik dan berguna dalam Bahasa Indonesia. Jangan bocorkan stack trace, query, atau detail internal.

## 3. Peta Endpoint & Otorisasi

| Endpoint | FREELANCER | UMKM | ADMIN | Catatan |
| --- | --- | --- | --- | --- |
| GET /api/jobs | ✓ | ✓ | ✓ | Publik, paginasi, filter category/search |
| POST /api/jobs | ✗ | ✓ | ✓ | Guardrail tarif |
| GET/PATCH/DELETE /api/jobs/[id] | — | pemilik | ✓ | PATCH/DELETE hanya status OPEN |
| POST /api/proposals | ✓ | ✗ | ✓ | Duplikat → 409 via DB |
| GET /api/proposals | milik sendiri | per job miliknya | ✓ | |
| PATCH /api/proposals/[id] | ✗ | ✓* | ✓ | *pemilik job saja |
| POST /api/submissions | ✓* | ✗ | ✓ | *proposal ACCEPTED |
| GET /api/submissions/[id] | terkait | terkait | ✓ | |
| PATCH /api/submissions/[id] | ✗ | ✓* | ✓ | *pemilik job saja |
| POST /api/escrow/charge | ✗ | ✓* | ✓ | *proposal ACCEPTED dulu |
| POST /api/escrow/release | ✗ | ✓* | ✓ | *submission APPROVED dulu |
| POST /api/webhooks/midtrans | ✗ | ✗ | ✗ | Hanya Midtrans (signature) |
| POST /api/reviews | ✓* | ✓* | ✓ | *job COMPLETED saja |
| GET /api/reviews?userId=[id] | ✓ | ✓ | ✓ | |
| POST /api/ats/scan | ✓ | ✗ | ✓ | |
| GET /api/ats/history | milik sendiri | — | ✓ | |
| GET /api/skills | ✓ | ✓ | ✓ | |
| GET/PATCH /api/notifications | milik sendiri | milik sendiri | ✓ | |
| GET /api/health | publik | | | cek konektivitas DB |
| POST /api/register | publik | | | role: FREELANCER atau UMKM saja |

Endpoint di luar daftar ini = jangan dibuat tanpa persetujuan manusia.

## 4. Pola Handler Mutation

```ts
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return fail('Unauthorized', 401)          // 1 auth
  if (session.user.role !== 'UMKM') return fail('Forbidden', 403)  // 2 role

  const parsed = Schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return fail('Input tidak valid', 400, parsed.error.flatten())

  // 3 ownership (query DB: apakah resource milik session.user.id?)
  // 4 business rule (state, guardrail, uniqueness)
  // 5 mutate (TX bila multi-tabel)
  try { /* ... */ return ok('...', data, 201) }
  catch (err) { log.error('jobs.create', err, { userId: session.user.id }); return fail('Terjadi kesalahan', 500) }
}
```

Identitas HANYA dari `session.user.id`. Schema Zod tidak boleh memuat `userId`/`employerId`/`freelancerId`/`amount` untuk mutation.

## 5. Validasi Input (Zod)

- Semua body, query, dan param diparse. Gunakan `.strict()` untuk menolak field tak dikenal pada mutation.
- Query `page`/`limit` di-coerce, dibatasi minimum/maksimum.
- ID format sesuai skema (cuid/uuid sesuai `schema.prisma`).
- Upload: cek MIME dan ukuran di server, jangan percaya ekstensi/header client saja.

## 6. Kontrak Spesifik

**Guardrail tarif** (`POST /api/jobs`): `budget ÷ estimatedHours ≥ UMK_HOURLY[cityCode]` (fallback `default`). Gagal → 422 dengan pesan spesifik: tarif per jam, minimum, dan budget minimum yang disarankan.

**Escrow charge**: butuh proposal `ACCEPTED`; amount dari `jobs.budget`; order id dari `generateOrderId`; Snap token dikembalikan ke client. Escrow sudah ada → 409. Midtrans 4xx → 400, timeout 8 detik → 502.

**Webhook Midtrans**: urutan wajib
1. Verifikasi signature SHA-512 (invalid → 403, log IP + payload, STOP)
2. Cari `order_id` (tidak ada → 404, log audit)
3. Bandingkan `gross_amount` dengan amount DB sebagai Decimal (beda → 400, ALERT admin, STOP)
4. Idempoten: `paymentStatus != PENDING` → 200 tanpa proses ulang
5. Map status: `settlement` (dan `capture` yang valid) → `HELD_IN_ESCROW` + job `IN_PROGRESS`; `expire` → `EXPIRED`; `deny`/`cancel` → `FAILED`
6. Update escrow + job dalam satu TX. Gagal → 500 (Midtrans retry)

**ATS**: file bukan PDF → 400; > 5 MB → 400; PDF terenkripsi/kosong → 422; storage gagal → 500.

**Notifikasi otomatis**: proposal masuk, proposal accepted, escrow held, submission masuk, review baru.

## 7. Dilarang

- Menambah field respons yang tidak ada di kontrak tanpa alasan.
- Mengembalikan data pengguna lain di endpoint "milik sendiri".
- Mengubah format response yang sudah dipakai frontend tanpa persetujuan.
