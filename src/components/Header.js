import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import banner1 from '../assets/banner1.jpg';
import backgroundVideo from '../assets/background.mp4';

const Header = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Add event listeners to track video loading status
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoLoaded = () => setVideoLoaded(true);
      const handleVideoError = () => setVideoError(true);
      
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      videoElement.addEventListener('error', handleVideoError);
      
      // Try to play the video immediately to test autoplay capability
      videoElement.play().catch(err => {
        console.log("Video autoplay failed:", err);
        // If autoplay fails, we still want to show the video with play button
        setVideoError(true);
      });
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, []);
  
  return (
    <header id='home' className="relative w-full">
      <Navbar />
      
      <div className="relative w-full h-[30vh] sm:h-[70vh] md:h-[80vh] lg:h-[calc(100vh-80px)] overflow-hidden">
        {/* Always display banner1 as base layer */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={banner1} 
            alt="Shilajit Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Video layer that shows only when loaded */}
        {!videoError && (
          <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
            >
              <source src={backgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}
        
        {/* Content over video/image */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Shilajit Pure Himalayan 
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white">
              100% Pure & Natural
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;