import React from "react";
import "../css/Footer.css"; 
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1: About Store */}
        <div className="footer-section">
          <h3>Grocify</h3>
          <p>Your one-stop solution for fresh groceries,<br /> delivered quickly and reliably. Quality and satisfaction guaranteed.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/home" className="footer-link">Home</Link></li>
            <li><Link to="/MyOrders" className="footer-link">My Orders</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: anuragmadnaik18@gmail.com</p>
          <p>Phone: +91 9075259966</p>
          <p>Location: Kolhapur, India</p>
        </div>

        {/* Column 4: Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/sunbeamgroup/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/siitofficial/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com/siitofficial?lang=en" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Grocify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
