import React from 'react'
import '../styles/Footer.css'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {

  const navigate = useNavigate()

  const categories = [
    ['Home', 'Chicken', 'Breakfast'],
    ['Dessert', 'Goat', 'Lamb'],
    ['Pasta', 'Seafood', 'Starter'],
    ['Vegan', 'Side', 'Miscellaneous']
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About SB Recipes</h3>
          <p>
            Discover the joy of cooking with SB Recipes. We bring you carefully curated recipes 
            from around the world, helping you create delicious meals for your family and friends.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Recipe Categories</h3>
          <div className="footer-categories">
            {categories.map((group, groupIndex) => (
              <ul key={groupIndex}>
                {group.map((category) => (
                  <li key={category}>
                    <button onClick={() => navigate(category === 'Home' ? '/' : `/category/${category}`)}>
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3>Popular Recipes</h3>
          <ul className="popular-recipes">
            <li><button onClick={() => navigate('/recipe/classic-pasta')}>Classic Pasta Carbonara</button></li>
            <li><button onClick={() => navigate('/recipe/chicken-curry')}>Butter Chicken Curry</button></li>
            <li><button onClick={() => navigate('/recipe/chocolate-cake')}>Chocolate Lava Cake</button></li>
            <li><button onClick={() => navigate('/recipe/greek-salad')}>Mediterranean Greek Salad</button></li>
            <li><button onClick={() => navigate('/recipe/sushi-roll')}>Homemade Sushi Rolls</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <FaMapMarkerAlt />
              123 Culinary Street, Foodie City, FC 12345
            </p>
            <p>
              <FaPhone />
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
            <p>
              <FaEnvelope />
              <a href="mailto:contact@sbrecipes.com">contact@sbrecipes.com</a>
            </p>
          </div>
          <div className="newsletter">
            <h4>Subscribe to our Newsletter</h4>
            <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} SB Recipes - All Rights Reserved</p>
          <div className="footer-links">
            <button onClick={() => navigate('/privacy')}>Privacy Policy</button>
            <button onClick={() => navigate('/terms')}>Terms of Service</button>
            <button onClick={() => navigate('/sitemap')}>Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer