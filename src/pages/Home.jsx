import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoriesHome from '../components/CategoriesHome';
import NewsLetter from '../components/NewsLetter';
import RecipeCard from '../components/RecipeCard';
import HomeSettingsSection from '../components/HomeSettingsSection';
import { useAuth } from '../context/AuthContext';
import RecipeApi from '../services/recipeApi';
import { fallbackRecipes } from '../config/api';
import '../styles/Home.css';

const defaultSettings = {
  layout: 'grid',
  cardsPerRow: 3,
  sortBy: 'newest',
  difficulty: 'all',
  cookingTime: 'all',
  showFeatured: true,
  showPopular: true,
  showRecent: true
};

const Home = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('homeSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchFeaturedRecipes();
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('homeSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [retryCount]);

  const fetchFeaturedRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RecipeApi.getRandomRecipes(6);
      setFeaturedRecipes(data.recipes);
    } catch (err) {
      console.error('Error fetching featured recipes:', err);
      // Use fallback data if API fails
      setFeaturedRecipes(fallbackRecipes);
      setError('Unable to fetch recipes from the server. Showing sample recipes instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleSettingsReset = () => {
    setSettings(defaultSettings);
    localStorage.setItem('homeSettings', JSON.stringify(defaultSettings));
    alert('Settings reset to default');
  };

  const handleSettingsSave = () => {
    localStorage.setItem('homeSettings', JSON.stringify(settings));
    alert('Settings saved successfully');
    setShowSettings(false);
  };

  return (
    <div className='homepage'>
      <Hero />
      
      <section className="featured-recipes">
        <div className="container">
          <div className="section-header">
            <h2>Featured Recipes</h2>
            {error && (
              <button onClick={handleRetry} className="retry-button">
                Try Again
              </button>
            )}
          </div>
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading delicious recipes...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className={`recipes-grid ${settings.layout}`}>
            {featuredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                className="recipe-card-animate"
              />
            ))}
          </div>
        </div>
      </section>

      <CategoriesHome />
      
      <section className="trending">
        <div className="container">
          
          <div className="recipes-grid">
            {/* Add trending recipes component here */}
          </div>
        </div>
      </section>

      <NewsLetter />

      <div className="home-header">
        <h1>Welcome to Recipe Book{user ? `, ${user.name}` : ''}</h1>
        <button 
          className="button-ripple secondary"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>

      {showSettings && (
        <HomeSettingsSection
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onReset={handleSettingsReset}
          onSave={handleSettingsSave}
        />
      )}

      {settings.showPopular && (
        <section className="popular-recipes">
          <h2>Popular Now</h2>
          <div className="recipes-grid">
            {/* Popular recipes grid/list will be added here */}
          </div>
        </section>
      )}

      {settings.showRecent && (
        <section className="recent-recipes">
          <h2>Recently Added</h2>
          <div className="recipes-grid">
            {/* Recent recipes grid/list will be added here */}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;