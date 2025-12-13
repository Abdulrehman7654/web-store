// src/pages/CartPage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AnimatedHeader from '../Components/AnimatedHeader';

// --- Theme and Helpers ---
const refinedCharcoal = '#212121'; // Luxury Black
const signatureGold = '#B8860B'; // Gold Accent
const lightBackground = '#F7F7F7'; 
// const USD_TO_PKR_RATE = 280; 
const FIXED_SHIPPING_PKR = 350; // 350 PKR fixed delivery charge

// 🎯 Empty Cart Icon
const LuxuryEmptyCartIcon = ({ color }) => (
    <svg 
        className="w-40 h-40 mb-8 opacity-70" 
        fill="none" 
        stroke={color} 
        strokeWidth="0.8" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h6M12 15h.01M12 18h.01" /> 
    </svg>
);

// Convert USD to PKR
const convertToPKR = (usdPrice) => {
    const validPrice = parseFloat(usdPrice) || 0;
    return (validPrice ).toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    });
};

// Format PKR (already PKR amount)
const formatPKR = (pkrAmount) => {
    return pkrAmount.toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    });
};

export default function CartPage() {
    const navigate = useNavigate(); 
    const cartCtx = useCart();
    const items = cartCtx?.cartItems || [];

    // --- Calculate subtotalUSD robustly:
    // If item has products[] (bundle), sum product-level price/rate,
    // otherwise use item.price or item.rate.
    const subtotalUSD = items.reduce((acc, item) => {
        if (Array.isArray(item.products) && item.products.length > 0) {
            const sumBundle = item.products.reduce((s, p) => s + (Number(p.price ?? p.rate) || 0), 0);
            return acc + (sumBundle * (Number(item.quantity) || 1));
        }
        return acc + ((Number(item.price ?? item.rate) || 0) * (Number(item.quantity) || 1));
    }, 0);

    const shippingUSD = FIXED_SHIPPING_PKR;
    const grandTotalUSD = subtotalUSD + shippingUSD;
    const grandTotalPKR = convertToPKR(grandTotalUSD);

    const mainCartTitle = 'Your Shopping Bag';
    const subCartTitle = 'Curated Selection'; 

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: lightBackground }}>
            <div className="pt-10"> 
                <AnimatedHeader
                    title={mainCartTitle}
                    subTitle={subCartTitle}
                    signatureGold={signatureGold}
                    refinedCharcoal={refinedCharcoal}
                />
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-180px)] text-center px-8 pb-10">
                    <LuxuryEmptyCartIcon color={refinedCharcoal} />
                    <p className="text-5xl font-extrabold mb-4 tracking-wide" style={{ color: refinedCharcoal, fontFamily: 'serif, Garamond' }}>
                        Your Sartrends Collection Awaits.
                    </p>
                    <p className="text-lg text-gray-700 mb-10 font-medium max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        Discover timeless elegance and unparalleled quality.
                        Your journey to luxury begins now – explore our exquisite offerings.
                    </p>
                    <Link 
                        to="/products" 
                        className="font-semibold px-10 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-[1.03] flex items-center group shadow-xl"
                        style={{ backgroundColor: refinedCharcoal, color: 'white', letterSpacing: '1.5px', fontFamily: 'Roboto, sans-serif' }}
                    >
                        EXPLORE THE COLLECTION
                        <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-2" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                    </Link>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 mt-10 p-4 sm:p-8">
                    
                    {/* LEFT COLUMN: CART ITEMS */}
                    <div className="lg:w-7/12 space-y-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-serif font-bold pb-4" style={{ color: refinedCharcoal, borderBottom: `1px solid ${signatureGold}` }}>
                            YOUR EXCLUSIVE ITEMS ({items.length})
                        </h2>

                        {items.map(item => {
                            // compute line total robustly
                            let lineTotalUSD = 0;
                            if (Array.isArray(item.products) && item.products.length > 0) {
                                lineTotalUSD = item.products.reduce((s, p) => s + (Number(p.price ?? p.rate) || 0), 0) * (Number(item.quantity) || 1);
                            } else {
                                lineTotalUSD = (Number(item.price ?? item.rate) || 0) * (Number(item.quantity) || 1);
                            }

                            // per-item unit display for bundles: compute per-bundle-unit price (sum of product prices)
                            // const unitPriceUSD = Array.isArray(item.products) && item.products.length > 0
                            //     ? item.products.reduce((s, p) => s + (Number(p.price ?? p.rate) || 0), 0)
                            //     : (Number(item.price ?? item.rate) || 0);

                            return (
                                <div key={item.id} className="flex py-4 transition-opacity duration-300 border-b border-gray-200 hover:opacity-90">

                                    <div className="flex-shrink-0 mr-6">
                                        <img 
                                            src={item.products?.[0]?.imageUrl || item.imageUrl} 
                                            alt={item.name} 
                                            className="w-24 h-24 object-cover rounded-md border-2"
                                            style={{ borderColor: signatureGold }}
                                        />
                                    </div>

                                    <div className="flex-grow flex justify-between">
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <span className="font-serif font-extrabold text-xl mb-1 block">{item.name}</span>

                                                {/* Bundle Products List (if exists) */}
                                                {item.products ? (
                                                    <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
                                                        {item.products.map(p => {
                                                            const priceNum = Number(p.price ?? p.rate) || 0;
                                                            return (
                                                                <li key={p.id}>
                                                                    {p.name} —{" "}
                                                                    {priceNum === 0
                                                                        ? <span className="text-green-600 font-semibold">FREE</span>
                                                                        : <span className="font-medium" style={{ color: signatureGold }}>{convertToPKR(priceNum)}</span>
                                                                    }
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                ) : (
                                                    <div className="text-sm font-light uppercase tracking-wide text-gray-600 mb-3">
                                                        Unit Price: <span className="font-bold" style={{ color: signatureGold }}>
                                                            { (Number(item.price ?? item.rate) === 0 || item.isFree) 
                                                                ? <span className="text-green-600 font-bold">FREE</span>
                                                                : convertToPKR(item.price ?? item.rate)
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center space-x-4">
                                                <span className="font-medium text-gray-700">QTY:</span>
                                                <div className="flex items-center border rounded-lg" style={{ borderColor: refinedCharcoal }}>
                                                    <button
                                                        onClick={() => cartCtx.decrementQuantity(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center text-lg font-semibold rounded-l-lg hover:bg-gray-100 transition-colors"
                                                        style={{ color: refinedCharcoal }}
                                                        disabled={item.quantity <= 1}
                                                    >−</button>
                                                    <span className="w-8 text-center font-bold text-md" style={{ color: refinedCharcoal }}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => cartCtx.incrementQuantity(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center text-lg font-semibold rounded-r-lg hover:bg-gray-100 transition-colors"
                                                        style={{ color: refinedCharcoal }}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right flex flex-col justify-between items-end min-w-[100px]">
                                            <div className="text-2xl font-extrabold tracking-wider" style={{ color: signatureGold }}>
                                                { (lineTotalUSD === 0 || item.isFree) 
                                                    ? <span className="text-green-600 font-bold">FREE</span>
                                                    : convertToPKR(lineTotalUSD)
                                                }
                                            </div>
                                            <button
                                                onClick={() => cartCtx.removeFromCart(item.id)}
                                                className="text-sm font-semibold transition-colors duration-200 hover:text-red-600"
                                                style={{ color: '#E53E3E' }}
                                            >Remove</button>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                        <div className="pt-4 flex justify-start">
                            <Link 
                                to="/products"
                                className="text-sm font-medium hover:underline transition-colors duration-200"
                                style={{ color: refinedCharcoal }}
                            >← Continue Shopping</Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY */}
                    <div className="lg:w-5/12 p-8 rounded-xl shadow-2xl lg:sticky lg:top-8 self-start" style={{ backgroundColor: refinedCharcoal }}>
                        <h2 className="text-3xl font-serif font-bold mb-8 uppercase" style={{ color: signatureGold, letterSpacing: '2px' }}>Order Summary</h2>

                        {/* Subtotal */}
                        <div className="flex justify-between text-lg mb-4 font-light" style={{ color: 'white' }}>
                            <span>Merchandise Subtotal:</span>
                            <span className="font-semibold">{convertToPKR(subtotalUSD)}</span>
                        </div>

                        {/* Shipping */}
                        <div className="flex justify-between text-lg mb-6 font-light" style={{ color: 'white' }}>
                            <span>Advanced Delivery Charge:</span>
                            <span className="font-semibold">{formatPKR(FIXED_SHIPPING_PKR)}</span>
                        </div>
                        
                        <hr className="my-6 border-t-2" style={{ borderColor: signatureGold }}/>

                        {/* Grand Total */}
                        <div className="flex justify-between text-4xl font-serif font-extrabold mb-10" style={{ color: signatureGold }}>
                            <span>TOTAL:</span>
                            <span>{grandTotalPKR}</span>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout} 
                            className="text-lg font-bold py-3 px-6 rounded-lg transition-all duration-300 uppercase tracking-widest block w-full hover:scale-[1.01] transform border-2"
                            style={{ 
                                backgroundColor: refinedCharcoal, 
                                color: 'white',
                                borderColor: signatureGold,
                                boxShadow: `0 4px 15px rgba(0, 0, 0, 0.5)`
                            }} 
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
