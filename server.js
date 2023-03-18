require('dotenv').config()
const express = require('express')
const app = express();
const methodOverride = require('method-override')
const Coin = require('./models/coin.js')
const coinsController = require('./controllers/coins.js')
const usersController = require('./controllers/users.js')

//Sessions
//HTTP is a stateless protocol
const SESSION_SECRET= process.env.SESSION_SECRET
console.log('here is the secret')
console.log(SESSION_SECRET)

//MONGODB ATLAS Connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: false,
})
const db = mongoose.connection

// Database Connection Error/Success
// Define callback functions for various events
db.on('error', (error) => console.log(error.message + ' is Mongo not running?'))
db.on('connected',() => console.log('Mongo is connected and running'))
db.on('disconnected', () => console.log('Mongo is disconnected'))

//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/coins', coinsController)
app.use('/users', usersController)
app.use(express.static('public'))
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }))

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('Listening on port ', PORT)
})