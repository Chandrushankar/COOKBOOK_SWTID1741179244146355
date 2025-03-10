import React, { useState } from 'react';
import '../styles/HomeSettings.css';
import '../styles/animations.css';

const HomeSettings = () => {
  const [settings, setSettings] = useState({
    showFeatured: true,
    showPopular: true,
    showRecent: true,
    layout: 'grid',
    cardsPerRow: 3,
    sortBy: 'date',
    filterDifficulty: 'all',
    filterTime: 'all',
    theme: 'system'
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="home-settings animate-slide-down">
      <div className="settings-header">
        <h2>
          <i className="fas fa-sliders-h"></i>
          Customize Your Feed
        </h2>
        <button className="button-pop">
          <i className="fas fa-redo"></i>
          Reset
        </button>
      </div>

      <div className="settings-grid stagger-children">
        <div className="settings-section">
          <h3>Layout</h3>
          <div className="button-group">
            <button 
              className={`button-pop ${settings.layout === 'grid' ? 'active' : ''}`}
              onClick={() => handleChange('layout', 'grid')}
            >
              <i className="fas fa-th"></i>
              Grid
            </button>
            <button 
              className={`button-pop ${settings.layout === 'list' ? 'active' : ''}`}
              onClick={() => handleChange('layout', 'list')}
            >
              <i className="fas fa-list"></i>
              List
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Cards per Row</h3>
          <input 
            type="range" 
            min="2" 
            max="4" 
            value={settings.cardsPerRow}
            onChange={(e) => handleChange('cardsPerRow', parseInt(e.target.value))}
            className="slider"
          />
          <div className="slider-labels">
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>Sort By</h3>
          <select 
            value={settings.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="select"
          >
            <option value="date">Date Added</option>
            <option value="rating">Rating</option>
            <option value="time">Cooking Time</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>

        <div className="settings-section">
          <h3>Difficulty</h3>
          <select 
            value={settings.filterDifficulty}
            onChange={(e) => handleChange('filterDifficulty', e.target.value)}
            className="select"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="settings-section">
          <h3>Cooking Time</h3>
          <select 
            value={settings.filterTime}
            onChange={(e) => handleChange('filterTime', e.target.value)}
            className="select"
          >
            <option value="all">Any Duration</option>
            <option value="quick">Under 30 mins</option>
            <option value="medium">30-60 mins</option>
            <option value="long">Over 60 mins</option>
          </select>
        </div>

        <div className="settings-section">
          <h3>Sections</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.showFeatured}
                onChange={(e) => handleChange('showFeatured', e.target.checked)}
              />
              <span>Featured Recipes</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.showPopular}
                onChange={(e) => handleChange('showPopular', e.target.checked)}
              />
              <span>Popular Now</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.showRecent}
                onChange={(e) => handleChange('showRecent', e.target.checked)}
              />
              <span>Recently Added</span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Theme</h3>
          <div className="button-group">
            <button 
              className={`button-pop ${settings.theme === 'light' ? 'active' : ''}`}
              onClick={() => handleChange('theme', 'light')}
            >
              <i className="fas fa-sun"></i>
              Light
            </button>
            <button 
              className={`button-pop ${settings.theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleChange('theme', 'dark')}
            >
              <i className="fas fa-moon"></i>
              Dark
            </button>
            <button 
              className={`button-pop ${settings.theme === 'system' ? 'active' : ''}`}
              onClick={() => handleChange('theme', 'system')}
            >
              <i className="fas fa-desktop"></i>
              System
            </button>
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <button className="button-ripple primary">
          <i className="fas fa-save"></i>
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default HomeSettings; 