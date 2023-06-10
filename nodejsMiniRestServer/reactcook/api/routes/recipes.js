// this is middleware, executes after a request is received but before it gets routed

const express = require('express')
const router = express.Router()

// a model object, allows us to interact with mongodb easily
const Recipe = require('../models/recipe');

Recipe.schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

// get all
router.get(['/recipes', '/'], async(req, res) => {

    try{
        const recipes = await Recipe.find();
        res.send(recipes)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

// get one
router.get(['/recipes/:id', '/:id'], getRecipe, (req, res) => {
    // res.send(`<h1>${res.subscriber.name} make me Millions of Dollars for me now </h1>`)
    res.json(res.recipe)
})

// create one
router.post(['/recipes', '/'], async(req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        servings: req.body.servings,
        cookTime: req.body.cookTime,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients
    })

    try{
        const newRecipe =  await recipe.save();
        res.status(201).json(newRecipe);
    }
    catch (err){
        // remember to use objects when sending json
        // 400 status code means issue with request data
        res.status(400).json({message: err.message})
    }
})

// updating one
router.patch(['/recipes/:id', '/:id'], getRecipe, async (req, res) => {

    // res.subscriber.name = req.body.name ?? res.subscriber.name
    // res.subscriber.subscriberToChannel = req.body.subscriberToChannel ?? res.subscriber.subscriberToChannel
    
    res.recipe.name = req.body.name ?? res.recipe.name
    res.recipe.servings = req.body.servings ?? res.recipe.servings
    res.recipe.cookTime = req.body.cookTime ?? res.recipe.cookTime
    res.recipe.instructions = req.body.instructions ?? res.recipe.instructions
    res.recipe.ingredients = req.body.ingredients ?? res.recipe.ingredients 

    try {
        const updatedRecipe = await res.recipe.save()
        res.json(updatedRecipe)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// deleting one
router.delete(['/recipes/:id', '/:id'], getRecipe, async (req, res) => {

    try{
        await res.recipe.remove()
        res.json({ message: `recipe ${res.recipe.name} removed`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// lets create some middleware reusing code on endpoints receiving an :id
async function getRecipe(req, res, next) {
    let recipe = {}
    
    try{
        recipe = await Recipe.findById(req.params.id)

        if(recipe == null){
            return res.status(404).json({ message: 'recipe not found' })
        }
    }catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.recipe = recipe
    // calls the next middleware function
    next()
}


module.exports = router;
