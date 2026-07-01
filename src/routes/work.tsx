import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/Sections";

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

const projects = [
  {
    tag: "Fintech · SaaS",
    title: "Card-issuing dashboard rebuilt for scale.",
    client: "Ledgerly · Singapore",
    year: "2025",
    challenge: "Activation stalled after signup; ops drowning in manual KYC.",
    metrics: ["+38% activation", "−54% KYC handling"],
  },
  {
    tag: "Cloud · DevTools",
    title: "Marketing site + docs for a serverless platform.",
    client: "Northlab · Berlin",
    year: "2025",
    challenge: "Positioning unclear, docs discouraged sign-ups.",
    metrics: ["×2.4 signups", "+61% docs → trial"],
  },
  {
    tag: "AI · B2B",
    title: "RAG copilot for a logistics operator.",
    client: "Freightline · Hong Kong",
    year: "2024",
    challenge: "Ticket queue growing faster than headcount.",
    metrics: ["−62% ticket time", "9-week PoC → prod"],
  },
  {
    tag: "Healthtech",
    title: "Patient app and clinician back-office.",
    client: "Vitala · Tokyo",
    year: "2024",
    challenge: "Two disconnected legacy tools, no design system.",
    metrics: ["4.9★ store rating", "+3.1× weekly active"],
  },
  {
    tag: "E-commerce · APAC",
    title: "Headless storefront + checkout redesign.",
    client: "Harbour Goods · Hong Kong",
    year: "2024",
    challenge: "Mobile checkout drop-off above 70%.",
    metrics: ["+27% conversion", "−41% checkout drop"],
  },
  {
    tag: "AI · Consumer",
    title: "Voice-first study companion for high-schoolers.",
    client: "Kaido · Seoul",
    year: "2023",
    challenge: "Zero-to-one product, tight seed runway.",
    metrics: ["10k WAU in 12 wk", "42% D30 retention"],
  },
];

function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow="Portfolio"
          title={<>Shipped. Measured. <span className="text-primary">Kept.</span></>}
          lead="A selection of products we've researched, designed and built end-to-end — for teams across APAC, Europe and North America."
        />

        <section className="relative border-t border-border bg-surface/40 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <Link
                  key={p.title}
                  to="/contact"
                  className="group overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-primary/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-surface-2 to-jade/20">
                    <div className="absolute inset-0 grid-lines opacity-40" />
                    <div className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                      {p.tag}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {p.metrics.map((m) => (
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
                      <span>{p.client}</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{p.challenge}</p>
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