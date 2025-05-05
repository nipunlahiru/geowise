import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          // First get the favorite country codes
          const response = await axios.get('http://localhost:5000/api/user/favorites');
          const favoriteCodes = response.data;

          // Then fetch complete country data for each favorite
          const countryPromises = favoriteCodes.map(code => 
            axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
          );
          
          const countryResponses = await Promise.all(countryPromises);
          const countries = countryResponses.map(response => response.data[0]);
          
          setFavorites(countries);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch favorites');
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const CountryCard = ({ country }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Link
        to={`/country/${country.cca3}`}
        className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 block h-full border border-gray-700"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">{country.name.common}</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3 text-gray-200">
            <p className="flex items-center">
              <span className="font-semibold mr-2 text-gray-400">Population:</span>
              <span className="font-medium">{country.population.toLocaleString()}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-2 text-gray-400">Region:</span>
              <span className="font-medium">{country.region}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-2 text-gray-400">Capital:</span>
              <span className="font-medium">{country.capital?.[0] || 'N/A'}</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse bg-gray-800/50 rounded-xl p-4 h-80 shadow-md border border-gray-700/50">
      <div className="bg-gray-700/70 rounded-lg h-48 mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-700/70 h-6 w-3/4 rounded-md"></div>
        <div className="bg-gray-700/70 h-4 w-1/2 rounded-md"></div>
        <div className="bg-gray-700/70 h-4 w-2/3 rounded-md"></div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" className="min-h-screen pt-24 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm p-10 rounded-xl shadow-lg border border-gray-700/50 text-center"
          >
            <Typography variant="h4" className="text-white mb-6 font-bold">
              Please log in to view your favorites
            </Typography>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium tracking-wide"
            >
              Login to Continue
            </Link>
          </motion.div>
        </Container>
      </>
    );
  }

  return (
    <div className="pt-16 w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <Container maxWidth="lg" className="min-h-screen pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" className="text-white mb-2 text-center font-bold tracking-wide">
            Your Favorite Countries
          </Typography>
          <Typography variant="subtitle1" className="text-gray-400 mb-8 text-center">
            Explore the countries you've added to your collection
          </Typography>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {[...Array(8)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center bg-gray-800/50 backdrop-blur-sm p-10 rounded-xl shadow-lg border border-gray-700/50"
            >
              <Typography variant="h4" className="text-red-400 mb-4 font-bold">
                {error}
              </Typography>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Try Again
              </button>
            </motion.div>
          ) : favorites.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center bg-gray-800/50 backdrop-blur-sm p-10 rounded-xl shadow-lg border border-gray-700/50"
            >
              <Typography variant="h5" className="text-gray-300 mb-4 font-medium">
                You haven't added any favorite countries yet
              </Typography>
              <Link
                to="/home"
                className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Explore Countries
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {favorites.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Favorites; 