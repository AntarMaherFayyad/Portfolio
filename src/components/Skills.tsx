
"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/database";

const CODE_MAP: Record<string, string> = {
    html5: "<>",
    css3: "{}",
    bootstrap: "Bs",
    tailwindcss: "Tw",
    javascript: "JS",
    typescript: "TS",
    react: "Rx",
    nextdotjs: "Nx",
};

function getCode(iconName: string, name: string) {
    return CODE_MAP[iconName] ?? name.slice(0, 2).toUpperCase();
}

function SkillCard({ s, i }: { s: Skill; i: number }) {
    const { ref, inView } = useInView<HTMLDivElement>();
    const code = getCode(s.icon_name, s.name);

    const cardStyle: CSSProperties = {
        transitionDelay: `${i * 70}ms`,
        boxShadow: `0 0 25px color-mix(in oklab, ${s.tone} 4%, transparent)`,
        border: `1px solid color-mix(in oklab, ${s.tone} 20%, rgba(255, 255, 255, 0.08))`,
    };

    return (
        <div
            ref={ref}
            style={cardStyle}
            className={cn(
                "group relative overflow-hidden rounded-2xl bg-white/[0.03] p-4 sm:p-6 backdrop-blur-xl transition-all duration-700",
                "hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/20",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
        >
            {/* 🌟 الإضاءة الخلفية الناعمة */}
            <div
                className="absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, color-mix(in oklab, ${s.tone} 10%, transparent) 0%, transparent 60%)`,
                    filter: "blur(20px)"
                }}
            />

            {/* باقي محتوى الكرت كما هو بدون تغيير */}
            <div
                className="mb-4 sm:mb-5 grid size-10 sm:size-12 place-items-center rounded-xl font-mono text-sm font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                    color: s.tone,
                    backgroundColor: `color-mix(in oklab, ${s.tone} 14%, transparent)`,
                    border: `1px solid color-mix(in oklab, ${s.tone} 40%, transparent)`,
                    boxShadow: `inset 0 0 12px color-mix(in oklab, ${s.tone} 20%, transparent), 0 0 15px color-mix(in oklab, ${s.tone} 10%, transparent)`,
                }}
            >
                {code}
            </div>

            <h3
                className="text-base font-bold font-display transition-colors"
                style={{ color: `color-mix(in oklab, ${s.tone} 85%, white)` }}
            >
                {s.name}
            </h3>

            <div className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                <span>Proficiency</span>
                <span className="text-white/60 font-semibold">{s.level_percent}%</span>
            </div>

            {/* شريط التقدم اللوني */}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5 border border-white/[0.02]">
                <div
                    className="h-full rounded-full transition-all duration-[1400ms] ease-out"
                    style={{
                        width: inView ? `${s.level_percent}%` : "0%",
                        background: `linear-gradient(90deg, ${s.tone}, color-mix(in oklab, ${s.tone} 60%, white))`,
                        boxShadow: `0 0 10px ${s.tone}`,
                        transitionDelay: `${i * 70 + 200}ms`,
                    }}
                />
            </div>
        </div>
    );
}

export function Skills({ skills }: { skills: Skill[] }) {
    return (
        <section id="skills" className="relative py-28 sm:py-36 w-full">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <AnimatedSection className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <span className="font-mono text-xs text-primary">[02]</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Skills</span>
                        </div>
                        <h2 className="font-display text-4xl font-black tracking-tight leading-tight sm:text-5xl md:text-6xl text-white">
                            Technical <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">Arsenal</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {skills.map((s, i) => (
                        <SkillCard key={s.id} s={s} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}