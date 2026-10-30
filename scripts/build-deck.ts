import fsModule from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";
import { email, portfolioUrl, presentation } from "../src/data/presentation";
import { certificationTotal } from "../src/data/certifications";
import { timeline } from "../src/data/timeline";
import { deckText } from "../src/i18n/deck";

const lang = process.argv[2] === "en" ? "en" : "pt";
const content = presentation[lang];
const deck = deckText[lang];

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Rhyan Lemos";
pptx.company = "Rhyan.dev";
pptx.subject = lang === "en" ? "Professional presentation" : "ApresentaÃ§Ã£o profissional";
pptx.title =
  lang === "en"
    ? "Rhyan Lemos â€” Full Stack Developer"
    : "Rhyan Lemos â€” Desenvolvedor Full Stack";
pptx.revision = "1";
pptx.theme = { headFontFace: "Segoe UI", bodyFontFace: "Segoe UI" };

const root = process.cwd();
const bgPath = path.join(root, "scripts", "assets", "deck-bg.jpg");
const outPath = path.join(
  root,
  "public",
  "img-home",
  "apresentacoes",
  lang === "en" ? "rhyan-lemos-apresentacao-en.pptx" : "rhyan-lemos-apresentacao.pptx",
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
const TOTAL_SLIDES = content.deckSlides.length;

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
  addText(slide, `RHYAN LEMOS Â· ${String(number).padStart(2, "0")} / ${TOTAL_SLIDES}`, 900, 48, 316, 20, {
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

  addEyebrow(slide, deck.cover.eyebrow.toUpperCase(), 64, 64, 210);

  addText(slide, deck.cover.title1, 64, 136, 760, 100, {
    fontSize: fs(88),
    bold: true,
    color: C.fg,
  });
  addText(slide, deck.cover.title2, 64, 222, 360, 100, {
    fontSize: fs(88),
    bold: true,
    color: C.mint,
  });
  addText(slide, deck.cover.subtitle, 64, 326, 540, 38, {
    fontSize: fs(28),
    color: C.fg,
  });
  addShape(slide, pptx.ShapeType.rect, 64, 382, 160, 2, {
    fill: { color: C.mint },
    line: { type: "none" },
  });
  addText(slide, content.profile.name, 64, 408, 540, 28, {
    fontSize: fs(16),
    bold: true,
    color: C.fg,
  });
  addText(slide, deck.cover.role, 64, 438, 600, 24, {
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
  addIcon(slide, "img-home/icon-skills/hard-skills/typescript.svg", 790, 411, 15);
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

  slide.addNotes(deck.cover.notes);
}

function addProfile() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 2);
  addTitle(slide, deck.profile.title, `${content.profile.name} Â· ${content.profile.role}`);

  addText(slide, content.profile.summary, 64, 200, 330, 84, {
    fontSize: fs(14),
    color: C.muted,
    lineSpacing: fs(18),
  });
  addChips(slide, content.profile.stack, 64, 300, 330, C.mint);

  addCard(slide, 64, 500, 330, 120, C.mint);
  addText(slide, deck.profile.base.toUpperCase(), 84, 516, 120, 14, {
    fontSize: fs(9),
    bold: true,
    color: C.mint,
    charSpacing: 1,
  });
  addText(slide, content.profile.location, 84, 536, 280, 26, {
    fontSize: fs(18),
    bold: true,
    color: C.fg,
  });
  addText(slide, `${content.profile.education} Â· ${content.profile.graduation.school}`, 84, 566, 290, 20, {
    fontSize: fs(10.5),
    color: C.muted,
  });

  addCard(slide, 414, 190, 391, 200, C.mint);
  addText(slide, deck.profile.current.toUpperCase(), 430, 206, 220, 14, {
    fontSize: fs(9),
    bold: true,
    color: C.mint,
    charSpacing: 1,
  });
  addText(slide, content.profile.current.company, 430, 226, 230, 26, {
    fontSize: fs(17),
    bold: true,
    color: C.fg,
  });
  addText(slide, content.profile.current.period, 660, 230, 125, 14, {
    fontSize: fs(8),
    color: C.muted,
    align: "right",
  });
  addText(slide, content.profile.current.role, 430, 254, 230, 18, {
    fontSize: fs(10.5),
    color: C.fg,
  });
  addText(slide, content.profile.current.description, 430, 276, 355, 22, {
    fontSize: fs(9.5),
    color: C.muted,
    lineSpacing: fs(11.5),
  });
  content.profile.current.highlights.forEach((highlight, index) => {
    addText(slide, `â€¢ ${highlight}`, 430, 304 + index * 26, 355, 24, {
      fontSize: fs(9),
      color: C.muted,
      lineSpacing: fs(10.5),
    });
  });

  addCard(slide, 825, 190, 391, 200, C.violet);
  addText(slide, deck.profile.education.toUpperCase(), 841, 206, 220, 14, {
    fontSize: fs(9),
    bold: true,
    color: C.violet,
    charSpacing: 1,
  });
  addText(slide, content.profile.graduation.course, 841, 226, 230, 26, {
    fontSize: fs(17),
    bold: true,
    color: C.fg,
  });
  addText(slide, content.profile.graduation.period, 1070, 230, 125, 14, {
    fontSize: fs(8),
    color: C.muted,
    align: "right",
  });
  addText(slide, content.profile.graduation.school, 841, 254, 230, 18, {
    fontSize: fs(10.5),
    color: C.fg,
  });
  addText(slide, content.profile.graduation.description, 841, 276, 355, 22, {
    fontSize: fs(9.5),
    color: C.muted,
    lineSpacing: fs(11.5),
  });
  content.profile.graduation.highlights.forEach((highlight, index) => {
    addText(slide, `â€¢ ${highlight}`, 841, 304 + index * 26, 355, 24, {
      fontSize: fs(9),
      color: C.muted,
      lineSpacing: fs(10.5),
    });
  });

  addCard(slide, 414, 410, 802, 220);
  addText(slide, deck.profile.work.toUpperCase(), 430, 426, 400, 14, {
    fontSize: fs(9),
    bold: true,
    color: C.muted,
    charSpacing: 1,
  });
  content.profile.workStyle.forEach((item, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = 430 + column * 252;
    const y = 456 + row * 80;
    addText(slide, `0${index + 1}`, x, y, 18, 16, {
      fontSize: fs(9.5),
      bold: true,
      color: C.mint,
    });
    addText(slide, item.title, x + 18, y, 220, 16, {
      fontSize: fs(11),
      bold: true,
      color: C.fg,
    });
    addText(slide, item.description, x + 18, y + 16, 220, 34, {
      fontSize: fs(9.5),
      color: C.muted,
      lineSpacing: fs(11.5),
    });
  });

  slide.addNotes(deck.profile.notes);
}

function addEvolution() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 3);
  addEyebrow(slide, deck.evolution.eyebrow.toUpperCase(), 550, 110, 180);

  addText(slide, deck.evolution.title1, 240, 168, 800, 64, {
    fontSize: fs(58),
    bold: true,
    color: C.fg,
    align: "center",
  });
  addText(slide, deck.evolution.title2, 240, 224, 800, 64, {
    fontSize: fs(58),
    bold: true,
    color: C.mint,
    align: "center",
  });
  addText(
    slide,
    deck.evolution.subtitle,
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

  timeline[lang].forEach((entry, index) => {
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
    addText(
      slide,
      (deck.evolution.labels[entry.period as keyof typeof deck.evolution.labels] ?? "").toUpperCase(),
      centerX - 60,
      474,
      120,
      18,
      {
        fontSize: fs(8),
        color: C.muted,
        align: "center",
        charSpacing: 0.8,
      },
    );
  });

  slide.addNotes(deck.evolution.notes);
}

function addTrajectory() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 4);
  addTitle(
    slide,
    deck.trajectory.title,
    deck.trajectory.subtitle,
  );

  addShape(slide, pptx.ShapeType.rect, 64, 220, 1152, 2, {
    fill: { color: C.mint, transparency: 60 },
    line: { type: "none" },
  });

  const columnWidth = 220;
  const gap = 8;

  timeline[lang].forEach((entry, index) => {
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
      addChip(slide, deck.trajectory.current.toUpperCase(), x + 112, 258, C.mint, 52);
    }
    if (entry.future) {
      addChip(slide, deck.trajectory.plan.toUpperCase(), x + 112, 258, C.violet, 52);
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
      addText(slide, `â–¸ ${highlight}`, x + 12, 364 + highlightIndex * 30, columnWidth - 24, 30, {
        fontSize: fs(8),
        color: C.muted,
        lineSpacing: fs(9),
      });
    });

    if (entry.tags && entry.tags.length > 0) {
      addText(slide, entry.tags.join(" Â· "), x + 12, 496, columnWidth - 24, 40, {
        fontSize: fs(6.5),
        color: C.muted,
        lineSpacing: fs(8),
        valign: "bottom",
      });
    }
  });

  slide.addNotes(deck.trajectory.notes);
}

