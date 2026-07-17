import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Services, Pillars, CtaBand } from "@/components/site/Sections";
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow={t("page.services.eyebrow")}
          title={<>{t("page.services.title.a")} <span className="text-primary">{t("page.services.title.hl")}</span></>}
          lead={t("page.services.lead")}
        />
        <Pillars />
        <Services />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}