// src/Components/Buy2Get1FreeCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const refinedCharcoal = "#212121";
const metallicGold = "#D4AF37";
const primaryFont = "'Playfair Display', serif";
const secondaryFont = "'Inter', sans-serif";
const lightPeach = "#FFEBE4"; // match deals card background
// const USD_TO_PKR_RATE = 280;

const convertToPKR = (usdAmount) => {
  const numericRate = parseFloat(usdAmount);
  if (isNaN(numericRate)) return "Price N/A";
  return (numericRate).toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  });
};

export default function Buy2Get1FreeCard({ productsBundle = [], bundleName = "Bundle" }) {
  const navigate = useNavigate();
  const { addBundleToCart } = useCart();

  // Ensure numeric rates
  const parsed = productsBundle.map((p) => ({ ...p, numericRate: parseFloat(p.rate) || 0 }));

  // Sort ascending by price to find cheapest (free)
  const sorted = [...parsed].sort((a, b) => a.numericRate - b.numericRate);
  const cheapest = sorted[0] || { numericRate: 0 };

  const totalOriginalUSD = parsed.reduce((s, p) => s + p.numericRate, 0);
  const totalDiscountedUSD = totalOriginalUSD - cheapest.numericRate; // cheapest free

  // equivalent discount percent for proportional logic in CartContext
  const discountPercent = totalOriginalUSD > 0 ? (cheapest.numericRate / totalOriginalUSD) * 100 : 0;

  const handleAddBundleToCart = () => {
    const bundleId = `buy2get1-${bundleName.replace(/\s+/g, "-")}`;

    const bundleCartItem = {
      id: bundleId,
      name: bundleName,
      products: parsed.map((p) => ({
        ...p,
        // keep original id but CartContext will prefix when adding (it expects bundle.id)
        rate: p.rate,
      })),
      discountPercent, // CartContext will use this to apply proportional discounted prices
    };

    addBundleToCart(bundleCartItem);
    // replace with non-blocking toast if you add one later
    alert(`Bundle "${bundleName}" added to cart!`);
    navigate("/cart");
  };

  return (
    <div
      className="rounded-3xl shadow-xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-[1.03] relative"
      style={{ backgroundColor: lightPeach }}
    >
      {/* Bundle Name */}
      <h3
        className="text-xl sm:text-2xl font-extrabold mb-1 text-center"
        style={{ fontFamily: primaryFont, color: refinedCharcoal }}
      >
        {bundleName}
      </h3>
      <p className="text-sm text-gray-500 mb-4 text-center" style={{ fontFamily: secondaryFont }}>
        Buy 2, Get 1 Free
      </p>

      {/* Product Images */}
      <div className="flex justify-center gap-2 mb-4">
        {parsed.map((product, idx) => {
          // Mark the free product (first in sorted array)
          const isFree = sorted[0] && product.id === sorted[0].id;

          return (
            <div key={product.id} className="relative group w-24 h-24 overflow-hidden rounded-lg shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              {isFree && (
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                  FREE
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {product.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing (show PKR) */}
      <div className="flex flex-col items-center mb-4">
        <p className="text-gray-400 text-sm line-through" style={{ fontFamily: secondaryFont }}>
          Original: {convertToPKR(totalOriginalUSD)}
        </p>
        <p className="text-2xl font-extrabold" style={{ fontFamily: primaryFont, color: metallicGold }}>
          {convertToPKR(totalDiscountedUSD)}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddBundleToCart}
        className="px-6 py-2 rounded-xl uppercase tracking-wider font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: refinedCharcoal, color: "white", fontFamily: secondaryFont }}
      >
        Add Bundle to Cart
      </button>
    </div>
  );
}
