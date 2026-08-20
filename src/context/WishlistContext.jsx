import { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => getItem("wishlist", []));

  useEffect(() => setItem("wishlist", items), [items]);

  function addToWishlist(product) {
    setItems((prev) => (prev.some((p) => p.id === product.id) ? prev : [...prev, product]));
  }

  function removeFromWishlist(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function toggleWishlist(product) {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  }

  function isInWishlist(id) {
    return items.some((p) => p.id === id);
  }

  function clearWishlist() {
    setItems([]);
  }

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
