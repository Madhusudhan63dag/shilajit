import React, { useState, useEffect } from 'react';
import productImage from '../assets/about.jpg'; // Replace with actual product image

const StickyBottomBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show sticky bar after scrolling 300px
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-black/98 to-gray-900/98 backdrop-blur-xl border-t-2 border-gold-500/40 shadow-2xl transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-6">
          {/* Product Image & Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gold-500/40 shadow-lg">
              <img 
                src={productImage} 
                alt="Pure Himalayan Shilajit" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-white font-bold text-lg">Pure Himalayan Shilajit</h4>
              <div className="flex items-center gap-3">
                <span className="text-gold-400 font-bold text-xl">₹2,999</span>
                <span className="text-gray-400 line-through text-base">₹4,999</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  40% OFF
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-1">Limited Time Offer</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:+919030732444"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-3 text-base shadow-lg hover:from-green-600 hover:to-green-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a 
              href="/checkout"
              className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-base whitespace-nowrap shadow-lg hover:from-gold-600 hover:to-gold-500"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* Decorative glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-400/5 pointer-events-none"></div>
    </div>
  );
};

export default StickyBottomBar;
