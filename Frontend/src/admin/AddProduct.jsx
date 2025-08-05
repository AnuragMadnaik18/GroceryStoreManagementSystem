import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../services/config';

const AddProduct = ({ onProductAdded, editData }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || '',
                description: editData.description || '',
                price: editData.price || '',
                stock: editData.stock || '',
                category: editData.category || ''
            });
            // Load image from localStorage if exists
            const img = localStorage.getItem('product_img_' + (editData.name || ''));
            setPreview(img || null);
        } else {
            setFormData({ name: '', description: '', price: '', stock: '', category: '' });
            setPreview(null);
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (preview) {
            localStorage.setItem('product_img_' + formData.name, preview);
        }
        if (editData && editData.id) {
            await axios.put(`${config.serverUrl}/products/${editData.id}`, {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            });
            alert('Product updated successfully!');
        } else {
            await axios.post(`${config.serverUrl}/products`, {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            });
            alert('Product added successfully!');
        }
        setFormData({ name: '', description: '', price: '', stock: '', category: '' });
        setImage(null);
        setPreview(null);
        onProductAdded();
    };

    const categories = [
        'FRESHPRODUCTS','DAIRY','BAKERY', 'FROZENFOOD', 'PACKAGEDFOOD', 'BEVERAGES', 'HEALTHNBEAUTY', 'HOUSEHOLD', 'PETFOOD'
    ];

    return (
        <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '520px', marginTop: '48px', background: '#fff' }}>
            <div className="card-header bg-primary text-white text-center py-3 rounded-top">
                <h4 className="mb-0">{editData ? 'Edit Product' : 'Add Product'}</h4>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control form-control-lg" placeholder="Enter product name" required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control form-control-lg" rows={2} placeholder="Enter product description" required />
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Price</label>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="form-control form-control-lg" placeholder="Price" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Quantity In Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form-control form-control-lg" placeholder="Quantity" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Product Image</label>
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
                        {preview && (
                            <div className="mt-3 text-center">
                                <img src={preview} alt="Preview" style={{ maxWidth: '180px', maxHeight: '180px', borderRadius: '8px', boxShadow: '0 0 8px #ccc' }} />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fs-5">{editData ? 'Update Product' : 'Add Product'}</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
