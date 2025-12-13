// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem("cartItems", JSON.stringify(cartItems)); } catch {}
  }, [cartItems]);

  // Helper: ensure numeric rate/price on a product
  const normalizeProduct = (p) => ({
    ...p,
    rateNum: Number(p.rate || p.price || 0),
    // keep original id/name/imageUrl etc.
  });

  // Add single product (keeps single-product shape)
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const priceNum = product.price !== undefined ? Number(product.price) : Number(product.rate) || 0;
      const itemToAdd = {
        ...product,
        price: priceNum,
      };

      // For single-product entries, id should be product.id
      const existing = prev.find(it => it.id === itemToAdd.id && !Array.isArray(it.products));
      if (existing) {
        return prev.map(it => (it.id === itemToAdd.id && !Array.isArray(it.products)) ? { ...it, quantity: it.quantity + quantity } : it);
      }
      return [...prev, { ...itemToAdd, quantity }];
    });
  };

  const buyNow = (product) => {
    const priceNum = product.price !== undefined ? Number(product.price) : Number(product.rate) || 0;
    const itemToBuy = { ...product, price: priceNum, quantity: 1 };
    setCartItems([itemToBuy]);
  };

  // Add a bundle as a single cart item with products[]
  const addBundleToCart = (bundle) => {
    setCartItems(prev => {
      const {
        products = [],
        id: bundleId = `bundle-${Date.now()}`,
        name: bundleName = "Bundle",
        discountPercent,
        offer, // optional 'BUY2GET1'
      } = bundle;

      // Normalize input products
      const normalized = (Array.isArray(products) ? products : []).map(p => ({
        ...p,
        rateNum: Number(p.rate || p.price || 0),
      }));

      // CASE A: bundle.products already contains explicit price === 0 for free product(s)
      const hasExplicitFree = normalized.some(p => Number(p.price) === 0);

      if (hasExplicitFree) {
        // Build bundle object preserving product-level prices, mark isFree where price === 0
        const bundleItem = {
          id: bundleId,
          name: bundleName,
          products: normalized.map(p => ({
            ...p,
            price: p.price !== undefined ? Number(p.price) : Number(p.rate) || 0,
            isFree: Number(p.price) === 0,
          })),
          quantity: 1,
          isBundle: true,
        };

        // If same bundle exists, increment its quantity
        const existingBundle = prev.find(it => it.id === bundleId && it.isBundle);
        if (existingBundle) {
          return prev.map(it => it.id === bundleId && it.isBundle ? { ...it, quantity: it.quantity + 1 } : it);
        } else {
          return [...prev, bundleItem];
        }
      }

      // CASE B: BUY2GET1 offer flag -> find cheapest and mark it free (price = 0)
      if (String(offer || '').toUpperCase() === 'BUY2GET1' && normalized.length >= 1) {
        // Find index of cheapest product (rateNum)
        let cheapestIndex = 0;
        let min = normalized[0]?.rateNum || 0;
        for (let i = 1; i < normalized.length; i++) {
          if ((normalized[i].rateNum || 0) < min) {
            min = normalized[i].rateNum || 0;
            cheapestIndex = i;
          }
        }

        const productsWithPrices = normalized.map((p, idx) => ({
          ...p,
          price: idx === cheapestIndex ? 0 : Number(p.rateNum || 0),
          isFree: idx === cheapestIndex,
        }));

        const bundleItem = {
          id: bundleId,
          name: bundleName,
          products: productsWithPrices,
          quantity: 1,
          isBundle: true,
          offer: 'BUY2GET1',
        };

        const existingBundle = prev.find(it => it.id === bundleId && it.isBundle);
        if (existingBundle) {
          // increment quantity *for the whole bundle*
          return prev.map(it => it.id === bundleId && it.isBundle ? { ...it, quantity: it.quantity + 1 } : it);
        } else {
          return [...prev, bundleItem];
        }
      }

      // CASE C: proportional discountPercent provided -> compute per-product discounted prices (sum equals discounted total)
      if (discountPercent !== undefined && normalized.length > 0) {
        const totalOriginal = normalized.reduce((s, p) => s + (p.rateNum || 0), 0);
        const multiplier = ((100 - Number(discountPercent)) / 100);
        // avoid division by zero
        const productsWithPrices = normalized.map(p => {
          const proportion = totalOriginal > 0 ? (p.rateNum / totalOriginal) : (1 / normalized.length);
          const discountedPrice = (totalOriginal * multiplier) * proportion;
          return {
            ...p,
            price: Number(discountedPrice.toFixed(2)),
            isFree: Number(discountedPrice.toFixed(2)) === 0,
          };
        });

        const bundleItem = {
          id: bundleId,
          name: bundleName,
          products: productsWithPrices,
          quantity: 1,
          isBundle: true,
          discountPercent: Number(discountPercent),
        };

        const existingBundle = prev.find(it => it.id === bundleId && it.isBundle);
        if (existingBundle) {
          return prev.map(it => it.id === bundleId && it.isBundle ? { ...it, quantity: it.quantity + 1 } : it);
        } else {
          return [...prev, bundleItem];
        }
      }

      // DEFAULT: no special rule — simply wrap as bundle using product.rate values
      const defaultProducts = normalized.map(p => ({
        ...p,
        price: Number(p.rateNum),
        isFree: Number(p.rateNum) === 0,
      }));

      const defaultBundle = {
        id: bundleId,
        name: bundleName,
        products: defaultProducts,
        quantity: 1,
        isBundle: true,
      };

      const existingBundle = prev.find(it => it.id === bundleId && it.isBundle);
      if (existingBundle) {
        return prev.map(it => it.id === bundleId && it.isBundle ? { ...it, quantity: it.quantity + 1 } : it);
      } else {
        return [...prev, defaultBundle];
      }
    });
  };

  // Remove / update / increment / decrement
  const removeFromCart = (id) => setCartItems(prev => prev.filter(it => it.id !== id));

  const updateQuantity = (id, q) => {
    const n = parseInt(q, 10);
    if (isNaN(n) || n < 1) return removeFromCart(id);
    setCartItems(prev => prev.map(it => it.id === id ? { ...it, quantity: n } : it));
  };

  const incrementQuantity = (id) => setCartItems(prev => prev.map(it => it.id === id ? { ...it, quantity: it.quantity + 1 } : it));

  const decrementQuantity = (id) => setCartItems(prev => prev.map(it => it.id === id ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it));

  const getTotalItems = () => cartItems.reduce((s, it) => s + (Number(it.quantity) || 0), 0);

  // Get cart total in USD: for bundles sum their products' price * bundle.quantity; for single items price * qty
  const getCartTotal = () => {
    return cartItems.reduce((sum, it) => {
      if (Array.isArray(it.products) && it.products.length > 0) {
        const bundleSumPerUnit = it.products.reduce((s, p) => s + (Number(p.price) || 0), 0);
        return sum + (bundleSumPerUnit * (Number(it.quantity) || 1));
      }
      return sum + ((Number(it.price) || 0) * (Number(it.quantity) || 1));
    }, 0);
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      addBundleToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      getTotalItems,
      getCartTotal,
      buyNow,
      clearCart,
      setCartItems, // optional exposure
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (ctx === null) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
