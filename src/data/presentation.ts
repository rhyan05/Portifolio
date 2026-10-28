export const presentationUrl = "/img-home/apresentacoes/rhyan-lemos-apresentacao.pptx";

export type SlideVariant =
  | "cover"
  | "profile"
  | "evolution"
  | "trajectory"
  | "certificates"
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

export const deckSlides: DeckSlide[] = [
  { id: "cover", navTitle: "Quem sou eu?", variant: "cover" },
  { id: "profile", navTitle: "Quem sou eu e no que trabalho", variant: "profile" },
  { id: "evolution", navTitle: "Minha evolução profissional", variant: "evolution" },
  { id: "trajectory", navTitle: "Minha trajetória profissional", variant: "trajectory" },
  { id: "certificates", navTitle: "Certificados & habilidades", variant: "certificates" },
  { id: "metrics", navTitle: "Minhas métricas", variant: "metrics" },
  { id: "matrix", navTitle: "Plano de carreira", variant: "matrix" },
  { id: "roadmap", navTitle: "Trajetória em 3 etapas", variant: "roadmap" },
  { id: "links", navTitle: "Onde me encontrar", variant: "links" },
  { id: "closing", navTitle: "Meu site", variant: "closing" },
];

export const profile = {
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
    description: "Desenvolvimento, sustentação e evolução de aplicações.",
  },
  graduation: {
    course: "Sistemas de Informação",
    school: "ENIAC",
    period: "Previsão 07/2027",
    description: "Banco de dados, MVC e arquitetura de software.",
  },
  workStyle: [
    { title: "Desenvolvimento", description: "Criação e evolução de aplicações e APIs." },
    { title: "Versionamento", description: "Git para controle, histórico e colaboração." },
    { title: "Sustentação", description: "Correção de problemas e melhoria de performance." },
    { title: "Visão de equipe", description: "Organização, colaboração e gestão de demandas." },
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

export type Accent = "mint" | "violet" | "magenta";

export const certificateHighlights: {
  title: string;
  issuer: string;
  year: string;
  description: string;
  accent: Accent;
}[] = [
  {
    title: "Cybersecurity",
    issuer: "FIAP",
    year: "2025",
    description: "Fundamentos de segurança, ameaças e boas práticas.",
    accent: "mint",
  },
  {
    title: "Azure Pipelines — CI/CD, Docker e Kubernetes",
    issuer: "Microsoft · DIO",
    year: "2026",
    description: "CI/CD, containers e orquestração no Azure DevOps.",
    accent: "violet",
  },
  {
    title: "Lean Six Sigma — Yellow Belt",
    issuer: "FM2S",
    year: "2022",
    description: "Melhoria contínua e redução de desperdícios.",
    accent: "magenta",
  },
  {
    title: "Inglês B1 — MET",
    issuer: "MET",
    year: "2024",
    description: "Comunicação e leitura em contexto profissional.",
    accent: "mint",
  },
];

export const skillGroups = [
  { label: "Linguagens", items: ["PHP", "Python", "JavaScript / TypeScript"] },
  { label: "Cloud & DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "Azure"] },
  { label: "Web & Dados", items: ["React", "Tailwind", "APIs REST", "SQL"] },
];

export const metrics = [
  {
    title: "Organização",
    description:
      "Clareza nas responsabilidades, comunicação eficiente e gestão de tempo para manter a equipe e os projetos alinhados.",
    accent: "mint" as Accent,
  },
  {
    title: "Visão crítica",
    description:
      "Acompanhar o progresso de perto, identificar falhas e transformar inconsistências em oportunidades de melhoria.",
    accent: "violet" as Accent,
  },
  {
    title: "Soluções criativas",
    description:
      "Enfrentar novos desafios com repertório técnico e criatividade, evoluindo também as soluções que já existem.",
    accent: "magenta" as Accent,
  },
];

export const competencyMatrix: { title: string; subtitle: string; items: string[]; accent: Accent }[] = [
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

export const roadmap = [
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
    accent: "mint" as Accent,
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
    accent: "violet" as Accent,
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
    accent: "magenta" as Accent,
  },
];

export const links: { label: string; handle: string; icon: string; invert?: boolean }[] = [
  { label: "Blog", handle: "Em breve", icon: "blog" },
  { label: "LinkedIn", handle: "@rhyan-lemos-silveira", icon: "/img-home/contact/linkedin.png" },
  {
    label: "GitHub",
    handle: "@rhyan05",
    icon: "/img-home/contact/github.png",
    invert: true,
  },
  { label: "YouTube", handle: "Em breve", icon: "/img-home/contact/youtube.png" },
];

export const portfolioUrl =
  "https://portifolio-e232-83ywbv1he-rhyans-projects-36b8ad89.vercel.app/";

export const email = "rhyan05@outlook.com";
