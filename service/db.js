// server mongodb integration
const mongoose = require('mongoose')

// state connection string using mongoose

mongoose.connect('mongodb://localhost:27017/bankserver',{useNewUrlParser:true})
// define db(bankserver) and model(collection)
const User = mongoose.model('User',{
acno: Number,
username: String,
password: Number,
balance: Number,
transactions: []
}
)

module.exports={
    User
}