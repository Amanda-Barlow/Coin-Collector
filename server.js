require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Coin = require('./models/coin');

//VARIABLES
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(methodOverride('_method'))

//MONGODB ATLAS Connection
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.log(error.message + ' is Mongo not running?'))
db.on('connected',() => console.log('Mongo is connected and running'))
db.on('disconnected', () => console.log('Mongo is disconnected'))

//ROUTES GO HERE
app.post('/coins', (req, res)=>{
    Coin.create(req.body, (error, createdCoin)=>{
        res.send(createdCoin);
    })
})

//INDEX 
app.get('/coins/', (req, res) => {
        res.render('index.ejs', {
            coins: coins
        })
    })

//NEW
app.get('/coins/new', (req, res) => {
    res.render('new.ejs', {
    })
})

//DELETE
app.delete('/:id', (req, res) => {
	Coin.findByIdAndDelete(req.params.id, (err, 
	deletedCoins) =>{
		if(err) {
			console.log(err)
			res.send(err)
		} else {
			console.log(deletedCoins)
			res.redirect('/coins')
		}
	})
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