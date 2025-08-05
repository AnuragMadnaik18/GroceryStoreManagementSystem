"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const ADMIN_EMAIL = "anurag18@gmail.com"
  const ADMIN_PASSWORD = "anurag18"

  const handleAdminLogin = () => {
    setError("")
    if (!email || !password) {
      setError("Email and Password must not be empty!")
      return
    }

    setLoading(true)

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        toast.success("Admin login successful!")
        navigate("/admin/dashboard")
      } else {
        setError("Invalid admin credentials")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="position-absolute w-100 h-100">
        <div className="position-absolute rounded-circle opacity-10" style={{ width: "300px", height: "300px", background: "rgba(255, 255, 255, 0.1)", top: "-150px", left: "-150px" }}></div>
        <div className="position-absolute rounded-circle opacity-10" style={{ width: "200px", height: "200px", background: "rgba(255, 255, 255, 0.1)", bottom: "-100px", right: "-100px" }}></div>
        <div className="position-absolute rounded-circle opacity-5" style={{ width: "150px", height: "150px", background: "rgba(255, 255, 255, 0.1)", top: "20%", right: "10%" }}></div>
      </div>

      <div className="row w-100 justify-content-center position-relative">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "25px",
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
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <div className="fw-bold" style={{ color: "white", fontSize: "22px", letterSpacing: "1px", lineHeight: "1" }}>
                      Grocify
                    </div>
                  </div>
                </div>
                <h2 className="card-title fw-bold mb-2" style={{ color: "#667eea" }}>
                  Admin
                </h2>
                <p className="text-muted">Access your management dashboard</p>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control form-control-lg border-0 shadow-sm"
                    placeholder="admin@grocify.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ backgroundColor: "#f8f9ff" }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg border-0 shadow-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "#f8f9ff" }}
                  />
                </div>
                <div className="d-grid mb-3">
                  <button
                    onClick={handleAdminLogin}
                    disabled={loading}
                    className="btn btn-lg fw-semibold border-0 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.8 : 1,
                    }}
                  >
                    {loading ? "Logging in..." : "Login to Dashboard"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
