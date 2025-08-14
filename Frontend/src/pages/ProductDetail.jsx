import React, { useState, useEffect } from 'react';
import { getAverageRatingAPI } from '../services/feedback';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../store/CartContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { config } from '../services/config';
import { addToCartAPI } from '../services/cart';
import { getRecommendedProducts } from '../services/recommended';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  // Check if product is already in cart
  const isInCart = cartItems.some(item => String(item.id) === String(id));

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommended, setRecommended] = useState([]);

  // Feedback state
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  // Get user from sessionStorage
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Average rating state
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${config.serverUrl}/products`);
        const found = res.data.find(p => String(p.id) === String(id));
        if (found) {
          setProduct(found);
          setError(null);
          // Fetch recommended products after product is loaded
          const rec = await getRecommendedProducts(found.category, found.id);
          setRecommended(rec);
        } else {
          setError('Product not found');
          setProduct(null);
        }
      } catch (err) {
        setError('Product not found');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch feedback and average rating for product
  useEffect(() => {
    const fetchFeedback = async () => {
      setFeedbackLoading(true);
      try {
        const res = await axios.get(`${config.serverUrl}/products/${id}/feedback`);
        setFeedbackList(res.data);
      } catch (err) {
        setFeedbackList([]);
      } finally {
        setFeedbackLoading(false);
      }
    };
    const fetchAvgRating = async () => {
      try {
        const res = await getAverageRatingAPI(id);
        setAverageRating(res.data);
      } catch {
        setAverageRating(null);
      }
    };
    if (id) {
      fetchFeedback();
      fetchAvgRating();
    }
  }, [id]);
  // Submit feedback
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0) {
      toast.success(`${product.name} added to cart`, { autoClose: 750 });
      return;
    }
    try {
      await axios.post(`${config.serverUrl}/products/${id}/feedback`, {
        feedback,
        userName: user?.fullName || 'Anonymous',
        rating
      });
      setFeedback('');
      setRating(0);
      // Refresh feedback list and average rating
      const res = await axios.get(`${config.serverUrl}/products/${id}/feedback`);
      setFeedbackList(res.data);
      try {
        const avgRes = await getAverageRatingAPI(id);
        setAverageRating(avgRes.data);
      } catch {
        setAverageRating(null);
      }
      toast.success('Feedback submitted!');
      // toast removed
    } catch (err) {
      toast.error('Failed to submit feedback', { autoClose: 1500 });
    }
  };

  if (loading) {
    return <div className='container mt-5 text-center'><h3>Loading...</h3></div>;
  }
  if (error || !product) {
    return (
      <div className='container mt-5 text-center'>
        <h3 className="text-danger">{error || 'Product not found'}</h3>
        <button className='btn btn-secondary mt-3' onClick={() => navigate('/Home')}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to add items to cart.", { autoClose: 750 });
      navigate('/user/login');
      return;
    }

    const productWithQuantity = {
      ...product,
      quantity,
      total: product.price * quantity,
    };
    addToCart(productWithQuantity);

    if (user && user.id) {
      try {
        const cartItem = {
          userId: user.id,
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity,
        };
        await addToCartAPI(cartItem);

        toast.success(`${product.name} added to cart `, {autoClose:750});
        // toast removed
      } catch (error) {
        toast.error("Failed to add to backend cart.", { autoClose: 1500 });
      }
    } else {
      // toast removed
    }

    //toast.success(`${product.name} added to cart!`);
  };

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-10'>
            <div className='row g-4 align-items-stretch'>
              {/* Product Image */}
              <div className='col-md-5'>
                <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(40,167,69,0.10)', padding: 24, textAlign: 'center', height: '100%' }}>
                  {localStorage.getItem('product_img_' + product.name) ? (
                    <img
                      src={localStorage.getItem('product_img_' + product.name)}
                      alt={product.name}
                      style={{ maxHeight: 340, width: '100%', objectFit: 'contain', borderRadius: '1rem', border: '1px solid #e0f7f7', background: '#f8f9fa' }}
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxHeight: 340, width: '100%', objectFit: 'contain', borderRadius: '1rem', border: '1px solid #e0f7f7', background: '#f8f9fa' }}
                    />
                  )}
                </div>
              </div>
              {/* Product Info */}
              <div className='col-md-7'>
                <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(40,167,69,0.10)', padding: 32, height: '100%' }}>
                  <h2 style={{ color: '#20b2aa', fontWeight: 700 }}>{product.name}</h2>
                  {averageRating !== null && (
                    <div className="mb-2" style={{ fontSize: 18, color: '#ffc107', fontWeight: 600 }}>
                      Rating: {averageRating.toFixed(1)}{' '}
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} style={{ color: star <= Math.round(averageRating) ? '#ffc107' : '#ccc', fontSize: '1.3rem' }}>★</span>
                      ))}
                    </div>
                  )}
                  <div className='d-flex align-items-center gap-3 mb-2'>
                    <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 28 }}>₹{product.price}</span>
                    <span className='badge bg-success' style={{ fontSize: 14, fontWeight: 500 }}>In Stock</span>
                  </div>
                  <div className='mb-3' style={{ color: '#888', fontSize: 15 }}> Category: {product.category}</div>
                  <div className='mb-4'>
                    <span style={{ fontWeight: 600 }}>Quantity:</span>
                    <button className='btn btn-outline-success mx-2' style={{ borderRadius: 8, minWidth: 36 }} onClick={decreaseQty}>−</button>
                    <span className='fs-5'>{quantity}</span>
                    <button className='btn btn-outline-success mx-2' style={{ borderRadius: 8, minWidth: 36 }} onClick={increaseQty}>+</button>
                  </div>
                  <div className='mb-3'>
                    <span className='fw-bold fs-5' style={{ color: '#20b2aa' }}>Total: ₹{product.price * quantity}</span>
                  </div>
                  <div className='d-flex gap-3 mb-4'>
                    {isInCart ? (
                      <button className='btn btn-warning btn-lg' style={{ background: '#ff6b35', border: 'none', color: 'white', fontWeight: 600, borderRadius: 8 }} onClick={() => navigate('/summary')}>
                        Go to Cart
                      </button>
                    ) : (
                      <button className='btn btn-success btn-lg' style={{ background: 'linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)', border: 'none', color: 'white', fontWeight: 600, borderRadius: 8 }} onClick={handleAddToCart}>
                        Add to Cart
                      </button>
                    )}
                    <button className='btn btn-secondary btn-lg' style={{ background: '#e0f7f7', color: '#20b2aa', border: 'none', fontWeight: 600, borderRadius: 8 }} onClick={() => navigate('/Home')}>
                      Back to Home
                    </button>
                  </div>
                  <div className='mb-3' style={{ color: '#333', fontSize: 16 }}>
                    <strong>Quick Overview</strong>
                    <div style={{ color: '#666', fontSize: 15, marginTop: 6 }}>{product.description || 'No description available.'}</div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-6 mb-2'>
                      <div style={{ background: '#e0f7f7', borderRadius: 8, padding: 12, fontSize: 15 }}>
                        <span role='img' aria-label='delivery'>🚚</span> Free Delivery
                      </div>
                    </div>
                    <div className='col-6 mb-2'>
                      <div style={{ background: '#e0f7f7', borderRadius: 8, padding: 12, fontSize: 15 }}>
                        <span role='img' aria-label='guarantee'>✅</span> 100% Guarantee
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {recommended.length > 0 ? (
              <div className="mt-5">
                <h4 className="mb-4" style={{ color: '#20b2aa', fontWeight: 700 }}>Related Products</h4>
                <div className="row">
                  {recommended.map((rec) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={rec.id}>
                      <div className="card h-100 shadow-sm border-0" style={{ cursor: 'pointer', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(32,178,170,0.10)' }} onClick={() => navigate(`/product/${rec.id}`)}>
                        <img
                          src={localStorage.getItem('product_img_' + rec.name) || rec.image}
                          alt={rec.name}
                          className="card-img-top"
                          style={{ height: '140px', objectFit: 'contain', background: '#e0f7f7', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title text-truncate" style={{ color: '#20b2aa', fontWeight: 600 }}>{rec.name}</h6>
                          <p className="card-text fw-semibold mb-1" style={{ color: '#4ade80' }}>₹{rec.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Feedback Section */}
            <div className='card mt-4' style={{ borderRadius: '1rem', boxShadow: '0 2px 8px rgba(32,178,170,0.10)' }}>
              <div className='card-header' style={{ background: 'linear-gradient(135deg, #4ade80 0%, #20b2aa 100%)', color: 'white', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                <h5 className='mb-0'>Product Feedback</h5>
              </div>
              <div className='card-body'>
                {user ? (
                  <form onSubmit={handleFeedbackSubmit} className='mb-3'>
                    <div className='mb-2'>
                      <textarea
                        className='form-control'
                        rows={2}
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        placeholder='Write your feedback...'
                        required
                      />
                    </div>
                    <div className='mb-2'>
                      <span className='me-2'>Your Rating:</span>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          style={{ cursor: 'pointer', color: star <= rating ? '#ffc107' : '#ccc', fontSize: '1.5rem' }}
                          onClick={() => setRating(star)}
                          onMouseOver={() => setRating(star)}
                          onMouseLeave={() => setRating(rating)}
                        >★</span>
                      ))}
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit Feedback</button>
                  </form>
                ) : (
                  <div className='alert alert-warning mb-3'>
                    Please <a href='/user/login'>login</a> to submit feedback.
                  </div>
                )}
                <h6>All Feedback:</h6>
                {feedbackLoading ? (
                  <div>Loading feedback...</div>
                ) : feedbackList.length === 0 ? (
                  <div>No feedback yet.</div>
                ) : (
                  <ul className='list-group'>
                    {feedbackList.map((fb, idx) => (
                      <li key={idx} className='list-group-item'>
                        <strong>{fb.userName ? fb.userName : 'Anonymous'}:</strong> {fb.feedback}
                        <span className='ms-2'>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} style={{ color: star <= (fb.rating || 0) ? '#ffc107' : '#ccc', fontSize: '1.2rem' }}>★</span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* End Feedback Section */}


          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
