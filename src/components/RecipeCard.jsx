import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';
import { FaClock, FaUser, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import defaultImage from '../images/hero-img1.png';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe, className }) => {
  const { isAuthenticated } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(recipe?.isBookmarked || false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    title,
    image,
    readyInMinutes = 0,
    servings = 0,
    difficulty = 'medium',
    tags = [],
    author = {
      name: 'Unknown Chef',
      avatar: defaultImage
    }
  } = recipe || {};

  const handleBookmark = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }
    setIsBookmarked(!isBookmarked);
    // Add API call to save bookmark
  };

  const difficultyColor = {
    easy: 'var(--success-500)',
    medium: 'var(--warning-500)',
    hard: 'var(--error-500)'
  };

  return (
    <div className={`recipe-card ${className || ''}`}>
      <Link 
        to={`/recipe/${id}`}
        className="recipe-link"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="recipe-image">
          <img 
            src={image || defaultImage} 
            alt={title}
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        </div>
        
        <div className="recipe-content">
          <h3 className="recipe-title">{title || 'Untitled Recipe'}</h3>
          
          <div className="recipe-meta">
            {readyInMinutes > 0 && (
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>{readyInMinutes} mins</span>
              </div>
            )}
            
            {servings > 0 && (
              <div className="meta-item">
                <FaUser className="meta-icon" />
                <span>{servings} servings</span>
              </div>
            )}
          </div>
          
          <div className="recipe-author">
            <img 
              src={author.avatar || defaultImage} 
              alt={author.name}
              className="author-avatar"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
            <span className="author-name">{author.name}</span>
          </div>
        </div>
      </Link>

      <div className="recipe-overlay">
        <div className="recipe-meta">
          {difficulty && (
            <span 
              className="recipe-difficulty"
              style={{ color: difficultyColor[difficulty] }}
            >
              {difficulty}
            </span>
          )}
        </div>
        <button 
          className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {isHovered && tags.length > 0 && (
        <div className="recipe-tags">
          {tags.map((tag, index) => (
            <span key={index} className="recipe-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    readyInMinutes: PropTypes.number,
    servings: PropTypes.number,
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
    tags: PropTypes.arrayOf(PropTypes.string),
    isBookmarked: PropTypes.bool,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  }).isRequired,
  className: PropTypes.string
};

export default RecipeCard; 