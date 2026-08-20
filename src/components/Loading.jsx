export function Spinner({ label = "Loading" }) {
  return (
    <div className="spinner-wrap" role="status" aria-label={label}>
      <div className="spinner" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <div className="skeleton" style={{ aspectRatio: "3/4", borderRadius: "10px" }} />
      <div className="skeleton" style={{ height: 14, width: "60%", marginTop: 14, borderRadius: 4 }} />
      <div className="skeleton" style={{ height: 12, width: "40%", marginTop: 8, borderRadius: 4 }} />
      <div className="skeleton" style={{ height: 16, width: "30%", marginTop: 10, borderRadius: 4 }} />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
