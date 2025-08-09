"use client"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import "../css/Welcome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import martImg from "../assets/mart.png";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Home");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Section: Text */}
        <div className="welcome-left">
          <motion.div
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <ShoppingCart className="logo-icon" />
            <span className="logo-text">Grocify</span>
          </motion.div>

          <motion.span
            className="tag-badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Grocery Delivery Service
          </motion.span>

          <motion.h1
            className="headline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Make healthy life with{" "}
            <span className="highlight">fresh</span> grocery
          </motion.h1>

          <motion.p
            className="sub-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Get the best quality and most delicious grocery food in the world,
            you can get them all using our website.
          </motion.p>

          <motion.button
            className="btn shop-btn"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/Home")}
          >
            Shop Now
          </motion.button>
        </div>

        {/* Right Section: Image */}
        <motion.div
          className="welcome-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <img
            src={martImg}
            alt="Fresh Vegetables"
            className="welcome-image"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