function addCertificates() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 5);
  addTitle(
    slide,
    deck.certificates.title,
    `${content.certificateHighlightCount} ${deck.certificates.highlighted} Â· ${certificationTotal}+ ${deck.certificates.total}.`,
  );

  addCard(slide, 64, 190, 300, 450);
  addText(slide, `${certificationTotal}+`, 84, 212, 250, 90, {
    fontSize: fs(62),
    bold: true,
    color: C.mint,
  });
  addText(slide, deck.certificates.countLabel, 84, 302, 250, 24, {
    fontSize: fs(15),
    bold: true,
    color: C.fg,
  });
  addText(slide, deck.certificates.description, 84, 332, 255, 40, {
    fontSize: fs(11.5),
    color: C.muted,
    lineSpacing: fs(14),
  });

  let groupY = 410;
  content.skillGroups.forEach((group) => {
    addText(slide, group.label.toUpperCase(), 84, groupY, 250, 14, {
      fontSize: fs(8.5),
      color: C.muted,
      charSpacing: 1,
    });
    groupY = addChips(slide, group.items, 84, groupY + 16, 250, C.mint) + 18;
  });

  content.certificateGroups.forEach((group, groupIndex) => {
    const x = 386 + groupIndex * 282;
    const y = 190;
    const width = 266;
    const height = 450;
    addCard(slide, x, y, width, height, accent[group.accent]);

    addText(slide, group.label.toUpperCase(), x + 14, y + 14, 190, 14, {
      fontSize: fs(8.5),
      bold: true,
      color: accent[group.accent],
      charSpacing: 1,
    });
    addText(slide, String(group.items.length), x + width - 36, y + 14, 22, 14, {
      fontSize: fs(8.5),
      color: C.muted,
      align: "right",
    });

    const step =
      group.items.length > 1
        ? Math.min(68, (height - 42 - 68 - 14) / (group.items.length - 1))
        : 0;

    group.items.forEach((item, index) => {
      const itemY = y + 42 + index * step;
      addText(slide, item.issuer.toUpperCase(), x + 14, itemY, width - 28, 10, {
        fontSize: fs(8),
        color: C.muted,
        charSpacing: 0.8,
      });
      addText(slide, item.title, x + 14, itemY + 10, width - 28, 26, {
        fontSize: fs(10.5),
        bold: true,
        color: C.fg,
        lineSpacing: fs(12),
      });
      addText(slide, item.description, x + 14, itemY + 38, width - 28, 24, {
        fontSize: fs(9.5),
        color: C.muted,
        lineSpacing: fs(11.5),
      });
    });
  });

  slide.addNotes(deck.certificates.notes);
}

