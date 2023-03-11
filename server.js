require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')

//VARIABLES
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
//Body Parser middleware: gives us access to req.body
app.use(express.urlencoded({extended: true})) 
//Body parser: Add JSON data from request to the request object
app.use(express.json())

// app.use(methodOverride('_method'))

//MONGODB ATLAS Connection
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.log(error.message + ' is Mongo not running?'))
db.on('connected',() => console.log('Mongo is connected and running'))
db.on('disconnected', () => console.log('Mongo is disconnected'))

// const methodOverride = require('method-override')
const coins = require('./models/coins.js');

//ROUTES GO HERE
app.post('coins', (req, res)=>{
    console.log(req.body)
    res.send(req.body)
})

//INDEX 
app.get('/coins', (req, res) => {
        res.render('index.ejs', {
            coins: coins
        })
    })

//NEW
app.get('/coins/new', (req, res)=>{
    res.render('new.ejs', {
    })
})

//DELETE
app.delete('/coins/:index', (req, res) => {
	coins.splice(req.params.index, 1)
	res.redirect('/coins')
})

//UPDATE
app.put('/coins/:index', (req, res) =>{
    coins[req.params.index] = req.body
    res.redirect('/coins')
})

//CREATE
app.post('/coins', (req, res)=>{
    coins.push(req.body)
    res.redirect('/coins')
})

//EDIT
app.get('/coins/:index/edit', (req, res)=>{
	res.render('edit.ejs', { 
			coins: coins[req.params.index],
			index: req.params.index
	})
})

//SHOW
app.get('/coins/:id', (req, res)=>{
    res.render('show.ejs', {
        coins: coins[req.params.id]
    })
})

app.listen(PORT, ()=>{
    console.log('Listening on port ', PORT)
})