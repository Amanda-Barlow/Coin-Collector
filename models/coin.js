const mongoose = require('mongoose')
const coinSchema = new mongoose.Schema({
    name: {type: String, required: true},
    denomination: {type: String, required: false},
    year: {type: Number, required: true},
    worth: {type: Number, required: false},
    tags: {type: String, required: false},
})
const Coin = mongoose.model("Coin", coinSchema);
module.exports = Coin