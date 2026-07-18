import { useEffect, useRef } from "react";

type Props = {
  seed?: number;
  color?: string;      // dot color (css)
  accent?: string;     // accent color for highlights
  className?: string;
  density?: number;    // 0..1
};

/** Animated portrait made of drifting dots that settle into a stylised bust silhouette. */
export function DotPortrait({ seed = 1, color = "#E7ECF3", accent = "#3B82F6", className, density = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0, H = 0, DPR = Math.min(2, window.devicePixelRatio || 1);

    // Deterministic PRNG
    const rand = (() => {
      let s = seed * 9301 + 49297;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    })();

    type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; r: number; hue: number };
    let pts: P[] = [];

    // Build a target silhouette (head + neck + shoulders) in normalized 0..1 coords.
    function insideSilhouette(nx: number, ny: number) {
      // head: ellipse
      const hx = 0.5, hy = 0.36, hrx = 0.19, hry = 0.23;
      const dh = ((nx - hx) / hrx) ** 2 + ((ny - hy) / hry) ** 2;
      if (dh <= 1) return true;
      // neck
      if (nx > 0.44 && nx < 0.56 && ny > 0.55 && ny < 0.66) return true;
      // shoulders: rounded trapezoid
      if (ny >= 0.64 && ny <= 1.02) {
        const spread = 0.22 + (ny - 0.64) * 1.4;
        const cx = 0.5;
        // top curve of shoulders
        const topEdge = 0.66 - 0.06 * (1 - Math.abs((nx - cx) / spread));
        if (Math.abs(nx - cx) < spread && ny > topEdge) return true;
      }
      return false;
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seedPoints();
    }

    function seedPoints() {
      const target = Math.floor((W * H) / 260 * density);
      pts = [];
      let tries = 0;
      while (pts.length < target && tries < target * 40) {
        tries++;
        const nx = rand();
        const ny = rand();
        if (!insideSilhouette(nx, ny)) continue;
        // slight bias toward face area (denser dots on head)
        if (ny < 0.6 && rand() < 0.15) continue;
        const x = nx * W;
        const y = ny * H;
        pts.push({
          x: x + (rand() - 0.5) * 40,
          y: y + (rand() - 0.5) * 40,
          tx: x, ty: y,
          vx: 0, vy: 0,
          r: 0.6 + rand() * 1.4,
          hue: rand(),
        });
      }
    }

    let t0 = performance.now();
    function frame(now: number) {
      const dt = Math.min(48, now - t0); t0 = now;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x, my = mouse.current.y, active = mouse.current.active;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // Pull toward target
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.006;
        p.vy += dy * 0.006;

        // Ambient breath drift
        const wob = Math.sin(now * 0.0008 + p.hue * 6.28) * 0.06;
        p.vx += wob;
        p.vy += Math.cos(now * 0.0009 + p.hue * 6.28) * 0.05;

        // Cursor scatter
        if (active) {
          const rx = p.x - mx;
          const ry = p.y - my;
          const d2 = rx * rx + ry * ry;
          if (d2 < 90 * 90) {
            const f = (1 - d2 / (90 * 90)) * 1.4;
            p.vx += (rx / Math.sqrt(d2 + 0.01)) * f;
            p.vy += (ry / Math.sqrt(d2 + 0.01)) * f;
          }
        }

        p.vx *= 0.86; p.vy *= 0.86;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        const useAccent = p.hue > 0.86;
        ctx.fillStyle = useAccent ? accent : color;
        ctx.globalAlpha = useAccent ? 0.95 : 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [seed, color, accent, density]);

  return <canvas ref={ref} className={className} />;
}
