import type { Lang } from "./types";

const pt = {
  cover: {
    eyebrow: "Apresentação · 2026",
    title1: "QUEM SOU",
    title2: "EU?",
    subtitle: "E no que trabalho?",
    role: "Desenvolvedor Full Stack · Sistemas de Informação",
    notes:
      "Capa da apresentação. Quem sou eu, no que trabalho e uma introdução visual ao meu perfil profissional.",
  },
  profile: {
    title: "Quem sou eu e no que trabalho",
    base: "Base",
    current: "Atuação atual",
    education: "Formação",
    work: "Como eu trabalho",
    notes:
      "Perfil profissional: resumo, stack, localização, atuação atual na REVIO com responsabilidades, formação em Sistemas de Informação com destaques acadêmicos e seis práticas de trabalho.",
  },
  evolution: {
    eyebrow: "Minha evolução",
    title1: "Minha evolução",
    title2: "profissional",
    subtitle:
      "Da base técnica ao desenvolvimento full stack: experiências, projetos e próximos passos.",
    labels: {
      "2022": "Base técnica",
      "2023": "Freelance",
      "2024": "Projetos & IA",
      "2025": "REVIO",
      "2026": "Atual",
    },
    notes:
      "Linha do tempo resumida: 2022 base técnica, 2023 freelance e graduação, 2024 projetos e IA, 2025 REVIO e 2026 como ano atual.",
  },
  trajectory: {
    title: "Minha trajetória profissional",
    subtitle: "Da base técnica ao full stack: experiências, projetos e próximos passos.",
    current: "Atual",
    plan: "Plano",
    notes: "Trajetória em cinco colunas: 2022, 2023, 2024, 2025 na REVIO e 2026 como ano atual.",
  },
  certificates: {
    title: "Certificados & habilidades",
    highlighted: "certificados em destaque",
    total: "no total",
    countLabel: "certificações e cursos",
    description: "Cloud, segurança, desenvolvimento, IA, gestão e idiomas.",
    notes:
      "Certificados e cursos em destaque, organizados por cloud, desenvolvimento, segurança, gestão e idiomas.",
  },
  talks: {
    title: "Palestras & eventos",
    events: "eventos e imersões",
    notes:
      "Palestras e eventos: participação em conferências, workshops e imersões de tecnologia e inovação.",
  },
  projects: {
    title: "Projetos em destaque",
    subtitle: "projetos em 3 frentes: front-end, back-end e machine learning.",
    footer: "projetos no portfólio · github.com/rhyan05",
    notes:
      "Projetos em destaque nas frentes front-end, back-end e machine learning. Portfólio completo em github.com/rhyan05.",
  },
  metrics: {
    title: "Minhas métricas",
    subtitle: "Uma boa organização traz clareza, melhora a comunicação e otimiza o tempo.",
    quote:
      "“Uma boa organização, tanto em equipe quanto em projetos, aumenta a eficácia: traz clareza nas responsabilidades, melhora a comunicação e otimiza a gestão do tempo.”",
    notes:
      "Três frentes: organização, visão crítica para projetos e soluções criativas e funcionais.",
  },
  matrix: {
    title: "Plano de carreira",
    subtitle: "Matriz de competências · autoavaliação e direcionamento estratégico.",
    footer: "Autoavaliação contínua · direcionamento estratégico",
    notes:
      "Matriz de competências: fortalezas consolidadas, habilidades em desenvolvimento e próximos focos.",
  },
  roadmap: {
    title: "Trajetória em 3 etapas",
    subtitle: "Roadmap estratégico de crescimento.",
    notes:
      "Roadmap em três etapas: execução e eficiência, domínio técnico e IA, gestão e mentoria.",
  },
  links: {
    title: "Onde me encontrar",
    subtitle: "Vamos trocar ideias sobre tecnologia, projetos e carreira.",
    available: "Disponível para conexões",
    notes:
      "Links e contato: GitHub, LinkedIn, blog e YouTube. E-mail para conexões profissionais.",
  },
  closing: {
    eyebrow: "Meu site",
    title1: "Vamos",
    title2: "conversar?",
    description:
      "Obrigado por acompanhar minha trajetória. O portfólio completo, projetos e formas de contato estão online.",
    notes:
      "Fechamento: obrigado, contatos e link do portfólio online.",
  },
  underConstruction: "Slide em construção.",
};

