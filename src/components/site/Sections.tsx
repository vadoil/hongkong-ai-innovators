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
import heroUniverse from "@/assets/hero-universe.jpg";
import patternCloud from "@/assets/pattern-cloud.jpg";

export const caseCovers = [caseFintech, caseCloud, caseAi, caseHealth, caseEcom, caseVoice];

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