const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

class RecipeApi {
  static async searchRecipes(query = '', options = {}) {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        query,
        number: options.number || 10,
        ...options
      });

      const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }

  static async getRandomRecipes(number = 6) {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        number
      });

      const response = await fetch(`${BASE_URL}/random?${params}`);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      throw error;
    }
  }

  static async getRecipeById(id) {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY
      });

      const response = await fetch(`${BASE_URL}/${id}/information?${params}`);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      throw error;
    }
  }

  static async getRecipesByIngredients(ingredients) {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        ingredients: ingredients.join(','),
        number: 10
      });

      const response = await fetch(`${BASE_URL}/findByIngredients?${params}`);
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching by ingredients:', error);
      throw error;
    }
  }
}

export default RecipeApi; 