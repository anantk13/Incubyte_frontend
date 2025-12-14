/**
 * Admin Panel Component
 * 
 * Admin-only page for managing sweet inventory
 * Add, delete, and restock sweets
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './AdminPanel.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminPanel = () => {
    const { user } = useAuth();
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form state for adding new sweet
    const [formData, setFormData] = useState({
        name: '',
        category: 'Chocolate',
        price: '',
        quantity: '',
        description: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const categories = ['Chocolate', 'Candy', 'Gummy', 'Lollipop', 'Hard Candy', 'Soft Candy', 'Other'];

    /**
     * Fetch all sweets
     */
    const fetchSweets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/sweets`);
            if (response.data.success) {
                setSweets(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching sweets:', err);
            setError('Failed to load sweets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    /**
     * Handle form input change
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /**
     * Handle add sweet form submission
     */
    const handleAddSweet = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!formData.name || !formData.price || !formData.quantity) {
            setError('Please fill in all required fields');
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            setError('Price must be greater than 0');
            return;
        }

        if (parseInt(formData.quantity) < 0) {
            setError('Quantity cannot be negative');
            return;
        }

        try {
            setSubmitting(true);

            const response = await axios.post(`${API_URL}/sweets`, {
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                description: formData.description,
            });

            if (response.data.success) {
                setSuccess('Sweet added successfully!');
                // Reset form
                setFormData({
                    name: '',
                    category: 'Chocolate',
                    price: '',
                    quantity: '',
                    description: '',
                });
                // Refresh sweets list
                fetchSweets();
                setTimeout(() => setSuccess(null), 3000);
            }
        } catch (err) {
            console.error('Add sweet error:', err);
            setError(err.response?.data?.message || 'Failed to add sweet');
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Handle delete sweet
     */
    const handleDeleteSweet = async (sweetId, sweetName) => {
        if (!window.confirm(`Are you sure you want to delete "${sweetName}"?`)) {
            return;
        }

        try {
            const response = await axios.delete(`${API_URL}/sweets/${sweetId}`);
            if (response.data.success) {
                setSuccess('Sweet deleted successfully!');
                fetchSweets();
                setTimeout(() => setSuccess(null), 3000);
            }
        } catch (err) {
            console.error('Delete sweet error:', err);
            setError(err.response?.data?.message || 'Failed to delete sweet');
            setTimeout(() => setError(null), 3000);
        }
    };

    /**
     * Handle restock sweet
     */
    const handleRestock = async (sweetId, currentQuantity) => {
        const amount = prompt('Enter quantity to add:', '10');
        if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
            return;
        }

        try {
            const newQuantity = currentQuantity + parseInt(amount);
            const response = await axios.put(`${API_URL}/sweets/${sweetId}`, {
                quantity: newQuantity,
            });

            if (response.data.success) {
                setSuccess(`Restocked successfully! Added ${amount} units.`);
                fetchSweets();
                setTimeout(() => setSuccess(null), 3000);
            }
        } catch (err) {
            console.error('Restock error:', err);
            setError(err.response?.data?.message || 'Failed to restock');
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div className="admin-panel-container">
            <div className="admin-header">
                <h1>👑 Admin Panel</h1>
                <p>Welcome, {user?.name}! Manage your sweet shop inventory</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Add Sweet Form */}
            <div className="admin-section">
                <h2>➕ Add New Sweet</h2>
                <form onSubmit={handleAddSweet} className="add-sweet-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Sweet Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="e.g., Chocolate Bar"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price ($) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-control"
                                placeholder="e.g., 5.99"
                                step="0.01"
                                min="0.01"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantity *</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="form-control"
                                placeholder="e.g., 100"
                                min="0"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            placeholder="Describe your sweet..."
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="spinner-small"></span>
                                Adding...
                            </>
                        ) : (
                            'Add Sweet'
                        )}
                    </button>
                </form>
            </div>

            {/* Sweets List */}
            <div className="admin-section">
                <h2>📦 Manage Inventory ({sweets.length} items)</h2>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading inventory...</p>
                    </div>
                ) : sweets.length === 0 ? (
                    <div className="no-sweets">
                        <p>No sweets in inventory. Add your first sweet above!</p>
                    </div>
                ) : (
                    <div className="sweets-table-container">
                        <table className="sweets-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sweets.map((sweet) => (
                                    <tr key={sweet._id}>
                                        <td className="sweet-name-cell">{sweet.name}</td>
                                        <td>
                                            <span className="category-badge">{sweet.category}</span>
                                        </td>
                                        <td className="price-cell">${sweet.price.toFixed(2)}</td>
                                        <td className="quantity-cell">{sweet.quantity}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${sweet.quantity === 0
                                                        ? 'out-of-stock'
                                                        : sweet.quantity <= 5
                                                            ? 'low-stock'
                                                            : 'in-stock'
                                                    }`}
                                            >
                                                {sweet.quantity === 0
                                                    ? 'Out of Stock'
                                                    : sweet.quantity <= 5
                                                        ? 'Low Stock'
                                                        : 'In Stock'}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button
                                                className="btn btn-small btn-success"
                                                onClick={() => handleRestock(sweet._id, sweet.quantity)}
                                                title="Restock"
                                            >
                                                📦 Restock
                                            </button>
                                            <button
                                                className="btn btn-small btn-danger"
                                                onClick={() => handleDeleteSweet(sweet._id, sweet.name)}
                                                title="Delete"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
