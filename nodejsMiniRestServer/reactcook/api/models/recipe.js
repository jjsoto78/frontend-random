
// models to interact with mongodb easily
const mongoose = require('mongoose')
// const { ingredientSchema } = require('./ingredient')
// const IngredientSchema = mongoose.Schema( ingredientSchema );

const IngredientSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    }
})

IngredientSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

const recipeSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true,
        default: 1
    },
    cookTime: {
        type: String,
        required: true,
        default: '10 min'
    },
    instructions: {
        type: String,
        required: true,
    },
    ingredients: [IngredientSchema],

})


module.exports = mongoose.model('recipe', recipeSchema)
