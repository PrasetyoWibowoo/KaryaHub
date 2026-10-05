import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-base">
      <Card className="w-full max-w-md p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-sm bg-navy-950 text-lime-500 font-extrabold flex items-center justify-center text-sm">
              K
            </div>
            <span className="text-xl font-extrabold text-navy-950">
              Karya<span className="text-lime-500">Hub</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-navy-950">Masuk ke Akun</h1>
          <p className="text-xs text-text-secondary">
            Akses portofolio, lamaran aktif, dan hasil scan ATS kamu.
          </p>
        </div>

        <form className="space-y-4">
          <Input label="Alamat Email" type="email" placeholder="nama@email.com" required />
          <Input label="Kata Sandi" type="password" placeholder="••••••••" required />

          <Button type="submit" variant="primary" size="md" className="w-full font-bold">
            Masuk
          </Button>
        </form>

        <div className="text-center text-xs text-text-secondary pt-2 border-t border-border-default/60">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-navy-950 hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </Card>
    </div>
  );
}
