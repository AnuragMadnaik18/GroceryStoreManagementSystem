import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; // Ensure this path is correct
import Navbar from './../components/Navbar';
import {config} from '../services/config'; 

const categories = [
  'All Categories',
  'FRESHPRODUCTS',
  'DAIRY',
  'BAKERY',      
  'FROZENFOOD',
  'PACKAGEDFOOD',
  'BEVERAGES',
  'HEALTHNBEAUTY',
  'HOUSEHOLD',
  'PETFOOD'
];

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.serverUrl}/products`);
        setProducts(res.data);
        setFilteredProducts(res.data); // default view
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All Categories') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.category.toUpperCase() === category.toUpperCase()
      );
      setFilteredProducts(filtered);
    }
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='bg-light min-vh-100 d-flex flex-column'>
      {/* Navbar */}
      <Navbar products={products} />

      {/* Category Filter */}
      <div className='container py-3'>
        <div className='d-flex flex-wrap gap-2 justify-content-center'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`btn ${
                selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'
              } btn-sm`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className='container'>
        <div className='row'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={product.id}>
                <div className='card h-100 shadow-sm border-0'>
                  <img
                    src={
                      localStorage.getItem('product_img_' + product.name) ||
                      product.image
                    }
                    alt={product.name}
                    className='card-img-top'
                    onClick={() => goToDetails(product.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className='card-body d-flex flex-column'>
                    <h5 className='card-title text-truncate'>{product.name}</h5>
                    <p className='card-text text-success fw-semibold mb-1'>
                      ₹{product.price}
                    </p>
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
  );
}

export default Home;

