import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeApi from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState('query'); // 'query' or 'ingredients'
  const [searchInput, setSearchInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchInput(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await RecipeApi.searchRecipes(query, {
        number: 12,
        addRecipeInformation: true
      });
      setRecipes(data.results);
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientAdd = () => {
    if (searchInput.trim() && !ingredients.includes(searchInput.trim())) {
      setIngredients([...ingredients, searchInput.trim()]);
      setSearchInput('');
    }
  };

  const handleIngredientRemove = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleIngredientSearch = async () => {
    if (ingredients.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await RecipeApi.getRecipesByIngredients(ingredients);
      setRecipes(data);
    } catch (err) {
      setError('Failed to search recipes by ingredients. Please try again.');
      console.error('Ingredient search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchType === 'query') {
      setSearchParams({ q: searchInput });
      handleSearch(searchInput);
    } else {
      handleIngredientSearch();
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Find Recipes</h1>
        <div className="search-type-toggle">
          <button 
            className={`toggle-button ${searchType === 'query' ? 'active' : ''}`}
            onClick={() => setSearchType('query')}
          >
            Search by Name
          </button>
          <button 
            className={`toggle-button ${searchType === 'ingredients' ? 'active' : ''}`}
            onClick={() => setSearchType('ingredients')}
          >
            Search by Ingredients
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        {searchType === 'query' ? (
          <div className="search-input-container">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search recipes..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        ) : (
          <div className="ingredients-search">
            <div className="ingredients-input">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Add an ingredient..."
                className="search-input"
              />
              <button 
                type="button" 
                onClick={handleIngredientAdd}
                className="add-ingredient-button"
              >
                Add
              </button>
            </div>
            
            {ingredients.length > 0 && (
              <div className="ingredients-list">
                {ingredients.map(ingredient => (
                  <span key={ingredient} className="ingredient-tag">
                    {ingredient}
                    <button 
                      onClick={() => handleIngredientRemove(ingredient)}
                      className="remove-ingredient"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button 
                  type="submit" 
                  className="search-button"
                >
                  Find Recipes
                </button>
              </div>
            )}
          </div>
        )}
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for recipes...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="no-results">
          <h2>No recipes found</h2>
          <p>Try different search terms or ingredients</p>
        </div>
      )}

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={{
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              readyInMinutes: recipe.readyInMinutes,
              servings: recipe.servings
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Search; 