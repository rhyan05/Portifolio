import fsModule from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";
import {
  certificateHighlights,
  competencyMatrix,
  deckSlides,
  email,
  links,
  metrics,
  portfolioUrl,
  profile,
  projectAccents,
  projectCategoryLabels,
  projectCount,
  projectHighlights,
  roadmap,
  skillGroups,
  talkHighlights,
} from "../src/data/presentation";
import { timeline } from "../src/data/timeline";
import { certifications } from "../src/data/certifications";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Rhyan Lemos";
pptx.company = "Rhyan.dev";
pptx.subject = "Apresentação profissional";
pptx.title = "Rhyan Lemos — Desenvolvedor Full Stack";
pptx.revision = "1";
pptx.theme = { headFontFace: "Segoe UI", bodyFontFace: "Segoe UI" };

const root = process.cwd();
const bgPath = path.join(root, "scripts", "assets", "deck-bg.jpg");
const outPath = path.join(
  root,
  "public",
  "img-home",
  "apresentacoes",
  "rhyan-lemos-apresentacao.pptx",
);

const C = {
  ink: "05080F",
  night: "08111C",
  panel: "0D1826",
  fg: "E8F1F3",
  muted: "93A6B8",
  mint: "2EF2B6",
  violet: "8B5CF6",
  magenta: "FF4D8D",
  white: "FFFFFF",
};

const accent: Record<string, string> = {
  mint: C.mint,
  violet: C.violet,
  magenta: C.magenta,
};

const UNIT = 13.333 / 1280;
const u = (px: number) => px * UNIT;
const fs = (px: number) => px * 0.75;
const TOTAL_SLIDES = deckSlides.length;

type Slide = ReturnType<typeof pptx.addSlide>;

function asset(file: string) {
  return path.join(root, "scripts", "assets", file);
}

function publicAsset(file: string) {
  return path.join(root, "public", file);
}

function addBackground(slide: Slide) {
  slide.background = { path: bgPath };
}

function addText(
  slide: Slide,
  value: string | PptxGenJS.TextProps[],
  x: number,
  y: number,
  w: number,
  h: number,
  options: PptxGenJS.TextPropsOptions = {},
) {
  slide.addText(value, {
    x: u(x),
    y: u(y),
    w: u(w),
    h: u(h),
    margin: 0,
    fontFace: "Segoe UI",
    fontSize: fs(12),
    color: C.fg,
    valign: "top",
    ...options,
  });
}

function addShape(
  slide: Slide,
  shape: PptxGenJS.ShapeType,
  x: number,
  y: number,
  w: number,
  h: number,
  options: PptxGenJS.ShapeProps = {},
) {
  slide.addShape(shape, {
    x: u(x),
    y: u(y),
    w: u(w),
    h: u(h),
    ...options,
  });
}

function addCard(slide: Slide, x: number, y: number, w: number, h: number, accentColor?: string) {
  addShape(slide, pptx.ShapeType.roundRect, x, y, w, h, {
    rectRadius: 0.06,
    fill: {
      color: accentColor ?? C.white,
      transparency: accentColor ? 94 : 95,
    },
    line: {
      color: accentColor ?? C.white,
      transparency: accentColor ? 78 : 90,
      width: 0.75,
    },
  });
}

function chipWidth(label: string) {
  return Math.max(42, label.length * 6.2 + 16);
}

function addChip(
  slide: Slide,
  label: string,
  x: number,
  y: number,
  color: string = C.mint,
  width?: number,
) {
  const w = width ?? chipWidth(label);
  addShape(slide, pptx.ShapeType.roundRect, x, y, w, 22, {
    rectRadius: 0.5,
    fill: { color, transparency: 90 },
    line: { color, transparency: 72, width: 0.5 },
  });
  addText(slide, label, x + 6, y + 4, w - 12, 14, {
    fontSize: fs(10),
    color,
    bold: true,
    align: "center",
  });
  return w;
}

function addChips(
  slide: Slide,
  labels: string[],
  startX: number,
  startY: number,
  maxWidth: number,
  color: string = C.mint,
) {
  let x = startX;
  let y = startY;

  for (const label of labels) {
    const w = chipWidth(label);
    if (x + w > startX + maxWidth) {
      x = startX;
      y += 28;
    }
    addChip(slide, label, x, y, color, w);
    x += w + 6;
  }

  return y + 24;
}

