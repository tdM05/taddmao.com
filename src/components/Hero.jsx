import GeometryField from "./GeometryField.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <header className="hero">
      <GeometryField />
      <a className="hero-cv mono" href="/cv.pdf" target="_blank" rel="noreferrer">CV ↓</a>
      <div className="hero-txt">
        <div className="eyebrow">Math &amp; CS · University of Toronto</div>
        <h1>Tadd&nbsp;Mao</h1>
        <div className="hero-sub">AI&nbsp;Verification&nbsp;Research</div>
      </div>
      <a className="hero-scroll" href="#overview" aria-label="Scroll to overview">
        ◦ scroll
      </a>
    </header>
  );
}
