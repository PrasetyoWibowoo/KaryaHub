"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { 
  Send, 
  Search, 
  Paperclip, 
  Smile, 
  ShieldCheck, 
  CheckCheck, 
  ArrowLeft,
  Circle,
  ExternalLink,
  Briefcase,
  FileCode2,
  Sparkles
} from "lucide-react"

export interface ChatMessage {
  id: string
  sender: "me" | "them" | "system"
  text: string
  time: string
  attachment?: {
    title: string
    url: string
    type: "github" | "figma" | "doc"
  }
}

export interface ChatThread {
  id: string
  name: string
  avatar: string
  roleSubtitle: string
  projectTitle: string
  budget: string
  online: boolean
  unreadCount: number
  lastMessage: string
  lastMessageTime: string
  messages: ChatMessage[]
}

const UMKM_THREADS: ChatThread[] = [
  {
    id: "john-doe",
    name: "John Doe",
    avatar: "JD",
    roleSubtitle: "Full Stack Developer",
    projectTitle: "Website Redesign & E-Commerce",
    budget: "Rp 5.000.000",
    online: true,
    unreadCount: 1,
    lastMessage: "Fitur keranjang dan integrasi payment sudah siap di-review.",
    lastMessageTime: "14:20",
    messages: [
      {
        id: "m1",
        sender: "system",
        text: "🔒 Rekening Bersama (Escrow) Aktif: Dana Rp 5.000.000 telah diamankan di sistem.",
        time: "1 Okt 2024"
      },
      {
        id: "m2",
        sender: "them",
        text: "Halo Bapak/Ibu dari TechStartup! Saya sudah mulai pengerjaan perombakan antarmuka website.",
        time: "09:30"
      },
      {
        id: "m3",
        sender: "me",
        text: "Halo John! Siap, tolong prioritaskan alur checkout agar mobile-friendly ya.",
        time: "10:15"
      },
      {
        id: "m4",
        sender: "them",
        text: "Sudah saya selesaikan untuk modul checkout dan integrasi sandbox Midtrans. Berikut pull request terbarunya:",
        time: "14:18",
        attachment: {
          title: "Pull Request #14 - Modul Checkout & Sandbox Midtrans",
          url: "https://github.com/example/karyahub-store/pull/14",
          type: "github"
        }
      },
      {
        id: "m5",
        sender: "them",
        text: "Fitur keranjang dan integrasi payment sudah siap di-review.",
        time: "14:20"
      }
    ]
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    avatar: "JS",
    roleSubtitle: "Mobile App Engineer",
    projectTitle: "Mobile App Toko Mitra UMKM",
    budget: "Rp 8.000.000",
    online: true,
    unreadCount: 0,
    lastMessage: "APK staging v0.4 sudah diunggah, silakan dicoba login akun tester.",
    lastMessageTime: "Kemarin",
    messages: [
      {
        id: "j1",
        sender: "system",
        text: "🔒 Rekening Bersama (Escrow) Aktif: Dana Rp 8.000.000 telah diamankan di sistem.",
        time: "28 Sep 2024"
      },
      {
        id: "j2",
        sender: "them",
        text: "Halo! Saya sudah menyiapkan setup awal arsitektur React Native untuk aplikasi Toko Mitra.",
        time: "Kemarin, 11:00"
      },
      {
        id: "j3",
        sender: "them",
        text: "APK staging v0.4 sudah diunggah, silakan dicoba login akun tester.",
        time: "Kemarin, 16:40",
        attachment: {
          title: "Build APK Staging v0.4.0 (Expo)",
          url: "https://expo.dev/artifacts/build-0.4.0.apk",
          type: "doc"
        }
      }
    ]
  },
  {
    id: "alex-johnson",
    name: "Alex Johnson",
    avatar: "AJ",
    roleSubtitle: "UI/UX & Brand Specialist",
    projectTitle: "Redesain Logo & Kemasan Kopi",
    budget: "Rp 3.500.000",
    online: false,
    unreadCount: 0,
    lastMessage: "Semua varian rasa sudah selesai dan siap cetak ya Pak.",
    lastMessageTime: "09:15",
    messages: [
      {
        id: "a1",
        sender: "system",
        text: "🔒 Rekening Bersama (Escrow) Aktif: Dana Rp 3.500.000 telah diamankan di sistem.",
        time: "5 Okt 2024"
      },
      {
        id: "a2",
        sender: "them",
        text: "Berikut master file Figma untuk kemasan standing pouch kopi dan panduan warna CMYK untuk percetakan.",
        time: "09:12",
        attachment: {
          title: "Figma Master Design & Print Vector",
          url: "https://figma.com/file/demo-packaging-coffee",
          type: "figma"
        }
      },
      {
        id: "a3",
        sender: "them",
        text: "Semua varian rasa sudah selesai dan siap cetak ya Pak.",
        time: "09:15"
      }
    ]
  }
]

