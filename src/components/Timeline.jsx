import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { timeline, threads } from "../content/timeline.js";
import "./Timeline.css";

const Model3D = lazy(() => import("./Model3D.jsx"));

/* Fullscreen viewer overlay — opened from a gallery chip. Dismiss on
   backdrop click, Escape, or scroll. Does NOT affect timeline layout. */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const onScroll = () => onClose();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("scroll", onScroll); };
  }, [onClose]);
  return (
    <div className="tl-lightbox" onClick={onClose}>
      <button className="tl-lightbox-close mono" onClick={onClose} aria-label="Close">esc ✕</button>
      <div className="tl-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        {item.type === "image" ? (
          <img src={item.src} alt={item.caption || ""} />
        ) : (
          <div className="tl-lightbox-model">
            <Suspense fallback={<span className="tl-thumb-loading mono">loading 3D…</span>}>
              <Model3D name={item.model} />
            </Suspense>
          </div>
        )}
        {item.caption && <div className="tl-lightbox-cap mono">{item.caption}</div>}
      </div>
    </div>
  );
}

function Gallery({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="tl-gallery">
      <div className="tl-chips">
        {items.map((g, i) => (
          <button key={i} className="tl-chip mono" onClick={() => setOpen(i)}>
            <span className="tl-chip-ic" aria-hidden="true">{g.type === "model" ? "◈" : "▣"}</span>
            {g.caption || (g.type === "model" ? "3D model" : "image")}
          </button>
        ))}
      </div>
      {open != null && <Lightbox item={items[open]} onClose={() => setOpen(null)} />}
    </div>
  );
}

/* One year: a node on the central spine, with its entries branching to `side`.
   Draws wires from the year node to each entry's dot (measured, robust). */
