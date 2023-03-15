const express = require('express');
const router = express.Router()
const Coin = require('../models/coin.js')

//ROUTES
//INDEX 
router.get('/', (req, res) => {
    Coin.find({}, (err, foundCoin) => {
        if (err) {console.log(err.message)}
        res.render('index.ejs', {
            coins: foundCoin
        })
    })
})

//NEW
router.get('/new', (req, res) => {
    res.render('new.ejs', {
    })
})

//DELETE
router.delete('/:id', (req, res)=> {
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
router.put('/:id', (req, res)=> {
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
router.post('/', (req, res)=>{
    Coin.create(req.body, (err, createdCoin) => {
        console.log(createdCoin, 'CREATED COIN')
        res.redirect('/coins')
    })
})

//EDIT
router.get('/:id/edit', (req, res) => {
    Coin.findById(req.params.id, (err, foundCoin) => {
        res.render('edit.ejs', {
            coin: foundCoin
            })
        })
    })


//SHOW
router.get('/:id', (req, res) => {
    Coin.findById(req.params.id, (err, foundCoin) => {
        if(err){console.log(err.message)}
        res.render('show.ejs', {
            coin: foundCoin
        })
    })
})

module.exports = router