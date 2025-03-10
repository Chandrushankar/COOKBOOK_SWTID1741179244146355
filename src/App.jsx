import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import useScrollAnimation from '../hooks/useScrollAnimation';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Collections from './pages/Collections';
import RecipeDetail from './pages/RecipeDetail';
import SavedRecipes from './pages/SavedRecipes';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Category from './components/Category';
import Recipe from './components/Recipe';
import FoodVarieties from './pages/food-varieties';

// Components
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';

// Styles
import './styles/App.css';

const App = () => {
  useScrollAnimation();

  return (
    <AuthProvider>
      <div className="app">
        <ThemeToggle />
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:name" element={<Category />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/collections" 
              element={
                <ProtectedRoute>
                  <Collections />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/saved-recipes" 
              element={
                <ProtectedRoute>
                  <SavedRecipes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App; 