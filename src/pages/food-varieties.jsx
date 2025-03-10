import React from 'react'
import '../styles/food-varieties.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const FoodVarieties = () => {
  const navigate = useNavigate()

  const categories = [
    ['Home', 'Chicken', 'Breakfast'],
    ['Dessert', 'Goat', 'Lamb'],
    ['Pasta', 'Seafood', 'Starter'],
    ['Vegan', 'Side', 'Miscellaneous']
  ]

  return (
    <>
      <Navbar />
      <div className='food-varieties'>
        <h3>SB Recipes...</h3>
        
        <div className="food-varieties-options">
          {categories.map((group, groupIndex) => (
            <ul key={groupIndex}>
              {group.map((category) => (
                <li 
                  key={category}
                  onClick={() => navigate(category === 'Home' ? '/' : `/category/${category}`)}
                >
                  {category}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}

export default FoodVarieties