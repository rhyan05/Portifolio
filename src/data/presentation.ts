import type { Lang } from "../i18n/types";
import type { Project, ProjectCategory, Talk } from "../types";
import { projects } from "./projects";
import { talks } from "./talks";

export const presentationUrl: Record<Lang, string> = {
  pt: "/img-home/apresentacoes/rhyan-lemos-apresentacao.pptx",
  en: "/img-home/apresentacoes/rhyan-lemos-apresentacao-en.pptx",
};

export type SlideVariant =
  | "cover"
  | "profile"
  | "evolution"
  | "trajectory"
  | "certificates"
  | "talks"
  | "projects"
  | "metrics"
  | "matrix"
  | "roadmap"
  | "links"
  | "closing";

export interface DeckSlide {
  id: string;
  navTitle: string;
  variant: SlideVariant;
}

export type Accent = "mint" | "violet" | "magenta";

export interface CertificateGroup {
  label: string;
  accent: Accent;
  items: {
    title: string;
    issuer: string;
    description: string;
  }[];
}

export interface PresentationContent {
  deckSlides: DeckSlide[];
  profile: {
    name: string;
    role: string;
    education: string;
    location: string;
    summary: string;
    current: {
      company: string;
      role: string;
      period: string;
      description: string;
      highlights: string[];
    };
    graduation: {
      course: string;
      school: string;
      period: string;
      description: string;
      highlights: string[];
    };
    workStyle: { title: string; description: string }[];
    stack: string[];
  };
  certificateGroups: CertificateGroup[];
  certificateHighlightCount: number;
  talkHighlights: Talk[];
  projectGroups: {
    category: ProjectCategory;
    label: string;
    accent: Accent;
    projects: (Project & { summary: string })[];
  }[];
  projectCount: number;
  skillGroups: { label: string; items: string[] }[];
  metrics: { title: string; description: string; accent: Accent }[];
  competencyMatrix: {
    title: string;
    subtitle: string;
    items: string[];
    accent: Accent;
  }[];
  roadmap: {
    phase: string;
    period: string;
    title: string;
    outcome: string;
    items: string[];
    accent: Accent;
  }[];
  links: { label: string; handle: string; href: string; icon: string; invert?: boolean }[];
}

const projectAccents: Record<ProjectCategory, Accent> = {
  frontend: "mint",
  backend: "violet",
  "machine-learning": "magenta",
};

const projectSummaries: Record<Lang, Record<string, string>> = {
  pt: {
    "Apple Shop Clone":
      "Clone responsivo da Apple Shop, com fidelidade visual e experiência em diferentes dispositivos.",
    "Meteora E-commerce":
      "E-commerce completo com catálogo, busca, promoções e navegação voltada à conversão.",
    "Gerador de QR Code":
      "Ferramenta web para criar QR Codes personalizados a partir de URLs, sem instalação.",
    "Lista de Tarefas":
      "Aplicação de produtividade com criação, edição, conclusão e persistência local de tarefas.",
    "Projeto Alluh":
      "Gestão de usuários com autenticação, upload de imagens e níveis de acesso.",
    "API Livraria":
      "API RESTful com CRUD e banco relacional de cinco tabelas, focada em boas práticas.",
    "Toni - Assistente Financeiro":
      "Assistente financeiro com IA para microempreendedores, criado no desafio da Stone.",
    "Machine Learning Models":
      "Estudos de ML com Scikit-learn e Pandas, incluindo classificação de dados médicos.",
  },
  en: {
    "Apple Shop Clone":
      "Responsive Apple Shop clone with visual fidelity and a great experience across devices.",
    "Meteora E-commerce":
      "Complete e-commerce with catalog, search, promotions and conversion-focused navigation.",
    "QR Code Generator":
      "Web tool for creating custom QR Codes from URLs, with no installation required.",
    "To-Do List":
      "Productivity app with task creation, editing, completion and local persistence.",
    "Alluh Project":
      "User management with authentication, image uploads and access levels.",
    "Bookstore API":
      "RESTful API with CRUD and a five-table relational database, focused on best practices.",
    "Toni - Financial Assistant":
      "AI financial assistant for micro-entrepreneurs, created for the Stone challenge.",
    "Machine Learning Models":
      "ML studies with Scikit-learn and Pandas, including medical data classification.",
  },
};

