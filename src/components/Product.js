import React, { useState } from 'react';
import { motion } from 'framer-motion';
import product from '../assets/product.jpg'; // Single box image 1
import product1 from '../assets/product1.jpg'; // Single box image 2
import product2 from '../assets/product2.jpg'; // Single box image 3
import product3 from '../assets/productone.jpg'; // 1+1 Free product image


const Product = () => {
  const [selectedOffer, setSelectedOffer] = useState(2); // Default to 1+1 offer

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
      images: [product, product1, product2] // Multiple images for single box
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

  return (
    <section id="product" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Dynamic Product Images based on selection */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-8 shadow-2xl">
                {selectedOffer === 1 ? (
                  // Single box - show multiple product images in a grid
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <img  
                        src={product}
                        alt="Premium Himalayan Shilajit - Main"
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <img  
                        src={product1}
                        alt="Premium Himalayan Shilajit - Detail 1"
                        className="w-full h-full md:h-full object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                ) : (
                  // 1+1 Free offer - show special offer image
                  <div className="relative">
                    <img  
                      src={product3}
                      alt="Premium Himalayan Shilajit - Buy 1 Get 1 Free"
                      className="w-full h-64 md:h-full object-cover rounded-xl shadow-lg"
                    />
                    {/* Special offer overlay */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm transform rotate-12 shadow-lg">
                      1+1 FREE!
                    </div>
                    {/* <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                      <p className="text-sm font-semibold">Double the Value!</p>
                      <p className="text-xs">Two boxes for the price of one</p>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Product Features */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {{
                { icon: "🏔️", title: "Himalayan", subtitle: "Source" },
                { icon: "✅", title: "100% Pure", subtitle: "Natural" },
                { icon: "🧪", title: "Lab", subtitle: "Tested" },
                { icon: "🚚", title: "Free", subtitle: "Shipping" }
              }.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-4 text-center shadow-lg"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-bold text-gray-900">{feature.title}</div>
                  <div className="text-xs text-gray-600">{feature.subtitle}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          {/* Product Information & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Product Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Package</h3>
              
              {/* Product Options */}
              <div className="space-y-4 mb-8">
                {productOffers.map((offer) => {
                  const savings = offer.originalPrice - offer.price;
                  const isSelected = selectedOffer === offer.id;
                  
                  return (
                    <motion.div 
                      key={offer.id} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedOffer(offer.id)}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all relative ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50 shadow-lg' 
                          : 'border-gray-200 bg-gray-50 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-center">
                        {/* Selection indicator */}
                        <div className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 ${
                          isSelected 
                            ? 'bg-amber-500 border-amber-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mb-2 mt-4">{offer.title}</h4>
                        <div className={`${offer.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block`}>
                          {offer.badge}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                        
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-amber-600">₹{offer.price.toLocaleString()}</div>
                          <div className="text-lg text-gray-500 line-through">₹{offer.originalPrice.toLocaleString()}</div>
                          <div className="text-lg text-green-600 font-semibold">
                            Save ₹{savings.toLocaleString()}
                          </div>
                          {offer.id === 2 && (
                            <div className="text-sm text-amber-600 font-medium">
                              That's ₹{Math.round(offer.price/2)} per box!
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Most Popular Badge for Buy 1 Get 1 */}
                      {offer.id === 2 && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-lg">
                          MOST POPULAR
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Product Summary */}
              {/* <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-6 text-white mb-6">
                <div className="text-center">
                  <h4 className="text-lg font-bold mb-2">Your Selection:</h4>
                  <p className="text-xl font-bold">{currentOffer.title}</p>
                  <p className="text-2xl font-bold">₹{currentOffer.price.toLocaleString()}</p>
                  <p className="text-sm opacity-90 mt-2">{currentOffer.description}</p>
                </div>
              </div> */}

              {/* Call to Action Buttons */}
              <div className="space-y-4">
                <motion.a
                  href={`/checkout?product=${currentOffer.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <span>🛒</span>
                  Order Now - ₹{currentOffer.price.toLocaleString()}
                </motion.a>
                
                {/* Phone numbers display */}
                <div className="text-center py-2">
                  <p className="text-gray-700 font-medium text-sm mb-1">Numbers to call:</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-amber-600 font-bold">
                    <span>📞 9030648333</span>
                    <span className="hidden sm:inline text-gray-400">|</span>
                    <span>📞 9030732444</span>
                  </div>
                </div>
                
                <motion.a
                  href="tel:+919030648333"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>📞</span>
                  Call Our Experts - +91 90306 48333
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-amber-200">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🚚</span>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>↩️</span>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;