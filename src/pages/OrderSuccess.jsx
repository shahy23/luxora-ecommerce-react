import { Link, Navigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { getItem } from "../utils/localStorage";
import { formatCurrency } from "../utils/formatCurrency";

export default function OrderSuccess() {
  const orderId = getItem("lastOrderId", null);
  const orders = getItem("orders", []);
  const order = orders.find((o) => o.id === orderId);

  if (!orderId || !order) {
    return <Navigate to="/" replace />;
  }

  const deliveryDate = new Date(order.date + 1000 * 60 * 60 * 24 * 6).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="container section">
      <div className="order-success">
        <FiCheckCircle size={56} color="var(--color-success)" />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you — your order <strong>{order.id}</strong> has been confirmed.</p>

        <div className="card order-success-summary">
          <div className="summary-row"><span>Order Number</span><span>{order.id}</span></div>
          <div className="summary-row"><span>Estimated Delivery</span><span>{deliveryDate}</span></div>
          <div className="summary-row total"><span>Total Paid</span><span>{formatCurrency(order.total)}</span></div>
        </div>

        <div className="order-success-actions">
          <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
          <Link to={`/orders/${order.id}`} className="btn btn-primary">View Order</Link>
        </div>
      </div>
    </div>
  );
}