function addCenteredChips(
  slide: Slide,
  labels: string[],
  centerX: number,
  y: number,
  color: string = C.mint,
) {
  const widths = labels.map(chipWidth);
  const total = widths.reduce((sum, width) => sum + width, 0) + (labels.length - 1) * 8;
  let x = centerX - total / 2;

  labels.forEach((label, index) => {
    addChip(slide, label, x, y, color, widths[index]);
    x += widths[index] + 8;
  });
}

function addTopBar(slide: Slide, number: number) {
  addShape(slide, pptx.ShapeType.roundRect, 64, 40, 34, 34, {
    rectRadius: 0.28,
    fill: { color: C.violet },
    line: { color: C.violet },
  });
  addText(slide, "R", 64, 42, 34, 30, {
    fontSize: fs(17),
    bold: true,
    color: C.ink,
    align: "center",
    valign: "middle",
  });
  addText(
    slide,
    [
      { text: "Rhyan", options: { color: C.fg } },
      { text: ".dev", options: { color: C.mint } },
    ],
    108,
    43,
    160,
    28,
    { fontSize: fs(18), bold: true, valign: "middle" },
  );
  addText(slide, `RHYAN LEMOS · ${String(number).padStart(2, "0")} / ${TOTAL_SLIDES}`, 900, 48, 316, 20, {
    fontSize: fs(10),
    color: C.muted,
    align: "right",
    charSpacing: 1.5,
  });
}

function addTitle(slide: Slide, title: string, subtitle?: string) {
  addText(slide, title, 64, 116, 1152, 52, {
    fontSize: fs(34),
    bold: true,
    color: C.fg,
  });
  if (subtitle) {
    addText(slide, subtitle, 64, 160, 1152, 24, {
      fontSize: fs(13),
      color: C.muted,
    });
  }
}

function addEyebrow(slide: Slide, label: string, x: number, y: number, width = 180) {
  addShape(slide, pptx.ShapeType.roundRect, x, y, width, 30, {
    rectRadius: 0.5,
    fill: { color: C.mint, transparency: 90 },
    line: { color: C.mint, transparency: 70, width: 0.75 },
  });
  addText(slide, label, x + 8, y + 8, width - 16, 16, {
    fontSize: fs(9),
    bold: true,
    color: C.mint,
    align: "center",
    charSpacing: 1,
  });
}

function addPortrait(slide: Slide, x: number, y: number, size: number) {
  addShape(slide, pptx.ShapeType.ellipse, x - 18, y - 18, size + 36, size + 36, {
    fill: { type: "none" },
    line: { color: C.violet, transparency: 65, width: 1 },
  });
  addShape(slide, pptx.ShapeType.ellipse, x - 34, y - 34, size + 68, size + 68, {
    fill: { type: "none" },
    line: { color: C.mint, transparency: 80, width: 1, dashType: "dash" },
  });
  slide.addImage({
    path: asset("rhyan-circle.png"),
    x: u(x),
    y: u(y),
    w: u(size),
    h: u(size),
  });
}

function addIcon(slide: Slide, file: string, x: number, y: number, size: number) {
  slide.addImage({
    path: publicAsset(file),
    x: u(x),
    y: u(y),
    w: u(size),
    h: u(size),
  });
}

