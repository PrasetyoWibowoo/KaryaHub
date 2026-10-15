# dependencies.md — Aturan Dependency

> Rujukan: `backend.md`, `security.md`, `git.md`.

## 1. Package Manager

- Gunakan **Bun** saja: `bun add`, `bun remove`, `bun run`, `bunx`.
- NEVER `npm install` / `yarn` / `pnpm`. Jangan membuat atau mengubah lockfile lain.
- Commit lockfile Bun bersama perubahan dependency.

## 2. Dependency yang Sudah Ditetapkan

Next.js 15+, React, TypeScript, Tailwind, Prisma 7 (+ PrismaPg adapter), Auth.js v5, Zod, Midtrans (Snap), Supabase client (Storage), `unpdf`.

Pakai yang ini. Jangan memperkenalkan alternatif yang tumpang tindih (mis. ORM lain, library validasi lain, library PDF lain, `pdf-parse`, `axios` bila `fetch` cukup).

## 3. Sebelum Menambah Dependency Baru

Jawab semua pertanyaan ini dan sampaikan ke manusia SEBELUM menginstal:
1. Apakah fitur bisa dibuat dengan stack yang ada / API standar (`fetch`, `crypto`)?
2. Apakah paket benar-benar ada di registry dan namanya persis? Verifikasi, jangan menebak nama paket.
3. Maintained? (rilis terakhir, jumlah pemakai, isu keamanan terbuka)
4. Lisensi kompatibel?
5. Ukuran/dampak ke bundle dan cold start Vercel?
6. Jalan di runtime yang dipakai (Node runtime Route Handler)?

Tanpa persetujuan manusia → jangan tambah.

## 4. Versi & Keamanan

- Pin versi (tanpa `latest`). Jangan upgrade major tanpa persetujuan.
- Jangan menjalankan script instalasi dari sumber tak dikenal.
- Jalankan audit dependency (`bun audit` bila tersedia) sebelum rilis. Kerentanan kritis = blocker.
- Hapus dependency yang tidak dipakai.

## 5. Midtrans & Library Pihak Ketiga

- Nama paket klien Midtrans TIDAK disebut di dokumen arsitektur. Verifikasi paket resmi yang benar dan minta konfirmasi manusia sebelum menginstal.
- Bungkus integrasi pihak ketiga di `lib/*` (`midtrans.ts`, `storage.ts`) supaya mudah diganti dan diuji. Jangan impor SDK langsung di route handler.
- Jangan menulis ulang kode library (mis. verifikasi signature custom bila SDK menyediakan, kecuali sesuai rumus yang dijelaskan di `security.md`).
