import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { getItem } from "../utils/localStorage";
import { getDemoOrders } from "../data/demoData";
import { formatCurrency } from "../utils/formatCurrency";

const STATUS_CLASS = {
  Processing: "status-processing",
  Shipped: "status-shipped",
  Delivered: "status-delivered",
  Cancelled: "status-cancelled",
};

export default function Orders() {
  const placedOrders = getItem("orders", []);
  const orders = [...placedOrders, ...getDemoOrders()];

  if (orders.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <FiPackage size={40} color="var(--color-text-muted)" />
          <h3>No orders yet</h3>
          <p>When you place an order, it will show up here.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 32 }}>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <Link to={`/orders/${order.id}`} key={order.id} className="card order-row">
            <div>
              <span className="order-row-id">{order.id}</span>
              <span className="order-row-date">
                {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>
            <div className="order-row-products">
              {order.items.length} item{order.items.length > 1 ? "s" : ""} — {order.items.map((i) => i.name).join(", ")}
            </div>
            <span className={`order-status ${STATUS_CLASS[order.status]}`}>{order.status}</span>
            <span className="order-row-total">{formatCurrency(order.total)}</span>
            <span className="order-row-link">View Details</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
