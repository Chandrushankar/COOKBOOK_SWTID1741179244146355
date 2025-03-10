import React, { useState, useEffect } from 'react'
import '../styles/CategoryPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Category = () => {

const navigate = useNavigate()


  const {id} = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
      setRecipes(response.data.meals || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [id, fetchRecipes]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className='category-page'>

        <div className="categorypage-head">
            <h2>Category: <i>{id}</i></h2> 
            <div className='categorypage-head-options' >
              <p>Other popular categories:</p>
              <span>
                <button onClick={()=>{ navigate(`/category/Chicken`); fetchRecipes() } } >Chicken</button>
                <button onClick={()=> {navigate(`/category/Vegetarian`); fetchRecipes()}}>Vegetarian</button>
                <button onClick={()=> {navigate(`/category/Starter`); fetchRecipes()}}>Starter"</button>
                <button onClick={()=> {navigate(`/category/Seafood`); fetchRecipes()}}>Seafood</button>
                <button onClick={()=> {navigate(`/category/Dessert`); fetchRecipes()}}>Dessert</button>
              </span>
            </div>
        </div>

        <div className="categorypage-body">

            {recipes ?
            
                <div className="food-items">

                    {recipes.map((item) => (
                    
                        <RecipeCard 
                            key={item.idMeal}
                            recipe={{
                                id: item.idMeal,
                                title: item.strMeal,
                                image: item.strMealThumb,
                                category: id
                            }}
                        />
                    ))}
                    
                </div>
        
            :"Loading..."}
            

        </div>

    </div>
  )
}

export default Category