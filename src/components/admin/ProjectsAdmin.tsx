
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Loader2, ImageIcon, Upload, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types/database";

type FormState = {
  id: number | null;
  name: string;
  description: string;
  tech: string;
  live_demo: string;
  github: string;
  image: string;
};

const emptyForm: FormState = {
  id: null,
  name: "",
  description: "",
  tech: "",
  live_demo: "",
  github: "",
  image: "",
};

export function ProjectsPanel({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(form.image || null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, form.image]);

  function openAddForm() {
    setForm(emptyForm);
    setImageFile(null);
    setIsFormOpen(true);
  }

  function openEditForm(project: Project) {
    setForm({
      id: project.id,
      name: project.name,
      description: project.description ?? "",
      tech: project.tech?.join(", ") ?? "",
      live_demo: project.live_demo ?? "",
      github: project.github ?? "",
      image: project.image ?? "",
    });
    setImageFile(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setForm(emptyForm);
    setImageFile(null);
    setPreviewUrl(null);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 3 ميجابايت");
      return;
    }
    setImageFile(file);
  }

  async function uploadImage(supabase: ReturnType<typeof createClient>): Promise<string | null> {
    if (!imageFile) return form.image || null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, imageFile, { upsert: true });

    if (uploadError) {
      throw new Error("فشل رفع الصورة: " + uploadError.message);
    }

    const { data } = supabase.storage.from("project-images").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    try {
      const imageUrl = await uploadImage(supabase);

      const techArray = form.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        name: form.name,
        description: form.description || null,
        tech: techArray,
        live_demo: form.live_demo || null,
        github: form.github || null,
        image: imageUrl,
      };

      if (form.id) {
        const { data, error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", form.id)
          .select()
          .single();

        if (error) throw error;

        setProjects((prev) => prev.map((p) => (p.id === form.id ? (data as Project) : p)));
        toast.success("تم تعديل المشروع بنجاح");
      } else {
        const { data, error } = await supabase
          .from("projects")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;

        setProjects((prev) => [...prev, data as Project]);
        toast.success("تم إضافة المشروع بنجاح");
      }

      closeForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حصل خطأ، حاول مرة أخرى";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    const confirmed = window.confirm(`متأكد إنك عايز تحذف "${project.name}"؟`);
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", project.id);

    if (error) {
      toast.error("حصل خطأ أثناء الحذف");
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    toast.success("تم حذف المشروع");
  }

  return (
    <div dir="rtl" className="space-y-6 bg-transparent w-full">
      <div className="flex justify-between items-center select-none">
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs md:text-sm font-semibold h-10 px-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_15px_rgba(140,42,255,0.3)] transition-all duration-300 active:scale-95 shadow-md"
        >
          <Plus className="size-4" />
          إضافة مشروع جديد
        </button>
        <span className="text-[11px] font-mono font-bold bg-white/5 text-primary px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
          المشاريع المضافة: {projects.length}
        </span>
      </div>

      {/* شبكة عرض كروت المشاريع الاحترافية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div key={project.id} className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_15px_30px_-15px_rgba(140,42,255,0.15)] transition-all duration-500 group">
            <div>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 bg-black/20 border border-white/5 shadow-inner">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <ImageIcon className="size-6 text-white/20 absolute inset-0 m-auto" />
                )}
              </div>

              <h3 className="font-bold text-base text-white/90 mb-1 group-hover:text-white transition-colors font-display">{project.name}</h3>
              <p className="text-xs text-white/60 line-clamp-2 mb-3 leading-relaxed font-sans">
                {project.description || "لا يوجد وصف لهذا المشروع."}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech && project.tech.length > 0 ? (
                  project.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono font-medium bg-white/5 text-white/50 px-2 py-0.5 rounded transition-colors duration-300 group-hover:text-primary">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] font-sans text-white/30 italic">لم تحدد تقنيات</span>
                )}
              </div>
            </div>

            <div className="flex gap-2 border-t border-white/5 pt-3 mt-auto select-none">
              <button
                onClick={() => openEditForm(project)}
                className="flex-1 h-8.5 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white hover:border-primary/30 transition-all duration-300 active:scale-[0.97]"
              >
                <Pencil className="size-3.5" />
                تعديل
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="flex-1 h-8.5 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-xl bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:text-red-300 border border-red-500/10 transition-all duration-300 active:scale-[0.97]"
              >
                <Trash2 className="size-3.5" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl text-white/40 text-xs md:text-sm select-none font-sans">
          لا توجد مشاريع مضافة بعد، ابدأ بإضافة مشروعك الأول لعرضه في المعرض.
        </div>
      )}

      {/* الـ Modal الزجاجي لإضافة وتعديل المشاريع */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="border border-white/5 bg-[#0a071e]/80 backdrop-blur-2xl shadow-[0_30px_70px_-20px_rgba(140,42,255,0.25)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4 hover:border-white/10 transition-colors duration-500">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/5 select-none">
              <h2 className="text-base font-bold text-white/90 font-display">
                {form.id ? "تعديل بيانات المشروع" : "إضافة مشروع جديد"}
              </h2>
              <button onClick={closeForm} className="p-1.5 rounded-xl text-white/40 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all duration-300">
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">اسم المشروع</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: متجر إلكتروني متكامل"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">الوصف التفصيلي</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="اشرح باختصار فكرة المشروع ومميزاته الرئيسية..."
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 resize-none leading-relaxed font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">التقنيات المستخدمة (افصل بينها بفاصلة `,` )</label>
                <input
                  type="text"
                  value={form.tech}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  placeholder="Next.js, TypeScript, Tailwind, Supabase"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide inline-flex items-center gap-1">
                    <Globe className="size-3" /> رابط المعاينة الحية
                  </label>
                  <input
                    type="url"
                    value={form.live_demo}
                    onChange={(e) => setForm({ ...form, live_demo: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                    dir="ltr"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide inline-flex items-center gap-1">
                    رابط مستودع GitHub
                  </label>
                  <input
                    type="url"
                    value={form.github}
                    onChange={(e) => setForm({ ...form, github: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                    dir="ltr"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* قسم غلاف المشروع */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none block uppercase tracking-wide">غلاف المشروع</label>

                {previewUrl && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/5 bg-black/20 shadow-inner animate-in fade-in duration-300">
                    <img src={previewUrl} alt="معاينة الغلاف" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="project-image-file"
                    className="hidden"
                  />
                  <label
                    htmlFor="project-image-file"
                    className="w-full h-10 border border-dashed border-white/10 hover:border-primary/30 rounded-xl bg-white/5 text-xs font-semibold text-white/50 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm active:scale-[0.99]"
                  >
                    <Upload className="size-3.5" />
                    {imageFile ? "تغيير الصورة المختارة" : "اختر صورة للمشروع أو اسحبها هنا"}
                  </label>
                </div>
              </div>

              {/* زر الحفظ التفاعلي للمودال */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white text-xs md:text-sm font-semibold py-3 rounded-xl transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(140,42,255,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-md"
              >
                {saving && <Loader2 className="size-3.5 animate-spin" />}
                {saving ? "جاري حفظ بيانات المشروع..." : "حفظ المشروع"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}