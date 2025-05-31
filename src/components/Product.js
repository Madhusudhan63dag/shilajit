import React from 'react';
import { motion } from 'framer-motion';
import product from '../assets/product.jpg'; // Add your product image here
const Product = () => {  const productInfo = {
    size: '20g',
    price: 3990,
    originalPrice: 7999,
    servings: '40 servings',
    description: 'Premium Himalayan Shilajit - Buy 1 Get 1 Free Offer!'
  };

  const savings = productInfo.originalPrice - productInfo.price;

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
            {/* Product Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-8 shadow-2xl">
                <img
                  src={product}
                  alt="Premium Himalayan Shilajit"
                  className="w-full h-full md:h-96  rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Product Information & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >            {/* Product Information & CTA */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Premium Package</h3>
                {/* Single Product Display */}
              <div className="border-2 border-amber-500 bg-amber-50 rounded-xl p-6 mb-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{productInfo.size} Package</h4>
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                    BUY 1 GET 1 FREE!
                  </div>
                  <p className="text-gray-600 mb-4">{productInfo.servings}</p>
                  <p className="text-sm text-gray-600 mb-6">{productInfo.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-amber-600">₹{productInfo.price}</div>
                    <div className="text-lg text-gray-500 line-through">₹{productInfo.originalPrice}</div>
                    <div className="text-lg text-green-600 font-semibold">
                      Save ₹{savings}
                    </div>
                  </div>
                </div>
              </div>              {/* Call to Action Buttons */}
              <div className="space-y-4">
                <motion.a
                  href="tel:+919030732444"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                   Buy Now - 20 Grams (1+1 Free)
                </motion.a>
                
                <motion.a
                  href="tel:+919030732444"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                   Call Our Experts
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;