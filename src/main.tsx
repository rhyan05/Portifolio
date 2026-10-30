import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { applyMotionToDocument, readMotion } from "./hooks/useMotion";
import "./index.css";

applyMotionToDocument(readMotion());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
