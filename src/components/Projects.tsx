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
    <section id="projects" className="section-shell bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow="Portfólio"
          title="Projetos"
          subtitle="Alguns dos projetos que desenvolvi ao longo da minha jornada"
        />

        <div className="mb-10 flex flex-col items-center gap-5 max-md:items-stretch" data-reveal>
          <div className="flex w-full max-w-[460px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md transition-colors focus-within:border-mint/50 max-md:max-w-none">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por título..."
              aria-label="Buscar projetos por título"
              className="w-full flex-1 bg-transparent px-1 py-1.5 text-base text-fg outline-none placeholder:text-muted/70"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCategory(filter.value)}
                className={`filter-pill ${category === filter.value ? "filter-pill-active" : ""}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-muted">Nenhum projeto encontrado para essa busca.</p>
        )}
      </div>
    </section>
  );
}
