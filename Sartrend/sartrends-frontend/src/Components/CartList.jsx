// src/components/CartList.jsx
import React from "react";
import { useCart } from "../context/CartContext.jsx";

// const USD_TO_PKR_RATE = 280;
const convertToPKR = (usdAmount) => {
  const num = Number(usdAmount);
  if (isNaN(num)) return "Price N/A";
  return (num).toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  });
};

export default function CartList() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const cartTotalUSD = getCartTotal();
  const cartTotalPKR = convertToPKR(cartTotalUSD);

  if (!cartItems || cartItems.length === 0) {
    return <div className="p-6 text-center text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="space-y-4">
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover" />
            <div>
              <div className="font-semibold">{item.name}</div>
              {item.bundleName && <div className="text-xs text-gray-500">From: {item.bundleName}</div>}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">UNIT PRICE</div>
            <div className="font-semibold">
              {(Number(item.price) === 0 || item.isFree)
                ? <span className="text-green-600 font-bold">FREE</span>
                : convertToPKR(Number(item.price))
              }
            </div>

            <div className="mt-2 flex items-center gap-2 justify-end">
              <div className="text-xs text-gray-500">QTY</div>
              <div className="flex items-center gap-2 ml-2">
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 border rounded">-</button>
                <div className="px-3 py-1 border rounded">{item.quantity}</div>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-xs text-gray-500">LINE TOTAL</div>
              <div className="font-semibold">
                {(Number(item.price) === 0 || item.isFree)
                  ? <span className="text-green-600 font-bold">FREE</span>
                  : convertToPKR(Number(item.price) * Number(item.quantity))
                }
              </div>
            </div>

            <div className="mt-2">
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Remove</button>
            </div>
          </div>
        </div>
      ))}

      {/* Cart total */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-inner flex items-center justify-between">
        <div className="text-lg font-semibold">Subtotal</div>
        <div className="text-xl font-bold">{cartTotalPKR}</div>
      </div>
    </div>
  );
}
