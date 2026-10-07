# testing.md — Aturan Testing

> Strategi: proporsional. Fokus pada komponen berisiko tinggi (uang, auth, webhook), bukan coverage demi angka.
> Rujukan: `security.md`, `api.md`, `error-handling.md`.

## 1. Prinsip

- Fitur baru pada area berisiko (escrow, webhook, guardrail, auth) TIDAK dianggap selesai tanpa test.
- Bug fix wajib disertai test yang gagal sebelum fix dan lolos sesudahnya.
- Agent TIDAK BOLEH mengklaim "test lolos" tanpa benar-benar menjalankannya dan menampilkan hasilnya (lihat `anti-hallucination.md`).
- Jangan menghapus/melemahkan test agar hijau. Jika test salah, jelaskan alasannya ke manusia.
- Test tidak boleh memakai secret production atau memukul Midtrans Production.

## 2. Perintah

```
bun run typecheck           # 0 error
bun test                    # atau perintah test yang terdefinisi di package.json
```

Gunakan script yang ada di `package.json`. Jangan mengarang nama script. Cek dulu.

## 3. Unit Test Wajib

| File | Fungsi | Edge case |
| --- | --- | --- |
| `lib/ats-engine.ts` | `calculateScore()` | CV kosong → 0 · semua section → structure max · ada GitHub URL → link score · breakdown 4 komponen berbobot benar |
| `lib/guardrails.ts` | `validateFairRate()` | Rp 100k / 30 jam → invalid · Rp 500k / 10 jam → valid · kota tak dikenal → `default` |
| `lib/api-response.ts` | `ok()`, `fail()` | status code benar · format JSON konsisten |
| `lib/utils.ts` | `generateOrderId()`, `formatRupiah()` | UUID panjang → dipotong 8 char · panjang ≤ 50 · format Indonesia benar |
| `lib/logger.ts` | logger | output JSON terstruktur |

## 4. Webhook Security Test (7 skenario WAJIB)

1. Signature valid, `settlement` → 200, escrow `HELD_IN_ESCROW`, job `IN_PROGRESS`
2. Signature invalid → 403, escrow tidak berubah
3. Amount beda dari DB → 400, escrow tidak berubah
4. Webhook dikirim dua kali (replay) → 200 idempoten, tidak diproses ulang
5. Status `expire` → 200, escrow `EXPIRED`
6. Status `deny` / `cancel` → 200, escrow `FAILED`
7. `order_id` tidak ada di DB → 404

Perubahan apapun di `webhooks/midtrans` atau `escrow/*` wajib menjalankan ulang ketujuh skenario.

## 5. Integration Test

Cakupan: `register`, `jobs`, `proposals`, `escrow/charge`, `webhooks/midtrans`, `ats/scan`.
Wajib mencakup:
- 401 tanpa sesi pada setiap mutation
- 403 role salah dan 403 bukan pemilik
- Proposal duplikat → 409
- Escrow kedua untuk job yang sama → 409
- Review sebelum `COMPLETED` → 409; review duplikat → 409
- Body malformed → 400
- Guardrail tarif → 422 dengan pesan spesifik
- ATS: bukan PDF → 400, > 5 MB → 400, PDF terenkripsi → 422

Gunakan database test terpisah. Jangan menjalankan test terhadap database production.

## 6. Smoke Test End-to-End (5 alur)

| # | Alur | Hasil |
| --- | --- | --- |
| 1 | Buat proyek → lamar → pilih → escrow → settlement | Job `IN_PROGRESS`, Escrow `HELD_IN_ESCROW` |
| 2 | Submit → approve → release → saling review | Job `COMPLETED`, Escrow `RELEASED`, 2 review |
| 3 | Submit → revisi → resubmit → approve | Job `COMPLETED` setelah iterasi kedua |
| 4 | Proyek Rp 100.000 / 30 jam | 422 "Tarif per jam Rp 3.333 di bawah minimum" |
| 5 | Upload CV PDF valid | Skor 0–100 + breakdown + improvements < 8 detik |

## 7. Performa

- Query 1000 row < 100 ms
- ATS scan < 8 detik

## 8. Definition of Done per Milestone

- **M1**: `bun run typecheck` 0 error · `bunx prisma studio` tabel terlihat · `curl /api/health` ok · login demo berhasil dengan role di session
- **M2**: buat proyek · tarif < minimum ditolak dengan pesan spesifik · proposal duplikat 409 · UMKM bisa accept proposal
- **M3**: settlement → HELD_IN_ESCROW + IN_PROGRESS · expire → EXPIRED · signature invalid → 403 · amount mismatch → 400 · replay idempoten · release atomic
- **M4**: CV valid < 8 detik · bukan PDF 400 · > 5 MB 400 · PDF terenkripsi 422 · breakdown benar
- **M5**: alur flowchart end-to-end · approve atomic · review duplikat 409 · review sebelum COMPLETED 409
- **M7**: 0 kerentanan kritis · semua webhook test pass · 5 smoke test pass · production checklist terpenuhi
