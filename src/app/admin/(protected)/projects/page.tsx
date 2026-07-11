import { createClient } from "@/lib/supabase/server";
import { ProjectsPanel } from "@/components/admin/ProjectsAdmin";

export default async function ProjectsPage() {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        return (
            <div className="w-full py-10 flex items-center justify-center text-sm font-medium text-red-400 bg-red-500/5 rounded-2xl border border-red-500/10 backdrop-blur-md">
                حصل خطأ في تحميل المشاريع: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            {/* عنوان الصفحة المحدث بتأثير الـ Gradient المتوهج */}
            <div className="pb-5 border-b border-white/5 select-none">
                <h1 className="text-2xl font-black text-white/95 tracking-tight font-display">
                    إدارة <span className="text-gradient drop-shadow-[0_0_20px_rgba(140,42,255,0.15)]">المشاريع</span>
                </h1>
                <p className="text-xs text-white/40 mt-1.5 font-sans">
                    إضافة مشاريع جديدة، تعديل التقنيات، الروابط، وحذف أعمالك السابقة.
                </p>
            </div>

            {/* لوحة التحكم بالمشاريع المحسنة بصرياً */}
            <ProjectsPanel initialProjects={projects ?? []} />
        </div>
    );
}