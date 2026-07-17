import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand, caseCovers } from "@/components/site/Sections";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Portfolio — CWH.HK" },
      { name: "description", content: "Selected work: fintech, SaaS, cloud, AI and healthtech products shipped and measured by a Hong Kong studio." },
      { property: "og:title", content: "Portfolio — CWH.HK" },
      { property: "og:description", content: "Selected work: fintech, SaaS, cloud, AI and healthtech products." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { t } = useI18n();
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow={t("page.work.eyebrow")}
          title={<>{t("page.work.title.a")} <span className="text-primary">{t("page.work.title.hl")}</span></>}
          lead={t("page.work.lead")}
        />

        <section className="relative border-t border-border bg-surface/40 py-16 md:py-24">
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[520px] w-[900px] -translate-x-1/2 glow-blue opacity-40" />
          <div className="pointer-events-none absolute bottom-0 right-0 -z-0 h-[420px] w-[520px] glow-jade opacity-30" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {ids.map((i, idx) => (
                <Link
                  key={i}
                  to="/contact"
                  className="group relative block overflow-hidden rounded-[28px] border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_40px_100px_-40px_var(--color-primary)]"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Animated gradient border sheen */}
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[conic-gradient(from_var(--angle,0deg),transparent_30%,color-mix(in_oklab,var(--color-primary)_60%,transparent)_45%,color-mix(in_oklab,var(--color-jade)_60%,transparent)_55%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px" />

                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[28px]">
                    <img
                      src={caseCovers[i - 1]}
                      alt=""
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                    />
                    {/* Depth wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-jade/10 opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100" />
                    {/* Sheen sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-[1600ms] ease-out group-hover:translate-x-full" />

                    {/* Huge index numeral */}
                    <div className="pointer-events-none absolute bottom-2 right-4 font-display text-[110px] font-bold leading-none tracking-tighter text-foreground/10 transition-all duration-700 group-hover:text-primary/30 group-hover:-translate-y-1">
                      {String(i).padStart(2, "0")}
                    </div>

                    {/* Tag chip */}
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-jade shadow-[0_0_8px_var(--color-jade)]" />
                      {t(`work.${i}.tag`)}
                    </div>

                    {/* Year pill */}
                    <div className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 font-display text-xs text-foreground backdrop-blur-md">
                      {t(`work.${i}.year`)}
                    </div>

                    {/* Metric chips */}
                    <div className="absolute bottom-4 left-4 right-24 flex flex-wrap gap-2">
                      {[t(`work.${i}.m1`), t(`work.${i}.m2`)].map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-display text-sm text-foreground shadow-[0_0_24px_-6px_var(--color-primary)] backdrop-blur-md"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative p-7">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      <span>{t(`work.${i}.client`)}</span>
                      <span className="inline-flex items-center gap-1 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span>Case</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                        {t(`work.${i}.title`)}
                      </h3>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {t(`work.${i}.challenge`)}
                    </p>
                    <div className="mt-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="mt-4 font-display text-xs text-primary/80">
                      {t(`work.${i}.sub`)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}