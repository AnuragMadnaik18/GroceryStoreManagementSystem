import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { placeOrder } from "../services/order";
import { addOrderDetails } from "../services/payment";
import { saveCheckout } from "../services/checkout";
import { clearCartAPI } from "../services/cart";
import { toast } from "react-toastify";
import "../css/Checkout.css";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        email: "",
        notes: ""
    });
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            toast.error("Please select a payment method.", { autoClose: 1500 });
            return;
        }
        if (paymentMethod === "online") {
            navigate("/payment", { state: { totalAmount, ...formData } });
        } else if (paymentMethod === "cod") {
            // Place order directly
            if (!user?.id) {
                toast.error("Please log in before placing an order.", { autoClose: 1500 });
                return;
            }
            try {
                // Save checkout info first
                // Automatically get userId from sessionStorage
                const userId = user && user.id;
                await saveCheckout(userId, formData);
                // Place order (without checkout fields)
                const orderData = {
                    orderDate: new Date().toISOString().split('T')[0],
                    status: "PENDING",
                    totalPrice: totalAmount,
                    userId: user.id
                };
                const orderRes = await placeOrder(orderData);
                const orderId = orderRes.data?.orderId || orderRes.orderId;
                const detailItems = cartItems.map((item) => ({
                    orderId,
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }));
                await addOrderDetails(detailItems);
                await clearCartAPI(user.id);
                clearCart();
                toast.success("Order placed successfully!", { autoClose: 1500 });
                navigate("/ThankYou");
            } catch (error) {
                toast.error("Order placement failed.", { autoClose: 1500 });
            }
        }
    };

    return (
        <div className="checkout-page">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="checkout-form bg-white p-4 rounded shadow-sm mb-4">
                            <h2 className="mb-4">Checkout</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" name="address" placeholder="Street address" value={formData.address} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Zip Code</label>
                                        <input type="text" className="form-control" name="zip" placeholder="Zip code" value={formData.zip} onChange={handleChange} required />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input type="tel" className="form-control" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Order Notes (optional)</label>
                                        <textarea className="form-control" name="notes" rows="3" placeholder="Notes about your order, e.g. special notes for delivery." value={formData.notes} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Payment Method</label>
                                    <div className="d-flex gap-3">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="cod"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={() => setPaymentMethod("cod")}
                                            />
                                            <label className="form-check-label" htmlFor="cod">
                                                Cash on Delivery
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="online"
                                                value="online"
                                                checked={paymentMethod === "online"}
                                                onChange={() => setPaymentMethod("online")}
                                            />
                                            <label className="form-check-label" htmlFor="online">
                                                Online Payment
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success w-100 py-2 mt-2">Place Order</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="order-summary bg-white p-4 rounded shadow-sm">
                            <h4 className="mb-3">Your Order</h4>
                            {cartItems.length === 0 ? (
                                <div className="text-muted">Your cart is empty.</div>
                            ) : (
                                <>
                                    {cartItems.map((item) => (
                                        <div className="d-flex justify-content-between mb-2" key={item.id}>
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold">
                                        <span>Total</span>
                                        <span>₹{totalAmount}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
