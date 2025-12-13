import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import imgLotion from "../assets/About lotion.jpg";
import imgShampoo from "../assets/Aboutshampo.jpg";
import imgFace from "../assets/Aboutfacewash.jpg";

export default function AboutSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const products = [
    { id: "lotion", name: "SarTrends Lotion", img: imgLotion },
    { id: "shampoo", name: "SarTrends Shampoo", img: imgShampoo },
    { id: "facewash", name: "SarTrends Face Wash", img: imgFace },
  ];

  const scrollToProducts = () => {
    const target = document.getElementById("products-section");
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: y, behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleCTAClick = () => {
    if (location.pathname === "/") {
      if (!scrollToProducts()) navigate("/products");
      return;
    }
    navigate("/");
    setTimeout(() => {
      if (!scrollToProducts()) navigate("/products");
    }, 150);
  };

  return (
    <section className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT CONTENT — NOW DETAILED, FULL, PREMIUM */}
          <div className="space-y-7 fade-up">

            {/* PREMIUM TAG */}
            <span
              className="px-4 py-1 inline-block rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: "linear-gradient(90deg, rgba(184,134,11,0.12), rgba(184,134,11,0.24))",
                color: "#B8860B",
                letterSpacing: "0.6px",
              }}
            >
              Unisex • Premium • Designed by SarTrends
            </span>

            {/* TITLE */}
            <h2
              className="text-5xl sm:text-6xl font-extrabold leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#111",
                letterSpacing: "-0.5px",
              }}
            >
              Where <span className="luxury-title">Elegance</span>  
              <br className="hidden sm:block" />
              Meets <span className="luxury-title">Innovation</span>
            </h2>

            {/* SUBTITLE WITH NEW PREMIUM ANIMATION */}
            <p
              className="premium-subtext"
              style={{
                maxWidth: "520px",
                fontSize: "1.1rem",
                color: "#444",
                lineHeight: 1.55,
              }}
            >
              Discover a collection crafted with precision, luxury, and modern refinement.  
              Every SarTrends formula is created to elevate your daily ritual with a touch  
              of sophistication and a promise of superior performance.
            </p>

            {/* GOLD DIVIDER */}
            <div
              className="w-24 h-[3px] rounded-full"
              style={{
                background: "linear-gradient(90deg,#a67c00,#d4af37,#f9e7b3)",
                boxShadow: "0 0 12px rgba(212,175,55,0.35)",
              }}
            />

            {/* THREE PREMIUM POINTS (MORE DETAILED) */}
            <div className="space-y-7">

              <div className="flex items-start gap-4 premium-item">
                <div className="gold-icon">✔</div>
                <div>
                  <h4 className="premium-head">High-End Formulations</h4>
                  <p className="premium-body">
                    Crafted with clinically-tested premium actives for visible, real results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 premium-item">
                <div className="gold-icon">✦</div>
                <div>
                  <h4 className="premium-head">Designed for Everyone</h4>
                  <p className="premium-body">
                    A unisex philosophy — textures, scents and elegance made for all.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 premium-item">
                <div className="gold-icon">◆</div>
                <div>
                  <h4 className="premium-head">Produced by SarTrends</h4>
                  <p className="premium-body">
                    Small-batch manufacturing ensures consistency, purity and freshness.
                  </p>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCTAClick}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full shadow-lg transition-all hover:-translate-y-1"
              style={{
                background: "linear-gradient(90deg,#B8860B,#D4AF37)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Explore Our Collection
            </button>

          </div>

          {/* RIGHT — PREMIUM CARDS WITH METALLIC BADGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {products.map((p, idx) => (
              <div
                key={p.id}
                className="relative rounded-3xl overflow-hidden card-entrance luxury-zoom premium-shadow"
                style={{
                  ['--delay']: `${idx * 150}ms`,
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >

                {/* GOLD METALLIC BADGE */}
                <div
                  className="absolute left-4 top-4 premium-badge"
                >
                  Premium — SarTrends
                </div>

                {/* IMAGE */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover card-img"
                  />

                  {/* SHEEN */}
                  <div className="sheen"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* CSS */}
      <style>{`
        
        /* GOLD TITLE ANIMATION */
        @keyframes goldShine {
          0% { background-position: -180%; }
          100% { background-position: 180%; }
        }
        .luxury-title {
          background: linear-gradient(90deg,#8a6a29,#d7b669,#fff1cc,#d7b669,#8a6a29);
          background-size: 250%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShine 4s linear infinite;
        }

        /* PREMIUM SUBTITLE DETAILED ANIMATION */
        @keyframes smoothFade {
          0% { opacity: 0; transform: translateY(10px); letter-spacing: -0.5px; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0px; }
        }
        .premium-subtext {
          opacity: 0;
          animation: smoothFade 0.9s ease forwards;
          animation-delay: 250ms;
        }

        /* GOLD ICONS */
        .gold-icon {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          background: linear-gradient(145deg,#b8860b22,#b8860b33);
          color: #B8860B;
          box-shadow: 0 6px 16px rgba(184,134,11,0.22);
        }

        .premium-head {
          font-size: 1rem;
          font-weight: 700;
          color: #111;
        }
        .premium-body {
          font-size: 0.9rem;
          color: #555;
        }

        /* CARD + ZOOM */
        .luxury-zoom img {
          transform: scale(1.03);
          transition: transform 1s cubic-bezier(.25,.75,.25,1);
        }
        .luxury-zoom:hover img {
          transform: scale(1.09);
        }

        /* METALLIC BADGE */
        .premium-badge {
          background: linear-gradient(90deg,#b8860b,#e5c77a);
          color: white;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(184,134,11,0.35);
        }

        /* SHEEN EFFECT */
        .sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.4) 40%, transparent 75%);
          transform: translateX(-120%) skewX(-12deg);
          transition: 0.6s ease;
        }
        .luxury-zoom:hover .sheen {
          transform: translateX(40%);
          opacity: 1;
        }

        /* PREMIUM SHADOW */
        .premium-shadow {
          box-shadow: 0 20px 60px rgba(15,23,42,0.10);
        }
        .premium-shadow:hover {
          box-shadow: 0 30px 80px rgba(15,23,42,0.16);
          transform: translateY(-4px);
          transition: 0.3s ease;
        }

        /* CARD ENTRANCE */
        @keyframes fadeUpCard {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .card-entrance {
          opacity: 0;
          animation: fadeUpCard 0.8s ease forwards;
          animation-delay: var(--delay, 0ms);
        }

      `}</style>
    </section>
  );
}
