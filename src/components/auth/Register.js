/**
 * Register Component
 * 
 * User registration form with validation and error handling
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, error, clearError } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');

    const { name, email, password, confirmPassword } = formData;

    /**
     * Handle input change
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear errors when user types
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: '',
            });
        }
        if (localError) setLocalError('');
        if (error) clearError();
    };

    /**
     * Validate form
     */
    const validateForm = () => {
        const errors = {};

        // Name validation
        if (!name) {
            errors.name = 'Name is required';
        } else if (name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        setLocalError('');

        try {
            await register({ name, email, password });
            // Redirect to dashboard on success
            navigate('/dashboard');
        } catch (err) {
            setLocalError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>🍬 Sweet Shop</h1>
                    <h2>Create Account</h2>
                    <p>Join us to manage your sweet shop</p>
                </div>

                {(localError || error) && (
                    <div className="alert alert-error">
                        {localError || error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${formErrors.name ? 'error' : ''}`}
                            placeholder="Enter your full name"
                            value={name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {formErrors.name && (
                            <span className="error-message">{formErrors.name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${formErrors.email ? 'error' : ''}`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {formErrors.email && (
                            <span className="error-message">{formErrors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${formErrors.password ? 'error' : ''}`}
                            placeholder="Enter your password (min 6 characters)"
                            value={password}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {formErrors.password && (
                            <span className="error-message">{formErrors.password}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`form-control ${formErrors.confirmPassword ? 'error' : ''}`}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {formErrors.confirmPassword && (
                            <span className="error-message">{formErrors.confirmPassword}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-small"></span>
                                Creating account...
                            </>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
