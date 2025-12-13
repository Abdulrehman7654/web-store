import React from 'react';
import DealsCard from '../Components/DealsCard';
import Buy2Get1FreeCard from '../Components/Buy2Get1FreeCard';
import { products } from '../data/products';
import AnimatedHeader from '../Components/AnimatedHeader';
import { useParams } from 'react-router-dom';

const signatureGold = '#B8860B';
const refinedCharcoal = '#212121';
const lightBackground = '#F7F7F7';

export default function DealsPage() {

    const { dealSlug } = useParams();  
    // dealSlug will be:
    // "buy-2-get-1-free"   OR   "bundle-offers"  OR undefined

    // 6 Bundle Cards
    const bundles = [
        { name: "Glam Starter Pack", products: products.slice(0, 3), discountPercent: 30 },
        { name: "Luxury Eyes Collection", products: products.slice(3, 6), discountPercent: 25 },
        { name: "Everyday Essentials", products: products.slice(6, 9), discountPercent: 20 },
        { name: "Party Ready Kit", products: products.slice(9, 12), discountPercent: 35 },
        { name: "Skincare Favorites", products: products.slice(12, 15), discountPercent: 28 },
        { name: "Complete Makeup Bundle", products: products.slice(15, 18), discountPercent: 22 },
    ];

    // 6 Buy 2 Get 1 Free Cards
    const buy2Get1Bundles = [
        { name: "Luxe Lip Trio", products: products.slice(0, 3) },
        { name: "Eye Shadow Set", products: products.slice(3, 6) },
        { name: "Skincare Trio", products: products.slice(6, 9) },
        { name: "Daily Essentials Pack", products: products.slice(9, 12) },
        { name: "Makeup Essentials Kit", products: products.slice(12, 15) },
        { name: "Complete Glam Pack", products: products.slice(15, 18) },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen" style={{ backgroundColor: lightBackground }}>

            <AnimatedHeader 
                title="Exclusive Deals"
                subTitle="Curated Offers Just for You"
                signatureGold={signatureGold}
                refinedCharcoal={refinedCharcoal}
            />

            {/* 🔥 CASE 1: Only show Bundle Offers */}
            {dealSlug === "bundle-offers" && (
                <>
                    <h2 className="text-2xl font-bold mt-6 mb-6 text-center" 
                        style={{ fontFamily: "'Playfair Display', serif", color: refinedCharcoal }}>
                        Bundle Offers
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bundles.map((bundle, index) => (
                            <DealsCard 
                                key={index}
                                productsBundle={bundle.products}
                                discountPercent={bundle.discountPercent}
                                bundleName={bundle.name}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* 🔥 CASE 2: Only show Buy 2 Get 1 Free */}
            {dealSlug === "buy-2-get-1-free" && (
                <>
                    <h2 className="text-2xl font-bold mt-6 mb-6 text-center"
                        style={{ fontFamily: "'Playfair Display', serif", color: refinedCharcoal }}>
                        Buy 2 Get 1 Free Offers
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {buy2Get1Bundles.map((bundle, index) => (
                            <Buy2Get1FreeCard
                                key={index}
                                productsBundle={bundle.products}
                                bundleName={bundle.name}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* 🔥 CASE 3: /deals → show ALL SECTIONS */}
            {!dealSlug && (
                <>
                    {/* Bundle Offers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {bundles.map((bundle, index) => (
                            <DealsCard 
                                key={index} 
                                productsBundle={bundle.products} 
                                discountPercent={bundle.discountPercent} 
                                bundleName={bundle.name} 
                            />
                        ))}
                    </div>

                    {/* Buy 2 Get 1 Free */}
                    <h2 className="text-2xl font-bold mt-16 mb-6 text-center" 
                        style={{ fontFamily: "'Playfair Display', serif", color: refinedCharcoal }}>
                        Buy 2 Get 1 Free Offers
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {buy2Get1Bundles.map((bundle, index) => (
                            <Buy2Get1FreeCard 
                                key={index}
                                productsBundle={bundle.products}
                                bundleName={bundle.name}
                            />
                        ))}
                    </div>
                </>
            )}

        </div>
    );
}