import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Process, CtaBand } from "@/components/site/Sections";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Meridian HK" },
      { name: "description", content: "Five stages, one senior team: research, strategy & TZ, design, build, launch & grow." },
      { property: "og:title", content: "Process — Meridian HK" },
      { property: "og:description", content: "Five stages, one senior team: research, strategy & TZ, design, build, launch & grow." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow="Process"
          title={<>Five stages. <span className="text-primary">One team.</span></>}
          lead="A predictable path from a rough idea to a launched, measured product — with no hand-offs and no dropped context."
        />
        <Process />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}