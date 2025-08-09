import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../store/CartContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { config } from '../services/config';
import { addToCartAPI } from '../services/cart';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Feedback state
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  // Get user from sessionStorage
  const storedUser = sessionStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${config.serverUrl}/products`);
        const found = res.data.find(p => String(p.id) === String(id));
        if (found) {
          setProduct(found);
          setError(null);
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


  // Fetch feedback for product
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
    if (id) fetchFeedback();
  }, [id]);
  // Submit feedback
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0) {
      toast.error('Please enter feedback and select a rating.');
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
      // Refresh feedback list
      const res = await axios.get(`${config.serverUrl}/products/${id}/feedback`);
      setFeedbackList(res.data);
      toast.success('Feedback submitted!');
    } catch (err) {
      toast.error('Failed to submit feedback');
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
      toast.info("Please login to add items to cart.");
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

        toast.success(`${product.name} added to cart (backend)!`);
      } catch (error) {
        toast.error("Failed to add to backend cart.");
      }
    } else {
      toast.success(`${product.name} added to cart (guest)!`);
    }

    //toast.success(`${product.name} added to cart!`);
  };

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div>
      <Navbar />
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='col-lg-10'>
            <div className='card shadow-lg border-0'>
              <div className='row g-0'>
                <div className='col-md-6'>
                  {localStorage.getItem('product_img_' + product.name) ? (
                    <img
                      src={localStorage.getItem('product_img_' + product.name)}
                      alt={product.name}
                      className='img-fluid rounded-start w-100 h-100 object-fit-cover'
                      style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className='img-fluid rounded-start w-100 h-100 object-fit-cover'
                      style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div className='col-md-6'>
                  <div className='card-body'>
                    <h4 className='card-title'>{product.name}</h4>
                    <h3 className='text-primary'>₹{product.price}</h3>
                    <p className='mt-3'>
                      <strong>Description:</strong> {product.description || 'No description available.'}
                    </p>

                    <div className='mt-4 d-flex align-items-center gap-3'>
                      <span className='fw-semibold'>Quantity:</span>
                      <button className='btn btn-outline-secondary' onClick={decreaseQty}>−</button>
                      <span className='fs-5'>{quantity}</span>
                      <button className='btn btn-outline-secondary' onClick={increaseQty}>+</button>
                    </div>

                    <div className='mt-3'>
                      <p className='fw-bold fs-5'>Total: ₹{product.price * quantity}</p>
                    </div>

                    <div className='mt-4 d-flex gap-3'>
                      <button className='btn btn-success btn-lg' onClick={handleAddToCart}>
                        Add to Cart
                      </button>
                      <button className='btn btn-secondary btn-lg' onClick={() => navigate('/Home')}>
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              </div> {/* row */}
            </div>

            {/* Feedback Section */}
            <div className='card mt-4'>
              <div className='card-header bg-info text-white'>
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
