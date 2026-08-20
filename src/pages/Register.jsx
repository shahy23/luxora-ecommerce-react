import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { validateRegister } from "../utils/validation";

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const result = register(form);
    if (result.success) {
      showToast("Account created — welcome to LUXORA!", "success");
      navigate("/profile");
    } else {
      setFormError(result.error);
    }
  }

  return (
    <div className="container section auth-section">
      <div className="auth-card card">
        <h1>Create Account</h1>
        <p style={{ marginBottom: 28 }}>Join LUXORA for a faster checkout and exclusive perks.</p>

        {formError && <div className="form-alert error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className={`form-field ${errors.firstName ? "has-error" : ""}`}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className={`form-field ${errors.lastName ? "has-error" : ""}`}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className={`form-field ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className={`form-field ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="reg-password">Password</label>
            <div className="password-field">
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="At least 6 characters"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className={`form-field ${errors.confirmPassword ? "has-error" : ""}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
