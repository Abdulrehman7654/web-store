// src/Components/AnimatedHeader.jsx

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap'; 

export default function AnimatedHeader({ title, subTitle, signatureGold, refinedCharcoal }) {
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);

    useEffect(() => {
        // Ensure gsap is working and elements exist
        if (!titleRef.current || !subTitleRef.current) return;
        
        // 1. Initial State: Hide elements slightly off-screen
        gsap.set([titleRef.current, subTitleRef.current], { 
            autoAlpha: 0, 
            y: 20 
        }); 

        // 2. Animation Sequence
        gsap.timeline()
            .to(titleRef.current, {
                duration: 1, 
                autoAlpha: 1, 
                y: 0, 
                ease: "power2.out"
            })
            .to(subTitleRef.current, {
                duration: 0.8, 
                autoAlpha: 1, 
                y: 0, 
                ease: "power2.out"
            }, "-=0.6"); // Starts 0.6 seconds before the first animation finishes

    }, [title, subTitle]); 

    return (
        <div className="mb-10 text-center">
            <p 
                ref={subTitleRef}
                className="text-lg font-medium uppercase tracking-widest mb-1"
                style={{ color: signatureGold, fontFamily: "Roboto, sans-serif" }}
            >
                {subTitle}
            </p>
            <h1 
                ref={titleRef} 
                className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                style={{ fontFamily: "Playfair Display, serif", color: refinedCharcoal }} 
            >
                {title}
            </h1>
        </div>
    );
}