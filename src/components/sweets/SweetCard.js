/**
 * Sweet Card Component
 * 
 * Displays individual sweet details with purchase functionality
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './SweetCard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SweetCard = ({ sweet, onUpdate }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [purchasing, setPurchasing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    /**
     * Handle purchase
     */
    const handlePurchase = async () => {
        // Check if user is logged in
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        // Check if sweet is in stock
        if (sweet.quantity === 0) {
            return;
        }

        try {
            setPurchasing(true);
            setError(null);
            setSuccess(false);

            const response = await axios.post(
                `${API_URL}/sweets/${sweet._id}/purchase`,
                { quantity: 1 }
            );

            if (response.data.success) {
                // Update local state with new sweet data
                onUpdate(response.data.data);

                // Show success message
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
        } catch (err) {
            console.error('Purchase error:', err);
            setError(err.response?.data?.message || 'Purchase failed');
            setTimeout(() => setError(null), 3000);
        } finally {
            setPurchasing(false);
        }
    };

    /**
     * Get stock status
     */
    const getStockStatus = () => {
        if (sweet.quantity === 0) {
            return { text: 'Out of Stock', className: 'out-of-stock' };
        } else if (sweet.quantity <= 5) {
            return { text: `Only ${sweet.quantity} left!`, className: 'low-stock' };
        } else {
            return { text: `${sweet.quantity} in stock`, className: 'in-stock' };
        }
    };

    const stockStatus = getStockStatus();

    return (
        <div className={`sweet-card ${sweet.quantity === 0 ? 'out-of-stock-card' : ''}`}>
            {/* Sweet Icon/Image */}
            <div className="sweet-icon">
                {sweet.category === 'Chocolate' && '🍫'}
                {sweet.category === 'Candy' && '🍬'}
                {sweet.category === 'Gummy' && '🐻'}
                {sweet.category === 'Lollipop' && '🍭'}
                {sweet.category === 'Hard Candy' && '🍬'}
                {sweet.category === 'Soft Candy' && '🍡'}
                {!['Chocolate', 'Candy', 'Gummy', 'Lollipop', 'Hard Candy', 'Soft Candy'].includes(sweet.category) && '🍰'}
            </div>

            {/* Sweet Details */}
            <div className="sweet-details">
                <h3 className="sweet-name">{sweet.name}</h3>
                <p className="sweet-category">{sweet.category}</p>

                {sweet.description && (
                    <p className="sweet-description">{sweet.description}</p>
                )}

                <div className="sweet-info">
                    <div className="sweet-price">${sweet.price.toFixed(2)}</div>
                    <div className={`sweet-stock ${stockStatus.className}`}>
                        {stockStatus.text}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="sweet-actions">
                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">Purchase successful! 🎉</div>}

                <button
                    className="btn btn-purchase"
                    onClick={handlePurchase}
                    disabled={sweet.quantity === 0 || purchasing}
                >
                    {purchasing ? (
                        <>
                            <span className="spinner-small"></span>
                            Purchasing...
                        </>
                    ) : sweet.quantity === 0 ? (
                        'Out of Stock'
                    ) : (
                        <>
                            <span>🛒</span>
                            Purchase
                        </>
                    )}
                </button>

                {!isAuthenticated() && sweet.quantity > 0 && (
                    <p className="login-hint">Login to purchase</p>
                )}
            </div>
        </div>
    );
};

export default SweetCard;
