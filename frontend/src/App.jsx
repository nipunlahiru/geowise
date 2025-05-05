import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CountryDetail from './pages/CountryDetail';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import UserProfile from './components/user/UserProfile';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import LearnMore from './pages/LearnMore';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
}

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route
            path="/country/:code"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <CountryDetail />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Favorites />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <UserProfile />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
