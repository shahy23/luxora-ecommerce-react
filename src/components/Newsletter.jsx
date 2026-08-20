import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { isValidEmail } from "../utils/validation";
import { useToast } from "../context/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    showToast("You're subscribed! Welcome to LUXORA.", "success");
  }

  return (
    <div className="newsletter">
      <div>
        <h3>Join the LUXORA List</h3>
        <p>Get early access to new arrivals and members-only offers.</p>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="newsletter-input">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
          />
          <button type="submit" className="btn btn-gold" aria-label="Subscribe">
            Subscribe <FiArrowRight />
          </button>
        </div>
        {error && <span className="error-text">{error}</span>}
      </form>
    </div>
  );
}
