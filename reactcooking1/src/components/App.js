import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';

import axiosAgent from "../axiosAgent";

// lets use context to avoid intermidiate props
// context will take all functions being passed down through components
export const RecipeContext = React.createContext();

function App() {

  const recipeContextValue = {
    // handleRecipeAdd: handleRecipeAdd, code below is sintax sugar
    handleRecipeAdd,
    // handleRecipeDelete: handleRecipeDelete
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeFilter,
    handleRecipeSave,
  }

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();

  // console.log(selectedRecipe);

  useEffect(()=>{

    getInitialRecipes()
      
  },[]) // component did mount

  async function getInitialRecipes() {

    axiosAgent
    .ApiRecipes.getAll().then(response => {
      console.log('Executed GET to API')
      setRecipes(response)
    })
    
  }

  function handleRecipeSelect(id) {
    setSelectedRecipe(() => { return recipes.find(recipe => recipe.id === id) });
  }

  function handleRecipeAdd(){
    // create a new recipe with default data, it can be edited later
    const newRecipe = {
      // actual id will be added by mangoDB
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: 1 }
      ],
      isNewRecipe: true,
    }

    setSelectedRecipe(newRecipe);
  }

  function handleRecipeSave(recipe) {
    // shortcircuits RecipeEdit component
    setSelectedRecipe(undefined);
    
    if (recipe.isNewRecipe) {
      axiosAgent
      .ApiRecipes.saveOne(recipe).then(() => getInitialRecipes())
      return 0
    }

    axiosAgent
    .ApiRecipes.updateOne(recipe.id, recipe).then(() => getInitialRecipes())

  }

  function handleRecipeDelete(id) {
    setSelectedRecipe(undefined);

    axiosAgent
    .ApiRecipes.removeOne(id).then(() => getInitialRecipes())
  }

  function handleRecipeChange(id, recipe) {

    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(recipe => recipe.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
    setSelectedRecipe(recipe)

  }

  function handleRecipeFilter(name) {
    if(name === '') {
      return getInitialRecipes()
    }
    
    const filteredRecipes = recipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
    setRecipes(filteredRecipes);
  }

  return (
   <RecipeContext.Provider value={recipeContextValue}>
     {/* Make me millions of Gold */}
     <RecipeList recipes={recipes} />

     {/* shortcircuit to render RecipeEdit component only if selectedRecipe is not undefined */}
     { selectedRecipe && <RecipeEdit recipe={ selectedRecipe } /> }       
   </RecipeContext.Provider>
  );
}

export default App;
