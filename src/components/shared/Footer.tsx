import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-md">
            <div className="flex -space-x-4 mb-6">
              <div className="w-16 h-20 bg-white border border-border rounded-xl shadow-sm rotate-[-10deg] flex items-center justify-center z-10"><FileText className="text-text-muted" /></div>
              <div className="w-16 h-20 bg-white border border-border rounded-xl shadow-sm rotate-[10deg] flex items-center justify-center"><FileText className="text-text-muted" /></div>
            </div>
            <h2 className="font-display text-4xl font-bold text-text-heading tracking-tight leading-tight">
              Temukan Peluang <span className="text-text-muted">yang</span><br/>
              <span className="text-text-muted">Relevan</span> untuk Anda
            </h2>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full px-6">Ikuti Kami</Button>
            <Button variant="primary" className="rounded-full px-6" asChild><Link href="/register">Daftar Sekarang</Link></Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-text-muted pt-6 border-t border-border uppercase tracking-widest">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-text-heading transition-colors">Legal</Link>
            <Link href="#" className="hover:text-text-heading transition-colors">Ketentuan Pengguna</Link>
            <Link href="#" className="hover:text-text-heading transition-colors">Kebijakan Privasi</Link>
          </div>
          <div>
            © 2026 KaryaHub. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
