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

//INDEX 
app.get('/coins', (req, res) => {
    Coin.find({}, (err, foundCoin) => {
        if (err) {console.log(err.message)}
        res.render('index.ejs', {
            coins: foundCoin
        })
    })
})

//NEW
app.get('/coins/new', (req, res) => {
    res.render('new.ejs', {
    })
})

//DELETE
app.delete('/coins:id', (req, res)=> {
    Coin.findByIdAndDelete(req.params.id, (err, deletedCoin)=>{
        if(err) {
            console.log(err)
            res.send(err)
        }else {
            console.log(deletedCoin)
            res.redirect('/coins')
        }
    })
})

//UPDATE
app.put('/coins:id', (req, res)=> {
    Coin.findByIdAndUpdate(req.params.id, req.body, {new:true,},
        (err, updatedCoin)=>{
            if(err){
                console.log(err)
            }else{
                console.log(updatedCoin)
                res.redirect('/coins')
            }
        })
})

//CREATE
app.post('/coins', (req, res)=>{
    Coin.create(req.body, (error, createdCoin) => {
        console.log(createdCoin, 'CREATED COIN')
        res.redirect('/coins')
    })
})

//EDIT
app.get('/coins:id/edit', (req, res) =>{
    if(err) {
        console.log(err)
        res.send(err)
    }else{
        res.render('edit.ejs', {
            coin: foundCoin
        })
    }
})

app.get('/coins', (req, res)=>{
    Coin.findById(req.params.id, (err, foundCoin)=>{
        if(err){console.lof(err.message)}
        res.render('show.ejs', {
            coin: foundCoin
        })
    })
})
app.listen(PORT, ()=>{
    console.log('Listening on port ', PORT)
})