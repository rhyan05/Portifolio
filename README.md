# Portfólio

Portfólio pessoal de **Rhyan Lemos** apresentando projetos, habilidades e formas de contato.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)

## Estrutura

```
index.html              → entry do Vite
public/img-home/        → imagens (referenciadas como /img-home/...)
src/
  main.tsx              → bootstrap do React
  App.tsx               → composição das seções
  index.css             → Tailwind + tokens de tema + keyframes
  types.ts              → tipos (Project, Skill, ...)
  data/                 → conteúdo (projetos, skills, certificações e palestras)
  components/           → Header, Hero, About, Skills, Certifications, Projects, Talks, Contact, Footer, BackToTop
  hooks/                → useScrollDirection
```

## Comandos

```bash
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento (http://localhost:5173)
npm run build     # type-check + build de produção em dist/
npm run preview   # pré-visualiza o build de produção
```

## Funcionalidades

- Design responsivo.
- Busca e filtro de projetos por categoria (Front-end, Back-end, Machine Learning).
- Seção de certificações com os certificados em destaque.
- Seção de palestras e eventos, com destaque para o Febraban Tech.
- Menu mobile com animação.
- Navbar que oculta/mostra conforme o scroll e botão "voltar ao topo".

## Demonstração

[portifolio](https://portifolio-e232-83ywbv1he-rhyans-projects-36b8ad89.vercel.app/)
