import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { searchProductByName } from '../services/searchProduct'; // <-- new service
import '../css/Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target) && !event.target.closest('.profile-trigger')) {
        setShowProfile(false);
      }
    }

    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfile]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredProducts([]);
    } else {
      const results = await searchProductByName(value);
      setFilteredProducts(results);
    }
  };

  const goToDetails = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  const handleProfileClick = () => {
    if (user) {
      setShowProfile((prev) => !prev);
    } else {
      navigate('/user/login');
    }
  };

  const onLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setShowProfile(false);
    navigate('/');
  };

  const goToRegister = () => navigate('/user/register');
  const goToUserLogin = () => navigate('/user/login');
  const goToAdminLogin = () => navigate('/admin/login');

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-dark shadow-sm py-3 px-4'>
        <div className='container-fluid'>
          <Link className='navbar-brand fs-3 fw-bold text-light d-flex align-items-center gap-2' to='/home'>
            🛍️ <span>Grocify</span>
          </Link>

          <button className='navbar-toggler bg-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse justify-content-between' id='navbarNav'>
            <ul className='navbar-nav gap-3 fs-6'>
              <li className='nav-item'>
                <Link className='nav-link text-light' to='/home'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link text-light' to='/MyOrders'>My orders</Link>
              </li>
            </ul>

            <div className='d-flex align-items-center gap-3'>
              {/* Search */}
              <div className='position-relative' style={{ width: '250px' }}>
                <input
                  type='text'
                  className='form-control form-control-sm rounded-pill ps-3'
                  placeholder='🔍 Search...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {filteredProducts.length > 0 && (
                  <ul className='list-group position-absolute w-100 mt-1 z-3'>
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        className='list-group-item list-group-item-action'
                        onClick={() => goToDetails(product.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link to='/summary' className='text-light fs-5 text-decoration-none'>🛒</Link>

              <span
                className='text-light fs-5 profile-trigger'
                title='Profile'
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
              >👤</span>

              {user ? (
                <button onClick={onLogout} className='btn btn-sm btn-outline-light'>Logout</button>
              ) : (
                location.pathname === '/Home' && (
                  <>
                    <button onClick={goToRegister} className='btn btn-sm btn-outline-success'>Register</button>
                    <div className='dropdown'>
                      <button className='btn btn-sm btn-outline-info dropdown-toggle text-light' data-bs-toggle='dropdown'>Login</button>
                      <ul className='dropdown-menu dropdown-menu-end'>
                        <li><button className='dropdown-item' onClick={goToUserLogin}>Customer</button></li>
                        <li><button className='dropdown-item' onClick={goToAdminLogin}>Admin</button></li>
                      </ul>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Profile panel */}
      <AnimatePresence>
        {showProfile && (
          <>
            <motion.div
              className='overlay-bg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black', zIndex: 1049 }}
            />
            <motion.div
              ref={profileRef}
              className='bg-white border rounded-4 shadow-lg p-4'
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              style={{ position: 'fixed', top: '80px', right: '20px', width: '340px', zIndex: 1050 }}
            >
              <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={() => setShowProfile(false)}></button>
              </div>
              <div className="text-center mb-4">
                <div className="fs-2">👤</div>
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
  );
}

export default Navbar;

