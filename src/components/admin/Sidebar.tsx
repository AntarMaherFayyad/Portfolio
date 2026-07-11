
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Wrench, User, Mail, Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
        { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
        { href: "/admin/skills", label: "المهارات", icon: Wrench },
        { href: "/admin/profile", label: "البيانات الشخصية", icon: User },
        { href: "/admin/messages", label: "الرسائل", icon: Mail },
    ];

    return (
        <>
            {/* 🌟 زرار فتح القائمة - يظهر بس على الموبايل/التابلت */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 right-4 z-40 p-2.5 rounded-xl bg-[#0a071e]/90 border border-white/10 text-white/80 backdrop-blur-md shadow-lg"
                aria-label="فتح القائمة"
            >
                <Menu className="size-5" />
            </button>

            {/* 🌟 خلفية شفافة تظهر خلف القائمة على الموبايل وتقفلها عند الضغط عليها */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    aria-hidden="true"
                />
            )}

            <aside
                className={`w-64 border-l border-white/5 bg-[#0a071e] lg:bg-transparent p-6 flex flex-col h-screen justify-between transition-transform duration-300 fixed lg:sticky top-0 z-50 select-none
                    ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                    right-0 lg:right-auto`}
            >
                <div>
                    {/* الهيدر العلوي للـ Sidebar بتأثير الـ Gradient الموحد */}
                    <div className="mb-8 pb-4 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2 font-display">
                            لوحة{" "}
                            <span className="text-gradient drop-shadow-[0_0_20px_rgba(140,42,255,0.15)]">
                                التحكم
                            </span>
                        </h2>

                        {/* 🌟 زرار قفل القائمة - يظهر بس على الموبايل جوه القائمة نفسها */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors duration-300"
                            aria-label="إغلاق القائمة"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    {/* قائمة التنقل الرئيسية بنمط زجاجي مضيء */}
                    <nav className="flex flex-col gap-2" aria-label="Admin Navigation">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 group
                                        ${isActive
                                            ? "bg-gradient-to-r from-primary/10 to-indigo-600/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(140,42,255,0.1)]"
                                            : "text-white/60 border border-transparent hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon
                                        className={`size-4 transition-transform duration-300 group-hover:scale-105 ${
                                            isActive
                                                ? "text-primary"
                                                : "text-white/40 group-hover:text-white/80"
                                        }`}
                                    />
                                    <span className="font-sans">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* الجزء السفلي لزر تسجيل الخروج */}
                <div className="pt-4 border-t border-white/5">
                    <LogoutButton />
                </div>
            </aside>
        </>
    );
}