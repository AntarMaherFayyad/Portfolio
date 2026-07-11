import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import Projects from "@/components/Projects";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";

export default async function Home() {

  const supabase = await createClient();
  const { data: profile } = await supabase.from("personal_info").select("*").single();
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <>
      <main className="">
        <Hero profile={profile} />
        <About />
        <Skills skills={skills || []} />
        <Projects
          projects={projects || []}
          limit={3}
          title="Featured Projects"
          showAllCta={true}
        />
        <Journey />
        <Contact profile={profile} />
      </main>
    </>
  );
}