require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const db = mongoose.connection


//VARIABLES
const PORT = process.env.PORT || 3000
const Coin = require('./models/coin.js')

//MIDDLEWARE
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

//MONGODB ATLAS Connection
mongoose.connect(process.env.DATABASE_URL)

// Database Connection Error/Success
// Define callback functions for various events
db.on('error', (error) => console.log(error.message + ' is Mongo not running?'))
db.on('connected',() => console.log('Mongo is connected and running'))
db.on('disconnected', () => console.log('Mongo is disconnected'))

//ROUTES GO HERE
//POST PRODUCT DATA TO DB
app.post('/coins', (req, res)=>{
    Coin.create(req.body, (error, createdCoin)=>{
        res.send(createdCoin);
    })
})

//NEW
app.get('/coins/new', (req, res) => {
    res.render('new.ejs', {
    })
})

app.listen(PORT, ()=>{
    console.log('Listening on port ', PORT)
})