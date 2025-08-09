import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import Navbar from './../components/Navbar';
import { config } from '../services/config';
import { getAverageRatingAPI } from '../services/feedback';
import { FaAppleAlt, FaCheese, FaBreadSlice, FaSnowflake, FaBox, FaCoffee, FaHeart, FaBroom, FaDog } from 'react-icons/fa';

const categories = [
  { name: 'All Categories', icon: null },
  { name: 'FRESHPRODUCTS', icon: <FaAppleAlt /> },
  { name: 'DAIRY', icon: <FaCheese /> },
  { name: 'BAKERY', icon: <FaBreadSlice /> },
  { name: 'FROZENFOOD', icon: <FaSnowflake /> },
  { name: 'PACKAGEDFOOD', icon: <FaBox /> },
  { name: 'BEVERAGES', icon: <FaCoffee /> },
  { name: 'HEALTHNBEAUTY', icon: <FaHeart /> },
  { name: 'HOUSEHOLD', icon: <FaBroom /> },
  { name: 'PETFOOD', icon: <FaDog /> }
];

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.serverUrl}/products`);
        const productList = res.data;
        setProducts(productList);
        setFilteredProducts(productList);

        const ratingMap = {};
        for (let product of productList) {
          try {
            const res = await getAverageRatingAPI(product.id);
            ratingMap[product.id] = res.data;
          } catch {
            ratingMap[product.id] = 4.0;
          }
        }
        setRatings(ratingMap);
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
      const filtered = products.filter(
        (product) => product.category.toUpperCase() === category.toUpperCase()
      );
      setFilteredProducts(filtered);
    }
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='home-page'>
      <Navbar products={products} />

      {/* Category Filter */}
      <div className='container py-4 category-section'>
        <div className='d-flex flex-wrap gap-2 justify-content-center'>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => filterByCategory(cat.name)}
              className={`category-btn ${selectedCategory === cat.name ? 'active' : ''
                }`}
            >
              {cat.icon && <span className='cat-icon'>{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className='container'>
        <div className='row'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'
                key={product.id}
              >
                <div className='product-card' onClick={() => goToDetails(product.id)}>
                  <div className='product-img'>
                    <img
                      src={
                        localStorage.getItem('product_img_' + product.name) ||
                        product.image
                      }
                      alt={product.name}
                    />
                  </div>
                  <div className='product-body'>
                    <h5 className='product-title'>{product.name}</h5>
                    <p className='product-desc'>
                      {product.description
                        ? product.description.slice(0, 60) +
                        (product.description.length > 60 ? '...' : '')
                        : 'No description available.'}
                    </p>
                    <div className='product-rating'>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i <= Math.round(ratings[product.id] || 4)
                                ? '#FFD700'
                                : '#e4e5e9'
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className='product-price'>₹{product.price}</p>
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
