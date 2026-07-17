import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { MessageCircle, X, Send } from "lucide-react";

export function FloatingChat() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const channels = [
    { key: "whatsapp", href: "https://wa.me/85251234567", color: "from-jade to-emerald-500", label: t("chat.whatsapp") },
    { key: "wechat", href: "weixin://dl/chat?cwh_hk", color: "from-emerald-500 to-jade", label: t("chat.wechat") },
    { key: "telegram", href: "https://t.me/cwh_hk", color: "from-primary to-sky-500", label: t("chat.telegram") },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {open && (
        <div className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-border bg-surface/95 p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between gap-6">
            <div className="font-display text-sm font-medium">{t("chat.title")}</div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full p-1 text-muted-foreground hover:bg-background hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {channels.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50"
              >
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-white shadow-md`}>
                  <Send className="h-4 w-4" />
                </span>
                <span className="font-medium">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_60px_-15px_var(--color-primary)] transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-15px_var(--color-primary)]"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-primary opacity-60 blur-xl animate-pulse" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}