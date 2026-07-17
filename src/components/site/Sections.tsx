import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/lib/reveal";
import {
  ArrowUpRight,
  Search,
  FileText,
  Layers,
  TrendingUp,
  Compass,
  PenTool,
  Cloud,
  Rocket,
  Sparkles,
  Cpu,
  Bot,
  Braces,
  Zap,
  Globe2,
} from "lucide-react";
import caseFintech from "@/assets/case-fintech.jpg";
import caseCloud from "@/assets/case-cloud.jpg";
import caseAi from "@/assets/case-ai.jpg";
import caseHealth from "@/assets/case-health.jpg";
import caseEcom from "@/assets/case-ecom.jpg";
import caseVoice from "@/assets/case-voice.jpg";

export const caseCovers = [caseFintech, caseCloud, caseAi, caseHealth, caseEcom, caseVoice];

/* ---------- HERO ---------- */
export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Aurora layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="absolute -top-40 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 glow-blue animate-aurora" />
        <div
          className="absolute -right-40 top-20 h-[520px] w-[520px] glow-jade animate-aurora"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute -left-40 top-60 h-[480px] w-[480px] glow-magenta animate-aurora"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm reveal reveal-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-jade animate-ping-soft" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
              </span>
              {t("hero.badge")}
            </div>

            <h1
              className="font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[86px] reveal reveal-in"
              style={{ animationDelay: "0.08s" }}
            >
              <span className="block overflow-hidden">
                <span className="inline-block animate-text-rise">{t("hero.title.a")}</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="inline-block animate-text-rise"
                  style={{ animationDelay: "0.12s" }}
                >
                  {t("hero.title.b")}{" "}
                </span>
                <span
                  className="inline-block bg-gradient-to-r from-primary via-jade to-primary bg-clip-text text-transparent animate-gradient-pan animate-text-rise"
                  style={{ animationDelay: "0.22s", backgroundSize: "200% 100%" }}
                >
                  {t("hero.title.c")}
                </span>
              </span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg reveal reveal-in"
              style={{ animationDelay: "0.32s" }}
            >
              {t("hero.lead")}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3 reveal reveal-in"
              style={{ animationDelay: "0.42s" }}
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_18px_50px_-12px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t("hero.cta.primary")}</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-surface"
              >
                {t("hero.cta.secondary")}
              </Link>
            </div>

            {/* Metrics */}
            <div
              className="mt-14 grid max-w-xl grid-cols-3 gap-6 reveal reveal-in"
              style={{ animationDelay: "0.55s" }}
            >
              {[
                { k: "120+", v: t("hero.trust") },
                { k: "5★", v: "Clutch / G2" },
                { k: "24/7", v: "HK · APAC · EU" },
              ].map((m) => (
                <div key={m.k} className="border-l border-border pl-4">
                  <div className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {m.k}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual — orbiting AI core */}
          <div className="relative lg:col-span-5">
            <AiCore />
          </div>
        </div>

        {/* Trust marquee */}
        <div
          className="mt-20 reveal reveal-in"
          style={{ animationDelay: "0.65s" }}
        >
          <div className="relative overflow-hidden mask-fade-x">
            <div className="flex w-max animate-marquee gap-14 whitespace-nowrap opacity-70">
              {[...Array(2)].flatMap((_, r) =>
                [
                  "FINTECH",
                  "SAAS",
                  "CLOUD",
                  "LOGISTICS",
                  "HEALTHTECH",
                  "AI / ML",
                  "COMMERCE",
                  "MEDIA",
                  "EDUCATION",
                ].map((l, i) => (
                  <span
                    key={`${r}-${i}`}
                    className="font-display text-sm tracking-[0.28em] text-muted-foreground"
                  >
                    {l}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* AI core — layered orbits, satellites, pulsing neural core */
function AiCore() {
  const satellites = [
    { Icon: Cpu,    r: 140, delay: "0s"    },
    { Icon: Bot,    r: 140, delay: "-5.5s" },
    { Icon: Braces, r: 140, delay: "-11s"  },
    { Icon: Zap,    r: 140, delay: "-16.5s"},
  ];
  const outer = [
    { Icon: Globe2,   r: 210, delay: "-2s"  },
    { Icon: Cloud,    r: 210, delay: "-11s" },
    { Icon: Sparkles, r: 210, delay: "-20s" },
  ];
  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      {/* Faint outer disc */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.62_0.19_258/0.18),transparent_60%)]" />

      {/* Rings */}
      <div className="absolute inset-[6%] rounded-full border border-border/70 animate-spin-slow" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-primary/30 animate-spin-reverse" />
      <div className="absolute inset-[32%] rounded-full border border-border/60 animate-spin-slow" />

      {/* Orbits: outer satellites */}
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {outer.map(({ Icon, r, delay }, i) => (
          <span
            key={`o-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit"
            style={{ ["--orbit-r" as string]: `${r}px`, animationDelay: delay, animationDuration: "34s" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/70 text-primary shadow-[0_10px_30px_-14px_var(--color-primary)] backdrop-blur-sm">
              <Icon className="h-4 w-4" />
            </span>
          </span>
        ))}
      </div>

      {/* Orbits: inner satellites */}
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {satellites.map(({ Icon, r, delay }, i) => (
          <span
            key={`i-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit"
            style={{ ["--orbit-r" as string]: `${r}px`, animationDelay: delay }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/40 bg-surface/80 text-primary shadow-[0_10px_30px_-10px_var(--color-primary)] backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </span>
          </span>
        ))}
      </div>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-jade shadow-[0_25px_80px_-10px_var(--color-primary)]">
          <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-pulse-node" />
          <span className="absolute inset-2 rounded-full border border-primary-foreground/30" />
          <Sparkles className="relative h-9 w-9 text-primary-foreground" />
        </div>
        {/* Ping halos */}
        <span className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 animate-ping-soft" />
        <span
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-jade/40 animate-ping-soft"
          style={{ animationDelay: "-1.3s" }}
        />
      </div>
    </div>
  );
}

/* ---------- PILLARS ---------- */
const pillarIcons = [Search, FileText, Layers, TrendingUp];

export function Pillars() {
  const { t } = useI18n();
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow={t("pillars.eyebrow")}
          title={t("pillars.title")}
          lead={t("pillars.lead")}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pillarIcons.map((Icon, i) => (
            <Reveal key={i} delay={i * 0.08} className="group relative bg-background p-8 transition-colors hover:bg-surface">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110">
                <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6 group-hover:animate-icon-bob" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold">{t(`pillars.${i + 1}.t`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`pillars.${i + 1}.d`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES DETAIL ---------- */
const serviceIcons = [Compass, FileText, PenTool, Cloud, Rocket, Layers];

export function Services() {
  const { t } = useI18n();
  return (
    <section className="relative border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("services.eyebrow")} title={t("services.title")} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceIcons.map((Icon, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Link
                to="/contact"
                className="group relative block overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface hover:shadow-[0_20px_60px_-30px_var(--color-primary)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6 group-hover:animate-icon-bob" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{t(`services.${i + 1}.t`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`services.${i + 1}.d`)}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary opacity-0 -translate-x-2 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  {t("services.learn")} <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const stepNums = ["01", "02", "03", "04", "05"];

export function Process() {
  const { t } = useI18n();
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("process.eyebrow")} title={t("process.title")} />
        <div className="relative mt-14 grid gap-6 md:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {stepNums.map((n, i) => (
            <Reveal key={n} delay={i * 0.1} className="group relative">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background font-display text-sm text-primary">
                <span className="absolute inset-0 rounded-full bg-primary/10 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">{n}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{t(`process.${i + 1}.t`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`process.${i + 1}.d`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WORK ---------- */
export function Work() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4] as const;
  return (
    <section id="work" className="relative border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("work.eyebrow")} title={t("work.title")} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((i) => (
            <Link
              key={i}
              to="/work"
              className="group overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={caseCovers[i - 1]}
                  alt=""
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-background/40" />
                <div className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  {t(`work.${i}.tag`)}
                </div>
                <div className="absolute bottom-4 left-4 font-display text-2xl font-semibold text-foreground">
                  {t(`work.${i}.m1`)}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">{t(`work.${i}.title`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`work.${i}.sub`)}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            {t("work.cta.full")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
export function WhyUs() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionHead eyebrow={t("whyus.eyebrow")} title={t("whyus.title")} />
            <p className="mt-6 max-w-md text-muted-foreground">{t("whyus.lead")}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background p-7">
                <h3 className="font-display text-base font-semibold">{t(`whyus.${i}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`whyus.${i}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TECH STRIP ---------- */
export function TechStrip() {
  const items = [
    "React", "Next.js", "TypeScript", "Node", "Supabase", "AWS", "GCP", "OpenAI", "Anthropic", "Postgres", "React Native", "Cloudflare",
  ];
  return (
    <section className="border-y border-border bg-surface/40 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
          {items.map((i) => (
            <span key={i} className="font-display text-sm tracking-wide text-muted-foreground">
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("testi.eyebrow")} title={t("testi.title")} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <figure
              key={i}
              className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm"
            >
              <blockquote className="font-display text-lg leading-snug tracking-tight">
                “{t(`testi.${i}.q`)}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium text-foreground">{t(`testi.${i}.n`)}</div>
                <div className="text-muted-foreground">{t(`testi.${i}.r`)}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA BAND ---------- */
export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 glow-blue" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {t("ctaband.a")}
            <br />
            {t("ctaband.b")} <span className="text-primary">{t("ctaband.hl")}</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            {t("ctaband.btn")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared head ---------- */
function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="inline-block h-px w-8 bg-primary" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-muted-foreground md:text-lg">{lead}</p> : null}
    </div>
  );
}