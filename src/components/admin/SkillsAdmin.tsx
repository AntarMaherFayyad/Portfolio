
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Loader2, GripVertical } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Skill } from "@/types/database";

type FormState = {
  id: number | null;
  name: string;
  level: string;
  sort_order: number;
  icon_name: string;
  level_percent: number;
  tone: string;
};

const emptyForm: FormState = {
  id: null,
  name: "",
  level: "DAILY DRIVER",
  sort_order: 0,
  icon_name: "code",
  level_percent: 90,
  tone: "#888888",
};

const ICON_OPTIONS = [
  "html5", "css3", "bootstrap", "tailwindcss", "javascript",
  "typescript", "react", "nextdotjs", "code",
];

const LEVEL_OPTIONS = [
  { value: "DAILY DRIVER", label: "الأساسية اليومية (Daily Driver)" },
  { value: "COMFORTABLE", label: "متمكن منها (Comfortable)" },
  { value: "LEARNING", label: "قيد التعلم (Learning)" },
];

export function SkillsPanel({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  function openAddForm() {
    setForm({ ...emptyForm, sort_order: skills.length + 1 });
    setIsFormOpen(true);
  }

  function openEditForm(skill: Skill) {
    setForm({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      sort_order: skill.sort_order,
      icon_name: skill.icon_name,
      level_percent: skill.level_percent,
      tone: skill.tone,
    });
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setForm(emptyForm);
  }

  function getLevelLabel(levelValue: string) {
    return LEVEL_OPTIONS.find((opt) => opt.value === levelValue)?.label.split(" (")[0] || levelValue;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    try {
      const payload = {
        name: form.name,
        level: form.level,
        sort_order: form.sort_order,
        icon_name: form.icon_name,
        level_percent: form.level_percent,
        tone: form.tone,
      };

      if (form.id) {
        const { data, error } = await supabase
          .from("skills")
          .update(payload)
          .eq("id", form.id)
          .select()
          .single();

        if (error) throw error;

        setSkills((prev) =>
          prev
            .map((s) => (s.id === form.id ? (data as Skill) : s))
            .sort((a, b) => a.sort_order - b.sort_order)
        );
        toast.success("تم تعديل المهارة بنجاح");
      } else {
        const { data, error } = await supabase
          .from("skills")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;

        setSkills((prev) =>
          [...prev, data as Skill].sort((a, b) => a.sort_order - b.sort_order)
        );
        toast.success("تم إضافة المهارة بنجاح");
      }

      closeForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حصل خطأ، حاول مرة أخرى";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(skill: Skill) {
    const confirmed = window.confirm(`متأكد إنك عايز تحذف "${skill.name}"؟`);
    if (!confirmed) return;

    const supabase = createClient();
    const { error } = await supabase.from("skills").delete().eq("id", skill.id);

    if (error) {
      toast.error("حصل خطأ أثناء الحذف");
      return;
    }

    setSkills((prev) => prev.filter((s) => s.id !== skill.id));
    toast.success("تم حذف المهارة");
  }

  return (
    <div dir="rtl" className="max-w-3xl mx-auto bg-transparent w-full">
      <div className="flex items-center justify-between mb-6 select-none">
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs md:text-sm font-semibold h-10 px-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_15px_rgba(140,42,255,0.3)] transition-all duration-300 active:scale-95 shadow-md"
        >
          <Plus className="size-4" />
          إضافة مهارة جديدة
        </button>
        <span className="text-[11px] font-mono font-bold bg-white/5 text-primary px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
          العدد الإجمالي: {skills.length}
        </span>
      </div>

      {/* قائمة استعراض المهارات الزجاجية */}
      <div className="space-y-2.5">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-sm hover:border-white/15 hover:shadow-[0_10px_20px_-10px_rgba(140,42,255,0.15)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <GripVertical className="size-4 text-white/20 cursor-grab active:cursor-grabbing group-hover:text-white/40 transition-colors shrink-0" />
              <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                <span className="font-bold text-sm text-white/90 group-hover:text-white transition-colors font-display truncate max-w-[140px] sm:max-w-none">{skill.name}</span>
                <span className="text-[10px] font-mono bg-white/5 text-white/50 px-2.5 py-0.5 rounded-md border border-white/5 font-medium transition-colors duration-300 group-hover:text-primary shrink-0">
                  {getLevelLabel(skill.level)}
                </span>
              </div>
            </div>

            <div className="flex gap-1 select-none shrink-0">
              <button
                onClick={() => openEditForm(skill)}
                className="p-2 rounded-lg text-white/40 hover:bg-white/5 hover:text-primary transition-all duration-300"
                title="تعديل المهارة"
              >
                <Pencil className="size-3.5" />
              </button>
              <button
                onClick={() => handleDelete(skill)}
                className="p-2 rounded-lg text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
                title="حذف المهارة"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl text-white/40 text-xs md:text-sm select-none font-sans">
          لم يتم إضافة مهارات بعد، ابدأ بإضافة مهارتك الأولى!
        </div>
      )}

      {/* نافذة الـ Modal لإضافة وتعديل المهارات */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="border border-white/5 bg-[#0a071e]/80 backdrop-blur-2xl shadow-[0_30px_70px_-20px_rgba(140,42,255,0.25)] rounded-2xl p-6 w-full max-w-sm relative hover:border-white/10 transition-colors duration-500">
            <div className="flex items-center justify-between mb-5 select-none">
              <h2 className="text-base font-bold text-white/90 font-display">
                {form.id ? "تعديل بيانات المهارة" : "إضافة مهارة جديدة"}
              </h2>
              <button onClick={closeForm} className="p-1.5 rounded-xl text-white/40 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all duration-300">
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
                  اسم المهارة
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: React, Node.js"
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
                  مستوى الإتقان
                </label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 cursor-pointer [&>option]:bg-[#0a071e] [&>option]:text-white font-sans"
                >
                  {LEVEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
                  ترتيب العرض
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: Number(e.target.value) })
                  }
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
                  الأيقونة
                </label>
                <select
                  value={form.icon_name}
                  onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 cursor-pointer [&>option]:bg-[#0a071e] [&>option]:text-white font-sans"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
                    النسبة %
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.level_percent}
                    onChange={(e) => setForm({ ...form, level_percent: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                    dir="ltr"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">
                    اللون
                  </label>
                  <input
                    type="text"
                    value={form.tone}
                    onChange={(e) => setForm({ ...form, tone: e.target.value })}
                    placeholder="#e34f26"
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* زر الحفظ التفاعلي */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white text-xs md:text-sm font-semibold py-3 rounded-xl transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(140,42,255,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-md"
              >
                {saving && <Loader2 className="size-3.5 animate-spin" />}
                {saving ? "جاري الحفظ..." : "حفظ المهارة"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}