import React from 'react'

export default function RecipeIngredientEdit(props) {

    const { ingredient, handleIngredientChange, handleIngredientDelete } = props;

    function handleChange(changes) {
         // never change props or state in react
        // lets leverage deestructuring property override to integrate changes
        handleIngredientChange(ingredient.id, {...ingredient, ...changes})
    }

    return (

        /* must return a fragment for the grid css to flow properly */
        <>
            <input
                value = {ingredient.name}
                onInput={e => handleChange({ name: e.target.value })}  
                className="recipe-edit__input" 
                type="text"/>
            <input
                value = {ingredient.amount}
                onInput={e => handleChange({ amount: e.target.value })}    
                className="recipe-edit__input" 
                type="text"/>
            <button
                onClick={() => handleIngredientDelete(ingredient.id)} 
                className="btn btn--danger">
                &times;
            </button>
        </>
    )
}
