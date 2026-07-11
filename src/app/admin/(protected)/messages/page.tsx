import { createClient } from "@/lib/supabase/server";
import { MessagesAdmin } from "@/components/admin/MessagesAdmin";

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="w-full py-10 flex items-center justify-center text-sm font-medium text-red-400 bg-red-500/5 rounded-2xl border border-red-500/10 backdrop-blur-md">
        حصل خطأ في تحميل الرسائل: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      {/* عنوان الصفحة متناسق مع باقي صفحات الإدارة */}
      <div className="pb-5 border-b border-white/5 select-none">
        <h1 className="text-2xl font-black text-white/95 tracking-tight font-display">
          إدارة <span className="text-gradient drop-shadow-[0_0_20px_rgba(140,42,255,0.15)]">الرسائل</span>
        </h1>
        <p className="text-xs text-white/40 mt-1.5 font-sans">
          استعراض، فرز، وحذف الرسائل الواردة من استمارة التواصل بالموقع.
        </p>
      </div>

      {/* مكون عرض الرسائل الفاخر */}
      <MessagesAdmin initialMessages={messages ?? []} />
    </div>
  );
}