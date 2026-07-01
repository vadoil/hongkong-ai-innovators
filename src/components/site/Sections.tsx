import { Link } from "@tanstack/react-router";
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

/* ---------- HERO ---------- */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* glows */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[900px] -translate-x-1/2 glow-blue" />
      <div className="pointer-events-none absolute right-0 top-40 h-[420px] w-[420px] glow-jade" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-jade" />
          Hong Kong · Full-cycle product studio
        </div>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
          From market gap
          <br />
          to <span className="text-primary">shipped product.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Research, strategy, design and engineering for software and cloud teams. One senior
          team, from the first interview to launch and growth.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            See our work
          </Link>
        </div>

        {/* trust strip */}
        <div className="mt-20">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by teams building in
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

/* ---------- PILLARS ---------- */
const pillars = [
  {
    icon: Search,
    title: "Market & niche research",
    body: "Where the demand actually is, who your buyer is, and how to enter without wasting runway.",
  },
  {
    icon: FileText,
    title: "Strategy & technical specs",
    body: "A product plan and engineering spec (TZ) your team can build against — no ambiguity.",
  },
  {
    icon: Layers,
    title: "Design & engineering",
    body: "Web, mobile and cloud services shipped end-to-end by a senior in-house team.",
  },
  {
    icon: TrendingUp,
    title: "Growth marketing",
    body: "Positioning, acquisition and activation loops tied to the metrics that fund the next round.",
  },
];

export function Pillars() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="What we do"
          title="Four pillars, one team."
          lead="From the first user interview to the launch dashboard — no hand-offs, no dropped context."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="group relative bg-background p-8 transition-colors hover:bg-surface">
              <p.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-6 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES DETAIL ---------- */
const services = [
  {
    icon: Compass,
    title: "Discovery & research",
    body: "Market sizing, competitor teardown, user interviews. You leave with a clear thesis and an evidence trail.",
  },
  {
    icon: FileText,
    title: "MVP scoping & TZ",
    body: "Priorities, scope cuts, and a technical specification your engineers can execute without a translator.",
  },
  {
    icon: PenTool,
    title: "UX / UI design",
    body: "Interface systems, prototypes and production-ready screens. Design tokens, not decoration.",
  },
  {
    icon: Cloud,
    title: "Full-stack & cloud build",
    body: "Web, mobile and infra — React, Node, TypeScript, AWS/GCP, Supabase. Ship weekly, not quarterly.",
  },
  {
    icon: Rocket,
    title: "Launch & growth",
    body: "Positioning, landing pages, analytics, paid and lifecycle. Move the numbers that move the business.",
  },
  {
    icon: Layers,
    title: "AI integration",
    body: "LLM features that actually ship: retrieval, agents, evals. Guardrails and cost baked in from day one.",
  },
];

export function Services() {
  return (
    <section className="relative border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Services" title="Deep on every stage." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/contact"
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all hover:border-primary/50 hover:bg-surface"
            >
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const steps = [
  { n: "01", t: "Research", d: "Interviews, market and competitor analysis." },
  { n: "02", t: "Strategy & TZ", d: "Positioning, roadmap, technical spec." },
  { n: "03", t: "Design", d: "Systems, prototypes, production screens." },
  { n: "04", t: "Build", d: "Weekly releases across web, mobile and cloud." },
  { n: "05", t: "Launch & grow", d: "Analytics, acquisition, activation loops." },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Process" title="Five stages. One team." />
        <div className="relative mt-14 grid gap-6 md:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background font-display text-sm text-primary">
                {s.n}
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WORK ---------- */
const cases = [
  {
    tag: "Fintech · SaaS",
    title: "Card-issuing dashboard rebuilt for scale.",
    metric: "+38% activation",
    sub: "Rebuilt onboarding + first-run.",
  },
  {
    tag: "Cloud · DevTools",
    title: "Marketing site + docs for a serverless platform.",
    metric: "×2.4 signups",
    sub: "Redesign + positioning.",
  },
  {
    tag: "AI · B2B",
    title: "RAG copilot for a logistics operator.",
    metric: "−62% ticket time",
    sub: "From PoC to production in 9 weeks.",
  },
  {
    tag: "Healthtech",
    title: "Patient app and clinician back-office.",
    metric: "4.9★ store rating",
    sub: "Design system + iOS/Android.",
  },
];

export function Work() {
  return (
    <section id="work" className="relative border-t border-border bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Selected work" title="Shipped, measured, kept." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.title}
              to="/work"
              className="group overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-surface-2 to-jade/20">
                <div className="absolute inset-0 grid-lines opacity-40" />
                <div className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  {c.tag}
                </div>
                <div className="absolute bottom-4 left-4 font-display text-2xl font-semibold text-foreground">
                  {c.metric}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
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
            See full portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
const whys = [
  { t: "Full cycle, one roof", d: "Research, strategy, design, build and growth — no hand-offs." },
  { t: "Hong Kong base, global reach", d: "Operating across APAC, EU and North America." },
  { t: "Multilingual delivery", d: "English, Russian and Chinese — no translation loss." },
  { t: "Senior-only team", d: "You get the people who built it, not who managed it." },
];

export function WhyUs() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionHead eyebrow="Why us" title="A studio, not a body shop." />
            <p className="mt-6 max-w-md text-muted-foreground">
              We stay small on purpose. Every project has a senior engineer, a senior designer
              and a strategy lead — from day one to launch.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {whys.map((w) => (
              <div key={w.t} className="bg-background p-7">
                <h3 className="font-display text-base font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
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

/* ---------- TESTIMONIALS ---------- */
const quotes = [
  {
    q: "They rebuilt our activation funnel in six weeks. It moved the number that funds our Series A.",
    n: "Alex Chan",
    r: "CEO, Ledgerly",
  },
  {
    q: "The rare team that owns strategy and code. We shipped an AI copilot without hiring a PM.",
    n: "Diana Ivanova",
    r: "Head of Product, Freightline",
  },
  {
    q: "Clear thinking, sharp design, senior engineering. Not a marketplace vibe.",
    n: "Michael Wong",
    r: "Founder, Northlab",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Testimonials" title="What founders say." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <figure
              key={t.n}
              className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm"
            >
              <blockquote className="font-display text-lg leading-snug tracking-tight">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium text-foreground">{t.n}</div>
                <div className="text-muted-foreground">{t.r}</div>
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
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 glow-blue" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let&rsquo;s build
            <br />
            your <span className="text-primary">product.</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
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