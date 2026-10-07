# error-handling.md — Penanganan Error

> Rujukan: `api.md` (status code), `security.md`, `backend.md`.

## 1. Aturan Dasar

1. Setiap `catch` yang berujung 500 WAJIB memanggil `log.error(event, err, context)` SEBELUM return.
2. NEVER `console.log` / `console.error`. Pakai `lib/logger.ts`.
3. Client menerima pesan aman dan spesifik. Jangan bocorkan stack trace, SQL, nama tabel, atau secret.
4. Jangan menelan error (`catch {}` kosong). Tangani, log, atau lempar ulang.
5. Error yang diharapkan (validasi, konflik, tidak ditemukan) bukan 500. Petakan ke 4xx.
6. `context` log berisi ID relevan (`userId`, `jobId`, `orderId`), BUKAN data sensitif.

## 2. Pemetaan Error → Status

| Situasi | Status |
| --- | --- |
| Body tidak bisa diparse / gagal Zod | 400 |
| Tidak ada sesi | 401 |
| Role salah / bukan pemilik | 403 |
| Resource tidak ada | 404 |
| Prisma `P2002` (unique) | 409 (pesan spesifik: proposal duplikat, escrow sudah dibuat, review duplikat) |
| Transisi status ilegal / prasyarat belum terpenuhi | 409 |
| Guardrail tarif gagal / PDF tak terbaca | 422 |
| Midtrans 4xx | 400 + log full payload |
| Midtrans timeout / upstream down | 502 |
| Lainnya (tak terduga) | 500 |

## 3. Failure Mode Webhook Midtrans (komponen paling berisiko)

| Skenario | Deteksi | Recovery |
| --- | --- | --- |
| Signature invalid | verifikasi SHA-512 gagal | 403, log IP + payload, STOP |
| `order_id` tak ada | lookup null | 404, log audit |
| Amount beda | perbandingan Decimal | 400, ALERT admin, STOP |
| Replay | `paymentStatus != PENDING` | 200, tidak diproses ulang |
| DB update gagal | try/catch | 500 (Midtrans retry 3x) |
| Job tak ter-update bersamaan | DB transaction | atomic: escrow + job satu TX |

Jangan mengembalikan 200 jika proses DB gagal — itu akan menghentikan retry Midtrans dan membuat escrow tidak sinkron.

## 4. Failure Mode Escrow Charge

| Skenario | Respons |
| --- | --- |
| Proposal belum ACCEPTED | 409 "Pilih freelancer dulu" |
| Escrow sudah ada | 409 "Escrow sudah dibuat" |
| Midtrans 4xx | 400 ke client, log full payload |
| Midtrans timeout > 8 detik (`AbortController`) | 502, user coba ulang |
| DB write gagal setelah Midtrans OK | rollback, batalkan order di Midtrans |

## 5. Failure Mode ATS

| Skenario | Status | Pesan |
| --- | --- | --- |
| Bukan PDF | 400 | "File harus berformat PDF." |
| > 5 MB | 400 | "File maksimal 5 MB. Ukuran file kamu: X MB." |
| PDF terenkripsi / kosong | 422 | "PDF tidak bisa dibaca. Pastikan PDF tidak terproteksi password." |
| Supabase Storage gagal | 500 | "Gagal menyimpan file. Coba beberapa saat lagi." |
| Score engine error | 500 | Simpan score=0 + flag manual review, return error |

## 6. Pola

```ts
try {
  // ...
} catch (err) {
  if (isPrismaUniqueError(err)) return fail('Proposal sudah pernah dikirim untuk job ini', 409)
  log.error('proposals.create', err, { userId, jobId })
  return fail('Terjadi kesalahan pada server', 500)
}
```

- Operasi multi-langkah dengan efek samping eksternal: pikirkan kompensasi (rollback / batalkan order) sebelum menulis kode.
- Panggilan eksternal selalu punya timeout.
- Jangan retry otomatis operasi non-idempoten (charge) tanpa kunci idempotensi.
