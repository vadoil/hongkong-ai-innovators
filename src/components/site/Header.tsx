import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Portfolio" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
            Meridian<span className="text-primary">.hk</span>
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
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-border px-1 py-1 text-xs sm:flex">
            <button className="rounded-full bg-foreground/10 px-2.5 py-1 text-foreground">
              EN
            </button>
            <button className="rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground">
              RU
            </button>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_oklch(1_0_0_/_0.08),0_10px_30px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}