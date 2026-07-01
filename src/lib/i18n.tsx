import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ru" | "zh";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  en: {
    "nav.services": "Services",
    "nav.work": "Portfolio",
    "nav.process": "Process",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.start": "Start a project",
    "hero.badge": "Hong Kong · Full-cycle AI product studio",
    "hero.title.a": "From market gap",
    "hero.title.b": "to",
    "hero.title.c": "AI-powered products.",
    "hero.lead":
      "Research, strategy, design and engineering for software, cloud and AI teams. One senior team, from the first interview to launch.",
    "hero.cta.primary": "Start a project",
    "hero.cta.secondary": "See our work",
    "hero.trust": "Trusted by teams building in",
    "footer.tagline":
      "A full-cycle product studio from Hong Kong. Research, strategy, design and engineering for software, cloud and AI teams.",
    "footer.navigate": "Navigate",
    "footer.contact": "Contact",
  },
  ru: {
    "nav.services": "Услуги",
    "nav.work": "Портфолио",
    "nav.process": "Процесс",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "cta.start": "Начать проект",
    "hero.badge": "Гонконг · Студия полного цикла с фокусом на ИИ",
    "hero.title.a": "От ниши на рынке",
    "hero.title.b": "—",
    "hero.title.c": "до продукта на ИИ.",
    "hero.lead":
      "Исследования, стратегия, дизайн и разработка для софтверных, облачных и AI-команд. Одна сильная команда — от первого интервью до запуска.",
    "hero.cta.primary": "Начать проект",
    "hero.cta.secondary": "Наши работы",
    "hero.trust": "Нам доверяют команды в",
    "footer.tagline":
      "Студия полного цикла из Гонконга. Исследования, стратегия, дизайн и разработка для софтверных, облачных и AI-команд.",
    "footer.navigate": "Навигация",
    "footer.contact": "Контакты",
  },
  zh: {
    "nav.services": "服务",
    "nav.work": "案例",
    "nav.process": "流程",
    "nav.about": "关于",
    "nav.contact": "联系",
    "cta.start": "启动项目",
    "hero.badge": "香港 · 全周期 AI 产品工作室",
    "hero.title.a": "从市场机会",
    "hero.title.b": "到",
    "hero.title.c": "AI 驱动的产品。",
    "hero.lead":
      "为软件、云和 AI 团队提供调研、策略、设计与工程。一支资深团队——从首次访谈到产品上线。",
    "hero.cta.primary": "启动项目",
    "hero.cta.secondary": "查看案例",
    "hero.trust": "服务过的团队来自",
    "footer.tagline": "来自香港的全周期产品工作室。为软件、云和 AI 团队提供调研、策略、设计与工程。",
    "footer.navigate": "导航",
    "footer.contact": "联系",
  },
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "zh",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "ru" || saved === "zh") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const t = (k: string) => dictionaries[lang][k] ?? dictionaries.en[k] ?? k;

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);