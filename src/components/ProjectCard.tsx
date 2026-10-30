import { useLanguage } from "../i18n/LanguageProvider";
import type { Project } from "../types";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  return (
    <article className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_24px_60px_-28px_rgba(46,242,182,0.5)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent opacity-80"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-night/70 px-3 py-1 text-[0.7rem] font-medium text-mint backdrop-blur-md">
          {t.projects.filters[project.category]}
        </span>

        {project.demo && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t.projects.openDemo} ${project.title}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-ink shadow-[0_0_30px_-4px_rgba(46,242,182,0.8)] transition-transform hover:scale-110"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[1.2rem] font-semibold leading-snug text-fg">{project.title}</h3>
        <p className="flex-1 text-[0.92rem] leading-relaxed text-muted">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-mint/20 bg-mint/10 px-2.5 py-0.5 text-[0.72rem] font-medium text-mint"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-1 flex items-center gap-4 border-t border-white/5 pt-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-fg/80 transition-colors hover:text-mint"
            >
              <img src="/img-home/contact/github.png" alt="" className="h-4 w-4 brightness-0 invert" />
              {t.projects.sourceCode}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-mint transition-colors hover:text-mint-strong"
            >
              {t.projects.demo}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7,7 17,7 17,17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
