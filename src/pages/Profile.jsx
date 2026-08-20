import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiPackage, FiHeart, FiMapPin, FiSettings, FiLogOut, FiEdit2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  function handleSave(e) {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
    showToast("Profile updated", "success");
  }

  function handleLogout() {
    logout();
    showToast("Logged out successfully", "success");
    navigate("/");
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 32 }}>My Account</h1>
      <div className="profile-layout">
        <aside className="card profile-nav">
          <div className="profile-nav-user">
            <div className="profile-avatar"><FiUser size={22} /></div>
            <div>
              <strong>{user.firstName} {user.lastName}</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <Link to="/orders"><FiPackage size={16} /> My Orders</Link>
          <Link to="/wishlist"><FiHeart size={16} /> Wishlist</Link>
          <a href="#addresses"><FiMapPin size={16} /> Addresses</a>
          <a href="#settings"><FiSettings size={16} /> Settings</a>
          <button onClick={handleLogout} className="profile-logout"><FiLogOut size={16} /> Logout</button>
        </aside>

        <div className="card profile-content">
          <div className="profile-content-head">
            <h3>Profile Information</h3>
            <button className="btn btn-outline btn-sm" onClick={() => setEditing((e) => !e)}>
              <FiEdit2 size={13} /> {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="p-firstName">First Name</label>
                  <input id="p-firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div className="form-field">
                  <label htmlFor="p-lastName">Last Name</label>
                  <input id="p-lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="p-phone">Phone</label>
                <input id="p-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-field">
                <label htmlFor="p-address">Address</label>
                <input id="p-address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, City, State" />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          ) : (
            <div className="profile-info-grid">
              <div><span>Name</span><strong>{user.firstName} {user.lastName}</strong></div>
              <div><span>Email</span><strong>{user.email}</strong></div>
              <div><span>Phone</span><strong>{user.phone || "Not provided"}</strong></div>
              <div><span>Address</span><strong>{user.address || "Not provided"}</strong></div>
            </div>
          )}

          <div id="addresses" className="profile-section-anchor">
            <h3>Addresses</h3>
            <p>{user.address || "You haven't saved a default address yet. Add one during checkout or via edit profile."}</p>
          </div>

          <div id="settings" className="profile-section-anchor">
            <h3>Settings</h3>
            <p>Notification and privacy preferences are managed here in a full production build.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
