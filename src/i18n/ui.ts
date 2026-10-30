import type { Lang } from "./types";

const pt = {
  meta: {
    title: "Rhyan Lemos - Desenvolvedor Full Stack",
    description:
      "Portfólio de Rhyan Lemos, Desenvolvedor Full Stack: projetos, skills, certificações, palestras e apresentação profissional.",
  },
  nav: {
    about: "Sobre",
    trajectory: "Trajetória",
    skills: "Skills",
    certifications: "Certificações",
    projects: "Projetos",
    talks: "Palestras",
    presentation: "Apresentação",
    contact: "Contato",
    menu: "Abrir menu",
    closeMenu: "Fechar menu",
    mainAria: "Navegação principal",
  },
  language: {
    label: "Idioma",
    pt: "PT",
    en: "EN",
  },
  hero: {
    available: "Disponível para novos desafios",
    greeting: "Olá, eu sou",
    role: "Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.",
    description:
      "Especializado em desenvolvimento web moderno, gestão de projetos e metodologias ágeis. Busco constantemente novos desafios para expandir meus conhecimentos e contribuir para projetos impactantes.",
    viewResume: "Ver Currículo",
    linkedin: "LinkedIn",
    viewPresentation: "Ver apresentação",
    stats: {
      certifications: "Certificações",
      talks: "Palestras & eventos",
      stack: "Web & Cloud",
    },
    badge: "Full Stack Developer",
    explore: "Explore",
    goToAbout: "Ir para a seção Sobre",
  },
  about: {
    eyebrow: "Sobre mim",
    title: "Como eu trabalho",
    subtitle: "Conheça um pouco mais sobre minha jornada e expertise",
    cards: [
      {
        title: "Desenvolvimento Full Stack",
        description:
          "Sou um desenvolvedor apaixonado por tecnologia, com experiência sólida em desenvolvimento web completo. Trabalho com as mais modernas tecnologias para criar aplicações robustas, escaláveis e com excelente experiência do usuário.",
      },
      {
        title: "Design & UX/UI",
        description:
          "Possuo expertise em design de interfaces e experiência do usuário, criando layouts intuitivos e visualmente atrativos. Desenvolvo posts profissionais e apresentações animadas que comunicam efetivamente a mensagem desejada.",
      },
      {
        title: "Gestão & Metodologias Ágeis",
        description:
          "Experiência prática em gestão de pessoas e projetos, aplicando metodologias ágeis no dia a dia. Busco constantemente novos conhecimentos e conexões para evoluir profissionalmente e contribuir para o sucesso das equipes.",
      },
    ],
  },
  trajectory: {
    eyebrow: "Minha história",
    title: "Minha trajetória",
    subtitle:
      "Do suporte e da infraestrutura ao desenvolvimento full stack: os passos que construíram minha carreira.",
    current: "Atual",
    plan: "Plano",
    viewSlides: "Ver a versão em slides",
  },
  skills: {
    eyebrow: "Stack",
    title: "Skills & Tecnologias",
    subtitle: "Tecnologias e ferramentas que utilizo no desenvolvimento",
    levels: {
      basic: "Básico",
      intermediate: "Intermediário",
      advanced: "Avançado",
    },
  },
  certifications: {
    eyebrow: "Aprendizado contínuo",
    title: "Certificações",
    selection: "Estes são os principais destaques. Veja a lista completa —",
    countLabel: "certificações",
    on: "no",
    linkedin: "LinkedIn ↗",
    filters: {
      all: "Todas",
      cloud: "Cloud & Azure",
      security: "Segurança",
      development: "Desenvolvimento",
      ai: "IA",
      management: "Gestão & Soft Skills",
      language: "Idiomas",
    },
    viewAllPrefix: "Ver todas as",
    viewAllSuffix: "no LinkedIn ↗",
    enlarge: "Ampliar certificado:",
  },
  projects: {
    eyebrow: "Portfólio",
    title: "Projetos",
    subtitle: "Alguns dos projetos que desenvolvi ao longo da minha jornada",
    searchPlaceholder: "Buscar por título...",
    searchAria: "Buscar projetos por título",
    filters: {
      all: "Todos",
      frontend: "Front-end",
      backend: "Back-end",
      "machine-learning": "Machine Learning",
    },
    empty: "Nenhum projeto encontrado para essa busca.",
    sourceCode: "Código Fonte",
    demo: "Demo",
    openDemo: "Abrir demo de",
  },
  talks: {
    eyebrow: "Comunidade",
    title: "Palestras & Eventos",
    subtitle: "Participação em palestras, oficinas e eventos de tecnologia e inovação",
    highlight: "Destaque",
    more: "E mais de 20 palestras, oficinas e eventos de tecnologia e inovação.",
    enlarge: "Ampliar:",
  },
  presentation: {
    eyebrow: "Em slides",
    title: "Minha trajetória em slides",
    subtitle:
      "Uma visão rápida da minha jornada, competências e plano de carreira. Arraste, use as setas ou ative o carrossel.",
    carouselAria: "Apresentação profissional em slides",
    openFullscreen: "Abrir apresentação em tela cheia",
    goToSlide: "Ir para o slide",
    previous: "Slide anterior",
    next: "Próximo slide",
    of: "de",
    play: "Ativar carrossel",
    pause: "Pausar carrossel",
    downloadTitle: "Baixar apresentação em PowerPoint",
    downloadShort: "PPTX",
    downloadFull: "Baixar apresentação (.pptx)",
    close: "Fechar apresentação",
    section: "Apresentação",
    downloadName: "Rhyan-Lemos-Apresentacao.pptx",
  },
  contact: {
    eyebrow: "Contato",
    title: "Vamos Trabalhar Juntos?",
    subtitle:
      "Estou sempre aberto a novas oportunidades e desafios interessantes. Se você tem um projeto em mente ou gostaria de discutir possibilidades de colaboração, não hesite em entrar em contato.",
    resume: "Currículo",
    location: "Guarulhos · SP · Brasil",
  },
  footer: {
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
  common: {
    showMore: "Ver mais",
    showLess: "Ver menos",
    close: "Fechar",
    backToTop: "Voltar ao topo",
  },
};

export type Ui = typeof pt;

const en: Ui = {
  meta: {
    title: "Rhyan Lemos - Full Stack Developer",
    description:
      "Portfolio of Rhyan Lemos, Full Stack Developer: projects, skills, certifications, talks and professional presentation.",
  },
  nav: {
    about: "About",
    trajectory: "Career",
    skills: "Skills",
    certifications: "Certifications",
    projects: "Projects",
    talks: "Talks",
    presentation: "Presentation",
    contact: "Contact",
    menu: "Open menu",
    closeMenu: "Close menu",
    mainAria: "Main navigation",
  },
  language: {
    label: "Language",
    pt: "PT",
    en: "EN",
  },
  hero: {
    available: "Available for new challenges",
    greeting: "Hi, I'm",
    role: "Full Stack Developer passionate about creating innovative solutions and exceptional digital experiences.",
    description:
      "Specialized in modern web development, project management and agile methodologies. I constantly seek new challenges to expand my knowledge and contribute to impactful projects.",
    viewResume: "View Resume",
    linkedin: "LinkedIn",
    viewPresentation: "View presentation",
    stats: {
      certifications: "Certifications",
      talks: "Talks & events",
      stack: "Web & Cloud",
    },
    badge: "Full Stack Developer",
    explore: "Explore",
    goToAbout: "Go to About section",
  },
  about: {
    eyebrow: "About me",
    title: "How I work",
    subtitle: "Learn a little more about my journey and expertise",
    cards: [
      {
        title: "Full Stack Development",
        description:
          "I'm a developer passionate about technology, with solid experience in complete web development. I work with the most modern technologies to create robust, scalable applications with an excellent user experience.",
      },
      {
        title: "Design & UX/UI",
        description:
          "I have expertise in interface design and user experience, creating intuitive and visually appealing layouts. I develop professional posts and animated presentations that effectively communicate the intended message.",
      },
      {
        title: "Management & Agile Methodologies",
        description:
          "Hands-on experience in people and project management, applying agile methodologies daily. I constantly seek new knowledge and connections to grow professionally and contribute to team success.",
      },
    ],
  },
  trajectory: {
    eyebrow: "My story",
    title: "My career",
    subtitle:
      "From support and infrastructure to full stack development: the steps that built my career.",
    current: "Current",
    plan: "Plan",
    viewSlides: "View the slide version",
  },
  skills: {
    eyebrow: "Stack",
    title: "Skills & Technologies",
    subtitle: "Technologies and tools I use in development",
    levels: {
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
  },
  certifications: {
    eyebrow: "Continuous learning",
    title: "Certifications",
    selection: "These are the main highlights. See the full list —",
    countLabel: "certifications",
    on: "on",
    linkedin: "LinkedIn ↗",
    filters: {
      all: "All",
      cloud: "Cloud & Azure",
      security: "Security",
      development: "Development",
      ai: "AI",
      management: "Management & Soft Skills",
      language: "Languages",
    },
    viewAllPrefix: "See all",
    viewAllSuffix: "on LinkedIn ↗",
    enlarge: "Enlarge certificate:",
  },
  projects: {
    eyebrow: "Portfolio",
    title: "Projects",
    subtitle: "Some of the projects I developed along my journey",
    searchPlaceholder: "Search by title...",
    searchAria: "Search projects by title",
    filters: {
      all: "All",
      frontend: "Front-end",
      backend: "Back-end",
      "machine-learning": "Machine Learning",
    },
    empty: "No projects found for this search.",
    sourceCode: "Source Code",
    demo: "Demo",
    openDemo: "Open demo of",
  },
  talks: {
    eyebrow: "Community",
    title: "Talks & Events",
    subtitle: "Participation in talks, workshops and technology and innovation events",
    highlight: "Featured",
    more: "And more than 20 talks, workshops and technology and innovation events.",
    enlarge: "Enlarge:",
  },
  presentation: {
    eyebrow: "In slides",
    title: "My career in slides",
    subtitle:
      "A quick overview of my journey, skills and career plan. Drag, use the arrows or start the carousel.",
    carouselAria: "Professional slide presentation",
    openFullscreen: "Open presentation in fullscreen",
    goToSlide: "Go to slide",
    previous: "Previous slide",
    next: "Next slide",
    of: "of",
    play: "Start carousel",
    pause: "Pause carousel",
    downloadTitle: "Download PowerPoint presentation",
    downloadShort: "PPTX",
    downloadFull: "Download presentation (.pptx)",
    close: "Close presentation",
    section: "Presentation",
    downloadName: "Rhyan-Lemos-Presentation-EN.pptx",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's Work Together?",
    subtitle:
      "I'm always open to new opportunities and interesting challenges. If you have a project in mind or would like to discuss collaboration possibilities, don't hesitate to get in touch.",
    resume: "Resume",
    location: "Guarulhos · SP · Brazil",
  },
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  common: {
    showMore: "Show more",
    showLess: "Show less",
    close: "Close",
    backToTop: "Back to top",
  },
};

export const ui: Record<Lang, Ui> = { pt, en };
