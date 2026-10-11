'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: form.get('email') as string,
      password: form.get('password') as string,
      redirect: false,
    })

    setLoading(false)

    if (!result?.ok) {
      setError('Email atau kata sandi salah')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="email" label="Alamat Email" type="email" placeholder="nama@email.com" required />
          <Input name="password" label="Kata Sandi" type="password" placeholder="••••••••" required />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" variant="primary" size="md" className="w-full font-bold" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        <div className="text-center text-xs text-text-secondary pt-2 border-t border-border-default/60">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold text-navy-950 hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </Card>
    </div>
  )
}
