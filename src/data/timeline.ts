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

export const timeline: TimelineEntry[] = [
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
    company: "REVIO Tecnologia · Jan/2025 – Atual",
    description:
      "Entrei na REVIO como desenvolvedor Full Stack CLT, atuando em desenvolvimento, sustentação e evolução de aplicações.",
    highlights: [
      "Desenvolvimento e sustentação de aplicações e APIs",
      "Performance, débitos técnicos e versionamento com Git",
      "Febraban Tech, AB2L LawTech e workshops de IA",
      "Certificações em Cybersecurity (FIAP) e gestão (FM2S)",
    ],
    tags: ["Full Stack", "PHP", "TypeScript", "CI/CD", "Git"],
    current: true,
  },
  {
    period: "2026",
    title: "Próximos passos",
    company: "Arquitetura e liderança técnica",
    description:
      "Foco em arquitetura, referência técnica e mentoria, com aprofundamento em cloud, automação e inteligência artificial.",
    highlights: [
      "Maior atuação em arquitetura e decisões técnicas",
      "Preparação para referência técnica e mentoria",
      "Lean Six Sigma Green Belt e Azure DevOps/AZ-204",
      "CI/CD, cloud e automação",
    ],
    tags: ["Arquitetura", "Azure", "CI/CD", "Mentoria"],
    future: true,
  },
];
