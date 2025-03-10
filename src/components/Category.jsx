import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import '../styles/Category.css';

const Category = () => {
  const { name } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryRecipes();
  }, [name]);

  const fetchCategoryRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
      <h1>{name} Recipes</h1>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={{
              id: recipe.idMeal,
              title: recipe.strMeal,
              image: recipe.strMealThumb
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Category; 