"use client";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { personalInfo } from "@/data/content";

function GithubIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

export function Footer() {
    const [year, setYear] = useState<number | string>("");
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const profile = personalInfo;
    const rawName = profile?.name ?? "Antar Maher Mohamed";

    const nameParts = rawName.split(" ");
    const firstName = nameParts[0] || "";
    const middleName = nameParts[1] || "";
    const lastName = nameParts.slice(2).join(" ") || "";

    return (
        <footer className="border-t border-white/[0.04] bg-transparent px-6 py-12 select-none w-full">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 md:px-2">

                <div className="text-xs md:text-sm text-white/40 font-mono tracking-wide order-2 sm:order-1 text-center sm:text-left">
                    © {year || "2026"}{" "}
                    <span className="text-white/80 font-semibold font-display">
                        {firstName}{" "}
                        <span className="text-gradient drop-shadow-[0_0_20px_rgba(140,42,255,0.15)]">
                            {middleName}
                        </span>{" "}
                        {lastName}
                    </span>
                    . Built with care.
                </div>

                <nav
                    className="flex items-center gap-6 text-xs md:text-sm font-mono tracking-wider uppercase text-white/50 order-1 sm:order-2"
                    aria-label="Footer Navigation"
                >
                    {profile?.github && (
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-300 inline-flex items-center gap-2.5 group"
                        >
                            <span className="grid size-9 place-items-center rounded-xl border border-white/5 bg-white/[0.01] text-white/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-white/[0.03] group-hover:shadow-[0_0_20px_rgba(140,42,255,0.15)]">
                                <GithubIcon className="size-4.5" />
                            </span>
                            <span className="text-[11px] font-medium">GitHub</span>
                        </a>
                    )}

                    <a
                        href={`mailto:${profile?.email ?? "antarmaherfayyad@gmail.com"}`}
                        className="hover:text-white transition-colors duration-300 inline-flex items-center gap-2.5 group"
                    >
                        <span className="grid size-9 place-items-center rounded-xl border border-white/5 bg-white/[0.01] text-white/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-white/[0.03] group-hover:shadow-[0_0_20px_rgba(140,42,255,0.15)]">
                            <Mail className="size-4.5" />
                        </span>
                        <span className="text-[11px] font-medium">Email</span>
                    </a>
                </nav>

            </div>
        </footer>
    );
}