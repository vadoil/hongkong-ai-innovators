import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { WhyUs, Testimonials, TechStrip, CtaBand } from "@/components/site/Sections";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CWH.HK" },
      { name: "description", content: "A senior product studio based in Hong Kong. Full cycle, one roof, multilingual delivery across APAC, EU and North America." },
      { property: "og:title", content: "About — CWH.HK" },
      { property: "og:description", content: "A senior product studio based in Hong Kong. Full cycle, one roof." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHero
          eyebrow={t("page.about.eyebrow")}
          title={<>{t("page.about.title.a")} <span className="text-primary">{t("page.about.title.hl")}</span></>}
          lead={t("page.about.lead")}
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