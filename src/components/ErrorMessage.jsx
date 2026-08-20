import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorMessage({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="empty-state">
      <FiAlertTriangle size={36} color="var(--color-error)" />
      <h3 style={{ marginTop: 16 }}>{title}</h3>
      <p>{message || "We couldn't load this content. Please try again."}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
