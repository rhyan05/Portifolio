import type { Lang } from "../i18n/types";
import type { Talk } from "../types";

const pt: Talk[] = [
  {
    title: "Febraban Tech",
    event: "Febraban",
    year: "2025",
    highlight: true,
    image: "/img-home/palestras/febraban-tech.jpeg",
    description:
      "Maior evento de tecnologia e inovação do setor financeiro da América Latina, com conteúdos sobre IA, cloud, dados e o futuro do mercado.",
  },
  {
    title: "Ciclo de Palestras e Painel de Debate — Inovação e Tecnologia",
    event: "ENIAC Innovation Fest",
    year: "2025",
    image: "/img-home/palestras/eniac-innovation-fest.jpg",
    description:
      "Debate sobre inovação, tendências e o papel da tecnologia na formação e no mercado.",
  },
  {
    title: "Oficina: Desvendando as IAs Generativas do Google",
    event: "ENIAC Innovation Fest",
    year: "2025",
    image: "/img-home/palestras/oficina-ias-generativas-google.jpg",
    description:
      "Contato prático com IA generativa do Google, prompts e aplicações no dia a dia.",
  },
  {
    title: "Oficina: Crie seu Próprio Agente de IA",
    event: "Microsoft",
    year: "2025",
    image: "/img-home/palestras/oficina-agente-ia-microsoft.jpg",
    description: "Construção de agentes de IA e automações com ferramentas da Microsoft.",
  },
  {
    title: "IA no Marketing",
    event: "Palestra",
    year: "2025",
    image: "/img-home/palestras/ia-no-marketing.jpg",
    description: "Como a IA apoia criação, segmentação e análise de campanhas.",
  },
  {
    title: "AB2L LawTech Experience",
    event: "AB2L",
    year: "2025",
    image: "/img-home/palestras/ab2l-lawtech.jpg",
    description:
      "Tecnologia aplicada ao jurídico: automação, dados e novos modelos de serviço.",
  },
  {
    title: "Liderança Multigeracional",
    event: "ENIAC",
    year: "2025",
    image: "/img-home/palestras/lideranca-multigeracional.jpg",
    description:
      "Desafios de liderar equipes com diferentes gerações, expectativas e formas de trabalhar.",
  },
];

const en: Talk[] = [
  {
    title: "Febraban Tech",
    event: "Febraban",
    year: "2025",
    highlight: true,
    image: "/img-home/palestras/febraban-tech.jpeg",
    description:
      "The largest technology and innovation event in Latin America's financial sector, with content on AI, cloud, data and the future of the market.",
  },
  {
    title: "Lecture Series and Panel Debate — Innovation and Technology",
    event: "ENIAC Innovation Fest",
    year: "2025",
    image: "/img-home/palestras/eniac-innovation-fest.jpg",
    description:
      "Debate on innovation, trends and the role of technology in education and the market.",
  },
  {
    title: "Workshop: Uncovering Google's Generative AIs",
    event: "ENIAC Innovation Fest",
    year: "2025",
    image: "/img-home/palestras/oficina-ias-generativas-google.jpg",
    description:
      "Hands-on contact with Google generative AI, prompts and everyday applications.",
  },
  {
    title: "Workshop: Build Your Own AI Agent",
    event: "Microsoft",
    year: "2025",
    image: "/img-home/palestras/oficina-agente-ia-microsoft.jpg",
    description: "Building AI agents and automations with Microsoft tools.",
  },
  {
    title: "AI in Marketing",
    event: "Talk",
    year: "2025",
    image: "/img-home/palestras/ia-no-marketing.jpg",
    description: "How AI supports creation, segmentation and campaign analysis.",
  },
  {
    title: "AB2L LawTech Experience",
    event: "AB2L",
    year: "2025",
    image: "/img-home/palestras/ab2l-lawtech.jpg",
    description:
      "Technology applied to law: automation, data and new service models.",
  },
  {
    title: "Multigenerational Leadership",
    event: "ENIAC",
    year: "2025",
    image: "/img-home/palestras/lideranca-multigeracional.jpg",
    description:
      "Challenges of leading teams with different generations, expectations and ways of working.",
  },
];

export const talks: Record<Lang, Talk[]> = { pt, en };
