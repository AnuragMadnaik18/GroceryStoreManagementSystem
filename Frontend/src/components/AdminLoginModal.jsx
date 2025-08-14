import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLoginModal = ({ show, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!show) return null;

    const ADMIN_EMAIL = "grocify@gmail.com";
    const ADMIN_PASSWORD = "grocify";

    const handleAdminLogin = (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Email and Password must not be empty!");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                // toast removed
                setLoading(false);
                onClose();
                navigate("/admin/dashboard");
            } else {
                setError("Invalid admin credentials");
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="modal-backdrop-groci">
            <div className="modal-groci">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm position-relative mb-2" style={{ width: 70, height: 70, background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)" }}>
                        <div className="fw-bold" style={{ color: "white", fontSize: 20, letterSpacing: "1px", lineHeight: "1", textShadow: "0 2px 8px rgba(32,178,170,0.10)" }}>Grocify</div>
                    </div>
                    <h4 className="mb-2" style={{ color: '#20b2aa' }}>Admin Login</h4>
                    <p className="text-muted">Access your management dashboard</p>
                </div>
                <form onSubmit={handleAdminLogin}>
                    {error && (
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="admin-email" className="form-label fw-semibold">Email Address</label>
                        <input type="text" id="admin-email" className="form-control form-control-lg border-0 shadow-sm" placeholder="admin@grocify.com" value={email} onChange={e => setEmail(e.target.value)} style={{ backgroundColor: "#f8f9ff" }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="admin-password" className="form-label fw-semibold">Password</label>
                        <input type="password" id="admin-password" className="form-control form-control-lg border-0 shadow-sm" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{ backgroundColor: "#f8f9ff" }} />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-lg fw-semibold border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)", color: "white", boxShadow: "0 2px 8px rgba(32,178,170,0.10)", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1 }} disabled={loading}>
                            {loading ? "Logging in..." : "Login to Dashboard"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginModal;