const projectCategoryLabels: Record<Lang, Record<ProjectCategory, string>> = {
  pt: {
    frontend: "Front-end",
    backend: "Back-end",
    "machine-learning": "Machine Learning",
  },
  en: {
    frontend: "Front-end",
    backend: "Back-end",
    "machine-learning": "Machine Learning",
  },
};

function buildProjectGroups(lang: Lang): PresentationContent["projectGroups"] {
  return (["frontend", "backend", "machine-learning"] as const).map((category) => ({
    category,
    label: projectCategoryLabels[lang][category],
    accent: projectAccents[category],
    projects: projects[lang]
      .filter((project) => project.category === category)
      .map((project) => ({
        ...project,
        summary: projectSummaries[lang][project.title] ?? project.description,
      })),
  }));
}

const deckSlidesPt: DeckSlide[] = [
  { id: "cover", navTitle: "Quem sou eu?", variant: "cover" },
  { id: "profile", navTitle: "Quem sou eu e no que trabalho", variant: "profile" },
  { id: "evolution", navTitle: "Minha evolução profissional", variant: "evolution" },
  { id: "trajectory", navTitle: "Minha trajetória profissional", variant: "trajectory" },
  { id: "certificates", navTitle: "Certificados & habilidades", variant: "certificates" },
  { id: "talks", navTitle: "Palestras & eventos", variant: "talks" },
  { id: "projects", navTitle: "Projetos em destaque", variant: "projects" },
  { id: "metrics", navTitle: "Minhas métricas", variant: "metrics" },
  { id: "matrix", navTitle: "Plano de carreira", variant: "matrix" },
  { id: "roadmap", navTitle: "Trajetória em 3 etapas", variant: "roadmap" },
  { id: "links", navTitle: "Onde me encontrar", variant: "links" },
  { id: "closing", navTitle: "Meu site", variant: "closing" },
];

const deckSlidesEn: DeckSlide[] = [
  { id: "cover", navTitle: "Who am I?", variant: "cover" },
  { id: "profile", navTitle: "Who I am and what I work on", variant: "profile" },
  { id: "evolution", navTitle: "My professional evolution", variant: "evolution" },
  { id: "trajectory", navTitle: "My professional career", variant: "trajectory" },
  { id: "certificates", navTitle: "Certificates & skills", variant: "certificates" },
  { id: "talks", navTitle: "Talks & events", variant: "talks" },
  { id: "projects", navTitle: "Featured projects", variant: "projects" },
  { id: "metrics", navTitle: "My metrics", variant: "metrics" },
  { id: "matrix", navTitle: "Career plan", variant: "matrix" },
  { id: "roadmap", navTitle: "3-step journey", variant: "roadmap" },
  { id: "links", navTitle: "Where to find me", variant: "links" },
  { id: "closing", navTitle: "My website", variant: "closing" },
];

