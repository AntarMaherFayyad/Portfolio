'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Mail,
    Download,
    Sparkles,
    MapPin,
    Calendar,
    Code2,
    Terminal,
    Cpu,
    Layers,
} from 'lucide-react';
import type { PersonalInfo } from "@/types/database";
import DarkVeil from "@/components/DarkVeil";

interface HeroProps {
    profile: PersonalInfo;
}
export default function Hero({ profile }: HeroProps) {
    const rawName = profile?.name ?? "Antar Maher Mohamed";
    const title = profile?.title ?? "Front-end Developer";
    const description = profile?.description ?? "Antar Maher Fayyad. I build fast, scalable React interfaces — multi-role dashboards, auth systems, and full production apps with a taste for clean architecture.";
    const isAvailable = profile?.available ?? true;
    const resumeUrl = "/resume.pdf";
    const avatarUrl = profile?.image ?? "/profile.png";

    const nameParts = rawName.split(" ");
    const firstName = nameParts[0] || "";
    const middleName = nameParts[1] || "";
    const lastName = nameParts.slice(2).join(" ") || "";

    return (
        <>
            <div className="relative w-full overflow-hidden min-h-screen sm:min-h-[100vh] flex flex-col items-center justify-center z-0">
                <div className="absolute inset-0 z-0">
                    <DarkVeil
                        hueShift={0}
                        noiseIntensity={0}
                        scanlineIntensity={0}
                        speed={1.30}
                        scanlineFrequency={0}
                        warpAmount={0}
                        resolutionScale={1.35}
                    />
                </div>
                <section className="relative z-10 w-full flex flex-col gap-4 sm:gap-6 items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-10 sm:py-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full flex-1 rounded-3xl p-5 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden group transition-all duration-500 hover:border-white/15 flex items-center"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 sm:gap-10 relative z-10 max-w-7xl mx-auto w-full">
                            <div className="lg:col-span-8 space-y-5 sm:space-y-6 order-1 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-white/10 text-[11px] font-mono text-white/90 tracking-wider backdrop-blur-md shadow-inner">
                                    <span className="relative flex size-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
                                    </span>
                                    {isAvailable ? "Available for new projects" : "Currently occupied"}
                                </div>

                                <h1 className="font-display font-black tracking-tight leading-[1.05] text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px]">
                                    {firstName} {middleName}
                                    {lastName && <><br />{lastName}</>}
                                </h1>

                                <h2 className="font-display font-black tracking-tight leading-[1.05] text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px]">
                                    <span className="text-gradient drop-shadow-[0_0_30px_rgba(140,42,255,0.15)]">
                                        {title}
                                    </span>
                                </h2>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-5 sm:mt-6">
                                    <Link
                                        href="#projects"
                                        className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] indigo-glow"
                                    >
                                        View Projects <ArrowRight className="size-4" />
                                    </Link>
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-sm font-medium"
                                    >
                                        <Mail className="size-4 text-white/60" /> Contact Me
                                    </Link>

                                    <Link
                                        href={resumeUrl}
                                        download
                                        className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-sm font-medium"
                                    >
                                        <Download className="size-4 text-white/60" />{' '}
                                        Download CV
                                    </Link>
                                </div>
                            </div>

                             <div className="lg:col-span-4 flex items-center justify-center lg:justify-end order-2 lg:order-2 min-h-0">
                                <div className="relative flex items-center justify-center size-[240px] xs:size-[260px] sm:size-[320px] md:size-[400px] group/avatar">
                                    <motion.div
                                        className="absolute size-[210px] xs:size-[230px] sm:size-[280px] md:size-[360px] rounded-full border border-dashed border-white/10 pointer-events-none flex items-center justify-center"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] border border-white/10 shadow-lg backdrop-blur-md pointer-events-auto">
                                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                                                <Code2 className="size-3.5 sm:size-4 md:size-5 text-primary" />
                                            </motion.div>
                                        </div>

                                        <div className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] border border-white/10 shadow-lg backdrop-blur-md pointer-events-auto">
                                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                                                <Terminal className="size-3.5 sm:size-4 md:size-5 text-pink-500" />
                                            </motion.div>
                                        </div>

                                        <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] border border-white/10 shadow-lg backdrop-blur-md pointer-events-auto">
                                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                                                <Cpu className="size-3.5 sm:size-4 md:size-5 text-purple-400" />
                                            </motion.div>
                                        </div>

                                        <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] border border-white/10 shadow-lg backdrop-blur-md pointer-events-auto">
                                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                                                <Layers className="size-3.5 sm:size-4 md:size-5 text-indigo-400" />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    <div className="absolute size-48 sm:size-56 md:size-64 rounded-full bg-gradient-to-tr from-primary to-pink-600 opacity-20 blur-2xl group-hover/avatar:opacity-40 transition-opacity duration-700 pointer-events-none" />

                                    <motion.div
                                        className="size-44 xs:size-48 sm:size-60 md:size-72 rounded-full p-1.5 bg-gradient-to-br from-primary via-purple-500 to-pink-600 shadow-[0_0_50px_rgba(140,42,255,0.25)] relative z-10 flex items-center justify-center overflow-hidden"
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <div className="w-full h-full rounded-full overflow-hidden bg-[var(--surface)] backdrop-blur-sm relative">
                                            <Image
                                                src={avatarUrl}
                                                alt={`${rawName} - ${title}`}
                                                fill
                                                sizes="(max-width: 480px) 176px, (max-width: 768px) 240px, 288px"
                                                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full glass-panel rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative overflow-hidden group transition-all duration-500 hover:border-white/15"
                    >
                        <div className="flex items-start gap-4 sm:gap-5 max-w-4xl relative z-10">
                            <div className="size-10 sm:size-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-[var(--deep)] flex items-center justify-center border border-white/10 shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="size-4 sm:size-5 text-white animate-pulse" />
                            </div>
                            <p className="text-white/70 font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed tracking-wide font-medium pt-1">
                                {description ? description : "Antar Maher Fayyad. I build fast, scalable React interfaces — multi-role dashboards, auth systems, and full production apps with a taste for clean architecture."}
                            </p>
                        </div>

                        <div className="flex gap-8 sm:gap-10 shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-5 sm:pt-6 md:pt-0 md:pl-10 relative z-10">
                            <div className="space-y-1.5">
                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                                    <MapPin className="size-3" /> Location
                                </div>
                                <div className="text-sm font-semibold text-white/90 whitespace-nowrap">
                                    Sohag, EG
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                                    <Calendar className="size-3" /> Availability
                                </div>
                                <div className="text-sm font-semibold text-primary shadow-sm whitespace-nowrap">
                                    Open to hires
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </>
    );
}