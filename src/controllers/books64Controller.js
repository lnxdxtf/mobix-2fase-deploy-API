const express = require('express');
const router = express.Router();
const mongooseOP = require('mongoose');
const Book = require('../models/booksModels')
const BookOP = mongooseOP.model('Book')


const titleCase = text => {
	return text.toLowerCase()
		.split(' ')
		.map((word) => {
			return word[0].toUpperCase() + word.slice(1);
		}).join(' ')
}

router.post('/new', async(req,res)=>{
    try{
        let BookName = req.body.name
        if (await BookOP.findOne({name:BookName})){
            return res.status(400).send({"ERROR --":"BOOK ON DB"})
        }
        const book = await Book.create(req.body)
        res.status(201).send(book)
        return console.log(`book/${BookName} -- 201 -- POST -- OK`)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"error Post new book failed --":err})

    }
})


router.get('/books', async(req,res)=>{
    try{
        let books = await BookOP.find({})
        console.log("/book/books -- GET -- 200 -- OK")
        return res.status(200).send(books)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"ERROR - GET FAILED":err})
    }
})


router.get('/:bookName', async(req,res)=>{
    try{
        //let bookName = titleCase(req.params.bookName)
        let bookName = req.params.bookName
        let bookResponse = await BookOP.findOne({name:bookName})
        console.log(`/book/${bookName}--200--GET--OK`)
        return res.status(200).send(bookResponse)
    }   
    catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})


router.get('/cover/base64/:bookName', async(req,res)=>{
    try{
        //let bookName = titleCase(req.params.bookName)
        let bookName = req.params.bookName
        let bookResponse = await BookOP.findOne({name:bookName})
        console.log(`/book/${bookName}--200--GET--OK`)
        return res.status(200).send({data_base64: bookResponse.base64})
    }   
    catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})


router.put('/cover/up/:isbn', async(req,res)=>{
    try{
        await BookOP.findOneAndUpdate({isbn:req.params.isbn}, req.body)
        console.log(`book/cover/up/${req.params.isbn} -- 200 -- PUT -- OK`)
        return res.status(200).send({"Ok":"updated"})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"error put cover book":err})
    }
})

module.exports = router