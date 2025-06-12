import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    // { name: 'Benefits', href: '#benefits' },
    { name: 'Product', href: '#product' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Terms & Conditions', href: '/terms', isRoute: true },
    { name: 'Privacy Policy', href: '/privacy', isRoute: true }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://www.facebook.com/profile.php?id=61576906157013',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/shilajit_offical/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8L3.431 9.171c-.568-1.07-.568-2.394 0-3.464.568-1.07 1.719-1.8 3.016-1.8h7.104c1.297 0 2.448.73 3.016 1.8.568 1.07.568 2.394 0 3.464l-2.002 6.017c-.568 1.07-1.719 1.8-3.016 1.8H8.449z"/>
          <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 15.162a3.162 3.162 0 1 1 0-6.324 3.162 3.162 0 0 1 0 6.324z"/>
          <circle cx="18.406" cy="5.594" r="1.44"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      href: 'https://www.youtube.com/@shilajit_official',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  Shilajit Pure Himalayan 
                </span>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
              Sourced from the untouched heights of the Himalayas, our 100% pure Shilajit is a powerhouse of natural minerals and fulvic acid – designed to boost your energy, stamina, and overall wellness
              </p>
                {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <a href="tel:+919030732444" className="text-gray-300 hover:text-amber-400 transition-colors">
                    +91 9030732444
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>{link.name}</span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>{link.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-amber-400">Stay Connected</h4>

              {/* Social Links */}
              <div>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-200 text-amber-400 hover:text-white"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;