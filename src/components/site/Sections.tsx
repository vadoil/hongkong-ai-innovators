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
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* video background — AI / tech visuals */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <video
          className="absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.pexels.com/videos/3129957/free-video-3129957.jpg?auto=compress&cs=tinysrgb&w=1600"
        >
          <source
            src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/6963744/6963744-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* readability wash — theme aware */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      {/* glows */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[900px] -translate-x-1/2 glow-blue animate-float" />
      <div className="pointer-events-none absolute right-0 top-40 h-[420px] w-[420px] glow-jade animate-float" style={{ animationDelay: "-3s" }} />
      <AiNetwork />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm reveal reveal-in">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-jade" />
          {t("hero.badge")}
        </div>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px] reveal reveal-in" style={{ animationDelay: "0.08s" }}>
          {t("hero.title.a")}
          <br />
          {t("hero.title.b")}{" "}
          <span className="bg-gradient-to-r from-primary via-jade to-primary bg-clip-text text-transparent animate-gradient-pan">
            {t("hero.title.c")}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg reveal reveal-in" style={{ animationDelay: "0.18s" }}>
          {t("hero.lead")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3 reveal reveal-in" style={{ animationDelay: "0.28s" }}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            {t("hero.cta.primary")} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            {t("hero.cta.secondary")}
          </Link>
        </div>

        {/* trust strip */}
        <div className="mt-20 reveal reveal-in" style={{ animationDelay: "0.4s" }}>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {t("hero.trust")}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-70">
            {["FINTECH", "SAAS", "CLOUD", "LOGISTICS", "HEALTHTECH", "AI/ML"].map((l) => (
              <span key={l} className="font-display text-sm tracking-widest text-muted-foreground">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* AI neural-network animated visual */
function AiNetwork() {
  // Fixed positions for a clean, on-brand constellation
  const nodes = [
    { x: 80, y: 120 }, { x: 220, y: 60 }, { x: 360, y: 180 },
    { x: 520, y: 90 }, { x: 680, y: 220 }, { x: 820, y: 130 },
    { x: 940, y: 260 }, { x: 1080, y: 90 }, { x: 1180, y: 220 },
    { x: 160, y: 300 }, { x: 420, y: 340 }, { x: 760, y: 380 }, { x: 1020, y: 360 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [2, 9], [3, 10], [4, 10], [5, 11], [6, 11], [7, 12], [8, 12],
    [9, 10], [10, 11], [11, 12],
  ];
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-[520px] w-full max-w-[1280px] opacity-70 md:opacity-90"
      viewBox="0 0 1280 480"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="edge" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-jade)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#edge)"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="animate-dash"
          style={{ animationDelay: `${(i % 6) * -0.7}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="10"
            fill="var(--color-primary)"
            opacity="0.12"
            className="animate-pulse-node"
            style={{ animationDelay: `${(i % 5) * -0.5}s`, transformOrigin: `${n.x}px ${n.y}px` }}
          />
          <circle cx={n.x} cy={n.y} r="2.4" fill="var(--color-primary)" />
        </g>
      ))}
    </svg>
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