function addCover() {
  const slide = pptx.addSlide();
  addBackground(slide);

  addEyebrow(slide, "APRESENTAÇÃO · 2026", 64, 64, 210);

  addText(slide, "QUEM SOU", 64, 136, 760, 100, {
    fontSize: fs(88),
    bold: true,
    color: C.fg,
  });
  addText(slide, "EU?", 64, 222, 360, 100, {
    fontSize: fs(88),
    bold: true,
    color: C.mint,
  });
  addText(slide, "E no que trabalho?", 64, 326, 540, 38, {
    fontSize: fs(28),
    color: C.fg,
  });
  addShape(slide, pptx.ShapeType.rect, 64, 382, 160, 2, {
    fill: { color: C.mint },
    line: { type: "none" },
  });
  addText(slide, "Rhyan Lemos Silveira", 64, 408, 540, 28, {
    fontSize: fs(16),
    bold: true,
    color: C.fg,
  });
  addText(slide, "Desenvolvedor Full Stack · Sistemas de Informação", 64, 438, 600, 24, {
    fontSize: fs(13),
    color: C.muted,
  });

  addPortrait(slide, 860, 160, 300);

  addShape(slide, pptx.ShapeType.roundRect, 820, 474, 380, 34, {
    rectRadius: 0.5,
    fill: { color: C.night, transparency: 15 },
    line: { color: C.mint, transparency: 60, width: 0.75 },
  });
  addText(slide, "Full Stack Developer", 820, 484, 380, 18, {
    fontSize: fs(10),
    bold: true,
    color: C.mint,
    align: "center",
  });

  addShape(slide, pptx.ShapeType.roundRect, 1100, 208, 108, 30, {
    rectRadius: 0.5,
    fill: { color: C.night, transparency: 15 },
    line: { color: C.white, transparency: 80, width: 0.75 },
  });
  addIcon(slide, "img-home/icon-skills/framework/React.png", 1112, 215, 15);
  addText(slide, "React", 1130, 216, 66, 16, { fontSize: fs(10), bold: true });

  addShape(slide, pptx.ShapeType.roundRect, 778, 404, 122, 30, {
    rectRadius: 0.5,
    fill: { color: C.night, transparency: 15 },
    line: { color: C.white, transparency: 80, width: 0.75 },
  });
  addIcon(slide, "img-home/icon-skills/hard-skills/TypeScript.png", 790, 411, 15);
  addText(slide, "TypeScript", 808, 412, 82, 16, { fontSize: fs(10), bold: true });

  addShape(slide, pptx.ShapeType.roundRect, 64, 648, 34, 34, {
    rectRadius: 0.28,
    fill: { color: C.violet },
    line: { color: C.violet },
  });
  addText(slide, "R", 64, 650, 34, 30, {
    fontSize: fs(17),
    bold: true,
    color: C.ink,
    align: "center",
    valign: "middle",
  });
  addText(
    slide,
    [
      { text: "Rhyan", options: { color: C.fg } },
      { text: ".dev", options: { color: C.mint } },
    ],
    108,
    651,
    160,
    28,
    { fontSize: fs(18), bold: true, valign: "middle" },
  );
  addText(slide, `01 / ${TOTAL_SLIDES}`, 1080, 656, 136, 20, {
    fontSize: fs(9),
    color: C.muted,
    align: "right",
    charSpacing: 1.5,
  });

  slide.addNotes(
    "Capa da apresentação. Quem sou eu, no que trabalho e uma introdução visual ao meu perfil profissional.",
  );
}

