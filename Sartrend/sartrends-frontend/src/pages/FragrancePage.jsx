import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

// import { products } from '../data/products';

import AnimatedHeader from '../Components/AnimatedHeader';

import { useCart } from '../context/CartContext';



// --- Theme & Helpers ---

const refinedCharcoal = '#212121';

const signatureGold = '#B8860B';

const metallicGold = '#D4AF37';

const lightPeach = '#FFEBE4';

const lightBackground = '#F7F7F7';

// const USD_TO_PKR_RATE = 280;



const primaryFont = "'Playfair Display', serif";

const secondaryFont = "'Inter', sans-serif";



const convertToPKR = (usdPrice) => {

  const validPrice = parseFloat(usdPrice) || 0;

  return (validPrice).toLocaleString('en-PK', {

    style: 'currency',

    currency: 'PKR',

    minimumFractionDigits: 0,

  });

};



export default function FragrancePage() {

  const [filteredProducts, setFilteredProducts] = useState([]);

  const { buyNow, addToCart } = useCart();

  const navigate = useNavigate();



  useEffect(() => {

    window.scrollTo(0, 0);



    // const fragranceProducts = products.filter(

    //   (product) => String(product.category).toLowerCase() === 'fragrance'

    // );



    // setFilteredProducts(fragranceProducts);

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

        <p className="text-xl text-gray-600">No fragrance products currently listed.</p>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">

          {filteredProducts.map((product) => (

            <div

              key={product.id}

              className="p-4 sm:p-5 rounded-xl transition-all duration-300 shadow-xl overflow-hidden

                hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative flex flex-col"

              style={{

                backgroundColor: lightPeach,

                border: `1px solid ${lightPeach}`,

                boxShadow: `0 8px 15px rgba(0, 0, 0, 0.1)`,

              }}

            >

              {/* Product Image */}

              <div className="w-full h-48 sm:h-60 overflow-hidden rounded-lg mb-4 bg-gray-100">

                <img

                  src={product.imageUrl}

                  alt={product.name}

                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"

                  onError={(e) => {

                    e.target.onerror = null;

                    e.target.src =

                      'https://via.placeholder.com/400x300/EAEAEA/444444?text=SarTrends+Luxury';

                  }}

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

                  <span style={{ color: signatureGold, fontWeight: 'bold' }}>Category:</span>{' '}

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

                {/* BUY NOW */}

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



                {/* ADD TO BAG */}

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



                {/* INFO (FIXED ROUTE) */}

                <Link

                  to={`/product/${product.id}`}

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