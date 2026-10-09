export type ProjectCategory = "frontend" | "backend" | "machine-learning";

export interface Project {
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

export type SkillLevel = "basic" | "intermediate" | "advanced";

export interface Skill {
  name: string;
  icon: string;
  level: SkillLevel;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Certification {
  title: string;
  issuer: string;
  image: string;
  year?: string;
  category: CertificationCategory;
}

export type CertificationCategory =
  | "cloud"
  | "security"
  | "development"
  | "ai"
  | "management"
  | "language";

export interface Talk {
  title: string;
  event: string;
  year?: string;
  image?: string;
  highlight?: boolean;
  description?: string;
}
