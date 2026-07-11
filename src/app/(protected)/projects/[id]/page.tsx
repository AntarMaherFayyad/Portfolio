import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Cpu, ExternalLink, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Navber } from "@/components/Navber";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const supabase = await createClient();
    const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

    if (!project) {
        return {
            title: "Project not found",
            description: "The requested project could not be found.",
        };
    }

    return {
        title: `${project.name} | Project Details`,
        description: project.description || `Project details for ${project.name}`,
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

    if (!project) {
        notFound();
    }

    const hasLiveDemo = Boolean(project.live_demo && project.live_demo !== "#");
    const hasGithub = Boolean(project.github && project.github !== "#");

    return (
        <>
            <Navber/>
            <main className="relative min-h-screen px-4 py-24 sm:px-8 lg:px-12 bg-[#03020d] overflow-hidden">
                <div className="absolute top-[-10%] left-[5%] size-[700px] rounded-full bg-blue-500/10 blur-[180px] pointer-events-none -z-10" />
                <div className="absolute bottom-[10%] right-[-5%] size-[600px] rounded-full bg-indigo-500/8 blur-[150px] pointer-events-none -z-10" />

                <div className="mx-auto flex max-w-6xl flex-col gap-8 relative z-10">
                    <Link 
                        href="/projects" 
                        className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/50 hover:text-blue-400 transition-colors duration-300 font-mono"
                    >
                        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" /> 
                        [Back to archive]
                    </Link>

                    <article className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),0_0_50px_rgba(59,130,246,0.02)]">
                        
                        <div className="relative aspect-[16/8] md:aspect-[21/9] overflow-hidden bg-white/[0.01]">
                            <Image 
                                src={project.image || "/profile.png"} 
                                alt={`${project.name} preview`} 
                                fill 
                                priority 
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#03020d] via-[#03020d]/30 to-transparent" />
                        </div>

                        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-3 lg:items-start">
                            
                            <div className="space-y-6 lg:col-span-2">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 font-mono">
                                        Case Study
                                    </p>
                                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl font-display">
                                        {project.name}
                                    </h1>
                                </div>
                                
                                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                                
                                <div className="space-y-4">
                                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40 font-mono">
                                        Overview & Objective
                                    </h2>
                                    <p className="text-base sm:text-lg leading-relaxed text-white/70 font-medium whitespace-pre-line">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 space-y-6 backdrop-blur-lg">
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-wider font-mono">
                                        <Cpu className="size-4 text-blue-400" /> Technologies Used
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(project.tech ?? []).map((tech: string) => (
                                            <span 
                                                key={tech} 
                                                className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-mono text-white/80"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/5" />

                                <div className="flex flex-col gap-2.5">
                                    {hasLiveDemo ? (
                                        <a
                                            href={project.live_demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-400 hover:to-indigo-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
                                        >
                                            Launch Live App <ExternalLink className="size-4" />
                                        </a>
                                    ) : (
                                        <div className="w-full py-3 text-center rounded-xl bg-white/5 border border-white/[0.02] text-xs font-mono text-white/30 select-none">
                                            Deployment in progress
                                        </div>
                                    )}

                                    {hasGithub && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 active:scale-[0.98]"
                                        >
                                            <FaGithub className="size-4" /> View Source Code
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}