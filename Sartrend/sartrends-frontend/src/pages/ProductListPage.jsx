// src/pages/ProductListPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AnimatedHeader from "../Components/AnimatedHeader";
import { useCart } from "../context/CartContext";

// --- Theme and Helpers ---
const refinedCharcoal = "#212121";
const signatureGold = "#B8860B";
const lightPeach = "#FFEBE4";
const lightBackground = "#F7F7F7";

const primaryFont = "'Playfair Display', serif";
const secondaryFont = "'Inter', sans-serif";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Categories
const CATEGORIES = [
  { name: "All Products", slug: "all", tag: "all" },
  { name: "Makeup", slug: "makeup", tag: "makeup" },
  { name: "Skincare", slug: "skincare", tag: "skincare" },
  { name: "Fragrance", slug: "fragrance", tag: "fragrance" },
  { name: "Hair Care", slug: "hair-care", tag: "hair" },
  { name: "Body Care", slug: "body-care", tag: "body" },
  { name: "Nails", slug: "nails", tag: "nails" },
  { name: "Imported Products", slug: "imported-products", tag: "imported" },
  { name: "Tools", slug: "tools", tag: "tools" },
  {
    name: "Our SarTrends Products",
    slug: "sartrends-products",
    tag: "sartrends",
  },
];

export default function ProductListPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { buyNow, addToCart } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------
  // 🔥 FETCH FROM BACKEND ONLY
  // -----------------------
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        console.log("Fetched products data:", data);

        if (data.success && Array.isArray(data.products)) {
          // Fix fields for UI
          const formatted = data.products.map((p) => ({
            _id: p._id,
            name: p.name || "Unnamed Product",
            rate: p.rate || 0,
            imageUrl: p.imageUrl, // ✔ correct mapping
            category: p.category || "Uncategorized",
            description: p.description || "",
            stock: p.stock || 0,
          }));

          setAllProducts(formatted);
        }
      } catch (error) {
        console.error("Frontend fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // -----------------------
  // 🔥 FILTER PRODUCTS BY CATEGORY
  // -----------------------
  useEffect(() => {
    if (!categorySlug || categorySlug === "all") {
      setFilteredProducts(allProducts);
      return;
    }

    const selected = CATEGORIES.find((c) => c.slug === categorySlug);

    if (!selected) {
      setFilteredProducts(allProducts);
      return;
    }

    const tag = selected.tag.toLowerCase();

    const filtered = allProducts.filter((p) => {
      // Assuming p.category is a string field that contains the tag
      const productCat = String(p.category).toLowerCase();
      return productCat.includes(tag);
    });

    setFilteredProducts(filtered);
  }, [categorySlug, allProducts]);

  // -----------------------
  // UI
  // -----------------------

  // 🔥 FIX: Get the display name for the header title
  const currentCategory = CATEGORIES.find(
    (c) => c.slug === categorySlug
  ) || { name: "All SarTrends Products" };
  const headerTitle = currentCategory.name.toUpperCase();


  if (loading) {
    return (
      <div className="text-center text-2xl font-semibold py-20">
        Loading Products...
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto p-4 sm:p-8 min-h-screen"
      style={{ backgroundColor: lightBackground }}
    >
      {/* 🔥 FIX: AnimatedHeader now uses the display name. 
          The animation fix likely depends on the AnimatedHeader component's internal logic, 
          but passing a clean, relevant title here is a good start. */}
      <AnimatedHeader
        title={headerTitle}
        subTitle="Curated Excellence"
        signatureGold={signatureGold}
        refinedCharcoal={refinedCharcoal}
      />
      

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 p-4 bg-white rounded-xl shadow-md">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products/${cat.slug}`}
            className={`
              text-sm font-semibold px-5 py-2 rounded-full
              ${
                cat.slug === categorySlug
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }
            `}
            style={{ fontFamily: secondaryFont }}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="p-4 rounded-xl shadow-lg bg-white hover:scale-105 transition"
          >
            {/* 🔥 REMOVED: Image URL Display */}
            {/* <p className="text-xs mb-1 text-blue-600 break-words">
              Image URL: {product.imageUrl}
            </p> */}

            <img
              src={product.imageUrl}
              className="w-full h-48 object-cover rounded-lg mb-3"
              // Optional: Add alt text for accessibility
              alt={`Image of ${product.name}`} 
            />

            <h2
              className="text-lg font-bold mb-1"
              style={{ fontFamily: primaryFont }}
            >
              {product.name}
            </h2>

            <p className="text-sm mb-2">
              <b>Category:</b> {product.category}
            </p>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>

            <p className="text-xl font-bold mb-3">Rs: {product.rate}</p>

            <div className="flex gap-2">
              <button
                onClick={() => buyNow(product)}
                className="flex-1 bg-black text-white py-1 rounded-md"
              >
                BUY NOW
              </button>

              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-black text-white py-1 rounded-md"
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-xl mt-10 text-gray-600">
          No products found in this category.
        </p>
      )}

      {/* 🔥 REMOVED: Static Blusher Image */}
      {/* <img
        src={"/Blusher.jpeg"}
        className="w-full h-48 object-cover rounded-lg mb-3"
      /> */}
    </div>
  );
}