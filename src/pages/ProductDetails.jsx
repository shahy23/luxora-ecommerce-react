import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiCheck, FiTruck, FiShield } from "react-icons/fi";
import { getProductById, getRelatedProducts } from "../services/productService";
import { Spinner } from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import ProductGrid from "../components/ProductGrid";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { getItem, setItem } from "../utils/localStorage";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    getProductById(id)
      .then(async (data) => {
        if (!alive) return;
        setProduct(data);
        setSize(data.sizes[0]);
        setColor(data.colors[0]);
        setActiveImage(0);
        setQuantity(1);
        setReviews(getItem(`reviews:${id}`, []));
        const rel = await getRelatedProducts(data);
        if (alive) setRelated(rel);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => { alive = false; };
  }, [id]);

  if (status === "loading") return <div className="container section"><Spinner /></div>;
  if (status === "error" || !product) {
    return (
      <div className="container section">
        <ErrorMessage title="Product not found" message="This product may have been removed or the link is incorrect." onRetry={() => navigate("/shop")} />
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  function handleAddToCart() {
    addToCart(product, { size, color, quantity });
    showToast(`${product.name} added to cart`, "success");
  }

  function handleBuyNow() {
    addToCart(product, { size, color, quantity });
    navigate("/checkout");
  }

  function handleWishlist() {
    toggleWishlist(product);
    showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", wishlisted ? "info" : "success");
  }

  function submitReview(e) {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    const newReview = { ...reviewForm, date: Date.now() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    setItem(`reviews:${id}`, updated);
    setReviewForm({ name: "", rating: 5, comment: "" });
    setShowReviewForm(false);
    showToast("Thanks for your review!", "success");
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + Number(r.rating), 0) / reviews.length + product.ratingValue) / 2
    : product.ratingValue;

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop?category=${product.category}`}>{product.category}</Link> / {product.name}
      </div>

      <div className="pdp-layout">
        <div className="pdp-gallery">
          <div className="pdp-gallery-main">
            <img src={product.images[activeImage]} alt={product.name} />
          </div>
          <div className="pdp-gallery-thumbs">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={activeImage === i ? "active" : ""}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <span className="product-card-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="pdp-rating-row">
            <Rating value={avgRating} />
            <span>{reviews.length + product.reviewCount} reviews</span>
          </div>
          <div className="pdp-price-row">
            <span className="price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="price-old">{formatCurrency(product.originalPrice)}</span>
                <span className="badge badge-sale">-{product.discountPercent}%</span>
              </>
            )}
          </div>
          <p className="pdp-description">{product.description}</p>

          <div className="pdp-option-group">
            <span>Color: <strong>{color}</strong></span>
            <div className="pdp-swatches">
              {product.colors.map((c) => (
                <button key={c} className={color === c ? "active" : ""} onClick={() => setColor(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="pdp-option-group">
            <span>Size: <strong>{size}</strong></span>
            <div className="pdp-swatches">
              {product.sizes.map((s) => (
                <button key={s} className={size === s ? "active" : ""} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="pdp-buy-row">
            <QuantitySelector value={quantity} onIncrease={() => setQuantity((q) => q + 1)} onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} />
            <button className="btn btn-primary" onClick={handleAddToCart} disabled={!product.inStock}>
              <FiShoppingBag size={16} /> Add to Cart
            </button>
            <button className={`btn-icon ${wishlisted ? "active" : ""}`} onClick={handleWishlist} aria-label="Toggle wishlist" aria-pressed={wishlisted}>
              <FiHeart fill={wishlisted ? "currentColor" : "none"} size={16} />
            </button>
          </div>
          <button className="btn btn-outline btn-block" onClick={handleBuyNow} disabled={!product.inStock}>
            Buy Now
          </button>

          {!product.inStock && <p className="error-text" style={{ marginTop: 12 }}>Currently out of stock.</p>}

          <div className="pdp-trust">
            <span><FiTruck size={14} /> Free shipping over $150</span>
            <span><FiShield size={14} /> Secure checkout</span>
            <span><FiCheck size={14} /> 30-day returns</span>
          </div>
        </div>
      </div>

      <div className="pdp-tabs">
        <div className="pdp-tabs-nav">
          {["description", "features", "reviews"].map((t) => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
              {t === "reviews" ? `Reviews (${reviews.length + product.reviewCount})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "description" && <p className="pdp-tab-content">{product.description}</p>}

        {tab === "features" && (
          <div className="pdp-features">
            <div><span>Material</span><strong>{product.material}</strong></div>
            <div><span>Brand</span><strong>{product.brand}</strong></div>
            <div><span>Availability</span><strong>{product.inStock ? "In Stock" : "Out of Stock"}</strong></div>
            <div><span>SKU</span><strong>{product.sku}</strong></div>
            <div><span>Category</span><strong>{product.category}</strong></div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="pdp-reviews">
            <div className="pdp-reviews-summary">
              <div>
                <div className="pdp-avg-rating">{avgRating.toFixed(1)}</div>
                <Rating value={avgRating} />
                <p>{reviews.length + product.reviewCount} reviews</p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setShowReviewForm((s) => !s)}>
                Write a Review
              </button>
            </div>

            {showReviewForm && (
              <form className="review-form" onSubmit={submitReview}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="reviewer-name">Your Name</label>
                    <input id="reviewer-name" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="reviewer-rating">Rating</label>
                    <select id="reviewer-rating" value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}>
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="reviewer-comment">Review</label>
                  <textarea id="reviewer-comment" rows="3" value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
              </form>
            )}

            <div className="review-list">
              {reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-card-head">
                    <strong>{r.name}</strong>
                    <Rating value={Number(r.rating)} size={12} />
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && <p>No reviews yet from other customers on this device. Be the first to write one!</p>}
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="section-head" style={{ marginTop: 60 }}>
          <div><span className="eyebrow">You May Also Like</span><h2>Related Products</h2></div>
        </div>
      )}
      {related.length > 0 && <ProductGrid products={related} />}
    </div>
  );
}
