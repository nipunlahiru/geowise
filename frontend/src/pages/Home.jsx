import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const maxRetries = 3;
      let retryCount = 0;

      const attemptFetch = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('https://restcountries.com/v3.1/all', {
            timeout: 10000, // 10 second timeout
            headers: {
              'Accept': 'application/json',
            }
          });
          setCountries(response.data);
          setFilteredCountries(response.data);
          
          // Extract unique regions
          const uniqueRegions = [...new Set(response.data.map(country => country.region))];
          setRegions(uniqueRegions);
          setError(null);
        } catch (error) {
          console.error('Error fetching countries:', error);
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying... Attempt ${retryCount} of ${maxRetries}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
            return attemptFetch();
          }
          setError('Failed to load countries. Please check your internet connection and try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      attemptFetch();
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (selectedRegion) {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  }, [selectedRegion, searchQuery, countries]);

  const CountryCard = ({ country }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/country/${country.cca3}`}
        className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block h-full"
      >
        <div className="relative h-48">
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-white">{country.name.common}</h2>
          <div className="space-y-2 text-gray-300">
            <p className="flex items-center">
              <span className="font-semibold mr-2">Population:</span>
              <span>{country.population.toLocaleString()}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-2">Region:</span>
              <span>{country.region}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold mr-2">Capital:</span>
              <span>{country.capital?.[0] || 'N/A'}</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-lg h-48 mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-700 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-700 h-4 w-2/3 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-16 w-full min-h-screen bg-gray-900">
      {/* Hero Header with World Map Image */}
      <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="World Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Explore Our World
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-xl"
          >
            Discover information about countries around the globe
          </motion.p>
        </div>
      </div>

      <div className="w-full px-4 py-6 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a country..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-gray-400 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <select
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Filter by Region</option>
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {[...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {filteredCountries.map((country, index) => (
              <CountryCard 
                key={country.cca3} 
                country={country} 
              />
            ))}
          </div>
        )}

        {!isLoading && filteredCountries.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-300">No countries found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;