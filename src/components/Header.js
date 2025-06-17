import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import banner1 from '../assets/banner1.jpg';
import backgroundVideo from '../assets/background.mp4';

const Header = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Add event listeners to track video loading status
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoLoaded = () => setVideoLoaded(true);
      const handleVideoError = () => setVideoError(true);
      
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      videoElement.addEventListener('error', handleVideoError);
      
      // Try to play the video unmuted first
      videoElement.muted = false;
      videoElement.play().catch(err => {
        console.log("Unmuted autoplay failed, trying muted:", err);
        // If unmuted autoplay fails, try muted autoplay as fallback
        videoElement.muted = true;
        setIsMuted(true);
        videoElement.play().catch(err2 => {
          console.log("Muted autoplay also failed:", err2);
          setVideoError(true);
        });
      });
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
        videoElement.removeEventListener('error', handleVideoError);
      };
    }
  }, []);
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
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
              loop
              playsInline
              onError={() => setVideoError(true)}
            >
              <source src={backgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Sound toggle button */}
            {videoLoaded && (
              <button 
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full text-white z-10"
              >
                {isMuted ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                }
              </button>
            )}
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