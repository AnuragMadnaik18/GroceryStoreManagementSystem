import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Column 1: About Store */}
                <div className="footer-section">
                    <h3>Super Market</h3>
                    <p>Your one-stop solution for fresh groceries,<br /> delivered quickly and reliably. Quality and satisfaction guaranteed.</p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li> Home</li>
                        <li>Categories</li>
                        <li>My Orders</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@supermarket.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Location: Pune, India</p>
                </div>

                {/* Column 4: Social Media */}
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaTwitter />
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} SuperMarket. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
