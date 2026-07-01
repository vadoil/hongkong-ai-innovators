import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Services, Pillars, CtaBand } from "@/components/site/Sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Meridian HK" },
      { name: "description", content: "Research, strategy, design, engineering and growth for software and cloud teams — from a senior Hong Kong studio." },
      { property: "og:title", content: "Services — Meridian HK" },
      { property: "og:description", content: "Research, strategy, design, engineering and growth for software and cloud teams." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow="Services"
          title={<>Deep on every stage <span className="text-primary">of the product.</span></>}
          lead="From the first interview to launch dashboards — a senior team across research, strategy, design, engineering and growth."
        />
        <Pillars />
        <Services />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}