import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getCartByUserIdAPI, deleteCartItemAPI } from '../services/cart';

const OrderSummaryPage = ({ products = [] }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        try {
          const response = await getCartByUserIdAPI(user.id);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };
    fetchCart();
  }, [user?.id]);

  const handleRemoveFromCart = async (userId, productId) => {
    try {
      await deleteCartItemAPI(userId, productId);
      toast.success("Product removed from cart!");
      setCartItems(prevItems =>
        prevItems.filter(item => item.product.id !== productId)
      );
    } catch (error) {
      toast.error("Error removing product from cart");
      console.error("Error removing item from cart:", error);
    }
  };

  const handlePlaceOrder = () => {
    navigate('/payment', { state: { totalAmount } });
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar products={products} />

      <div className="container my-5 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '800px', borderRadius: '20px' }}>
          <h2 className="text-center mb-4 fw-bold text-primary">🧾 Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-muted fs-5">Your cart is empty.</p>
              <button
                className="btn btn-outline-secondary mt-3 px-4"
                onClick={() => navigate('/Home')}
              >
                ⬅ Back to Home
              </button>
            </div>
          ) : (
            <>
              <ul className="list-group mb-4">
                {cartItems.map((item, index) => (
                  <li
                    key={`${item.product.id}-${index}`} // ✅ Now using a unique key
                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    style={{ borderRadius: '10px', backgroundColor: '#f9f9f9' }}
                  >
                    <div className="w-75">
                      <h5 className="mb-1 fw-semibold">{item.productName}</h5>
                      <p className="mb-1 text-muted">
                        ₹{item.price} × {item.quantity}
                      </p>
                      <p className="mb-0 fw-semibold text-success">
                        Subtotal: ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveFromCart(user.id, item.product.id)}
                    >
                      ❌ Cancel
                    </button>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                <h4 className="fw-bold">Total:</h4>
                <h4 className="text-success fw-bold">₹{totalAmount}</h4>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg fw-semibold"
                  onClick={handlePlaceOrder}
                  style={{ borderRadius: '12px' }}
                >
                  ✅ Place Order &rarr;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSummaryPage;
