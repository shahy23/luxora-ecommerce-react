import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  function handleMoveToCart(product) {
    addToCart(product, { quantity: 1 });
    removeFromWishlist(product.id);
    showToast(`${product.name} moved to cart`, "success");
  }

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <FiHeart size={40} color="var(--color-text-muted)" />
          <h3>Your wishlist is empty</h3>
          <p>Save items you love here so you can find them easily later.</p>
          <Link to="/shop" className="btn btn-primary">Discover Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 32 }}>My Wishlist ({items.length})</h1>
      <div className="wishlist-grid">
        {items.map((product) => (
          <div key={product.id} className="wishlist-card card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="wishlist-card-body">
              <Link to={`/product/${product.id}`}><h4>{product.name}</h4></Link>
              <span className="price">{formatCurrency(product.price)}</span>
              <div className="wishlist-card-actions">
                <button className="btn btn-primary btn-sm" onClick={() => handleMoveToCart(product)}>
                  <FiShoppingBag size={13} /> Add to Cart
                </button>
                <button className="btn-icon" onClick={() => removeFromWishlist(product.id)} aria-label="Remove from wishlist">
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
