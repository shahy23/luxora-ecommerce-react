import { Link } from "react-router-dom";
import { FiTrash2, FiHeart } from "react-icons/fi";
import QuantitySelector from "./QuantitySelector";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  function handleMoveToWishlist() {
    addToWishlist({ id: item.id, name: item.name, image: item.image, price: item.price, category: "", ratingValue: 4.5 });
    removeFromCart(item.key);
    showToast(`${item.name} moved to wishlist`, "info");
  }

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </Link>
      <div className="cart-item-details">
        <Link to={`/product/${item.id}`}>
          <h4>{item.name}</h4>
        </Link>
        <p className="cart-item-meta">
          {item.color && <span>Color: {item.color}</span>}
          {item.size && <span>Size: {item.size}</span>}
        </p>
        <p className="cart-item-price-mobile">{formatCurrency(item.price)}</p>
        <div className="cart-item-actions">
          <button onClick={handleMoveToWishlist}>
            <FiHeart size={14} /> Move to wishlist
          </button>
          <button onClick={() => removeFromCart(item.key)} className="danger">
            <FiTrash2 size={14} /> Remove
          </button>
        </div>
      </div>
      <div className="cart-item-price">{formatCurrency(item.price)}</div>
      <QuantitySelector
        value={item.quantity}
        onIncrease={() => increaseQuantity(item.key)}
        onDecrease={() => decreaseQuantity(item.key)}
      />
      <div className="cart-item-total">{formatCurrency(item.price * item.quantity)}</div>
    </div>
  );
}
