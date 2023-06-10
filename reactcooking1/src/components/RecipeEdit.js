import React, { useContext } from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { RecipeContext } from './App';
import { v4 as uuidv4 } from 'uuid';
// import Ingredient from './Ingredient';

export default function RecipeEdit({ recipe }) {

    const { handleRecipeChange, handleRecipeSelect, handleRecipeSave } = useContext(RecipeContext);

    function handleChange(changes) {
        // never change props or state in react
        // lets leverage deestructuring property override to integrate changes
        handleRecipeChange(recipe.id, {...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients];
        const index = newIngredients.findIndex(ingredient => ingredient.id === id);
        newIngredients[index] = ingredient;
        handleChange({ ingredients: newIngredients });
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: 'name',
            amount: 'amount'
        }

        const newIngredients = [...recipe.ingredients, newIngredient];
        handleChange({ ingredients: newIngredients });
    }

    function handleIngredientDelete(id) {
        const newIngredients = recipe.ingredients.filter(i => (i.id !== id) );
        handleChange({ ingredients: newIngredients });
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button
                    onClick={()=>handleRecipeSave(recipe)} 
                    className="btn recipe-edit__remove-button">
                    &times;
                </button>
            </div>
            <div className="recipe-edit__details-grid">
                <label 
                    htmlFor="name"
                    className="recipe-edit__label">
                    Name
                </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={recipe.name}
                    onChange={e => handleChange({ name: e.target.value })}
                    className="recipe-edit__input">
                </input>

                <label
                    htmlFor="cookTime"
                    className="recipe-edit__label">
                    Cook Time
                </label>
                <input 
                    type="text" 
                    name="cookTime"
                    value={recipe.cookTime}
                    onInput={e => handleChange({ cookTime: e.target.value })}  
                    id="cookTime"
                    className="recipe-edit__input">
                </input>
                <label 
                    htmlFor="servings"
                    className="recipe-edit__label">
                    Servings
                </label>
                <input 
                    type="number" 
                    min="1" 
                    name="servings"
                    value={recipe.servings}
                    onInput={e => handleChange({ servings: parseInt(e.target.value) || '' })}  
                    id="servings"
                    className="recipe-edit__input" >
                </input>
                <label 
                    htmlFor="instructions"
                    className="recipe-edit__label">
                    Instructions
                </label>
                <textarea 
                    name="instructions"
                    value={recipe.instructions}
                    onInput={e => handleChange({ instructions: e.target.value })}  
                    id="instructions"
                    className="recipe-edit__input" />             
            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient =>(
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete} 
                    /> 
                ))}
                {/* <RecipeIngredientEdit /> 
                <RecipeIngredientEdit />  */}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button
                    onClick={handleIngredientAdd} 
                    className="btn btn--primary">
                    Add Ingredient
                </button>
            </div>
        </div>
    )
}
