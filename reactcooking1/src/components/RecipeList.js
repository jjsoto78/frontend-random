import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

export default function RecipeList({ recipes }) {

    const { handleRecipeAdd, handleRecipeFilter } = useContext(RecipeContext) // gets value of context

    return (
        
        <div className="recipe-list">
            <div className="recipe-list__filter-grid">
                <label
                    className="recipe-list__label" 
                    htmlFor="filter"
                >
                   Search 
                </label>
                <input
                    className="recipe-list__input" 
                    id="filter" 
                    name="filter"
                    type="text"
                    // value="recipe name"
                    onInput={(event)=> handleRecipeFilter(event.target.value)}
                />
            </div>
            <div>
                {recipes.map(recipe => (<Recipe {...recipe}
                    key={recipe.id}
                    // handleRecipeDelete={handleRecipeDelete}
                />))}
            </div>
            <div className="recipe-list__add-recipe-btn-container">
                <button 
                    onClick={handleRecipeAdd} 
                    className="btn btn--primary">
                    Add Recipe
                    </button>        
            </div>
        </div>

    )
}
