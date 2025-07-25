import React from 'react';
import { useNavigate } from 'react-router-dom';
import groceryImage from '../assets/images/Grocery.png';
import './Welcome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      {/* Background Image */}
      <img src={groceryImage} alt="Grocery Background" className="background-img" />

      {/* Overlay (transparent or removed darkness) */}
      <div className="overlay"></div>

      {/* Register Button - Top Right */}
      <button
        className="btn btn-warning fw-semibold register-btn"
        onClick={() => navigate('/register')}
      >
        Register
      </button>

      {/* Centered Bottom Buttons */}
      <div className="d-flex flex-column justify-content-end align-items-center h-100 pb-5 z-2">
        {/* Centered Bottom Buttons */}
        <div className="bottom-buttons d-flex gap-4">
          <button className="btn btn-light px-4 py-2" onClick={() => navigate('/Home')}>
            Guest
          </button>
          <button className="btn btn-light px-4 py-2" onClick={() => navigate('/Login')}>
            User
          </button>
          <button className="btn btn-light px-4 py-2" onClick={() => navigate('/Login')}>
            Admin
          </button>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
