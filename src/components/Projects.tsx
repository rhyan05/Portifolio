import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageProvider";
import type { ProjectCategory } from "../types";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";

type Filter = "all" | ProjectCategory;

export function Projects() {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");
  const items = projects[lang];

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.projects.filters.all },
    { value: "frontend", label: t.projects.filters.frontend },
    { value: "backend", label: t.projects.filters.backend },
    { value: "machine-learning", label: t.projects.filters["machine-learning"] },
  ];

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    return items.filter(
      (project) =>
        (category === "all" || project.category === category) &&
        project.title.toLowerCase().includes(term),
    );
  }, [query, category, items]);

  return (
    <section id="projects" className="section-shell bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
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
              placeholder={t.projects.searchPlaceholder}
              aria-label={t.projects.searchAria}
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
          <p className="py-10 text-center text-muted">{t.projects.empty}</p>
        )}
      </div>
    </section>
  );
}
