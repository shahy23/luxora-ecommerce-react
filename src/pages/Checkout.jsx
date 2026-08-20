import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FiCreditCard, FiTruck, FiDollarSign } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency } from "../utils/formatCurrency";
import { validateShipping, validateCard } from "../utils/validation";
import { getItem, setItem } from "../utils/localStorage";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: FiCreditCard },
  { id: "cod", label: "Cash on Delivery", icon: FiDollarSign },
  { id: "paypal", label: "PayPal", icon: FiTruck },
];

export default function Checkout() {
  const { items, totals, clearCart, couponCode } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    country: "United States",
    city: "",
    address: "",
    apartment: "",
    postalCode: "",
  });
  const [shippingErrors, setShippingErrors] = useState({});
  const [payment, setPayment] = useState("card");
  const [card, setCard] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [cardErrors, setCardErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleShippingChange(field, value) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    const sErrors = validateShipping(shipping);
    setShippingErrors(sErrors);

    let pErrors = {};
    if (payment === "card") {
      pErrors = validateCard(card);
      setCardErrors(pErrors);
    }

    if (Object.keys(sErrors).length > 0 || Object.keys(pErrors).length > 0) {
      showToast("Please fix the errors before continuing", "error");
      return;
    }

    setPlacing(true);
    setTimeout(() => {
      const orderId = `LX-${Math.floor(100000 + Math.random() * 899999)}`;
      const order = {
        id: orderId,
        date: Date.now(),
        status: "Processing",
        items: items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price, image: i.image })),
        shipping,
        payment,
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        shippingCost: totals.shipping,
        total: totals.total,
        coupon: couponCode,
      };
      const existingOrders = getItem("orders", []);
      setItem("orders", [order, ...existingOrders]);
      setItem("lastOrderId", orderId);
      clearCart();
      setPlacing(false);
      navigate("/order-success");
    }, 900);
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 32 }}>Checkout</h1>
      <form className="checkout-layout" onSubmit={handlePlaceOrder} noValidate>
        <div className="checkout-forms">
          <div className="card checkout-block">
            <h3>Shipping Information</h3>
            <div className="form-row">
              <div className={`form-field ${shippingErrors.firstName ? "has-error" : ""}`}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" value={shipping.firstName} onChange={(e) => handleShippingChange("firstName", e.target.value)} />
                {shippingErrors.firstName && <span className="error-text">{shippingErrors.firstName}</span>}
              </div>
              <div className={`form-field ${shippingErrors.lastName ? "has-error" : ""}`}>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" value={shipping.lastName} onChange={(e) => handleShippingChange("lastName", e.target.value)} />
                {shippingErrors.lastName && <span className="error-text">{shippingErrors.lastName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className={`form-field ${shippingErrors.email ? "has-error" : ""}`}>
                <label htmlFor="ship-email">Email</label>
                <input id="ship-email" type="email" value={shipping.email} onChange={(e) => handleShippingChange("email", e.target.value)} />
                {shippingErrors.email && <span className="error-text">{shippingErrors.email}</span>}
              </div>
              <div className={`form-field ${shippingErrors.phone ? "has-error" : ""}`}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" value={shipping.phone} onChange={(e) => handleShippingChange("phone", e.target.value)} />
                {shippingErrors.phone && <span className="error-text">{shippingErrors.phone}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className={`form-field ${shippingErrors.country ? "has-error" : ""}`}>
                <label htmlFor="country">Country</label>
                <input id="country" value={shipping.country} onChange={(e) => handleShippingChange("country", e.target.value)} />
                {shippingErrors.country && <span className="error-text">{shippingErrors.country}</span>}
              </div>
              <div className={`form-field ${shippingErrors.city ? "has-error" : ""}`}>
                <label htmlFor="city">City</label>
                <input id="city" value={shipping.city} onChange={(e) => handleShippingChange("city", e.target.value)} />
                {shippingErrors.city && <span className="error-text">{shippingErrors.city}</span>}
              </div>
            </div>
            <div className={`form-field ${shippingErrors.address ? "has-error" : ""}`}>
              <label htmlFor="address">Address</label>
              <input id="address" value={shipping.address} onChange={(e) => handleShippingChange("address", e.target.value)} />
              {shippingErrors.address && <span className="error-text">{shippingErrors.address}</span>}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="apartment">Apartment (optional)</label>
                <input id="apartment" value={shipping.apartment} onChange={(e) => handleShippingChange("apartment", e.target.value)} />
              </div>
              <div className={`form-field ${shippingErrors.postalCode ? "has-error" : ""}`}>
                <label htmlFor="postalCode">Postal Code</label>
                <input id="postalCode" value={shipping.postalCode} onChange={(e) => handleShippingChange("postalCode", e.target.value)} />
                {shippingErrors.postalCode && <span className="error-text">{shippingErrors.postalCode}</span>}
              </div>
            </div>
          </div>

          <div className="card checkout-block">
            <h3>Payment Method</h3>
            <div className="payment-methods">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className={`payment-method ${payment === m.id ? "active" : ""}`}>
                  <input type="radio" name="payment" checked={payment === m.id} onChange={() => setPayment(m.id)} />
                  <m.icon size={18} /> {m.label}
                </label>
              ))}
            </div>

            {payment === "card" && (
              <div className="card-form">
                <div className={`form-field ${cardErrors.cardName ? "has-error" : ""}`}>
                  <label htmlFor="cardName">Name on Card</label>
                  <input id="cardName" value={card.cardName} onChange={(e) => setCard({ ...card, cardName: e.target.value })} />
                  {cardErrors.cardName && <span className="error-text">{cardErrors.cardName}</span>}
                </div>
                <div className={`form-field ${cardErrors.cardNumber ? "has-error" : ""}`}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input id="cardNumber" placeholder="1234 5678 9012 3456" value={card.cardNumber} onChange={(e) => setCard({ ...card, cardNumber: e.target.value })} />
                  {cardErrors.cardNumber && <span className="error-text">{cardErrors.cardNumber}</span>}
                </div>
                <div className="form-row">
                  <div className={`form-field ${cardErrors.expiry ? "has-error" : ""}`}>
                    <label htmlFor="expiry">Expiry (MM/YY)</label>
                    <input id="expiry" placeholder="08/29" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                    {cardErrors.expiry && <span className="error-text">{cardErrors.expiry}</span>}
                  </div>
                  <div className={`form-field ${cardErrors.cvv ? "has-error" : ""}`}>
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" placeholder="123" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                    {cardErrors.cvv && <span className="error-text">{cardErrors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}
            {payment === "cod" && <p style={{ marginTop: 14 }}>Pay with cash upon delivery. Please have the exact amount ready.</p>}
            {payment === "paypal" && <p style={{ marginTop: 14 }}>You'll be redirected to PayPal to complete this demo payment.</p>}
          </div>
        </div>

        <div className="cart-summary card checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {items.map((i) => (
              <div key={i.key} className="checkout-item">
                <div className="checkout-item-image">
                  <img src={i.image} alt={i.name} />
                  <span>{i.quantity}</span>
                </div>
                <span className="checkout-item-name">{i.name}</span>
                <span>{formatCurrency(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
          {totals.discount > 0 && <div className="summary-row discount"><span>Discount</span><span>-{formatCurrency(totals.discount)}</span></div>}
          <div className="summary-row"><span>Shipping</span><span>{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</span></div>
          <div className="summary-row"><span>Tax</span><span>{formatCurrency(totals.tax)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
          <button type="submit" className="btn btn-primary btn-block" disabled={placing}>
            {placing ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
