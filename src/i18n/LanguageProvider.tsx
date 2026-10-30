import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ui } from "./ui";
import type { Ui } from "./ui";
import type { Lang } from "./types";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Ui;
}

const STORAGE_KEY = "rhyan-lang";
const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLang(value: string | null): value is Lang {
  return value === "pt" || value === "en";
}

function detectLang(): Lang {
  if (typeof window === "undefined") return "pt";

  const query = new URLSearchParams(window.location.search).get("lang");
  if (isLang(query)) return query;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}

  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (lang === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = ui[lang].meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", ui[lang].meta.description);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: ui[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
