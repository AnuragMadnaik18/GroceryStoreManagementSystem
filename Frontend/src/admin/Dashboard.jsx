// ...existing code...
import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaBoxOpen, FaMoneyBillWave, FaShoppingCart, FaPlus, FaUserCircle } from 'react-icons/fa';
import { getOrderDetailsByOrderId } from '../services/MyOrders';

import AddProduct from './AddProduct';
import ProductList from './ProductList';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../css/AdminDashboard.css';
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
    const [products, setProducts] = useState([]);
    const [orderDetailsMap, setOrderDetailsMap] = useState({});
    // Fetch all products on mount and when refreshList changes (for stats)
    useEffect(() => {
        axios.get(`${config.serverUrl}/products`)
            .then(res => setProducts(res.data))
            .catch(() => setProducts([]));
    }, [refreshList]);


    // Fetch users on mount
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

    // Fetch all orders and their details on mount (for stats)
    useEffect(() => {
        const fetchOrdersAndDetails = async () => {
            try {
                const res = await axios.get(`${config.serverUrl}/orders`);
                setOrders(res.data);
                // Fetch order details for each order
                const detailsMap = {};
                for (const order of res.data) {
                    try {
                        const detailsRes = await getOrderDetailsByOrderId(order.orderId);
                        detailsMap[order.orderId] = detailsRes.data;
                    } catch (err) {
                        detailsMap[order.orderId] = [];
                    }
                }
                setOrderDetailsMap(detailsMap);
            } catch (err) {
                toast.error('Failed to fetch orders.', { autoClose: 1500 });
            }
        };
        fetchOrdersAndDetails();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`${config.serverUrl}/orders/${orderId}`, { status: newStatus })
            .then(() => {
                setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
            })
            .catch(() => toast.error('Failed to update order status.', { autoClose: 1500 }));
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setActiveTab('edit');
    };


    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`${config.serverUrl}/user/${userId}`)
                .then(() => {
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
                    toast.error('Failed to delete user.', { autoClose: 1500 });
                });
        }
    };

    const handleEditDone = () => {
        setEditProduct(null);
        setRefreshList(!refreshList);
        setActiveTab('list');
    };

    return (
        <div className="admin-dashboard-page">
            <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
                <div className="admin-dashboard-sidebar p-3" style={{ width: '240px' }}>
                    <h3 className="mb-4" style={{ fontWeight: 700, letterSpacing: 1 }}>Dashboard</h3>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'home' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('home'); setEditProduct(null); }}>Home</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'add' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('add'); setEditProduct(null); }}>Add Product</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'list' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('list'); setEditProduct(null); }}>Product List</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'reports' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('reports'); setEditProduct(null); }}>Reports</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'users' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('users'); setEditProduct(null); }}>Users</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'orders' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('orders'); setEditProduct(null); }}>Orders</button>
                        </li>
                        <li className="nav-item mb-2">
                            <button className={`btn btn-link ${activeTab === 'settings' ? 'fw-bold' : ''}`} onClick={() => { setActiveTab('settings'); setEditProduct(null); }}>Settings</button>
                        </li>
                        <li className="nav-item mt-4">
                            <button className="admin-dashboard-logout" onClick={() => {
                                localStorage.removeItem('isAdmin');
                                setTimeout(() => { window.location.href = '/Home'; }, 1200);
                            }}>Logout</button>
                        </li>
                    </ul>
                </div>
                <div className="flex-grow-1 p-4">
                    {activeTab === 'home' && (
                        <div>
                            {/* Gradient Banner & Profile */}
                            <div style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #38c6ff 100%)', borderRadius: '18px', padding: '32px 32px 24px 32px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 24px rgba(60,72,88,0.10)' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaUserCircle size={54} color="#fff" style={{ marginRight: 18 }} />
                                    <div>
                                        <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>Hi, Admin!</div>
                                        <div style={{ color: '#e0e7ef', fontSize: 15 }}>Welcome to your dashboard</div>
                                    </div>
                                </div>
                                <button className="btn btn-light d-flex align-items-center" style={{ borderRadius: 22, fontWeight: 600, fontSize: 17 }} onClick={() => setActiveTab('add')}>
                                    <FaPlus style={{ marginRight: 8 }} /> Add Product
                                </button>
                            </div>
                            {/* Stats Cards */}
                            <div className="row g-4 mb-4">
                                <div className="col-md-3">
                                    <div className="admin-dashboard-card card text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', borderLeft: '6px solid #4f8cff' }}>
                                        <div className="card-body">
                                            <FaUserFriends size={32} color="#4f8cff" className="mb-2" />
                                            <h5 className="card-title mt-2">Customers</h5>
                                            <p className="display-6">{users.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="admin-dashboard-card card text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', borderLeft: '6px solid #38c6ff' }}>
                                        <div className="card-body">
                                            <FaShoppingCart size={32} color="#38c6ff" className="mb-2" />
                                            <h5 className="card-title mt-2">Daily Traffic</h5>
                                            <p className="display-6">350</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="admin-dashboard-card card text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', borderLeft: '6px solid #20b2aa' }}>
                                        <div className="card-body">
                                            <FaBoxOpen size={32} color="#20b2aa" className="mb-2" />
                                            <h5 className="card-title mt-2">Products</h5>
                                            <p className="display-6">{products.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="admin-dashboard-card card text-center shadow-sm" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', borderLeft: '6px solid #ffb347' }}>
                                        <div className="card-body">
                                            <FaMoneyBillWave size={32} color="#ffb347" className="mb-2" />
                                            <h5 className="card-title mt-2">Total Sale</h5>
                                            <p className="display-6">₹ {orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Quick Links */}
                            <div className="row g-4 mb-4">
                                <div className="col-md-8">
                                    <div className="admin-dashboard-card card shadow-sm">
                                        <div className="card-body">
                                            <div className="mt-3 text-muted">Last 7 days: ₹ 12,000</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="admin-dashboard-card card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">Quick Links</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('add')}><FaPlus style={{ marginRight: 6 }} /> Add New Product</a></li>
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('list')}><FaBoxOpen style={{ marginRight: 6 }} /> View Products</a></li>
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('users')}><FaUserFriends style={{ marginRight: 6 }} /> Manage Users</a></li>
                                                <li className="list-group-item"><a href="#" onClick={() => setActiveTab('reports')}><FaMoneyBillWave style={{ marginRight: 6 }} /> View Reports</a></li>
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
                        <div className="card shadow-sm mx-auto" style={{ maxWidth: '1100px', marginTop: '40px' }}>
                            <div className="card-body">
                                <h4 className="mb-4 text-center">Sales & Orders Report</h4>
                                {/* Summary */}
                                <div className="row mb-4 text-center">
                                    <div className="col-md-3"><div className="p-2"><b>Total Orders:</b> {orders.length}</div></div>
                                    <div className="col-md-3"><div className="p-2"><b>Total Revenue:</b> ₹ {orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0).toLocaleString()}</div></div>
                                    <div className="col-md-3"><div className="p-2"><b>Unique Products Sold:</b> {Array.from(new Set(orders.flatMap(o => (orderDetailsMap[o.orderId] || []).map(d => d.productName)))).length}</div></div>
                                    <div className="col-md-3"><div className="p-2"><b>Customers:</b> {users.length}</div></div>
                                </div>
                                {/* Order Status Breakdown */}
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <b>Order Status Breakdown:</b>
                                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                            {['PENDING', 'SHIPPED', 'DELIVERED'].map(status => (
                                                <li key={status} style={{ color: status === 'DELIVERED' ? 'green' : status === 'PENDING' ? '#f39c12' : '#3498db', fontWeight: 500 }}>
                                                    {status}: {orders.filter(o => o.status === status).length}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <b>Top Selling Products:</b>
                                        <ol style={{ paddingLeft: 18 }}>
                                            {Object.entries(
                                                orders.flatMap(o => orderDetailsMap[o.orderId] || [])
                                                    .reduce((acc, d) => {
                                                        acc[d.productName] = (acc[d.productName] || 0) + (d.quantity || 0);
                                                        return acc;
                                                    }, {})
                                            )
                                                .sort((a, b) => b[1] - a[1])
                                                .slice(0, 5)
                                                .map(([name, qty]) => (
                                                    <li key={name}>{name} <span style={{ color: '#888' }}>({qty})</span></li>
                                                ))}
                                        </ol>
                                    </div>
                                </div>
                                {/* Sales Table */}
                                <div className="table-responsive mb-3">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Date</th>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Status</th>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.flatMap(order =>
                                                (orderDetailsMap[order.orderId] || []).map((d, idx) => (
                                                    <tr key={order.orderId + '-' + idx}>
                                                        <td>{order.orderDate}</td>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.userName}</td>
                                                        <td>{order.status}</td>
                                                        <td>{d.productName}</td>
                                                        <td>{d.quantity}</td>
                                                        <td>₹{d.price}</td>
                                                        <td>₹{(d.price * d.quantity).toLocaleString()}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* CSV Export */}
                                <button className="btn btn-outline-primary" onClick={() => {
                                    const rows = [
                                        ['Date', 'Order ID', 'Customer', 'Status', 'Product', 'Quantity', 'Unit Price', 'Total'],
                                        ...orders.flatMap(order =>
                                            (orderDetailsMap[order.orderId] || []).map(d => [
                                                order.orderDate,
                                                order.orderId,
                                                order.userName,
                                                order.status,
                                                d.productName,
                                                d.quantity,
                                                d.price,
                                                d.price * d.quantity
                                            ])
                                        )
                                    ];
                                    const csv = rows.map(r => r.join(',')).join('\n');
                                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'sales_report.csv';
                                    document.body.appendChild(a);
                                    a.click();
                                    setTimeout(() => {
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }, 0);
                                }}>Download as CSV</button>
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
            {/* No footer for admin side */}
        </div>
    );
}

export default Dashboard;
