import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Review = () => {
  const scrollRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Chennai, Tamil Nadu",
      rating: 5,
      review: "After using this Himalayan Shilajit for 3 months, I feel completely transformed. My energy levels are through the roof, and I no longer feel tired during the day. Highly recommended!",
      verified: true,
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Priya Nair",
      location: "Kochi, Kerala",
      rating: 5,
      review: "Amazing product! I was skeptical at first, but the results speak for themselves. Better sleep, improved focus, and overall wellness. Worth every penny!",
      verified: true,
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Venkatesh Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      review: "This is the real deal! Pure, authentic Shilajit that actually works. I've tried other brands but nothing compares to this quality. My stamina has improved significantly.",
      verified: true,
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Dr. Lakshmi Rao",
      location: "Bangalore, Karnataka",
      rating: 5,
      review: "As a medical professional, I'm very particular about supplements. This Shilajit is exceptional - pure, potent, and delivers promised results. Recommending to my patients.",
      verified: true,
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Arun Krishnan",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      review: "Incredible boost to my workout performance! Recovery time has reduced, and I feel more energetic throughout the day. This is now part of my daily routine.",
      verified: true,
      date: "2 months ago"
    },
    {
      id: 6,
      name: "Meera Menon",
      location: "Thiruvananthapuram, Kerala",
      rating: 5,
      review: "Best investment in my health! Mental clarity has improved, and I feel more balanced overall. The quality is outstanding and shipping was super fast.",
      verified: true,
      date: "3 weeks ago"
    },
    {
      id: 7,
      name: "Suresh Iyer",
      location: "Madurai, Tamil Nadu",
      rating: 5,
      review: "This Shilajit is a game-changer! My immunity has strengthened, and I rarely fall sick now. The authentic Himalayan quality is evident in every dose.",
      verified: true,
      date: "1 month ago"
    },
    {
      id: 8,
      name: "Kavitha Pillai",
      location: "Mangalore, Karnataka",
      rating: 5,
      review: "Amazing results within just 2 weeks! Better energy, improved digestion, and overall vitality. This is exactly what I was looking for in a natural supplement.",
      verified: true,
      date: "2 weeks ago"
    }
  ];
  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let intervalId;
    let isHovered = false;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!isHovered && scrollContainer) {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;
          
          // If we've reached the end, reset to beginning
          if (currentScroll >= maxScroll / 2) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 2; // Adjust speed here (2px per step)
          }
        }
      }, 50); // Adjust frequency here (50ms intervals)
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    // Start the auto-scroll
    startScroll();

    // Add event listeners
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from real customers who have experienced the transformative power of our premium Himalayan Shilajit
          </p>
        </motion.div>

        {/* Reviews Container */}
        <div className="relative">
          {/* Gradient Overlays for smooth scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-amber-50 to-transparent z-10 pointer-events-none"></div>
            {/* Scrolling Reviews */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-hidden py-4 will-change-scroll"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Triple the reviews for seamless loop */}
            {[...reviews, ...reviews, ...reviews].map((review, index) => (              <motion.div
                key={`${review.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 transform-gpu"
              >
                {/* Customer Info */}
                <div className="flex items-start space-x-4 mb-4">
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      {review.verified && (
                        <span className="text-green-500 text-sm">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.location}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{review.review}"
                </p>

                {/* Verified Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Verified Purchase
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="opacity-90">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="opacity-90">Would Recommend</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30 Days</div>
              <div className="opacity-90">Money Back Guarantee</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Thousands of Satisfied Customers
          </h3>
          <p className="text-gray-600 mb-8">
            Experience the same amazing results that our customers rave about
          </p>
          <motion.a
            href="tel:+919030648333"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            📞 Call to Order Your Shilajit Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Review;