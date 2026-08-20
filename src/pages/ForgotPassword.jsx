import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { isValidEmail } from "../utils/validation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <div className="container section auth-section">
      <div className="auth-card card">
        {sent ? (
          <div style={{ textAlign: "center" }}>
            <FiCheckCircle size={40} color="var(--color-success)" />
            <h1 style={{ marginTop: 16 }}>Check Your Inbox</h1>
            <p style={{ marginTop: 8 }}>
              If an account exists for <strong>{email}</strong>, we've sent password reset instructions.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Login</Link>
          </div>
        ) : (
          <>
            <h1>Reset Password</h1>
            <p style={{ marginBottom: 28 }}>Enter your email and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-field ${error ? "has-error" : ""}`}>
                <label htmlFor="forgot-email">Email</label>
                <div className="password-field">
                  <FiMail size={16} style={{ marginLeft: 12, color: "var(--color-text-muted)" }} />
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{ paddingLeft: 8 }}
                  />
                </div>
                {error && <span className="error-text">{error}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block">Send Reset Link</button>
            </form>
            <p className="auth-footer">
              Remembered it? <Link to="/login">Log in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
