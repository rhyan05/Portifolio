# Portfólio

Portfólio pessoal de **Rhyan Lemos** apresentando projetos, habilidades e formas de contato.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Three.js** (cena 3D do hero)

## Estrutura

```
index.html              → entry do Vite
public/img-home/        → imagens (referenciadas como /img-home/...)
src/
  main.tsx              → bootstrap do React
  App.tsx               → composição das seções
  index.css             → Tailwind + tokens de tema + keyframes
  types.ts              → tipos (Project, Skill, ...)
  data/                 → conteúdo (projetos, skills, certificações, palestras, trajetória e apresentação)
  components/           → Header, Hero, About, Trajectory, Skills, Certifications, Projects, Talks, Presentation, Contact, Footer, BackToTop
  hooks/                → useScrollDirection
scripts/
  build-deck.ts         → gera o PPTX editável a partir dos dados
  deck-background.html  → fundo aurora usado no PPTX
```

## Comandos

```bash
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento (http://localhost:5173)
npm run build     # type-check + build de produção em dist/
npm run preview   # pré-visualiza o build de produção
npm run deck      # regenera o PPTX editável a partir dos dados
```

## Funcionalidades

- Design responsivo.
- Hero com cena 3D em Three.js e animações de scroll.
- Seção "Minha trajetória" com linha do tempo.
- Busca e filtro de projetos por categoria (Front-end, Back-end, Machine Learning).
- Seção de certificações com os certificados em destaque.
- Seção de palestras e eventos, com destaque para o Febraban Tech.
- Apresentação em slides nativos, com carrossel 3D, viewer em tela cheia e download em PPTX.
- Menu mobile com animação.
- Navbar que oculta/mostra conforme o scroll e botão "voltar ao topo".

## Demonstração

[portifolio](https://rhyanportifolio.vercel.app/)
