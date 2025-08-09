import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { registerUser } from "../services/user"

const UserRegistration = () => {
  const navigate = useNavigate()
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
      toast.success("Registered successfully! Please login.")
      navigate("/user/login")
    } else {
      toast.error(response.error || "Registration failed!")
    }
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
        <div
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: "300px",
            height: "300px",
            background: "rgba(255, 255, 255, 0.1)",
            top: "-250px",
            left: "-250px",
          }}
        ></div>
        <div
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: "-200px",
            right: "-200px",
          }}
        ></div>
        <div
          className="position-absolute rounded-circle opacity-5"
          style={{
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.1)",
            top: "5%",
            right: "5%",
          }}
        ></div>
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
                <h2 className="card-title fw-bold mb-2" style={{ color: "#667eea" }}>
                  Join Grocify
                </h2>
                <p className="text-muted">Create your account to get started</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="text"
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

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-lg fw-semibold border-0 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                    }}
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="mb-0 text-muted">
                  Already have an account?{" "}
                  <Link to="/user/login" className="text-decoration-none fw-semibold" style={{ color: "#667eea" }}>
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration
