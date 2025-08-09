
import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';


const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Footer on Welcome and Thank You pages
  const hideFooter = location.pathname === '/' || location.pathname === '/ThankYou';
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
