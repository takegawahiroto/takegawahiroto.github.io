import type { Metadata } from "next";
import { PROJECTS } from "@/lib/config";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <section className="pt-32 pb-24 px-10 max-w-[1200px] mx-auto min-h-screen">
      <SectionHeader label="Projects" title="Selected Works" />
      <div className="grid grid-cols-2 gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
