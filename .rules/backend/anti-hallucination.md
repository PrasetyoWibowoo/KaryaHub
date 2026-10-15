# anti-hallucination.md — Aturan Anti-Halusinasi

> Tujuan: agent tidak mengarang. Lebih baik bertanya atau bilang "tidak tahu" daripada menebak, terutama untuk uang, auth, dan keamanan.

## 1. Sumber Kebenaran (urutan prioritas)

1. Instruksi eksplisit manusia pada sesi ini
2. `.rules/*`
3. Dokumen `KaryaHub - Backend Architecture`
4. Kode yang benar-benar ada di repo (baca dulu, jangan diingat-ingat)
5. Dokumentasi resmi library (diverifikasi, bukan dari ingatan)

Jika dua sumber bertentangan → STOP, tunjukkan konflik, minta keputusan. Jangan memilih diam-diam.

## 2. Jangan Mengarang

- Jangan mengarang nama file, fungsi, endpoint, kolom, enum, env var, script `package.json`, atau nama paket. Verifikasi keberadaannya (baca file / `ls` / `grep`) sebelum memakai.
- Jangan mengarang API library (Prisma 7, Auth.js v5, Next.js 15, Midtrans, `unpdf`, Supabase). Versi baru sering berubah. Cek dokumentasi resmi atau kode yang ada. Jika tidak bisa memverifikasi, katakan.
- Jangan mengarang angka bisnis (UMK, bobot, limit, tarif). Pakai nilai di dokumen; jika tidak ada, tanya.
- Jangan mengarang hasil: tidak ada klaim "test lolos", "build sukses", "typecheck 0 error", "sudah diuji di Sandbox Midtrans" tanpa benar-benar menjalankan dan melihat output.
- Jangan mengarang perilaku Midtrans (field, status, retry). Rujuk dokumentasi resmi Midtrans.
- Jangan mengisi celah spesifikasi dengan asumsi diam-diam.

## 3. Kapan HARUS Bertanya

- Spesifikasi ambigu atau tidak ada di dokumen (endpoint baru, field baru, role baru, aturan bisnis baru)
- Perubahan yang menyentuh uang, auth, signature, atau data pengguna dan dokumen tidak mengaturnya
- Konflik antar sumber (lihat §5)
- Perlu dependency baru, migrasi destruktif, atau perubahan kontrak API
- Instruksi manusia bertentangan dengan `.rules/*` (jelaskan konfliknya, jangan langsung menurut atau menolak)

## 4. Verifikasi Sebelum Mengklaim

Sebelum menyatakan sesuatu selesai:
1. Baca ulang kode yang diubah.
2. Jalankan `bun run typecheck` dan test terkait; sertakan hasil sebenarnya.
3. Cek tidak ada: `console.log`, secret, `passwordHash` di response, `Float` untuk uang, `employerId`/`freelancerId`/`userId`/`amount` dari body.
4. Laporkan dengan jujur tiga hal: **sudah diverifikasi**, **belum diverifikasi**, **asumsi yang dibuat**.

Pola laporan:
```
Diubah: <file>
Terverifikasi: <perintah + hasil>
Belum terverifikasi: <apa + kenapa>
Asumsi / butuh keputusan: <daftar>
```

## 5. Ketidakkonsistenan Dokumen yang Sudah Diketahui

Jangan mengikuti buta. Tandai dan tanyakan sebelum mengimplementasikan bagian terkait.

1. **Perhitungan guardrail**: contoh di dokumen menyebut budget minimal "Rp 390.350" untuk 30 jam × Rp 16.345. Hasil hitung: 16.345 × 30 = **Rp 490.350**. Hitung dengan rumus, jangan menyalin angka contoh.
2. **Nilai `UMK_HOURLY`**: Jakarta tertulis 27.350 dengan komentar "Rp 4.736.489 ÷ 173", yang menghasilkan ≈ 27.378. Nilai UMK/UMP adalah data resmi yang berubah tiap tahun. Jangan menebak. Minta manusia mengonfirmasi tabel UMK terkini sebelum dipakai di production.
3. **Pembatalan job**: state machine mengizinkan `OPEN | IN_PROGRESS → CANCELLED`, tetapi `DELETE /api/jobs/[id]` hanya untuk status `OPEN`. Alur pembatalan job `IN_PROGRESS` (termasuk `REFUNDED` untuk escrow `HELD_IN_ESCROW`) tidak punya endpoint. Jangan mengarang endpoint refund; minta keputusan.
4. **Status `capture`** Midtrans disebut di milestone (simulator: settlement, expire, deny, capture) tetapi tidak di tabel 7 skenario webhook. Jangan menentukan pemetaan `capture` (termasuk `fraud_status`) sendiri; konfirmasi.
5. **Role `ADMIN`**: muncul di matriks otorisasi tetapi `POST /api/register` hanya menerima `FREELANCER | UMKM`. Cara pembuatan ADMIN tidak didefinisikan.
6. **Cakupan data pada `DELETE`/`PATCH job`**: aturan lanjutan untuk proposal yang sudah ada saat job dibatalkan tidak didefinisikan.
7. **`jobId.slice(0, 8)`** pada `generateOrderId` bisa tabrakan teoritis bila dua job punya prefix sama di epoch yang sama; unik global dijaga oleh `@unique`. Tangani error unik (retry/409), jangan mengabaikannya.

## 6. Gaya Jawaban Agent

- Spesifik dan jujur tentang ketidakpastian: "tidak bisa memverifikasi X karena Y".
- Jangan menyatakan fakta tentang library dengan nada yakin jika tidak diverifikasi.
- Jangan menambah fitur "bonus". Kerjakan yang diminta dalam lingkup milestone aktif.
- Jangan mengubah file `.rules/*` kecuali diminta manusia.
