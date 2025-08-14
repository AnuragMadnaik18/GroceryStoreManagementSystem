import React from 'react';
import Navbar from '../components/Navbar';
import '../css/Home.css';

const PrivacyPolicy = () => (
    <div className="home-page" style={{ background: '#f8fff8', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: 800, borderRadius: '1.5rem' }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#20b2aa' }}>Privacy Policy</h2>
                <p className="fs-5 mb-3">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use Grocify.
                </p>
                <ul className="fs-6 mb-4">
                    <li>We only collect information necessary to process your orders and improve your experience.</li>
                    <li>Your data is never sold or shared with third parties except as required for order fulfillment.</li>
                    <li>All transactions are secured with industry-standard encryption.</li>
                    <li>You can contact us anytime to review or delete your data.</li>
                </ul>
                <p className="text-muted">By using Grocify, you agree to this privacy policy. We may update it from time to time, so please review it regularly.</p>
            </div>
        </div>
    </div>
);

export default PrivacyPolicy;
