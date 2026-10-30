import type { Lang } from "../i18n/types";

export interface TimelineEntry {
  period: string;
  title: string;
  company?: string;
  description: string;
  highlights: string[];
  tags?: string[];
  current?: boolean;
  future?: boolean;
}

const pt: TimelineEntry[] = [
  {
    period: "2022",
    title: "Primeiros passos na tecnologia",
    company: "Somar · ENIAC",
    description:
      "Comecei pela base: suporte, redes e infraestrutura, enquanto estudava informática e desenvolvia meus primeiros projetos web.",
    highlights: [
      "Suporte técnico e atendimento na Somar",
      "Desenvolvimento web no ENIAC",
      "Técnico em Informática e lógica de programação",
      "Primeiros algoritmos, landing pages e Git/GitHub",
    ],
    tags: ["Redes", "Suporte", "HTML", "CSS", "Git"],
  },
  {
    period: "2023",
    title: "Freelance e graduação",
    company: "Projetos sob demanda · ENIAC",
    description:
      "Passei a entregar soluções reais para clientes e iniciei Sistemas de Informação, aprofundando APIs, banco de dados e arquitetura.",
    highlights: [
      "Freelances e soluções sob demanda",
      "Graduação em Sistemas de Informação",
      "APIs RESTful com PHP e Node.js",
      "Banco de dados, MVC e arquitetura",
    ],
    tags: ["PHP", "Node.js", "MySQL", "MVC"],
  },
  {
    period: "2024",
    title: "Projetos reais e IA",
    company: "Strong-Tech · Hackathons",
    description:
      "Atuei com manutenção e infraestrutura, participei de hackathons e coloquei inteligência artificial em soluções reais.",
    highlights: [
      "Manutenção de hardware e diagnóstico na Strong-Tech",
      "Projeto TONI: chatbot com IA integrado ao WhatsApp",
      "Kafnet: prototipação e entrega ágil",
      "Portfólio web conectado ao GitHub",
    ],
    tags: ["IA", "WhatsApp", "Prototipação", "GitHub"],
  },
  {
    period: "2025",
    title: "Desenvolvedor Full Stack",
    company: "REVIO Tecnologia · 2025",
    description:
      "Entrei na REVIO como desenvolvedor Full Stack CLT, atuando em desenvolvimento, sustentação e evolução de aplicações.",
    highlights: [
      "Desenvolvimento e sustentação de aplicações e APIs",
      "Performance, débitos técnicos e versionamento com Git",
      "Febraban Tech, AB2L LawTech e workshops de IA",
      "Certificações em Cybersecurity (FIAP) e gestão (FM2S)",
    ],
    tags: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Docker",
      "Docker Compose",
      "Tailwind CSS",
      "HTML",
      "Figma",
      "QA",
    ],
  },
  {
    period: "2026",
    title: "Consolidação técnica",
    company: "REVIO Tecnologia · 2026",
    description:
      "Atuação full stack com foco em cloud, CI/CD e liderança técnica, com estudos de IA, Kubernetes e mentoria.",
    highlights: [
      "Certificação Azure Pipelines (10/2026)",
      "Formação para a Primeira Liderança (FM2S)",
      "Projetos com React, TypeScript e automação",
      "Preparação para arquitetura e mentoria",
    ],
    tags: [
      "Azure",
      "CI/CD",
      "Kubernetes",
      "Estudos de IA",
      "Arquitetura",
      "Liderança",
      "Mentoria",
      "QA",
      "Figma",
      "Coleta e maturação de feedback",
    ],
    current: true,
  },
];

const en: TimelineEntry[] = [
  {
    period: "2022",
    title: "First steps in technology",
    company: "Somar · ENIAC",
    description:
      "I started from the foundation: support, networking and infrastructure, while studying IT and building my first web projects.",
    highlights: [
      "Technical support and customer service at Somar",
      "Web development at ENIAC",
      "IT Technician and programming logic",
      "First algorithms, landing pages and Git/GitHub",
    ],
    tags: ["Networks", "Support", "HTML", "CSS", "Git"],
  },
  {
    period: "2023",
    title: "Freelance and degree",
    company: "On-demand projects · ENIAC",
    description:
      "I began delivering real solutions for clients and started my Information Systems degree, deepening my knowledge of APIs, databases and architecture.",
    highlights: [
      "Freelance and on-demand solutions",
      "Information Systems degree",
      "RESTful APIs with PHP and Node.js",
      "Databases, MVC and architecture",
    ],
    tags: ["PHP", "Node.js", "MySQL", "MVC"],
  },
  {
    period: "2024",
    title: "Real projects and AI",
    company: "Strong-Tech · Hackathons",
    description:
      "I worked with maintenance and infrastructure, joined hackathons and applied artificial intelligence to real solutions.",
    highlights: [
      "Hardware maintenance and diagnostics at Strong-Tech",
      "TONI project: AI chatbot integrated with WhatsApp",
      "Kafnet: prototyping and agile delivery",
      "Web portfolio connected to GitHub",
    ],
    tags: ["AI", "WhatsApp", "Prototyping", "GitHub"],
  },
  {
    period: "2025",
    title: "Full Stack Developer",
    company: "REVIO Tecnologia · 2025",
    description:
      "I joined REVIO as a full-time Full Stack Developer, working on development, support and evolution of applications.",
    highlights: [
      "Development and support of applications and APIs",
      "Performance, technical debt and version control with Git",
      "Febraban Tech, AB2L LawTech and AI workshops",
      "Certifications in Cybersecurity (FIAP) and management (FM2S)",
    ],
    tags: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Docker",
      "Docker Compose",
      "Tailwind CSS",
      "HTML",
      "Figma",
      "QA",
    ],
  },
  {
    period: "2026",
    title: "Technical consolidation",
    company: "REVIO Tecnologia · 2026",
    description:
      "Full stack work focused on cloud, CI/CD and technical leadership, with studies in AI, Kubernetes and mentoring.",
    highlights: [
      "Azure Pipelines certification (10/2026)",
      "First Leadership Training (FM2S)",
      "Projects with React, TypeScript and automation",
      "Preparation for architecture and mentoring",
    ],
    tags: [
      "Azure",
      "CI/CD",
      "Kubernetes",
      "AI studies",
      "Architecture",
      "Leadership",
      "Mentoring",
      "QA",
      "Figma",
      "Feedback collection and refinement",
    ],
    current: true,
  },
];

export const timeline: Record<Lang, TimelineEntry[]> = { pt, en };
