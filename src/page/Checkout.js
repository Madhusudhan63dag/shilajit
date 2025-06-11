import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure this path is correct

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  });

  const [orderItems, setOrderItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [productOptions] = useState([
    {
      id: 1,
      name: 'Premium Shilajit - Single Box',
      quantity: 1,
      price: 2500,
      originalPrice: 4999,
      sku: 'SHIL001',
      description: '20g Single Pack'
    },
    {
      id: 2,
      name: 'Premium Shilajit - Buy 1 Get 1 Free',
      quantity: 2,
      price: 3990,
      originalPrice: 7999,
      sku: 'SHIL002',
      description: '20g x 2 (1+1 Free)'
    }
  ]);

  // Initialize selected product based on URL parameter or default to Buy 1 Get 1
  const getInitialProduct = () => {
    const productId = searchParams.get('product');
    if (productId) {
      const product = productOptions.find(p => p.id === parseInt(productId));
      return product || productOptions[1];
    }
    return productOptions[1];
  };

  const [selectedProduct, setSelectedProduct] = useState(getInitialProduct());

  // Order calculation - Full amount for both payment methods
  const subtotal = selectedProduct.price;
  const discountAmount = 0;
  const totalAmount = subtotal - discountAmount;

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // Update orderItems when product selection changes
  useEffect(() => {
    setOrderItems([selectedProduct]);
  }, [selectedProduct]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!customerDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerDetails.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(customerDetails.email)) newErrors.email = 'Email is invalid';
    if (!customerDetails.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(customerDetails.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!customerDetails.address.trim()) newErrors.address = 'Address is required';
    if (!customerDetails.city.trim()) newErrors.city = 'City is required';
    if (!customerDetails.state.trim()) newErrors.state = 'State is required';
    if (!customerDetails.zip.trim()) newErrors.zip = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create Razorpay order - Full amount instead of advance
  const createRazorpayOrder = async () => {
    try {
      const response = await fetch('https://razorpaybackend-wgbh.onrender.com/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount, // Changed from advanceAmount to totalAmount
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
            customerEmail: customerDetails.email,
            customerPhone: customerDetails.phone,
            productName: selectedProduct.name,
            totalAmount: totalAmount
          }
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async (orderData) => {
    const options = {
      key: orderData.key,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: 'Shilajit Store',
      description: `${selectedProduct.name} Purchase`,
      order_id: orderData.order.id,
      handler: async function (response) {
        try {
          // Verify payment
          const verifyResponse = await fetch('https://razorpaybackend-wgbh.onrender.com/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            await handleSuccessfulPayment(response);
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          alert('Payment verification failed. Please contact support.');
          setIsProcessing(false);
        }
      },
      prefill: {
        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle successful payment
  const handleSuccessfulPayment = async (paymentResponse) => {
    try {
      const orderNumber = `ORD${Date.now()}`;
      
      // Send confirmation email
      await sendOrderConfirmation(orderNumber, paymentResponse);
      
      // Navigate to thank you page with order data
      navigate('/thank-you', {
        state: {
          orderData: {
            orderNumber: orderNumber,
            productName: selectedProduct.name,
            totalAmount: totalAmount,
            paymentMethod: 'Razorpay',
            paymentId: paymentResponse.razorpay_payment_id,
            customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
            customerEmail: customerDetails.email,
            customerPhone: customerDetails.phone,
            shippingAddress: `${customerDetails.address}${customerDetails.apartment ? ', ' + customerDetails.apartment : ''}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.zip}, ${customerDetails.country}`
          }
        }
      });
      
    } catch (error) {
      console.error('Post-payment processing error:', error);
      alert('Payment successful but there was an issue processing your order. Our team will contact you shortly.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'razorpay') {
        const orderData = await createRazorpayOrder();
        await handleRazorpayPayment(orderData);
      } else if (paymentMethod === 'cod') {
        // Handle COD order
        await handleCODOrder();
      } else {
        // Handle other payment methods
        alert('Payment method not implemented yet.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle COD order
  const handleCODOrder = async () => {
    try {
      const orderNumber = `COD${Date.now()}`;
      
      // Send confirmation email for COD
      await sendOrderConfirmation(orderNumber, { razorpay_payment_id: 'COD_ORDER' });
      
      // Navigate to thank you page with order data
      navigate('/thank-you', {
        state: {
          orderData: {
            orderNumber: orderNumber,
            productName: selectedProduct.name,
            totalAmount: totalAmount,
            paymentMethod: 'COD',
            paymentId: 'COD_ORDER',
            customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
            customerEmail: customerDetails.email,
            customerPhone: customerDetails.phone,
            shippingAddress: `${customerDetails.address}${customerDetails.apartment ? ', ' + customerDetails.apartment : ''}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.zip}, ${customerDetails.country}`
          }
        }
      });
      
    } catch (error) {
      console.error('COD order processing error:', error);
      alert('There was an issue processing your order. Our team will contact you shortly.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Send order confirmation email using /send-order-confirmation API
  const sendOrderConfirmation = async (orderNumber, paymentResponse) => {
    try {
      const emailData = {
        customerEmail: customerDetails.email,
        orderDetails: {
          orderNumber: orderNumber,
          products: [{
            name: selectedProduct.name,
            quantity: selectedProduct.quantity,
            price: selectedProduct.price,
            description: selectedProduct.description
          }],
          totalAmount: totalAmount,
          currency: '₹',
          paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Razorpay',
          paymentId: paymentResponse.razorpay_payment_id,
          quantity: selectedProduct.quantity,
          productName: selectedProduct.name
        },
        customerDetails: customerDetails
      };

      const response = await fetch('https://razorpaybackend-wgbh.onrender.com/send-order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      
      if (!data.success) {
        console.error('Email sending failed:', data);
      }
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  // Update URL when product selection changes
  const handleProductChange = (product) => {
    setSelectedProduct(product);
    // Update URL without page reload
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('product', product.id.toString());
    navigate(`/checkout?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header Navigation */}
      <nav className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-4">
          <img src={logo} alt="Shilajit Store" className="h-20" />
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Secure Checkout</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
              <span className="ml-2 text-yellow-400 font-medium">Checkout</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">2</div>
              <span className="ml-2 text-gray-400">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
              <span className="ml-2 text-gray-400">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              {/* Product Selection Section */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Select Your Package</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {productOptions.map((product) => {
                    const savings = product.originalPrice - product.price;
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleProductChange(product)}
                        className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 ${
                          selectedProduct.id === product.id
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="mb-3">
                            {product.id === 1 && (
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                SINGLE PACK
                              </span>
                            )}
                            {product.id === 2 && (
                              <>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                                  BUY 1 GET 1 FREE!
                                </span>
                                <div className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold inline-block ml-2">
                                  MOST POPULAR
                                </div>
                              </>
                            )}
                          </div>
                          <h3 className="text-white font-semibold text-lg mb-2">{product.description}</h3>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-yellow-400">₹{product.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                            <div className="text-sm text-green-400 font-semibold">
                              Save ₹{savings.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Customer Information</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerDetails.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.firstName ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="Enter your first name"
                      required
                    />
                    {errors.firstName && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerDetails.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.lastName ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="Enter your last name"
                      required
                    />
                    {errors.lastName && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.email ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.phone ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                      errors.address ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                    }`}
                    placeholder="House number, street name"
                    required
                  />
                  {errors.address && (
                    <span className="text-red-400 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.address}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="apartment" className="block text-sm font-semibold text-gray-300 mb-2">
                    Apartment, Suite, etc. (Optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={customerDetails.apartment}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 hover:border-gray-600"
                    placeholder="Apartment, floor, building"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.city ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="Your city"
                      required
                    />
                    {errors.city && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.city}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={customerDetails.state}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.state ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="Your state"
                      required
                    />
                    {errors.state && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.state}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="zip" className="block text-sm font-semibold text-gray-300 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={customerDetails.zip}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-800 border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 ${
                        errors.zip ? 'border-red-500 bg-red-900/20' : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="123456"
                      required
                    />
                    {errors.zip && (
                      <span className="text-red-400 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.zip}
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Order Summary</h3>
                </div>
                
                {/* Products */}
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg">{selectedProduct.name}</h4>
                        <p className="text-gray-400 text-sm">{selectedProduct.description}</p>
                        <p className="text-gray-400 text-sm">Total package price</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold text-lg">₹{selectedProduct.price.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Package contains: {selectedProduct.quantity} box{selectedProduct.quantity > 1 ? 'es' : ''}</span>
                      <div className="bg-gray-700 rounded-lg px-3 py-1">
                        <span className="text-white font-semibold">
                          Package Deal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Totals */}
                <div className="space-y-3 mb-6 border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  {paymentMethod === 'razorpay' && (
                    <div className="bg-yellow-400/10 rounded-lg p-3 border border-yellow-400/30">
                      <div className="flex justify-between text-yellow-400 font-bold text-xl">
                        <span>Online Payment:</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-yellow-300 text-xs mt-1">Full payment online</p>
                    </div>
                  )}
                  {paymentMethod === 'cod' && (
                    <div className="bg-blue-400/10 rounded-lg p-3 border border-blue-400/30">
                      <div className="flex justify-between text-blue-400 font-bold text-xl">
                        <span>Cash on Delivery:</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <p className="text-blue-300 text-xs mt-1">Full payment on delivery</p>
                    </div>
                  )}
                </div>
                
                {/* Payment Method - Updated descriptions */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 text-lg">Payment Method</h4>
                  <div className="space-y-3">
                    {/* Razorpay Option */}
                    <div className={`bg-gray-800 rounded-xl p-4 border-2 transition-colors duration-300 ${
                      paymentMethod === 'razorpay' ? 'border-yellow-400' : 'border-gray-700 hover:border-gray-600'
                    }`}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="razorpay"
                          checked={paymentMethod === 'razorpay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-yellow-400 border-gray-600 focus:ring-yellow-400 focus:ring-2"
                        />
                        <div className="ml-3 flex items-center">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="w-6 h-6 mr-2" />
                          <div>
                            <span className="text-white font-medium">Online Payment</span>
                            <p className="text-gray-400 text-sm">Cards, UPI, Net Banking</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* COD Option */}
                    <div className={`bg-gray-800 rounded-xl p-4 border-2 transition-colors duration-300 ${
                      paymentMethod === 'cod' ? 'border-blue-400' : 'border-gray-700 hover:border-gray-600'
                    }`}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-blue-400 border-gray-600 focus:ring-blue-400 focus:ring-2"
                        />
                        <div className="ml-3 flex items-center">
                          <svg className="w-6 h-6 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <span className="text-white font-medium">Cash on Delivery</span>
                            <p className="text-gray-400 text-sm">Pay when you receive</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button - Updated text */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full ${
                    paymentMethod === 'cod' 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400' 
                      : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400'
                  } text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform ${
                    isProcessing 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
                      {paymentMethod === 'cod' ? 'Placing Order...' : 'Processing Payment...'}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {paymentMethod === 'cod' 
                          ? `Place Order - ₹${totalAmount.toLocaleString()} COD`
                          : `Pay Now - ₹${totalAmount.toLocaleString()}`
                        }
                      </div>
                    </>
                  )}
                </button>
                
                {/* Payment Note - Updated text */}
                <div className="mt-4 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center text-gray-400 text-sm">
                    <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    {paymentMethod === 'cod' 
                      ? 'Cash on Delivery - Pay when you receive your order'
                      : 'Secure payment powered by Razorpay'
                    }
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {paymentMethod === 'cod' 
                      ? 'Full amount payable on delivery.'
                      : 'Your payment information is encrypted and secure'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;