import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 lg:px-16 py-6 bg-black/20 border-b border-gold-500/20">
      <div className="flex flex-col items-start">
        <img src={logo} alt="Logo" className="w-32 h-32 object-contain" />
      </div>
      
      <div className="hidden lg:flex gap-8 xl:gap-12 items-center">
        <a href="#home" className="nav-link relative text-white font-medium py-2 transition-colors duration-300 hover:text-gold-500 group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#about" className="nav-link relative text-white font-medium py-2 transition-colors duration-300 hover:text-gold-500 group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        {/* <a href="#benefits" className="nav-link relative text-white font-medium py-2 transition-colors duration-300 hover:text-gold-500 group">
          Benefits
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
        </a> */}
        <a href="#product" className="nav-link relative text-white font-medium py-2 transition-colors duration-300 hover:text-gold-500 group">
          Products
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="##reviews" className="nav-link relative text-white font-medium py-2 transition-colors duration-300 hover:text-gold-500 group">
          Reviews
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#contact" className="nav-link relative text-white font-medium py-2 transition-colors duration-300 hover:text-gold-500 group">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
          <a 
          href="tel:+919030648333"
          className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(255,215,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,215,0,0.4)] text-sm lg:text-base flex items-center gap-2"
        >
           Call Now
        </a>
      </div>
    </nav>
  );
};

export default Navbar;