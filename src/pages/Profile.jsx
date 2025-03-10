import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [savedRecipes] = useState([
    {
      id: 1,
      title: "Creamy Pasta Carbonara",
      gradient: "linear-gradient(135deg, #FF9A8B, #FF6B6B)",
      savedDate: "2024-03-08"
    },
    {
      id: 2,
      title: "Mediterranean Salad",
      gradient: "linear-gradient(135deg, #4ECDC4, #556270)",
      savedDate: "2024-03-07"
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      gradient: "linear-gradient(135deg, #FF8C94, #F67280)",
      savedDate: "2024-03-06"
    }
  ]);

  const [userStats] = useState({
    recipesCreated: 12,
    recipesSaved: 45,
    following: 28,
    followers: 64
  });

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
        
        <div className="profile-info">
          <h1>John Doe</h1>
          <p className="bio">Food enthusiast and home chef. Love creating delicious recipes!</p>
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userStats.recipesCreated}</span>
              <span className="stat-label">Recipes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.recipesSaved}</span>
              <span className="stat-label">Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.following}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Recipes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`}
            onClick={() => setActiveTab('created')}
          >
            My Recipes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'collections' ? 'active' : ''}`}
            onClick={() => setActiveTab('collections')}
          >
            Collections
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'saved' && (
            <div className="saved-recipes">
              {savedRecipes.map(recipe => (
                <div key={recipe.id} className="saved-recipe-card">
                  <div 
                    className="saved-recipe-image"
                    style={{ background: recipe.gradient }}
                  >
                    <div className="recipe-overlay">
                      <i className="fas fa-utensils"></i>
                    </div>
                  </div>
                  <div className="saved-recipe-content">
                    <h3>{recipe.title}</h3>
                    <p className="saved-date">Saved on {recipe.savedDate}</p>
                    <button className="view-recipe-btn">
                      View Recipe
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'created' && (
            <div className="created-recipes">
              <p className="empty-state">You haven't created any recipes yet.</p>
              <button className="create-recipe-btn">
                <i className="fas fa-plus"></i>
                Create New Recipe
              </button>
            </div>
          )}
          
          {activeTab === 'collections' && (
            <div className="user-collections">
              <p className="empty-state">No collections created yet.</p>
              <button className="create-collection-btn">
                <i className="fas fa-folder-plus"></i>
                Create New Collection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 