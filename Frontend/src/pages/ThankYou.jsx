import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnimation from '../assets/animations/Done.json';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="mb-3">

          {/* Lottie animation */}
          <Lottie

            animationData={successAnimation}

            autoPlay={true}
            loop={true}
            style={{ height: 150 }}
          />
          <h2 className="text-success mt-2">Order Placed Successfully!</h2>
        </div>

        <p className="mb-4">Thank you for shopping with us. We appreciate your business!</p>

        <button className="btn btn-primary btn-lg" onClick={() => navigate('/Home')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ThankYou;
