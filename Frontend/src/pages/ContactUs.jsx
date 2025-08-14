import React from 'react';
import Navbar from '../components/Navbar';
import '../css/Home.css';

const ContactUs = () => (
    <div className="home-page" style={{ background: '#f8fff8', minHeight: '100vh' }}>
        <Navbar />
        <div className="container py-5">
            <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: 600, borderRadius: '1.5rem' }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#20b2aa' }}>Contact Us</h2>
                <p className="text-center mb-4">We'd love to hear from you! Reach out with any questions, feedback, or support needs.</p>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="you@example.com" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows={4} placeholder="Type your message here..." />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success" style={{ background: '#20b2aa', border: 'none' }}>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

export default ContactUs;
