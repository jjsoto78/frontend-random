const express = require('express')
const http = require('http')
const app = express()
const { graphqlHTTP }  = require('express-graphql')


// in graphql everything is strongly typed
// deestructre all types needed for the schema
const {
    GraphQLSchema, 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql')


// // schema for a new query
// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'DummyQuery',
//         fields: () =>({
//             message: {
//                 type: GraphQLString,
//                 resolve: () => 'Make me millions of dollars now'
//             }
//         }) 
//     })
// })

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query for all Queries',
    fields: () => ({
        recipe: {
            type: RecipeType,
            description: 'A single Recipe',
            // this query takes in a parameter of type int
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => recipes.find(recipe => recipe.id === args.id) 
        },
        cheff: {
            type: CheffType,
            description: 'A single Cheff',
            // this query takes in a parameter of type int
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => cheffs.find(cheff => cheff.id === args.id) 
        },
        ingredient: {
            type: IngredientType,
            description: 'A single Ingredient',
            // this query takes in a parameter of type int
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => ingredients.find(ingredient => ingredient.id === args.id) 
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            description: 'List of all recipes data',
            resolve: () => recipes
        },
        cheffs: {
            type: new GraphQLList(CheffType),
            description: 'List of all cheffs data',
            resolve: () => cheffs
        },
        ingredients: {
            type: new GraphQLList(IngredientType),
            description: 'List of all ingredients data',
            resolve: () => ingredients
        },
    })
})


const IngredientType =  new GraphQLObjectType({
    name: 'Ingredient',
    description: 'Data representing an Ingredient',
    fields: ()=>({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        //  an Ingredient can be present in many recipes
        recipes: { 
            type: GraphQLList(RecipeType),
            resolve: (ingredient) => 
            { 
                return recipes.filter(recipe => recipe.ingredientIds.includes(ingredient.id))
            }
        }
    })
})

const CheffType =  new GraphQLObjectType({
    name: 'Cheff',
    description: 'Data representing a Cheff',
    fields: ()=>({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        //  a cheff can have many recipes
        recipes: { 
            type: GraphQLList(RecipeType),
            resolve: (cheff) => 
            { 
                return recipes.filter(recipe => recipe.cheffId === cheff.id)
            }
        }
    })
})

const RecipeType =  new GraphQLObjectType({
    name: 'Recipe',
    description: 'Data representing a Recipe',
    fields: ()=>({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        cheffId: { type: GraphQLNonNull(GraphQLInt) },
        cheff: { 
            type: CheffType,
            resolve: recipe => (
               cheffs.find(cheff => cheff.id === recipe.cheffId)
            )
        },
        ingredientIds:  {type: GraphQLList(GraphQLInt)},
         //  a recipe can have many ingredients
        ingredients: { 
            type: GraphQLList(IngredientType),
            resolve: (recipe) => 
            {   
                // const ingredientList = [];
                // ingredients.map( i => {
                //     if (recipe.ingredientIds.some( iId => i.id === iId))
                //         ingredientList.push(i)
                // })
                
                const ingredientList = [];
                ingredients.map(i => {
                    if (recipe.ingredientIds.includes(i.id))
                        ingredientList.push(i)
                })
                return ingredientList
            }
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: ()=>({
        addRecipe: { 
            type: RecipeType,
            description: 'Adds a new Recipe',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                cheffId: { type: GraphQLNonNull(GraphQLInt) },
                // cheffId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => { 
                const recipe = 
                    { id: recipes.length + 1, name: args.name, cheffId: args.cheffId}
                recipes.push(recipe)
                return recipe 
            }
        },
        addCheff: { 
            type: CheffType,
            description: 'Adds a new Cheff',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => { 
                const cheff = 
                    { id: cheffs.length + 1, name: args.name}
                cheffs.push(cheff)
                return cheff 
            }
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
}) 


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
// app.application.listen(5000, ()=> console.log('Server is running'));
app.listen(5000, ()=> console.log('Server is running'))

const recipes = [
    {id: 1, name: "Plain Fish", cheffId: 22, ingredientIds: [111, 333]},
    {id: 2, name: "Ahiyo Spaguetti", cheffId: 11, ingredientIds: [444, 555] },
    {id: 3, name: "Asado Meat", cheffId: 33, ingredientIds: [111, 222]},
    {id: 4, name: "Sushi & Avocado", cheffId: 22, ingredientIds: [111, 333, 777]},
    {id: 5, name: "Pastor Tacos", cheffId: 11, ingredientIds: [111, 222, 666]},
    {id: 6, name: "Sirloin Juicy", cheffId: 33, ingredientIds: [111, 222, 333] }
]

const cheffs = [
    {id: 11, name: "Mexican Mari"},
    {id: 22, name: "Japan Kunoichi"},
    {id: 33, name: "Argentina Asador"},
    {id: 44, name: "Turkish Ashlom"},
]

const ingredients = [
    {id: 111, name: "Salt"},
    {id: 222, name: "Meat"},
    {id: 333, name: "Fish"},
    {id: 444, name: "Pepper"},
    {id: 555, name: "Spaghetti"},
    {id: 666, name: "Corn"},
    {id: 777, name: "Avocado"},
]