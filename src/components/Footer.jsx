import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <Newsletter />
      </div>
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <Link to="/" className="navbar-logo" style={{ color: "var(--color-paper)" }}>LUXORA</Link>
          <p>Elevate Your Everyday Style. Considered fashion essentials, made to last a lifetime of wear.</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/shop">Shop All</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/orders">Track Order</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <Link to="/contact">Help Center</Link>
          <Link to="/cart">Shipping & Returns</Link>
          <Link to="/contact">Size Guide</Link>
          <Link to="/contact">Terms & Privacy</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p><FiMapPin size={14} /> &nbsp;120 Madison Ave, New York, NY</p>
          <p><FiPhone size={14} /> &nbsp;+1 (555) 019-2842</p>
          <p><FiMail size={14} /> &nbsp;hello@luxora.com</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} LUXORA. All rights reserved.</p>
      </div>
    </footer>
  );
}
