import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
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
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {t("footer.navigate")}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="hover:text-primary" to="/services">{t("nav.services")}</Link></li>
              <li><Link className="hover:text-primary" to="/work">{t("nav.work")}</Link></li>
              <li><Link className="hover:text-primary" to="/process">{t("nav.process")}</Link></li>
              <li><Link className="hover:text-primary" to="/about">{t("nav.about")}</Link></li>
              <li><Link className="hover:text-primary" to="/contact">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {t("footer.contact")}
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
            <a href="#" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}