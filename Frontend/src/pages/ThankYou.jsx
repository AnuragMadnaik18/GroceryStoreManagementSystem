
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnimation from '../assets/animations/Done.json';
import Navbar from '../components/Navbar';
import '../css/ThankYou.css';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-page">
      <Navbar />
      <div className="container">
        <div className="thankyou-card">
          <div className="thankyou-animation">
            <Lottie
              animationData={successAnimation}
              autoPlay={true}
              loop={true}
              style={{ height: 150 }}
            />
          </div>
          <h2 className="thankyou-title">Order Placed Successfully!</h2>
          <p className="thankyou-message">Thank you for shopping with us. We appreciate your business!</p>
          <button className="thankyou-btn" onClick={() => navigate('/Home')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