const FREELANCER_THREADS: ChatThread[] = [
  {
    id: "toko-berkah-jaya",
    name: "Toko Berkah Jaya",
    avatar: "TB",
    roleSubtitle: "Bpk. H. Rahmat (Owner)",
    projectTitle: "Desain UI/UX Aplikasi Mobile",
    budget: "Rp 5.000.000",
    online: true,
    unreadCount: 1,
    lastMessage: "Desain prototype-nya sangat bagus! Tolong perbesar tombol checkout ya.",
    lastMessageTime: "11:05",
    messages: [
      {
        id: "f1",
        sender: "system",
        text: "🔒 Escrow Aktif: Klien Toko Berkah Jaya telah mendepositkan Rp 5.000.000 ke rekening penampung KaryaHub.",
        time: "2 Okt 2024"
      },
      {
        id: "f2",
        sender: "them",
        text: "Halo mas John, kami membutuhkan desain toko online yang simpel agar pelanggan lansia juga gampang belanja.",
        time: "09:00"
      },
      {
        id: "f3",
        sender: "me",
        text: "Siap Pak Rahmat! Saya buatkan font ukuran kontras dan navigasi minimalis.",
        time: "09:30"
      },
      {
        id: "f4",
        sender: "them",
        text: "Desain prototype-nya sangat bagus! Tolong perbesar tombol checkout ya.",
        time: "11:05"
      }
    ]
  },
  {
    id: "mebel-jati-mas",
    name: "Mebel Jati Mas",
    avatar: "MJ",
    roleSubtitle: "Ibu Kartika (Owner)",
    projectTitle: "Website Company Profile Furniture",
    budget: "Rp 7.500.000",
    online: false,
    unreadCount: 0,
    lastMessage: "Foto katalog baru kayu jati sudah kami upload di Google Drive.",
    lastMessageTime: "Kemarin",
    messages: [
      {
        id: "f5",
        sender: "system",
        text: "🔒 Escrow Aktif: Klien Mebel Jati Mas telah mendepositkan Rp 7.500.000 ke rekening penampung KaryaHub.",
        time: "28 Sep 2024"
      },
      {
        id: "f6",
        sender: "them",
        text: "Foto katalog baru kayu jati sudah kami upload di Google Drive.",
        time: "Kemarin, 14:15"
      },
      {
        id: "f7",
        sender: "me",
        text: "Terima kasih Bu Kartika, segera saya integrasikan ke halaman produk Next.js.",
        time: "Kemarin, 14:30"
      }
    ]
  },
  {
    id: "warung-mitra-sejahtera",
    name: "Warung Mitra Sejahtera",
    avatar: "WM",
    roleSubtitle: "Bpk. Hendra (Owner)",
    projectTitle: "Sistem Inventory & POS Web",
    budget: "Rp 12.000.000",
    online: true,
    unreadCount: 0,
    lastMessage: "Besok pagi jam 10 kita demo thermal printer di cabang ya mas.",
    lastMessageTime: "08:30",
    messages: [
      {
        id: "f8",
        sender: "system",
        text: "🔒 Escrow Aktif: Klien Warung Mitra Sejahtera telah mendepositkan Rp 12.000.000 ke rekening penampung KaryaHub.",
        time: "15 Sep 2024"
      },
      {
        id: "f9",
        sender: "them",
        text: "Besok pagi jam 10 kita demo thermal printer di cabang ya mas.",
        time: "08:30"
      }
    ]
  }
]

interface DashboardInboxViewProps {
  role: "umkm" | "freelancer"
  defaultContactId?: string
}

