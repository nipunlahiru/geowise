import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden w-full min-h-screen flex flex-col justify-center items-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Earth from space"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80" />
          
          {/* Animated overlay pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1502814151-937fbb6a1c59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover mix-blend-overlay"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 z-10"
        >
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-center w-full"
          >
            <span className="block text-white">Explore the World</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
              One Country at a Time
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-xl text-gray-200 text-center"
          >
            Discover detailed information about countries around the world. Learn about their cultures, demographics, and more.
          </motion.p>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-5 justify-center w-full"
          >
            <Link
              to="/login"
              className="flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white border border-gray-600 bg-gray-900 bg-opacity-70 backdrop-blur-sm hover:bg-gray-800 hover:border-gray-500 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Features Section with Glass Morphism */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            className="h-full w-full object-cover opacity-10"
            src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Abstract world map"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-90" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:text-center mb-16"
          >
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Discover a World of Information
            </p>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative backdrop-blur-sm bg-gray-800 bg-opacity-40 p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-white mb-3">Global Coverage</h3>
              <p className="text-gray-300 text-lg">
                Access detailed information about countries from every corner of the world, with comprehensive data on all continents.
              </p>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative backdrop-blur-sm bg-gray-800 bg-opacity-40 p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-white mb-3">Secure & Reliable</h3>
              <p className="text-gray-300 text-lg">
                Trusted data from reliable sources, updated regularly for accuracy and completeness.
              </p>
            </motion.div>

            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative backdrop-blur-sm bg-gray-800 bg-opacity-40 p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-white mb-3">Fast & Efficient</h3>
              <p className="text-gray-300 text-lg">
                Quick access to information with our optimized search and filtering system designed for performance.
              </p>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative backdrop-blur-sm bg-gray-800 bg-opacity-40 p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-white mb-3">Beautiful Design</h3>
              <p className="text-gray-300 text-lg">
                Enjoy a modern, intuitive interface that makes exploration a pleasure with responsive design.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/home"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;