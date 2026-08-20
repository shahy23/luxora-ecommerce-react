import { useParams, Link, Navigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { getItem } from "../utils/localStorage";
import { getDemoOrders } from "../data/demoData";
import { formatCurrency } from "../utils/formatCurrency";

const STEPS = ["Ordered", "Processing", "Shipped", "Delivered"];

export default function OrderDetails() {
  const { id } = useParams();
  const placedOrders = getItem("orders", []);
  const orders = [...placedOrders, ...getDemoOrders()];
  const order = orders.find((o) => o.id === id);

  if (!order) return <Navigate to="/orders" replace />;

  const currentStep = order.status === "Cancelled" ? -1 : STEPS.indexOf(order.status === "Processing" ? "Processing" : order.status);

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link to="/orders">My Orders</Link> / {order.id}
      </div>
      <h1 style={{ marginBottom: 8 }}>Order {order.id}</h1>
      <p style={{ marginBottom: 32 }}>
        Placed on {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      {order.status !== "Cancelled" ? (
        <div className="order-progress">
          {STEPS.map((step, i) => (
            <div key={step} className={`order-progress-step ${i <= currentStep ? "done" : ""}`}>
              <span className="order-progress-dot">{i <= currentStep ? <FiCheck size={12} /> : i + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="form-alert error" style={{ marginBottom: 32 }}>This order was cancelled.</div>
      )}

      <div className="order-details-layout">
        <div className="card order-details-items">
          <h3>Items</h3>
          {order.items.map((item, i) => (
            <div key={i} className="order-details-item">
              <span className="order-details-item-name">{item.name}</span>
              <span>Qty {item.qty}</span>
              <span>{formatCurrency(item.price)}</span>
            </div>
          ))}
        </div>

        <div className="card order-details-side">
          {order.shipping && (
            <>
              <h4>Shipping Address</h4>
              <p>
                {order.shipping.firstName} {order.shipping.lastName}<br />
                {order.shipping.address} {order.shipping.apartment}<br />
                {order.shipping.city}, {order.shipping.country} {order.shipping.postalCode}
              </p>
            </>
          )}
          <h4 style={{ marginTop: order.shipping ? 20 : 0 }}>Payment Method</h4>
          <p>{order.payment ? order.payment.toUpperCase() : "Card on file"}</p>

          <h4 style={{ marginTop: 20 }}>Summary</h4>
          <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(order.subtotal ?? order.total)}</span></div>
          {order.discount > 0 && <div className="summary-row discount"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
          <div className="summary-row"><span>Shipping</span><span>{formatCurrency(order.shippingCost ?? 0)}</span></div>
          <div className="summary-row"><span>Tax</span><span>{formatCurrency(order.tax ?? 0)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
        </div>
      </div>
    </div>
  );
}