function addProfile() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 2);
  addTitle(slide, "Quem sou eu e no que trabalho", `${profile.name} · ${profile.role}`);

  addText(slide, profile.summary, 64, 200, 360, 84, {
    fontSize: fs(13),
    color: C.muted,
    lineSpacing: fs(18),
  });
  addChips(slide, profile.stack, 64, 300, 360, C.mint);

  addCard(slide, 64, 500, 360, 120, C.mint);
  addText(slide, "BASE", 84, 516, 120, 14, {
    fontSize: fs(8),
    bold: true,
    color: C.mint,
    charSpacing: 1,
  });
  addText(slide, profile.location, 84, 536, 300, 26, {
    fontSize: fs(17),
    bold: true,
    color: C.fg,
  });
  addText(slide, `${profile.education} · ${profile.graduation.school}`, 84, 566, 320, 20, {
    fontSize: fs(9),
    color: C.muted,
  });

  addCard(slide, 450, 190, 250, 150, C.mint);
  addText(slide, "ATUAÇÃO ATUAL", 466, 206, 220, 14, {
    fontSize: fs(8),
    bold: true,
    color: C.mint,
    charSpacing: 1,
  });
  addText(slide, profile.current.company, 466, 226, 220, 34, {
    fontSize: fs(19),
    bold: true,
    color: C.fg,
  });
  addText(slide, profile.current.role, 466, 264, 220, 18, {
    fontSize: fs(11),
    color: C.fg,
  });
  addText(slide, profile.current.description, 466, 286, 220, 26, {
    fontSize: fs(9),
    color: C.muted,
    lineSpacing: fs(11),
  });
  addText(slide, profile.current.period, 466, 318, 220, 14, {
    fontSize: fs(8),
    color: C.muted,
  });

  addCard(slide, 720, 190, 250, 150, C.violet);
  addText(slide, "FORMAÇÃO", 736, 206, 220, 14, {
    fontSize: fs(8),
    bold: true,
    color: C.violet,
    charSpacing: 1,
  });
  addText(slide, profile.graduation.course, 736, 226, 220, 34, {
    fontSize: fs(19),
    bold: true,
    color: C.fg,
  });
  addText(slide, profile.graduation.school, 736, 264, 220, 18, {
    fontSize: fs(11),
    color: C.fg,
  });
  addText(slide, profile.graduation.description, 736, 286, 220, 26, {
    fontSize: fs(9),
    color: C.muted,
    lineSpacing: fs(11),
  });
  addText(slide, profile.graduation.period, 736, 318, 220, 14, {
    fontSize: fs(8),
    color: C.muted,
  });

  addCard(slide, 450, 360, 520, 260);
  addText(slide, "COMO EU TRABALHO", 466, 376, 400, 14, {
    fontSize: fs(8),
    bold: true,
    color: C.muted,
    charSpacing: 1,
  });
  profile.workStyle.forEach((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 466 + column * 250;
    const y = 410 + row * 80;
    addText(slide, `0${index + 1}`, x, y, 22, 18, {
      fontSize: fs(9),
      bold: true,
      color: C.mint,
    });
    addText(slide, item.title, x + 22, y, 200, 18, {
      fontSize: fs(10),
      bold: true,
      color: C.fg,
    });
    addText(slide, item.description, x + 22, y + 18, 210, 26, {
      fontSize: fs(8),
      color: C.muted,
      lineSpacing: fs(10),
    });
  });

  slide.addNotes(
    "Perfil profissional: resumo, stack, localização, atuação atual na REVIO, formação em Sistemas de Informação e forma de trabalho.",
  );
}

function addEvolution() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 3);
  addEyebrow(slide, "MINHA EVOLUÇÃO", 550, 110, 180);

  addText(slide, "Minha evolução", 240, 168, 800, 64, {
    fontSize: fs(58),
    bold: true,
    color: C.fg,
    align: "center",
  });
  addText(slide, "profissional", 240, 224, 800, 64, {
    fontSize: fs(58),
    bold: true,
    color: C.mint,
    align: "center",
  });
  addText(
    slide,
    "Da base técnica ao desenvolvimento full stack: experiências, projetos e próximos passos.",
    240,
    300,
    800,
    24,
    { fontSize: fs(14), color: C.muted, align: "center" },
  );

  addShape(slide, pptx.ShapeType.rect, 180, 420, 920, 2, {
    fill: { color: C.mint, transparency: 60 },
    line: { type: "none" },
  });

  const labels: Record<string, string> = {
    "2022": "BASE TÉCNICA",
    "2023": "FREELANCE",
    "2024": "PROJETOS & IA",
    "2025": "REVIO",
    "2026": "ATUAL",
  };

  timeline.forEach((entry, index) => {
    const centerX = 180 + index * 230;
    addShape(slide, pptx.ShapeType.ellipse, centerX - 6, 414, 12, 12, {
      fill: { color: entry.current ? C.mint : entry.future ? C.violet : C.ink },
      line: { color: C.mint, transparency: 40, width: 1 },
    });
    addText(slide, entry.period, centerX - 40, 442, 80, 32, {
      fontSize: fs(20),
      bold: true,
      color: entry.current ? C.mint : C.fg,
      align: "center",
    });
    addText(slide, labels[entry.period] ?? "", centerX - 60, 474, 120, 18, {
      fontSize: fs(8),
      color: C.muted,
      align: "center",
      charSpacing: 0.8,
    });
  });

  slide.addNotes(
    "Linha do tempo resumida: 2022 base técnica, 2023 freelance e graduação, 2024 projetos e IA, 2025 REVIO e 2026 como ano atual.",
  );
}

