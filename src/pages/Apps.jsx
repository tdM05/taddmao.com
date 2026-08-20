import PageButtons from "../components/General/PageButtons.jsx";
import "./Apps.css";
import GoToTop from "../GoToTop.jsx";
import AppPanel from "../components/AppsPage/AppPanel.jsx";
import { apps } from "../content/apps.js";

export default function AppsPage() {
  return (
    <>
      <PageButtons />
      <div className="title">
        <h1 className="titleText">Apps</h1>
      </div>

      {apps.length === 0 ? (
        <p className="appsEmpty">More coming soon.</p>
      ) : (
        apps.map(({ id, name, text, moreLink, videoLink }) => (
          <AppPanel
            key={id}
            title={name}
            description={text}
            moreLink={moreLink}
            videoLink={videoLink}
          />
        ))
      )}
      <GoToTop />
    </>
  );
}
