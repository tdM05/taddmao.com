import PageButtons from "../components/General/PageButtons.jsx";
import "./Home.css";
import GoToTop from "../GoToTop.jsx";
import { MdEmail } from "react-icons/md";

export default function HomePage() {
  return (
    <>
      <PageButtons />
      <Introduction></Introduction>
    </>
  );
}

function Introduction() {
  return (
    <>
      <p className="hello">Hello, I'm</p>
      <h1 className="taddmao">TADD MAO</h1>
      <div className="line"></div>
      <div className="tagText">Programmer, Musician, and Artist</div>
      <div className="contact">
        <h3>Contact</h3>

        <p>
          <MdEmail className="icon" />
          taddmao [at] gmail [dot] com
        </p>
      </div>

      <GoToTop />
    </>
  );
}
