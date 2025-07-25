import React, { useEffect, useState } from 'react';
import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [qrUrl, setQrUrl] = useState('');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const upiId = 'anuragmadnaik2002@oksbi';
    const payeeName = 'Anurag';
    const amount = totalAmount.toFixed(2);

    const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      upiLink
    )}&size=200x200`;

    setQrUrl(qrImageUrl);
  }, [totalAmount]);

  const handlePaymentComplete = () => {
    clearCart();
    navigate('/ThankYou');
  };

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Complete Your Payment</h2>

        <p className="text-center lead mb-3">
          Scan the QR code using Google Pay or any UPI app to pay ₹{totalAmount}.
        </p>

        {qrUrl && (
          <div className="d-flex justify-content-center mb-4">
            <img
              src={qrUrl}
              alt="Google Pay QR"
              style={{ width: '200px', height: '200px' }}
              className="border rounded"
            />
          </div>
        )}

        <h4 className="text-center mb-4">Total Amount: ₹{totalAmount}</h4>

        <p className="text-center text-muted">
          Once you've completed the payment, click the button below.
        </p>

        <div className="d-grid">
          <button className="btn btn-success btn-lg" onClick={handlePaymentComplete}>
            I’ve Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
