import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/lib/reveal";
import { DotPortrait } from "./DotPortrait";
import { Award, Sparkles, ArrowUpRight, Star } from "lucide-react";
import { ParticleField } from "./ParticleField";

/* ---------- Clients Marquee ---------- */
const clientLogos = [
  "Ledgerly", "Northlab", "Verta AI", "Helix Health",
  "Kaida", "Sonus", "OrbitPay", "Meridian",
  "Cathay Chain", "Aster FX", "Finmon Asia", "Bumi Build",
];

export function ClientsMarquee() {
  const { t } = useI18n();
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="relative border-t border-border bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {t("clients.eyebrow")}
            </span>
            <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight md:text-3xl text-balance">
              {t("clients.title")}
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-16 animate-[marquee_50s_linear_infinite] py-4">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="group flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-surface/40 px-6 py-4 backdrop-blur-md transition-colors hover:border-primary/50"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-jade/30 font-display text-sm font-bold text-foreground shadow-[0_0_24px_-6px_var(--color-primary)]">
                {name.charAt(0)}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-muted-foreground group-hover:text-foreground">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Awards / Recognition ---------- */
export function Awards() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6, 7, 8] as const;
  return (
    <section className="relative border-t border-border bg-surface/30 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-32 right-0 -z-0 h-[420px] w-[520px] glow-gold opacity-40" />
      <div className="pointer-events-none absolute -bottom-32 left-0 -z-0 h-[420px] w-[520px] glow-jade opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <Award className="h-3.5 w-3.5 text-cn-gold" />
              {t("awards.eyebrow")}
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl text-balance">
              {t("awards.title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map((i, idx) => (
            <Reveal key={i} delay={idx * 0.06}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-background/60 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_30px_80px_-40px_var(--color-primary)]">
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-jade/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-cn-gold shadow-[inset_0_0_20px_-8px_var(--color-cn-gold)]">
                    <Star className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-medium leading-tight text-foreground">
                    {t(`awards.${i}`)}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Big Stats ---------- */
function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1400;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function BigStats() {
  const { t } = useI18n();
  const stats: Array<{ n: number; prefix?: string; suffix?: string; k: string; v: string }> = [
    { n: 120, suffix: "+", k: "stats.1.k", v: "stats.1.v" },
    { n: 18, k: "stats.2.k", v: "stats.2.v" },
    { n: 420, prefix: "$", suffix: "M+", k: "stats.3.k", v: "stats.3.v" },
    { n: 97, suffix: "%", k: "stats.4.k", v: "stats.4.v" },
  ];
  return (
    <section className="relative border-t border-border bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-20 grid-lines" />
      <ParticleField className="-z-0 opacity-80" density={110} linkDistance={140} />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[520px] w-[900px] -translate-x-1/2 glow-blue opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{t("stats.eyebrow")}</span>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl text-balance">
              {t("stats.title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 md:p-8">
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-cn-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    <CountUp target={s.n} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 h-px w-12 bg-gradient-to-r from-primary to-jade" />
                  <div className="mt-3 text-sm text-muted-foreground">{t(s.v)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
export function Team() {
  const { t } = useI18n();
  const members = [1, 2, 3, 4] as const;
  const accents = ["from-primary/40 to-jade/40", "from-cn-red/40 to-cn-gold/40", "from-jade/40 to-primary/40", "from-cn-gold/40 to-primary/40"];
  const dotAccents = ["#3B82F6", "#E11D3F", "#10B981", "#F5B301"];
  return (
    <section className="relative border-t border-border bg-surface/30 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-40 right-0 -z-0 h-[520px] w-[520px] glow-jade opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-3 md:items-end">
            <div className="md:col-span-2">
              <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{t("team.eyebrow")}</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl text-balance">
                {t("team.title")}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base text-balance">{t("team.lead")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {members.map((i, idx) => (
            <Reveal key={i} delay={idx * 0.08}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-background/60 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/60">
                <div className={`relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${accents[idx]}`}>
                  {/* Soft base wash */}
                  <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,oklch(0.22_0.03_260/.55),oklch(0.11_0.02_260))]" />
                  <div className="absolute inset-0 grid-lines opacity-20" />
                  {/* Dot portrait */}
                  <DotPortrait
                    seed={i * 37 + 11}
                    color="#E7ECF3"
                    accent={dotAccents[idx]}
                    className="absolute inset-0 h-full w-full"
                  />
                  {/* Vignette + top gloss */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/5 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />
                  {/* Corner index + monogram */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-foreground/70">
                      <span>· 0{i}</span>
                      <span className="font-mono text-foreground/60">{t(`team.${i}.n`).split(" ").map((s) => s[0]).join("").slice(0, 2)}</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-foreground/60">
                      cwh · hk
                    </div>
                  </div>
                </div>
                <div className="font-display text-lg font-semibold tracking-tight">{t(`team.${i}.n`)}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t(`team.${i}.r`)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Estimate Teaser (on home) ---------- */
export function EstimateTeaser() {
  const { t } = useI18n();
  return (
    <section className="relative border-t border-border bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[520px] w-[900px] -translate-x-1/2 glow-blue opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-surface/80 to-background p-8 md:p-16">
          <div className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] glow-gold opacity-40" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] glow-jade opacity-30" />
          <div className="relative grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-cn-gold" />
                {t("estimate.eyebrow")}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl text-balance">
                {t("estimate.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-balance">
                {t("estimate.lead")}
              </p>
            </div>
            <div className="md:col-span-2 md:justify-self-end">
              <Link
                to="/estimate"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-display text-base font-medium text-primary-foreground shadow-[0_20px_60px_-20px_var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-20px_var(--color-primary)]"
              >
                {t("estimate.eyebrow")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}