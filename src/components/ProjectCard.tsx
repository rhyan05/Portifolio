import type { Project } from "../types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex max-w-[350px] flex-[0_0_calc((100%-4rem)/3)] flex-col overflow-hidden rounded-[10px] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl max-[900px]:flex-[0_0_calc((100%-2rem)/2)] max-[600px]:flex-[0_0_100%]">
      <div className="relative h-[180px] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.demo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir ${project.title}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform hover:scale-110"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c518d" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[1.3rem] font-bold">{project.title}</h3>
        <p className="flex-1 text-[0.95rem] leading-snug text-[#555]">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-xl bg-brand px-2.5 py-1 text-[0.8rem] text-white">
              {tech}
            </span>
          ))}
        </div>
        {project.github && (
          <div className="mt-2.5">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-navy transition-colors hover:text-brand"
            >
              <img src="/img-home/contact/github.png" alt="GitHub" className="h-5 w-5" />
              Código Fonte
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
