"use client";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import Link from "next/link";

interface ProjectsProps {
  projects: any[];
  limit?: number;
  title?: string;
  description?: string;
  showAllCta?: boolean;
}

export function Projects({
  projects = [],
  limit = 3, // تم تعيين الافتراضي إلى 3 مشاريع
  title = "Featured Projects",
  description = "A selection of frontend work spanning dashboards, e-commerce and marketing.",
  showAllCta = true
}: ProjectsProps) {

  const lastAddedProjects = [...projects].reverse();
  const displayedProjects = lastAddedProjects.slice(0, limit);

  const hasUsableUrl = (url?: string | null) => Boolean(url && url !== "#");

  return (
    <section id="work" className="relative bg-transparent py-24 sm:py-32 px-6 w-full">
      <div className="max-w-7xl mx-auto relative z-10">

        <AnimatedSection className="mb-16 flex flex-col gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3 select-none">
              <span className="font-mono text-xs text-blue-400">[03]</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Work</span>
            </div>
            <h2 className="text-4xl font-black sm:text-5xl md:text-6xl text-white tracking-tight font-display">
              {title.split(" ")[0]}{" "}
              <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/70 leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </AnimatedSection>

        {displayedProjects.length === 0 && (
          <div className="w-full py-20 flex items-center justify-center rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-xl">
            <p className="text-white/40 text-sm font-medium font-mono">No projects found at the moment.</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {displayedProjects.map((p, i) => {
            const hasLiveDemo = hasUsableUrl(p.live_demo);
            const hasGithub = hasUsableUrl(p.github);

            return (
              <AnimatedSection key={p.id || i} delay={i * 50}>
                <Link href={`/projects/${p.id}`}>
                  <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(59,130,246,0.02)] hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)]">

                    <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02] m-3 rounded-2xl border border-white/[0.05] shadow-inner">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={`Screenshot of ${p.name}`}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <ImageIcon className="size-8 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03020d]/90 via-transparent to-transparent opacity-85" />
                    </div>

                    <div className="px-5 pb-5 pt-2">
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {p.tech?.map((t: string) => (
                          <span
                            key={t}
                            className="rounded-md border border-blue-500/10 bg-blue-500/5 px-2 py-0.5 text-[10px] font-mono tracking-wide text-blue-400/80 transition-all duration-300 group-hover:text-blue-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-white/90 tracking-tight group-hover:text-blue-400 transition-colors duration-300 font-display line-clamp-1">
                        {p.name}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-white/60 min-h-[3.5rem] line-clamp-3 font-sans">
                        {p.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.06] pt-3">
                        {hasLiveDemo ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(p.live_demo!, "_blank", "noopener,noreferrer");
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-3.5 py-2 text-[11px] font-semibold text-white transition-all duration-300 hover:from-blue-400 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.97]"
                          >
                            Live Demo <ArrowUpRight className="size-3" />
                          </button>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-mono text-white/30 select-none">
                            Case study soon
                          </span>
                        )}

                        {hasGithub && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(p.github!, "_blank", "noopener,noreferrer");
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-[11px] font-semibold text-white/80 transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/40 active:scale-[0.97]"
                          >
                            <FaGithub className="size-3" /> Code
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {showAllCta && displayedProjects.length > 0 && (
          <AnimatedSection delay={200} className="mt-16 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-blue-400 backdrop-blur-md transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              View All Projects
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </AnimatedSection>
        )}

      </div>
    </section>
  );
}

export default Projects;