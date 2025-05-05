import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Avatar } from '@mui/material';

/**
 * Navigation Bar Component
 * Provides navigation links and responsive design with an elegant dark gray and black theme
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { path: user ? '/home' : '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/learn-more', label: 'Learn More', icon: <InfoIcon /> },
    ...(user ? [{ path: '/favorites', label: 'Favorites', icon: <FavoriteIcon /> }] : []),
  ];
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        // Clear any remaining state
        setMobileOpen(false);
        
        // Navigate to login page
        navigate('/', { replace: true });
        
        // Force a page reload to ensure clean state
        window.location.reload();
      } else {
        // Show error message if logout failed
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  const drawer = (
    <List className="w-64 bg-gray-900 min-h-screen">
      <div className="py-6 px-4 border-b border-gray-800">
        <Link to={user ? "/home" : "/"} className="flex items-center space-x-2 text-xl font-bold text-gray-100">
          <PublicIcon className="text-gray-300" />
          <span>GeoWise</span>
        </Link>
      </div>
      {navLinks.map((link) => (
        <ListItem
          button
          key={link.path}
          component={Link}
          to={link.path}
          selected={location.pathname === link.path}
          className={`hover:bg-gray-800 transition-colors duration-300 my-1 mx-2 rounded-lg ${
            location.pathname === link.path ? 'bg-gray-800' : ''
          }`}
        >
          <div className="flex items-center space-x-3 py-2 px-3">
            <div className="text-gray-300">{link.icon}</div>
            <ListItemText
              primary={link.label}
              className="text-gray-100"
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
  
  return (
    <AppBar
      position="fixed"
      className={`transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-opacity-5 shadow-lg'
          : 'bg-transparent'
      }`}
      elevation={0}
      sx={{ background: 'transparent', boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none' }}
    >
      <Toolbar className="max-w-7xl mx-auto w-full py-3">
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="text-gray-300 hover:text-white transition-colors mr-2"
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex items-center"
        >
          <Link to={user ? "/home" : "/"} className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-300">
            <PublicIcon className="text-3xl text-white" />
            <span className="tracking-wide">GeoWise</span>
          </Link>
        </motion.div>
        
        <div className="hidden md:flex space-x-3">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                to={link.path}
                startIcon={<div className="text-white">{link.icon}</div>}
                className={`${
                  location.pathname === link.path
                    ? 'bg-gray-800/70 text-white ring-1 ring-gray-700'
                    : 'text-gray-200 hover:text-white'
                } transition-all duration-300 rounded-lg px-4 py-2 hover:bg-gray-800/50 font-medium tracking-wide`}
              >
                {link.label}
              </Button>
            </motion.div>
          ))}
        </div>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#1F2937' }} className="ring-2 ring-gray-700 shadow-lg">
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                  <Typography variant="body1" className="text-white hover:text-gray-300 transition-colors font-medium">
                    {user.username}
                  </Typography>
                </Link>
              </Box>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                className="bg-red-600/90 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                startIcon={<LogoutIcon />}
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">
                  <LogoutIcon />
                </span>
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                className="text-white border-gray-600 hover:border-white hover:text-white transition-colors tracking-wide"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                className="bg-gray-800 text-white hover:bg-gray-700 transition-colors tracking-wide shadow-md"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="md:hidden"
        PaperProps={{
          className: 'bg-gray-900/95 backdrop-blur-xl'
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;