import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://razorpaybackend-wgbh.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'israelitesshopping171@gmail.com',
          subject: `Contact Form: ${formData.subject}`,
          message: `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone}
            Subject: ${formData.subject}

            Message:
            ${formData.message}
          `
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">
              Our Experts
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our premium Himalayan Shilajit? Our team of experts is here to help you on your wellness journey.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Email */}
              <div className="bg-gradient-to-br from-amber-500/10 to-yellow-400/5 border border-amber-500/20 rounded-3xl p-8 hover:border-amber-500/40 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Email Us</h3>
                </div>
                <div className="flex items-center">
                  <a href="mailto:customercareproductcenter@gmail.com" className="text-white hover:text-amber-400 transition-colors text-lg break-words">
                    customercareproductcenter@gmail.com
                  </a>
                </div>
                <p className="text-gray-400 text-sm mt-3">We'll respond within 24 hours</p>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-br from-amber-500/10 to-yellow-400/5 border border-amber-500/20 rounded-3xl p-8 hover:border-amber-500/40 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Support Hours</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday - Saturday:</span>
                    <span className="text-white font-semibold">9:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="max-w-md mx-auto mt-10">
              <motion.a
                href="/checkout"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block bg-gradient-to-r from-green-600 to-green-700 text-white text-xl font-bold py-4 px-6 rounded-xl text-center hover:shadow-xl transition-all"
              >
                Order Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;