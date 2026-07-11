"use client";
import { Code2, Rocket, Sparkles } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const highlights = [
    { icon: Code2, title: "Clean, Scalable Code", body: "Component-driven architecture and strict TypeScript across every project." },
    { icon: Rocket, title: "Performance-First", body: "Lighthouse-obsessed builds with lazy loading, code-splitting and optimized assets." },
    { icon: Sparkles, title: "Beautiful UI / UX", body: "Pixel-perfect interfaces with smooth, restrained motion that elevates content." },
];

export function About() {
    return (
        <section id="about" className="relative py-28 sm:py-36 w-full">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24 items-center">

                    <AnimatedSection>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-xs text-primary">[01]</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">About</span>
                        </div>
                        <h3 className="font-display text-4xl font-black tracking-tight leading-tight sm:text-5xl md:text-6xl text-white">
                            Frontend is more than code — it's the
                            <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.35)]">interface</span> between people and ideas.
                        </h3>
                        <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70 sm:text-lg font-medium">
                            <p>
                                I'm Antar, a Frontend Developer with a deep passion for building fast,
                                accessible and visually striking web experiences. I obsess over the small
                                details — the easing curve of a hover, the rhythm of a layout, the millisecond
                                that separates good from great.
                            </p>
                            <p>
                                My stack is modern React and Next.js, written in strict TypeScript and styled
                                with Tailwind CSS. I care about clean architecture, semantic markup and
                                interfaces that feel inevitable.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="grid gap-4">
                        {highlights.map((h, i) => (
                            <AnimatedSection key={h.title} delay={120 * (i + 1)}>
                                <div className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.06)] hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]">
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent transition-opacity duration-500" />
                                    <div className="mb-4 grid size-12 place-items-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/40 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:border-blue-400">
                                        <h.icon className="size-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-blue-400/90 font-display transition-colors group-hover:text-blue-400">{h.title}</h3>
                                    <p className="mt-2 text-sm text-white/60 leading-relaxed font-sans">{h.body}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}