function addTrajectory() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 4);
  addTitle(
    slide,
    "Minha trajetória profissional",
    "Da base técnica ao full stack: experiências, projetos e próximos passos.",
  );

  addShape(slide, pptx.ShapeType.rect, 64, 220, 1152, 2, {
    fill: { color: C.mint, transparency: 60 },
    line: { type: "none" },
  });

  const columnWidth = 220;
  const gap = 8;

  timeline.forEach((entry, index) => {
    const x = 64 + index * (columnWidth + gap);
    const color = entry.current ? C.mint : entry.future ? C.violet : C.white;

    addShape(slide, pptx.ShapeType.ellipse, x - 5, 214, 10, 10, {
      fill: { color: entry.current ? C.mint : entry.future ? C.violet : C.ink },
      line: { color: C.mint, transparency: 40, width: 1 },
    });

    addCard(slide, x, 240, columnWidth, 300, color === C.white ? undefined : color);

    addText(slide, entry.period, x + 12, 252, 110, 36, {
      fontSize: fs(24),
      bold: true,
      color: entry.current ? C.mint : C.fg,
    });

    if (entry.current) {
      addChip(slide, "ATUAL", x + 112, 258, C.mint, 52);
    }
    if (entry.future) {
      addChip(slide, "PLANO", x + 112, 258, C.violet, 52);
    }

    addText(slide, entry.title, x + 12, 296, columnWidth - 24, 34, {
      fontSize: fs(10),
      bold: true,
      color: C.fg,
      lineSpacing: fs(11),
    });
    addText(slide, entry.company ?? "", x + 12, 332, columnWidth - 24, 30, {
      fontSize: fs(7),
      color: C.muted,
      charSpacing: 0.5,
      lineSpacing: fs(9),
    });

    entry.highlights.slice(0, 3).forEach((highlight, highlightIndex) => {
      addText(slide, `▸ ${highlight}`, x + 12, 364 + highlightIndex * 30, columnWidth - 24, 30, {
        fontSize: fs(8),
        color: C.muted,
        lineSpacing: fs(9),
      });
    });

    if (entry.tags && entry.tags.length > 0) {
      addText(slide, entry.tags.slice(0, 4).join("  ·  "), x + 12, 508, columnWidth - 24, 20, {
        fontSize: fs(7),
        color: C.muted,
      });
    }
  });

  slide.addNotes(
    "Trajetória em cinco colunas: 2022, 2023, 2024, 2025 na REVIO e 2026 como ano atual.",
  );
}

function addCertificates() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 5);
  addTitle(slide, "Certificados & habilidades", "Aprendizado contínuo aplicado ao dia a dia.");

  addCard(slide, 64, 190, 360, 450);
  addText(slide, `${certifications.length}+`, 84, 212, 300, 90, {
    fontSize: fs(62),
    bold: true,
    color: C.mint,
  });
  addText(slide, "certificações e cursos", 84, 302, 300, 24, {
    fontSize: fs(15),
    bold: true,
    color: C.fg,
  });
  addText(slide, "Cloud, segurança, desenvolvimento, IA, gestão e idiomas.", 84, 332, 320, 40, {
    fontSize: fs(10),
    color: C.muted,
    lineSpacing: fs(13),
  });

  let groupY = 410;
  skillGroups.forEach((group) => {
    addText(slide, group.label.toUpperCase(), 84, groupY, 300, 14, {
      fontSize: fs(7),
      color: C.muted,
      charSpacing: 1,
    });
    groupY = addChips(slide, group.items, 84, groupY + 16, 300, C.mint) + 18;
  });

  certificateHighlights.forEach((certificate, index) => {
    const x = 450 + (index % 3) * 260;
    const y = 190 + Math.floor(index / 3) * 230;
    addCard(slide, x, y, 245, 215, accent[certificate.accent]);

    addText(slide, certificate.issuer.toUpperCase(), x + 14, y + 14, 215, 14, {
      fontSize: fs(6.5),
      color: C.muted,
      charSpacing: 1,
    });
    addText(slide, certificate.title, x + 14, y + 38, 217, 72, {
      fontSize: fs(11.5),
      bold: true,
      color: C.fg,
      lineSpacing: fs(13.5),
    });
    addText(slide, certificate.description, x + 14, y + 114, 217, 54, {
      fontSize: fs(7.5),
      color: C.muted,
      lineSpacing: fs(9),
    });
    addText(slide, certificate.year, x + 14, y + 184, 100, 14, {
      fontSize: fs(7.5),
      color: C.muted,
    });
  });

  slide.addNotes(
    `Certificados: ${certifications.length}+ cursos. Destaques em Cybersecurity (FIAP), Azure Pipelines/CI-CD (Microsoft · DIO), Lean Six Sigma e Primeira Liderança (FM2S), inglês B1 (MET) e Imersão IA (Alura).`,
  );
}

