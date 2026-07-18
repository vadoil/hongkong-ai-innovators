import { useEffect, useRef } from "react";

export type PortraitVariant = {
  hair: "short" | "long" | "buzz" | "bun" | "wavy";
  hairColor?: string;
  glasses?: boolean;
  beard?: "none" | "stubble" | "full" | "goatee";
  brow?: "flat" | "arched" | "thick";
  lips?: "thin" | "full";
  jaw?: "narrow" | "wide";
  tilt?: number;
};

type Props = {
  seed?: number;
  color?: string;
  accent?: string;
  className?: string;
  density?: number;
  variant?: PortraitVariant;
};

/** High-density stipple portrait: renders a shaded portrait on an offscreen
 *  canvas, then samples thousands of tiny dots weighted by darkness so the
 *  face reads as a fine stippling illustration (like ink pointillism). */
export function DotPortrait({
  seed = 1,
  color = "#F1F4F9",
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

    // ----- deterministic PRNG -----
    const rand = (() => {
      let s = seed * 9301 + 49297;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    })();

    type P = { x: number; y: number; tx: number; ty: number; r: number; w: number; hue: number; ph: number };
    let pts: P[] = [];

    // ----- OFFSCREEN SHADED MASK -----
    const MASK_W = 300;
    const MASK_H = 375;
    let mask: Float32Array | null = null;

    function buildMask() {
      const mc = document.createElement("canvas");
      mc.width = MASK_W;
      mc.height = MASK_H;
      const g = mc.getContext("2d")!;

      const tilt = variant.tilt ?? 0;
      const cx = MASK_W * (0.5 + tilt * 0.02);
      const cy = MASK_H * 0.44;
      const jawWide = variant.jaw === "wide";
      const fRX = MASK_W * (jawWide ? 0.22 : 0.19);
      const fRY = MASK_H * 0.22;

      // ---------- Shoulders ----------
      g.fillStyle = "#4A5260";
      g.beginPath();
      g.moveTo(cx - MASK_W * 0.5, MASK_H + 30);
      g.quadraticCurveTo(cx - MASK_W * 0.42, cy + fRY * 1.25, cx, cy + fRY * 1.15);
      g.quadraticCurveTo(cx + MASK_W * 0.42, cy + fRY * 1.25, cx + MASK_W * 0.5, MASK_H + 30);
      g.closePath();
      g.fill();
      // shoulder shadow (top curve)
      const shGrad = g.createLinearGradient(0, cy + fRY * 1.1, 0, MASK_H);
      shGrad.addColorStop(0, "rgba(0,0,0,0.35)");
      shGrad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = shGrad;
      g.beginPath();
      g.moveTo(cx - MASK_W * 0.5, MASK_H + 30);
      g.quadraticCurveTo(cx - MASK_W * 0.42, cy + fRY * 1.25, cx, cy + fRY * 1.15);
      g.quadraticCurveTo(cx + MASK_W * 0.42, cy + fRY * 1.25, cx + MASK_W * 0.5, MASK_H + 30);
      g.closePath();
      g.fill();

      // ---------- Neck ----------
      g.fillStyle = "#6B7280";
      g.beginPath();
      g.ellipse(cx, cy + fRY * 0.95, fRX * 0.55, fRY * 0.4, 0, 0, Math.PI * 2);
      g.fill();
      // neck side shadow
      const nGrad = g.createLinearGradient(cx - fRX * 0.55, 0, cx + fRX * 0.55, 0);
      nGrad.addColorStop(0, "rgba(255,255,255,0.05)");
      nGrad.addColorStop(0.5, "rgba(0,0,0,0)");
      nGrad.addColorStop(1, "rgba(0,0,0,0.35)");
      g.fillStyle = nGrad;
      g.beginPath();
      g.ellipse(cx, cy + fRY * 0.95, fRX * 0.55, fRY * 0.4, 0, 0, Math.PI * 2);
      g.fill();

      // ---------- Face base (shaded sphere, light top-left) ----------
      const faceGrad = g.createRadialGradient(
        cx - fRX * 0.4, cy - fRY * 0.5, fRX * 0.1,
        cx + fRX * 0.15, cy + fRY * 0.2, fRX * 1.5,
      );
      faceGrad.addColorStop(0, "#C8CFD8");   // highlight
      faceGrad.addColorStop(0.35, "#8E96A2");
      faceGrad.addColorStop(0.7, "#5A626F");
      faceGrad.addColorStop(1, "#2C323C");   // shadow
      g.fillStyle = faceGrad;
      g.beginPath();
      g.ellipse(cx, cy, fRX, fRY, 0, 0, Math.PI * 2);
      g.fill();

      // Right side rim shadow
      const rimGrad = g.createLinearGradient(cx - fRX, 0, cx + fRX, 0);
      rimGrad.addColorStop(0, "rgba(0,0,0,0)");
      rimGrad.addColorStop(0.62, "rgba(0,0,0,0)");
      rimGrad.addColorStop(1, "rgba(0,0,0,0.55)");
      g.fillStyle = rimGrad;
      g.beginPath();
      g.ellipse(cx, cy, fRX, fRY, 0, 0, Math.PI * 2);
      g.fill();

      // Chin shadow (bottom)
      const chGrad = g.createLinearGradient(0, cy + fRY * 0.2, 0, cy + fRY * 1.05);
      chGrad.addColorStop(0, "rgba(0,0,0,0)");
      chGrad.addColorStop(1, "rgba(0,0,0,0.6)");
      g.fillStyle = chGrad;
      g.beginPath();
      g.ellipse(cx, cy, fRX, fRY, 0, 0, Math.PI * 2);
      g.fill();

      // Cheekbone highlight
      const cheekL = g.createRadialGradient(cx - fRX * 0.55, cy + fRY * 0.15, 2, cx - fRX * 0.55, cy + fRY * 0.15, fRX * 0.4);
      cheekL.addColorStop(0, "rgba(255,255,255,0.18)");
      cheekL.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = cheekL;
      g.beginPath();
      g.ellipse(cx, cy, fRX, fRY, 0, 0, Math.PI * 2);
      g.fill();

      // Forehead highlight
      const foreG = g.createRadialGradient(cx - fRX * 0.2, cy - fRY * 0.55, 2, cx - fRX * 0.2, cy - fRY * 0.55, fRX * 0.6);
      foreG.addColorStop(0, "rgba(255,255,255,0.15)");
      foreG.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = foreG;
      g.beginPath();
      g.ellipse(cx, cy, fRX, fRY, 0, 0, Math.PI * 2);
      g.fill();

      // ---------- Hair ----------
      const hairColor = variant.hairColor ?? "#08090C";
      g.fillStyle = hairColor;
      const drawHair = () => {
        switch (variant.hair) {
          case "buzz":
            g.beginPath();
            g.ellipse(cx, cy - fRY * 0.62, fRX * 1.02, fRY * 0.5, 0, Math.PI, 0);
            g.fill();
            break;
          case "long":
            g.beginPath();
            g.ellipse(cx, cy - fRY * 0.45, fRX * 1.22, fRY * 0.78, 0, 0, Math.PI * 2);
            g.fill();
            g.beginPath();
            g.moveTo(cx - fRX * 1.18, cy - fRY * 0.35);
            g.quadraticCurveTo(cx - fRX * 1.45, cy + fRY * 0.5, cx - fRX * 0.85, cy + fRY * 1.15);
            g.quadraticCurveTo(cx - fRX * 0.55, cy + fRY * 0.65, cx - fRX * 0.75, cy - fRY * 0.05);
            g.closePath();
            g.fill();
            g.beginPath();
            g.moveTo(cx + fRX * 1.18, cy - fRY * 0.35);
            g.quadraticCurveTo(cx + fRX * 1.45, cy + fRY * 0.5, cx + fRX * 0.85, cy + fRY * 1.15);
            g.quadraticCurveTo(cx + fRX * 0.55, cy + fRY * 0.65, cx + fRX * 0.75, cy - fRY * 0.05);
            g.closePath();
            g.fill();
            break;
          case "wavy":
            g.beginPath();
            g.ellipse(cx - fRX * 0.15, cy - fRY * 0.6, fRX * 1.18, fRY * 0.75, -0.15, 0, Math.PI * 2);
            g.fill();
            g.beginPath();
            g.ellipse(cx + fRX * 0.22, cy - fRY * 0.55, fRX * 0.95, fRY * 0.6, 0.1, 0, Math.PI * 2);
            g.fill();
            break;
          case "bun":
            g.beginPath();
            g.ellipse(cx, cy - fRY * 0.5, fRX * 1.08, fRY * 0.6, 0, 0, Math.PI * 2);
            g.fill();
            g.beginPath();
            g.arc(cx + fRX * 0.55, cy - fRY * 1.15, fRX * 0.5, 0, Math.PI * 2);
            g.fill();
            // hair strands framing face
            g.beginPath();
            g.moveTo(cx - fRX * 1.0, cy - fRY * 0.2);
            g.quadraticCurveTo(cx - fRX * 0.85, cy + fRY * 0.3, cx - fRX * 0.55, cy + fRY * 0.2);
            g.quadraticCurveTo(cx - fRX * 0.9, cy - fRY * 0.1, cx - fRX * 1.0, cy - fRY * 0.2);
            g.closePath();
            g.fill();
            break;
          case "short":
          default:
            g.beginPath();
            g.ellipse(cx, cy - fRY * 0.55, fRX * 1.1, fRY * 0.65, 0, 0, Math.PI * 2);
            g.fill();
            // side sweep
            g.beginPath();
            g.moveTo(cx - fRX * 1.06, cy - fRY * 0.3);
            g.quadraticCurveTo(cx - fRX * 1.1, cy - fRY * 0.95, cx, cy - fRY * 1.12);
            g.quadraticCurveTo(cx + fRX * 1.1, cy - fRY * 0.95, cx + fRX * 1.06, cy - fRY * 0.3);
            g.lineTo(cx + fRX * 0.9, cy - fRY * 0.05);
            g.quadraticCurveTo(cx, cy - fRY * 0.5, cx - fRX * 0.9, cy - fRY * 0.05);
            g.closePath();
            g.fill();
        }
      };
      drawHair();

      // Hair strands / streaks for texture (fine dark lines)
      g.strokeStyle = "#02040A";
      g.lineWidth = 0.6;
      g.lineCap = "round";
      const strandCount = variant.hair === "buzz" ? 40 : 90;
      for (let i = 0; i < strandCount; i++) {
        const a = -Math.PI * 0.9 + (rand()) * Math.PI * 0.8; // arc across top
        const rr = fRX * (0.6 + rand() * 0.55);
        const x0 = cx + Math.cos(a) * rr * 0.9;
        const y0 = cy + Math.sin(a) * rr * 0.9 - fRY * 0.25;
        const len = fRY * (0.15 + rand() * 0.35);
        const dir = a; // radiate outward
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x0 + Math.cos(dir) * len, y0 + Math.sin(dir) * len - fRY * 0.05);
        g.stroke();
      }

      // ---------- Features ----------
      const eyeY = cy - fRY * 0.06;
      const eyeDX = fRX * 0.42;
      const eyeRX = fRX * 0.17;
      const eyeRY = fRY * 0.09;

      // Eye socket shadow
      const drawSocket = (ex: number) => {
        const rg = g.createRadialGradient(ex, eyeY, 1, ex, eyeY, eyeRX * 2.0);
        rg.addColorStop(0, "rgba(0,0,0,0.6)");
        rg.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = rg;
        g.beginPath();
        g.ellipse(ex, eyeY, eyeRX * 2.0, eyeRY * 2.2, 0, 0, Math.PI * 2);
        g.fill();
      };
      drawSocket(cx - eyeDX);
      drawSocket(cx + eyeDX);

      // Eye whites
      g.fillStyle = "#E4E9F0";
      g.beginPath();
      g.ellipse(cx - eyeDX, eyeY, eyeRX, eyeRY, 0, 0, Math.PI * 2);
      g.ellipse(cx + eyeDX, eyeY, eyeRX, eyeRY, 0, 0, Math.PI * 2);
      g.fill();

      // Iris + pupil
      g.fillStyle = "#0C0F14";
      g.beginPath();
      g.arc(cx - eyeDX, eyeY, eyeRY * 0.98, 0, Math.PI * 2);
      g.arc(cx + eyeDX, eyeY, eyeRY * 0.98, 0, Math.PI * 2);
      g.fill();
      // Catchlight
      g.fillStyle = "#F5F7FB";
      g.beginPath();
      g.arc(cx - eyeDX - eyeRY * 0.25, eyeY - eyeRY * 0.3, eyeRY * 0.28, 0, Math.PI * 2);
      g.arc(cx + eyeDX - eyeRY * 0.25, eyeY - eyeRY * 0.3, eyeRY * 0.28, 0, Math.PI * 2);
      g.fill();

      // Upper eyelid shadow (dark band above eye)
      const drawLidShadow = (ex: number) => {
        const lg = g.createLinearGradient(0, eyeY - eyeRY * 1.6, 0, eyeY);
        lg.addColorStop(0, "rgba(0,0,0,0)");
        lg.addColorStop(0.7, "rgba(0,0,0,0.55)");
        lg.addColorStop(1, "rgba(0,0,0,0.75)");
        g.fillStyle = lg;
        g.beginPath();
        g.ellipse(ex, eyeY - eyeRY * 0.6, eyeRX * 1.35, eyeRY * 1.1, 0, 0, Math.PI * 2);
        g.fill();
      };
      drawLidShadow(cx - eyeDX);
      drawLidShadow(cx + eyeDX);

      // Lash line
      g.strokeStyle = "#02040A";
      g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(cx - eyeDX - eyeRX, eyeY - eyeRY * 0.15);
      g.quadraticCurveTo(cx - eyeDX, eyeY - eyeRY * 0.85, cx - eyeDX + eyeRX, eyeY - eyeRY * 0.15);
      g.moveTo(cx + eyeDX - eyeRX, eyeY - eyeRY * 0.15);
      g.quadraticCurveTo(cx + eyeDX, eyeY - eyeRY * 0.85, cx + eyeDX + eyeRX, eyeY - eyeRY * 0.15);
      g.stroke();

      // Brows
      const browThick = variant.brow === "thick" ? fRY * 0.06 : variant.brow === "arched" ? fRY * 0.035 : fRY * 0.04;
      g.strokeStyle = "#04060B";
      g.lineWidth = browThick;
      g.lineCap = "round";
      const arch = variant.brow === "arched" ? fRY * 0.045 : fRY * 0.018;
      g.beginPath();
      g.moveTo(cx - eyeDX - eyeRX * 1.15, eyeY - eyeRY * 2.0);
      g.quadraticCurveTo(cx - eyeDX, eyeY - eyeRY * 2.0 - arch, cx - eyeDX + eyeRX * 1.15, eyeY - eyeRY * 1.85);
      g.moveTo(cx + eyeDX - eyeRX * 1.15, eyeY - eyeRY * 1.85);
      g.quadraticCurveTo(cx + eyeDX, eyeY - eyeRY * 2.0 - arch, cx + eyeDX + eyeRX * 1.15, eyeY - eyeRY * 2.0);
      g.stroke();

      // Nose bridge + tip shadow
      const noseCy = cy + fRY * 0.08;
      const noseGrad = g.createLinearGradient(cx - fRX * 0.1, 0, cx + fRX * 0.14, 0);
      noseGrad.addColorStop(0, "rgba(255,255,255,0.12)");
      noseGrad.addColorStop(0.5, "rgba(0,0,0,0)");
      noseGrad.addColorStop(1, "rgba(0,0,0,0.5)");
      g.fillStyle = noseGrad;
      g.beginPath();
      g.moveTo(cx - fRX * 0.09, eyeY);
      g.quadraticCurveTo(cx - fRX * 0.14, noseCy, cx - fRX * 0.07, noseCy + fRY * 0.17);
      g.quadraticCurveTo(cx, noseCy + fRY * 0.22, cx + fRX * 0.07, noseCy + fRY * 0.17);
      g.quadraticCurveTo(cx + fRX * 0.14, noseCy, cx + fRX * 0.09, eyeY);
      g.closePath();
      g.fill();

      // Nose tip shadow (round)
      const tipG = g.createRadialGradient(cx, noseCy + fRY * 0.19, 1, cx, noseCy + fRY * 0.19, fRX * 0.18);
      tipG.addColorStop(0, "rgba(0,0,0,0.4)");
      tipG.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = tipG;
      g.beginPath();
      g.arc(cx, noseCy + fRY * 0.19, fRX * 0.18, 0, Math.PI * 2);
      g.fill();

      // Nostrils
      g.fillStyle = "rgba(0,0,0,0.65)";
      g.beginPath();
      g.ellipse(cx - fRX * 0.075, noseCy + fRY * 0.2, fRX * 0.028, fRY * 0.012, 0.2, 0, Math.PI * 2);
      g.ellipse(cx + fRX * 0.075, noseCy + fRY * 0.2, fRX * 0.028, fRY * 0.012, -0.2, 0, Math.PI * 2);
      g.fill();

      // Philtrum shadow
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(cx, noseCy + fRY * 0.24);
      g.lineTo(cx, noseCy + fRY * 0.34);
      g.stroke();

      // ---------- Lips ----------
      const mouthY = cy + fRY * 0.5;
      const mouthW = fRX * (variant.lips === "full" ? 0.62 : 0.5);
      const lipsFull = variant.lips === "full";

      // Upper lip fill (darker)
      g.fillStyle = "rgba(30,20,25,0.55)";
      g.beginPath();
      g.moveTo(cx - mouthW, mouthY);
      g.quadraticCurveTo(cx - mouthW * 0.55, mouthY - fRY * 0.05, cx - mouthW * 0.15, mouthY - fRY * 0.02);
      g.quadraticCurveTo(cx, mouthY - fRY * 0.05, cx + mouthW * 0.15, mouthY - fRY * 0.02);
      g.quadraticCurveTo(cx + mouthW * 0.55, mouthY - fRY * 0.05, cx + mouthW, mouthY);
      g.quadraticCurveTo(cx, mouthY + fRY * 0.015, cx - mouthW, mouthY);
      g.closePath();
      g.fill();

      // Lower lip fill (softer)
      g.fillStyle = "rgba(45,30,35,0.45)";
      g.beginPath();
      g.moveTo(cx - mouthW * 0.95, mouthY + fRY * 0.005);
      g.quadraticCurveTo(cx, mouthY + fRY * (lipsFull ? 0.11 : 0.07), cx + mouthW * 0.95, mouthY + fRY * 0.005);
      g.quadraticCurveTo(cx, mouthY + fRY * (lipsFull ? 0.13 : 0.09), cx - mouthW * 0.95, mouthY + fRY * 0.005);
      g.closePath();
      g.fill();

      // Mouth line (crisp dark)
      g.strokeStyle = "rgba(0,0,0,0.85)";
      g.lineWidth = 1.8;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(cx - mouthW, mouthY);
      g.quadraticCurveTo(cx - mouthW * 0.5, mouthY + fRY * 0.018, cx, mouthY + fRY * 0.005);
      g.quadraticCurveTo(cx + mouthW * 0.5, mouthY + fRY * 0.018, cx + mouthW, mouthY);
      g.stroke();

      // Lower lip highlight
      const lipHi = g.createRadialGradient(cx, mouthY + fRY * 0.07, 1, cx, mouthY + fRY * 0.07, mouthW * 0.6);
      lipHi.addColorStop(0, "rgba(255,255,255,0.14)");
      lipHi.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = lipHi;
      g.beginPath();
      g.ellipse(cx, mouthY + fRY * 0.07, mouthW * 0.7, fRY * 0.045, 0, 0, Math.PI * 2);
      g.fill();

      // Chin dimple / shadow line
      g.strokeStyle = "rgba(0,0,0,0.3)";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(cx - fRX * 0.1, mouthY + fRY * 0.28);
      g.quadraticCurveTo(cx, mouthY + fRY * 0.34, cx + fRX * 0.1, mouthY + fRY * 0.28);
      g.stroke();

      // ---------- Beard ----------
      if (variant.beard && variant.beard !== "none") {
        g.fillStyle = variant.beard === "stubble" ? "rgba(8,10,14,0.55)" : "#050709";
        g.beginPath();
        if (variant.beard === "goatee") {
          g.ellipse(cx, mouthY + fRY * 0.28, fRX * 0.27, fRY * 0.19, 0, 0, Math.PI * 2);
        } else {
          g.moveTo(cx - fRX * 0.98, cy + fRY * 0.15);
          g.quadraticCurveTo(cx - fRX * 0.78, cy + fRY * 1.02, cx, cy + fRY * 1.05);
          g.quadraticCurveTo(cx + fRX * 0.78, cy + fRY * 1.02, cx + fRX * 0.98, cy + fRY * 0.15);
          g.quadraticCurveTo(cx + fRX * 0.7, cy + fRY * 0.6, cx, cy + fRY * 0.55);
          g.quadraticCurveTo(cx - fRX * 0.7, cy + fRY * 0.6, cx - fRX * 0.98, cy + fRY * 0.15);
        }
        g.closePath();
        g.fill();

        // Mustache
        if (variant.beard !== "goatee") {
          g.fillStyle = "#040508";
          g.beginPath();
          g.moveTo(cx - mouthW * 1.1, mouthY - fRY * 0.03);
          g.quadraticCurveTo(cx - mouthW * 0.5, mouthY - fRY * 0.11, cx, mouthY - fRY * 0.05);
          g.quadraticCurveTo(cx + mouthW * 0.5, mouthY - fRY * 0.11, cx + mouthW * 1.1, mouthY - fRY * 0.03);
          g.quadraticCurveTo(cx, mouthY - fRY * 0.02, cx - mouthW * 1.1, mouthY - fRY * 0.03);
          g.closePath();
          g.fill();
        }
      }

      // ---------- Glasses ----------
      if (variant.glasses) {
        g.strokeStyle = "#03050A";
        g.lineWidth = Math.max(1.8, fRX * 0.032);
        const rgx = fRX * 0.26;
        const rgy = fRY * 0.17;
        g.beginPath();
        g.ellipse(cx - eyeDX, eyeY, rgx, rgy, 0, 0, Math.PI * 2);
        g.ellipse(cx + eyeDX, eyeY, rgx, rgy, 0, 0, Math.PI * 2);
        g.stroke();
        g.beginPath();
        g.moveTo(cx - eyeDX + rgx, eyeY);
        g.lineTo(cx + eyeDX - rgx, eyeY);
        g.moveTo(cx - eyeDX - rgx, eyeY);
        g.lineTo(cx - fRX, eyeY - fRY * 0.02);
        g.moveTo(cx + eyeDX + rgx, eyeY);
        g.lineTo(cx + fRX, eyeY - fRY * 0.02);
        g.stroke();
      }

      // ---------- Convert to darkness map ----------
      const img = g.getImageData(0, 0, MASK_W, MASK_H).data;
      const m = new Float32Array(MASK_W * MASK_H);
      for (let i = 0, j = 0; i < img.length; i += 4, j++) {
        const a = img[i + 3] / 255;
        if (a < 0.02) { m[j] = 0; continue; }
        const lum = (0.2126 * img[i] + 0.7152 * img[i + 1] + 0.0722 * img[i + 2]) / 255;
        // Emphasize dark areas: raise darkness to slight power
        const dk = 1 - lum;
        m[j] = a * Math.pow(dk, 0.9);
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
      const area = W * H;
      // ~18k points on a ~220x275 card; scales with area & density prop
      const target = Math.floor(area / 12 * density);
      let tries = 0;
      const maxTries = target * 25;
      while (pts.length < target && tries < maxTries) {
        tries++;
        const nx = rand();
        const ny = rand();
        const w = sampleMask(nx, ny);
        if (w <= 0.015) continue;
        // Rejection sampling — probability skews toward denser dark regions
        if (rand() > Math.min(1, w * 1.35)) continue;
        const x = nx * W;
        const y = ny * H;
        pts.push({
          x, y, tx: x, ty: y,
          r: 0.35 + rand() * 0.7,
          w,
          hue: rand(),
          ph: rand() * Math.PI * 2,
        });
      }
    }

    // Pre-parse main colors so we can bucket points by color and reduce fill switches
    function frame(now: number) {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x, my = mouse.current.y, active = mouse.current.active;

      // Bucket points by fill for path batching
      // 5 buckets: nearBlack, dark, mid, light, accent
      const paths = [
        { fill: "#03040A", alpha: 0.95, path: new Path2D() },
        { fill: "#141922", alpha: 0.92, path: new Path2D() },
        { fill: "#3E4756", alpha: 0.85, path: new Path2D() },
        { fill: color,     alpha: 0.78, path: new Path2D() },
        { fill: accent,    alpha: 0.95, path: new Path2D() },
      ];

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // Cheap breathing wobble around anchor (no acceleration integration)
        const wob = Math.sin(now * 0.0011 + p.ph) * 0.9;
        const wob2 = Math.cos(now * 0.0009 + p.ph * 1.3) * 0.7;
        let x = p.tx + wob;
        let y = p.ty + wob2;

        // Cursor scatter (only for points close to cursor)
        if (active) {
          const rx = x - mx;
          const ry = y - my;
          const d2 = rx * rx + ry * ry;
          if (d2 < 70 * 70) {
            const f = (1 - d2 / (70 * 70)) * 12;
            const inv = 1 / Math.sqrt(d2 + 0.01);
            x += rx * inv * f;
            y += ry * inv * f;
          }
        }

        // Bucket selection
        let b: number;
        if (p.hue > 0.985) b = 4;
        else if (p.w > 0.7) b = 0;
        else if (p.w > 0.45) b = 1;
        else if (p.w > 0.22) b = 2;
        else b = 3;

        const pth = paths[b].path;
        pth.moveTo(x + p.r, y);
        pth.arc(x, y, p.r, 0, Math.PI * 2);
      }

      for (const p of paths) {
        ctx.fillStyle = p.fill;
        ctx.globalAlpha = p.alpha;
        ctx.fill(p.path);
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
    variant.brow, variant.lips, variant.jaw, variant.tilt,
  ]);

  return <canvas ref={ref} className={className} />;
}