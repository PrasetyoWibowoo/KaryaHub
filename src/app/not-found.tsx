import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-bg-base">
      <div className="h-12 w-12 rounded-sm bg-navy-950 text-lime-500 font-extrabold flex items-center justify-center text-xl mb-4">
        K
      </div>
      <h1 className="text-3xl font-extrabold text-navy-950">404 — Halaman Tidak Ditemukan</h1>
      <p className="mt-2 text-sm text-text-secondary max-w-sm">
        Halaman yang kamu cari mungkin telah dipindahkan atau belum tersedia.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="primary" size="md">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}
