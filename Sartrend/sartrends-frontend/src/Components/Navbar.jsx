// src/Components/Navbar.jsx

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.jpeg"; // Ensure this path is correct
import gsap from "gsap"; // Assuming GSAP is correctly installed and used for animations

// Import the useCart hook (Adjust path if needed)
import { useCart } from "../context/CartContext"; 

// Define the ORIGINAL Metallic Gold color for the dropdown text/accents
const METALLIC_GOLD = "#8C783C"; 

// Utility function to create URL-friendly slugs
const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function Navbar() {
    // Hooks and State
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [dealsOpen, setDealsOpen] = useState(false);
    
    // Refs for dropdowns and mobile menu for non-React animation/closing logic
    const mobilePanelRef = useRef(null);
    const mobileButtonRef = useRef(null);
    const productsDropdownRef = useRef(null);
    const dealsDropdownRef = useRef(null);

  // --- Cart Count Logic (using context) ---
  let cartCount = 0;
  try {
      const cartCtx = useCart();
      if (cartCtx && typeof cartCtx.getTotalItems === "function") {
        cartCount = cartCtx.getTotalItems();
      } else if (cartCtx && Array.isArray(cartCtx.cartItems)) {
          // Fallback: calculate count if getTotalItems function isn't provided
          cartCount = cartCtx.cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
      }
  } catch (err) {
      console.warn("useCart() threw an error. Ensure CartProvider is set up.", err?.message ?? err);
  }
  // ------------------------------------------

 // --- Navigation Data ---
 const productCategories = [
    "All Products", 
    "Makeup", 
    "Skincare", 
    "Fragrance", 
    "Hair Care", 
    "Body Care", 
    "Nails", 
    "Imported Products", 
    "Tools",
    "Our SarTrends Products", 
 ];
 
 // ⭐ DEAL CATEGORIES - Linked to /deals/:categorySlug
 const dealCategories = ["Buy 2 Get 1 free", "Bundle Offers"];

 // Removed "Blog" from static nav items as requested
 const staticNavItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
 ];

 const navLinkStyle = {
    fontFamily: "Roboto, sans-serif",
    color: "#111111", 
    fontWeight: 500,
 };
 
 // --- Handlers ---

 const handleMobileLinkClick = () => {
    setMobileOpen(false);
    // Close dropdowns on mobile link click to reset state
    setProductsOpen(false);
    setDealsOpen(false);
 };

 // Function to handle search submission
 const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
        	// Navigate to the SearchResultsPage with the query
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(''); 
            if (mobileOpen) {
                setMobileOpen(false);
            }
        }
 };


 // --- Effects for Dropdown Animations/Closing ---
 useEffect(() => {
    function onClick(e) {
      if (!mobilePanelRef.current || !mobileButtonRef.current) return;
      if (
        !mobilePanelRef.current.contains(e.target) &&
        !mobileButtonRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
 }, []);

 // GSAP animation for Products dropdown (Desktop)
 useEffect(() => {
    const el = productsDropdownRef.current;
    if (!el || typeof gsap === "undefined") return;
    const opacity = productsOpen ? 1 : 0;
    const y = productsOpen ? 0 : -8;
    gsap.to(el, {
      duration: 0.3,
      autoAlpha: opacity,
      y,
      ease: productsOpen ? "power2.out" : "power1.in",
    });
 }, [productsOpen]);

 // GSAP animation for Deals dropdown (Desktop)
 useEffect(() => {
    const el = dealsDropdownRef.current;
    if (!el || typeof gsap === "undefined") return;
    const opacity = dealsOpen ? 1 : 0;
    const y = dealsOpen ? 0 : -10;
    gsap.to(el, {
      duration: 0.32,
      autoAlpha: opacity,
      y,
      ease: dealsOpen ? "power3.out" : "power1.in",
    });
 }, [dealsOpen]);
 // ------------------------------------------


 return (
    <header className="w-full bg-white/60 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. LOGO AND DESKTOP NAVIGATION */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="SarTrends logo"
                className="w-10 h-10 rounded-[12px] object-cover"
              />
              <span
                className="font-semibold tracking-tight"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "22px" }}
              >
                <span style={{ color: "#333333", fontWeight: 700 }}>Sar</span>
                <span style={{ color: "#D4AF37", fontWeight: 700 }}>Trends</span> 
              </span>
            </Link>

            <nav className="hidden md:flex md:items-center md:space-x-2">
              <Link
                to="/"
                className="px-3 py-2 rounded-[10px] text-sm font-medium hover:outline hover:outline-[1.5px] hover:outline-black hover:bg-transparent"
                style={navLinkStyle}
              >
                Home
              </Link>

              {/* PRODUCTS DROPDOWN */}
              <div className="relative">
                <Link
                  to="/products" 
                  onClick={() => setProductsOpen((v) => !v)}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  className="px-3 py-2 rounded-[10px] text-sm font-medium hover:outline hover:outline-[1.5px] hover:outline-black hover:bg-transparent"
                  style={navLinkStyle}
                >
                  Products
                </Link>
                <div
                  ref={productsDropdownRef}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  className="absolute left-0 mt-2 w-60 bg-black shadow-xl rounded-lg py-2 pointer-events-auto ring-1 ring-gray-900/50 z-50"
                  style={{ opacity: productsOpen ? 1 : 0, pointerEvents: productsOpen ? "auto" : "none" }}
                >
                  {productCategories.map((cat, index) => (
                    <React.Fragment key={cat}>
                      <Link
                        to={cat === "All Products" ? "/products" : `/products/${slugify(cat)}`}
                        onClick={() => setProductsOpen(false)}
                        className="block px-5 py-2 text-sm transition-colors hover:bg-[#1f1f1f]"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, color: METALLIC_GOLD }} 
                      >
                        {cat}
                      </Link>
                      {index < productCategories.length - 1 && (
                        <hr className="mx-4 border-t border-gray-800 last:hidden" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* FRAGRANCE LINK */}
              <Link
                to="/fragrance" 
                className="px-3 py-2 rounded-[10px] text-sm font-medium hover:outline hover:outline-[1.5px] hover:outline-black hover:bg-transparent"
                style={navLinkStyle}
              >
                Fragrance
              </Link>

              {/* DEALS DROPDOWN */}
              {/* <div className="relative">
                <Link
                  to="/deals" 
                  onClick={() => setDealsOpen((v) => !v)} 
                  onMouseEnter={() => setDealsOpen(true)}
                  onMouseLeave={() => setDealsOpen(false)}
                  className="px-3 py-2 rounded-[10px] text-sm font-medium hover:outline hover:outline-[1.5px] hover:outline-black hover:bg-transparent"
                  style={navLinkStyle}
                >
                  Deals
                </Link>
                <div
                  ref={dealsDropdownRef}
                  onMouseEnter={() => setDealsOpen(true)}
                  onMouseLeave={() => setDealsOpen(false)}
                  className="absolute left-0 mt-2 w-60 bg-black shadow-xl rounded-lg py-2 pointer-events-auto ring-1 ring-gray-900/50 z-50"
                  style={{ opacity: dealsOpen ? 1 : 0, pointerEvents: dealsOpen ? "auto" : "none" }}
                >
                  {dealCategories.map((d, index) => (
                    <React.Fragment key={d}>
                      <Link
                        to={`/deals/${slugify(d)}`}
                        onClick={() => setDealsOpen(false)}
                        className="block px-5 py-2 text-sm transition-colors hover:bg-[#1f1f1f]"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, color: METALLIC_GOLD }} 
                      >
                        {d}
                      </Link>
                      {index < dealCategories.length - 1 && (
                        <hr className="mx-4 border-t border-gray-800 last:hidden" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div> */}

              {/* STATIC NAV ITEMS */}
              {staticNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 rounded-[10px] text-sm font-medium hover:outline hover:outline-[1.5px] hover:outline-black hover:bg-transparent"
                  style={navLinkStyle}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 2. DESKTOP SEARCH BAR */}
          <form onSubmit={handleSearch} className="flex-1 hidden md:flex justify-center px-4">
            <div className="w-full max-w-2xl relative"> 
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search makeup, skincare, brands..."
                className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-24 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-sm bg-black text-white hover:opacity-95"
                >
                Search
              </button>
            </div>
          </form>

          {/* 3. ICONS (CART & MOBILE TOGGLE) */}
          <div className="flex items-center gap-3">
            {/* CART LINK WITH DYNAMIC COUNT */}
            <Link
              to="/cart"
              className="relative inline-flex items-center p-2 rounded-[10px] hover:outline hover:outline-[1.5px] hover:outline-black hover:bg-transparent"
            >
              {/* Shopping Bag SVG Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="20" r="1"/>
                <circle cx="18" cy="20" r="1"/>
              </svg>
              {/* DYNAMIC CART COUNT BADGE */}
              {cartCount > 0 && (
                <span 
                    className="absolute -top-1 -right-1 text-xs font-bold bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <button
                id="mobile-menu-button"
                ref={mobileButtonRef}
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-md focus:ring-2 focus:ring-black text-black"
              >
                {mobileOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU PANEL */}
      <div
        ref={mobilePanelRef}
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden ${mobileOpen ? "max-h-[900px]" : "max-h-0"} bg-white border-t`}
      >
        <div className="px-4 py-4 space-y-2">

            {/* MOBILE SEARCH BAR */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                    <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-sm bg-black text-white hover:opacity-95"
                    >
                        Search
                    </button>
                </div>
            </form>


          {/* MOBILE HOME LINK */}
          <Link to="/" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-gray-100 hover:outline hover:outline-[1.5px] hover:outline-black" style={navLinkStyle}>Home</Link>
     
<Link to="/deals" className="nav-link">Deals</Link>

          {/* MOBILE PRODUCTS DROPDOWN */}
          <div>
            <Link
              to="/products" 
              onClick={() => setProductsOpen((v) => !v)}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-[10px] hover:outline hover:outline-[1.5px] hover:outline-black"
            >
              <span className="font-medium" style={navLinkStyle}>Products</span>
              <span className="text-sm" style={navLinkStyle}>{productsOpen ? "−" : "+"}</span>
            </Link>
            <div className={`transition-[max-height] duration-300 overflow-hidden ${productsOpen ? "max-h-[500px]" : "max-h-0"}`}>
              <div className="pl-4 mt-2 space-y-1">
                {productCategories.map((cat) => (
                  <Link 
                    key={cat} 
                    to={cat === "All Products" ? "/products" : `/products/${slugify(cat)}`}
                    onClick={handleMobileLinkClick} 
                    className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md" 
                    style={navLinkStyle}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* MOBILE FRAGRANCE LINK */}
          <Link to="/fragrance" onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-gray-100 hover:outline hover:outline-[1.5px] hover:outline-black" style={navLinkStyle}>Fragrance</Link>

          {/* MOBILE DEALS DROPDOWN */}
          <div>
            <Link 
              to="/deals" 
              onClick={() => setDealsOpen((v) => !v)} 
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-[10px] hover:outline hover:outline-[1.5px] hover:outline-black"
            >
              <span className="font-medium" style={navLinkStyle}>Deals</span>
              <span className="text-sm" style={navLinkStyle}>{dealsOpen ? "−" : "+"}</span>
            </Link>
            <div className={`transition-[max-height] duration-300 overflow-hidden ${dealsOpen ? "max-h-[300px]" : "max-h-0"}`}>
              <div className="pl-4 mt-2 space-y-1">
                {dealCategories.map((d) => (
                  <Link key={d} to={`/deals/${slugify(d)}`} onClick={handleMobileLinkClick} className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md" style={navLinkStyle}>{d}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE STATIC NAV ITEMS */}
          {staticNavItems.map((item) => (
            <Link key={item.name} to={item.href} onClick={handleMobileLinkClick} className="block px-3 py-2 rounded-[10px] text-sm font-medium hover:bg-gray-100 hover:outline hover:outline-[1.5px] hover:outline-black" style={navLinkStyle}>{item.name}</Link>
          ))}

        </div>
      </div>
    </header>
 );
}