const certificateGroupsPt: CertificateGroup[] = [
  {
    label: "Cloud & DevOps",
    accent: "violet",
    items: [
      {
        title: "Azure Pipelines — CI/CD, Docker e Kubernetes",
        issuer: "Udemy",
        description: "CI/CD, containers e orquestração no Azure DevOps.",
      },
      {
        title: "Introdução a AZ-204",
        issuer: "Microsoft · DIO",
        description: "Fundamentos para desenvolver soluções no Azure.",
      },
      {
        title: "Implementando o Azure Functions",
        issuer: "Microsoft · DIO",
        description: "APIs serverless e processamento orientado a eventos.",
      },
      {
        title: "Trabalhando com Azure Cosmos DB",
        issuer: "Microsoft · DIO",
        description: "Bancos NoSQL distribuídos e modelagem de dados.",
      },
      {
        title: "Deploy de API na Nuvem",
        issuer: "Microsoft · DIO",
        description: "Publicação e operação de APIs em ambiente cloud.",
      },
    ],
  },
  {
    label: "Desenvolvimento & IA",
    accent: "mint",
    items: [
      {
        title: "CC50: Introdução à Ciência da Computação",
        issuer: "Fundação Estudar · Harvard",
        description: "Fundamentos de ciência da computação e algoritmos.",
      },
      {
        title: "Backend de Loja Virtual (Parse Server + PIX)",
        issuer: "Udemy",
        description: "API de e-commerce com pagamentos via PIX.",
      },
      {
        title: "Crie um Site com HTML, CSS e JavaScript",
        issuer: "Fundação Bradesco",
        description: "Base de front-end e interatividade com JavaScript.",
      },
      {
        title: "Imersão Inteligência Artificial",
        issuer: "Alura",
        description: "IA, modelos e aplicações práticas.",
      },
      {
        title: "Capacitação em Inteligência Artificial (CPTIA)",
        issuer: "ENIAC",
        description: "IA aplicada à resolução de problemas reais.",
      },
    ],
  },
  {
    label: "Segurança, Gestão & Idiomas",
    accent: "magenta",
    items: [
      {
        title: "Cybersecurity",
        issuer: "FIAP",
        description: "Segurança, ameaças e boas práticas.",
      },
      {
        title: "Introdução à Cibersegurança",
        issuer: "Cisco",
        description: "Redes, riscos e proteção de ambientes.",
      },
      {
        title: "Lean Six Sigma — Green Belt",
        issuer: "FM2S",
        description: "Melhoria contínua e redução de desperdícios.",
      },
      {
        title: "Formação para a Primeira Liderança",
        issuer: "FM2S",
        description: "Liderança, comunicação e gestão de equipes.",
      },
      {
        title: "Pensamento Crítico e Criativo",
        issuer: "IBM",
        description: "Análise, criatividade e resolução de problemas.",
      },
      {
        title: "Inglês B1 — MET",
        issuer: "MET",
        description: "Comunicação e leitura em contexto profissional.",
      },
    ],
  },
];

const certificateGroupsEn: CertificateGroup[] = [
  {
    label: "Cloud & DevOps",
    accent: "violet",
    items: [
      {
        title: "Azure Pipelines — CI/CD, Docker and Kubernetes",
        issuer: "Udemy",
        description: "CI/CD, containers and orchestration in Azure DevOps.",
      },
      {
        title: "Introduction to AZ-204",
        issuer: "Microsoft · DIO",
        description: "Fundamentals for developing solutions on Azure.",
      },
      {
        title: "Implementing Azure Functions",
        issuer: "Microsoft · DIO",
        description: "Serverless APIs and event-driven processing.",
      },
      {
        title: "Working with Azure Cosmos DB",
        issuer: "Microsoft · DIO",
        description: "Distributed NoSQL databases and data modeling.",
      },
      {
        title: "API Deployment in the Cloud",
        issuer: "Microsoft · DIO",
        description: "Publishing and operating APIs in a cloud environment.",
      },
    ],
  },
  {
    label: "Development & AI",
    accent: "mint",
    items: [
      {
        title: "CC50: Introduction to Computer Science",
        issuer: "Fundação Estudar · Harvard",
        description: "Computer science fundamentals and algorithms.",
      },
      {
        title: "Virtual Store Backend (Parse Server + PIX)",
        issuer: "Udemy",
        description: "E-commerce API with PIX payments.",
      },
      {
        title: "Create a Website with HTML, CSS and JavaScript",
        issuer: "Fundação Bradesco",
        description: "Front-end fundamentals and JavaScript interactivity.",
      },
      {
        title: "Artificial Intelligence Immersion",
        issuer: "Alura",
        description: "AI, models and practical applications.",
      },
      {
        title: "Artificial Intelligence Training (CPTIA)",
        issuer: "ENIAC",
        description: "AI applied to solving real-world problems.",
      },
    ],
  },
  {
    label: "Security, Management & Languages",
    accent: "magenta",
    items: [
      {
        title: "Cybersecurity",
        issuer: "FIAP",
        description: "Security, threats and best practices.",
      },
      {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        description: "Networks, risks and environment protection.",
      },
      {
        title: "Lean Six Sigma — Green Belt",
        issuer: "FM2S",
        description: "Continuous improvement and waste reduction.",
      },
      {
        title: "First Leadership Training",
        issuer: "FM2S",
        description: "Leadership, communication and team management.",
      },
      {
        title: "Critical and Creative Thinking",
        issuer: "IBM",
        description: "Analysis, creativity and problem solving.",
      },
      {
        title: "English B1 — MET",
        issuer: "MET",
        description: "Communication and reading in a professional context.",
      },
    ],
  },
];

