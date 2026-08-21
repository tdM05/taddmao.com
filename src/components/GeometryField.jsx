import { useEffect, useRef } from "react";

/**
 * Interactive Euclidean construction field (ported from mockup concept 21).
 * Drifting points + faint lattice; cursor acts as a compass drawing arcs and
 * construction lines to nearby points; occasionally blooms a triangle with ∎.
 * Palette pulled from CSS tokens so it stays in sync with the theme.
 */
export default function GeometryField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const x = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // colors (rgb parts) from CSS custom properties, with fallbacks
    const css = getComputedStyle(document.documentElement);
    const rgb = (name, fallback) => (css.getPropertyValue(name).trim() || fallback);
    const C_LINE = rgb("--geo-line", "150, 180, 200");
    const C_PT = rgb("--geo-point", "200, 224, 240");
    const C_ARC = rgb("--geo-arc", "120, 150, 170");
    const C_ACC = rgb("--accent-line", "150, 205, 225");

    let W, H, DPR, raf;
    const parent = cv.parentElement;
    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      cv.width = W * DPR;
      cv.height = H * DPR;
      x.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    size();
    window.addEventListener("resize", size);

    const N = Math.max(14, Math.min(30, Math.round(W / 60)));
    const pts = [];
    for (let i = 0; i < N; i++)
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      });

    const mouse = { x: -999, y: -999, on: false };
    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
    };
    const onLeave = () => { mouse.on = false; };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);

    const proofs = [];
    let lastTri = 0;
    const LINK = 150;
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    function step(now) {
      x.clearRect(0, 0, W, H);
      // ambient drift honours reduce-motion (frozen), but the loop keeps running
      // so cursor interaction / construction still respond to the user.
      if (!reduce) {
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          p.x = Math.max(0, Math.min(W, p.x));
          p.y = Math.max(0, Math.min(H, p.y));
        }
      }
      x.lineWidth = 1;
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) {
          const d = dist(pts[i], pts[j]);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.16;
            x.strokeStyle = `rgba(${C_LINE},${a})`;
            x.beginPath(); x.moveTo(pts[i].x, pts[i].y); x.lineTo(pts[j].x, pts[j].y); x.stroke();
          }
        }
      if (mouse.on) {
        const near = pts
          .map((p) => ({ p, d: dist(p, mouse) }))
          .filter((o) => o.d < 190)
          .sort((a, b) => a.d - b.d)
          .slice(0, 4);
        for (const o of near) {
          x.strokeStyle = `rgba(${C_ACC},${(1 - o.d / 190) * 0.55})`;
          x.lineWidth = 1.2;
          x.beginPath(); x.moveTo(mouse.x, mouse.y); x.lineTo(o.p.x, o.p.y); x.stroke();
          x.strokeStyle = `rgba(${C_ARC},0.22)`;
          x.lineWidth = 1;
          x.beginPath(); x.arc(mouse.x, mouse.y, o.d, 0, Math.PI * 2); x.stroke();
        }
        if (near.length >= 3 && now - lastTri > 1100) {
          lastTri = now;
          proofs.push({ a: near[0].p, b: near[1].p, c: near[2].p, t: now });
        }
      }
      for (let k = proofs.length - 1; k >= 0; k--) {
        const pr = proofs[k];
        const age = (now - pr.t) / 1400;
        if (age > 1) { proofs.splice(k, 1); continue; }
        const fade = Math.sin(age * Math.PI);
        x.beginPath();
        x.moveTo(pr.a.x, pr.a.y); x.lineTo(pr.b.x, pr.b.y); x.lineTo(pr.c.x, pr.c.y); x.closePath();
        x.fillStyle = `rgba(${C_ACC},${fade * 0.08})`; x.fill();
        x.strokeStyle = `rgba(${C_ACC},${fade * 0.55})`; x.lineWidth = 1.4; x.stroke();
        const cx = (pr.a.x + pr.b.x + pr.c.x) / 3;
        const cy = (pr.a.y + pr.b.y + pr.c.y) / 3;
        x.fillStyle = `rgba(${C_ACC},${fade})`;
        x.font = "13px monospace"; x.textAlign = "center";
        x.fillText("∎", cx, cy + 4);
      }
      for (const p of pts) {
        x.fillStyle = `rgba(${C_PT},0.7)`;
        x.beginPath(); x.arc(p.x, p.y, 1.6, 0, Math.PI * 2); x.fill();
      }
      if (mouse.on) {
        x.fillStyle = `rgba(${C_ACC},0.95)`;
        x.beginPath(); x.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2); x.fill();
      }
      raf = requestAnimationFrame(step);
    }

    // always run the loop — cursor interaction works regardless of reduce-motion;
    // only the ambient drift is frozen inside step() when `reduce` is set.
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="geo-canvas" />;
}