export type DeckText = typeof pt;

const en: DeckText = {
  cover: {
    eyebrow: "Presentation · 2026",
    title1: "WHO",
    title2: "AM I?",
    subtitle: "And what do I work on?",
    role: "Full Stack Developer · Information Systems",
    notes:
      "Presentation cover. Who I am, what I work on and a visual introduction to my professional profile.",
  },
  profile: {
    title: "Who I am and what I work on",
    base: "Foundation",
    current: "Current role",
    education: "Education",
    work: "How I work",
    notes:
      "Professional profile: summary, stack, location, current role at REVIO with responsibilities, Information Systems education with academic highlights and six work practices.",
  },
  evolution: {
    eyebrow: "My evolution",
    title1: "My professional",
    title2: "evolution",
    subtitle:
      "From technical foundation to full stack development: experiences, projects and next steps.",
    labels: {
      "2022": "Technical foundation",
      "2023": "Freelance",
      "2024": "Projects & AI",
      "2025": "REVIO",
      "2026": "Current",
    },
    notes:
      "Condensed timeline: 2022 technical foundation, 2023 freelance and graduation, 2024 projects and AI, 2025 REVIO and 2026 as the current year.",
  },
  trajectory: {
    title: "My professional career",
    subtitle: "From technical foundation to full stack: experiences, projects and next steps.",
    current: "Current",
    plan: "Plan",
    notes: "Career in five columns: 2022, 2023, 2024, 2025 at REVIO and 2026 as the current year.",
  },
  certificates: {
    title: "Certificates & skills",
    highlighted: "featured certificates",
    total: "in total",
    countLabel: "certifications and courses",
    description: "Cloud, security, development, AI, management and languages.",
    notes:
      "Featured certificates and courses, organized by cloud, development, security, management and languages.",
  },
  talks: {
    title: "Talks & events",
    events: "events and immersions",
    notes:
      "Talks and events: participation in conferences, workshops and technology and innovation immersions.",
  },
  projects: {
    title: "Featured projects",
    subtitle: "projects across 3 tracks: front-end, back-end and machine learning.",
    footer: "projects in the portfolio · github.com/rhyan05",
    notes:
      "Featured projects across front-end, back-end and machine learning. Full portfolio at github.com/rhyan05.",
  },
  metrics: {
    title: "My metrics",
    subtitle: "Good organization brings clarity, improves communication and optimizes time.",
    quote:
      "“Good organization, both in teams and in projects, increases effectiveness: it brings clarity to responsibilities, improves communication and optimizes time management.”",
    notes: "Three areas: organization, critical view of projects and creative, functional solutions.",
  },
  matrix: {
    title: "Career plan",
    subtitle: "Competency matrix · self-assessment and strategic direction.",
    footer: "Continuous self-assessment · strategic direction",
    notes:
      "Competency matrix: consolidated strengths, skills in development and next focus areas.",
  },
  roadmap: {
    title: "3-step journey",
    subtitle: "Strategic growth roadmap.",
    notes: "Three-step roadmap: execution and efficiency, technical mastery and AI, management and mentoring.",
  },
  links: {
    title: "Where to find me",
    subtitle: "Let's exchange ideas about technology, projects and career.",
    available: "Available for connections",
    notes:
      "Links and contact: GitHub, LinkedIn, blog and YouTube. Email for professional connections.",
  },
  closing: {
    eyebrow: "My website",
    title1: "Let's",
    title2: "talk?",
    description:
      "Thank you for following my journey. The complete portfolio, projects and contact information are online.",
    notes: "Closing: thank you, contacts and the online portfolio link.",
  },
  underConstruction: "Slide under construction.",
};

export const deckText: Record<Lang, DeckText> = { pt, en };
