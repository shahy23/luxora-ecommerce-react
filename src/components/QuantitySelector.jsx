import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector({ value, onIncrease, onDecrease, min = 1, max = 99 }) {
  return (
    <div className="qty-selector" role="group" aria-label="Quantity selector">
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <FiMinus size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}
