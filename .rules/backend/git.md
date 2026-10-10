# git.md — Aturan Git

> Dokumen arsitektur tidak mendefinisikan alur Git. Aturan di bawah adalah default aman. Jika tim sudah punya konvensi lain, konvensi tim menang — tanyakan ke manusia.

## 1. Branch

- `main` selalu deployable. NEVER commit langsung ke `main`.
- Satu branch per tugas: `feat/<milestone>-<deskripsi>`, `fix/<deskripsi>`, `chore/<deskripsi>`.
  Contoh: `feat/m3-escrow-charge`.
- Branch pendek umurnya. Rebase/merge `main` secara berkala.

## 2. Commit

- Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Satu commit = satu perubahan logis. Pesan menjelaskan APA dan KENAPA.
- Perubahan `schema.prisma` + file migrasi dalam commit yang sama.
- Perubahan area berisiko (escrow, webhook, auth) dipisah dari refactor lain.

## 3. Yang TIDAK Boleh Di-commit

- `.env`, `.env.local`, kunci/secret apapun, dump database, file CV asli.
- `console.log` debug, kode di-comment yang tidak terpakai, file sementara.
- `node_modules`, build output.
- Jika secret ter-commit: STOP, laporkan, rotasi secret. Menghapus di commit berikutnya TIDAK cukup.

Pastikan `.gitignore` mencakup `.env*` (kecuali `.env.example`).

## 4. Sebelum Commit / PR

- [ ] `bun run typecheck` → 0 error
- [ ] Test terkait lolos (jalankan nyata, bukan klaim)
- [ ] Tidak ada secret / `console.log`
- [ ] Migrasi (jika ada) sudah dibuat dan diuji lokal
- [ ] Sesuai `.rules/*`
- [ ] Deskripsi PR: ringkasan, milestone, cara uji, risiko

## 5. Perilaku Agent

- NEVER `git push --force` ke branch bersama, `git reset --hard` pada pekerjaan orang lain, atau menghapus branch tanpa diminta.
- NEVER mengubah riwayat yang sudah di-push.
- Jangan commit/push otomatis kecuali diminta. Tunjukkan diff dan ringkasan terlebih dahulu.
- Jangan melewati hook (`--no-verify`) tanpa persetujuan eksplisit.
- Perubahan di luar lingkup tugas (reformat massal, rename luas) → pisah PR dan minta persetujuan.

## 6. Deploy

- Vercel build command: `bunx prisma migrate deploy && next build`.
- Production hanya dari `main` setelah checklist deployment terpenuhi (lihat `security.md` dan `testing.md`).
