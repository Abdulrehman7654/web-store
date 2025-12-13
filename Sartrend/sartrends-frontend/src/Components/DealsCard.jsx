import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

// const signatureGold = '#B8860B';
const metallicGold = '#D4AF37';
const refinedCharcoal = '#212121';
const primaryFont = "'Playfair Display', serif";
const secondaryFont = "'Inter', sans-serif";
// const lightPeach = '#FFEBE4';
// const USD_TO_PKR_RATE = 280;

const convertToPKR = (usdAmount) => {
    const numericRate = parseFloat(usdAmount);
    if (isNaN(numericRate)) return "Price N/A";
    return (numericRate).toLocaleString('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    });
};

export default function DealsCard({ productsBundle, discountPercent, bundleName }) {
    const navigate = useNavigate();
    const { addBundleToCart } = useCart(); 

    const totalOriginalPrice = productsBundle.reduce((sum, product) => sum + (parseFloat(product.rate) || 0), 0);
    const discountedPrice = totalOriginalPrice * ((100 - discountPercent) / 100);

    const handleAddBundleToCart = () => {
        const bundleCartItem = {
            id: `bundle-${bundleName.replace(/\s+/g, '-')}`, 
            name: bundleName,
            products: productsBundle,
            discountPercent, // pass discount for proportional pricing
        };

        addBundleToCart(bundleCartItem); 
        alert(`Bundle "${bundleName}" added to cart!`);
        navigate('/cart');
    };

    return (
        <div className="bg-[#FFEBE4] rounded-3xl shadow-xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-[1.03] relative">

            {/* ❌ Discount Badge Removed */}

            {/* Bundle Name */}
            <h3 className="text-xl sm:text-2xl font-extrabold mb-1 text-center" style={{ fontFamily: primaryFont, color: refinedCharcoal }}>
                {bundleName}
            </h3>

            {/* Optional Subtitle */}
            <p className="text-sm text-gray-500 mb-4 text-center" style={{ fontFamily: secondaryFont }}>
                Curated selection of {productsBundle.length} products
            </p>

            {/* Product Images */}
            <div className="flex justify-center gap-2 mb-4">
                {productsBundle.map((product) => (
                    <div key={product.id} className="relative group w-24 h-24 overflow-hidden rounded-lg shadow-lg">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150" }}
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {product.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Names */}
            <ul className="text-gray-700 text-xs mb-3 text-center" style={{ fontFamily: secondaryFont }}>
                {productsBundle.map((product, idx) => (
                    <li key={idx}>{product.name}</li>
                ))}
            </ul>

            {/* Pricing */}
            <div className="flex flex-col items-center mb-4">
                <p className="text-gray-400 text-sm line-through" style={{ fontFamily: secondaryFont }}>
                    Original: {convertToPKR(totalOriginalPrice)}
                </p>
                <p className="text-2xl font-extrabold" style={{ fontFamily: primaryFont, color: metallicGold }}>
                    {convertToPKR(discountedPrice)}
                </p>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddBundleToCart}
                className="px-6 py-2 rounded-xl uppercase tracking-wider font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: refinedCharcoal, color: 'white', fontFamily: secondaryFont }}
            >
                Add Bundle to Cart
            </button>
        </div>
    );
}