function Year({ year, entries, side, index, headYRef, registry, myId }) {
  const rowRef = useRef(null);
  const nodeRef = useRef(null);
  const entryRefs = useRef([]);
  if (entryRefs.current.length !== entries.length) {
    entryRefs.current = entries.map((_, i) => entryRefs.current[i] || { current: null });
  }
  const [inView, setInView] = useState(false);
  const [segs, setSegs] = useState([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const svgRef = useRef(null);

  // Precompute each edge's contact point (ABSOLUTE wrap-Y where it meets the
  // vertical spine) + its colour, ONCE per layout. Published to the shared
  // registry so the parent can (a) fire flashes and (b) lerp the bar colour.
  useEffect(() => {
    function precompute() {
      const svg = svgRef.current, row = rowRef.current;
      if (!svg || !row) return;
      const wrapEl = row.parentElement;
      const rowRect = row.getBoundingClientRect();
      const spine = wrapEl.querySelector(".tl-spine");
      if (!spine) return;
      const spineRect = spine.getBoundingClientRect();
      const spineX = spineRect.left + spineRect.width / 2 - rowRect.left;
      const list = [];
      svg.querySelectorAll(".tl-edge").forEach((edge, i) => {
        const flash = edge.parentNode.querySelector(".tl-flash");
        const len = edge.getTotalLength();
        let contactY = null, bestErr = Infinity;
        for (let s = 0; s <= len; s += Math.max(1, len / 60)) {
          const p = edge.getPointAtLength(s);
          const err = Math.abs(p.x - spineX);
          if (err < bestErr) { bestErr = err; contactY = p.y; }
        }
        edge.dataset.crossed = "0";
        list.push({
          rowEl: row,               // absolute Y is computed live each frame
          localY: contactY ?? 0,    // contact Y within the row
          color: threads[entries[i]?.thread]?.color || "150,205,225",
          flash,
        });
      });
      registry.set(myId, list);
    }
    precompute();
    window.addEventListener("resize", precompute);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(precompute);
    const t = setTimeout(precompute, 350);
    return () => { window.removeEventListener("resize", precompute); clearTimeout(t); registry.delete(myId); };
  }, [segs, registry, myId, entries]);

  useLayoutEffect(() => {
    function measure() {
      const row = rowRef.current, node = nodeRef.current;
      if (!row || !node) return;
      const rb = row.getBoundingClientRect();
      const nb = node.getBoundingClientRect();
      const nx = nb.left - rb.left + nb.width / 2;
      const ny = nb.top - rb.top + nb.height / 2;
      const GAP = 10;
      const lines = [];
      entryRefs.current.forEach((ref) => {
        const el = ref.current;
        if (!el) return;
        const eb = el.getBoundingClientRect();
        const ex = side === "right"
          ? eb.left - rb.left - GAP
          : eb.right - rb.left + GAP;
        const ey = eb.top - rb.top + eb.height / 2;
        lines.push({ x1: nx, y1: ny, x2: ex, y2: ey });
      });
      setDims({ w: rb.width, h: rb.height });
      setSegs(lines);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    entryRefs.current.forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const t = setTimeout(measure, 300);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); clearTimeout(t); };
  }, [side, entries.length]);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const entriesEl = (
    <div className="tl-entries">
      {entries.map((e, i) => {
        const c = threads[e.thread]?.color || "150,205,225";
        return (
          <div
            className="tl-entry"
            key={i}
            ref={entryRefs.current[i]}
            style={{ transitionDelay: `${i * 90}ms`, "--tc": c }}
          >
            {e.when && <span className="tl-when mono">{e.when}</span>}
            <span className="tl-text">{e.text}</span>
            {e.gallery && <Gallery items={e.gallery} />}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`tl-year-row ${side} ${inView ? "in" : ""}`} ref={rowRef}>
      <svg className="tl-wires" ref={svgRef} width={dims.w} height={dims.h} aria-hidden="true">
        {segs.map((s, i) => {
          const midX = (s.x1 + s.x2) / 2;
          const c = threads[entries[i]?.thread]?.color || "150,205,225";
          const d = `M ${s.x1} ${s.y1} C ${midX} ${s.y1}, ${midX} ${s.y2}, ${s.x2} ${s.y2}`;
          return (
            <g key={i}>
              <path className="tl-edge" d={d} fill="none" stroke={`rgba(${c},0.45)`} strokeWidth="1.2" />
              {/* flash overlay — pulses along the edge on contact (CSS, scroll-independent) */}
              <path className="tl-flash" d={d} fill="none" stroke={`rgb(${c})`} strokeWidth="1.8"
                    pathLength="1" strokeDasharray="0.3 1" strokeDashoffset="1"
                    style={{ color: `rgb(${c})`, "--flash-rgb": c }} />
              <circle cx={s.x2} cy={s.y2} r="4" fill={`rgb(${c})`} />
            </g>
          );
        })}
      </svg>

      {side === "left" ? (
        <>
          {entriesEl}
          <div className="tl-year mono" ref={nodeRef}>{year}</div>
        </>
      ) : (
        <>
          <div className="tl-year mono" ref={nodeRef}>{year}</div>
          {entriesEl}
        </>
      )}
    </div>
  );
}

const parseRGB = (s) => s.split(",").map((n) => parseFloat(n));
const lerp = (a, b, t) => a + (b - a) * t;
const mixRGB = (c1, c2, t) => [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t))];

export default function Timeline() {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);
  const headYRef = useRef(null);
  // registry: Map<yearId, [{ absY, color, flash }]> published by each Year
  const registryRef = useRef(new Map());

  useEffect(() => {
    const wrap = wrapRef.current, fill = fillRef.current;
    if (!wrap || !fill) return;
    const START = [150, 205, 225]; // bar colour before the first contact

    function allContacts(wrapTop) {
      const out = [];
      for (const list of registryRef.current.values()) {
        for (const c of list) {
          // absolute Y within the wrap, computed live (survives layout shifts)
          const rowTop = c.rowEl.getBoundingClientRect().top - wrapTop;
          out.push({ ...c, absY: rowTop + c.localY });
        }
      }
      out.sort((a, b) => a.absY - b.absY);
      return out;
    }

    function frame() {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / total));
      const headY = p * r.height;
      fill.style.height = headY + "px";
      headYRef.current = headY;

      const contacts = allContacts(r.top);
      // fire flashes on crossings — forward when scrolling down, reversed when up
      for (const c of contacts) {
        if (!c.flash) continue;
        const crossed = headY >= c.absY;
        const was = c.flash.dataset.crossed === "1";
        if (crossed && !was) {                        // downward crossing
          c.flash.dataset.crossed = "1";
          c.flash.classList.remove("go", "go-rev"); void c.flash.getBBox(); c.flash.classList.add("go");
        } else if (!crossed && was) {                 // upward crossing
          c.flash.dataset.crossed = "0";
          c.flash.classList.remove("go", "go-rev"); void c.flash.getBBox(); c.flash.classList.add("go-rev");
        }
      }
      // playhead colour: lerp from the last passed contact -> the next one,
      // reaching the next colour exactly when the head sits on that contact.
      const prev = [...contacts].reverse().find((c) => c.absY <= headY) || null;
      const next = contacts.find((c) => c.absY > headY) || null;
      let head = START;
      const from = prev ? parseRGB(prev.color) : START;
      if (next) {
        const to = parseRGB(next.color);
        const span = (next.absY - (prev ? prev.absY : 0)) || 1;
        const t = Math.min(1, Math.max(0, (headY - (prev ? prev.absY : 0)) / span));
        head = mixRGB(from, to, t);
      } else if (prev) {
        head = from;
      }
      fill.style.setProperty("--bar", head.join(","));  // playhead tip colour

      // progress-bar body: a multi-band gradient — each contact contributes a
      // colour stop at its height, so the bar blends continuously between the
      // edge colours it has passed through. Ends at the current playhead colour.
      if (headY > 1) {
        const stops = [`rgba(${START.join(",")},0.9) 0%`];
        for (const c of contacts) {
          if (c.absY > headY) break;
          const pct = Math.min(100, (c.absY / headY) * 100);
          stops.push(`rgb(${c.color}) ${pct.toFixed(1)}%`);
        }
        stops.push(`rgb(${head.join(",")}) 100%`);
        fill.style.background = `linear-gradient(to bottom, ${stops.join(", ")})`;
      }
    }

    let ticking = false;
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; frame(); }); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(frame);
    const t = setTimeout(frame, 400);
    frame();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <section className="timeline-section" id="path">
      <div className="tl-head">
        <div className="eyebrow">◦ the path so far</div>
        <h2>The whole story.</h2>
        <div className="tl-legend mono">
          {Object.entries(threads).map(([k, t]) => (
            <span key={k}><i style={{ background: `rgb(${t.color})` }} />{t.label}</span>
          ))}
        </div>
      </div>

      <div className="tl" ref={wrapRef}>
        <div className="tl-spine"><div className="tl-fill" ref={fillRef} /></div>
        {timeline.map((y, i) => (
          <Year key={y.year} year={y.year} entries={y.entries} side={i % 2 === 0 ? "right" : "left"} index={i} headYRef={headYRef} registry={registryRef.current} myId={y.year} />
        ))}
      </div>
    </section>
  );
}
