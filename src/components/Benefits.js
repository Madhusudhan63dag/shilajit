import React from 'react';

const Benefits = () => {
  return (
    <section id="benefits" className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-80 h-80 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-300 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-gold-500/20 to-gold-400/20 border border-gold-500/30 rounded-full mb-6">
            <span className="text-gold-400 text-sm font-medium">💪 Transform Your Health Naturally</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Amazing 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">
              Health Benefits
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the life-changing benefits of pure Himalayan Shilajit. Backed by ancient wisdom 
            and modern science, our premium supplement delivers results you can feel.
          </p>
        </div>

        {/* Main Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Energy & Stamina */}
          <div className="group bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-2">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Boosts Energy & Stamina</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Increases cellular energy production (ATP)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Reduces fatigue and exhaustion</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Enhances physical endurance</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Supports sustained energy levels throughout the day</span>
              </div>
            </div>
          </div>

          {/* Cognitive Function */}
          <div className="group bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-2">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Enhances Brain Function</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Improves memory and focus</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Enhances mental clarity</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Supports cognitive performance</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Protects against age-related cognitive decline</span>
              </div>
            </div>
          </div>

          {/* Physical Performance */}
          <div className="group bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-2">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Improves Physical Performance</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Increases muscle strength and recovery</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Enhances exercise performance</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Supports faster muscle repair</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Boosts athletic endurance</span>
              </div>
            </div>
          </div>

          {/* Immune System */}
          <div className="group bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-2">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Strengthens Immunity</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Boosts natural immune response</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Rich in antioxidants and minerals</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Fights inflammation naturally</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Supports overall health resilience</span>
              </div>
            </div>
          </div>

          {/* Hormonal Balance */}
          <div className="group bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-2">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Balances Hormones</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Supports healthy testosterone levels</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Regulates stress hormones</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Improves reproductive health</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Enhances vitality and libido</span>
              </div>
            </div>
          </div>

          {/* Anti-Aging */}
          <div className="group bg-gradient-to-br from-gold-500/10 to-gold-400/5 border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-2">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">Anti-Aging Properties</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Slows cellular aging process</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Promotes healthy skin and hair</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Supports longevity and vitality</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">•</span>
                <span>Rich in fulvic and humic acids</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gold-500/15 to-gold-400/10 border border-gold-500/30 rounded-3xl p-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h3>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Don't wait another day to experience these incredible benefits. 
            Start your journey to optimal health with our premium Himalayan Shilajit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-10 py-5 text-xl rounded-full cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(255,215,0,0.4)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,215,0,0.5)] hover:scale-105">
              Order Now - ₹3,999
            </button>
            <button className="bg-transparent text-gold-400 border-2 border-gold-400 font-bold px-10 py-4.5 text-xl rounded-full cursor-pointer transition-all duration-300 hover:bg-gold-400 hover:text-black hover:-translate-y-2">
              View Research Studies
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-gold-400">✓</span>
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-400">✓</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-400">✓</span>
              <span>Third-Party Tested</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;