import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { validateLogin } from "../utils/validation";

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [formError, setFormError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const result = login(form);
    if (result.success) {
      showToast("Login successful", "success");
      navigate(redirectTo, { replace: true });
    } else {
      setFormError(result.error);
    }
  }

  return (
    <div className="container section auth-section">
      <div className="auth-card card">
        <h1>Welcome Back</h1>
        <p style={{ marginBottom: 28 }}>Log in to access your orders, wishlist and profile.</p>

        {formError && <div className="form-alert error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-field ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className={`form-field ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="auth-row">
            <label className="filter-radio">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Log In</button>
        </form>

        <div className="auth-divider"><span>or</span></div>
        <button className="btn btn-outline btn-block" type="button" onClick={() => showToast("Google login isn't available in this demo.", "info")}>
          <FcGoogle size={18} /> Continue with Google
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
