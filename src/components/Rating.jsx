import { FiStar } from "react-icons/fi";

export default function Rating({ value = 0, count, size = 14 }) {
  const rounded = Math.round(value);
  return (
    <div className="rating" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          fill={i < rounded ? "var(--color-gold)" : "none"}
          color={i < rounded ? "var(--color-gold)" : "var(--color-border-strong)"}
        />
      ))}
      {count !== undefined && <span className="rating-count">({count})</span>}
    </div>
  );
}
