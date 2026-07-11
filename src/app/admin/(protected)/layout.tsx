import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div 
      className="min-h-screen flex flex-row bg-[#030014] w-full relative overflow-hidden" 
      dir="rtl"
    >
      {/* الـ Sidebar الثابت من جهة اليسار/اليمين بناءً على الـ RTL */}
      <Sidebar />

      {/* المحتوى الرئيسي بلوحة الإدارة (Glass Main Container) */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto h-screen bg-transparent relative z-10 animate-in fade-in duration-700">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}