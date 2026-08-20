import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { validateContact } from "../utils/validation";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateContact(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    showToast("Your message has been sent — we'll reply within 24 hours.", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Contact</div>
          <h1>Get in Touch</h1>
        </div>
      </div>

      <div className="container section contact-layout">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p style={{ marginBottom: 24 }}>Our style advisors are available Monday–Saturday, 9am–7pm ET.</p>
          <div className="contact-info-item"><FiMapPin size={18} /><span>120 Madison Ave, New York, NY 10016</span></div>
          <div className="contact-info-item"><FiPhone size={18} /><span>+1 (555) 019-2842</span></div>
          <div className="contact-info-item"><FiMail size={18} /><span>hello@luxora.com</span></div>
        </div>

        <form className="card contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className={`form-field ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="c-name">Name</label>
              <input id="c-name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className={`form-field ${errors.email ? "has-error" : ""}`}>
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>
          <div className={`form-field ${errors.subject ? "has-error" : ""}`}>
            <label htmlFor="c-subject">Subject</label>
            <input id="c-subject" value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} />
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>
          <div className={`form-field ${errors.message ? "has-error" : ""}`}>
            <label htmlFor="c-message">Message</label>
            <textarea id="c-message" rows="5" value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
}
