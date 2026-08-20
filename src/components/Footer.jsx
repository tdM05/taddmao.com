import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <span className="footer-name">Tadd Mao</span>
        <span className="footer-links mono">
          <span>taddmao [at] gmail [dot] com</span>
          <a href="https://github.com/tdM05" target="_blank" rel="noreferrer">github/tdM05</a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer">CV ↓</a>
        </span>
      </div>
    </footer>
  );
}
