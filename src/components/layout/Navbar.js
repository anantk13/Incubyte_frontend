/**
 * Navbar Component
 * 
 * Navigation bar with authentication-aware menu
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🍬</span>
                    <span className="brand-text">Sweet Shop</span>
                </Link>

                <div className="navbar-menu">
                    <Link to="/sweets" className="nav-link">
                        Browse Sweets
                    </Link>

                    {isAuthenticated() ? (
                        <>
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                            {isAdmin() && (
                                <Link to="/admin" className="nav-link admin-link">
                                    👑 Admin Panel
                                </Link>
                            )}
                            <div className="navbar-user">
                                <span className="user-name">
                                    {user?.name} {isAdmin() && <span className="admin-badge">Admin</span>}
                                </span>
                                <button onClick={handleLogout} className="btn btn-logout">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
