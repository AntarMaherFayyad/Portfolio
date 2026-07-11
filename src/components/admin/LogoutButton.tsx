"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function LogoutButton() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        if (isLoggingOut) return;

        setIsLoggingOut(true);
        const supabase = createClient();

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            toast.success("تم تسجيل الخروج بنجاح");
            router.push("/admin/login");
            router.refresh();
        } catch (error) {
            toast.error("حدث خطأ أثناء تسجيل الخروج، حاول مرة أخرى");
            setIsLoggingOut(false);
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 group bg-red-500/5 text-red-400 border border-red-500/10 hover:bg-red-500/15 hover:text-red-300 hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]"
        >
            {isLoggingOut ? (
                <Loader2 className="size-4 animate-spin text-red-400" />
            ) : (
                <LogOut className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 text-red-400 group-hover:text-red-300" />
            )}
            <span className="tracking-wide font-sans">
                {isLoggingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
            </span>
        </button>
    );
}