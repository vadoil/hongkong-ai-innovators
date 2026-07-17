import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const style: CSSProperties = shown
    ? { animationDelay: `${delay}s` }
    : { opacity: 0, transform: "translateY(24px)" };

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={`${shown ? "reveal reveal-in" : ""} ${className}`}
      style={style}
    >
      {children}
    </Comp>
  );
}