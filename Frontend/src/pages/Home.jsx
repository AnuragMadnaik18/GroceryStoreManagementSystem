
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from './Categories';
import './Home.css';
import './CategoryFilter.css';
import Navbar from './../components/Navbar';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchData();
  }, []);

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='bg-light min-vh-100 d-flex flex-column'>
      {/* Navbar */}
      <Navbar products={products} />

      {/* Page Content */}
      <div className='flex-grow-1'>
        {/* 📂 Category Filter */}
        <div className='container py-3'>
          <CategoryFilter />
        </div>

        {/* 🛍️ Product Grid */}
        <div style={{ padding: '20px' }}>
          <div className='row'>
            {products.length > 0 ? (
              products.map((product) => (
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={product.id}>
                  <div className='card h-100 shadow-sm border-0'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='card-img-top'
                      style={{
                        height: '180px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}
                      onClick={() => goToDetails(product.id)}
                    />
                    <div className='card-body d-flex flex-column'>
                      <h5 className='card-title text-truncate'>{product.name}</h5>
                      <p className='card-text text-success fw-semibold mb-1'>
                        ₹{product.price}
                      </p>
                      <p className='text-muted mb-2'>{product.category}</p>
                      <button
                        className='btn btn-outline-primary mt-auto'
                        onClick={() => goToDetails(product.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-12 text-center'>
                <p className='text-muted'>No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
