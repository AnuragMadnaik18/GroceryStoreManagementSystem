import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/user";

const UserLoginModal = ({ show, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await loginUser(formData.email, formData.password);
            if (response.status === "success" && response.data) {
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("user", JSON.stringify(response.data));
                // toast removed
                onClose();
                navigate("/home");
            } else {
                toast.error(response.error || "Invalid credentials!", { autoClose: 1500 });
            }
        } catch (error) {
            toast.error("An error occurred during login.", { autoClose: 1500 });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-backdrop-groci">
            <div className="modal-groci">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm position-relative mb-2" style={{ width: 70, height: 70, background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)" }}>
                        <div className="fw-bold" style={{ color: "white", fontSize: 20, letterSpacing: "1px", lineHeight: "1", textShadow: "0 2px 8px rgba(32,178,170,0.10)" }}>Grocify</div>
                    </div>
                    <h4 className="mb-2" style={{ color: '#20b2aa' }}>Sign In</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <input type="email" name="email" id="email" className="form-control form-control-lg border-0 shadow-sm" placeholder="Enter your email" value={formData.email} onChange={handleChange} required style={{ backgroundColor: "#f8f9ff" }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input type="password" name="password" id="password" className="form-control form-control-lg border-0 shadow-sm" placeholder="Enter your password" value={formData.password} onChange={handleChange} required style={{ backgroundColor: "#f8f9ff" }} />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-lg fw-semibold border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)", color: "white", boxShadow: "0 2px 8px rgba(32,178,170,0.10)" }} disabled={isSubmitting}>
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="mb-0 text-muted">
                        Don't have an account?{" "}
                        <Link to="/user/register" className="text-decoration-none fw-semibold" style={{ color: "#20b2aa" }} onClick={onClose}>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLoginModal;