function addTalks() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 6);
  addTitle(
    slide,
    "Palestras & eventos",
    `${talkHighlights.length} eventos, workshops e imersões que acompanhei.`,
  );

  const highlight = talkHighlights.find((talk) => talk.highlight) ?? talkHighlights[0];
  const others = talkHighlights.filter((talk) => talk !== highlight);

  addCard(slide, 64, 190, 1152, 96, C.magenta);
  addText(slide, highlight.event.toUpperCase(), 84, 204, 800, 14, {
    fontSize: fs(7),
    color: C.magenta,
    charSpacing: 1,
  });
  addText(slide, highlight.title, 84, 222, 980, 26, {
    fontSize: fs(16),
    bold: true,
    color: C.fg,
  });
  if (highlight.description) {
    addText(slide, highlight.description, 84, 250, 960, 26, {
      fontSize: fs(8),
      color: C.muted,
      lineSpacing: fs(10),
    });
  }
  addText(slide, highlight.year ?? "", 1120, 204, 72, 14, {
    fontSize: fs(8),
    color: C.muted,
    align: "right",
  });

  others.forEach((talk, index) => {
    const x = 64 + (index % 2) * 584;
    const y = 300 + Math.floor(index / 2) * 108;

    addCard(slide, x, y, 568, 96);
    addText(slide, talk.event.toUpperCase(), x + 16, y + 14, 420, 14, {
      fontSize: fs(7),
      color: C.muted,
      charSpacing: 1,
    });
    addText(slide, talk.title, x + 16, y + 32, 500, 36, {
      fontSize: fs(10),
      bold: true,
      color: C.fg,
      lineSpacing: fs(12),
    });
    addText(slide, talk.year ?? "", x + 500, y + 14, 52, 14, {
      fontSize: fs(8),
      color: C.muted,
      align: "right",
    });
  });

  slide.addNotes(
    `Palestras e eventos: ${talkHighlights.map((talk) => talk.title).join("; ")}.`,
  );
}

function addProjects() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 7);
  addTitle(
    slide,
    "Projetos em destaque",
    `${projectHighlights.length} projetos em destaque · ${projectCount} no portfólio.`,
  );

  projectHighlights.forEach((project, index) => {
    const x = 64 + (index % 3) * 392;
    const y = 190 + Math.floor(index / 3) * 220;
    const color = accent[projectAccents[project.category]];

    addCard(slide, x, y, 368, 205, color);
    addText(
      slide,
      projectCategoryLabels[project.category].toUpperCase(),
      x + 16,
      y + 16,
      200,
      14,
      { fontSize: fs(7), color, charSpacing: 1 },
    );
    addText(slide, project.title, x + 16, y + 38, 336, 44, {
      fontSize: fs(12),
      bold: true,
      color: C.fg,
      lineSpacing: fs(14),
    });
    addText(slide, project.summary, x + 16, y + 86, 336, 54, {
      fontSize: fs(8),
      color: C.muted,
      lineSpacing: fs(10),
    });
    addText(slide, project.tech.slice(0, 3).join("  ·  "), x + 16, y + 160, 336, 18, {
      fontSize: fs(7.5),
      color: C.muted,
    });
  });

  addText(
    slide,
    `${projectCount} projetos no portfólio · github.com/rhyan05`,
    64,
    636,
    1152,
    16,
    { fontSize: fs(8), color: C.muted, align: "center", charSpacing: 1.2 },
  );

  slide.addNotes(
    `Projetos em destaque: ${projectHighlights.map((project) => project.title).join("; ")}. Portfólio completo em github.com/rhyan05.`,
  );
}

