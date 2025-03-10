import React, { useState } from 'react';
import '../styles/Collections.css';

const Collections = () => {
  const [collections] = useState([
    {
      id: 1,
      title: "Quick & Easy",
      description: "Delicious meals ready in 30 minutes or less",
      gradient: "linear-gradient(135deg, #FF6B6B, #FFE66D)",
      recipeCount: 25,
      icon: "fa-clock"
    },
    {
      id: 2,
      title: "Healthy Eating",
      description: "Nutritious and balanced recipes for a healthy lifestyle",
      gradient: "linear-gradient(135deg, #4ECDC4, #556270)",
      recipeCount: 30,
      icon: "fa-heart"
    },
    {
      id: 3,
      title: "Vegetarian Delights",
      description: "Tasty meat-free recipes for everyone",
      gradient: "linear-gradient(135deg, #6DD5ED, #2193B0)",
      recipeCount: 20,
      icon: "fa-leaf"
    },
    {
      id: 4,
      title: "Dessert Paradise",
      description: "Sweet treats and baked goods",
      gradient: "linear-gradient(135deg, #FF8C94, #F67280)",
      recipeCount: 15,
      icon: "fa-ice-cream"
    },
    {
      id: 5,
      title: "International Cuisine",
      description: "Explore dishes from around the world",
      gradient: "linear-gradient(135deg, #A8E6CF, #3EECAC)",
      recipeCount: 40,
      icon: "fa-globe"
    },
    {
      id: 6,
      title: "Breakfast Favorites",
      description: "Start your day with these amazing recipes",
      gradient: "linear-gradient(135deg, #FFD93D, #FF6B6B)",
      recipeCount: 18,
      icon: "fa-coffee"
    },
    {
      id: 7,
      title: "Grilling & BBQ",
      description: "Perfect recipes for outdoor cooking",
      gradient: "linear-gradient(135deg, #FF9A8B, #FF6B6B)",
      recipeCount: 22,
      icon: "fa-fire"
    },
    {
      id: 8,
      title: "Meal Prep",
      description: "Plan ahead with these easy-to-prep recipes",
      gradient: "linear-gradient(135deg, #90F7EC, #32CCBC)",
      recipeCount: 28,
      icon: "fa-calendar"
    }
  ]);

  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1>Recipe Collections</h1>
        <p>Discover curated collections of our best recipes</p>
      </div>

      <div className="collections-grid">
        {collections.map(collection => (
          <div key={collection.id} className="collection-card">
            <div 
              className="collection-image gradient-animate"
              style={{ 
                background: collection.gradient,
                backgroundSize: '200% 200%'
              }}
            >
              <div className="collection-icon">
                <i className={`fas ${collection.icon}`}></i>
              </div>
              <div className="collection-overlay">
                <span className="recipe-count">
                  <i className="fas fa-book-open"></i>
                  {collection.recipeCount} Recipes
                </span>
              </div>
            </div>
            <div className="collection-content">
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <button className="view-collection-btn">
                View Collection
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections; 