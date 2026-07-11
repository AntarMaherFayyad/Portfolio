"use client";
import { useState, type FormEvent } from "react";
import { Mail, Phone, Loader2, Send } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { AnimatedSection } from "./AnimatedSection";
import { createClient } from "@/lib/supabase/client";
import type { PersonalInfo } from "@/types/database";

interface ContactProps {
    profile: PersonalInfo | null;
}

export function Contact({ profile }: ContactProps) {
    const supabase = createClient();
    const [sending, setSending] = useState(false);

    const EMAIL = profile?.email ?? "antarmaherfayyad@gmail.com";
    const PHONE = profile?.phone ?? "01044348523";
    const GITHUB = profile?.github ?? "https://github.com/AntarMaherFayyad";
    const GITHUB_USERNAME = profile?.github_username ?? "AntarMaherFayyad";

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const data = new FormData(target);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();

        if (!name || !email || !message) {
            toast.error("Please fill in all fields.");
            return;
        }

        setSending(true);
        try {
            const { error } = await supabase.from("contact_messages").insert({
                name,
                email,
                message,
                read: false,
            });

            if (error) throw error;

            toast.success("Message sent successfully!");
            target.reset();
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Could not send message. Please try again.";
            toast.error(errorMsg);
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-24 sm:py-32 px-6 bg-transparent relative overflow-hidden w-full"
            aria-labelledby="contact-heading"
        >
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start relative z-10">
                
                <div className="space-y-6">
                    <AnimatedSection>
                        <div className="mb-2 flex items-center gap-2 select-none">
                            <span className="font-mono text-[11px] text-blue-400">[05]</span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Contact</span>
                        </div>
                        <h2
                            id="contact-heading"
                            className="text-4xl font-black text-white mt-2 leading-[1.2] tracking-tight mb-4 font-display"
                        >
                            Let&apos;s build{" "}
                            <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                                something.
                            </span>
                        </h2>
                        <p className="text-sm text-white/60 leading-relaxed max-w-[42ch] font-medium">
                            Have a role, project or wild idea? I&apos;m one message away. Drop a line and I&apos;ll reply within a day.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection className="space-y-3">
                        {[
                            { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                            { Icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE}` },
                            { Icon: FaGithub, label: "GitHub", value: GITHUB_USERNAME, href: GITHUB },
                        ].map(({ Icon, label, value, href }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noreferrer" : undefined}
                                className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-15px_rgba(59,130,246,0.12)]"
                            >
                                <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-blue-400 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                    <Icon className="size-4" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[9px] font-mono font-semibold uppercase tracking-wider text-white/40">
                                        {label}
                                    </div>
                                    <div className="truncate text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">{value}</div>
                                </div>
                            </a>
                        ))}
                    </AnimatedSection>
                </div>

                <AnimatedSection delay={100} className="w-full">
                    <form
                        onSubmit={onSubmit}
                        className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-6 sm:p-8 space-y-5 hover:border-white/[0.12] transition-colors duration-500 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
                        noValidate
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="form-name" className="text-[11px] font-mono font-semibold text-white/40 pl-0.5 select-none uppercase tracking-widest">
                                    Your name
                                </label>
                                <input
                                    id="form-name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Jane Doe"
                                    className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 focus:bg-black/60 transition-all duration-300 font-sans"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="form-email" className="text-[11px] font-mono font-semibold text-white/40 pl-0.5 select-none uppercase tracking-widest">
                                    Email
                                </label>
                                <input
                                    id="form-email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 focus:bg-black/60 transition-all duration-300 font-sans"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="form-message" className="text-[11px] font-mono font-semibold text-white/40 pl-0.5 select-none uppercase tracking-widest">
                                Message
                            </label>
                            <textarea
                                id="form-message"
                                name="message"
                                required
                                rows={4}
                                placeholder="Tell me about your project, role or idea…"
                                className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 focus:bg-black/60 transition-all duration-300 resize-none leading-relaxed font-sans"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs md:text-sm font-semibold py-3.5 rounded-xl transition-all duration-300 hover:from-blue-400 hover:to-indigo-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md font-sans"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Sending to Dashboard…
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </>
                            )}
                        </button>
                    </form>
                </AnimatedSection>

            </div>
        </section>
    );
}