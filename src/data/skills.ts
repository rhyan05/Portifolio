import type { Lang } from "../i18n/types";
import type { SkillCategory } from "../types";

const pt: SkillCategory[] = [
  {
    title: "Linguagens de ProgramaÃ§Ã£o",
    skills: [
      { name: "TypeScript", icon: "/img-home/icon-skills/hard-skills/typescript.svg", level: "advanced" },
      { name: "JavaScript", icon: "/img-home/icon-skills/hard-skills/javascript.png", level: "advanced" },
      { name: "PHP", icon: "/img-home/icon-skills/hard-skills/php.png", level: "advanced" },
      { name: "HTML", icon: "/img-home/icon-skills/hard-skills/html.png", level: "advanced" },
      { name: "CSS", icon: "/img-home/icon-skills/hard-skills/css.png", level: "advanced" },
      { name: "Python", icon: "/img-home/icon-skills/hard-skills/python.svg", level: "intermediate" },
      { name: "Power BI", icon: "/img-home/icon-skills/hard-skills/power_bi.png", level: "basic" },
    ],
  },
  {
    title: "Frameworks & Bibliotecas",
    skills: [
      { name: "Node.js", icon: "/img-home/icon-skills/framework/nodejs.svg", level: "advanced" },
      { name: "React", icon: "/img-home/icon-skills/framework/React.png", level: "advanced" },
      { name: "Tailwind CSS", icon: "/img-home/icon-skills/framework/tailwind.png", level: "advanced" },
      { name: "Bootstrap", icon: "/img-home/icon-skills/framework/bootstrap.png", level: "intermediate" },
      { name: "Angular", icon: "/img-home/icon-skills/framework/angular.png", level: "basic" },
      { name: "Next.js", icon: "/img-home/icon-skills/framework/next_js.png", level: "basic" },
    ],
  },
  {
    title: "Cloud, Dados & DevOps",
    skills: [
      { name: "SQL", icon: "/img-home/icon-skills/database/sql.svg", level: "advanced" },
      { name: "MySQL", icon: "/img-home/icon-skills/database/mysql.svg", level: "advanced" },
      { name: "AWS", icon: "/img-home/icon-skills/database/aws.svg", level: "basic" },
      { name: "Azure", icon: "/img-home/icon-skills/database/azure.png", level: "basic" },
      {
        name: "GitHub Actions",
        icon: "/img-home/icon-skills/devops/github-actions.svg",
        level: "intermediate",
      },
      { name: "CI/CD", icon: "/img-home/icon-skills/devops/cicd.svg", level: "intermediate" },
    ],
  },
];

const en: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", icon: "/img-home/icon-skills/hard-skills/typescript.svg", level: "advanced" },
      { name: "JavaScript", icon: "/img-home/icon-skills/hard-skills/javascript.png", level: "advanced" },
      { name: "PHP", icon: "/img-home/icon-skills/hard-skills/php.png", level: "advanced" },
      { name: "HTML", icon: "/img-home/icon-skills/hard-skills/html.png", level: "advanced" },
      { name: "CSS", icon: "/img-home/icon-skills/hard-skills/css.png", level: "advanced" },
      { name: "Python", icon: "/img-home/icon-skills/hard-skills/python.svg", level: "intermediate" },
      { name: "Power BI", icon: "/img-home/icon-skills/hard-skills/power_bi.png", level: "basic" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Node.js", icon: "/img-home/icon-skills/framework/nodejs.svg", level: "advanced" },
      { name: "React", icon: "/img-home/icon-skills/framework/React.png", level: "advanced" },
      { name: "Tailwind CSS", icon: "/img-home/icon-skills/framework/tailwind.png", level: "advanced" },
      { name: "Bootstrap", icon: "/img-home/icon-skills/framework/bootstrap.png", level: "intermediate" },
      { name: "Angular", icon: "/img-home/icon-skills/framework/angular.png", level: "basic" },
      { name: "Next.js", icon: "/img-home/icon-skills/framework/next_js.png", level: "basic" },
    ],
  },
  {
    title: "Cloud, Data & DevOps",
    skills: [
      { name: "SQL", icon: "/img-home/icon-skills/database/sql.svg", level: "advanced" },
      { name: "MySQL", icon: "/img-home/icon-skills/database/mysql.svg", level: "advanced" },
      { name: "AWS", icon: "/img-home/icon-skills/database/aws.svg", level: "basic" },
      { name: "Azure", icon: "/img-home/icon-skills/database/azure.png", level: "basic" },
      {
        name: "GitHub Actions",
        icon: "/img-home/icon-skills/devops/github-actions.svg",
        level: "intermediate",
      },
      { name: "CI/CD", icon: "/img-home/icon-skills/devops/cicd.svg", level: "intermediate" },
    ],
  },
];

export const skillCategories: Record<Lang, SkillCategory[]> = { pt, en };

