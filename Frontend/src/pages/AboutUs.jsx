import React from 'react';
import Navbar from '../components/Navbar';
import '../css/Home.css';

const AboutUs = () => (
    <div className="home-page" style={{ background: '#f8fff8', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: 700, borderRadius: '1.5rem' }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#20b2aa' }}>About Us</h2>
                <p className="fs-5 mb-3">
                    Welcome to <span style={{ color: '#20b2aa', fontWeight: 600 }}>Grocify</span>! We are passionate about delivering the freshest groceries and best shopping experience to your doorstep. Our mission is to make healthy, quality food accessible and convenient for everyone.
                </p>
                <ul className="fs-6 mb-4">
                    <li>Fresh fruits and vegetables sourced daily</li>
                    <li>Wide range of groceries, dairy, bakery, and more</li>
                    <li>Fast, reliable delivery and easy returns</li>
                    <li>Friendly customer support</li>
                </ul>
                <p className="text-muted">Thank you for choosing Grocify. We look forward to serving you!</p>
            </div>
        </div>
    </div>
);

export default AboutUs;
