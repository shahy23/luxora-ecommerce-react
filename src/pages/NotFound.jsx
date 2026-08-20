import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container section">
      <div className="empty-state">
        <span className="eyebrow">404</span>
        <h3 style={{ fontSize: 32, marginTop: 8 }}>Page Not Found</h3>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}
