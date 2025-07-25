import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ products }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredProducts([]);
    } else {
      const matches = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(matches);
    }
  };

  const goToDetails = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  const onLogout = () => {
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg bg-dark px-4' data-bs-theme='dark'>
      <div className='container-fluid'>
        {/* Brand */}
        <Link className='navbar-brand' to='/home'>
          Super Market
        </Link>

        <div className='collapse navbar-collapse justify-content-between' id='navbarNav'>
          {/* Left side: nav links */}
          <ul className='navbar-nav gap-3'>
            <li className='nav-item'>
              <Link className='nav-link' to='/home'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/task-list'>
                Tasks
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Contacts'>
                Contacts
              </Link>
            </li>
            <li className='nav-item'>
              <button onClick={() => navigate('/')} className='btn btn-sm btn-outline-light'>
                Logout
              </button>
            </li>
          </ul>

          {/* Right side: search + icons */}
          <div className='d-flex align-items-center gap-4'>
            {/* Search */}
            <div className='position-relative' style={{ width: '240px' }}>
              <input
                type='text'
                className='form-control form-control-sm'
                placeholder='🔍 Search products...'
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

            {/* Icons */}
            <Link to='/summary' className='text-white fs-5 text-decoration-none'>
              🛒
            </Link>
            <Link to='/User' className='text-white fs-5 text-decoration-none'>
              👤
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
