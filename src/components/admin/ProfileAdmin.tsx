"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ImageIcon, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PersonalInfo } from "@/types/database";

export function ProfilePanel({ initialProfile }: { initialProfile: PersonalInfo }) {
    const [form, setForm] = useState({
        name: initialProfile.name,
        title: initialProfile.title,
        phone: initialProfile.phone ?? "",
        email: initialProfile.email ?? "",
        github: initialProfile.github ?? "",
        github_username: initialProfile.github_username ?? "",
        available: initialProfile.available,
        description: initialProfile.description ?? "",
        image: initialProfile.image ?? "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(form.image || null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!imageFile) return;

        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 2 ميجابايت");
            return;
        }

        setImageFile(file);
    }

    async function uploadImage(supabase: ReturnType<typeof createClient>): Promise<string | null> {
        if (!imageFile) return form.image || null;

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `profile-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(fileName, imageFile, {
                cacheControl: "3600",
                upsert: true
            });

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

            const payload = {
                name: form.name,
                title: form.title,
                phone: form.phone || null,
                email: form.email || null,
                github: form.github || null,
                github_username: form.github_username || null,
                available: form.available,
                description: form.description || null,
                image: imageUrl,
            };

            const { error } = await supabase
                .from("personal_info")
                .update(payload)
                .eq("id", initialProfile.id);

            if (error) throw error;

            setForm((prev) => ({ ...prev, image: imageUrl ?? prev.image }));
            setImageFile(null);
            toast.success("تم حفظ البيانات بنجاح");
        } catch (err) {
            const msg = err instanceof Error ? err.message : "حصل خطأ، حاول مرة أخرى";
            toast.error(msg);
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5 bg-transparent w-full" dir="rtl">

            {/* قسم إدارة الصورة الشخصية المتناسق */}
            <div className="flex items-center gap-5 p-4 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-2xl transition-all duration-500 hover:border-white/10">
                <div className="relative group size-20 rounded-xl overflow-hidden border border-white/5 bg-black/20 flex items-center justify-center shrink-0 shadow-inner">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="الصورة الشخصية"
                            className="size-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="size-6 text-white/20" />
                    )}
                </div>

                <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-mono font-semibold text-white/40 block select-none uppercase tracking-wide">
                        الصورة الشخصية
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="profile-image-upload"
                        />
                        <label
                            htmlFor="profile-image-upload"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-xl bg-white/5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-primary/30 cursor-pointer transition-all duration-300 shadow-sm active:scale-[0.98]"
                        >
                            <Upload className="size-3.5" />
                            {imageFile ? "تغيير الصورة المختارة" : "اختر صورة جديدة"}
                        </label>
                    </div>
                    <p className="text-[10px] font-sans text-white/30 font-medium">يدعم PNG أو JPG بحد أقصى 2 ميجابايت</p>
                </div>
            </div>

            {/* حقول المدخلات الرئيسية */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">الاسم</label>
                    <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 font-sans"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">المسمى الوظيفي</label>
                    <input
                        required
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 font-sans"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">الوصف الشخصي</label>
                <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 resize-none leading-relaxed font-sans"
                    placeholder="اكتب نبذة مختصرة عنك..."
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                        dir="ltr"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">رقم الهاتف</label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                        dir="ltr"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">رابط GitHub</label>
                    <input
                        type="url"
                        value={form.github}
                        onChange={(e) => setForm({ ...form, github: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                        dir="ltr"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-semibold text-white/40 pr-0.5 select-none uppercase tracking-wide">اسم مستخدم GitHub</label>
                    <input
                        type="text"
                        value={form.github_username}
                        onChange={(e) => setForm({ ...form, github_username: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white outline-none transition-all duration-300 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 text-left font-sans"
                        dir="ltr"
                    />
                </div>
            </div>

            {/* صندوق حالة التوفر الخيار الزجاجي المحسن */}
            <label className="flex items-center gap-3 text-xs md:text-sm p-3.5 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-xl cursor-pointer select-none hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 group">
                <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) => setForm({ ...form, available: e.target.checked })}
                    className="size-4 rounded border-white/10 bg-black/40 text-primary focus:ring-primary/40 accent-purple-600 cursor-pointer"
                />
                <span className="font-semibold text-white/70 group-hover:text-white transition-colors duration-300 font-sans">متاح للعمل حالياً (Available for projects)</span>
            </label>

            {/* زر الحفظ التفاعلي */}
            <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white text-xs md:text-sm font-semibold py-3 rounded-xl transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(140,42,255,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-md"
            >
                {saving && <Loader2 className="size-3.5 animate-spin" />}
                {saving ? "جاري حفظ التغييرات..." : "حفظ التغييرات"}
            </button>
        </form>
    );
}