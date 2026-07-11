"use client";

import Link from "next/link";
import { FolderKanban, Wrench, Mail, PlusCircle, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const supabase = createClient();
        
        const [projectsRes, skillsRes, messagesRes] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("skills").select("*", { count: "exact", head: true }),
          supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false)
        ]);

        setCounts({
          projects: projectsRes.count || 0,
          skills: skillsRes.count || 0,
          unreadMessages: messagesRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
    } finally {
  setLoading(false); // 👈 استدعاء الدالة مباشرة وتطهير السطر من "loading."
}
    }

    fetchStats();
  }, []);

  const stats = [
    {
      label: "المشاريع المضافة",
      value: counts.projects,
      icon: FolderKanban,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "group-hover:border-primary/30",
      glowColor: "group-hover:shadow-[0_15px_30px_-15px_rgba(140,42,255,0.25)]",
      href: "/admin/projects",
    },
    {
      label: "المهارات المسجلة",
      value: counts.skills,
      icon: Wrench,
      color: "text-pink-400",
      bgColor: "bg-pink-500/5",
      borderColor: "group-hover:border-pink-500/30",
      glowColor: "group-hover:shadow-[0_15px_30px_-15px_rgba(236,72,153,0.25)]",
      href: "/admin/skills",
    },
    {
      label: "رسائل غير مقروءة",
      value: counts.unreadMessages,
      icon: Mail,
      color: counts.unreadMessages ? "text-red-400" : "text-emerald-400",
      bgColor: counts.unreadMessages ? "bg-red-500/5" : "bg-emerald-500/5",
      borderColor: counts.unreadMessages ? "group-hover:border-red-500/30" : "group-hover:border-emerald-500/30",
      glowColor: counts.unreadMessages ? "group-hover:shadow-[0_15px_30px_-15px_rgba(239,68,68,0.25)]" : "group-hover:shadow-[0_15px_30px_-15px_rgba(16,185,129,0.25)]",
      href: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto bg-transparent py-2 w-full animate-in fade-in duration-500" dir="rtl">
      
      {/* بنل الترحيب الزجاجي الفاخر مع توهج خلفي خافت */}
      <div className="relative overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl p-6 sm:p-8 transition-colors duration-500 hover:border-white/10 select-none">
        <div className="absolute -left-16 -top-16 size-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            مرحباً بك في لوحة{" "}
            <span className="text-gradient drop-shadow-[0_0_20px_rgba(140,42,255,0.15)]">
              التحكم 👋
            </span>
          </h1>
          <p className="text-xs md:text-sm text-white/60 max-w-md leading-relaxed font-medium font-sans">
            هنا يمكنك إدارة معرض أعمالك بالكامل، تحديث بياناتك الشخصية، ومتابعة الرسائل الواردة من زوار موقعك بمرونة تامة.
          </p>
        </div>
      </div>

      {/* بطاقات الإحصائيات التفاعلية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.href}
              className={`border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-sm transition-all duration-500 group relative overflow-hidden ${stat.borderColor} ${stat.glowColor} hover:-translate-y-1`}
            >
              <div className="space-y-1 z-10">
                <span className="text-[11px] font-mono font-semibold text-white/40 block select-none uppercase tracking-wide">
                  {stat.label}
                </span>
                <span className="text-3xl font-bold text-white/90 group-hover:text-white transition-colors tracking-tight block font-display">
                  {loading ? (
                    <span className="inline-block size-5 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
                  ) : (
                    stat.value
                  )}
                </span>
              </div>
              
              <div className={`p-3 rounded-xl border border-white/5 ${stat.bgColor} ${stat.color} transition-all duration-300 group-hover:scale-105 group-hover:border-current/20 z-10`}>
                <Icon className="size-5" />
              </div>

              {/* سهم الانتقال العلوي الجانبي */}
              <ArrowUpRight className="size-3.5 absolute top-3 left-3 text-white/0 group-hover:text-white/40 transition-all duration-300" />
            </Link>
          );
        })}
      </div>

      {/* لوحة الإجراءات السريعة */}
      <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl p-6 shadow-sm space-y-4 hover:border-white/10 transition-colors duration-500">
        <h2 className="text-sm md:text-base font-bold text-white/90 tracking-tight select-none font-display">إجراءات سريعة</h2>
        <div className="flex flex-wrap gap-3 select-none">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 h-10 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_15px_rgba(140,42,255,0.3)] transition-all duration-300 active:scale-95 shadow-md"
          >
            <PlusCircle className="size-4" />
            إضافة مشروع جديد
          </Link>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 px-4 h-10 border border-white/5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white hover:border-primary/20 text-xs font-semibold rounded-xl transition-all duration-300 active:scale-95"
          >
            <Mail className="size-4 text-primary" />
            صندوق الوارد
          </Link>
        </div>
      </div>
    </div>
  );
}