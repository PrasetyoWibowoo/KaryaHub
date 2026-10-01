# 🚀 KaryaHub — Bridging Vocational Talents & Local UMKMs for Sustainable Economic Growth

> **Lomba Web Development ITASE 7.0 Entry**  
> Fokus Sustainable Development Goals: **SDG Goal 8 — Decent Work & Economic Growth**

---

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Midtrans](https://img.shields.io/badge/Midtrans-Escrow_Sandbox-00B4D8?style=for-the-badge)](https://midtrans.com/)

---

## 📌 Latar Belakang & Isu SDG 8

Sektor Usaha Mikro, Kecil, dan Menengah (UMKM) merupakan tulang punggung perekonomian lokal. Namun, lebih dari 60% UMKM mengalami kesulitan bertransisi ke ranah digital karena keterbatasan anggaran operasional untuk merekrut agensi atau profesional bertarif tinggi. Di sisi lain, ribuan mahasiswa dan lulusan vokasi IT/kreatif menghadapi hambatan *entry-level* saat memasuki dunia kerja akibat ketiadaan portofolio proyek nyata serta kualifikasi *resume* yang belum memenuhi standar **Applicant Tracking System (ATS)**.

**KaryaHub** hadir sebagai solusi digital terpadu berbasis web yang menghubungkan secara efisien dua ekosistem ini:
- **Pemberdayaan UMKM:** Membantu pemilik usaha kecil mendapatkan solusi teknologi (website, desain, digital marketing) berbiaya terjangkau melalui mekanisme *micro-job*.
- **Kesiapan Kerja Talenta Muda:** Memberikan akses proyek nyata untuk membangun portofolio serta menyediakan **AI ATS Evaluator** untuk meningkatkan daya saing kelulusan kerja.
- **Keamanan Transaksi:** Mengimplementasikan **Simulasi Escrow System** (Rekening Bersama) untuk mengeliminasi risiko penipuan baik di sisi UMKM maupun *freelancer*.

---

## ✨ Fitur Utama Platform

### 🎯 1. Fitur Sisi Talenta / Mahasiswa (Freelancer)
* **AI ATS CV Evaluator:** Pemindaian CV berbasis penyerapan teks PDF untuk menghitung persentase kelayakan (0–100%), mendeteksi kata kunci (*missing keywords*), dan memberikan rekomendasi perbaikan struktur CV.
* **Micro-Job Catalogue & Smart Search:** Pencarian lowongan proyek UMKM berfilter kategori (*Frontend, UI/UX, Graphic Design, Social Media Management*) beserta *tagging* kualifikasi *skill*.
* **Proposal Submission:** Mengirimkan penawaran harga (*bidding*), estimasi waktu pengerjaan, dan *cover letter*.
* **Work Deliverable & Wallet Dashboard:** Fitur penyerahan hasil kerja (tautan *repository* / file) serta pemantauan akumulasi pendapatan *escrow*.

### 🏬 2. Fitur Sisi UMKM (Employer)
* **Project Posting Management:** Formulir publikasi kebutuhan proyek dengan pengaturan anggaran dan batas waktu pengerjaan.
* **Talent Selection with ATS Score:** Meninjau daftar pelamar lengkap dengan indikator skor ATS CV pelamar untuk menjamin kualitas pengerjaan.
* **Midtrans Escrow Deposit:** Penguncian dana ke rekening penampung sistem saat proyek dimulai.
* **Review & Approval System:** Pemeriksaan *deliverables* hasil pengerjaan *freelancer* sebelum mengonfirmasi pencairan dana (*release payment*).

### 🏆 3. Fitur Khusus Penilaian Lomba (Judge-Friendly Features)
* **Role Quick-Switcher:** Tombol navigasi cepat pada antarmuka untuk beralih antara akun *UMKM Demo* dan *Freelancer Demo* tanpa perlu melalui proses registrasi ulang.
* **Presetted Demo CV:** Opsi *satu-klik* untuk menguji modul ATS Evaluator tanpa wajib mengunggah dokumen pribadi.

---

## 🏗️ Arsitektur & Tech Stack

```text
  [ Frontend (Next.js App Router) ]
                │
     (Server Actions / Fetch API)
                │
  [ Backend Services (Route Handlers) ]
       ├── ATS Parser Engine
       ├── Midtrans Snap SDK (Payment Gateway)
       └── Prisma ORM Client
                │
  [ Database (PostgreSQL Cloud via Supabase / Neon) ]
