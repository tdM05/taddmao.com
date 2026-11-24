import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <span className="footer-name">Tadd Mao</span>
        <span className="footer-links mono">
          <span>taddmao [at] gmail [dot] com</span>
          <a href="https://github.com/tdM05" target="_blank" rel="noreferrer">github/tdM05</a>
          <a href="https://scholar.google.ca/citations?user=l9csuDAAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar</a>
          <a href="https://dblp.org/pid/445/2118.html" target="_blank" rel="noreferrer">DBLP</a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer">CV ↓</a>
        </span>
      </div>
    </footer>
  );
}
