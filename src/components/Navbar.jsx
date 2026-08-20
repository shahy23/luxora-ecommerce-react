import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totals } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
      setMenuOpen(false);
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="navbar-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <FiMenu size={22} />
        </button>

        <Link to="/" className="navbar-logo">LUXORA</Link>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <button className="btn-icon" onClick={() => setSearchOpen((s) => !s)} aria-label="Search">
            <FiSearch size={18} />
          </button>
          <Link to="/wishlist" className="btn-icon navbar-icon-badge" aria-label="Wishlist">
            <FiHeart size={18} />
            {wishlistItems.length > 0 && <span className="badge-count">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="btn-icon navbar-icon-badge" aria-label="Cart">
            <FiShoppingBag size={18} />
            {totals.itemCount > 0 && <span className="badge-count">{totals.itemCount}</span>}
          </Link>
          <Link to={isAuthenticated ? "/profile" : "/login"} className="btn-icon" aria-label="Account">
            <FiUser size={18} />
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar-search-panel">
          <form className="container" onSubmit={handleSearchSubmit}>
            <FiSearch size={18} />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for clothing, shoes, bags…"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <FiX size={18} />
            </button>
          </form>
        </div>
      )}

      <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
        <div className="navbar-mobile-head">
          <span className="navbar-logo">LUXORA</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <FiX size={22} />
          </button>
        </div>
        <form className="navbar-mobile-search" onSubmit={handleSearchSubmit}>
          <FiSearch size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
          />
        </form>
        <nav>
          {LINKS.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to={isAuthenticated ? "/profile" : "/login"} onClick={() => setMenuOpen(false)}>
            {isAuthenticated ? "My Account" : "Login / Register"}
          </Link>
        </nav>
      </div>
      {menuOpen && <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
