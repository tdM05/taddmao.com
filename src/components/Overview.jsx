import { lazy, Suspense, useLayoutEffect, useRef, useState } from "react";
import { fields } from "../content/overview.js";
import "./Overview.css";

// 3D viewer is heavy (three.js) — load it only when a model item needs it.
const Model3D = lazy(() => import("./Model3D.jsx"));

function Media({ media, title }) {
  if (!media) return null;
  if (media.type === "image")
    return (
      <div className="ov-media ov-media-img">
        <img src={media.src} alt={media.alt || title} loading="lazy" />
      </div>
    );
  if (media.type === "video")
    return (
      <div className="ov-media ov-media-video">
        <iframe
          src={`https://www.youtube.com/embed/${media.youtube}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  if (media.type === "model")
    return (
      <div className="ov-media ov-media-model">
        <Suspense fallback={<div className="ov-model-loading mono">loading 3D…</div>}>
          <Model3D name={media.model} />
        </Suspense>
      </div>
    );
  return null;
}

function Item({ item, itemRef, anchorRef }) {
  return (
    <div className={`ov-item ov-size-${item.size || "md"}`} ref={itemRef}>
      {item.media && (
        <div className="ov-media-wrap" ref={anchorRef}>
          <Media media={item.media} title={item.title} />
        </div>
      )}
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      {item.href ? (
        <a href={item.href} target="_blank" rel="noreferrer">{item.linkText} ↗</a>
      ) : (
        item.linkText && <span className="ov-soft mono">{item.linkText}</span>
      )}
    </div>
  );
}

/**
 * One field row. Generic: renders N items (each with a ref + a dot on its
 * inner edge) and a label (with a dot). Measures the real DOM boxes and draws
 * a wire from the label dot to every item dot. Works for any item count.
 */
function Field({ label, side, items }) {
  const rowRef = useRef(null);
  const labelRef = useRef(null);
  // stable ref arrays sized to items: itemRefs = the box, anchorRefs = media (if any)
  const itemRefs = useRef([]);
  const anchorRefs = useRef([]);
  if (itemRefs.current.length !== items.length) {
    itemRefs.current = items.map((_, i) => itemRefs.current[i] || { current: null });
    anchorRefs.current = items.map((_, i) => anchorRefs.current[i] || { current: null });
  }
  const [segs, setSegs] = useState([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    function measure() {
      const row = rowRef.current, label = labelRef.current;
      if (!row || !label) return;
      const rb = row.getBoundingClientRect();
      const lb = label.getBoundingClientRect();
      const lx = side === "right" ? lb.left - rb.left : lb.right - rb.left;
      const ly = lb.top - rb.top + lb.height / 2;
      const lines = [];
      const GAP = 12; // breathing room so the dot floats off the media edge
      items.forEach((_, i) => {
        // anchor = the media element if this item has one, else the whole item box
        const el = anchorRefs.current[i].current || itemRefs.current[i].current;
        if (!el) return;
        const ib = el.getBoundingClientRect();
        const ix = side === "right"
          ? ib.right - rb.left + GAP
          : ib.left - rb.left - GAP;
        const iy = ib.top - rb.top + ib.height / 2;   // center of the anchor
        lines.push({ x1: lx, y1: ly, x2: ix, y2: iy });
      });
      setDims({ w: rb.width, h: rb.height });
      setSegs(lines);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    itemRefs.current.forEach((r) => r.current && ro.observe(r.current));
    anchorRefs.current.forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const t = setTimeout(measure, 300);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); clearTimeout(t); };
  }, [side, items.length]);

  const content = (
    <div className={`ov-content ${items.length > 1 ? "ov-multi" : ""}`}>
      {items.map((it, i) => (
        <Item item={it} key={i} itemRef={itemRefs.current[i]} anchorRef={anchorRefs.current[i]} />
      ))}
    </div>
  );
  const labelEl = (
    <div className="ov-label mono" ref={labelRef}>
      <span>{label}</span>
    </div>
  );

  return (
    <div className={`ov-row ${side === "left" ? "reverse" : ""}`} ref={rowRef}>
      <svg className="ov-wires" width={dims.w} height={dims.h} aria-hidden="true">
        {segs.map((s, i) => {
          const midX = (s.x1 + s.x2) / 2;
          return (
            <g key={i}>
              <path
                d={`M ${s.x1} ${s.y1} C ${midX} ${s.y1}, ${midX} ${s.y2}, ${s.x2} ${s.y2}`}
                className="ov-wire"
                fill="none"
              />
              <circle cx={s.x2} cy={s.y2} r="4.5" className="ov-node" />
            </g>
          );
        })}
        {/* label dot (all wires share this endpoint) */}
        {segs.length > 0 && <circle cx={segs[0].x1} cy={segs[0].y1} r="4.5" className="ov-node" />}
      </svg>
      {side === "left" ? (<>{labelEl}{content}</>) : (<>{content}{labelEl}</>)}
    </div>
  );
}

export default function Overview() {
  return (
    <section className="overview" id="overview">
      <div className="ov-inner">
        <div className="ov-head">
          <h2>Overview</h2>
        </div>
        {fields.map((f) => (
          <Field key={f.label} label={f.label} side={f.side} items={f.items} />
        ))}
      </div>
    </section>
  );
}
