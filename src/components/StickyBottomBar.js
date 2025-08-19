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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Product Image & Info */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 border-gold-500/40 shadow-lg flex-shrink-0">
              <img 
                src={productImage} 
                alt="Pure Himalayan Shilajit" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="text-white font-bold text-base sm:text-lg truncate">Pure Himalayan Shilajit</h4>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-gold-400 font-bold text-lg sm:text-xl">₹790</span>
                {/* <span className="text-gray-400 line-through text-sm sm:text-base">₹4,999</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                  50% OFF
                </span> */}
              </div>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 hidden sm:block">Limited Time Offer</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <a 
              href="/checkout"
              className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm sm:text-base whitespace-nowrap shadow-lg hover:from-gold-600 hover:to-gold-500 flex-1 sm:flex-none text-center"
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
