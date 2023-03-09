const express = require('express')
const app = express();
// const methodOverride = require('method-override')
const coins = require('./models/coin.js');
const port= 3000;


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
// app.use(methodOverride('_method'))

//INDEX 
app.get('/coins', (req, res) =>{
        res.render('index.ejs', {
            allCoins: coins
        })
    })

//NEW
app.get('/coins/new', (req, res)=>{
    res.render('new.ejs', {
    })
})

// //DELETE
// app.delete('/coins/:index', (req, res) => {
// 	coins.splice(req.params.index, 1)
// 	res.redirect('/coins')
// })

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

app.listen(port, ()=>{
    console.log('Listening on port ', port)
})