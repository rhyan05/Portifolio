import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import type { ProjectCategory } from "../types";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";

type Filter = "all" | ProjectCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "frontend", label: "Front-end" },
  { value: "backend", label: "Back-end" },
  { value: "machine-learning", label: "Machine Learning" },
];

export function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    return projects.filter(
      (project) =>
        (category === "all" || project.category === category) &&
        project.title.toLowerCase().includes(term),
    );
  }, [query, category]);

  return (
    <section id="projects" className="bg-surface py-[60px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeader title="Projetos" subtitle="Alguns dos projetos que desenvolvi ao longo da minha jornada" />

        <div className="mb-10 flex flex-col items-center gap-5 max-md:items-stretch">
          <div className="flex w-full max-w-[400px] items-center gap-2.5 max-md:max-w-none">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título..."
              className="flex-1 rounded-lg border-2 border-navy px-3.5 py-2.5 text-base outline-none"
            />
            <button
              type="button"
              aria-label="Buscar"
              className="flex items-center justify-center rounded-lg bg-navy p-2.5 transition-colors hover:bg-brand"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCategory(filter.value)}
                className={`cursor-pointer rounded-[20px] border-2 border-navy px-4 py-2 font-semibold transition-colors ${
                  category === filter.value
                    ? "bg-navy text-white"
                    : "bg-transparent text-navy hover:bg-navy hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
