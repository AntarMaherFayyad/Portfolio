"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navber() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const links: Array<{ to: string; label: string }> = [
        { to: "/#projects", label: "Projects" },
        { to: "/#about", label: "About" },
        { to: "/#SKILLS", label: "SKILLS" },
        { to: "/#JOURNEY", label: "JOURNEY" },
        { to: "/#contact", label: "Contact" },
    ];

    return (
        <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5">
            <div className="glass-panel">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 min-w-0">
                        <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                        <span className="font-display font-bold tracking-tight text-base truncate">
                            ANTAR<span className="text-primary">.</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-6">
                        <div className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-white/60">
                            {links.map((l) => {
                                const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
                                return (
                                    <Link
                                        key={l.to}
                                        href={l.to}
                                        className={`hover:text-white transition-colors ${active ? "text-white" : ""}`}
                                    >
                                        {l.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden inline-flex items-center justify-center size-8 rounded-md border border-white/10 hover:bg-white/5"
                            aria-label="Menu"
                        >
                            {open ? <X className="size-4" /> : <Menu className="size-4" />}
                        </button>
                    </div>
                </div>
                {open && (
                    <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-2 text-sm">
                        {links.map((l) => (
                            <Link key={l.to} href={l.to} onClick={() => setOpen(false)} className="py-1.5 text-white/80">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
