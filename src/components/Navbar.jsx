import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUtensils, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Update theme when component mounts and when isDarkMode changes
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Hide navbar on auth pages
  if (['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-utensils"></i>
          <span>Recipe Book</span>
        </Link>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-submit" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/collections" className="nav-link">
            <i className="fas fa-layer-group"></i> Collections
          </Link>
          <Link to="/saved" className="nav-link">
            <i className="fas fa-bookmark"></i> Saved
          </Link>
          <Link to="/food-varieties" className="nav-link">
            <FaUtensils className="nav-icon" />
            <span>Food Varieties</span>
          </Link>
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-profile">
              <button 
                className="profile-trigger"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-label="User menu"
              >
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="user-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="user-name">{user?.name}</span>
                <i className={`fas fa-chevron-${isProfileOpen ? 'up' : 'down'}`}></i>
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <h4>{user?.name}</h4>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="dropdown-links">
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-user"></i>
                      My Profile
                    </Link>
                    <Link to="/settings" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-cog"></i>
                      Settings
                    </Link>
                    <Link to="/saved" onClick={() => setIsProfileOpen(false)}>
                      <i className="fas fa-bookmark"></i>
                      Saved Recipes
                    </Link>
                    <button onClick={handleLogout} className="logout-button">
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </Link>
            
            </div>
          )}
          </div>

        <div className="navbar-menu">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FaSun className="nav-icon" /> : <FaMoon className="nav-icon" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
    </div>
    </nav>
  );
};

export default Navbar;