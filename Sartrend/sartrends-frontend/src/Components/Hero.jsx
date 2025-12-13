// src/Components/Hero.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
// Renaming imports to match the visual purpose in the new design
import productShotHand from "../assets/model.jpg"; // Image: Hand applying product (Placeholder)
import productShotBottles from "../assets/charcoal-featured.png"; // Image: Two bottles with branches (Placeholder)
import prodA from "../assets/charcoal-1.jpeg"; // Used in product lineup
import prodB from "../assets/charcoal-2.jpeg"; // Used in product lineup
import prodC from "../assets/charcoal-3.jpeg"; // Used in product lineup

const initialProducts = [
  { id: "p1", name: "Charcoal Deep Clean", subtitle: "Detox • Oil Control", price: "₨1,299", image: prodA, slug: "/product/charcoal-deep-clean" },
  { id: "p2", name: "Charcoal Glow Scrub", subtitle: "Exfoliate • Brighten", price: "₨1,499", image: prodB, slug: "/product/charcoal-glow-scrub" },
  { id: "p3", name: "Charcoal Hydrating Mask", subtitle: "Detox • Hydrate", price: "₨1,799", image: prodC, slug: "/product/charcoal-mask" },
];

/**
 * Taglines array: each item can have `primary` and `secondary` (secondary will be gold).
 */
