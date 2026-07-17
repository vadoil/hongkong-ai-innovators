import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Hero,
  Pillars,
  Services,
  Process,
  Work,
  WhyUs,
  TechStrip,
  Testimonials,
  CtaBand,
} from "@/components/site/Sections";
import { ClientsMarquee, Awards, BigStats, Team, EstimateTeaser } from "@/components/site/LuxeExtras";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ClientsMarquee />
        <Pillars />
        <BigStats />
        <Services />
        <Process />
        <Work />
        <Awards />
        <WhyUs />
        <Team />
        <TechStrip />
        <Testimonials />
        <EstimateTeaser />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
