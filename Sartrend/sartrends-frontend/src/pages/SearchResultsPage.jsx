// src/pages/SearchResultsPage.jsx (ENHANCED LUXURY VERSION)

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products } from '../data/products';
import { StarIcon } from '@heroicons/react/20/solid'; 
import { slugify } from '../utils/helpers'; 

// --- Theme and Helpers ---
const refinedCharcoal = '#212121';
const signatureGold = '#B8860B';
// const USD_TO_PKR_RATE = 280; 

const convertToPKR = (usdPrice) => {
    const validPrice = parseFloat(usdPrice) || 0;
    return (validPrice).toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    });
};

// Function to simulate random rating and review count for display purposes
const getProductDetails = (productId) => {
    // Generate a consistent, random-like value based on ID for visual variety
    const seed = productId % 5; 
    
    let rating = 4.0;
    let reviewCount = 50;
    let tag = '';

    if (seed === 1) {
        rating = 4.8;
        reviewCount = 180;
        tag = 'Top Rated';
    } else if (seed === 2) {
        rating = 4.5;
        reviewCount = 95;
        tag = 'Bestseller';
    } else if (seed === 3) {
        rating = 3.9;
        reviewCount = 32;
        tag = 'New Arrival';
    }
    // Return an object with enhanced details
    return { rating, reviewCount, tag };
};

// This function checks if a product matches the search query (kept for functionality)
const matchesSearch = (product, query) => {
    const lowerCaseQuery = query.toLowerCase();

    if (product.name && product.name.toLowerCase().includes(lowerCaseQuery)) {
        return true;
    }
    if (product.category && product.category.toLowerCase().includes(lowerCaseQuery)) {
        return true;
    }
    if (product.description && product.description.toLowerCase().includes(lowerCaseQuery)) {
        return true;
    }
    if (product.activeComponents && product.activeComponents.some(component => component.toLowerCase().includes(lowerCaseQuery))) {
        return true;
    }

    return false;
};


export default function SearchResultsPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query') || '';

    const [results, setResults] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (searchQuery) {
            const matchedProducts = products.filter(product => 
                matchesSearch(product, searchQuery)
            );
            setResults(matchedProducts);
        } else {
            setResults([]);
        }
    }, [searchQuery]);

    // --- Component Rendering ---

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
            <h1 className="text-3xl font-serif text-center mb-2 mt-8" style={{ color: refinedCharcoal }}>
                Refined Results for: "<strong className="font-bold text-4xl">{searchQuery}</strong>"
            </h1>
            <p className="text-center text-gray-700 mb-10 text-lg font-light">
                Discover {results.length} exclusive items matching your request.
            </p>

            {results.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl shadow-xl my-10">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: refinedCharcoal }}>
                        No Signature Products Found
                    </h2>
                    <p className="text-lg text-gray-500">
                        Please refine your search. Our curated collection awaits.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                    {results.map(product => {
                        const { rating, reviewCount, tag } = getProductDetails(product.id);
                        const stars = Math.round(rating); // Round for display

                        return (
                            <div
                                key={product.id}
                                // 🌟 LUXURY ENHANCEMENT: Smoother shadow, border, and background
                                className="p-4 sm:p-5 rounded-xl transition-all duration-500 shadow-xl overflow-hidden flex flex-col bg-white border border-gray-100 
                                            hover:shadow-3xl hover:border-gold-300 relative group"
                                style={{
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', // Refined shadow
                                    border: `1px solid rgba(184, 134, 11, 0.1)`,
                                }}
                            >
                                {/* 🏷️ NEW: LUXURY BADGE */}
                                {tag && (
                                    <div className="absolute top-0 right-0 py-1 px-3 bg-opacity-90 text-white text-xs font-semibold uppercase tracking-wider rounded-bl-lg"
                                         style={{ backgroundColor: signatureGold }}>
                                        {tag}
                                    </div>
                                )}

                                {/* Product Image */}
                                <Link to={`/product/${product.id}/${slugify(product.name)}`}>
                                    <div className="w-full h-48 sm:h-60 overflow-hidden rounded-lg mb-4 bg-gray-50">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            // 🌟 LUXURY ENHANCEMENT: Subtle image lift on card hover
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300/EAEAEA/444444?text=SarTrends+Luxury" }}
                                        />
                                    </div>
                                </Link>

                                {/* Product Details (Text content) */}
                                <div className="text-left flex-grow">
                                    <h2 className="text-lg sm:text-xl font-serif mb-1 truncate font-bold" style={{ color: refinedCharcoal }}>
                                        {product.name}
                                    </h2>
                                    
                                    {/* CATEGORY DISPLAY BLOCK */}
                                    <p className="text-xs sm:text-sm mb-2 font-medium uppercase tracking-widest" style={{ color: signatureGold }}>
                                        {product.category || 'N/A'}
                                    </p>
                                    
                                    {/* 🌟 NEW: RATING & REVIEW COUNT */}
                                    <div className="flex items-center space-x-2 mb-3">
                                        {/* Stars */}
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <StarIcon 
                                                    key={index}
                                                    className="w-4 h-4 transition-colors duration-200"
                                                    style={{ color: index < stars ? signatureGold : '#E5E7EB' }}
                                                />
                                            ))}
                                        </div>
                                        {/* Review Count */}
                                        <span className="text-xs text-gray-500 font-light">
                                            ({reviewCount} Reviews)
                                        </span>
                                    </div>

                                    {/* Price in PKR */}
                                    <p className="text-2xl font-bold mb-4 tracking-wide font-sans" style={{ color: refinedCharcoal }}>
                                        {convertToPKR(product.rate)}
                                    </p>
                                </div>

                                {/* Button Container */}
                                <div className="mt-auto flex space-x-2">
                                    {/* INFO Button (Links to Detail Page) */}
                                    <Link
                                        to={`/product/${product.id}/ingredients`}
                                        // 🌟 LUXURY ENHANCEMENT: Solid gold button on hover
                                        className="flex-1 inline-block text-center text-xs font-medium py-2 rounded-lg transition-all duration-300 uppercase tracking-widest border"
                                        style={{ 
                                            backgroundColor: refinedCharcoal, 
                                            color: 'white', 
                                            borderColor: refinedCharcoal,
                                            // Conditional styling for hover (using Tailwind group-hover utilities would be better, but this works for inline styles)
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = signatureGold; e.currentTarget.style.color = refinedCharcoal; e.currentTarget.style.borderColor = signatureGold; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = refinedCharcoal; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = refinedCharcoal; }}
                                    >
                                        VIEW DETAILS
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}