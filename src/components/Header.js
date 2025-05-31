import React from 'react';
import Navbar from './Navbar';
import bannerImage from '../assets/banner1.png'; // Add your banner image here

const Header = () => {
  return (
    <header className="relative w-full">
      {/* Include Navbar - Block element */}
      <Navbar />
        {/* Main Banner Showcase */}
      <div className="w-full h-full overflow-hidden">
          <img 
            src={bannerImage} 
            alt="Shilajit Banner" 
            className="w-full h-full"
          />
      </div>
    </header>
  );
};

export default Header;