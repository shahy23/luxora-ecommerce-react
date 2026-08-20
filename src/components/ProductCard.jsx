import { memo } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiEye } from "react-icons/fi";
import Rating from "./Rating";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isInWishlist(product.id);

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product, { quantity: 1 });
    showToast(`${product.name} added to cart`, "success");
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product);
    showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", wishlisted ? "info" : "success");
  }

  return (
    <div className="product-card fade-in">
      <div className="product-card-media">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <div className="product-card-badges">
          {product.discountPercent > 0 && <span className="badge badge-sale">-{product.discountPercent}%</span>}
          {product.isNew && <span className="badge badge-new">New</span>}
        </div>
        <button
          className={`btn-icon product-card-wishlist ${wishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <FiHeart fill={wishlisted ? "currentColor" : "none"} size={16} />
        </button>
        <div className="product-card-actions">
          <button className="btn btn-light btn-sm" onClick={handleAddToCart}>
            <FiShoppingBag size={14} /> Add to Cart
          </button>
          {onQuickView && (
            <button
              className="btn-icon"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              aria-label="Quick view"
            >
              <FiEye size={16} />
            </button>
          )}
        </div>
      </div>
      <Link to={`/product/${product.id}`} className="product-card-info">
        <span className="product-card-category">{product.category}</span>
        <h3>{product.name}</h3>
        <Rating value={product.ratingValue} size={12} />
        <div className="product-card-price">
          <span className="price">{formatCurrency(product.price)}</span>
          {product.originalPrice && <span className="price-old">{formatCurrency(product.originalPrice)}</span>}
        </div>
      </Link>
    </div>
  );
}

export default memo(ProductCard);
