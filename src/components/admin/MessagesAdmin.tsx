"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Trash2, ExternalLink, CheckSquare, Square, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export function MessagesAdmin({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function toggleRead(id: number, currentRead: boolean) {
    setLoadingId(id);
    const supabase = createClient();

    const { error } = await supabase
      .from("contact_messages")
      .update({ read: !currentRead })
      .eq("id", id);

    if (error) {
      toast.error("حصل خطأ، حاول مرة أخرى");
      setLoadingId(null);
      return;
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
    );
    toast.success(currentRead ? "تم تعيين الرسالة كغير مقروءة" : "تم تعيين الرسالة كمقروءة");
    setLoadingId(null);
  }

  async function deleteMessage(id: number) {
    const confirmed = window.confirm("متأكد إنك عايز تحذف الرسالة دي؟");
    if (!confirmed) return;

    setLoadingId(id);
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);

    if (error) {
      toast.error("حصل خطأ أثناء الحذف");
      setLoadingId(null);
      return;
    }

    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success("تم حذف الرسالة بنجاح");
    setLoadingId(null);
  }

  return (
    <section dir="rtl" className="max-w-4xl mx-auto bg-transparent py-4 w-full">
      <div className="flex items-center justify-between mb-8 select-none">
        <h2 className="text-xl font-black text-white tracking-tight font-display">
          الرسائل{" "}
          <span className="text-gradient drop-shadow-[0_0_30px_rgba(140,42,255,0.15)]">
            الواردة
          </span>
        </h2>
        <span className="text-[11px] font-mono font-bold bg-white/5 text-primary px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
          إجمالي الرسائل: {messages.length}
        </span>
      </div>

      {messages.length === 0 ? (
        /* واجهة عدم وجود رسائل مع لمسة الـ Glassmorphism */
        <div className="text-sm text-white/60 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 shadow-sm select-none">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-primary">
            <Mail className="size-6" />
          </div>
          <p className="font-bold text-base text-white/90 font-display">لا توجد رسائل بعد</p>
          <p className="text-xs text-white/40 max-w-[34ch] leading-relaxed font-sans">
            صندوق الوارد الخاص بك فارغ تماماً حالياً وسيتم استقبال رسائل الـ Contact هنا.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => {
            const isItemLoading = loadingId === m.id;

            return (
              <li
                key={m.id}
                className={`border backdrop-blur-md rounded-2xl p-5 transition-all duration-500 shadow-sm hover:-translate-y-0.5
                  ${!m.read
                    ? 'border-primary/30 bg-primary/[0.02] shadow-[0_15px_30px_-15px_rgba(140,42,255,0.15)]'
                    : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                  }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0 space-y-1">
                    <div className="font-bold text-base text-white/90 flex items-center gap-2 font-display">
                      {m.name}
                      {!m.read && (
                        <span className="text-[9px] tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-gradient-to-r from-primary to-pink-500 text-white shadow-[0_0_10px_rgba(140,42,255,0.4)] uppercase">
                          جديد
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs text-primary hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 font-mono font-medium"
                    >
                      {m.email}
                      <ExternalLink className="size-3 opacity-80" />
                    </a>
                  </div>
                  <div className="text-[11px] font-mono font-medium text-white/40 shrink-0 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 backdrop-blur-md select-none">
                    {new Date(m.created_at).toLocaleDateString('ar-EG', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>

                {/* نص الرسالة مدعوم بخلفية متناسقة */}
                <p className="text-xs md:text-sm text-white/70 bg-black/20 border border-white/5 rounded-xl p-4 whitespace-pre-wrap mb-4 leading-relaxed font-sans font-normal">
                  {m.message}
                </p>

                <div className="flex justify-end gap-2 text-xs border-t border-white/5 pt-3.5 select-none">
                  {/* زر تعيين كحالة مقروءة */}
                  <button
                    onClick={() => toggleRead(m.id, m.read)}
                    disabled={isItemLoading}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-300 inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]
                      ${m.read
                        ? 'bg-white/5 hover:bg-white/10 text-white/70 border-white/5'
                        : 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 shadow-[0_0_15px_rgba(140,42,255,0.1)]'
                      }`}
                  >
                    {isItemLoading ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : m.read ? (
                      <Square className="size-3.5" />
                    ) : (
                      <CheckSquare className="size-3.5" />
                    )}
                    {m.read ? "تعيين كغير مقروء" : "تعيين كمقروء"}
                  </button>

                  <button
                    onClick={() => deleteMessage(m.id)}
                    disabled={isItemLoading}
                    className="px-3 py-2 rounded-xl bg-red-500/5 hover:bg-red-500/15 hover:text-red-300 text-red-400 border border-red-500/10 transition-all duration-300 inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                  >
                    {isItemLoading ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                    حذف
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}