import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../utils/formatCurrency";

export default function Cart() {
  const { items, totals, applyCoupon, removeCoupon, couponCode } = useCart();
  const { showToast } = useToast();
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState("");

  function handleApplyCoupon(e) {
    e.preventDefault();
    const result = applyCoupon(code);
    if (result.success) {
      setCouponError("");
      setCode("");
      showToast(`Coupon applied — ${Math.round(result.discount * 100)}% off`, "success");
    } else {
      setCouponError(result.error);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <FiShoppingBag size={40} color="var(--color-text-muted)" />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet. Explore our latest arrivals and find something you love.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 32 }}>Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-items-head">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          {items.map((item) => (
            <CartItem key={item.key} item={item} />
          ))}
          <Link to="/shop" className="btn btn-outline btn-sm" style={{ marginTop: 20 }}>
            ← Continue Shopping
          </Link>
        </div>

        <div className="cart-summary card">
          <h3>Order Summary</h3>
          <form className="coupon-form" onSubmit={handleApplyCoupon}>
            <div className="coupon-input">
              <FiTag size={15} />
              <input
                type="text"
                placeholder="Promo code (try LUXORA10)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="btn btn-outline btn-sm">Apply</button>
            </div>
            {couponError && <span className="error-text">{couponError}</span>}
            {couponCode && (
              <div className="coupon-applied">
                <span>Coupon <strong>{couponCode}</strong> applied</span>
                <button type="button" onClick={removeCoupon}>Remove</button>
              </div>
            )}
          </form>

          <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
          {totals.discount > 0 && <div className="summary-row discount"><span>Discount</span><span>-{formatCurrency(totals.discount)}</span></div>}
          <div className="summary-row"><span>Shipping</span><span>{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</span></div>
          <div className="summary-row"><span>Tax</span><span>{formatCurrency(totals.tax)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>

          <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
}
