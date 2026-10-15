# 🚀 KaryaHub — Bridging Vocational Talents & Local UMKMs for Sustainable Economic Growth

> **Lomba Web Development ITASE 7.0 Entry**  
> Fokus Sustainable Development Goals: **SDG Goal 8 — Decent Work & Economic Growth**  
> Live Demo: [karya-hub-dashboard-preview.vercel.app](https://karya-hub-dashboard-preview.vercel.app/) | Repository: [github.com/PrasetyoWibowoo/KaryaHub](https://github.com/PrasetyoWibowoo/KaryaHub)

---

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)]([https://nextjs.org/](https://nextjs.org/))
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql)](https://supabase.com/)
[![Midtrans](https://img.shields.io/badge/Midtrans-Escrow_Sandbox-00B4D8?style=for-the-badge)](https://midtrans.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 📌 Latar Belakang & Isu SDG 8

Sektor Usaha Mikro, Kecil, dan Menengah (UMKM) merupakan tulang punggung perekonomian Indonesia. Namun, lebih dari **60% UMKM mengalami kesulitan bertransisi ke ranah digital** karena keterbatasan anggaran operasional untuk merekrut agensi atau profesional bertarif tinggi. Di sisi lain, ribuan mahasiswa dan lulusan vokasi IT/kreatif menghadapi hambatan *entry-level* saat memasuki dunia kerja akibat ketiadaan portofolio proyek nyata serta kualifikasi *resume* yang belum memenuhi standar **Applicant Tracking System (ATS)**.

**KaryaHub** hadir sebagai solusi digital terpadu berbasis web yang menghubungkan secara efisien dua ekosistem ini:
- **Pemberdayaan UMKM:** Membantu pemilik usaha kecil mendapatkan solusi teknologi (website, desain, digital marketing) berbiaya terjangkau melalui mekanisme *micro-job*.
- **Kesiapan Kerja Talenta Muda:** Memberikan akses proyek nyata untuk membangun portofolio terverifikasi serta menyediakan **AI ATS Evaluator** untuk meningkatkan daya saing kelulusan kerja.
- **Keamanan Transaksi:** Mengimplementasikan **Escrow System (Rekening Bersama Midtrans)** untuk mengeliminasi risiko penipuan baik di sisi UMKM maupun *freelancer*.

---

## ✨ Fitur Utama Platform

### 🎯 1. Fitur Sisi Talenta / Mahasiswa (Freelancer)
- **AI ATS CV Evaluator:** Pemindaian CV berbasis ekstraksi teks PDF untuk menghitung persentase kelayakan (0–100%), mendeteksi kata kunci (*missing keywords*), dan memberikan saran perbaikan struktur CV.
- **Portofolio Terverifikasi & Manajemen Dokumen:** Penyimpanan terpusat untuk *Cover Letter*, CV (PDF/DOC), dan galeri hasil karya nyata (*real work*) yang terverifikasi untuk meningkatkan kredibilitas di mata UMKM.
- **Micro-Job Catalogue & Smart Search:** Pencarian lowongan proyek UMKM berfilter kategori (*Frontend, UI/UX, Graphic Design, Social Media Management*) beserta *tagging* kualifikasi *skill*.
- **Proposal Submission:** Mengirimkan penawaran harga (*bidding*), estimasi waktu pengerjaan, dan *cover letter*.
- **Live Chat & Negotiation:** Ruang obrolan terintegrasi waktu nyata untuk berdiskusi dengan UMKM sebelum atau saat proyek berlangsung.
- **Work Deliverable & Wallet Dashboard:** Fitur penyerahan hasil kerja (tautan *repository* / file) serta pemantauan status pencairan dana *escrow*.

### 🏬 2. Fitur Sisi UMKM (Employer)
- **Project Posting Management:** Formulir publikasi kebutuhan proyek dengan pengaturan anggaran, kategori, dan batas waktu pengerjaan.
- **Talent Selection with ATS & Portfolio:** Meninjau daftar pelamar lengkap dengan indikator skor ATS CV dan portofolio pelamar untuk menjamin kualitas pengerjaan.
- **Midtrans Escrow Deposit:** Penguncian dana ke rekening penampung sistem (Midtrans Snap API) saat proposal diterima.
- **Real-time Chat:** Fitur wawancara dan koordinasi revisi proyek langsung di dalam platform.
- **Review & Approval System:** Pemeriksaan *deliverables* hasil pengerjaan *freelancer* sebelum mengonfirmasi pencairan dana (*release payment*).

### 🏆 3. Fitur Khusus Penilaian Lomba (Judge-Friendly Features)
- **Role Quick-Switcher:** Tombol navigasi cepat pada antarmuka untuk beralih antara akun *UMKM Demo* dan *Freelancer Demo* tanpa perlu melalui proses registrasi ulang.
- **Presetted Demo CV:** Opsi *satu-klik* untuk menguji modul ATS Evaluator tanpa wajib mengunggah dokumen pribadi.

---

## 🏗️ Arsitektur & Tech Stack

```text
  [ Frontend (Next.js App Router & Tailwind CSS) ]
                        │
             (Server Actions / Fetch API)
                        │
  [ Backend Services (Route Handlers) ]
       ├── AI ATS Parser Engine
       ├── Real-time Chat Controller
       ├── Midtrans Snap SDK (Payment Gateway)
       └── Prisma ORM Client
                        │
  [ Database (PostgreSQL Cloud via Supabase) ]
```

### Detail Teknologi:
- **Frontend Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS (Custom Dark Mode `#0D0E12` & Accent `#13EB5B`), Radix UI, Framer Motion, Lucide React
- **Database & ORM:** PostgreSQL (Supabase Cloud) dengan Prisma ORM
- **Payment Gateway:** Midtrans Snap API (Escrow Simulation)
- **Deployment:** Vercel

---

## 🗄️ Skema Database (Prisma Models)

Database KaryaHub terdiri dari **16 model relasional** yang saling terhubung:

1. **`User` & `Profile`:** Manajemen akun pengguna (UMKM, Freelancer, Admin) dan profil individu/perusahaan.
2. **`UserDocument` & `Portfolio`:** Penyimpanan dokumen PDF dan galeri karya.
3. **`ResumeATS`:** Riwayat scan CV dan skor ATS AI.
4. **`Skill`, `UserSkill`, & `JobSkill`:** Relasi pencocokan *skill* antara pengguna dan lowongan.
5. **`Job` & `Proposal`:** Postingan lowongan dan *bidding* proyek.
6. **`JobSubmission`:** Penyerahan file hasil kerja final.
7. **`EscrowTransaction`:** Pencatatan status pembayaran rekening bersama.
8. **`ChatRoom` & `Message`:** Sistem *chat real-time*.
9. **`Review` & `Notification`:** Sistem *rating* dan notifikasi.

---

## 📂 Struktur Direktori Proyek

```text
KaryaHub/
├── .github/                 # Workflow GitHub Actions & konfigurasi CI/CD
├── prisma/
│   ├── schema.prisma        # Definisi ERD, Model Database, dan Relasi Prisma
│   └── seed.ts              # Script seeder untuk data awal demo
├── public/                  # Aset statis (Logo, Icon, Ilustration)
├── src/
│   ├── app/                 # NEXT.JS APP ROUTER
│   │   ├── (auth)/          # Route Group Otentikasi (/login, /register)
│   │   ├── (dashboard)/     # Route Group Terlindungi (/umkm, /freelancer)
│   │   ├── api/             # API Route Handlers (/api/midtrans, /api/chat, dll)
│   │   ├── jobs/            # Katalog Lowongan Proyek & Filter (/jobs)
│   │   ├── favicon.ico
│   │   ├── globals.css      # Custom Tailwind Directives & CSS Variables
│   │   ├── layout.tsx       # Root Layout & Font Configurations
│   │   └── page.tsx         # Landing Page Publik
│   ├── components/          # REUSABLE UI COMPONENTS (Atomic Design)
│   │   ├── ui/              # Atom: Button, Input, Card, Badge, FadeIn
│   │   ├── jobs/            # Molekul: JobCard, ProposalForm, ATSResultCard
│   │   ├── chat/            # Molekul: ChatBox, MessageList
│   │   └── layout/          # Organisme: Navbar, Footer, Sidebar Dashboard
│   ├── lib/                 # UTILITY & CONFIGURATION
│   │   ├── prisma.ts        # Singleton Prisma Client Instance
│   │   ├── midtrans.ts      # Konfigurasi Midtrans Snap SDK
│   │   └── utils.ts         # Utility Helper (Format Rupiah, Tailwind Merge)
│   ├── types/               # TypeScript Definitions & Interfaces
│   └── hooks/               # Custom React Hooks
├── .env.example             # Template Variabel Lingkungan
├── .gitignore               # Aturan Pengecualian Git
├── middleware.ts            # Proteksi Routing Berdasarkan Role
├── next.config.ts           # Konfigurasi Next.js
└── tailwind.config.ts       # Konfigurasi Design System & Warna Custom
```

---

## 🚀 Panduan Instalasi Lokal (Bagi Juri & Penguji)

Ikuti langkah-langkah berikut untuk menjalankan proyek KaryaHub secara lokal:

### 1. Prerequisites
Pastikan komputer Anda telah terpasang:
- Node.js versi 18.x atau lebih baru
- npm, yarn, pnpm, atau bun

### 2. Clone Repositori
```bash
git clone https://github.com/PrasetyoWibowoo/KaryaHub.git
cd KaryaHub
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan lengkapi konfigurasi variabel berikut:
```env
# Supabase PostgreSQL Connection String
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Midtrans Gateway Keys
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxxxxxxxxxx"
MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxxxxxxxxxx"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxxxxxxxxxx"

# Next.js App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Inisialisasi Database (Prisma)
Sinkronkan skema tabel ke database Supabase Anda dan hasilkan Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

*(Opsional)* Jalankan seeder untuk mengisi data awal proyek demo:
```bash
npx prisma db seed
```

### 6. Jalankan Server Development
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🤝 Percabangan Git (Branching Strategy)

Proyek ini mengadopsi standar pengembangan Git Flow:
- **`main`**: Branch stabil untuk rilis produksi (terhubung otomatis dengan Vercel).
- **`feat/*`**: Branch pengerjaan fitur baru (contoh: `feat/chat-system`).
- **`fix/*`**: Branch khusus perbaikan bug.

---

<p align="center">
  <i>Dikembangkan dengan penuh dedikasi untuk mendukung pemberdayaan UMKM lokal dan peningkatan daya saing talenta vokasi Indonesia.</i>
</p>