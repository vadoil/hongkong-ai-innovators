import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Process, CtaBand } from "@/components/site/Sections";
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow={t("page.process.eyebrow")}
          title={<>{t("page.process.title.a")} <span className="text-primary">{t("page.process.title.hl")}</span></>}
          lead={t("page.process.lead")}
        />
        <Process />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}