import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import product from '../assets/product.jpg'; // Single box image 1
import product1 from '../assets/product1.jpg'; // Single box image 2
import product2 from '../assets/product2.jpg'; // Single box image 3
import product3 from '../assets/productone.jpg'; // 1+1 Free product image
import fassi from '../assets/fssai-color.png'; // FSSAI logo
import gmp from '../assets/gmp.webp'; // FDA logo



const Product = () => {
  const [selectedOffer, setSelectedOffer] = useState(2); // Default to 1+1 offer
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // For image gallery

  const productOffers = [
    {
      id: 1,
      title: '1 Box Only',
      size: '20g',
      price: 2500,
      originalPrice: 4999,
      description: 'Single box for personal use',
      badge: 'SINGLE PACK',
      badgeColor: 'bg-blue-500',
      images: [product1, product2] // Multiple images for single box
    },
    {
      id: 2,
      title: '2 Boxes (1+1 FREE)',
      size: '20g x 2',
      price: 3990,
      originalPrice: 7999,
      description: 'Premium Himalayan Shilajit - Buy 1 Get 1 Free Offer!',
      badge: 'BUY 1 GET 1 FREE!',
      badgeColor: 'bg-red-500',
      images: [product3] // Special image for 1+1 offer
    }
  ];

  const currentOffer = productOffers.find(offer => offer.id === selectedOffer);

  // All product images
  const allImages = [product1, product2, product3];

  return (
    <section id="product" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Himalayan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                Shilajit
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of nature's most potent superfood, sourced from the pristine Himalayas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Product Image Gallery - Presentation Style */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Main Display Image with Side Thumbnails */}
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex gap-4">
                    {/* Thumbnail Gallery - Side */}
                    <div className="flex flex-col gap-3">
                      {allImages.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            selectedImageIndex === index 
                              ? 'border-amber-500 shadow-lg' 
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {selectedImageIndex === index && (
                            <div className="absolute inset-0 bg-amber-500/20"></div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Main Display Image */}
                    <div className="flex-1">
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
                        <img  
                          src={allImages[selectedImageIndex]}
                          alt={`Premium Himalayan Shilajit - Image ${selectedImageIndex + 1}`}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                        
                        {/* Special offer overlay for 1+1 offer */}
                        {selectedOffer === 2 && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm transform rotate-12 shadow-lg">
                            1+1 FREE!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {selectedImageIndex + 1} / {allImages.length}
                </span>
              </div>
            </motion.div>

            {/* Product Information & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Product Selection */}
              <div className="p-6">
                <h1 className='text-black text-4xl'>Pure Original <span className='text-amber-500 font-bold'>Himalayan Shilajit</span></h1>
                <p className='text-gray-600'>Pure mountain energy to elevate your Vitality & Stamina</p>
                <div className="flex flex-row justify-between items-center mt-4">
                  <div className='flex items-center gap-2 my-4'>
                    <span className="text-sm font-medium text-gray-600">4.5/5</span>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={`text-lg ${index < 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-bold ">200 Reviews</span>
                  </div>
                  <div>
                    <img src={fassi} alt="FSSAI Logo" className="w-10 inline-block mr-2" />
                    <img src={gmp} alt="GMP Logo" className="w-10 inline-block" />
                  </div>
                </div>
                <div className="bg-black h-[2px] w-full mb-5"></div>
                {/* Product Features Grid */}
                <div className="space-y-3 my-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { text: "Sourced from the Valley of Padar" },
                      { text: "80+ minerals" },
                      { text: "4X effective resin formula" },
                      { text: "Made from surya tapi method" },
                      { text: "75% fulvic acid" },
                      { text: "Increases strength & stamina" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="bg-black rounded-full w-2 h-2"></span>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Product Options - Row Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {productOffers.map((offer) => {
                    const savings = offer.originalPrice - offer.price;
                    const isSelected = selectedOffer === offer.id;
                    
                    return (
                      <motion.div 
                        key={offer.id} 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedOffer(offer.id)}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all relative ${
                          isSelected 
                            ? 'border-amber-500 bg-amber-50 shadow-lg' 
                            : 'border-gray-200 bg-gray-50 hover:border-amber-300'
                        }`}
                      >
                        <div className="text-center">
                          {/* Selection indicator */}
                          <div className={`absolute top-2 left-2 w-4 h-4 rounded-full border-2 ${
                            isSelected 
                              ? 'bg-amber-500 border-amber-500' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>

                          <h4 className="text-base font-bold text-gray-900 mb-1 mt-2">{offer.title}</h4>
                          <div className={`${offer.badgeColor} text-white px-2 py-1 rounded-full text-xs font-bold mb-2 inline-block`}>
                            {offer.badge}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-xl font-bold text-amber-600">₹{offer.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500 line-through">₹{offer.originalPrice.toLocaleString()}</div>
                            <div className="text-sm text-green-600 font-semibold">
                              Save ₹{savings.toLocaleString()}
                            </div>
                            {offer.id === 2 && (
                              <div className="text-xs text-amber-600 font-medium">
                                ₹{Math.round(offer.price/2)} per box!
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Most Popular Badge for Buy 1 Get 1 */}
                        {offer.id === 2 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-2 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-lg">
                            POPULAR
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Call to Action Buttons */}
                <div className="space-y-3">
                  
                  {/* Phone numbers display */}
                  <div className="text-center py-1">
                    <p className="text-gray-700 font-medium text-xs mb-1">Numbers to call:</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-amber-600 font-bold text-sm">
                      <span> 9030648333</span>
                      <span className="hidden sm:inline text-gray-400">|</span>
                      <span>9030732444</span>
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <motion.a
                      href={`/checkout?product=${currentOffer.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base"
                    >
                      Order Now - ₹{currentOffer.price.toLocaleString()}
                    </motion.a>
                    <motion.a
                      href="tel:+919030648333"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      Call Our Experts - +91 90306 48333
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>


        {/* YouTube Video Section - Full Width */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="w-screen h-screen">
            <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-5 shadow-xl">
              <div className="relative overflow-hidden pt-[56.25%] rounded-xl shadow-inner">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/bTyuL5P8SfQ" 
                  title="Himalayan Shilajit - Premium Quality" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;