function addTalks() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 6);
  const years = [...new Set(content.talkHighlights.map((talk) => talk.year).filter(Boolean))].join(" Â· ");
  addTitle(
    slide,
    deck.talks.title,
    `${content.talkHighlights.length} ${deck.talks.events}${years ? ` Â· ${years}` : ""}.`,
  );

  const highlight = content.talkHighlights.find((talk) => talk.highlight) ?? content.talkHighlights[0];
  const others = content.talkHighlights.filter((talk) => talk !== highlight);

  addCard(slide, 64, 190, 1152, 96, C.magenta);
  addText(slide, highlight.event.toUpperCase(), 84, 204, 800, 14, {
    fontSize: fs(8.5),
    color: C.magenta,
    charSpacing: 1,
  });
  addText(slide, highlight.title, 84, 222, 1020, 26, {
    fontSize: fs(19),
    bold: true,
    color: C.fg,
  });
  if (highlight.description) {
    addText(slide, highlight.description, 84, 250, 1020, 26, {
      fontSize: fs(10.5),
      color: C.muted,
      lineSpacing: fs(12),
    });
  }

  others.forEach((talk, index) => {
    const x = 64 + (index % 2) * 584;
    const y = 300 + Math.floor(index / 2) * 108;

    addCard(slide, x, y, 568, 96);
    addText(slide, talk.event.toUpperCase(), x + 16, y + 12, 500, 14, {
      fontSize: fs(8.5),
      color: C.muted,
      charSpacing: 1,
    });
    addText(slide, talk.title, x + 16, y + 28, 520, 34, {
      fontSize: fs(11),
      bold: true,
      color: C.fg,
      lineSpacing: fs(13),
    });
    if (talk.description) {
      addText(slide, talk.description, x + 16, y + 64, 520, 24, {
        fontSize: fs(9.5),
        color: C.muted,
        lineSpacing: fs(11.5),
      });
    }
  });

  slide.addNotes(deck.talks.notes);
}

