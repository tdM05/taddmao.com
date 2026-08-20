import { useEffect, useRef, useState } from "react";
import { timeline } from "../content/timeline.js";
import "./Timeline.css";

function Media({ media }) {
  if (!media) return null;
  if (media.type === "image")
    return (
      <div className="tl-media">
        <img src={media.src} alt={media.alt || ""} loading="lazy" />
      </div>
    );
  if (media.type === "video")
    return (
      <div className="tl-media tl-video">
        <iframe
          src={`https://www.youtube.com/embed/${media.youtube}`}
          title="video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  return null;
}

function Node({ node, side }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`tl-node ${side} ${inView ? "in" : ""}`}>
      <span className="tl-dot" aria-hidden="true" />
      <div className="tl-year mono">{node.year}</div>
      <h3>{node.title}</h3>
      <p>{node.desc}</p>
      <Media media={node.media} />
      {node.tags && node.tags.length > 0 && (
        <div className="tl-tags">
          {node.tags.map((t) => (
            <span className="tl-tag mono" key={t}>{t}</span>
          ))}
        </div>
      )}
      {node.link && (
        <a className="tl-link mono" href={node.link.href} target="_blank" rel="noreferrer">
          {node.link.text} ↗
        </a>
      )}
    </div>
  );
}

export default function Timeline() {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;
    function onScroll() {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / total));
      fill.style.height = p * 100 + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="timeline-section" id="path">
      <div className="tl-head">
        <div className="eyebrow">◦ the path so far</div>
        <h2>A short construction.</h2>
      </div>
      <div className="tl" ref={wrapRef}>
        <div className="tl-spine">
          <div className="tl-fill" ref={fillRef} />
        </div>
        {timeline.map((node, i) => (
          <Node key={i} node={node} side={i % 2 === 0 ? "right" : "left"} />
        ))}
        <div className="tl-end" aria-hidden="true">∎</div>
      </div>
    </section>
  );
}
