import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import UserDetails from './user/UserDetails';
import Dashboard from './admin/Dashboard';
// import UserLogin from './user/UserLogin';
import UserRegistration from './user/UserRegistration';
import UserLogin from './user/UserLogin';
import Home from './pages/Home';
// import AdminLogin from './admin/AdminLogin';
import ProductDetail from './pages/ProductDetail';
import OrderSummaryPage from './pages/OrderSummaryPage';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

import { CartProvider } from './store/CartContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Routes WITHOUT Layout */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegistration />} />

        {/* Routes WITH Layout */}
        <Route path="/" element={<Layout><Welcome /></Layout>} />
        <Route path="/user/details" element={<Layout><UserDetails /></Layout>} />
        <Route path="/Home" element={<Layout><Home /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/summary" element={<Layout><OrderSummaryPage /></Layout>} />
        <Route path="/payment" element={<Layout><Payment /></Layout>} />
        <Route path="/MyOrders" element={<Layout><MyOrders /></Layout>} />
        <Route path="/ThankYou" element={<Layout><ThankYou /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
      </Routes>

      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
