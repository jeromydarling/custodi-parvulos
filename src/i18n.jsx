import { useState, useEffect, createContext, useContext, useCallback } from "react";

const LANG_KEY = "custodi_lang";
const cache = {};

const LangContext = createContext({ lang: "en", setLang: () => {}, t: (s) => s });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || "en"; } catch { return "en"; }
  });

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  }, []);

  const t = useCallback(async (text) => {
    if (!text || lang === "en") return text;
    const key = `${lang}:${text.slice(0, 80)}:${text.length}`;
    if (cache[key]) return cache[key];

    try {
      const r = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: lang }),
      });
      if (!r.ok) return text;
      const data = await r.json();
      cache[key] = data.translated;
      return data.translated;
    } catch {
      return text;
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

// Hook to translate a string and return it as state
export function useTranslation(text) {
  const { lang, t } = useLang();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (lang === "en") { setTranslated(text); return; }
    t(text).then(setTranslated);
  }, [text, lang, t]);

  return translated;
}

// Component that auto-translates its children text
export function T({ children }) {
  const translated = useTranslation(typeof children === "string" ? children : "");
  if (typeof children !== "string") return children;
  return translated;
}
