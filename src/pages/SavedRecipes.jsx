import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/SavedRecipes.css';

const SavedRecipes = () => {
  const { user } = useAuth();

  return (
    <div className="saved-recipes">
      <div className="page-header">
        <h1>Saved Recipes</h1>
        <p>Your favorite recipes in one place</p>
      </div>
      
      <div className="recipes-container">
        {/* Add your saved recipes content here */}
        <div className="placeholder-message">
          <i className="fas fa-bookmark"></i>
          <h3>No saved recipes yet</h3>
          <p>Your saved recipes will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes; 