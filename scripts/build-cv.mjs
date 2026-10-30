import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const htmlPath = path.join(root, "resume", "cv.html");
const outputDir = path.join(root, "public", "img-home", "curriculo");
const outPaths = {
  pt: path.join(outputDir, "Rhyan-Lemos-Silveira-CV.pdf"),
  en: path.join(outputDir, "Rhyan-Lemos-Silveira-CV-EN.pdf"),
};
const edgePath = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find((candidate) => fs.existsSync(candidate));

if (!edgePath) {
  throw new Error("Microsoft Edge não encontrado.");
}

const port = 9337;
const profileDir = path.join(os.tmpdir(), `rhyan-cv-${Date.now()}`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fs.mkdirSync(outputDir, { recursive: true });

const edge = spawn(
  edgePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let ws;
let seq = 0;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

try {
  let target;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      target = targets.find((item) => item.type === "page");
      if (target) break;
    } catch {}
    await sleep(250);
  }

  if (!target) throw new Error("Não foi possível conectar ao Edge.");

  ws = new WebSocket(target.webSocketDebuggerUrl);
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const handler = pending.get(message.id);
    if (!handler) return;
    pending.delete(message.id);
    if (message.error) handler.reject(message.error);
    else handler.resolve(message.result);
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  await send("Page.enable");

  for (const lang of ["pt", "en"]) {
    await send("Page.navigate", { url: `${pathToFileURL(htmlPath).href}?lang=${lang}` });
    await sleep(1200);

    const result = await send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    });

    fs.writeFileSync(outPaths[lang], Buffer.from(result.data, "base64"));
    console.log(`PDF gerado: ${path.relative(root, outPaths[lang])}`);
  }
} finally {
  if (ws) {
    try {
      await send("Browser.close");
    } catch {}
    ws.close();
  }
  if (!edge.killed) edge.kill();
  await sleep(500);
  try {
    fs.rmSync(profileDir, { recursive: true, force: true });
  } catch {}
}
