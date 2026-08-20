import { useNavigate } from "react-router-dom";

export default function NoPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        color: "var(--textMain)",
        textAlign: "center",
        marginTop: "30vh",
      }}
    >
      <h1>Page Not Found</h1>
      <button className="pageButton" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}
