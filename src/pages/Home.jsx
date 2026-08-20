import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck, FiShield, FiRotateCcw, FiHeadphones, FiArrowRight } from "react-icons/fi";
import { getProducts } from "../services/productService";
import ProductGrid from "../components/ProductGrid";
import { ProductGridSkeleton } from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { CATEGORIES } from "../data/demoData";

const WHY_US = [
  { icon: FiTruck, title: "Free Shipping", text: "On all orders over $150, delivered worldwide." },
  { icon: FiShield, title: "Secure Payment", text: "Your transactions are encrypted end to end." },
  { icon: FiRotateCcw, title: "Easy Returns", text: "30-day hassle-free returns on every order." },
  { icon: FiHeadphones, title: "24/7 Support", text: "Our style advisors are always here to help." },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    getProducts()
      .then((data) => {
        if (alive) {
          setProducts(data);
          setStatus("ready");
        }
      })
      .catch(() => alive && setStatus("error"));
    return () => { alive = false; };
  }, []);

  const featured = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy fade-in">
            <span className="eyebrow">New Season Arrivals</span>
            <h1>Elevate Your<br />Everyday Style.</h1>
            <p>
              Considered fashion essentials crafted from premium materials — designed
              to move with your life and outlast every trend.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/shop" className="btn btn-outline">Explore Collection</Link>
            </div>
          </div>
          <div className="hero-media fade-in">
            <img
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=80"
              alt="Model wearing a LUXORA tailored outfit"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Shop by Category</span>
              <h2>Find Your Fit</h2>
            </div>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} to={`/shop?category=${encodeURIComponent(cat.slug)}`} className="category-card">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Curated For You</span>
              <h2>Featured Products</h2>
            </div>
            <Link to="/shop" className="btn btn-outline btn-sm">View All <FiArrowRight /></Link>
          </div>
          {status === "loading" && <ProductGridSkeleton count={8} />}
          {status === "error" && <ErrorMessage message="We couldn't load featured products right now." onRetry={() => window.location.reload()} />}
          {status === "ready" && <ProductGrid products={featured} />}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container promo-banner-inner">
          <span className="eyebrow" style={{ color: "var(--color-gold)" }}>Limited Time</span>
          <h2>Up to 40% Off Selected Items</h2>
          <p>Refresh your wardrobe with seasonal favorites at exceptional prices.</p>
          <Link to="/shop" className="btn btn-gold">Shop Sale</Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Customer Favorites</span>
              <h2>Best Sellers</h2>
            </div>
          </div>
          {status === "ready" && <ProductGrid products={bestSellers.length ? bestSellers : featured.slice(0, 4)} />}
          {status === "loading" && <ProductGridSkeleton count={4} />}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-alt">
        <div className="container">
          <div className="why-us-grid">
            {WHY_US.map((item) => (
              <div key={item.title} className="why-us-card">
                <item.icon size={26} color="var(--color-gold)" />
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
