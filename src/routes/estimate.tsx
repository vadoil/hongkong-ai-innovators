import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sparkles, ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "预算估算 · CWH.HK — Project Estimate" },
      { name: "description", content: "60‑second budget estimate for web, mobile and AI projects by CWH.HK." },
      { property: "og:title", content: "Project Estimate · CWH.HK" },
      { property: "og:description", content: "Pick project shape, scope and pace — get an honest budget range." },
    ],
  }),
  component: EstimatePage,
});

type ProjectType = "landing" | "web" | "mobile" | "ai" | "platform";
type Scope = "s" | "m" | "l" | "xl";
type Speed = "normal" | "fast" | "rocket";
type Addon = "design" | "ai" | "growth" | "support";

const BASE: Record<ProjectType, [number, number]> = {
  landing: [12000, 24000],
  web: [45000, 110000],
  mobile: [55000, 140000],
  ai: [60000, 180000],
  platform: [140000, 420000],
};
const SCOPE_MULT: Record<Scope, number> = { s: 0.7, m: 1, l: 1.7, xl: 2.6 };
const SPEED_MULT: Record<Speed, number> = { normal: 1, fast: 1.3, rocket: 1.6 };
const ADDON_MULT: Record<Addon, number> = { design: 0.15, ai: 0.25, growth: 0.12, support: 0.2 };
const BASE_WEEKS: Record<ProjectType, number> = { landing: 3, web: 10, mobile: 12, ai: 14, platform: 22 };

function EstimatePage() {
  const { t } = useI18n();
  const [type, setType] = useState<ProjectType>("web");
  const [scope, setScope] = useState<Scope>("m");
  const [speed, setSpeed] = useState<Speed>("normal");
  const [addons, setAddons] = useState<Set<Addon>>(new Set(["design"]));

  const { low, high, weeks } = useMemo(() => {
    const [bl, bh] = BASE[type];
    const scopeM = SCOPE_MULT[scope];
    const speedM = SPEED_MULT[speed];
    const addonM = 1 + Array.from(addons).reduce((s, a) => s + ADDON_MULT[a], 0);
    const low = Math.round((bl * scopeM * speedM * addonM) / 1000) * 1000;
    const high = Math.round((bh * scopeM * speedM * addonM) / 1000) * 1000;
    const wBase = BASE_WEEKS[type] * scopeM;
    const wSpeed = speed === "rocket" ? 0.65 : speed === "fast" ? 0.8 : 1;
    const w1 = Math.max(2, Math.round(wBase * wSpeed));
    const w2 = Math.max(w1 + 2, Math.round(wBase * wSpeed * 1.6));
    return { low, high, weeks: `${w1}–${w2}` };
  }, [type, scope, speed, addons]);

  const fmt = (n: number) => `$${n.toLocaleString()}`;

  const toggleAddon = (a: Addon) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };

  const types: ProjectType[] = ["landing", "web", "mobile", "ai", "platform"];
  const scopes: Scope[] = ["s", "m", "l", "xl"];
  const speeds: Speed[] = ["normal", "fast", "rocket"];
  const addonKeys: Addon[] = ["design", "ai", "growth", "support"];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative pt-32 pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[600px] opacity-60">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 glow-blue" />
          <div className="absolute right-0 top-40 h-[420px] w-[420px] glow-gold opacity-70" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cn-gold" />
              {t("estimate.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-6xl text-balance">
              {t("estimate.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance">
              {t("estimate.lead")}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {/* Type */}
              <Group title={t("estimate.type")}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {types.map((k) => (
                    <Pill key={k} active={type === k} onClick={() => setType(k)}>
                      {t(`estimate.type.${k}`)}
                    </Pill>
                  ))}
                </div>
              </Group>

              {/* Scope */}
              <Group title={t("estimate.scope")}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {scopes.map((k) => (
                    <Pill key={k} active={scope === k} onClick={() => setScope(k)}>
                      {t(`estimate.scope.${k}`)}
                    </Pill>
                  ))}
                </div>
              </Group>

              {/* Speed */}
              <Group title={t("estimate.speed")}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {speeds.map((k) => (
                    <Pill key={k} active={speed === k} onClick={() => setSpeed(k)}>
                      {t(`estimate.speed.${k}`)}
                    </Pill>
                  ))}
                </div>
              </Group>

              {/* Addons */}
              <Group title={t("estimate.addons")}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {addonKeys.map((k) => {
                    const on = addons.has(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggleAddon(k)}
                        className={`group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${
                          on
                            ? "border-primary/60 bg-primary/10 text-foreground shadow-[0_20px_60px_-30px_var(--color-primary)]"
                            : "border-border bg-surface/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span>{t(`estimate.addons.${k}`)}</span>
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                            on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                          }`}
                        >
                          {on && <Check className="h-3 w-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Group>
            </div>

            {/* Result panel */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface/80 to-background p-7 backdrop-blur-md">
                <div className="pointer-events-none absolute -top-24 -right-24 h-[280px] w-[280px] glow-blue opacity-60" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-[260px] w-[260px] glow-gold opacity-40" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {t("estimate.range")}
                  </div>
                  <div className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {fmt(low)}
                    <span className="mx-2 text-muted-foreground">–</span>
                    {fmt(high)}
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <div className="mt-5 flex items-baseline justify-between">
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {t("estimate.timeline")}
                    </div>
                    <div className="font-display text-2xl font-semibold">
                      {weeks}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        {t("estimate.weeks")}
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                    {t("estimate.disclaimer")}
                  </p>

                  <Link
                    to="/contact"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 font-display text-base font-medium text-primary-foreground shadow-[0_20px_60px_-20px_var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-20px_var(--color-primary)]"
                  >
                    {t("estimate.cta")}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/30 p-6 backdrop-blur-md md:p-7">
      <div className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${
        active
          ? "border-primary/60 bg-primary/10 text-foreground shadow-[0_20px_60px_-30px_var(--color-primary)]"
          : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}