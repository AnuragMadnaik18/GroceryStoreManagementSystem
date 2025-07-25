import React from 'react';
import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';

const OrderSummaryPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/payment');
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '800px' }}>
        <h2 className="text-center mb-4">🧾 Order Summary</h2>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">Your cart is empty.</p>
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/Home')}>
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <ul className="list-group mb-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <div className="w-75">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1 text-muted">
                      Price: ₹{item.price} × {item.quantity}
                    </p>
                    <p className="mb-0 fw-semibold">Subtotal: ₹{item.price * item.quantity}</p>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Cancel
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Total Amount:</h4>
              <h4 className="text-success">₹{totalAmount}</h4>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder}>
                Place Order &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryPage;

