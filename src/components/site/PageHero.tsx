import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[900px] -translate-x-1/2 glow-blue" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="inline-block h-px w-8 bg-primary" />
          {eyebrow}
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {lead ? <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}