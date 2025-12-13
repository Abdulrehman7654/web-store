// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { products } from '../data/products';
import { useCart } from '../context/CartContext.jsx'; 

// --- Theme and Helpers ---
// const USD_TO_PKR_RATE = 280; 
// const signatureGold = '#B8860B';
const metallicGold = '#D4AF37';
const refinedCharcoal = '#212121';
const primaryFont = "'Playfair Display', serif";
const secondaryFont = "'Inter', sans-serif";

const convertToPKR = (usdAmount) => {
    const numericRate = parseFloat(usdAmount);
    if (isNaN(numericRate)) return "Price N/A";
    return (numericRate).toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    });
};

// ----------------------------------------------------------------------
const ProductNotFound = ({ id, navigate }) => (
    <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: primaryFont }}>Product Not Found</h1>
        <p className="text-gray-600 mt-2" style={{ fontFamily: secondaryFont }}>
            The requested product identifier '{id}' does not exist or the data is missing.
        </p>
        <button 
            onClick={() => navigate(-1)} 
            className="mt-8 inline-block px-6 py-2 rounded-md transition duration-200"
            style={{ backgroundColor: refinedCharcoal, color: 'white', fontFamily: secondaryFont }}
            type="button"
        >
            ← Go Back
        </button>
    </div>
);

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate(); 
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, buyNow } = useCart(); 

    useEffect(() => {
        if (!productId) {
            setProduct(null);
            return;
        }

        const numericId = Number(productId);
        let foundProduct = products.find(p => Number(p.id) === numericId);

        if (!foundProduct) {
            foundProduct = products.find(p => String(p.id) === String(productId));
        }

        setProduct(foundProduct || null);
        setQuantity(1);
        window.scrollTo(0, 0);
    }, [productId]);

    const handleAddToCart = () => {
        if (product && quantity > 0) {
            addToCart(product, quantity);
            alert(`Added ${quantity} x ${product.name} to your shopping bag!`);
        }
    };

    const handleBuyNow = () => {
        if (product && quantity > 0) {
            buyNow(product, quantity);
            alert(`Added ${quantity} x ${product.name} to cart. Proceeding to Checkout...`);
            navigate('/checkout');
        }
    };

    if (!product) {
        return <ProductNotFound id={productId || 'unknown'} navigate={navigate} />; 
    }

    const productRateNumeric = parseFloat(product.rate) || 0;
    const totalUsd = productRateNumeric * quantity;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition duration-200"
                style={{ fontFamily: secondaryFont }} 
                type="button"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <span className="font-medium">Back to Products</span>
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="lg:h-[700px]">
                    <img 
                        src={product.imageUrl || product.image || '/placeholder.png'} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-xl shadow-2xl" 
                    />
                </div>

                <div className="py-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: primaryFont }}>
                        {product.name}
                    </h1>
                    
                    <p className="text-3xl font-bold mb-4 tracking-wide" style={{ color: metallicGold, fontFamily: primaryFont }}>
                        {convertToPKR(totalUsd)}
                    </p>

                    <p className="text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: secondaryFont }}>
                        {product.description}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4" style={{ fontFamily: secondaryFont }}>
                            <label className="text-lg font-medium">Quantity:</label>
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100 rounded-l-md"
                                    type="button"
                                >−</button>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10) || 1;
                                        setQuantity(Math.max(1, value));
                                    }}
                                    className="w-12 text-center border-x border-gray-300 focus:outline-none"
                                />
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100 rounded-r-md"
                                    type="button"
                                >+</button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full font-bold py-2.5 px-6 rounded-lg text-base tracking-widest shadow-md transition duration-300 uppercase"
                            style={{ backgroundColor: refinedCharcoal, color: 'white', fontFamily: secondaryFont }}
                            type="button"
                        >
                            ADD TO CART ({convertToPKR(totalUsd)})
                        </button>

                        <button 
                            onClick={handleBuyNow}
                            className="w-full font-bold py-2.5 px-6 rounded-lg text-base tracking-widest shadow-md transition duration-300 uppercase"
                            style={{ backgroundColor: refinedCharcoal, color: 'white', fontFamily: secondaryFont, border: `2px solid ${metallicGold}` }} 
                            type="button"
                        >
                            BUY NOW
                        </button>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: primaryFont }}>Product Specs</h2>
                        
                        <div className="mb-4">
                            <h3 className="text-xl font-medium mb-2 border-b pb-1" style={{ fontFamily: secondaryFont }}>Active Components</h3>
                            {product.activeComponents && product.activeComponents.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-700" style={{ fontFamily: secondaryFont }}>
                                    {product.activeComponents.map((component, index) => (
                                        <li key={index}>{component}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic" style={{ fontFamily: secondaryFont }}>Detailed active component list coming soon.</p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-xl font-medium mb-2 border-b pb-1" style={{ fontFamily: secondaryFont }}>Product Ingredients</h3>
                            {product.ingredients && product.ingredients.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-700" style={{ fontFamily: secondaryFont }}>
                                    {product.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic" style={{ fontFamily: secondaryFont }}>Detailed product ingredient list coming soon.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
