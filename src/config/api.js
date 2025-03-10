// API Configuration
export const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

// Fallback data in case API fails
export const fallbackRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    readyInMinutes: 30,
    servings: 4
  },
  {
    id: 2,
    title: "Chicken Stir Fry",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    readyInMinutes: 25,
    servings: 3
  },
  {
    id: 3,
    title: "Vegetable Curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    readyInMinutes: 40,
    servings: 4
  },
  {
    id: 4,
    title: "Grilled Salmon",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800",
    readyInMinutes: 20,
    servings: 2
  },
  {
    id: 5,
    title: "Quinoa Buddha Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    readyInMinutes: 35,
    servings: 2
  },
  {
    id: 6,
    title: "Mediterranean Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    readyInMinutes: 15,
    servings: 4
  }
];

// API Endpoints
export const API_ENDPOINTS = {
  RANDOM: 'https://api.spoonacular.com/recipes/random',
  SEARCH: 'https://api.spoonacular.com/recipes/complexSearch',
  RECIPE_INFO: 'https://api.spoonacular.com/recipes',
  INGREDIENTS: 'https://api.spoonacular.com/recipes/findByIngredients'
}; 