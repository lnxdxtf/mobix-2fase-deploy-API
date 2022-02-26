const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    isbn:{
        type:String,
        require:true,
        unique:true
    },
    url:{
        type:String,
        require:true,
        unique:true
    },
    base64:{
        type:String,
        require:false,
        unique:true
    }
})

const Book = mongoose.model('Book', BookSchema)
module.exports = Book