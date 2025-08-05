import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../services/config';

const ProductList = ({ refresh, onEdit }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const fetchProducts = async () => {
        const res = await axios.get(`${config.serverUrl}/products`);
        setProducts(res.data);
        setCurrentPage(1);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${config.serverUrl}/products/${id}`);
        fetchProducts();
    };

    // Pagination logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '900px', marginTop: '40px' }}>
            <div className="card-body">
                <h3 className="card-title mb-4 text-center">Product List</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">No products found.</td>
                                </tr>
                            ) : (
                                paginatedProducts.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            {localStorage.getItem('product_img_' + p.name) ? (
                                                <img src={localStorage.getItem('product_img_' + p.name)} alt={p.name} style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: '6px' }} />
                                            ) : (
                                                <span className="text-muted">No image</span>
                                            )}
                                        </td>
                                        <td>{p.name}</td>
                                        <td>{p.description}</td>
                                        <td>${p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.category}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() => onEdit && onEdit(p)}>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteProduct(p.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <nav className="mt-3">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            </li>
                            {[...Array(totalPages)].map((_, idx) => (
                                <li key={idx + 1} className={`page-item${currentPage === idx + 1 ? ' active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default ProductList;
