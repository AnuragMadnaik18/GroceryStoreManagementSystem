"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { searchProductByName } from "../services/searchProduct"
import { FaSearch, FaShoppingCart, FaUser, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import "../css/Navbar.css"
import UserLoginModal from "./UserLoginModal"
import AdminLoginModal from "./AdminLoginModal"
import "../css/UserLoginModal.css"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [user, setUser] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false)
  const profileRef = useRef()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !event.target.closest(".profile-trigger")
      ) {
        setShowProfile(false)
      }
    }
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showProfile])

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.trim() === "") {
      setFilteredProducts([])
    } else {
      const results = await searchProductByName(value)
      setFilteredProducts(results)
    }
  }

  const goToDetails = (productId) => {
    navigate(`/product/${productId}`)
    setSearchTerm("")
    setFilteredProducts([])
  }

  const handleProfileClick = () => {
    if (user) {
      setShowProfile((prev) => !prev)
    } else {
      navigate("/user/login")
    }
  }

  const onLogout = () => {
    sessionStorage.clear()
    setUser(null)
    setShowProfile(false)
    navigate("/Home")
  }

  const goToRegister = () => navigate("/user/register")
  const goToUserLogin = () => setShowLoginModal(true)

  // Sync user state when login modal closes
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }
  const goToAdminLogin = () => setShowAdminLoginModal(true)

  return (
    <>
      <UserLoginModal show={showLoginModal} onClose={handleLoginModalClose} />
      <AdminLoginModal show={showAdminLoginModal} onClose={() => setShowAdminLoginModal(false)} />
      {/* Main Header */}
      <nav className="main-header-groci">
        <div className="container">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-lg-2 col-md-3 col-6">
              <Link className="logo-groci" to="/home">
                🛒 GROCIFY
              </Link>
            </div>

            {/* Search Bar */}
            <div className="col-lg-6 col-md-5 d-none d-md-block">
              <div className="search-container-groci">
                <input
                  type="text"
                  className="search-input-groci"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="search-btn-groci">
                  <FaSearch />
                </button>
                {filteredProducts.length > 0 && (
                  <div className="search-results-groci">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="search-result-item-groci"
                        onClick={() => goToDetails(product.id)}
                      >
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Header Actions + Contact/Location/Auth */}
            <div className="col-lg-4 col-md-4 d-none d-md-flex justify-content-end align-items-center">
              <div className="header-actions-groci" style={{ display: 'flex', alignItems: 'center', gap: '2.8rem', paddingRight: '0.5rem' }}>
                <div className="d-flex flex-column align-items-end" style={{ minWidth: '170px', lineHeight: 1.2 }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#20b2aa', letterSpacing: '0.5px' }}>FREE DELIVERY</span>
                </div>
                {!user ? (
                  <>
                    <Link to="/about" className="action-item-groci" style={{ fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                      About Us
                    </Link>
                    <Link to="/contact" className="action-item-groci" style={{ fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                      Contact Us
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/MyOrders" className="action-item-groci" style={{ fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                      My Orders
                    </Link>
                    <Link to="/summary" className="action-item-groci" style={{ fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                      <FaShoppingCart className="me-1" />Cart
                    </Link>
                  </>
                )}
                {!user ? (
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <span className="auth-link-groci" onClick={goToRegister} style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                      Sign Up
                    </span>
                    <div className="dropdown">
                      <span className="auth-link-groci dropdown-toggle" data-bs-toggle="dropdown" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                        Sign In
                      </span>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item" onClick={goToUserLogin}>
                            User
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={goToAdminLogin}>
                            Admin
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <span className="auth-link-groci" onClick={onLogout} style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem' }}>
                    Logout
                  </span>
                )}
                {user && (
                  <span className="action-item-groci profile-trigger" onClick={handleProfileClick} style={{ fontWeight: 600, fontSize: '1.05rem', padding: '0 0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FaUser className="me-1" /> Hi, {user.fullName?.split(' ')[0] || user.fullName || 'User'}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="col-6 d-md-none text-end">
              <button
                className="btn btn-link text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileNav"
              >
                <span className="navbar-toggler-icon-custom">☰</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="row d-md-none mt-3">
            <div className="col-12">
              <div className="search-container-groci">
                <input
                  type="text"
                  className="search-input-groci"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="search-btn-groci">
                  <FaSearch />
                </button>
                {filteredProducts.length > 0 && (
                  <div className="search-results-groci">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="search-result-item-groci"
                        onClick={() => goToDetails(product.id)}
                      >
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="collapse d-md-none" id="mobileNav">
            <div className="mobile-nav-groci">
              <Link to="/home" className="mobile-nav-item-groci">
                Home
              </Link>
              {!user ? (
                <>
                  <Link to="/about" className="mobile-nav-item-groci">
                    About Us
                  </Link>
                  <Link to="/contact" className="mobile-nav-item-groci">
                    Contact Us
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/MyOrders" className="mobile-nav-item-groci">
                    My Orders
                  </Link>
                  <Link to="/summary" className="mobile-nav-item-groci">
                    <FaShoppingCart className="me-2" />
                    Cart
                  </Link>
                </>
              )}
              {user && (
                <span className="mobile-nav-item-groci profile-trigger" onClick={handleProfileClick} style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FaUser className="me-1" /> Hi, {user.fullName?.split(' ')[0] || user.fullName || 'User'}
                </span>
              )}
              {!user && location.pathname === "/Home" && (
                <>
                  <span className="mobile-nav-item-groci" onClick={goToRegister}>
                    Register
                  </span>
                  <span className="mobile-nav-item-groci" onClick={goToUserLogin}>
                    Customer Login
                  </span>
                  <span className="mobile-nav-item-groci" onClick={goToAdminLogin}>
                    Admin Login
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Profile panel */}
      <AnimatePresence>
        {showProfile && user && (
          <>
            <motion.div
              className="overlay-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                zIndex: 1049,
              }}
            />
            <motion.div
              ref={profileRef}
              className="profile-panel-groci"
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
            >
              <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={() => setShowProfile(false)}></button>
              </div>
              <div className="text-center mb-4">
                <div className="profile-avatar-groci">
                  <FaUser />
                </div>
                <h5 className="fw-bold mb-0">Profile Details</h5>
                <hr />
              </div>
              <div className="mb-2">
                <div className="small text-muted">👨 Name</div>
                <div className="fw-semibold">{user.fullName}</div>
              </div>
              <div className="mb-2">
                <div className="small text-muted">📧 Email</div>
                <div className="fw-semibold">{user.email}</div>
              </div>
              <div className="mb-2">
                <div className="small text-muted">📞 Phone</div>
                <div className="fw-semibold">{user.phoneNumber}</div>
              </div>
              <div>
                <div className="small text-muted">🏠 Address</div>
                <div className="fw-semibold">{user.address}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
