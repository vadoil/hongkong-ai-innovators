import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              <span className="font-display text-lg font-semibold tracking-tight">
                Meridian<span className="text-primary">.hk</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A full-cycle product studio from Hong Kong. Research, strategy, design and
              engineering for software and cloud teams.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Navigate
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="hover:text-primary" to="/services">Services</Link></li>
              <li><Link className="hover:text-primary" to="/work">Portfolio</Link></li>
              <li><Link className="hover:text-primary" to="/process">Process</Link></li>
              <li><Link className="hover:text-primary" to="/about">About</Link></li>
              <li><Link className="hover:text-primary" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>hello@meridian.hk</li>
              <li>Suite 2201, 22/F, Tower 1,</li>
              <li>Admiralty Centre, 18 Harcourt Rd,</li>
              <li>Admiralty, Hong Kong SAR</li>
              <li className="flex gap-3 pt-2 text-foreground">
                <a href="#" className="hover:text-primary">LinkedIn</a>
                <a href="#" className="hover:text-primary">X</a>
                <a href="#" className="hover:text-primary">GitHub</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Meridian HK. Hong Kong.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}