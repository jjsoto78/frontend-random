import React from 'react'

import Ingredient from './Ingredient'

export default function IngredientList({ ingredients }) {
    
    const ingredientElementsJSX = 
        ingredients
        .map( ingredient => (<Ingredient {...ingredient}
                                   key = {ingredient.id} 
        />))

    return (
        <div className="ingredient-grid">
            {ingredientElementsJSX}
        </div>
    )
}
