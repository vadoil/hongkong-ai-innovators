import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight">
                CWH<span className="text-primary">.HK</span>
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
              <li>hello@cwh.hk</li>
              <li>{t("footer.address.1")}</li>
              <li>{t("footer.address.2")}</li>
              <li>{t("footer.address.3")}</li>
              <li className="flex gap-3 pt-2 text-foreground">
                <a href="#" className="hover:text-primary">LinkedIn</a>
                <a href="#" className="hover:text-primary">X</a>
                <a href="#" className="hover:text-primary">GitHub</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} CWH.HK · {t("footer.copy")}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}