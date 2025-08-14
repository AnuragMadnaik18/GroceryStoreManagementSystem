import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserLoginModal from "../components/UserLoginModal"
import { toast } from "react-toastify"
import { registerUser } from "../services/user"

const UserRegistration = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    password: "",
    phoneNumber: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await registerUser(
      formData.fullName,
      formData.address,
      formData.email,
      formData.password,
      formData.phoneNumber
    )

    if (response.status === "success") {
      navigate("/home");
      setShowLoginModal(true)
    } else {
      toast.error(response.error || "Registration failed!", { autoClose: 1500 })
    }
  }

  return (
    <>
      <UserLoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <div
        className="container-fluid position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)",
          minHeight: '100vh',
          paddingTop: 60,
          paddingBottom: 60
        }}
      >
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

        <div className="row w-100 justify-content-center position-relative" style={{ marginTop: 24, marginBottom: 24 }}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-lg border-0 mx-auto"
              style={{
                width: '140%',
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
                  <h2 className="card-title fw-bold mb-2" style={{ color: "#20b2aa" }}>
                    Join Grocify
                  </h2>
                  <p className="text-muted">Create your account to get started</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName" className="form-label fw-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="form-control form-control-lg border-0 shadow-sm"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "#f8f9ff" }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
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
                    <div className="col-md-6 mb-3">
                      <label htmlFor="address" className="form-label fw-semibold">
                        Address
                      </label>
                      <textarea
                        name="address"
                        id="address"
                        className="form-control form-control-lg border-0 shadow-sm"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "#f8f9ff", minHeight: "80px" }}
                      ></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phoneNumber" className="form-label fw-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="form-control form-control-lg border-0 shadow-sm"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "#f8f9ff" }}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="password" className="form-label fw-semibold">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control form-control-lg border-0 shadow-sm"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: "#f8f9ff" }}
                      />
                    </div>
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
                    >
                      Register
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="mb-0 text-muted">
                    Already have an account?{" "}
                    <span className="text-decoration-none fw-semibold" style={{ color: "#20b2aa", cursor: 'pointer' }} onClick={() => { navigate('/home'); setShowLoginModal(true); }}>
                      Login here
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserRegistration
