import axios from 'axios'; // <-- Add this import
import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../services/config';

const usersPerPage = 5;

const Dashboard = () => {
    const handleProductAdded = () => {
        setRefreshList(!refreshList);
        setActiveTab('list');
    };
    const [activeTab, setActiveTab] = useState('home');
    const [refreshList, setRefreshList] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [users, setUsers] = useState([]);
    const [usersPage, setUsersPage] = useState(1);
    const [usersTotalPages, setUsersTotalPages] = useState(1);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const url = `${config.serverUrl}/user`;
        axios.get(url)
            .then(res => {
                setUsers(res.data);
                setUsersTotalPages(Math.ceil(res.data.length / usersPerPage));
            })
            .catch(() => {
                setUsers([]);
                setUsersTotalPages(1);
            });
    }, []);

    useEffect(() => {
        if (activeTab === 'orders') {
            axios.get(`${config.serverUrl}/orders`)
                .then(res => setOrders(res.data))
                .catch(() => toast.error('Failed to fetch orders.'));
        }
    }, [activeTab]);

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`${config.serverUrl}/orders/${orderId}`, { status: newStatus })
            .then(() => {
                toast.success('Order status updated!');
                setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
            })
            .catch(() => toast.error('Failed to update order status.'));
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setActiveTab('edit');
    };


    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`${config.serverUrl}/user/${userId}`)
                .then(() => {
                    toast.success('User deleted successfully!');
                    // Remove user from local state
                    setUsers(users.filter(u => u.id !== userId));
                    // Update total pages if needed
                    const newTotalPages = Math.max(1, Math.ceil((users.length - 1) / usersPerPage));
                    setUsersTotalPages(newTotalPages);
                    // If current page is now empty, go to previous page
                    if ((usersPage - 1) * usersPerPage >= users.length - 1 && usersPage > 1) {
                        setUsersPage(usersPage - 1);
                    }
                })
                .catch(() => {
                    toast.error('Failed to delete user.');
                });
        }
    };

    const handleEditDone = () => {
        setEditProduct(null);
        setRefreshList(!refreshList);
        setActiveTab('list');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
            <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
                <div className="bg-dark text-white p-3" style={{ width: '220px' }}>
                    <h3 className="mb-4">Dashboard</h3>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'home' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('home'); setEditProduct(null); }}>Home</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'add' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('add'); setEditProduct(null); }}>Add Product</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'list' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('list'); setEditProduct(null); }}>Product List</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'settings' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('settings'); setEditProduct(null); }}>Settings</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'reports' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('reports'); setEditProduct(null); }}>Reports</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'users' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('users'); setEditProduct(null); }}>Users</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link text-white ${activeTab === 'orders' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('orders'); setEditProduct(null); }}>Orders</button>
                        </li>


                        <li className="nav-item mt-4">
                            <button className="btn btn-outline-light w-100" onClick={() => {
                                localStorage.removeItem('isAdmin');
                                toast.info('Logged out successfully!');
                                setTimeout(() => { window.location.href = '/Home'; }, 1200);
                            }}>Logout</button>
                        </li>
                    </ul>
                </div>
                <div className="flex-grow-1 p-4">
                    {activeTab === 'home' && (
                        <div>
                            <div className="row g-4 mb-4">
                                <div className="col-md-3">
                                    <div className="card text-center shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">Customers</h5>
                                            <p className="display-6">120</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">Daily Traffic</h5>
                                            <p className="display-6">350</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Profit</h5>
                                            <p className="display-6">₹ 50,000</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card text-center shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Sale</h5>
                                            <p className="display-6">₹ 2,00,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 mb-4">
                                <div className="col-md-8">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <div className="mt-3 text-muted">Last 7 days: ₹ 12,000</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">Quick Links</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('add')}>+ Add New Product</a></li>
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('list')}>View Products</a></li>
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('users')}>Manage Users</a></li>
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('reports')}>View Reports</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'add' && <AddProduct onProductAdded={handleProductAdded} />}
                    {activeTab === 'list' && <ProductList refresh={refreshList} onEdit={handleEdit} />}
                    {activeTab === 'edit' && editProduct && <AddProduct onProductAdded={handleEditDone} editData={editProduct} />}
                    {activeTab === 'settings' && (
                        <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px', marginTop: '40px' }}>
                            <div className="card-body">
                                <h4 className="mb-4 text-center">Settings</h4>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Change Admin Password</label>
                                        <input type="password" className="form-control" placeholder="New Password" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Update Profile Email</label>
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <button type="button" className="btn btn-primary w-100">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === 'reports' && (
                        <div className="card shadow-sm mx-auto" style={{ maxWidth: '900px', marginTop: '40px' }}>
                            <div className="card-body">
                                <h4 className="mb-4 text-center">Sales Report</h4>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Date</th>
                                                <th>Product</th>
                                                <th>Quantity Sold</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>2025-07-25</td><td>Apple</td><td>20</td><td>₹400</td></tr>
                                            <tr><td>2025-07-25</td><td>Milk</td><td>10</td><td>₹250</td></tr>
                                            <tr><td>2025-07-24</td><td>Bread</td><td>15</td><td>₹300</td></tr>
                                            <tr><td>2025-07-24</td><td>Rice</td><td>8</td><td>₹320</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'users' && (
                        <div className="card shadow-sm mx-auto" style={{ maxWidth: '900px', marginTop: '40px' }}>
                            <div className="card-body">
                                <h4 className="mb-4 text-center">Users</h4>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage).map((u, idx) => (
                                                <tr key={u.id || idx}>
                                                    <td>{u.id}</td>
                                                    <td>{u.fullName}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.phoneNumber}</td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                                {/* Pagination Controls */}
                                {usersTotalPages > 1 && (
                                    <nav className="mt-3">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item${usersPage === 1 ? ' disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setUsersPage(usersPage - 1)} disabled={usersPage === 1}>Previous</button>
                                            </li>
                                            {[...Array(usersTotalPages)].map((_, idx) => (
                                                <li key={idx + 1} className={`page-item${usersPage === idx + 1 ? ' active' : ''}`}>
                                                    <button className="page-link" onClick={() => setUsersPage(idx + 1)}>{idx + 1}</button>
                                                </li>
                                            ))}
                                            <li className={`page-item${usersPage === usersTotalPages ? ' disabled' : ''}`}>
                                                <button className="page-link" onClick={() => setUsersPage(usersPage + 1)} disabled={usersPage === usersTotalPages}>Next</button>
                                            </li>
                                        </ul>
                                    </nav>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'orders' && (
                        <div className="card shadow-sm mx-auto" style={{ maxWidth: '900px', marginTop: '40px' }}>
                            <div className="card-body">
                                <h4 className="mb-4 text-center">Orders</h4>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Username</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, idx) => (
                                                <tr key={order.orderId || idx}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.userName}</td>
                                                    <td>{order.orderDate}</td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                                        >
                                                            <option value="PENDING">PENDING</option>
                                                            <option value="SHIPPED">SHIPPED</option>
                                                            <option value="DELIVERED">DELIVERED</option>
                                                        </select>
                                                    </td>
                                                    <td>₹{order.totalPrice}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Footer for all pages except login */}
            <footer className="bg-dark text-white text-center py-4 mt-auto" style={{ fontSize: '1rem' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <h5>Grocify</h5>
                            <p>Your one-stop shop for daily groceries and essentials.</p>
                        </div>
                        <div className="col-md-4 mb-2 mb-md-0">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Home</a></li>
                                <li><a href="#" className="text-white">Products</a></li>
                                <li><a href="#" className="text-white">Users</a></li>
                                <li><a href="#" className="text-white">Reports</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact & Social</h5>
                            <p>Email: <a href="mailto:info@grocify.com" className="text-white">info@grocify.com</a></p>
                            <div>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white"><i className="fab fa-facebook fa-lg"></i></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white"><i className="fab fa-twitter fa-lg"></i></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white"><i className="fab fa-instagram fa-lg"></i></a>
                                <a href="mailto:info@smartmart.com" className="mx-2 text-white"><i className="fas fa-envelope fa-lg"></i></a>
                            </div>
                            <div className="mt-2">App ID: <span className="badge bg-primary">Grocify2025</span></div>
                        </div>
                    </div>
                    <hr className="bg-secondary" />
                    <div>&copy; {new Date().getFullYear()} Smart Mart. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

export default Dashboard;