const profilePt: PresentationContent["profile"] = {
  name: "Rhyan Lemos Silveira",
  role: "Desenvolvedor Full Stack",
  education: "Sistemas de Informação",
  location: "Guarulhos · SP",
  summary:
    "Desenvolvedor Full Stack com base em Sistemas de Informação, foco em aplicações web, APIs e evolução contínua de produtos.",
  current: {
    company: "REVIO Tecnologia",
    role: "Desenvolvedor Full Stack",
    period: "Jan/2025 – Atual",
    description: "Atuação full stack na evolução de produtos digitais.",
    highlights: [
      "Desenvolvimento e sustentação de aplicações web e APIs.",
      "Evolução de produtos, performance e débitos técnicos.",
      "CI/CD, Git e colaboração com o time de produto.",
    ],
  },
  graduation: {
    course: "Sistemas de Informação",
    school: "ENIAC",
    period: "Previsão 07/2027",
    description: "Formação com base em desenvolvimento e arquitetura.",
    highlights: [
      "Banco de dados, MVC e arquitetura de software.",
      "Engenharia de software e projetos acadêmicos.",
      "Participação no ENIAC Innovation Fest.",
    ],
  },
  workStyle: [
    {
      title: "Desenvolvimento",
      description: "Requisitos viram soluções claras, simples e evolutivas.",
    },
    {
      title: "Qualidade",
      description: "Atenção a detalhes, revisão e correção de falhas.",
    },
    {
      title: "Versionamento",
      description: "Git e commits organizados para facilitar a colaboração.",
    },
    {
      title: "Sustentação",
      description: "Causa raiz, correção definitiva e melhoria de performance.",
    },
    {
      title: "Colaboração",
      description: "Comunicação objetiva, alinhamento e troca de feedback.",
    },
    {
      title: "Aprendizado",
      description: "Estudo contínuo aplicado em projetos reais.",
    },
  ],
  stack: [
    "PHP",
    "JavaScript / TypeScript",
    "Python",
    "SQL",
    "Docker",
    "MySQL",
    "React",
    "Tailwind",
    "Git",
    "GitHub Actions",
    "CI/CD",
  ],
};

const profileEn: PresentationContent["profile"] = {
  name: "Rhyan Lemos Silveira",
  role: "Full Stack Developer",
  education: "Information Systems",
  location: "Guarulhos · SP",
  summary:
    "Full Stack Developer with a background in Information Systems, focused on web applications, APIs and continuous product evolution.",
  current: {
    company: "REVIO Tecnologia",
    role: "Full Stack Developer",
    period: "Jan/2025 – Current",
    description: "Full stack work on the evolution of digital products.",
    highlights: [
      "Development and support of web applications and APIs.",
      "Product evolution, performance and technical debt.",
      "CI/CD, Git and collaboration with the product team.",
    ],
  },
  graduation: {
    course: "Information Systems",
    school: "ENIAC",
    period: "Expected 07/2027",
    description: "Education focused on development and architecture.",
    highlights: [
      "Databases, MVC and software architecture.",
      "Software engineering and academic projects.",
      "Participation in ENIAC Innovation Fest.",
    ],
  },
  workStyle: [
    {
      title: "Development",
      description: "Requirements become clear, simple and evolvable solutions.",
    },
    {
      title: "Quality",
      description: "Attention to detail, review and bug fixing.",
    },
    {
      title: "Version control",
      description: "Git and organized commits to make collaboration easier.",
    },
    {
      title: "Support",
      description: "Root cause, definitive fixes and performance improvements.",
    },
    {
      title: "Collaboration",
      description: "Objective communication, alignment and feedback exchange.",
    },
    {
      title: "Learning",
      description: "Continuous study applied to real projects.",
    },
  ],
  stack: [
    "PHP",
    "JavaScript / TypeScript",
    "Python",
    "SQL",
    "Docker",
    "MySQL",
    "React",
    "Tailwind",
    "Git",
    "GitHub Actions",
    "CI/CD",
  ],
};

