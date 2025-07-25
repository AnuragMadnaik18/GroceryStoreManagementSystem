import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { useCart } from '../store/CartContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = getProducts().find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className='container mt-5 text-center'>
        <h3 className="text-danger">Product not found</h3>
        <button className='btn btn-secondary mt-3' onClick={() => navigate('/Home')}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity,
      total: product.price * quantity,
    };
    addToCart(productWithQuantity);
    toast.success(`${product.name} added to cart!`);
    // navigate('/Home');
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className='img-fluid rounded-start w-100 h-100 object-fit-cover'
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>

                <div className='col-md-6'>
                  <div className='card-body'>
                    <h2 className='card-title'>{product.name}</h2>
                    <p className='text-muted mb-2'>Category: {product.category}</p>
                    <h4 className='text-primary'>₹{product.price}</h4>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

