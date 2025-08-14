
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getCartByUserIdAPI, deleteCartItemAPI } from '../services/cart';
import { useCart } from '../store/CartContext';


const OrderSummaryPage = ({ products = [] }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCart } = useCart();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      const fetchCart = async () => {
        try {
          const response = await getCartByUserIdAPI(user.id);
          const normalized = response.data.map(item => ({
            ...item,
            id: item.product?.id || item.productId || item.id,
            name: item.productName || item.name,
          }));
          updateCart(normalized);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCart();
    }
    // eslint-disable-next-line
  }, [user?.id]);

  const handleRemoveFromCart = async (userId, productId) => {
    try {
      await deleteCartItemAPI(userId, productId);
      removeFromCart(productId);
      // toast removed
    } catch (error) {
      toast.error("Error removing product from cart", { autoClose: 1500 });
      console.error("Error removing item from cart:", error);
    }
  };

  const handlePlaceOrder = () => {
    navigate('/checkout', { state: { totalAmount } });
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar products={products} />
      <div className="container-fluid py-5" style={{ minHeight: '100vh', background: '#fff' }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '800px', borderRadius: '1.5rem', background: '#fff', boxShadow: '0 4px 24px rgba(40,167,69,0.10)' }}>
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#20b2aa' }}>🧾 Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <p className="text-muted fs-5">Your cart is empty.</p>
                <button
                  className="btn mt-3 px-4"
                  style={{ background: '#fff', color: '#20b2aa', border: '1px solid #20b2aa', fontWeight: 600, borderRadius: 8 }}
                  onClick={() => navigate('/Home')}
                >
                  ⬅ Back to Home
                </button>
              </div>
            ) : (
              <div>
                <ul className="list-group mb-4">
                  {cartItems.map((item, index) => (
                    <li
                      key={`${item.id || item.product?.id || index}`}
                      className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                      style={{ borderRadius: '10px', backgroundColor: '#fff', border: '1px solid #e0e0e0', marginBottom: 8 }}
                    >
                      <div className="w-75">
                        <h5 className="mb-1 fw-semibold" style={{ color: '#20b2aa' }}>{item.productName || item.name}</h5>
                        <p className="mb-1" style={{ color: '#666' }}>
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="mb-0 fw-semibold" style={{ color: '#4ade80' }}>
                          Subtotal: ₹{item.price * item.quantity}
                        </p>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        style={{ borderRadius: 8, fontWeight: 600 }}
                        onClick={() => handleRemoveFromCart(user.id, item.id || item.product?.id)}
                      >
                        ❌ Cancel
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                  <h4 className="fw-bold" style={{ color: '#20b2aa' }}>Total:</h4>
                  <h4 className="fw-bold" style={{ color: '#4ade80' }}>₹{totalAmount}</h4>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-lg fw-semibold"
                    onClick={handlePlaceOrder}
                    style={{
                      background: '#20b2aa',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(32,178,170,0.10)'
                    }}
                  >
                    ✅ Place Order &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
