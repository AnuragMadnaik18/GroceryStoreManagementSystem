import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminDashboard from './pages/AdminDashboard';
import UserRegistration from './pages/UserRegistration';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import OrderSummaryPage from './pages/OrderSummaryPage';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';

import { CartProvider } from './store/CartContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';

function AppContent() {
  const location = useLocation();
  const noFooterPaths = ['/login', '/register', '/ThankYou', '/'];

  const isFooterVisible = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Pages without footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ThankYou" element={<ThankYou />} />
        <Route path="/" element={<Welcome />} />

        {/* Pages with footer */}
        <Route
          path="/"
          element={
            <Layout>
              <Welcome />
            </Layout>
          }
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/registration" element={<UserRegistration />} />
        <Route
          path="/Home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/summary"
          element={
            <Layout>
              <OrderSummaryPage />
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />
        <Route
          path="/ThankYou"
          element={
            <Layout>
              <ThankYou />
            </Layout>
          }
        />
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
