// src/Components/Testimonials.jsx

import React from "react";
import customer1 from "../assets/customer1.jpg";
import customer2 from "../assets/customer2.jpg";
import customer3 from "../assets/customer3.jpg";

export default function Testimonials() {
  const reviews = [
    {
      name: "Alexander Grant",
      location: "London, UK",
      image: customer1,
      review:
        "SarTrends delivers a premium experience. The quality, the finish, and the luxury feel are unmatched.",
      stars: 5,
    },
    {
      name: "Zayan Malik",
      location: "Dubai, UAE",
      image: customer2,
      review:
        "Refined, elegant, and effective. The products elevate my daily routine with a luxury touch.",
      stars: 5,
    },
    {
      name: "Ethan Ramirez",
      location: "California, USA",
      image: customer3,
      review:
        "Exceptional quality with premium craftsmanship. SarTrends is a brand I trust completely.",
      stars: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Luxury Heading */}
        <h2
      className="text-5xl md:text-6xl font-serif font-extrabold text-gray-900 tracking-wide"
      style={{
       letterSpacing: "1.5px",
      fontFamily: "'Playfair Display', serif",
    }}
     >
     Loved by Our Customers
      </h2>

        {/* Luxury Subline */}
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Authentic reviews from customers who trust SarTrends for luxury,
          quality, and visible results.
        </p>

        {/* Social Proof */}
        <p className="mt-2 text-sm text-gray-500 italic">
          ★ Over <span className="font-semibold text-gray-700">4,500+ verified reviews</span> 
            across our social platforms.
        </p>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] 
              border border-gray-200 hover:border-[#d4af37] transition-all duration-500"
              style={{
                boxShadow:
                  "0 20px 45px rgba(0,0,0,0.07)",
              }}
            >
              {/* Image with luxury frame */}
              <div className="flex justify-center">
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden border-4"
                  style={{
                    borderColor: "#d4af37", // Metallic Gold
                    boxShadow: "0 0 20px rgba(212,175,55,0.35)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold mt-6 text-gray-900 font-serif">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm">{item.location}</p>

              {/* Review */}
              <p className="mt-4 text-gray-700 leading-relaxed px-2">
                {item.review}
              </p>

              {/* Stars */}
              <div className="flex justify-center mt-4">
                {Array(item.stars)
                  .fill()
                  .map((_, i) => (
                    <span key={i} className="text-[#d4af37] text-xl">★</span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