const taglines = [
  { primary: "Unisex Beauty", secondary: " Made For Elegance" },
  { primary: "Naturally Radiant", secondary: " Crafted For All Skin Tones" },
  { primary: "Glow With Confidence", secondary: " Clean • Kind • Effective" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [products] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);

  // header popups
  const [popup, setPopup] = useState({ which: null, show: false });
  const popupTimerRef = useRef(null);

  // Typing loop state
  const [displayPrimary, setDisplayPrimary] = useState("");
  const [displaySecondary, setDisplaySecondary] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Manage timers for cleanup
  const timers = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    timers.current.push(t);
    return () => {
      // cleanup
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, []);

  // Typing/loop logic with easing per character
  useEffect(() => {
    let mountedFlag = true;
    let taglineIndex = 0;

    // Helper easing function -> returns factor [0..1]
    const ease = (x) => (1 - Math.cos(Math.PI * x)) / 2;

    const pushTimer = (id) => timers.current.push(id);

    const typeText = (text, setFn, baseSpeed = 70) =>
      new Promise((resolve) => {
        let i = 0;
        const length = text.length;
        const run = () => {
          if (!mountedFlag) return resolve();
          i += 1;
          setFn(text.slice(0, i));
          if (i < length) {
            // per-char delay with ease curve: slower at start/end
            const progress = i / length;
            // Base speed is adjusted here for a more deliberate, premium feel
            const delay = Math.round(baseSpeed * (0.5 + 0.5 * ease(progress))); 
            pushTimer(setTimeout(run, delay));
          } else {
            resolve();
          }
        };
        run();
      });

    const runLoop = async () => {
      while (mountedFlag) {
        const tline = taglines[taglineIndex % taglines.length];
        // reset displays
        setDisplayPrimary("");
        setDisplaySecondary("");
        setIsTyping(true);

        // type primary (Slightly slower: 85ms avg)
        await typeText(tline.primary, setDisplayPrimary, 85); 

        // small pause (Slightly longer pause)
        await new Promise((r) => pushTimer(setTimeout(r, 250)));

        // type secondary (Slightly slower: 75ms avg)
        if (tline.secondary && tline.secondary.length > 0) {
          await typeText(tline.secondary, setDisplaySecondary, 75);
        }

        // done typing
        setIsTyping(false);

        // keep entire tagline visible for some time (Longer hold: 2500ms)
        await new Promise((r) => pushTimer(setTimeout(r, 2500))); 

        // erase secondary letter-by-letter
        if (tline.secondary && tline.secondary.length > 0) {
          for (let k = tline.secondary.length; k >= 0; k--) {
            if (!mountedFlag) break;
            setDisplaySecondary(tline.secondary.slice(0, k));
            // erase delay (Slower: 40ms to 50ms)
            const d = Math.round(40 + 10 * (k / (tline.secondary.length || 1)));
            await new Promise((r) => pushTimer(setTimeout(r, d)));
          }
        }

        // erase primary
        for (let k = tline.primary.length; k >= 0; k--) {
          if (!mountedFlag) break;
          setDisplayPrimary(tline.primary.slice(0, k));
          // erase delay (Slower: 50ms to 60ms)
          const d = Math.round(50 + 10 * (k / (tline.primary.length || 1)));
          await new Promise((r) => pushTimer(setTimeout(r, d)));
        }

        // short gap before next tagline (Longer gap: 400ms)
        await new Promise((r) => pushTimer(setTimeout(r, 400)));

        taglineIndex++;
      }
    };

    runLoop();

    return () => {
      mountedFlag = false;
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Modal scroll lock & ESC behavior
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (showModal) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [showModal]);

  const handleKey = useCallback((e) => {
    if (e.key === "Escape" && showModal) setShowModal(false);
  }, [showModal]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Header popup helpers
  const showHeaderPopup = (which, delay = 1400) => {
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
    setPopup({ which, show: true });
    popupTimerRef.current = setTimeout(() => setPopup({ which: null, show: false }), delay);
  };

  const handleBrowseClick = () => {
    showHeaderPopup("browse");
    setTimeout(() => (window.location.href = "/products"), 300);
  };
  const handleCloseClick = () => {
    showHeaderPopup("close");
    setShowModal(false);
  };

  return (
    <section className="w-full bg-[#faf9f7] px-6 sm:px-10 lg:px-20 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT (MODIFIED: Luxury Typography, CTA, and Social Proof) */}
        <div className={`lg:col-span-5 order-2 lg:order-1 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" // Luxury Style: Larger size, higher weight
            style={{
              fontFamily: "Playfair Display",
              color: "#111",
              lineHeight: 1.0, // Tighter line height
              marginBottom: 10,
              whiteSpace: "pre-wrap",
            }}
            aria-label={`${displayPrimary}${displaySecondary}`}
          >
            <span>{displayPrimary}</span>
            <span style={{ color: "#D4AF37" }}>{displaySecondary}</span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 14, // Thicker blinker line
                height: 0,
                borderRight: isTyping ? "3px solid #111" : "3px solid transparent",
                marginLeft: 8,
                verticalAlign: "middle",
                animation: isTyping ? "blink 1.2s steps(1, start) infinite" : "none", // Slower, step-based blink
              }}
            />
          </h1>

          <p
            className="text-gray-700 text-base sm:text-xl transition-all duration-450 ease-[cubic-bezier(.2,.8,.2,1)]" // Larger subtitle text
            style={{
              fontFamily: "Poppins",
              opacity: 1,
              transform: "translateY(0)",
              marginTop: 10,
            }}
          >
            Elevate your natural glow with our premium cruelty-free cosmetics —
            crafted for all skin tones, designed to perform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8"> {/* Larger gap and margin */}
            <a href="/products" className="px-8 py-4 rounded-3xl text-base font-semibold shadow-xl transition inline-flex items-center justify-center hover:-translate-y-0.5" style={{ background: "#111", color: "#D4AF37", fontFamily: "Poppins" }}>
              Shop Now
            </a>

            <a href="/products?filter=best-sellers" className="px-7 py-4 rounded-3xl text-base font-medium border-2 border-[#D4AF37] hover:bg-[#fff9f4] transition inline-flex items-center justify-center" style={{ fontFamily: "Poppins", color: "#111" }}>
              Best Sellers
            </a>
          </div>

          {/* Social Proof / Trust Section */}
          <div className="mt-12 flex items-center gap-4">
            {/* Avatar Stack (placeholder visual) */}
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-[#faf9f7] flex items-center justify-center text-xs font-semibold text-gray-700 relative z-30">A</div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#faf9f7] flex items-center justify-center text-xs font-semibold text-gray-700 relative z-20">B</div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#faf9f7] flex items-center justify-center text-xs font-semibold text-gray-700 relative z-10">C</div>
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#faf9f7] flex items-center justify-center text-xs font-semibold text-gray-700 relative z-0">+2K</div>
            </div>
            
            {/* Rating/Trust Text */}
            <div className="flex flex-col">
                <p className="text-sm font-bold flex items-center" style={{ fontFamily: "Poppins", color: "#111" }}>
                    <span className="text-xl text-[#FFC700] mr-1">★</span> 4.9/5
                </p>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "Poppins" }}>
                    Based on 2,400+ reviews
                </p>
            </div>
          </div>
        </div>

        {/* RIGHT CARDS (Product Gallery Layout - Unchanged from fix) */}
        <div className={`lg:col-span-7 order-1 lg:order-2 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Main container for the 3-image grid layout */}
          <div className="grid grid-cols-2 grid-rows-[1fr_2fr] gap-4 w-full h-[560px] max-w-[640px] mx-auto">
            
            {/* 1. TOP LEFT CARD: Hand applying product */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.01] duration-300" style={{ backgroundColor: "#f2e8de" }}>
              <img 
                src={productShotHand} 
                alt="Product applied to hand" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            
            {/* 2. TOP RIGHT CARD: Bottles with branches */} 
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.01] duration-300" style={{ backgroundColor: "#f2e8de" }}>
              <img 
                src={productShotBottles} 
                alt="Two bottles with branch decoration" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            
            {/* 3. BOTTOM CARD: Product Lineup with Review (spans both columns) */}
            <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-300" style={{ backgroundColor: "#fff5e9" }}>
              
              {/* Product Lineup */}
              <div className="absolute inset-0 w-full h-full flex items-end justify-center py-4 px-8 overflow-hidden">
                <div className="flex items-end space-x-2 sm:space-x-4 h-full pt-10">
                    <img src={prodA} alt="Product A" className="h-[75%] w-auto object-contain" />
                    <img src={prodB} alt="Product B" className="h-[85%] w-auto object-contain" />
                    <img src={prodC} alt="Product C" className="h-full w-auto object-contain" />
                    <img src={prodB} alt="Product D" className="h-[90%] w-auto object-contain" />
                    <img src={prodA} alt="Product E" className="h-[80%] w-auto object-contain" />
                </div>
              </div>

              {/* Review/Rating Overlay */}
              <div className="absolute bottom-4 left-4 p-4 rounded-xl shadow-lg backdrop-blur-sm bg-white/70 border border-white/80 w-[200px] text-center" style={{ borderRadius: 12 }}>
                <div className="flex items-center justify-center mb-1">
                  {/* 5-star rating visual */}
                  <span className="text-[#FFC700]">
                    ★★★★★
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-800" style={{ fontFamily: "Poppins" }}>
                  Satrie Dedeet
                </p>
                <p className="text-[10px] text-gray-500" style={{ fontFamily: "Poppins" }}>
                  Most Valuable Products
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal (unchanged structure & behaviour) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4 sm:px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: "90vh" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold" style={{ fontFamily: "Playfair Display" }}>Sar Trends — Featured Products</h3>
                <p className="text-sm text-gray-500" style={{ fontFamily: "Poppins" }}>Our personal branded range — premium labeling and crafted with care.</p>
              </div>

              <div className="flex items-center gap-2 relative">
                <button onClick={handleBrowseClick} className="px-3 py-2 rounded-md text-sm font-semibold" style={{ background: "#111", color: "#D4AF37" }}>Browse All</button>
                <button onClick={handleCloseClick} className="px-3 py-2 rounded-md text-sm font-medium border">Close</button>

                {popup.show && popup.which === "browse" && (
                  <div className="absolute right-0 top-full mt-2 w-44 p-2 rounded-md text-sm shadow-lg animate-popup" style={{ background: "#111", color: "#fff", fontFamily: "Poppins" }}>
                    <div className="text-xs opacity-80">Opening products…</div>
                  </div>
                )}
                {popup.show && popup.which === "close" && (
                  <div className="absolute right-0 top-full mt-2 w-36 p-2 rounded-md text-sm shadow-lg animate-popup" style={{ background: "#111", color: "#fff", fontFamily: "Poppins" }}>
                    <div className="text-xs opacity-80">Closing…</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-6 overflow-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                  <article key={p.id} className="rounded-xl border p-0 flex flex-col h-full overflow-hidden group" style={{ borderColor: "#f0f0f0" }}>
                    <div className="w-full h-44 sm:h-52 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-2" style={{ background: "linear-gradient(90deg,#D4AF37,#F7E7CE)", color: "#111", fontFamily: "Poppins" }}>Sar Trends</span>

                      <h4 className="text-base font-semibold" style={{ fontFamily: "Playfair Display" }}>{p.name}</h4>
                      <p className="text-sm text-gray-500" style={{ fontFamily: "Poppins" }}>{p.subtitle}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm font-semibold" style={{ fontFamily: "Poppins" }}>{p.price}</div>
                        <a href={p.slug} className="text-sm px-3 py-2 rounded-lg border border-[#D4AF37] hover:bg-[#f9f6f2] transition">View</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* small keyframes (unchanged) */}
      <style>{`
        @keyframes popupAnim {
          0% { opacity: 0; transform: translateY(-6px) scale(0.95); }
          20% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0.98; transform: translateY(-2px) scale(0.99); }
        }
        .animate-popup { animation: popupAnim 1.4s ease forwards; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </section>
  );
}