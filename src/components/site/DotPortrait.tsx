import { useEffect, useRef } from "react";

type Variant = {
  hair: "short" | "long" | "buzz" | "bun";
  glasses?: boolean;
  beard?: boolean;
  tilt?: number;
};

type Props = {
  seed?: number;
  color?: string;
  accent?: string;
  className?: string;
  density?: number;
  variant?: Variant;
};

/** Animated dot portrait with recognisable facial features and per-person variants. */
export function DotPortrait({
  seed = 1,
  color = "#E7ECF3",
  accent = "#3B82F6",
  className,
  density = 1,
  variant = { hair: "short" },
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0, H = 0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const rand = (() => {
      let s = seed * 9301 + 49297;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    })();

    type P = {
      x: number; y: number; tx: number; ty: number;
      vx: number; vy: number; r: number; hue: number; dark?: boolean;
    };
    let pts: P[] = [];

    const tilt = variant.tilt ?? 0;
    const cx = 0.5 + tilt * 0.02;
    const face = { cx, cy: 0.42, rx: 0.17, ry: 0.21 };

    const inEllipse = (nx: number, ny: number, ex: number, ey: number, rx: number, ry: number) =>
      ((nx - ex) / rx) ** 2 + ((ny - ey) / ry) ** 2 <= 1;

    function inHair(nx: number, ny: number) {
      const dx = nx - face.cx;
      switch (variant.hair) {
        case "buzz":
          return inEllipse(nx, ny, face.cx, face.cy - 0.06, face.rx * 1.02, face.ry * 0.55)
            && ny < face.cy - 0.02;
        case "long":
          if (inEllipse(nx, ny, face.cx, face.cy - 0.05, face.rx * 1.15, face.ry * 0.7)
              && ny < face.cy - 0.02) return true;
          if (Math.abs(dx) > face.rx * 0.75 && Math.abs(dx) < face.rx * 1.25
              && ny > face.cy - 0.15 && ny < face.cy + face.ry * 1.05) return true;
          return false;
        case "bun":
          if (inEllipse(nx, ny, face.cx, face.cy - 0.05, face.rx * 1.08, face.ry * 0.6)
              && ny < face.cy - 0.02) return true;
          if (inEllipse(nx, ny, face.cx + 0.05, face.cy - 0.22, 0.07, 0.07)) return true;
          return false;
        case "short":
        default:
          return inEllipse(nx, ny, face.cx, face.cy - 0.05, face.rx * 1.08, face.ry * 0.65)
            && ny < face.cy - 0.015;
      }
    }

    function inBeard(nx: number, ny: number) {
      if (!variant.beard) return false;
      const dx = nx - face.cx;
      return ny > face.cy + 0.04 && ny < face.cy + face.ry * 0.95
        && Math.abs(dx) < face.rx * 0.85
        && inEllipse(nx, ny, face.cx, face.cy + 0.08, face.rx * 0.9, face.ry * 0.85);
    }

    function inNeck(nx: number, ny: number) {
      return Math.abs(nx - face.cx) < 0.06 && ny > face.cy + face.ry - 0.01 && ny < 0.7;
    }

    function inShoulders(nx: number, ny: number) {
      if (ny < 0.68 || ny > 1.02) return false;
      const spread = 0.22 + (ny - 0.68) * 1.3;
      const topEdge = 0.7 - 0.05 * (1 - Math.abs((nx - 0.5) / spread));
      return Math.abs(nx - 0.5) < spread && ny > topEdge;
    }

    function insideSilhouette(nx: number, ny: number) {
      if (inEllipse(nx, ny, face.cx, face.cy, face.rx, face.ry)) return true;
      if (inHair(nx, ny)) return true;
      if (inNeck(nx, ny)) return true;
      if (inShoulders(nx, ny)) return true;
      return false;
    }

    type Cluster = { cx: number; cy: number; rx: number; ry: number; count: number; dark: boolean };
    function buildClusters(scale = 1): Cluster[] {
      const eyeY = face.cy - 0.02;
      const eyeDX = face.rx * 0.42;
      const cs: Cluster[] = [];
      cs.push({ cx: face.cx - eyeDX, cy: eyeY - 0.05, rx: 0.045, ry: 0.012, count: Math.round(22 * scale), dark: true });
      cs.push({ cx: face.cx + eyeDX, cy: eyeY - 0.05, rx: 0.045, ry: 0.012, count: Math.round(22 * scale), dark: true });
      cs.push({ cx: face.cx - eyeDX, cy: eyeY, rx: 0.032, ry: 0.018, count: Math.round(26 * scale), dark: true });
      cs.push({ cx: face.cx + eyeDX, cy: eyeY, rx: 0.032, ry: 0.018, count: Math.round(26 * scale), dark: true });
      cs.push({ cx: face.cx, cy: eyeY + 0.06, rx: 0.012, ry: 0.05, count: Math.round(16 * scale), dark: false });
      cs.push({ cx: face.cx, cy: eyeY + 0.11, rx: 0.028, ry: 0.012, count: Math.round(14 * scale), dark: false });
      cs.push({ cx: face.cx, cy: eyeY + 0.18, rx: 0.06, ry: 0.012, count: Math.round(28 * scale), dark: true });
      if (variant.glasses) {
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
          cs.push({
            cx: face.cx - eyeDX + Math.cos(a) * 0.05,
            cy: eyeY + Math.sin(a) * 0.028,
            rx: 0.006, ry: 0.006, count: Math.round(3 * scale), dark: true,
          });
          cs.push({
            cx: face.cx + eyeDX + Math.cos(a) * 0.05,
            cy: eyeY + Math.sin(a) * 0.028,
            rx: 0.006, ry: 0.006, count: Math.round(3 * scale), dark: true,
          });
        }
        cs.push({ cx: face.cx, cy: eyeY, rx: 0.02, ry: 0.004, count: Math.round(8 * scale), dark: true });
      }
      return cs;
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seedPoints();
    }

    function pushPoint(nx: number, ny: number, opts: { dark?: boolean; jitter?: number } = {}) {
      const x = nx * W, y = ny * H;
      const jitter = opts.jitter ?? 40;
      pts.push({
        x: x + (rand() - 0.5) * jitter,
        y: y + (rand() - 0.5) * jitter,
        tx: x, ty: y,
        vx: 0, vy: 0,
        r: opts.dark ? 0.7 + rand() * 1.0 : 0.6 + rand() * 1.4,
        hue: rand(),
        dark: opts.dark,
      });
    }

    function seedPoints() {
      pts = [];
      const baseTarget = Math.floor((W * H) / 300 * density);
      let tries = 0;
      while (pts.length < baseTarget && tries < baseTarget * 40) {
        tries++;
        const nx = rand(), ny = rand();
        if (!insideSilhouette(nx, ny)) continue;
        const inH = inHair(nx, ny);
        const inB = inBeard(nx, ny);
        pushPoint(nx, ny, { dark: inH || inB });
      }
      const scale = Math.max(0.6, Math.min(1.6, (W * H) / (220 * 275))) * density;
      const clusters = buildClusters(scale);
      for (const c of clusters) {
        for (let i = 0; i < c.count; i++) {
          let nx = c.cx, ny = c.cy;
          for (let k = 0; k < 8; k++) {
            const u = rand() * 2 - 1, v = rand() * 2 - 1;
            if (u * u + v * v <= 1) { nx = c.cx + u * c.rx; ny = c.cy + v * c.ry; break; }
          }
          pushPoint(nx, ny, { dark: c.dark, jitter: 18 });
        }
      }
    }

    let t0 = performance.now();
    function frame(now: number) {
      const dt = Math.min(48, now - t0); t0 = now;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x, my = mouse.current.y, active = mouse.current.active;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.008;
        p.vy += dy * 0.008;

        const wob = Math.sin(now * 0.0008 + p.hue * 6.28) * 0.05;
        p.vx += wob;
        p.vy += Math.cos(now * 0.0009 + p.hue * 6.28) * 0.04;

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

        const useAccent = !p.dark && p.hue > 0.9;
        if (p.dark) {
          ctx.fillStyle = "#05070C";
          ctx.globalAlpha = 0.95;
        } else {
          ctx.fillStyle = useAccent ? accent : color;
          ctx.globalAlpha = useAccent ? 0.95 : 0.72;
        }
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
  }, [seed, color, accent, density, variant.hair, variant.glasses, variant.beard, variant.tilt]);

  return <canvas ref={ref} className={className} />;
}