function addMetrics() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 8);
  addTitle(
    slide,
    "Minhas métricas",
    "Uma boa organização traz clareza, melhora a comunicação e otimiza o tempo.",
  );

  addCard(slide, 64, 190, 1152, 90);
  addText(
    slide,
    "“Uma boa organização, tanto em equipe quanto em projetos, aumenta a eficácia: traz clareza nas responsabilidades, melhora a comunicação e otimiza a gestão do tempo.”",
    84,
    208,
    1112,
    58,
    { fontSize: fs(12), color: C.fg, lineSpacing: fs(16) },
  );

  metrics.forEach((metric, index) => {
    const x = 64 + index * 384;
    addCard(slide, x, 310, 368, 240, accent[metric.accent]);
    addText(slide, `0${index + 1}`, x + 24, 330, 120, 60, {
      fontSize: fs(36),
      bold: true,
      color: accent[metric.accent],
    });
    addText(slide, metric.title, x + 24, 392, 320, 28, {
      fontSize: fs(17),
      bold: true,
      color: C.fg,
    });
    addText(slide, metric.description, x + 24, 424, 320, 92, {
      fontSize: fs(10),
      color: C.muted,
      lineSpacing: fs(13),
    });
  });

  slide.addNotes(
    "Três frentes: organização, visão crítica para projetos e soluções criativas e funcionais.",
  );
}

function addMatrix() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 9);
  addTitle(
    slide,
    "Plano de carreira",
    "Matriz de competências · autoavaliação e direcionamento estratégico.",
  );

  competencyMatrix.forEach((column, index) => {
    const x = 64 + index * 384;
    addCard(slide, x, 190, 368, 430, accent[column.accent]);
    addText(slide, column.subtitle.toUpperCase(), x + 24, 208, 320, 14, {
      fontSize: fs(7),
      color: accent[column.accent],
      charSpacing: 1,
    });
    addText(slide, column.title, x + 24, 228, 320, 30, {
      fontSize: fs(20),
      bold: true,
      color: C.fg,
    });

    column.items.forEach((item, itemIndex) => {
      const y = 272 + itemIndex * 40;
      addShape(slide, pptx.ShapeType.roundRect, x + 24, y, 320, 30, {
        rectRadius: 0.3,
        fill: { color: C.white, transparency: 97 },
        line: { color: C.white, transparency: 93, width: 0.5 },
      });
      addShape(slide, pptx.ShapeType.ellipse, x + 34, y + 12, 6, 6, {
        fill: { color: accent[column.accent] },
        line: { type: "none" },
      });
      addText(slide, item, x + 48, y + 8, 280, 18, {
        fontSize: fs(9),
        color: C.fg,
      });
    });
  });

  addText(
    slide,
    "AUTOAVALIAÇÃO CONTÍNUA · DIRECIONAMENTO ESTRATÉGICO",
    64,
    640,
    1152,
    18,
    {
      fontSize: fs(8),
      color: C.muted,
      align: "center",
      charSpacing: 1.5,
    },
  );

  slide.addNotes(
    "Matriz de competências: fortalezas consolidadas, habilidades em desenvolvimento e próximos focos.",
  );
}

function addRoadmap() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 10);
  addTitle(slide, "Trajetória em 3 etapas", "Roadmap estratégico de crescimento.");

  addShape(slide, pptx.ShapeType.rect, 64, 290, 1152, 2, {
    fill: { color: C.mint, transparency: 60 },
    line: { type: "none" },
  });

  roadmap.forEach((phase, index) => {
    const x = 64 + index * 384;
    addShape(slide, pptx.ShapeType.ellipse, x, 272, 36, 36, {
      fill: { color: accent[phase.accent] },
      line: { color: accent[phase.accent] },
    });
    addText(slide, String(index + 1), x, 277, 36, 24, {
      fontSize: fs(12),
      bold: true,
      color: C.ink,
      align: "center",
      valign: "middle",
    });
    addText(slide, phase.period.toUpperCase(), x + 48, 282, 200, 18, {
      fontSize: fs(9),
      color: C.muted,
      charSpacing: 1,
    });

    addCard(slide, x, 330, 368, 250, accent[phase.accent]);
    addText(slide, phase.phase.toUpperCase(), x + 20, 346, 320, 14, {
      fontSize: fs(7),
      color: C.muted,
      charSpacing: 1,
    });
    addText(slide, phase.title, x + 20, 366, 320, 26, {
      fontSize: fs(16),
      bold: true,
      color: C.fg,
    });
    phase.items.forEach((item, itemIndex) => {
      addText(slide, `▸ ${item}`, x + 20, 402 + itemIndex * 24, 320, 20, {
        fontSize: fs(9),
        color: C.muted,
      });
    });
    addShape(slide, pptx.ShapeType.rect, x + 20, 538, 328, 1, {
      fill: { color: C.white, transparency: 90 },
      line: { type: "none" },
    });
    addText(slide, phase.outcome, x + 20, 548, 328, 30, {
      fontSize: fs(8),
      color: C.fg,
      lineSpacing: fs(10),
    });
  });

  slide.addNotes(
    "Roadmap em três etapas: execução e eficiência, domínio técnico e IA, gestão e mentoria.",
  );
}

