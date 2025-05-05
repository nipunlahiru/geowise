import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Box, Paper, IconButton, Tooltip } from '@mui/material';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ErrorBoundary from '../components/common/ErrorBoundary';
import LoadingSkeleton, { LoadingSkeletonWrapper } from '../components/common/LoadingSkeleton';
import useApi from '../hooks/useApi';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

/**
 * CountryDetail Component
 * Displays detailed information about a specific country
 * @returns {JSX.Element} Country detail page
 */
const CountryDetail = () => {
  const { code } = useParams();
  const { data: countryData, loading, error, refetch } = useApi(
    `https://restcountries.com/v3.1/alpha/${code}`
  );
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const country = countryData?.[0];

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:5000/api/user/favorites');
          setFavorites(response.data);
          setIsFavorite(response.data.includes(code));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [user, code]);

  const toggleFavorite = async () => {
    if (!user) return;

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/user/favorites/${code}`);
        setFavorites(favorites.filter(fav => fav !== code));
      } else {
        await axios.post('http://localhost:5000/api/user/favorites', { countryCode: code });
        setFavorites([...favorites, code]);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-800 pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white shadow-lg">
              <Box className="h-[400px] mb-8">
                <LoadingSkeleton variant="rectangular" height="100%" className="bg-gray-200" />
              </Box>
              <LoadingSkeletonWrapper
                count={8}
                skeletonProps={{ height: 40, className: "bg-gray-200" }}
              />
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-800 pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white">
              <Box className="p-8 text-center">
                <Typography color="error" variant="h4" className="mb-6 text-red-600">
                  {error.message}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={refetch}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3"
                >
                  Retry
                </Button>
              </Box>
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (!country) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-800 pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white shadow-lg">
              <Box className="p-8 text-center">
                <Typography variant="h4" className="mb-6 text-gray-800">
                  Country not found
                </Typography>
                <Button
                  component={Link}
                  to="/home"
                  variant="contained"
                  color="primary"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3"
                >
                  Back to Home
                </Button>
              </Box>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Content Container with Glass Effect */}
            <Card className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
              {/* Hero Banner */}
              <Box className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                <motion.img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-full h-full object-cover object-center"
                  initial={{ scale: 1.2, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/1200x500?text=Flag+Not+Available';
                  }}
                />
                <Box className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80"></Box>
                <Box className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <Box className="flex flex-col md:flex-row md:items-end justify-between">
                    <Typography 
                      variant="h2" 
                      className="text-4xl md:text-5xl font-bold text-white mb-2"
                    >
                      {country.name.common}
                    </Typography>
                    <Box className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      {user && (
                        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                          <IconButton
                            onClick={toggleFavorite}
                            sx={{
                              color: isFavorite ? 'red' : 'white',
                              '&:hover': {
                                color: isFavorite ? 'red' : 'white',
                                opacity: 0.8
                              }
                            }}
                          >
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                        </Tooltip>
                      )}
                      <Paper elevation={0} className="bg-blue-600 px-4 py-2 rounded-full">
                        <Typography className="text-white font-medium">
                          {country.region || 'N/A'}
                        </Typography>
                      </Paper>
                      {country.subregion && (
                        <Paper elevation={0} className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <Typography className="text-white font-medium">
                            {country.subregion}
                          </Typography>
                        </Paper>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Content Section */}
              <Box className="p-6 md:p-10">
                {/* Quick Stats Row */}
                <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Paper elevation={3} className="p-4 rounded-xl bg-white/90 border border-gray-300 shadow-xl">
                      <Typography className="text-gray-600 uppercase text-sm font-medium">Population</Typography>
                      <Typography className="text-2xl font-bold text-black mt-1">
                        {country?.population ? country.population.toLocaleString() : 'N/A'}
                      </Typography>
                    </Paper>
                  </motion.div>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Paper elevation={3} className="p-4 rounded-xl bg-white/90 border border-gray-300 shadow-xl">
                      <Typography className="text-gray-600 uppercase text-sm font-medium">Capital</Typography>
                      <Typography className="text-2xl font-bold text-black mt-1">
                        {country?.capital && country.capital.length > 0 
                          ? country.capital.join(', ') 
                          : 'N/A'}
                      </Typography>
                    </Paper>
                  </motion.div>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Paper elevation={3} className="p-4 rounded-xl bg-white/90 border border-gray-300 shadow-xl">
                      <Typography className="text-gray-600 uppercase text-sm font-medium">Area</Typography>
                      <Typography className="text-2xl font-bold text-black mt-1">
                        {country?.area ? `${Math.round(country.area).toLocaleString()} km²` : 'N/A'}
                      </Typography>
                    </Paper>
                  </motion.div>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Paper elevation={3} className="p-4 rounded-xl bg-white/90 border border-gray-300 shadow-xl">
                      <Typography className="text-gray-600 uppercase text-sm font-medium">Top Domain</Typography>
                      <Typography className="text-2xl font-bold text-black mt-1">
                        {country?.tld && country.tld.length > 0 ? country.tld[0] : 'N/A'}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Box>

                {/* Details Sections */}
                <Grid container spacing={6}>
                  {/* Left Column */}
                  <Grid item xs={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Paper elevation={2} className="p-6 rounded-xl bg-white/90 backdrop-blur-md border border-gray-300 h-full">
                        <Typography variant="h5" className="text-gray-800 font-bold border-b border-gray-300 pb-3 mb-6">
                          Country Information
                        </Typography>
                        <Box className="space-y-4">
                          <Box className="flex items-center">
                            <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4 border border-gray-300">
                              <span className="text-gray-800 font-bold">ID</span>
                            </Box>
                            <Box>
                              <Typography className="text-sm text-gray-600">Official Name</Typography>
                              <Typography className="text-base font-medium text-black">
                                {country?.name?.official || 'N/A'}
                              </Typography>
                            </Box>
                          </Box>
                          {country?.latlng && country.latlng.length >= 2 && (
                            <Box className="flex items-center">
                              <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4 border border-gray-300">
                                <span className="text-gray-800 font-bold">📍</span>
                              </Box>
                              <Box>
                                <Typography className="text-sm text-gray-600">Coordinates</Typography>
                                <Typography className="text-base font-medium text-black">
                                  {`${country.latlng[0].toFixed(2)}, ${country.latlng[1].toFixed(2)}`}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                          {country?.timezones && country.timezones.length > 0 && (
                            <Box className="flex items-center">
                              <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4 border border-gray-300">
                                <span className="text-gray-800 font-bold">⏰</span>
                              </Box>
                              <Box>
                                <Typography className="text-sm text-gray-600">Timezone</Typography>
                                <Typography className="text-base font-medium text-black">
                                  {country.timezones[0] || 'N/A'}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>

                  {/* Right Column */}
                  <Grid item xs={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Paper elevation={2} className="p-6 rounded-xl bg-white/90 backdrop-blur-md border border-gray-300 h-full">
                        <Typography variant="h5" className="text-gray-800 font-bold border-b border-gray-300 pb-3 mb-6">
                          Culture & Economy
                        </Typography>
                        <Box className="space-y-4">
                          <Box className="flex items-center">
                            <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4 border border-gray-300">
                              <span className="text-gray-800 font-bold">🗣️</span>
                            </Box>
                            <Box>
                              <Typography className="text-gray-600 uppercase text-sm font-medium">Languages</Typography>
                              <Typography className="text-2xl font-bold text-black mt-1">
                                {country?.languages && typeof country.languages === 'object' && Object.keys(country.languages).length > 0
                                  ? Object.entries(country.languages).map(([code, name], index, arr) => (
                                      `${name}${index < arr.length - 1 ? ', ' : ''}`
                                    ))
                                  : 'N/A'}
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="flex items-center">
                            <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4 border border-gray-300">
                              <span className="text-gray-800 font-bold">💰</span>
                            </Box>
                            <Box>
                              <Typography className="text-gray-600 uppercase text-sm font-medium">Currency</Typography>
                              <Typography className="text-2xl font-bold text-black mt-1">
                                {country?.currencies && typeof country.currencies === 'object' && Object.keys(country.currencies).length > 0
                                  ? Object.entries(country.currencies).map(([code, currency], index, arr) => (
                                      `${code}: ${currency.name || 'Unknown'}${currency.symbol ? ` (${currency.symbol})` : ''}${index < arr.length - 1 ? ', ' : ''}`
                                    ))
                                  : 'N/A'}
                              </Typography>
                            </Box>
                          </Box>
                          {country?.car && country.car.side && (
                            <Box className="flex items-center">
                              <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4 border border-gray-300">
                                <span className="text-gray-800 font-bold">🚗</span>
                              </Box>
                              <Box>
                                <Typography className="text-sm text-gray-600">Drives on</Typography>
                                <Typography className="text-base font-medium text-black">
                                  {country.car.side === 'right' ? 'Right side' : 'Left side'}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                </Grid>

                {/* Border Countries */}
                {country.borders && country.borders.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10"
                  >
                    <Paper elevation={2} className="p-6 rounded-xl bg-white/90 backdrop-blur-md border border-gray-300">
                      <Typography variant="h5" className="text-gray-800 font-bold border-b border-gray-300 pb-3 mb-6 text-center">
                        Border Countries
                      </Typography>
                      <Box className="flex flex-wrap gap-3 justify-center">
                        {country.borders.map(borderCode => (
                          <motion.div
                            key={borderCode}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              component={Link}
                              to={`/country/${borderCode}`}
                              variant="outlined"
                              className="bg-white hover:bg-blue-100 border border-blue-400 text-gray-800 hover:text-blue-800 px-5 py-2 rounded-full shadow-md"
                            >
                              {borderCode}
                            </Button>
                          </motion.div>
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                )}
              </Box>
            </Card>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CountryDetail;