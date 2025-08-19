import React from 'react';
import about from '../assets/product3.png'; // Add your about image here
import lab from '../assets/lab.png'; // Add your lab image here
import careful from '../assets/careful.png'; // Add your careful sourcing image here
import pre from '../assets/package.png'; // Add your packaging image here
import banner4 from '../assets/banner4.jpg'; // Add your banner image here
import product from '../assets/product4.jpg'; // Add your product image here
import banner3 from '../assets/banner3.jpg'; // Add your banner image here


const About = () => {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-500/30 rounded-full mb-6">
            <span className="text-gold-400 text-sm font-medium">✨ Ancient Wisdom Meets Modern Science</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Our 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">
              Pure Himalayan Shilajit
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We have a powerful, natural product that helps your body handle stress. It comes from the clean, high mountains of the Himalayas and is trusted by people who are focused on health.
          </p>

        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What is Shilajit?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Shilajit is a natural, sticky substance from the Himalayan mountains. It's created over hundreds of years as plants and minerals break down, making it full of healthy nutrients. People have used it for a long time to increase their energy, improve their focus, and feel better overall. This ancient remedy is rich in fulvic acid and essential minerals that help the body absorb nutrients more effectively, boost stamina, and support healthy aging.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We source only the purest Himalayan Shilajit from elevations above 18,000 feet — far from pollution and human impact. This ensures maximum potency, purity, and natural strength in every dose. Each batch is carefully purified and tested for safety, giving you a trusted source of vitality straight from nature. Whether you want to enhance your physical performance, sharpen your mind, or support your immune system, our premium Shilajit is your daily dose of holistic wellness.
              </p>

            </div>
            <div>
              {/* <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why Our Shilajit?
              </h3> */}
            </div>

            {/* Key Benefits */}
            {/* <div className="bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gold-400 mb-4">Key Benefits</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-white">Boosts Energy & Stamina</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">Enhances Cognitive Function</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">Supports Physical Performance</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">Strengthens Immune System</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">Balances Hormones Naturally</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gold-500/20 to-gold-400/10 rounded-3xl p-8 border border-gold-500/20 backdrop-blur-sm">
              <div className="text-center space-y-6">
                <img 
                  src={about} 
                  alt="Pure Himalayan Shilajit" 
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-12">
              <img src={banner4} alt="Shilajit Banner" className="w-full h-auto rounded-2xl shadow-lg object-cover" />
        </div>

        {/* Our Process Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our Quality Process
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Product Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gold-500/20 to-gold-400/10 rounded-3xl p-8 border border-gold-500/20 backdrop-blur-sm">
                <div className="text-center">
                  <img 
                    src={product} 
                    alt="Pure Himalayan Shilajit Product" 
                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Process Steps */}
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img src={careful} alt="Careful Sourcing" className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gold-400 mb-3">Careful Sourcing</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Hand-picked from specific high-altitude locations in the Himalayas, 
                    ensuring only the purest and most potent Shilajit is collected from pristine environments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-xl border-2 border-gold-500/40 flex items-center justify-center bg-gradient-to-br from-black/50 to-gray-900/50 flex-shrink-0">
                  <img src={lab} alt="Lab Testing" className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gold-400 mb-3">Lab Testing</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Rigorous third-party testing for purity, potency, and safety. 
                    Every batch is verified to meet our strict quality standards before packaging.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-xl border-2 border-gold-500/40 flex items-center justify-center bg-gradient-to-br from-black/50 to-gray-900/50 flex-shrink-0">
                  <img src={pre} alt="Premium Packaging" className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gold-400 mb-3">Premium Packaging</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Sealed in airtight, UV-protected containers to preserve potency 
                    and ensure maximum freshness until it reaches your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* 
        <div>
          <img src={banner3} alt="Shilajit Banner" className="w-full h-auto rounded-2xl shadow-lg object-cover mb-12" />
        </div> */}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gold-500/10 to-gold-400/5 border border-gold-500/30 rounded-3xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Experience the Power of Pure Shilajit?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their wellness journey 
            with our premium Himalayan Shilajit.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/checkout"
              className="bg-transparent text-gold-400 border-2 border-gold-400 font-bold px-8 py-3.5 text-lg rounded-full cursor-pointer transition-all duration-300 hover:bg-gold-400 hover:text-black hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;