function addLinks() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 11);
  addTitle(slide, "Onde me encontrar", "Vamos trocar ideias sobre tecnologia, projetos e carreira.");

  links.forEach((link, index) => {
    const x = 64 + (index % 2) * 584;
    const y = 240 + Math.floor(index / 2) * 130;
    addCard(slide, x, y, 568, 110);

    addShape(slide, pptx.ShapeType.roundRect, x + 20, y + 30, 50, 50, {
      rectRadius: 0.22,
      fill: { color: C.white, transparency: 94 },
      line: { color: C.white, transparency: 90, width: 0.75 },
    });

    if (link.icon === "blog") {
      addText(slide, "B", x + 20, y + 38, 50, 30, {
        fontSize: fs(20),
        bold: true,
        color: C.mint,
        align: "center",
      });
    } else {
      const iconPath =
        link.label === "GitHub" ? asset("github-white.png") : publicAsset(link.icon);
      slide.addImage({
        path: iconPath,
        x: u(x + 33),
        y: u(y + 43),
        w: u(24),
        h: u(24),
      });
    }

    addText(slide, link.label, x + 90, y + 28, 440, 24, {
      fontSize: fs(16),
      bold: true,
      color: C.fg,
    });
    addText(slide, link.handle, x + 90, y + 56, 440, 18, {
      fontSize: fs(10),
      color: C.muted,
    });
  });

  addCenteredChips(slide, [email, "Disponível para conexões"], 640, 540, C.mint);

  slide.addNotes(
    `Links e contato: ${email}. GitHub @rhyan05, LinkedIn rhyan-lemos-silveira, blog e YouTube em breve.`,
  );
}

function addClosing() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 12);

  addText(slide, "R", 980, 360, 300, 300, {
    fontSize: fs(250),
    bold: true,
    color: C.white,
    transparency: 97,
    align: "center",
  });

  addEyebrow(slide, "MEU SITE", 550, 150, 180);

  addText(slide, "Vamos", 200, 212, 880, 80, {
    fontSize: fs(66),
    bold: true,
    color: C.fg,
    align: "center",
  });
  addText(slide, "conversar?", 200, 278, 880, 80, {
    fontSize: fs(66),
    bold: true,
    color: C.violet,
    align: "center",
  });
  addText(
    slide,
    "Obrigado por acompanhar minha trajetória. O portfólio completo, projetos e formas de contato estão online.",
    300,
    374,
    680,
    46,
    { fontSize: fs(14), color: C.muted, align: "center", lineSpacing: fs(18) },
  );

  addCenteredChips(
    slide,
    [email, "linkedin.com/in/rhyan-lemos-silveira", "github.com/rhyan05"],
    640,
    450,
    C.mint,
  );

  addText(slide, portfolioUrl, 200, 512, 880, 20, {
    fontSize: fs(8),
    color: C.muted,
    align: "center",
  });

  slide.addNotes(
    "Fechamento: obrigado, contatos e link do portfólio online. " + portfolioUrl,
  );
}

async function main() {
  addCover();
  addProfile();
  addEvolution();
  addTrajectory();
  addCertificates();
  addTalks();
  addProjects();
  addMetrics();
  addMatrix();
  addRoadmap();
  addLinks();
  addClosing();

  fsModule.mkdirSync(path.dirname(outPath), { recursive: true });
  await pptx.writeFile({ fileName: outPath });

  const size = fsModule.statSync(outPath).size / 1024 / 1024;
  console.log(`PPTX gerado: ${path.relative(root, outPath)} (${size.toFixed(2)} MB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
