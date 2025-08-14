import "../css/Footer.css"
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer-groci">
      <div className="footer-container-groci">
        {/* Column 1: About Store */}
        <div className="footer-section-groci">
          <h3 className="footer-brand-groci">🛒 GROCIFY</h3>
          <p className="footer-description-groci">
            Your one-stop solution for fresh groceries,
            <br />
            delivered quickly and reliably. Quality and satisfaction guaranteed.
          </p>
          <div className="footer-features-groci">
            <div className="feature-item-groci">✓ Fresh Products Daily</div>
            <div className="feature-item-groci">✓ Free Home Delivery</div>
            <div className="feature-item-groci">✓ 24/7 Customer Support</div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section-groci">
          <h4 className="footer-heading-groci">Quick Links</h4>
          <ul className="footer-links-groci">
            <li>
              <Link to="/home" className="footer-link-groci">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/MyOrders" className="footer-link-groci">
                📦 My Orders
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link-groci">
                📞 Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link-groci">
                ℹ️ About Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link-groci">
                🔒 Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-section-groci">
          <h4 className="footer-heading-groci">Categories</h4>
          <ul className="footer-links-groci">
            <li>
              <Link to="/category/fresh" className="footer-link-groci">
                🍎 Fresh Products
              </Link>
            </li>
            <li>
              <Link to="/category/dairy" className="footer-link-groci">
                🧀 Dairy Products
              </Link>
            </li>
            <li>
              <Link to="/category/beverages" className="footer-link-groci">
                ☕ Beverages
              </Link>
            </li>
            <li>
              <Link to="/category/household" className="footer-link-groci">
                🧽 Household
              </Link>
            </li>
            <li>
              <Link to="/category/health" className="footer-link-groci">
                💊 Health & Beauty
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Social */}
        <div className="footer-section-groci">
          <h4 className="footer-heading-groci">Get In Touch</h4>
          <div className="contact-info-groci">
            <div className="contact-item-groci">
              <FaEnvelope className="contact-icon-groci" />
              <span>help@grocifyinfo.com</span>
            </div>
            <div className="contact-item-groci">
              <FaPhone className="contact-icon-groci" />
              <span>+91 80808080</span>
            </div>
            <div className="contact-item-groci">
              <FaMapMarkerAlt className="contact-icon-groci" />
              <span>Pune, India</span>
            </div>
          </div>

          <h5 className="social-heading-groci">Follow Us</h5>
          <div className="social-icons-groci">
            <a
              href="https://www.facebook.com/sunbeamgroup/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-groci facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/siitofficial/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-groci instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/siitofficial?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-groci twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>



      {/* Bottom Line */}
      <div className="footer-bottom-groci">
        <div className="footer-bottom-container-groci">
          <p className="copyright-groci">
            © {new Date().getFullYear()} GROCIFY All rights reserved. |
            <span className="footer-tagline-groci"> Fresh • Fast • Reliable</span>
          </p>
          <div className="payment-methods-groci">
            <span className="payment-text-groci">We Accept:</span>
            <div className="payment-icons-groci">
              <span className="payment-icon-groci">💳</span>
              <span className="payment-icon-groci">🏦</span>
              <span className="payment-icon-groci">📱</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
