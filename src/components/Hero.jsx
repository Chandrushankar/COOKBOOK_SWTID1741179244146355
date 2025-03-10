import React, { useState, useEffect } from 'react';
import { FaClock, FaSearch, FaCheckCircle } from 'react-icons/fa';
import heroImg1 from '../images/hero-img1.png';
import heroImg2 from '../images/hero-img2.png';
import heroImg3 from '../images/hero-img3.png';
import heroImg4 from '../images/hero-img4.png';
import heroImg5 from '../images/hero-img5.jpg';
import heroImg6 from '../images/hero-img6.jpg';
import '../styles/Hero.css';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="hero">
      <div className="hero-slider">
        {images.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="animate-slide-down">
          Quick & Easy Recipes
        </h1>
        <p className="animate-slide-up">
          Find recipes based on ingredients you already have at home
        </p>
        
        <div className="feature-cards animate-slide-up">
          <div className="feature-card">
            <FaClock className="feature-icon" />
            <h3>Quick Meals</h3>
            <p>Ready in 30 minutes or less</p>
          </div>
          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Ingredient Check</h3>
            <p>Search by what's in your kitchen</p>
          </div>
          <div className="feature-card">
            <FaCheckCircle className="feature-icon" />
            <h3>Easy to Follow</h3>
            <p>Simple step-by-step guides</p>
          </div>
        </div>

        <div className="quick-links animate-slide-up">
          <button className="quick-link">30-Min Meals</button>
          <button className="quick-link">5 Ingredients</button>
          <button className="quick-link">One-Pot</button>
          <button className="quick-link">Beginner Friendly</button>
        </div>

        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;