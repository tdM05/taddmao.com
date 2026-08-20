import "./AppPanel.css";
import PropTypes from "prop-types";

export default function AppPanel({title, description, moreLink, videoLink}) {
    return (
        <div className={videoLink ? "appFrame" : "appFrame appFrameNoVideo"}>
            <div className="leftBox">
                <h2>{title}</h2>
                <p className="leftP">
                    {description}
                </p>
                {moreLink && (
                    <a href={moreLink} target="_blank" rel="noreferrer">
                        Learn more
                    </a>
                )}
            </div>

            {videoLink && (
                <iframe
                    className="iFrame"
                    width="786"
                    height="555"
                    src={videoLink}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    )
}

AppPanel.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    moreLink: PropTypes.string,
    videoLink: PropTypes.string,
};
