/**
 * Sweet List Component
 * 
 * Displays list of all sweets with search and filter functionality
 * Fetches data from backend API
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SweetCard from './SweetCard';
import './SweetList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SweetList = () => {
    const [sweets, setSweets] = useState([]);
    const [filteredSweets, setFilteredSweets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get unique categories from sweets
    const categories = ['All', ...new Set(sweets.map(sweet => sweet.category))];

    /**
     * Fetch sweets from API
     */
    useEffect(() => {
        const fetchSweets = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${API_URL}/sweets`);

                if (response.data.success) {
                    setSweets(response.data.data);
                    setFilteredSweets(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching sweets:', err);
                setError(err.response?.data?.message || 'Failed to load sweets');
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, []);

    /**
     * Filter sweets based on search term and category
     */
    useEffect(() => {
        let filtered = sweets;

        // Filter by search term (name or category)
        if (searchTerm) {
            filtered = filtered.filter(
                (sweet) =>
                    sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sweet.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sweet.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((sweet) => sweet.category === selectedCategory);
        }

        setFilteredSweets(filtered);
    }, [searchTerm, selectedCategory, sweets]);

    /**
     * Handle search input change
     */
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    /**
     * Handle category filter change
     */
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    /**
     * Handle sweet update (after purchase)
     */
    const handleSweetUpdate = (updatedSweet) => {
        setSweets((prevSweets) =>
            prevSweets.map((sweet) =>
                sweet._id === updatedSweet._id ? updatedSweet : sweet
            )
        );
    };

    if (loading) {
        return (
            <div className="sweet-list-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading sweets...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sweet-list-container">
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="sweet-list-container">
            <div className="sweet-list-header">
                <h1>🍬 Browse Our Sweets</h1>
                <p>Discover our delicious collection of sweets and candies</p>
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name, category, or description..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="category-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''
                                }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Info */}
            <div className="results-info">
                <p>
                    Showing {filteredSweets.length} of {sweets.length} sweets
                    {searchTerm && ` for "${searchTerm}"`}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>
            </div>

            {/* Sweets Grid */}
            {filteredSweets.length > 0 ? (
                <div className="sweets-grid">
                    {filteredSweets.map((sweet) => (
                        <SweetCard
                            key={sweet._id}
                            sweet={sweet}
                            onUpdate={handleSweetUpdate}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <div className="no-results-icon">😢</div>
                    <h3>No sweets found</h3>
                    <p>
                        {searchTerm
                            ? `No sweets match "${searchTerm}"`
                            : 'No sweets available in this category'}
                    </p>
                    {(searchTerm || selectedCategory !== 'All') && (
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                            }}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SweetList;
