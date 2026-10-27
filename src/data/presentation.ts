export interface PresentationSlide {
  src: string;
  title: string;
  alt: string;
}

export const presentationUrl = encodeURI(
  "/img-home/apresentacoes/Cópia de me apresentando - slide 2 novo(2).pptx.pptx",
);

export const presentationSlides: PresentationSlide[] = [
  {
    src: "/img-home/apresentacoes/slides/slide-01.jpg",
    title: "Quem sou eu?",
    alt: "Slide 1: Quem sou eu? E no que trabalho?",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-02.jpg",
    title: "Quem sou eu e no que trabalho",
    alt: "Slide 2: apresentação pessoal, atuação atual, formação, stack e forma de trabalho",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-03.jpg",
    title: "Minha evolução profissional",
    alt: "Slide 3: minha evolução profissional",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-04.jpg",
    title: "Minha trajetória profissional",
    alt: "Slide 4: linha do tempo profissional de 2022 a 2026",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-05.jpg",
    title: "Certificados & habilidades",
    alt: "Slide 5: certificados e habilidades",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-06.jpg",
    title: "Minhas métricas",
    alt: "Slide 6: métricas de organização, visão crítica e soluções criativas",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-07.jpg",
    title: "Plano de carreira",
    alt: "Slide 7: plano de carreira e desenvolvimento com matriz de competências",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-08.jpg",
    title: "Trajetória em 3 etapas",
    alt: "Slide 8: roadmap estratégico de crescimento em três etapas",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-09.jpg",
    title: "Onde me encontrar",
    alt: "Slide 9: links para blog, LinkedIn, GitHub e YouTube",
  },
  {
    src: "/img-home/apresentacoes/slides/slide-10.jpg",
    title: "Meu site",
    alt: "Slide 10: meu site",
  },
];
