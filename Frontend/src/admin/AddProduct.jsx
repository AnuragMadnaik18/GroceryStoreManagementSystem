import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../services/config';
import '../css/AddProduct.css';

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
        } else {
            await axios.post(`${config.serverUrl}/products`, {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            });
        }
        setFormData({ name: '', description: '', price: '', stock: '', category: '' });
        setImage(null);
        setPreview(null);
        onProductAdded();
    };

    const categories = [
        'FRESHPRODUCTS', 'DAIRY', 'BAKERY', 'FROZENFOOD', 'PACKAGEDFOOD', 'BEVERAGES', 'HEALTHNBEAUTY', 'HOUSEHOLD', 'PETFOOD'
    ];

    return (
        <div className="add-product-card mx-auto">
            <div className="add-product-header">
                <h4 className="add-product-title">{editData ? 'Edit Product' : 'Add Product'}</h4>
            </div>
            <div className="add-product-form">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter product name" required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows={2} placeholder="Enter product description" required />
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="form-control" placeholder="Price" required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Quantity In Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="form-control" placeholder="Quantity" required />
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
                        <label className="form-label">Product Image</label>
                        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
                        {preview && (
                            <div className="add-product-image-preview">
                                <img src={preview} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{editData ? 'Update Product' : 'Add Product'}</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
