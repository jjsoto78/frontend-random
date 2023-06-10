// used to import .env 
require('dotenv').config()
const express = require('express')
const app = express()

// allows intereaction with mongodb
const mongoose = require('mongoose')
// // this env variable will change once deployed to production
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to mongodb'))

// enables json use on requests
app.use(express.json())


// cors
// enable cors globally
var cors = require('cors')
app.use(cors())


// setting up the routing for requests
const recipesRouter = require('./routes/recipes')
app.use(recipesRouter)

app.listen(3003, () => console.log('Nodejs server is running'))
console.log('Nodejs is asynch by default, this executed before server started')