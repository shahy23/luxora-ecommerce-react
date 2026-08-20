import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";
import { COUPONS } from "../data/demoData";

const CartContext = createContext(null);

const SHIPPING_FLAT = 12;
const FREE_SHIPPING_THRESHOLD = 150;
const TAX_RATE = 0.08;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => getItem("cart", []));
  const [couponCode, setCouponCode] = useState(() => getItem("coupon", null));

  useEffect(() => setItem("cart", items), [items]);
  useEffect(() => setItem("coupon", couponCode), [couponCode]);

  function addToCart(product, { size, color, quantity = 1 } = {}) {
    setItems((prev) => {
      const key = `${product.id}-${size || "default"}-${color || "default"}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: size || product.sizes?.[0],
          color: color || product.colors?.[0],
          quantity,
        },
      ];
    });
  }

  function removeFromCart(key) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function increaseQuantity(key) {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i)));
  }

  function decreaseQuantity(key) {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
    setCouponCode(null);
  }

  function applyCoupon(code) {
    const normalized = code.trim().toUpperCase();
    if (COUPONS[normalized]) {
      setCouponCode(normalized);
      return { success: true, discount: COUPONS[normalized] };
    }
    return { success: false, error: "Invalid or expired coupon code." };
  }

  function removeCoupon() {
    setCouponCode(null);
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discountRate = couponCode && COUPONS[couponCode] ? COUPONS[couponCode] : 0;
    const discount = subtotal * discountRate;
    const shipping = items.length === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + shipping + tax;
    return {
      subtotal,
      discount,
      shipping,
      tax,
      total: Math.max(total, 0),
      itemCount: items.reduce((n, i) => n + i.quantity, 0),
    };
  }, [items, couponCode]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        couponCode,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
