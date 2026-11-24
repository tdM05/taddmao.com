import GeometryField from "./GeometryField.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <header className="hero">
      <GeometryField />
      <nav className="hero-nav mono" aria-label="Profiles and links">
        <a className="hero-btn" href="https://scholar.google.ca/citations?user=l9csuDAAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar</a>
        <a className="hero-btn" href="https://dblp.org/pid/445/2118.html" target="_blank" rel="noreferrer">DBLP</a>
        <a className="hero-btn" href="https://github.com/tdM05" target="_blank" rel="noreferrer">GitHub</a>
        <a className="hero-btn" href="/cv.pdf" target="_blank" rel="noreferrer">CV ↓</a>
      </nav>
      <div className="hero-txt">
        <div className="eyebrow">Math &amp; CS · University of Toronto</div>
        <h1>Tadd&nbsp;Mao</h1>
        <div className="hero-sub">AI&nbsp;Verification&nbsp;Research</div>
      </div>
      <a className="hero-scroll" href="#overview" aria-label="Scroll to overview">
        ◦ scroll
      </a>
      <span className="hero-email mono">taddmao [at] gmail [dot] com</span>
    </header>
  );
}
