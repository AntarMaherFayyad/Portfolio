
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة")
    .max(255),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل")
    .max(72),
});

type Values = z.infer<typeof schema>;

export function AuthPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin");
    });
  }, [router]);

  async function onSubmit(values: Values) {
    if (busy) return;
    setBusy(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;

      toast.success("أهلاً بك مجدداً.");
      router.replace("/admin");
      router.refresh();
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message.toLowerCase().includes("credentials") ||
            e.message.toLowerCase().includes("invalid")
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : "حدث خطأ، حاول مرة أخرى"
          : "فشلت عملية تسجيل الدخول";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-[#030014] w-full" dir="rtl">

      {/* حاوية لوحة تسجيل الدخول الزجاجية الفاخرة */}
      <div className="w-full max-w-md border border-white/5 bg-white/[0.01] backdrop-blur-md shadow-[0_30px_70px_-20px_rgba(140,42,255,0.15)] rounded-2xl p-6 sm:p-8 relative z-10 hover:border-white/15 transition-all duration-500">

        <Link
          href="/"
          className="text-xs text-white/40 hover:text-primary inline-flex items-center gap-1.5 transition-colors duration-300 group mb-5 font-mono uppercase tracking-wider"
        >
          <span>العودة للموقع الرئيسي</span>
          {/* تم استخدام ArrowLeft ليتناسب انسيابياً مع اتجاه القراءة العربي RTL */}
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        </Link>

        <h1 className="text-2xl font-bold text-white/90 mb-1.5 tracking-tight font-display">
          دخول لوحة <span className="text-gradient drop-shadow-[0_0_20px_rgba(140,42,255,0.15)]">التحكم</span>
        </h1>
        <p className="text-xs text-white/60 mb-6 font-medium leading-relaxed font-sans">
          إدارة المشاريع، البيانات الشخصية، والرسائل الواردة بمرونة.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

          {/* حقل البريد الإلكتروني */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
              dir="ltr"
              autoComplete="email"
              placeholder="name@example.com"
            />
            {errors.email && (
              <span className="text-[11px] font-medium text-red-400/90 pr-0.5 mt-0.5 block" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
              كلمة المرور
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
              dir="ltr"
              autoComplete="current-password"
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-[11px] font-medium text-red-400/90 pr-0.5 mt-0.5 block" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* زر الإرسال التفاعلي */}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white text-xs md:text-sm font-semibold py-3 rounded-xl transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(140,42,255,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-md"
          >
            {busy && <Loader2 className="size-3.5 animate-spin" />}
            {busy ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}