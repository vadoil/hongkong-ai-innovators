import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meridian HK" },
      {
        name: "description",
        content: "Tell us about your product. We reply within one business day.",
      },
      { property: "og:title", content: "Contact — Meridian HK" },
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    // TODO: wire to Supabase `leads` table in step 3
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Thanks — we'll reply within one business day.");
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
                Contact
              </div>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Tell us about
                <br />
                your <span className="text-primary">product.</span>
              </h1>
              <p className="mt-6 max-w-md text-muted-foreground">
                Share the shape of the project. We reply within one business day with next steps.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:hello@meridian.hk" className="hover:text-primary">
                    hello@meridian.hk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  Central, Hong Kong
                </div>
              </div>
              <div className="mt-10">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← Back to home
                </Link>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="md:col-span-3 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required maxLength={100} />
                <Field label="Email" name="email" type="email" required maxLength={255} />
                <Field label="Company" name="company" maxLength={120} />
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Budget range
                  </label>
                  <select
                    name="budget_range"
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Message
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
                {pending ? "Sending…" : "Send"} <ArrowUpRight className="h-4 w-4" />
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