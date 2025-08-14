
import React, { useEffect, useState } from 'react';
import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import { placeOrder, addOrderDetails } from '../services/payment';
import { clearCartAPI } from '../services/cart';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Payment.css';

const Payment = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [qrUrl, setQrUrl] = useState('');
  const location = useLocation();
  const routeTotal = location.state?.totalAmount;

  const totalAmount = routeTotal || cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const upiId = 'anuragmadnaik2002@oksbi';
    const upiLink = `upi://pay?pa=${upiId}&pn=Anurag&am=${totalAmount.toFixed(
      2
    )}&cu=INR`;
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        upiLink
      )}&size=200x200`
    );
  }, [totalAmount]);

  const handlePaymentComplete = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user?.id) {
      toast.error('Please log in before placing an order.', { autoClose: 1500 });
      return;
    }

    const orderData = {
      orderDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      totalPrice: totalAmount,
      userId: user.id
    };

    try {
      const orderRes = await placeOrder(orderData);
      const orderId = orderRes.data.orderId;

      const detailItems = cartItems.map((item) => ({
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      await addOrderDetails(detailItems);

      // Clear cart in backend
      await clearCartAPI(user.id);
      // Clear cart in frontend state
      clearCart();
      toast.success('Order placed successfully!', { autoClose: 1500 });
      navigate('/ThankYou');
    } catch (error) {
      toast.error('Payment failed or server error.', { autoClose: 1500 });
    }
  };

  return (
    <div className="payment-page">
      <Navbar />
      <div className="container">
        <div className="payment-card">
          <h2 className="payment-title">Complete Your Payment</h2>
          <p className="lead text-center mb-3">Scan the QR code using Google Pay or any UPI app to pay <span style={{ color: '#28a745', fontWeight: 600 }}>₹{totalAmount}</span>.</p>
          {qrUrl && (
            <div className="payment-qr">
              <img
                src={qrUrl}
                alt="Google Pay QR"
                style={{ width: '200px', height: '200px', borderRadius: '1rem', border: '1px solid #e9ecef' }}
              />
            </div>
          )}
          <div className="payment-amount">Total Amount: ₹{totalAmount}</div>
          <p className="payment-note">Once you've completed the payment, click the button below.</p>
          <button className="payment-btn btn btn-lg btn-block" onClick={handlePaymentComplete}>
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
