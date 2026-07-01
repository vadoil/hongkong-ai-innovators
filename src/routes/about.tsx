import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { WhyUs, Testimonials, TechStrip, CtaBand } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Meridian HK" },
      { name: "description", content: "A senior product studio based in Hong Kong. Full cycle, one roof, multilingual delivery across APAC, EU and North America." },
      { property: "og:title", content: "About — Meridian HK" },
      { property: "og:description", content: "A senior product studio based in Hong Kong. Full cycle, one roof." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow="About"
          title={<>A studio, <span className="text-primary">not a body shop.</span></>}
          lead="We stay small on purpose. Every project has a senior engineer, a senior designer and a strategy lead — from day one to launch."
        />
        <WhyUs />
        <TechStrip />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}