function addProjects() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 7);
  addTitle(
    slide,
    deck.projects.title,
    `${content.projectCount} ${deck.projects.subtitle}`,
  );

  content.projectGroups.forEach((group, groupIndex) => {
    const x = 64 + groupIndex * 392;
    const y = 190;
    const width = 368;
    const height = 430;
    const color = accent[group.accent];

    addCard(slide, x, y, width, height, color);
    addText(slide, group.label.toUpperCase(), x + 16, y + 16, 260, 14, {
      fontSize: fs(8.5),
      bold: true,
      color,
      charSpacing: 1,
    });
    addText(slide, String(group.projects.length), x + width - 38, y + 16, 22, 14, {
      fontSize: fs(8.5),
      color: C.muted,
      align: "right",
    });

    group.projects.forEach((project, index) => {
      const itemY = y + 44 + index * 90;
      addText(slide, project.title, x + 16, itemY, width - 32, 24, {
        fontSize: fs(11),
        bold: true,
        color: C.fg,
        lineSpacing: fs(13),
      });
      addText(slide, project.summary, x + 16, itemY + 24, width - 32, 34, {
        fontSize: fs(9.5),
        color: C.muted,
        lineSpacing: fs(11.5),
      });
      addText(slide, project.tech.slice(0, 3).join(" Â· "), x + 16, itemY + 60, width - 32, 16, {
        fontSize: fs(8.5),
        color: C.muted,
      });
    });
  });

  addText(
    slide,
    `${content.projectCount} ${deck.projects.footer}`,
    64,
    636,
    1152,
    16,
    { fontSize: fs(8.5), color: C.muted, align: "center", charSpacing: 1.2 },
  );

  slide.addNotes(deck.projects.notes);
}

function addMetrics() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 8);
  addTitle(
    slide,
    deck.metrics.title,
    deck.metrics.subtitle,
  );

  addCard(slide, 64, 190, 1152, 90);
  addText(
    slide,
    deck.metrics.quote,
    84,
    208,
    1112,
    58,
    { fontSize: fs(12), color: C.fg, lineSpacing: fs(16) },
  );

  content.metrics.forEach((metric, index) => {
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

  slide.addNotes(deck.metrics.notes);
}

function addMatrix() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 9);
  addTitle(
    slide,
    deck.matrix.title,
    deck.matrix.subtitle,
  );

  content.competencyMatrix.forEach((column, index) => {
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
    deck.matrix.footer.toUpperCase(),
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

  slide.addNotes(deck.matrix.notes);
}

function addRoadmap() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 10);
  addTitle(slide, deck.roadmap.title, deck.roadmap.subtitle);

  addShape(slide, pptx.ShapeType.rect, 64, 290, 1152, 2, {
    fill: { color: C.mint, transparency: 60 },
    line: { type: "none" },
  });

  content.roadmap.forEach((phase, index) => {
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
      addText(slide, `â–¸ ${item}`, x + 20, 402 + itemIndex * 24, 320, 20, {
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

  slide.addNotes(deck.roadmap.notes);
}

function addLinks() {
  const slide = pptx.addSlide();
  addBackground(slide);
  addTopBar(slide, 11);
  addTitle(slide, deck.links.title, deck.links.subtitle);

  content.links.forEach((link, index) => {
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
      hyperlink: { url: link.href },
    });
    addText(slide, link.handle, x + 90, y + 56, 440, 18, {
      fontSize: fs(10),
      color: C.muted,
      hyperlink: { url: link.href },
    });
  });

  addCenteredChips(slide, [email, deck.links.available], 640, 540, C.mint);

  slide.addNotes(deck.links.notes);
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

  addEyebrow(slide, deck.closing.eyebrow.toUpperCase(), 550, 150, 180);

  addText(slide, deck.closing.title1, 200, 212, 880, 80, {
    fontSize: fs(66),
    bold: true,
    color: C.fg,
    align: "center",
  });
  addText(slide, deck.closing.title2, 200, 278, 880, 80, {
    fontSize: fs(66),
    bold: true,
    color: C.violet,
    align: "center",
  });
  addText(
    slide,
    deck.closing.description,
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

  slide.addNotes(deck.closing.notes + " " + portfolioUrl);
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

