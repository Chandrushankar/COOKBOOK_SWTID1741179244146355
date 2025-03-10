import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import '../styles/Recipie.css'
import { useParams } from 'react-router-dom'

const Recipie = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      if (data.meals) {
        setRecipe(data.meals[0]);
        setError(null);
      } else {
        setError('Recipe not found');
      }
    } catch (err) {
      setError('Failed to fetch recipe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id, fetchRecipe]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipe) {
    return <div className="error">Recipe not found</div>;
  }

  // Get all ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className='Recipie-page'>
      <div className="recipie-header">
        <h1>{recipe.strMeal}</h1>
        <div className="recipe-meta">
          <span>Category: {recipe.strCategory}</span>
          <span>Area: {recipe.strArea}</span>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-image">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>

        <div className="recipe-details">
          <section className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="instructions">
            <h2>Instructions</h2>
            {recipe.strInstructions.split('\n').map((step, index) => (
              step.trim() && <p key={index}>{step}</p>
            ))}
          </section>

          {recipe.strYoutube && (
            <section className="video">
              <h2>Video Tutorial</h2>
              <YouTube className='youtube-video'
                videoId={recipe.strYoutube.slice(32)}
                opts={{
                  height: '315',
                  width: '560',
                }}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recipie