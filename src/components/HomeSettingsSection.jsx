import React from 'react';
import { FiSettings, FiSave, FiRefreshCw } from 'react-icons/fi';
import '../styles/HomeSettings.css';

const HomeSettingsSection = ({ settings, onSettingsChange, onReset, onSave }) => {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="home-settings">
      <div className="settings-header">
        <h2>
          <FiSettings className="settings-icon" />
          Home Settings
        </h2>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h3>Layout</h3>
          <div className="button-group">
            <button 
              className={settings.layout === 'grid' ? 'active' : ''}
              onClick={() => handleChange('layout', 'grid')}
            >
              Grid View
            </button>
            <button 
              className={settings.layout === 'list' ? 'active' : ''}
              onClick={() => handleChange('layout', 'list')}
            >
              List View
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
            className="select"
            value={settings.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="settings-section">
          <h3>Filter by Difficulty</h3>
          <select 
            className="select"
            value={settings.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
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
            className="select"
            value={settings.cookingTime}
            onChange={(e) => handleChange('cookingTime', e.target.value)}
          >
            <option value="all">Any Duration</option>
            <option value="quick">Under 30 mins</option>
            <option value="medium">30-60 mins</option>
            <option value="long">Over 60 mins</option>
          </select>
        </div>

        <div className="settings-section">
          <h3>Show Sections</h3>
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
      </div>

      <div className="settings-footer">
        <button 
          className="button-ripple secondary"
          onClick={onReset}
          style={{ marginRight: 'var(--spacing-4)' }}
        >
          <FiRefreshCw /> Reset
        </button>
        <button 
          className="button-ripple primary"
          onClick={onSave}
        >
          <FiSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default HomeSettingsSection; 