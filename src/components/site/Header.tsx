import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n, type Lang } from "@/lib/i18n";

const nav = [
  { to: "/services", key: "nav.services" },
  { to: "/work", key: "nav.work" },
  { to: "/process", key: "nav.process" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
          <span className="font-display text-base font-semibold tracking-tight text-foreground">
            CWH<span className="text-primary">.hk</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-0.5 rounded-full border border-border px-1 py-1 text-xs sm:flex">
            {(["zh", "en", "ru"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === l
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={lang === l}
              >
                {l === "zh" ? "中" : l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_oklch(1_0_0_/_0.08),0_10px_30px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            {t("cta.start")}
          </Link>
        </div>
      </div>
    </header>
  );
}