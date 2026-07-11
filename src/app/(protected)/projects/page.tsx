import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Projects } from "@/components/Projects";

export const metadata: Metadata = {
    title: "Projects | Archive",
    description: "A curated collection of frontend projects built with React, Next.js and TypeScript.",
    alternates: {
        canonical: "/projects",
    },
};

export default async function ProjectsPage() {
    const supabase = await createClient();
    
    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    const allProjects = projects || [];

    return (
        <main className="relative min-h-screen px-4 py-24 sm:px-8 lg:px-12 bg-[#03020d] overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] size-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] left-[-10%] size-[600px] rounded-full bg-indigo-500/8 blur-[150px] pointer-events-none -z-10" />
            
            <div className="mx-auto max-w-7xl relative z-10">
                <div className="mb-16 max-w-3xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 font-mono">
                        [Portfolio Archive]
                    </p>
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-tight font-display">
                        Selected projects that blend{" "}
                        <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">design</span>,{" "}
                        <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">performance</span>, and product thinking.
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-white/60 font-medium max-w-2xl leading-relaxed">
                        Browse a focused collection of client-ready interfaces, dashboards, and polished web experiences.
                    </p>
                </div>

                <Projects
                    projects={allProjects}
                    limit={allProjects.length}
                    showAllCta={false}
                    title=" " 
                    description=" "
                />
            </div>
        </main>
    );
}