import { skillCategories } from "../data/skills";
import type { SkillLevel } from "../types";
import { SectionHeader } from "./SectionHeader";

const levelStyles: Record<SkillLevel, string> = {
  basic: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  intermediate: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  advanced: "border-mint/30 bg-mint/10 text-mint",
};

const levelLabel: Record<SkillLevel, string> = {
  basic: "Básico",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export function Skills() {
  return (
    <section id="skills" className="section-shell bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-mint/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow="Stack"
          title="Skills & Tecnologias"
          subtitle="Tecnologias e ferramentas que utilizo no desenvolvimento"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              data-reveal
              className="glass group relative overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-mint/25"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-[1.2rem] font-semibold text-fg">{category.title}</h3>
                <span className="chip shrink-0">{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/30 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-night/70">
                      <img src={skill.icon} alt="" className="h-5 w-5 object-contain" />
                    </span>
                    <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                      <span className="text-[0.95rem] font-semibold text-fg">{skill.name}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.66rem] font-medium ${levelStyles[skill.level]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {levelLabel[skill.level]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
