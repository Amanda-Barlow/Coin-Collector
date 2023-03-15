const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

// we need our User model 
const User = require('../models/user')

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
	// we need to encrypt our passwords 
	// we can use the bcrypt library for this 
	// we need to import the library at the top of our file 
	// first we need to generate salt 
	const salt = bcrypt.genSaltSync(10)
	// salt is a random number garbage we add to our encrypted passwords
	// the number we pass in to genSaltSync determines how much salt 
	// we are adding, the higher the number the more secure, but the longer it takes 
	// now we're going to generate the actual hashed password 
	console.log(req.body)
	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)

    User.findOne({username: req.body.username}, (err, userExists)=> {
        if(userExists) {
            res.send('that username is taken')
        } else{
            User.create(req.body, (err, createdUser) =>
            {
                console.log(createdUser)
                res.send('user')
            })
        }
    })
})



module.exports = router