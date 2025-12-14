/**
 * Dashboard Component
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {user?.name}! 👋</h1>
                <p>Manage your sweet shop from here</p>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <div className="card-icon">🍬</div>
                    <h3>Total Sweets</h3>
                    <p className="card-value">Coming Soon</p>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">📦</div>
                    <h3>In Stock</h3>
                    <p className="card-value">Coming Soon</p>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">🛒</div>
                    <h3>Orders</h3>
                    <p className="card-value">Coming Soon</p>
                </div>

                {isAdmin() && (
                    <div className="dashboard-card admin-card">
                        <div className="card-icon">👑</div>
                        <h3>Admin Panel</h3>
                        <p className="card-value">Full Access</p>
                    </div>
                )}
            </div>

            <div className="dashboard-info">
                <div className="info-card">
                    <h3>Your Account</h3>
                    <div className="info-row">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{user?.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{user?.email}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Role:</span>
                        <span className={`info-value ${isAdmin() ? 'admin' : ''}`}>
                            {user?.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
