import { FiPackage } from "react-icons/fi";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, emptyTitle = "No products found", emptyMessage = "Try adjusting your filters or search terms." }) {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <FiPackage size={40} color="var(--color-text-muted)" />
        <h3 style={{ marginTop: 16 }}>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
