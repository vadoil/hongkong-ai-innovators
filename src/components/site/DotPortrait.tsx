import { useEffect, useRef } from "react";

export type PortraitVariant = {
  hair: "short" | "long" | "buzz" | "bun" | "wavy";
  hairColor?: string;      // css color for hair fill on mask
  skin?: number;           // 0..1 base tone (lighter = smaller shadow band)
  glasses?: boolean;
  beard?: "none" | "stubble" | "full" | "goatee";
  brow?: "flat" | "arched" | "thick";
  lips?: "thin" | "full";
  jaw?: "narrow" | "wide";
  tilt?: number;           // -1..1 slight horizontal offset
};

type Props = {
  seed?: number;
  color?: string;
  accent?: string;
  className?: string;
  density?: number;         // point-count multiplier
  variant?: PortraitVariant;
};

/** Dense dot portrait: renders a shaded grayscale portrait on an offscreen canvas
 *  and samples thousands of dots weighted by darkness → a legible 3D-looking face
 *  built entirely from particles. */
export function DotPortrait({
  seed = 1,
  color = "#E7ECF3",
  accent = "#3B82F6",
  className,
  density = 1,
  variant = { hair: "short", beard: "none", brow: "flat", lips: "thin", jaw: "narrow" },
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

    // ----- PRNG -----
    const rand = (() => {
      let s = seed * 9301 + 49297;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    })();

    type P = {
      x: number; y: number; tx: number; ty: number;
      vx: number; vy: number;
      r: number;              // base radius
      w: number;              // weight (darkness 0..1)
      hue: number;
    };
    let pts: P[] = [];

    // ----- Offscreen mask (grayscale portrait) -----
    // Mask is a "darkness" map in [0..1]: 0 = empty, 1 = darkest.
    const MASK_W = 180;
    const MASK_H = 225;
    let mask: Float32Array | null = null;

    function buildMask() {
      const mc = document.createElement("canvas");
      mc.width = MASK_W;
      mc.height = MASK_H;
      const g = mc.getContext("2d")!;
      g.clearRect(0, 0, MASK_W, MASK_H);

      const tilt = variant.tilt ?? 0;
      const cx = MASK_W * (0.5 + tilt * 0.02);
      const cy = MASK_H * 0.42;
      const jawWide = variant.jaw === "wide";
      const faceRX = MASK_W * (jawWide ? 0.22 : 0.19);
      const faceRY = MASK_H * 0.22;

      // Neck
      g.fillStyle = "#666";
      g.beginPath();
      g.ellipse(cx, cy + faceRY * 0.9, faceRX * 0.45, faceRY * 0.35, 0, 0, Math.PI * 2);
      g.fill();

      // Shoulders
      const shoY = cy + faceRY * 1.15;
      g.fillStyle = "#555";
      g.beginPath();
      g.moveTo(cx - MASK_W * 0.42, MASK_H + 20);
      g.quadraticCurveTo(cx - MASK_W * 0.38, shoY, cx, shoY + 8);
      g.quadraticCurveTo(cx + MASK_W * 0.38, shoY, cx + MASK_W * 0.42, MASK_H + 20);
      g.closePath();
      g.fill();

      // Face base (shaded sphere, light top-left)
      const faceGrad = g.createRadialGradient(
        cx - faceRX * 0.35, cy - faceRY * 0.45, faceRX * 0.15,
        cx, cy, faceRX * 1.3,
      );
      faceGrad.addColorStop(0, "#B8BEC8");
      faceGrad.addColorStop(0.55, "#7A8290");
      faceGrad.addColorStop(1, "#3A424D");
      g.fillStyle = faceGrad;
      g.beginPath();
      g.ellipse(cx, cy, faceRX, faceRY, 0, 0, Math.PI * 2);
      g.fill();

      // Side shadow (right side darker for form)
      const sideGrad = g.createLinearGradient(cx - faceRX, 0, cx + faceRX, 0);
      sideGrad.addColorStop(0, "rgba(0,0,0,0)");
      sideGrad.addColorStop(0.55, "rgba(0,0,0,0)");
      sideGrad.addColorStop(1, "rgba(0,0,0,0.55)");
      g.fillStyle = sideGrad;
      g.beginPath();
      g.ellipse(cx, cy, faceRX, faceRY, 0, 0, Math.PI * 2);
      g.fill();

      // Jawline shadow (bottom)
      const jawGrad = g.createLinearGradient(0, cy, 0, cy + faceRY);
      jawGrad.addColorStop(0, "rgba(0,0,0,0)");
      jawGrad.addColorStop(1, "rgba(0,0,0,0.5)");
      g.fillStyle = jawGrad;
      g.beginPath();
      g.ellipse(cx, cy, faceRX * 0.98, faceRY * 0.98, 0, 0, Math.PI * 2);
      g.fill();

      // Hair
      const hairColor = variant.hairColor ?? "#0A0D12";
      g.fillStyle = hairColor;
      const drawHair = () => {
        switch (variant.hair) {
          case "buzz":
            g.beginPath();
            g.ellipse(cx, cy - faceRY * 0.55, faceRX * 1.02, faceRY * 0.5, 0, Math.PI, 0);
            g.fill();
            break;
          case "long":
            // top mass
            g.beginPath();
            g.ellipse(cx, cy - faceRY * 0.45, faceRX * 1.18, faceRY * 0.75, 0, 0, Math.PI * 2);
            g.fill();
            // side curtains down past jaw
            g.beginPath();
            g.moveTo(cx - faceRX * 1.15, cy - faceRY * 0.4);
            g.quadraticCurveTo(cx - faceRX * 1.4, cy + faceRY * 0.4, cx - faceRX * 0.9, cy + faceRY * 1.05);
            g.quadraticCurveTo(cx - faceRX * 0.6, cy + faceRY * 0.6, cx - faceRX * 0.75, cy - faceRY * 0.1);
            g.closePath();
            g.fill();
            g.beginPath();
            g.moveTo(cx + faceRX * 1.15, cy - faceRY * 0.4);
            g.quadraticCurveTo(cx + faceRX * 1.4, cy + faceRY * 0.4, cx + faceRX * 0.9, cy + faceRY * 1.05);
            g.quadraticCurveTo(cx + faceRX * 0.6, cy + faceRY * 0.6, cx + faceRX * 0.75, cy - faceRY * 0.1);
            g.closePath();
            g.fill();
            break;
          case "wavy":
            g.beginPath();
            g.ellipse(cx - faceRX * 0.15, cy - faceRY * 0.55, faceRX * 1.15, faceRY * 0.7, -0.15, 0, Math.PI * 2);
            g.fill();
            g.beginPath();
            g.ellipse(cx + faceRX * 0.2, cy - faceRY * 0.5, faceRX * 0.9, faceRY * 0.55, 0.1, 0, Math.PI * 2);
            g.fill();
            break;
          case "bun":
            g.beginPath();
            g.ellipse(cx, cy - faceRY * 0.45, faceRX * 1.05, faceRY * 0.55, 0, 0, Math.PI * 2);
            g.fill();
            g.beginPath();
            g.arc(cx + faceRX * 0.45, cy - faceRY * 1.05, faceRX * 0.45, 0, Math.PI * 2);
            g.fill();
            break;
          case "short":
          default:
            g.beginPath();
            g.ellipse(cx, cy - faceRY * 0.5, faceRX * 1.08, faceRY * 0.6, 0, 0, Math.PI * 2);
            g.fill();
            // side fade
            g.beginPath();
            g.moveTo(cx - faceRX * 1.05, cy - faceRY * 0.3);
            g.quadraticCurveTo(cx - faceRX * 1.05, cy - faceRY * 0.9, cx, cy - faceRY * 1.05);
            g.quadraticCurveTo(cx + faceRX * 1.05, cy - faceRY * 0.9, cx + faceRX * 1.05, cy - faceRY * 0.3);
            g.lineTo(cx + faceRX * 0.9, cy - faceRY * 0.1);
            g.quadraticCurveTo(cx, cy - faceRY * 0.45, cx - faceRX * 0.9, cy - faceRY * 0.1);
            g.closePath();
            g.fill();
        }
      };
      drawHair();

      // ----- Facial features -----
      const eyeY = cy - faceRY * 0.08;
      const eyeDX = faceRX * 0.42;
      const eyeRX = faceRX * 0.16;
      const eyeRY = faceRY * 0.08;

      // Eye sockets (soft shadow)
      const drawEyeSocket = (ex: number) => {
        const rg = g.createRadialGradient(ex, eyeY, 1, ex, eyeY, eyeRX * 1.8);
        rg.addColorStop(0, "rgba(0,0,0,0.55)");
        rg.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = rg;
        g.beginPath();
        g.ellipse(ex, eyeY, eyeRX * 1.8, eyeRY * 2.0, 0, 0, Math.PI * 2);
        g.fill();
      };
      drawEyeSocket(cx - eyeDX);
      drawEyeSocket(cx + eyeDX);

      // Eye whites
      g.fillStyle = "#DDE3EC";
      g.beginPath();
      g.ellipse(cx - eyeDX, eyeY, eyeRX, eyeRY, 0, 0, Math.PI * 2);
      g.ellipse(cx + eyeDX, eyeY, eyeRX, eyeRY, 0, 0, Math.PI * 2);
      g.fill();

      // Iris + pupil
      g.fillStyle = "#111418";
      g.beginPath();
      g.arc(cx - eyeDX, eyeY, eyeRY * 0.95, 0, Math.PI * 2);
      g.arc(cx + eyeDX, eyeY, eyeRY * 0.95, 0, Math.PI * 2);
      g.fill();
      // Catchlight
      g.fillStyle = "#F0F3F8";
      g.beginPath();
      g.arc(cx - eyeDX - eyeRY * 0.25, eyeY - eyeRY * 0.3, eyeRY * 0.25, 0, Math.PI * 2);
      g.arc(cx + eyeDX - eyeRY * 0.25, eyeY - eyeRY * 0.3, eyeRY * 0.25, 0, Math.PI * 2);
      g.fill();

      // Brows
      const browThick = variant.brow === "thick" ? faceRY * 0.06 : faceRY * 0.035;
      const drawBrow = (ex: number, dir: 1 | -1) => {
        g.strokeStyle = "#0A0D12";
        g.lineWidth = browThick;
        g.lineCap = "round";
        g.beginPath();
        const arch = variant.brow === "arched" ? faceRY * 0.03 : faceRY * 0.012;
        g.moveTo(ex - eyeRX * 1.1, eyeY - eyeRY * 1.8);
        g.quadraticCurveTo(ex, eyeY - eyeRY * 1.8 - arch, ex + eyeRX * 1.1, eyeY - eyeRY * 1.8 + dir * 0.5);
        g.stroke();
      };
      drawBrow(cx - eyeDX, 1);
      drawBrow(cx + eyeDX, -1);

      // Nose (bridge highlight + tip shadow)
      const noseCy = cy + faceRY * 0.05;
      const noseShadow = g.createLinearGradient(cx - faceRX * 0.1, 0, cx + faceRX * 0.1, 0);
      noseShadow.addColorStop(0, "rgba(255,255,255,0.08)");
      noseShadow.addColorStop(0.55, "rgba(255,255,255,0)");
      noseShadow.addColorStop(1, "rgba(0,0,0,0.35)");
      g.fillStyle = noseShadow;
      g.beginPath();
      g.moveTo(cx - faceRX * 0.08, eyeY);
      g.quadraticCurveTo(cx - faceRX * 0.12, noseCy, cx - faceRX * 0.05, noseCy + faceRY * 0.15);
      g.quadraticCurveTo(cx, noseCy + faceRY * 0.2, cx + faceRX * 0.05, noseCy + faceRY * 0.15);
      g.quadraticCurveTo(cx + faceRX * 0.12, noseCy, cx + faceRX * 0.08, eyeY);
      g.closePath();
      g.fill();
      // Nostril hints
      g.fillStyle = "rgba(0,0,0,0.45)";
      g.beginPath();
      g.ellipse(cx - faceRX * 0.06, noseCy + faceRY * 0.17, faceRX * 0.025, faceRY * 0.012, 0, 0, Math.PI * 2);
      g.ellipse(cx + faceRX * 0.06, noseCy + faceRY * 0.17, faceRX * 0.025, faceRY * 0.012, 0, 0, Math.PI * 2);
      g.fill();

      // Lips
      const mouthY = cy + faceRY * 0.42;
      const mouthW = faceRX * 0.55;
      const lipsFull = variant.lips === "full";
      // Upper lip shadow line
      g.strokeStyle = "rgba(0,0,0,0.55)";
      g.lineWidth = lipsFull ? faceRY * 0.035 : faceRY * 0.022;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(cx - mouthW, mouthY);
      g.quadraticCurveTo(cx, mouthY + faceRY * 0.02, cx + mouthW, mouthY);
      g.stroke();
      // Cupid's bow + lower lip shading
      if (lipsFull) {
        g.fillStyle = "rgba(0,0,0,0.25)";
        g.beginPath();
        g.ellipse(cx, mouthY + faceRY * 0.06, mouthW * 0.9, faceRY * 0.045, 0, 0, Math.PI * 2);
        g.fill();
      }

      // Chin shadow line
      g.strokeStyle = "rgba(0,0,0,0.3)";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(cx - faceRX * 0.12, mouthY + faceRY * 0.28);
      g.quadraticCurveTo(cx, mouthY + faceRY * 0.32, cx + faceRX * 0.12, mouthY + faceRY * 0.28);
      g.stroke();

      // Beard
      if (variant.beard && variant.beard !== "none") {
        g.fillStyle = variant.beard === "stubble" ? "rgba(10,13,18,0.45)" : "#0A0D12";
        g.beginPath();
        if (variant.beard === "goatee") {
          g.ellipse(cx, mouthY + faceRY * 0.25, faceRX * 0.25, faceRY * 0.18, 0, 0, Math.PI * 2);
        } else {
          // full / stubble: jaw wrap
          g.moveTo(cx - faceRX * 0.95, cy + faceRY * 0.1);
          g.quadraticCurveTo(cx - faceRX * 0.75, cy + faceRY * 0.95, cx, cy + faceRY * 1.0);
          g.quadraticCurveTo(cx + faceRX * 0.75, cy + faceRY * 0.95, cx + faceRX * 0.95, cy + faceRY * 0.1);
          g.quadraticCurveTo(cx + faceRX * 0.7, cy + faceRY * 0.55, cx, cy + faceRY * 0.5);
          g.quadraticCurveTo(cx - faceRX * 0.7, cy + faceRY * 0.55, cx - faceRX * 0.95, cy + faceRY * 0.1);
        }
        g.closePath();
        g.fill();
      }

      // Glasses
      if (variant.glasses) {
        g.strokeStyle = "#0A0D12";
        g.lineWidth = Math.max(1.5, faceRX * 0.03);
        const rgx = faceRX * 0.22;
        const rgy = faceRY * 0.14;
        g.beginPath();
        g.ellipse(cx - eyeDX, eyeY, rgx, rgy, 0, 0, Math.PI * 2);
        g.ellipse(cx + eyeDX, eyeY, rgx, rgy, 0, 0, Math.PI * 2);
        g.stroke();
        // Bridge
        g.beginPath();
        g.moveTo(cx - eyeDX + rgx, eyeY);
        g.lineTo(cx + eyeDX - rgx, eyeY);
        g.stroke();
        // Temples
        g.beginPath();
        g.moveTo(cx - eyeDX - rgx, eyeY);
        g.lineTo(cx - faceRX, eyeY - faceRY * 0.03);
        g.moveTo(cx + eyeDX + rgx, eyeY);
        g.lineTo(cx + faceRX, eyeY - faceRY * 0.03);
        g.stroke();
      }

      // Convert to darkness map
      const img = g.getImageData(0, 0, MASK_W, MASK_H).data;
      const m = new Float32Array(MASK_W * MASK_H);
      for (let i = 0, j = 0; i < img.length; i += 4, j++) {
        const a = img[i + 3] / 255;
        if (a < 0.02) { m[j] = 0; continue; }
        // darkness = 1 - luminance (weighted by alpha)
        const lum = (0.2126 * img[i] + 0.7152 * img[i + 1] + 0.0722 * img[i + 2]) / 255;
        m[j] = a * (1 - lum * 0.75); // keep bright areas still sample-worthy
      }
      mask = m;
    }

    function sampleMask(nx: number, ny: number) {
      if (!mask) return 0;
      const x = Math.max(0, Math.min(MASK_W - 1, Math.floor(nx * MASK_W)));
      const y = Math.max(0, Math.min(MASK_H - 1, Math.floor(ny * MASK_H)));
      return mask[y * MASK_W + x];
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
      pts = [];
      const target = Math.floor((W * H) / 45 * density); // ~5-6x denser than before
      let tries = 0;
      const maxTries = target * 30;
      while (pts.length < target && tries < maxTries) {
        tries++;
        const nx = rand();
        const ny = rand();
        const w = sampleMask(nx, ny);
        if (w <= 0.01) continue;
        // Rejection sampling — probability = w
        if (rand() > Math.min(1, w * 1.25)) continue;
        const x = nx * W;
        const y = ny * H;
        pts.push({
          x: x + (rand() - 0.5) * 30,
          y: y + (rand() - 0.5) * 30,
          tx: x, ty: y,
          vx: 0, vy: 0,
          r: 0.5 + (1 - w) * 0.6 + rand() * 0.5, // lighter → slightly bigger; keeps texture
          w,
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
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.01;
        p.vy += dy * 0.01;

        // Subtle ambient breath
        p.vx += Math.sin(now * 0.0008 + p.hue * 6.28) * 0.03;
        p.vy += Math.cos(now * 0.0009 + p.hue * 6.28) * 0.03;

        if (active) {
          const rx = p.x - mx;
          const ry = p.y - my;
          const d2 = rx * rx + ry * ry;
          if (d2 < 80 * 80) {
            const f = (1 - d2 / (80 * 80)) * 1.3;
            p.vx += (rx / Math.sqrt(d2 + 0.01)) * f;
            p.vy += (ry / Math.sqrt(d2 + 0.01)) * f;
          }
        }

        p.vx *= 0.85; p.vy *= 0.85;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // Color: darker mask value → darker dot, lighter mask → main color, tiny hue → accent sprinkle
        const darkness = p.w;
        let fill: string;
        if (p.hue > 0.965) {
          fill = accent;
          ctx.globalAlpha = 0.95;
        } else if (darkness > 0.7) {
          fill = "#05070B";
          ctx.globalAlpha = 0.95;
        } else if (darkness > 0.45) {
          fill = "#1A2029";
          ctx.globalAlpha = 0.9;
        } else if (darkness > 0.25) {
          fill = "#5A6474";
          ctx.globalAlpha = 0.85;
        } else {
          fill = color;
          ctx.globalAlpha = 0.7;
        }
        ctx.fillStyle = fill;
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

    buildMask();
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
  }, [
    seed, color, accent, density,
    variant.hair, variant.hairColor, variant.glasses, variant.beard,
    variant.brow, variant.lips, variant.jaw, variant.tilt, variant.skin,
  ]);

  return <canvas ref={ref} className={className} />;
}