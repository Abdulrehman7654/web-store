import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedHeader from '../Components/AnimatedHeader';
import { useCart } from '../context/CartContext';

// --- Theme & Helpers ---
const refinedCharcoal = '#212121';
const signatureGold = '#B8860B';
const metallicGold = '#D4AF37';
const lightPeach = '#FFEBE4';
const lightBackground = '#F7F7F7';

const primaryFont = "'Playfair Display', serif";
const secondaryFont = "'Inter', sans-serif";

const convertToPKR = (usdPrice) => {
  const validPrice = parseFloat(usdPrice) || 0;
  return validPrice.toLocaleString('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  });
};

export default function FragrancePage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const { buyNow, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchFragrances = async () => {
      try {
        const response = await fetch('/api/products?category=fragrance');
        const data = await response.json();
        console.log('Fetched fragrance products:', data);

        if (data.success) {
          // Log image URLs for debugging
          data.products.forEach(product => {
            console.log(`Product: ${product.name}, Image URL: ${product.imageUrl}`);
          });
          setFilteredProducts(data.products);
        } else {
          console.error('Failed to fetch fragrance products');
        }
      } catch (error) {
        console.error('Error fetching fragrance products:', error);
      }
    };

    fetchFragrances();
  }, []);

  const mainTitle = 'Luxury Fragrance Collection';
  const subTitle = 'Scents of Distinction';

  const handleBuyNow = (product) => {
    buyNow(product);
    alert(`Added ${product.name} to cart. Proceeding to Checkout...`);
    navigate('/checkout');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`Added ${product.name} to your shopping bag!`);
  };

  // Handle image error
  const handleImageError = (productId, e) => {
    console.error(`Image failed to load for product ${productId}`);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/400x300/EAEAEA/444444?text=SarTrends+Luxury';
  };

  // Get the correct image URL
  const getImageUrl = (product) => {
    if (!product.imageUrl) {
      console.warn(`No imageUrl for product: ${product.name}`);
      return 'https://via.placeholder.com/400x300/EAEAEA/444444?text=No+Image';
    }

    // If it's a relative path, convert to absolute
    if (product.imageUrl.startsWith('/')) {
      return `${window.location.origin}${product.imageUrl}`;
    }

    // If it's already absolute, return as is
    return product.imageUrl;
  };

  return (
    <div
      className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen"
      style={{ backgroundColor: lightBackground }}
    >
      <AnimatedHeader
        title={mainTitle}
        subTitle={subTitle}
        signatureGold={signatureGold}
        refinedCharcoal={refinedCharcoal}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-xl text-gray-600">
          No fragrance products currently listed.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-xl overflow-hidden
                hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative flex flex-col"
              style={{
                backgroundColor: lightPeach,
                border: `1px solid ${lightPeach}`,
                boxShadow: `0 8px 15px rgba(0, 0, 0, 0.1)`,
              }}
            >
              {/* Product Image */}
              <div className="w-full h-48 sm:h-60 overflow-hidden rounded-lg mb-4 bg-gray-100 relative">
                {imageErrors[product._id] && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Image Error
                  </div>
                )}
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(e) => handleImageError(product._id, e)}
                  onLoad={() => console.log(`Image loaded successfully for: ${product.name}`)}
                />
              </div>

              {/* Product Details */}
              <div className="text-left flex-grow">
                <h2
                  className="text-lg sm:text-xl font-bold mb-1 truncate"
                  style={{ color: refinedCharcoal, fontFamily: primaryFont }}
                >
                  {product.name}
                </h2>

                <p
                  className="text-xs sm:text-sm mb-3 font-semibold"
                  style={{ color: refinedCharcoal, fontFamily: secondaryFont }}
                >
                  <span style={{ color: signatureGold, fontWeight: 'bold' }}>
                    Category:
                  </span>{' '}
                  {product.category.toUpperCase()}
                </p>

                <p
                  className="text-xs sm:text-sm mb-4 text-gray-600 italic line-clamp-2"
                  style={{ fontFamily: secondaryFont }}
                >
                  {product.description}
                </p>

                <p
                  className="text-2xl font-bold mb-4 tracking-wide"
                  style={{ color: refinedCharcoal, fontFamily: primaryFont }}
                >
                  {convertToPKR(product.rate)}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-auto flex space-x-2">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 text-xs font-medium py-1 rounded-xl uppercase tracking-wider"
                  style={{
                    backgroundColor: refinedCharcoal,
                    color: 'white',
                    border: `2px solid ${refinedCharcoal}`,
                    fontFamily: secondaryFont,
                  }}
                >
                  BUY NOW
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 text-xs font-medium py-1 rounded-xl uppercase tracking-wider"
                  style={{
                    backgroundColor: refinedCharcoal,
                    color: 'white',
                    border: `2px solid ${refinedCharcoal}`,
                    fontFamily: secondaryFont,
                  }}
                >
                  ADD TO BAG
                </button>

                <Link
                  to={`/product/${product._id}`}
                  className="text-xs font-medium py-1 px-2 rounded-xl uppercase transition-colors duration-200"
                  style={{
                    backgroundColor: metallicGold,
                    color: refinedCharcoal,
                    border: `2px solid ${metallicGold}`,
                    fontFamily: secondaryFont,
                  }}
                  title="View Product Details"
                >
                  INFO
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}