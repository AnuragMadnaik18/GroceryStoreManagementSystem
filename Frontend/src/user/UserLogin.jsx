import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/user";

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // ✅ Save token and user to sessionStorage
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user", JSON.stringify(response.data));

        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error(response.error || "Invalid credentials!");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Decorative background elements */}
      <div className="position-absolute w-100 h-100">
        <div
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: "300px",
            height: "300px",
            background: "rgba(255, 255, 255, 0.1)",
            top: "-150px",
            left: "-150px",
          }}
        ></div>
        <div
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: "-100px",
            right: "-100px",
          }}
        ></div>
        <div
          className="position-absolute rounded-circle opacity-5"
          style={{
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.1)",
            top: "20%",
            right: "10%",
          }}
        ></div>
      </div>

      <div className="row w-100 justify-content-center position-relative">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{ backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.95)" }}
          >
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="mb-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm position-relative"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <div
                      className="fw-bold"
                      style={{
                        color: "white",
                        fontSize: "22px",
                        letterSpacing: "1px",
                        lineHeight: "1",
                      }}
                    >
                      Grocify
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-lg border-0 shadow-sm"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#f8f9ff" }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg border-0 shadow-sm"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "#f8f9ff" }}
                  />
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-lg fw-semibold border-0 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="mb-0 text-muted">
                  Don't have an account?{" "}
                  <Link to="/user/register" className="text-decoration-none fw-semibold" style={{ color: "#667eea" }}>
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
