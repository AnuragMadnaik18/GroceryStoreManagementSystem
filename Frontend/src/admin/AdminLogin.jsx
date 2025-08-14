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

  const ADMIN_EMAIL = "grocify@gmail.com"
  const ADMIN_PASSWORD = "grocify"

  const handleAdminLogin = () => {
    setError("")
    if (!email || !password) {
      setError("Email and Password must not be empty!")
      return
    }

    setLoading(true)

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // toast removed
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
        background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="position-absolute w-100 h-100">
        <div className="position-absolute rounded-circle opacity-10" style={{ width: "320px", height: "320px", background: "rgba(255, 255, 255, 0.10)", top: "-160px", left: "-160px" }}></div>
        <div className="position-absolute rounded-circle opacity-10" style={{ width: "220px", height: "220px", background: "rgba(255, 255, 255, 0.10)", bottom: "-110px", right: "-110px" }}></div>
        <div className="position-absolute rounded-circle opacity-5" style={{ width: "170px", height: "170px", background: "rgba(255, 255, 255, 0.10)", top: "18%", right: "8%" }}></div>
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
                    <div className="fw-bold" style={{ color: "white", fontSize: "22px", letterSpacing: "1px", lineHeight: "1", textShadow: "0 2px 8px rgba(32,178,170,0.10)" }}>
                      Grocify
                    </div>
                  </div>
                </div>
                <h2 className="card-title fw-bold mb-2" style={{ color: "#20b2aa" }}>
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
                      background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)",
                      color: "white",
                      boxShadow: "0 2px 8px rgba(32,178,170,0.10)",
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
