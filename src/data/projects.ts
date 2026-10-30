import type { Lang } from "../i18n/types";
import type { Project } from "../types";

const pt: Project[] = [
  {
    title: "Apple Shop Clone",
    category: "frontend",
    image: "/img-home/project/front-end/apple-shop.png",
    description:
      "Clone fiel do site oficial da Apple Shop durante o período natalino. Desenvolvido com foco total na responsividade, oferecendo uma experiência perfeita em todos os dispositivos.",
    tech: ["HTML", "CSS", "Bootstrap"],
    demo: "https://clone-apple-shop.vercel.app/",
    github: "https://github.com/rhyan05/Clone-Apple-Shop",
  },
  {
    title: "Meteora E-commerce",
    category: "frontend",
    image: "/img-home/project/front-end/meteora1.png",
    description:
      "Plataforma completa de e-commerce com navegação intuitiva e design moderno. Inclui seções de produtos, promoções, busca avançada e apresentação profissional de catálogo.",
    tech: ["HTML", "CSS", "Bootstrap"],
    demo: "https://meteora-layout.vercel.app/",
    github: "https://github.com/rhyan05/Site-Meteora-layout",
  },
  {
    title: "Gerador de QR Code",
    category: "backend",
    image: "/img-home/project/back-end/QRCode.png",
    description:
      "Ferramenta web para geração rápida de QR Codes a partir de URLs. Permite personalização do tamanho e oferece interface intuitiva sem necessidade de instalação.",
    tech: ["HTML", "CSS", "Tailwind", "JavaScript"],
    demo: "https://gerador-de-qr-code-self.vercel.app/",
    github: "https://github.com/rhyan05/Gerador_de_QRCode",
  },
  {
    title: "Lista de Tarefas",
    category: "backend",
    image: "/img-home/project/back-end/to-do-list.png",
    description:
      "Aplicação web completa para gerenciamento de tarefas pessoais. Permite adicionar, editar, excluir e marcar tarefas como concluídas, com persistência local de dados.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://lista-de-tarefa-iota.vercel.app/",
    github: "https://github.com/rhyan05/Lista-de-Tarefa",
  },
  {
    title: "Projeto Alluh",
    category: "backend",
    image: "/img-home/project/back-end/Alluh.png",
    description:
      "Plataforma completa de gerenciamento de usuários desenvolvida em PHP. Inclui sistema de autenticação, upload de imagens, publicação de conteúdo e controle de privilégios administrativos.",
    tech: ["PHP", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/rhyan05/Projeto_Alluh",
  },
  {
    title: "API Livraria",
    category: "backend",
    image: "/img-home/project/back-end/aspas API.png",
    description:
      "API RESTful completa seguindo padrões CRUD com 5 tabelas interligadas. Desenvolvida com foco em boas práticas de desenvolvimento e arquitetura de banco de dados relacional.",
    tech: ["PHP", "MySQL", "REST API"],
    github: "https://github.com/rhyan05/livraria-API",
  },
  {
    title: "Toni - Assistente Financeiro",
    category: "machine-learning",
    image: "/img-home/project/machine/stone.png",
    description:
      "Solução inovadora de IA desenvolvida em parceria com a Stone. Assistente financeiro personalizado para microempreendedores, oferecendo suporte prático na gestão financeira diária.",
    tech: ["Python", "Machine Learning", "IA"],
    demo: "https://stone-challenge-eight.vercel.app/",
    github: "https://github.com/pedrocruz3/stone-challenge",
  },
  {
    title: "Machine Learning Models",
    category: "machine-learning",
    image: "/img-home/project/machine/machine-learning.png",
    description:
      "Repositório com implementações de algoritmos de aprendizado de máquina e exemplos práticos. Destaque para o modelo Heart na seção de tratamento e classificação de dados médicos.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    github: "https://github.com/rhyan05/Machine-Learning",
  },
];

const en: Project[] = [
  {
    title: "Apple Shop Clone",
    category: "frontend",
    image: "/img-home/project/front-end/apple-shop.png",
    description:
      "Faithful clone of the official Apple Shop website during the holiday season. Built with a strong focus on responsiveness, delivering a seamless experience on every device.",
    tech: ["HTML", "CSS", "Bootstrap"],
    demo: "https://clone-apple-shop.vercel.app/",
    github: "https://github.com/rhyan05/Clone-Apple-Shop",
  },
  {
    title: "Meteora E-commerce",
    category: "frontend",
    image: "/img-home/project/front-end/meteora1.png",
    description:
      "Complete e-commerce platform with intuitive navigation and modern design. Includes product sections, promotions, advanced search and a professional catalog presentation.",
    tech: ["HTML", "CSS", "Bootstrap"],
    demo: "https://meteora-layout.vercel.app/",
    github: "https://github.com/rhyan05/Site-Meteora-layout",
  },
  {
    title: "QR Code Generator",
    category: "backend",
    image: "/img-home/project/back-end/QRCode.png",
    description:
      "Web tool for quickly generating QR Codes from URLs. Allows size customization and offers an intuitive interface with no installation required.",
    tech: ["HTML", "CSS", "Tailwind", "JavaScript"],
    demo: "https://gerador-de-qr-code-self.vercel.app/",
    github: "https://github.com/rhyan05/Gerador_de_QRCode",
  },
  {
    title: "To-Do List",
    category: "backend",
    image: "/img-home/project/back-end/to-do-list.png",
    description:
      "Complete web application for managing personal tasks. Lets users add, edit, delete and complete tasks, with local data persistence.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://lista-de-tarefa-iota.vercel.app/",
    github: "https://github.com/rhyan05/Lista-de-Tarefa",
  },
  {
    title: "Alluh Project",
    category: "backend",
    image: "/img-home/project/back-end/Alluh.png",
    description:
      "Complete user management platform built with PHP. Includes authentication, image uploads, content publishing and administrative privilege control.",
    tech: ["PHP", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/rhyan05/Projeto_Alluh",
  },
  {
    title: "Bookstore API",
    category: "backend",
    image: "/img-home/project/back-end/aspas API.png",
    description:
      "Complete RESTful API following CRUD patterns with 5 interconnected tables. Built with a focus on development best practices and relational database architecture.",
    tech: ["PHP", "MySQL", "REST API"],
    github: "https://github.com/rhyan05/livraria-API",
  },
  {
    title: "Toni - Financial Assistant",
    category: "machine-learning",
    image: "/img-home/project/machine/stone.png",
    description:
      "Innovative AI solution developed in partnership with Stone. A personalized financial assistant for micro-entrepreneurs, offering practical support in daily financial management.",
    tech: ["Python", "Machine Learning", "AI"],
    demo: "https://stone-challenge-eight.vercel.app/",
    github: "https://github.com/pedrocruz3/stone-challenge",
  },
  {
    title: "Machine Learning Models",
    category: "machine-learning",
    image: "/img-home/project/machine/machine-learning.png",
    description:
      "Repository with machine learning algorithm implementations and practical examples. Highlights the Heart model in the medical data processing and classification section.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    github: "https://github.com/rhyan05/Machine-Learning",
  },
];

export const projects: Record<Lang, Project[]> = { pt, en };
