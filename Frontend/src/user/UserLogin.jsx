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

        // toast removed
        navigate("/home");
      } else {
        toast.error(response.error || "Invalid credentials!", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("An error occurred during login.", { autoClose: 1500 });
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Decorative background elements */}
      <div className="position-absolute w-100 h-100">
        <div
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: "320px",
            height: "320px",
            background: "rgba(255, 255, 255, 0.10)",
            top: "-160px",
            left: "-160px",
          }}
        ></div>
        <div
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: "220px",
            height: "220px",
            background: "rgba(255, 255, 255, 0.10)",
            bottom: "-110px",
            right: "-110px",
          }}
        ></div>
        <div
          className="position-absolute rounded-circle opacity-5"
          style={{
            width: "170px",
            height: "170px",
            background: "rgba(255, 255, 255, 0.10)",
            top: "18%",
            right: "8%",
          }}
        ></div>
      </div>

      <div className="row w-100 justify-content-center position-relative">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.97)",
              borderRadius: "1.5rem",
              boxShadow: "0 4px 24px rgba(40,167,69,0.10)",
            }}
          >
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="mb-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm position-relative"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)",
                    }}
                  >
                    <div
                      className="fw-bold"
                      style={{
                        color: "white",
                        fontSize: "22px",
                        letterSpacing: "1px",
                        lineHeight: "1",
                        textShadow: "0 2px 8px rgba(32,178,170,0.10)",
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
                      background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)",
                      color: "white",
                      boxShadow: "0 2px 8px rgba(32,178,170,0.10)",
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
                  <Link to="/user/register" className="text-decoration-none fw-semibold" style={{ color: "#20b2aa" }}>
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
