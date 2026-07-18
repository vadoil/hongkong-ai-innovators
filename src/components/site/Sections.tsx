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
import caseCrypto1 from "@/assets/case-crypto1.jpg";
import caseCrypto2 from "@/assets/case-crypto2.jpg";
import caseFinMonitor from "@/assets/case-finmonitor.jpg";
import caseConstruction from "@/assets/case-construction.jpg";
import heroUniverse from "@/assets/hero-universe.jpg";
import patternCloud from "@/assets/pattern-cloud.jpg";

export const caseCovers = [
  caseFintech,
  caseCloud,
  caseAi,
  caseHealth,
  caseEcom,
  caseVoice,
  caseCrypto1,
  caseCrypto2,
  caseFinMonitor,
  caseConstruction,
];

/* ---------- HERO ---------- */
export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Backdrop: data universe photo + aurora + gold cloud pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroUniverse}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.35] mix-blend-screen animate-drift-slow mask-radial-fade"
        />
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute -top-40 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 glow-blue animate-aurora" />
        <div
          className="absolute -right-40 top-20 h-[520px] w-[520px] glow-red animate-aurora"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute -left-40 top-60 h-[480px] w-[480px] glow-gold animate-aurora"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute right-0 bottom-0 h-[420px] w-[520px] glow-jade animate-aurora"
          style={{ animationDelay: "-12s" }}
        />
        <img
          src={patternCloud}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.06] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
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
              className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[64px] reveal reveal-in [text-wrap:balance]"
              style={{ animationDelay: "0.08s" }}
            >
              <span className="block overflow-hidden">
                <span className="inline-block animate-text-rise">{t("hero.title.a")}</span>
              </span>
              <span className="block overflow-hidden whitespace-nowrap">
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
                { k: t("hero.m1.k"), v: t("hero.m1.v") },
                { k: t("hero.m2.k"), v: t("hero.m2.v") },
                { k: t("hero.m3.k"), v: t("hero.m3.v") },
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

          {/* Visual — two universes bridged by AI */}
          <div className="relative lg:col-span-5">
            <UniverseCore labelA={t("hero.universe.a")} labelB={t("hero.universe.b")} link={t("hero.universe.link")} />
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
                t("hero.marquee").split(" · ").map((l, i) => (
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

/* UniverseCore — two glowing orbs (data + product) bridged by AI dataflow */
function UniverseCore({ labelA, labelB, link }: { labelA: string; labelB: string; link: string }) {
  const packets = [0, 1, 2, 3, 4];
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Twinkling starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 26 }).map((_, i) => {
          const top = (i * 37) % 100;
          const left = (i * 61) % 100;
          const size = (i % 3) + 1.5;
          const delay = (i % 7) * 0.4;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-foreground/80 animate-twinkle"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Faint mandala rings */}
      <div className="absolute inset-[8%] rounded-full border border-cn-gold/20 animate-spin-slow" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-primary/25 animate-spin-reverse" />

      {/* Orb A — Data universe (crimson + gold) */}
      <div className="absolute left-[6%] top-[52%] -translate-y-1/2">
        <div className="relative">
          <span className="absolute -inset-10 rounded-full glow-red animate-pulse-node" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,oklch(0.82_0.15_85),oklch(0.55_0.22_27)_55%,oklch(0.22_0.08_27)_100%)] shadow-[0_25px_80px_-10px_oklch(0.63_0.22_27/0.7)]">
            <span className="absolute inset-1 rounded-full border border-cn-gold/40" />
            <span className="absolute inset-3 rounded-full border border-dashed border-cn-gold/30 animate-spin-slow" />
            <Cpu className="relative h-8 w-8 text-cn-gold" />
          </div>
          <span className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cn-red/40 animate-ping-soft" />
          {/* Orbiting satellites around A */}
          <div className="absolute left-1/2 top-1/2 h-0 w-0">
            {[
              { Icon: Braces, delay: "0s" },
              { Icon: Globe2, delay: "-8s" },
              { Icon: Cloud, delay: "-16s" },
            ].map(({ Icon, delay }, i) => (
              <span
                key={`a-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit"
                style={{ ["--orbit-r" as string]: "82px", animationDelay: delay, animationDuration: "24s" }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cn-gold/40 bg-background/70 text-cn-gold backdrop-blur-sm">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-[10px] uppercase tracking-[0.32em] text-cn-gold/80">
          {labelA}
        </div>
      </div>

      {/* Orb B — Product universe (blue + jade) */}
      <div className="absolute right-[6%] top-[52%] -translate-y-1/2">
        <div className="relative">
          <span className="absolute -inset-10 rounded-full glow-blue animate-pulse-node" style={{ animationDelay: "-1.2s" }} />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,oklch(0.85_0.11_175),oklch(0.55_0.2_258)_55%,oklch(0.2_0.1_258)_100%)] shadow-[0_25px_80px_-10px_var(--color-primary)]">
            <span className="absolute inset-1 rounded-full border border-primary-foreground/30" />
            <span className="absolute inset-3 rounded-full border border-dashed border-jade/40 animate-spin-reverse" />
            <Bot className="relative h-8 w-8 text-primary-foreground" />
          </div>
          <span className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-jade/40 animate-ping-soft" style={{ animationDelay: "-1.3s" }} />
          {/* Orbiting satellites around B */}
          <div className="absolute left-1/2 top-1/2 h-0 w-0">
            {[
              { Icon: Zap, delay: "-2s" },
              { Icon: Sparkles, delay: "-10s" },
              { Icon: Layers, delay: "-18s" },
            ].map(({ Icon, delay }, i) => (
              <span
                key={`b-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit"
                style={{ ["--orbit-r" as string]: "82px", animationDelay: delay, animationDuration: "24s" }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-background/70 text-primary backdrop-blur-sm">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-[10px] uppercase tracking-[0.32em] text-primary/80">
          {labelB}
        </div>
      </div>

      {/* Bridge — flowing SVG connecting the two universes */}
      <svg
        viewBox="0 0 560 560"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="bridge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.63 0.22 27)" />
            <stop offset="45%" stopColor="oklch(0.82 0.15 85)" />
            <stop offset="70%" stopColor="oklch(0.72 0.12 175)" />
            <stop offset="100%" stopColor="oklch(0.62 0.19 258)" />
          </linearGradient>
          <linearGradient id="bridge-soft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.63 0.22 27 / 0.0)" />
            <stop offset="50%" stopColor="oklch(0.82 0.15 85 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0.62 0.19 258 / 0.0)" />
          </linearGradient>
          <path
            id="bridge-path"
            d="M 110 300 C 200 160, 360 440, 450 300"
          />
        </defs>

        {/* Soft halo bridge */}
        <use href="#bridge-path" stroke="url(#bridge-soft)" strokeWidth="18" fill="none" strokeLinecap="round" />
        {/* Main flowing line */}
        <use
          href="#bridge-path"
          stroke="url(#bridge-grad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 10"
          className="animate-flow-dash"
        />
        {/* Return line for richness */}
        <path
          d="M 110 300 C 210 420, 350 180, 450 300"
          stroke="url(#bridge-grad)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="2 8"
          opacity="0.55"
          className="animate-flow-dash"
          style={{ animationDuration: "12s", animationDirection: "reverse" }}
        />

        {/* Data packets travelling along the bridge */}
        {packets.map((i) => (
          <circle
            key={i}
            r="3.2"
            fill="oklch(0.92 0.14 85)"
            style={{
              offsetPath: "path('M 110 300 C 200 160, 360 440, 450 300')",
              offsetDistance: "0%",
              animation: `packet 3.6s linear ${i * 0.6}s infinite`,
              filter: "drop-shadow(0 0 6px oklch(0.82 0.15 85))",
            } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* Bridge label chip */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full border border-cn-gold/40 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cn-gold shadow-[0_10px_30px_-10px_oklch(0.82_0.15_85/0.5)] backdrop-blur-md">
          {link}
        </div>
      </div>
    </div>
  );
}

/* ---------- PILLARS ---------- */
const pillarIcons = [Search, FileText, Layers, TrendingUp];
import pillar1 from "@/assets/pillar-1.jpg";
import pillar2 from "@/assets/pillar-2.jpg";
import pillar3 from "@/assets/pillar-3.jpg";
import pillar4 from "@/assets/pillar-4.jpg";
const pillarImages = [pillar1, pillar2, pillar3, pillar4];

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
            <Reveal key={i} delay={i * 0.08} className="group relative overflow-hidden bg-background transition-colors hover:bg-surface">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={pillarImages[i]}
                  alt={t(`pillars.${i + 1}.t`)}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background/70 text-primary backdrop-blur-md ring-1 ring-primary/30 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110">
                  <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6 group-hover:animate-icon-bob" />
                </div>
              </div>
              <div className="p-8 pt-6">
                <h3 className="font-display text-lg font-semibold">{t(`pillars.${i + 1}.t`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`pillars.${i + 1}.d`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES DETAIL ---------- */
const serviceIcons = [Compass, FileText, PenTool, Cloud, Rocket, Layers];

/* Tiny per-monitor illustrations (pure SVG/CSS, no assets) */
function MonitorScene({ i }: { i: number }) {
  const common = "absolute inset-0";
  switch (i) {
    case 0: // Compass / Research — radar rings + persona blips
      return (
        <div className={common}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[1, 2, 3, 4].map((r) => (
              <div
                key={r}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
                style={{
                  width: r * 44,
                  height: r * 44,
                  animation: `radarPulse 3.6s ease-out ${r * 0.4}s infinite`,
                }}
              />
            ))}
          </div>
          <span className="absolute left-[22%] top-[30%] h-1.5 w-1.5 rounded-full bg-jade shadow-[0_0_10px_var(--color-jade)]" />
          <span className="absolute right-[26%] top-[58%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
          <span className="absolute left-[46%] top-[74%] h-1.5 w-1.5 rounded-full bg-cn-gold shadow-[0_0_10px_var(--color-cn-gold)]" />
        </div>
      );
    case 1: // Docs / Strategy — lines being typed
      return (
        <div className={`${common} flex flex-col justify-center gap-2 px-6`}>
          {[92, 74, 88, 60, 80, 46].map((w, k) => (
            <div
              key={k}
              className="h-1.5 rounded-full bg-gradient-to-r from-primary/60 via-primary/30 to-transparent"
              style={{ width: `${w}%`, animation: `typeIn 2.8s ease-in-out ${k * 0.25}s infinite` }}
            />
          ))}
        </div>
      );
    case 2: // Design — shapes + cursor
      return (
        <div className={common}>
          <div className="absolute left-[18%] top-[26%] h-10 w-10 rounded-lg border border-primary/50 bg-primary/10" style={{ animation: "floatY 4s ease-in-out infinite" }} />
          <div className="absolute right-[22%] top-[22%] h-8 w-8 rounded-full border border-jade/50 bg-jade/10" style={{ animation: "floatY 4.6s ease-in-out .4s infinite" }} />
          <div className="absolute left-[36%] bottom-[22%] h-0 w-0 border-b-[28px] border-l-[16px] border-r-[16px] border-b-cn-gold/60 border-l-transparent border-r-transparent" style={{ animation: "floatY 5s ease-in-out .8s infinite" }} />
          <div className="absolute right-[28%] bottom-[30%] text-primary" style={{ animation: "cursorMove 5s ease-in-out infinite" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2l7 18 2.5-7L20 10z" /></svg>
          </div>
        </div>
      );
    case 3: // Cloud — server bars
      return (
        <div className={`${common} flex items-end justify-center gap-1.5 px-8 pb-6`}>
          {Array.from({ length: 14 }).map((_, k) => (
            <div
              key={k}
              className="w-2 rounded-t bg-gradient-to-t from-primary/70 to-jade/70"
              style={{ height: `${20 + ((k * 37) % 60)}%`, animation: `barPulse 1.6s ease-in-out ${k * 0.08}s infinite` }}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-6 bottom-4 h-px bg-primary/40" />
        </div>
      );
    case 4: // Rocket — trajectory chart
      return (
        <div className={common}>
          <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rk" x1="0" x2="1">
                <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.1" />
                <stop offset="1" stopColor="var(--color-jade)" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d="M10,100 C60,95 90,80 120,55 S180,15 195,10" fill="none" stroke="url(#rk)" strokeWidth="2" strokeDasharray="260" strokeDashoffset="260" style={{ animation: "drawLine 3.2s ease-out infinite" }} />
            <circle r="3" fill="var(--color-cn-gold)" style={{ animation: "orbitDot 3.2s ease-out infinite" }}>
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M10,100 C60,95 90,80 120,55 S180,15 195,10" />
            </circle>
          </svg>
          <div className="absolute inset-x-4 bottom-3 flex gap-3 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
          </div>
        </div>
      );
    default: // Layers / Operate — stacked panels
      return (
        <div className={common}>
          {[0, 1, 2].map((k) => (
            <div
              key={k}
              className="absolute left-1/2 -translate-x-1/2 rounded-lg border border-border bg-surface/70 backdrop-blur"
              style={{
                top: `${28 + k * 14}%`,
                width: `${72 - k * 10}%`,
                height: 34,
                animation: `layerFloat 4s ease-in-out ${k * 0.3}s infinite`,
                boxShadow: "0 10px 30px -20px rgba(0,0,0,.6)",
              }}
            >
              <div className="flex h-full items-center gap-2 px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="h-1 w-1/3 rounded bg-muted-foreground/30" />
                <span className="ml-auto h-1 w-8 rounded bg-jade/60" />
              </div>
            </div>
          ))}
        </div>
      );
  }
}

function Monitor({ i, Icon, title, desc, learn }: { i: number; Icon: typeof Compass; title: string; desc: string; learn: string }) {
  const stageKey = ["research", "spec", "design", "build", "launch", "operate"][i];
  const metrics: Array<{ k: string; v: string }> = [
    { k: "insights",  v: "24" },
    { k: "specs",     v: "v2.4" },
    { k: "frames",    v: "168" },
    { k: "commits",   v: "1.2k" },
    { k: "uptime",    v: "99.99%" },
    { k: "sla",       v: "24/7" },
  ];
  const accessory = i % 3; // 0: mug, 1: plant, 2: notebook
  return (
    <Link
      to="/contact"
      className="group relative block"
    >
      {/* Monitor body */}
      <div className="relative rounded-[22px] border border-border bg-gradient-to-b from-surface to-background p-3 shadow-[0_30px_60px_-40px_rgba(0,0,0,.8)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-[0_40px_80px_-30px_var(--color-primary)]">
        {/* Bezel top: camera + LEDs */}
        <div className="flex items-center justify-between px-3 pb-2 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cn-red/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-cn-gold/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-jade/70" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
            0{i + 1} · {stageKey}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        </div>

        {/* Screen */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/80 bg-[radial-gradient(120%_80%_at_20%_0%,oklch(0.28_0.03_260/.6),transparent_60%),radial-gradient(120%_80%_at_100%_100%,oklch(0.32_0.06_240/.5),transparent_50%),oklch(0.12_0.02_260)]">
          {/* scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 3px)" }}
          />
          {/* screen glow */}
          <div className="pointer-events-none absolute -inset-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
               style={{ background: "radial-gradient(closest-side,var(--color-primary),transparent)" }} />
          {/* scene */}
          <MonitorScene i={i} />
          {/* Top-left HUD tag */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-background/50 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/70 ring-1 ring-border/60 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-jade animate-pulse" />
            live · {stageKey}
          </div>
          {/* Icon chip */}
          <div className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background/60 text-primary ring-1 ring-primary/30 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Icon className="h-4 w-4" />
          </div>
          {/* Bottom telemetry strip */}
          <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-md bg-background/45 px-2 py-1 font-mono text-[9px] text-foreground/70 ring-1 ring-border/50 backdrop-blur-md">
            <span className="uppercase tracking-[0.22em] text-muted-foreground/80">{metrics[i].k}</span>
            <span className="text-primary">{metrics[i].v}</span>
            <span className="hidden text-muted-foreground/60 sm:inline">· cwh.hk</span>
          </div>
          {/* screen reflection */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
        </div>

        {/* Stand */}
        <div className="relative mx-auto mt-3 h-3 w-24 rounded-b-[10px] bg-gradient-to-b from-border to-surface" />
        <div className="mx-auto -mt-px h-1 w-40 rounded-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Desk scene: operator + keyboard + accessory */}
        <div className="relative mx-auto mt-4 h-16 w-full max-w-[92%]">
          {/* desk surface */}
          <div className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute inset-x-2 top-8 h-8 rounded-md bg-gradient-to-b from-surface/60 to-transparent" />
          {/* keyboard */}
          <div className="absolute left-1/2 top-3 h-3 w-32 -translate-x-1/2 rounded-[3px] bg-gradient-to-b from-border/80 to-surface ring-1 ring-border/70"
               style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent 0,transparent 4px,oklch(0.20_0.02_260) 4px,oklch(0.20_0.02_260) 5px)" }} />
          {/* trackpad */}
          <div className="absolute left-[calc(50%+80px)] top-4 h-2.5 w-8 rounded-[3px] bg-surface ring-1 ring-border/70" />
          {/* operator silhouette (behind keyboard) */}
          <svg className="absolute left-1/2 top-0 h-8 w-16 -translate-x-1/2" viewBox="0 0 64 32" aria-hidden>
            <defs>
              <linearGradient id={`op${i}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d="M32 4 c-4.2 0 -7 3 -7 6.8 c0 3.2 2 5.4 4.5 6.2 C24 18 20 22 20 30 h24 c0 -8 -4 -12 -9.5 -13 c2.5 -0.8 4.5 -3 4.5 -6.2 C39 7 36.2 4 32 4z"
                  fill={`url(#op${i})`} stroke="var(--color-border)" strokeWidth="0.6" />
          </svg>
          {/* accessory */}
          {accessory === 0 && (
            /* mug with steam */
            <div className="absolute left-3 top-2">
              <div className="relative h-5 w-4 rounded-b-[3px] bg-gradient-to-b from-cn-red/70 to-cn-red/40 ring-1 ring-border/70">
                <span className="absolute -right-1 top-1 h-2 w-1.5 rounded-r-full border border-border/70" />
              </div>
              <svg className="absolute -top-3 left-0 h-4 w-4 opacity-70" viewBox="0 0 16 16">
                <path d="M4 14 Q6 10 4 6 Q2 3 6 1" fill="none" stroke="var(--color-muted-foreground)" strokeWidth="0.7" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M9 14 Q11 10 9 6 Q7 3 11 1" fill="none" stroke="var(--color-muted-foreground)" strokeWidth="0.7" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.6;0.15;0.6" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          )}
          {accessory === 1 && (
            /* plant */
            <div className="absolute right-3 top-1 flex flex-col items-center">
              <svg className="h-5 w-6" viewBox="0 0 24 24">
                <path d="M12 20 C6 14 4 8 8 4 C10 8 12 12 12 20 Z" fill="var(--color-jade)" opacity="0.75">
                  <animateTransform attributeName="transform" type="rotate" values="-2 12 20;2 12 20;-2 12 20" dur="4s" repeatCount="indefinite" />
                </path>
                <path d="M12 20 C18 14 20 8 16 4 C14 8 12 12 12 20 Z" fill="var(--color-jade)" opacity="0.55">
                  <animateTransform attributeName="transform" type="rotate" values="2 12 20;-2 12 20;2 12 20" dur="4.4s" repeatCount="indefinite" />
                </path>
              </svg>
              <div className="-mt-0.5 h-2 w-4 rounded-b-[2px] bg-cn-gold/70 ring-1 ring-border/70" />
            </div>
          )}
          {accessory === 2 && (
            /* notebook + pen */
            <div className="absolute right-3 top-4">
              <div className="h-3 w-6 rotate-[-6deg] rounded-[2px] bg-surface ring-1 ring-border/70">
                <div className="mt-[3px] ml-1 h-[1px] w-4 bg-border" />
                <div className="mt-[2px] ml-1 h-[1px] w-3 bg-border" />
              </div>
              <div className="mt-[-4px] ml-2 h-[1px] w-5 rotate-[15deg] bg-cn-red/80" />
            </div>
          )}
          {/* floor glow under monitor */}
          <div className="pointer-events-none absolute inset-x-8 top-9 h-6 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
               style={{ background: "radial-gradient(closest-side,var(--color-primary),transparent 70%)" }} />
        </div>

        {/* Copy */}
        <div className="px-3 pb-1 pt-4">
          <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary opacity-0 -translate-x-2 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            {learn} <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Services() {
  const { t } = useI18n();
  return (
    <section className="relative border-t border-border bg-surface/40 py-24 md:py-32">
      {/* wall grid + desk-line */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.05]"
           style={{ backgroundImage: "linear-gradient(var(--color-border) 1px,transparent 1px),linear-gradient(90deg,var(--color-border) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-0 h-[420px] w-[860px] -translate-x-1/2 glow-blue opacity-25" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("services.eyebrow")} title={t("services.title")} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceIcons.map((Icon, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Monitor
                i={i}
                Icon={Icon}
                title={t(`services.${i + 1}.t`)}
                desc={t(`services.${i + 1}.d`)}
                learn={t("services.learn")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const stepNums = ["01", "02", "03", "04", "05"];

function StageScene({ i }: { i: number }) {
  switch (i) {
    case 0: // Discover — magnifier scanning grid
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-3 rounded-lg opacity-40"
               style={{ backgroundImage: "linear-gradient(var(--color-border) 1px,transparent 1px),linear-gradient(90deg,var(--color-border) 1px,transparent 1px)", backgroundSize: "14px 14px" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
               style={{ animation: "cursorMove 4s ease-in-out infinite" }}>
            <div className="relative h-10 w-10 rounded-full border-2 border-primary/70 shadow-[0_0_24px_-2px_var(--color-primary)]">
              <div className="absolute -bottom-1 -right-1 h-3 w-[2px] rotate-45 bg-primary/80" />
            </div>
          </div>
        </div>
      );
    case 1: // Strategy — connected nodes
      return (
        <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full">
          <g fill="var(--color-primary)">
            <circle cx="20" cy="20" r="3"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" /></circle>
            <circle cx="60" cy="14" r="3"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin=".3s" repeatCount="indefinite" /></circle>
            <circle cx="100" cy="30" r="3"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin=".6s" repeatCount="indefinite" /></circle>
            <circle cx="34" cy="58" r="3" fill="var(--color-jade)"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin=".9s" repeatCount="indefinite" /></circle>
            <circle cx="82" cy="62" r="3" fill="var(--color-cn-gold)"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.2s" repeatCount="indefinite" /></circle>
          </g>
          <g stroke="var(--color-primary)" strokeOpacity="0.5" strokeWidth="0.7" fill="none" strokeDasharray="3 3">
            <line x1="20" y1="20" x2="60" y2="14"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" /></line>
            <line x1="60" y1="14" x2="100" y2="30"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" /></line>
            <line x1="20" y1="20" x2="34" y2="58"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" /></line>
            <line x1="34" y1="58" x2="82" y2="62"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" /></line>
            <line x1="82" y1="62" x2="100" y2="30"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" /></line>
          </g>
        </svg>
      );
    case 2: // Design — wireframe blocks
      return (
        <div className="absolute inset-3 flex flex-col gap-1.5">
          <div className="h-2 w-1/3 rounded bg-primary/60" style={{ animation: "typeIn 3s ease-in-out infinite" }} />
          <div className="grid flex-1 grid-cols-3 gap-1.5">
            <div className="rounded bg-surface/80 ring-1 ring-border" style={{ animation: "floatY 4s ease-in-out infinite" }} />
            <div className="col-span-2 rounded bg-surface/80 ring-1 ring-border" style={{ animation: "floatY 4.4s ease-in-out .2s infinite" }} />
            <div className="col-span-2 rounded bg-primary/15 ring-1 ring-primary/40" style={{ animation: "floatY 4.8s ease-in-out .4s infinite" }} />
            <div className="rounded bg-jade/15 ring-1 ring-jade/40" style={{ animation: "floatY 5.2s ease-in-out .6s infinite" }} />
          </div>
        </div>
      );
    case 3: // Build — code stream
      return (
        <div className="absolute inset-3 overflow-hidden rounded-md bg-background/60 font-mono text-[9px] leading-[1.35] text-primary/80">
          <div className="p-2" style={{ animation: "codeScroll 6s linear infinite" }}>
            <div><span className="text-muted-foreground">const</span> ship = <span className="text-jade">async</span>() {"=>"} {"{"}</div>
            <div className="pl-3"><span className="text-cn-gold">await</span> build(app);</div>
            <div className="pl-3">deploy(<span className="text-jade">"hk"</span>);</div>
            <div className="pl-3"><span className="text-cn-gold">return</span> live;</div>
            <div>{"}"}</div>
            <div><span className="text-muted-foreground">// ai.integrate()</span></div>
            <div>ship();</div>
            <div className="text-jade">✓ passed 128 tests</div>
          </div>
        </div>
      );
    default: // Launch — rocket trail
      return (
        <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={`pl${i}`} x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--color-cn-gold)" />
            </linearGradient>
          </defs>
          <path id={`arc${i}`} d="M8,70 Q60,10 112,20" fill="none" stroke={`url(#pl${i})`} strokeWidth="2" strokeDasharray="180" strokeDashoffset="180"
                style={{ animation: "drawLine 3s ease-out infinite" }} />
          <g>
            <circle r="4" fill="var(--color-cn-gold)" style={{ filter: "drop-shadow(0 0 6px var(--color-cn-gold))" }}>
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href={`#arc${i}`} />
              </animateMotion>
            </circle>
          </g>
          {[15, 45, 75, 100].map((cx, k) => (
            <circle key={k} cx={cx} cy={70 - k * 3} r="0.8" fill="var(--color-muted-foreground)" opacity="0.5" />
          ))}
        </svg>
      );
  }
}

export function Process() {
  const { t } = useI18n();
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[420px] w-[900px] -translate-x-1/2 glow-blue opacity-30" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("process.eyebrow")} title={t("process.title")} />

        {/* Animated pipeline */}
        <div className="relative mt-16">
          {/* Flow rail (desktop) */}
          <svg className="pointer-events-none absolute inset-x-0 top-[86px] hidden h-6 w-full md:block" viewBox="0 0 1000 24" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rail" x1="0" x2="1">
                <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0" />
                <stop offset=".2" stopColor="var(--color-primary)" stopOpacity=".6" />
                <stop offset=".5" stopColor="var(--color-jade)" stopOpacity=".7" />
                <stop offset=".8" stopColor="var(--color-cn-gold)" stopOpacity=".7" />
                <stop offset="1" stopColor="var(--color-cn-gold)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="12" x2="1000" y2="12" stroke="var(--color-border)" strokeWidth="1" />
            <line x1="0" y1="12" x2="1000" y2="12" stroke="url(#rail)" strokeWidth="2" strokeDasharray="6 10"
                  style={{ animation: "flow-dash 8s linear infinite" }} />
          </svg>

          <div className="relative grid gap-6 md:grid-cols-5">
            {stepNums.map((n, i) => (
              <Reveal key={n} delay={i * 0.1} className="group relative">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-[0_25px_60px_-30px_var(--color-primary)]">
                  {/* screen */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-[radial-gradient(120%_80%_at_20%_0%,oklch(0.28_0.03_260/.6),transparent_60%),oklch(0.13_0.02_260)]">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
                         style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 3px)" }} />
                    <StageScene i={i} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
                  </div>
                  {/* number chip sits on the flow line */}
                  <div className="relative -mt-6 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background font-display text-sm text-primary shadow-[0_10px_30px_-10px_var(--color-primary)]">
                    <span className="absolute inset-0 rounded-full bg-primary/15 blur-md opacity-70" />
                    <span className="relative">{n}</span>
                  </div>
                  <h3 className="mt-4 text-center font-display text-base font-semibold">{t(`process.${i + 1}.t`)}</h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">{t(`process.${i + 1}.d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WORK ---------- */
export function Work() {
  const { t } = useI18n();
  // Показываем 9 кейсов (3x3), выделяя 4 новых: crypto1(7), crypto2(8), finMonitor(9), construction(10)
  const items = [7, 8, 9, 10, 1, 2, 3, 4, 5] as const;
  return (
    <section id="work" className="relative border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow={t("work.eyebrow")} title={t("work.title")} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
        <span className="relative inline-block h-px w-10 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <span className="text-primary">{eyebrow}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
        <span className="text-sheen">{title}</span>
      </h2>
      {lead ? <p className="mt-5 text-muted-foreground md:text-lg">{lead}</p> : null}
    </div>
  );
}