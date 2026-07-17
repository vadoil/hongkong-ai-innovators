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
      { title: "Portfolio — Meridian HK" },
      { name: "description", content: "Selected work: fintech, SaaS, cloud, AI and healthtech products shipped and measured by a Hong Kong studio." },
      { property: "og:title", content: "Portfolio — Meridian HK" },
      { property: "og:description", content: "Selected work: fintech, SaaS, cloud, AI and healthtech products." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { t } = useI18n();
  const ids = [1, 2, 3, 4, 5, 6] as const;
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
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {ids.map((i) => (
                <Link
                  key={i}
                  to="/contact"
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
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {[t(`work.${i}.m1`), t(`work.${i}.m2`)].map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-border bg-background/70 px-3 py-1 font-display text-sm text-foreground backdrop-blur-sm"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t(`work.${i}.client`)}</span>
                      <span>{t(`work.${i}.year`)}</span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold">{t(`work.${i}.title`)}</h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`work.${i}.challenge`)}</p>
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