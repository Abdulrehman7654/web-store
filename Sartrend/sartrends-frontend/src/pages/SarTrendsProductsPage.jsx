// src/pages/SarTrendsProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ALL_PRODUCTS_DATA from '../data/products'; // 🌟 Import your product data
import { useCart } from '../context/CartContext';

// Define the ORIGINAL Metallic Gold color for button/accent
const METALLIC_GOLD = "#8C783C"; 
const REFINED_CHARCOAL = '#212121';
// const USD_TO_PKR_RATE = 280; 

// const convertToPKR = (usdRate) => {
//     const numericRate = parseFloat(usdRate);
//     
//     if (isNaN(numericRate)) {
//         return "Price N/A";
//     }

//     return (numericRate * USD_TO_PKR_RATE).toLocaleString('en-PK', {
//         style: 'currency',
//         currency: 'PKR',
//         minimumFractionDigits: 0, 
//     });
// };


// Product Card Component (Re-used from original ProductListPage styling)
const ProductCard = ({ product, handleBuyNow, handleAddToCart }) => (
  <div 
    key={product.id} 
    className="p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-xl overflow-hidden
        hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative flex flex-col"
    style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        border: `1px solid rgba(184, 134, 11, 0.2)`, 
        backdropFilter: 'blur(8px)', 
        boxShadow: `0 8px 15px rgba(0, 0, 0, 0.05)`, 
    }}
  >
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="w-full h-48 sm:h-60 overflow-hidden rounded-lg mb-4 bg-gray-100">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300/EAEAEA/444444?text=SarTrends+Luxury" }} 
            />
        </div>
      </Link>
      
      {/* Product Details (Text content) */}
      <div className="text-left flex-grow">
          <h2 className="text-lg sm:text-xl font-bold mb-1 truncate" style={{ color: REFINED_CHARCOAL, fontFamily: "Poppins, sans-serif" }}>
              {product.name}
          </h2>
          
          <p className="text-xs sm:text-sm mb-4 text-gray-600 italic line-clamp-2" style={{ fontFamily: "Roboto, sans-serif" }}>
              {product.description} 
          </p>
          
          {/* Price/Rate in PKR */}
          <p className="text-2xl font-bold mb-4 tracking-wide" style={{ color: METALLIC_GOLD, fontFamily: "Roboto, sans-serif" }}>
              {product.rate}
          </p>
      </div>

      {/* Button Container */}
      <div className="mt-auto flex space-x-2">
        
        {/* 1. BUY NOW Button */}
        <button 
          onClick={() => handleBuyNow(product)}
          className="flex-1 inline-block text-xs font-medium py-2 rounded-lg transition-colors duration-200 uppercase tracking-wider"
          style={{ backgroundColor: METALLIC_GOLD, color: REFINED_CHARCOAL, border: `2px solid ${METALLIC_GOLD}`, fontFamily: "Roboto, sans-serif" }}
        >
          BUY NOW
        </button>
        
        {/* 1.5. ADD TO BAG/CART Button */}
        <button 
          onClick={() => handleAddToCart(product)}
          className="flex-1 inline-block text-xs font-medium py-2 rounded-lg transition-colors duration-200 uppercase tracking-wider"
          style={{ backgroundColor: REFINED_CHARCOAL, color: 'white', border: `2px solid ${REFINED_CHARCOAL}`, fontFamily: "Roboto, sans-serif" }}
        >
          ADD TO BAG
        </button>
      </div>
  </div>
);


export default function SarTrendsProductsPage() {
    const { buyNow, addToCart } = useCart(); 
    const navigate = useNavigate(); 
    const [sarTrendsProducts, setSarTrendsProducts] = useState([]);

    useEffect(() => {
        // Filter products specifically for the 'sartrends' tag
        const filtered = ALL_PRODUCTS_DATA.filter(
            product => product.category.toLowerCase() === 'sartrends'
        );
        // 🌟 Ensure only the first 4 products are displayed, as requested
        filtered.slice(0, 4); 
        window.scrollTo(0, 0); 
    }, []);

    const handleBuyNow = (product) => {
        buyNow(product);
        alert(`Added ${product.name} to cart. Proceeding to Checkout...`);
        navigate('/checkout'); 
    };
    
    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`Added ${product.name} to your shopping bag!`);
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2 text-center"
                style={{ fontFamily: "Playfair Display, serif" }}>
                Our Signature SarTrends Collection 
            </h1>
            <p className="text-center text-xl text-gray-600 mb-10">
                Experience the best of SarTrends: Hand-picked quality, made just for you.
            </p>

            {sarTrendsProducts.length === 0 ? (
                <p className="text-xl text-center text-gray-600">No signature SarTrends products available yet. Check back soon!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sarTrendsProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            handleBuyNow={handleBuyNow}
                            handleAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}