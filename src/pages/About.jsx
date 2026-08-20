import { Link } from "react-router-dom";
import { TEAM } from "../data/demoData";

const STATS = [
  { value: "12+", label: "Years of Craft" },
  { value: "80K+", label: "Happy Customers" },
  { value: "32", label: "Countries Shipped" },
  { value: "4.8/5", label: "Average Rating" },
];

export default function About() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / About</div>
          <h1>Our Story</h1>
        </div>
      </div>

      <section className="container section about-story">
        <div>
          <span className="eyebrow">Since 2013</span>
          <h2>Fashion Built to Outlast the Season</h2>
          <p>
            LUXORA began in a small Manhattan studio with a simple belief: that everyday
            essentials deserve the same craftsmanship as occasion wear. What started as a
            capsule of six pieces has grown into a considered collection of clothing, shoes,
            bags and accessories worn by people who care about how things are made.
          </p>
          <p style={{ marginTop: 16 }}>
            We work with a small circle of mills and ateliers, favour natural and
            responsibly sourced materials, and design every piece to be repaired, not
            replaced. Slow, deliberate, and made to last — that's the LUXORA standard.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
          alt="LUXORA design studio"
          style={{ borderRadius: "var(--radius-lg)" }}
        />
      </section>

      <section className="section section-alt">
        <div className="container stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container section about-values">
        <div className="section-head">
          <div><span className="eyebrow">Why LUXORA</span><h2>What We Stand For</h2></div>
        </div>
        <div className="values-grid">
          <div className="card values-card">
            <h4>Our Mission</h4>
            <p>To make thoughtfully made fashion accessible, without compromising on quality or ethics.</p>
          </div>
          <div className="card values-card">
            <h4>Our Vision</h4>
            <p>A wardrobe of fewer, better pieces — designed to be worn for years, not seasons.</p>
          </div>
          <div className="card values-card">
            <h4>Our Craft</h4>
            <p>Every material is sourced with intention, and every piece is tested for everyday durability.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Meet the People</span><h2>Our Team</h2></div>
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="team-card">
                <img src={member.image} alt={member.name} loading="lazy" />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <div className="container promo-banner-inner">
          <h2>Ready to Build Your Capsule?</h2>
          <p>Explore the full LUXORA collection and find pieces made to last.</p>
          <Link to="/shop" className="btn btn-gold">Shop the Collection</Link>
        </div>
      </section>
    </div>
  );
}
