import { skillCategories } from "../data/skills";
import type { SkillLevel } from "../types";
import { SectionHeader } from "./SectionHeader";

const levelClasses: Record<SkillLevel, string> = {
  basic: "bg-[#9ca3af]",
  intermediate: "bg-[#38bdf8]",
  advanced: "bg-[#22c55e]",
};

const levelLabel: Record<SkillLevel, string> = {
  basic: "Básico",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export function Skills() {
  return (
    <section id="skills" className="bg-surface py-[60px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeader title="Skills & Tecnologias" subtitle="Tecnologias e ferramentas que utilizo no desenvolvimento" />
        <div className="flex flex-col gap-10">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-5">
              <h3 className="text-center text-[2.2rem] font-semibold max-md:text-[1.6rem]">{category.title}</h3>
              <div className="flex flex-wrap justify-center gap-10 py-2.5 max-[600px]:grid max-[600px]:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-[600px]:gap-5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex h-[200px] w-[180px] flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img src={skill.icon} alt={skill.name} className="h-12 w-12" />
                    <span className="mb-3.5 text-[1.25rem] font-semibold">{skill.name}</span>
                    <span className={`rounded-xl px-2.5 py-1 text-[0.85rem] text-white ${levelClasses[skill.level]}`}>
                      {levelLabel[skill.level]}
                    </span>
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
