export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-main mb-4">404</h1>
        <p className="text-text-muted mb-6">Halaman tidak ditemukan</p>
        <a href="/" className="text-primary hover:underline">
          Kembali ke beranda
        </a>
      </div>
    </div>
  )
}

