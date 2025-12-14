/**
 * Home Page Component
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">
                    <span className="hero-icon">🍬</span>
                    Welcome to Sweet Shop
                </h1>
                <p className="hero-subtitle">
                    Your one-stop destination for delicious sweets and candies
                </p>
                <div className="hero-buttons">
                    <Link to="/sweets" className="btn btn-primary btn-large">
                        Browse Sweets
                    </Link>
                    {!isAuthenticated() && (
                        <Link to="/register" className="btn btn-secondary btn-large">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">🍫</div>
                    <h3>Wide Selection</h3>
                    <p>Choose from hundreds of delicious sweets and candies</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Easy Management</h3>
                    <p>Manage your inventory with our intuitive dashboard</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure</h3>
                    <p>Your data is protected with industry-standard security</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