const skillGroupsPt = [
  { label: "Linguagens", items: ["PHP", "Python", "JavaScript / TypeScript"] },
  { label: "Cloud & DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "Azure"] },
  { label: "Web & Dados", items: ["React", "Tailwind", "APIs REST", "SQL"] },
];

const skillGroupsEn = [
  { label: "Languages", items: ["PHP", "Python", "JavaScript / TypeScript"] },
  { label: "Cloud & DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "Azure"] },
  { label: "Web & Data", items: ["React", "Tailwind", "REST APIs", "SQL"] },
];

const metricsPt: PresentationContent["metrics"] = [
  {
    title: "Organização",
    description:
      "Clareza nas responsabilidades, comunicação eficiente e gestão de tempo para manter a equipe e os projetos alinhados.",
    accent: "mint",
  },
  {
    title: "Visão crítica",
    description:
      "Acompanhar o progresso de perto, identificar falhas e transformar inconsistências em oportunidades de melhoria.",
    accent: "violet",
  },
  {
    title: "Soluções criativas",
    description:
      "Enfrentar novos desafios com repertório técnico e criatividade, evoluindo também as soluções que já existem.",
    accent: "magenta",
  },
];

const metricsEn: PresentationContent["metrics"] = [
  {
    title: "Organization",
    description:
      "Clarity of responsibilities, efficient communication and time management to keep the team and projects aligned.",
    accent: "mint",
  },
  {
    title: "Critical view",
    description:
      "Closely track progress, identify flaws and turn inconsistencies into opportunities for improvement.",
    accent: "violet",
  },
  {
    title: "Creative solutions",
    description:
      "Face new challenges with technical repertoire and creativity, also evolving the solutions that already exist.",
    accent: "magenta",
  },
];

const competencyMatrixPt: PresentationContent["competencyMatrix"] = [
  {
    title: "Já possuo",
    subtitle: "Fortalezas consolidadas",
    items: [
      "Visão analítica",
      "Organização",
      "Visão de negócio",
      "Capacidade de ação",
      "Proatividade",
      "Documentação técnica",
    ],
    accent: "mint",
  },
  {
    title: "Desenvolvendo",
    subtitle: "Habilidades em aprimoramento",
    items: ["Liderança de equipes", "Comunicação assertiva", "Priorização estratégica"],
    accent: "violet",
  },
  {
    title: "Preciso adquirir",
    subtitle: "Próximos focos",
    items: [
      "Persuasão & influência",
      "Exposição de métricas",
      "Apresentação de resultados",
      "Gestão & foco em pessoas",
      "Critérios de documentação",
    ],
    accent: "magenta",
  },
];

const competencyMatrixEn: PresentationContent["competencyMatrix"] = [
  {
    title: "Already have",
    subtitle: "Consolidated strengths",
    items: [
      "Analytical vision",
      "Organization",
      "Business vision",
      "Ability to act",
      "Proactivity",
      "Technical documentation",
    ],
    accent: "mint",
  },
  {
    title: "Developing",
    subtitle: "Skills in progress",
    items: ["Team leadership", "Assertive communication", "Strategic prioritization"],
    accent: "violet",
  },
  {
    title: "Need to acquire",
    subtitle: "Next focus areas",
    items: [
      "Persuasion & influence",
      "Metrics exposure",
      "Presenting results",
      "People management & focus",
      "Documentation criteria",
    ],
    accent: "magenta",
  },
];

const roadmapPt: PresentationContent["roadmap"] = [
  {
    phase: "Fase inicial",
    period: "1 – 3 meses",
    title: "Execução & eficiência",
    outcome: "Ganhar autonomia e consistência técnica.",
    items: [
      "Assumir maiores responsabilidades",
      "Aplicar técnicas de versionamento",
      "Dominar e estruturar pipelines",
      "Lean Six Sigma Green Belt",
    ],
    accent: "mint",
  },
  {
    phase: "Fase intermediária",
    period: "3 – 6 meses",
    title: "Domínio técnico & IA",
    outcome: "Ser referência técnica em automação e IA.",
    items: [
      "Liderança técnica entre pares",
      "Apresentação de resultados e KPIs",
      "DevOps, CI/CD e automação",
      "Aplicação de LLMs e IA generativa",
    ],
    accent: "violet",
  },
  {
    phase: "Fase avançada",
    period: "6 – 12 meses",
    title: "Gestão & mentoria",
    outcome: "Liderar pessoas e projetos de ponta a ponta.",
    items: [
      "Programa de mentoria",
      "Apresentações executivas",
      "Liderança e gestão de equipes",
      "Gestão ponta a ponta de projetos",
    ],
    accent: "magenta",
  },
];

const roadmapEn: PresentationContent["roadmap"] = [
  {
    phase: "Initial phase",
    period: "1 – 3 months",
    title: "Execution & efficiency",
    outcome: "Gain autonomy and technical consistency.",
    items: [
      "Take on greater responsibilities",
      "Apply version control techniques",
      "Master and structure pipelines",
      "Lean Six Sigma Green Belt",
    ],
    accent: "mint",
  },
  {
    phase: "Intermediate phase",
    period: "3 – 6 months",
    title: "Technical mastery & AI",
    outcome: "Become a technical reference in automation and AI.",
    items: [
      "Technical leadership among peers",
      "Presenting results and KPIs",
      "DevOps, CI/CD and automation",
      "Applying LLMs and generative AI",
    ],
    accent: "violet",
  },
  {
    phase: "Advanced phase",
    period: "6 – 12 months",
    title: "Management & mentoring",
    outcome: "Lead people and projects end to end.",
    items: [
      "Mentoring program",
      "Executive presentations",
      "Leadership and team management",
      "End-to-end project management",
    ],
    accent: "magenta",
  },
];

const linksPt: PresentationContent["links"] = [
  {
    label: "Blog",
    handle: "medium.com/@rhyanlemos",
    href: "https://medium.com/@rhyanlemos",
    icon: "blog",
  },
  {
    label: "LinkedIn",
    handle: "@rhyan-lemos-silveira",
    href: "https://www.linkedin.com/in/rhyan-lemos-silveira/",
    icon: "/img-home/contact/linkedin.png",
  },
  {
    label: "GitHub",
    handle: "@rhyan05",
    href: "https://github.com/rhyan05",
    icon: "/img-home/contact/github.png",
    invert: true,
  },
  {
    label: "YouTube",
    handle: "youtube.com/@rhyan05lemos91",
    href: "https://www.youtube.com/@rhyan05lemos91",
    icon: "/img-home/contact/youtube.png",
  },
];

const linksEn: PresentationContent["links"] = [
  {
    label: "Blog",
    handle: "medium.com/@rhyanlemos",
    href: "https://medium.com/@rhyanlemos",
    icon: "blog",
  },
  {
    label: "LinkedIn",
    handle: "@rhyan-lemos-silveira",
    href: "https://www.linkedin.com/in/rhyan-lemos-silveira/?locale=en-US",
    icon: "/img-home/contact/linkedin.png",
  },
  {
    label: "GitHub",
    handle: "@rhyan05",
    href: "https://github.com/rhyan05",
    icon: "/img-home/contact/github.png",
    invert: true,
  },
  {
    label: "YouTube",
    handle: "youtube.com/@rhyan05lemos91",
    href: "https://www.youtube.com/@rhyan05lemos91",
    icon: "/img-home/contact/youtube.png",
  },
];

const pt: PresentationContent = {
  deckSlides: deckSlidesPt,
  profile: profilePt,
  certificateGroups: certificateGroupsPt,
  certificateHighlightCount: certificateGroupsPt.reduce(
    (total, group) => total + group.items.length,
    0,
  ),
  talkHighlights: talks.pt,
  projectGroups: buildProjectGroups("pt"),
  projectCount: projects.pt.length,
  skillGroups: skillGroupsPt,
  metrics: metricsPt,
  competencyMatrix: competencyMatrixPt,
  roadmap: roadmapPt,
  links: linksPt,
};

const en: PresentationContent = {
  deckSlides: deckSlidesEn,
  profile: profileEn,
  certificateGroups: certificateGroupsEn,
  certificateHighlightCount: certificateGroupsEn.reduce(
    (total, group) => total + group.items.length,
    0,
  ),
  talkHighlights: talks.en,
  projectGroups: buildProjectGroups("en"),
  projectCount: projects.en.length,
  skillGroups: skillGroupsEn,
  metrics: metricsEn,
  competencyMatrix: competencyMatrixEn,
  roadmap: roadmapEn,
  links: linksEn,
};

export const presentation: Record<Lang, PresentationContent> = { pt, en };

export const portfolioUrl =
  "https://portifolio-e232-83ywbv1he-rhyans-projects-36b8ad89.vercel.app/";

export const email = "rhyan05@outlook.com";
