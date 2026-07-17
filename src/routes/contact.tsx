import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Clock, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CWH.HK" },
      {
        name: "description",
        content: "Tell us about your product. We reply within one business day.",
      },
      { property: "og:title", content: "Contact — CWH.HK" },
      {
        property: "og:description",
        content: "Tell us about your product. We reply within one business day.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const budgets = ["< $10k", "$10k – $30k", "$30k – $75k", "$75k – $150k", "$150k+"];

function ContactPage() {
  const [pending, setPending] = useState(false);
  const { t } = useI18n();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    // TODO: wire to Supabase `leads` table in step 3
    await new Promise((r) => setTimeout(r, 500));
    toast.success(t("contact.f.success"));
    (e.target as HTMLFormElement).reset();
    setPending(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative overflow-hidden pt-32 pb-24 md:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[900px] -translate-x-1/2 glow-blue" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="inline-block h-px w-8 bg-primary" />
                {t("contact.eyebrow")}
              </div>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {t("contact.title.a")}
                <br />
                <span className="text-primary">{t("contact.title.hl")}</span>
              </h1>
              <p className="mt-6 max-w-md text-muted-foreground">{t("contact.lead")}</p>
              <div className="mt-10 space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <a href="mailto:hello@cwh.hk" className="hover:text-primary">
                    hello@cwh.hk
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <a href="tel:+85258085678" className="hover:text-primary">
                    +852 5808 5678
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <div className="text-foreground">{t("contact.office.title")}</div>
                    <div className="text-muted-foreground">
                      Suite 2201, 22/F, Tower 1<br />
                      Admiralty Centre, 18 Harcourt Road<br />
                      Admiralty, Hong Kong SAR
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <div className="text-muted-foreground">{t("contact.office.hours")}</div>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="CWH.HK office — Admiralty, Hong Kong"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=114.1625%2C22.2755%2C114.1685%2C22.2795&layer=mapnik&marker=22.2775%2C114.1655"
                  className="h-56 w-full"
                  loading="lazy"
                />
              </div>
              <div className="mt-10">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("contact.back")}
                </Link>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="md:col-span-3 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("contact.f.name")} name="name" required maxLength={100} />
                <Field label={t("contact.f.email")} name="email" type="email" required maxLength={255} />
                <Field label={t("contact.f.company")} name="company" maxLength={120} />
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t("contact.f.budget")}
                  </label>
                  <select
                    name="budget_range"
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    <option value="" disabled>
                      {t("contact.f.budget.placeholder")}
                    </option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("contact.f.message")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={2000}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {pending ? t("contact.f.sending") : t("contact.f.send")} <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}