export function DashboardInboxView({ role, defaultContactId }: DashboardInboxViewProps) {
  const [threads, setThreads] = useState<ChatThread[]>(role === "umkm" ? UMKM_THREADS : FREELANCER_THREADS)
  const [activeThreadId, setActiveThreadId] = useState<string>(
    defaultContactId && threads.some(t => t.id === defaultContactId)
      ? defaultContactId
      : threads[0]?.id || ""
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0]

  const filteredThreads = threads.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeThread?.messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    const now = new Date()
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: messageInput.trim(),
      time: timeString
    }

    setThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          lastMessage: messageInput.trim(),
          lastMessageTime: timeString,
          messages: [...t.messages, newMessage]
        }
      }
      return t
    }))

    setMessageInput("")
  }

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="border-b border-border/80 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/60 text-indigo-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pesan & Komunikasi Proyek</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-text-heading tracking-tight">
            Inbox Pesan Proyek
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            {role === "umkm"
              ? "Koordinasi langsung dengan freelancer yang sedang mengerjakan proyek Anda."
              : "Komunikasi dan serahkan progress proyek kepada pelaku UMKM klien Anda."}
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <Card hover={false} className="p-0 overflow-hidden shadow-soft border-border grid grid-cols-1 md:grid-cols-12 min-h-[580px] h-[calc(100vh-220px)] max-h-[720px] bg-surface">
        {/* Left Column: Threads List (4 cols) */}
        <div className="md:col-span-4 border-r border-border flex flex-col h-full bg-surface-alt/40">
          {/* Search Bar */}
          <div className="p-3.5 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder={role === "umkm" ? "Cari freelancer / proyek..." : "Cari klien UMKM..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs bg-surface border border-border rounded-xl text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {filteredThreads.length === 0 ? (
              <p className="text-xs text-text-muted text-center py-8">Tidak ada obrolan ditemukan.</p>
            ) : (
              filteredThreads.map((thread) => {
                const isActive = thread.id === activeThread?.id
                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full p-3.5 text-left transition-all flex items-start gap-3 hover:bg-surface-alt ${
                      isActive ? "bg-slate-100/90 shadow-xs" : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                        {thread.avatar}
                      </div>
                      {thread.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p className="text-xs font-bold text-text-heading truncate">
                          {thread.name}
                        </p>
                        <span className="text-[10px] text-text-muted shrink-0">
                          {thread.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-indigo-700 font-medium truncate mb-1">
                        {thread.projectTitle}
                      </p>
                      <p className="text-[11px] text-text-muted truncate">
                        {thread.lastMessage}
                      </p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Room (8 cols) */}
        {activeThread ? (
          <div className="md:col-span-8 flex flex-col h-full bg-surface">
            {/* Chat Room Header */}
            <div className="p-3.5 px-5 border-b border-border flex items-center justify-between gap-3 bg-surface/90 backdrop-blur-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    {activeThread.avatar}
                  </div>
                  {activeThread.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-text-heading truncate">{activeThread.name}</h3>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 font-medium">
                      {activeThread.online ? "Online" : "Offline"}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="w-3 h-3 text-indigo-600" />
                    <span>{activeThread.projectTitle}</span>
                    <span>•</span>
                    <strong className="text-text-heading">{activeThread.budget}</strong>
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-[11px] hidden sm:inline">Escrow Diamankan</span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-surface-alt/20">
              {activeThread.messages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{msg.text}</span>
                      </div>
                    </div>
                  )
                }

                const isMe = msg.sender === "me"

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-soft ${
                        isMe
                          ? "bg-text-heading text-white rounded-br-none"
                          : "bg-surface border border-border text-text-heading rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Attachment preview if present */}
                      {msg.attachment && (
                        <div className={`mt-2.5 p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                          isMe ? "bg-white/10 border-white/20 text-white" : "bg-surface-alt border-border text-text-heading"
                        }`}>
                          <div className="flex items-center gap-2 min-w-0">
                            <FileCode2 className="w-4 h-4 shrink-0 text-indigo-400" />
                            <span className="text-[11px] font-medium truncate">{msg.attachment.title}</span>
                          </div>
                          <a
                            href={msg.attachment.url}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
                            title="Buka link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}

                      <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isMe ? "text-white/70" : "text-text-muted"
                      }`}>
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-surface flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMessageInput((prev) =>
                    prev
                      ? `${prev} 📎 [Lampiran: deliverable_dokumen.pdf]`
                      : "📎 [Lampiran: deliverable_dokumen.pdf] "
                  )
                }}
                className="p-2 rounded-xl text-text-muted hover:text-text-heading hover:bg-surface-alt transition-colors"
                title="Lampirkan Dokumen / File"
              >
                <Paperclip className="w-4 h-4 text-slate-500" />
              </button>

              <input
                type="text"
                placeholder={
                  role === "umkm"
                    ? `Ketik pesan untuk ${activeThread.name}...`
                    : `Ketik pesan untuk klien ${activeThread.name}...`
                }
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 h-10 px-3.5 text-xs bg-surface-alt border border-border rounded-xl text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />

              <Button
                type="submit"
                variant="black"
                size="sm"
                className="h-10 px-4 shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                <span>Kirim</span>
              </Button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 flex items-center justify-center p-8 text-center text-text-muted text-xs">
            Pilih kontak obrolan di sebelah kiri untuk memulai percakapan.
          </div>
        )}
      </Card>
    </div>
  )
}
