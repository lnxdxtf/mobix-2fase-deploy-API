const express = require('express');
const router = express.Router();
const char = require('../models/chars')
const mongooseOP = require('mongoose');
const charOP = mongooseOP.model('char')


const titleCase = text => {
	return text.toLowerCase()
		.split(' ')
		.map((word) => {
			return word[0].toUpperCase() + word.slice(1);
		}).join(' ')
}

router.post('/char/new', async(req,res)=>{
    try{
        if (await charOP.findOne({name: req.body.name})){
            return res.status(400).send({"ERROR --":"Character on db"})
        }
    const charC = await char.create(req.body)
    res.status(201).send(charC)
    return console.log("allcharacters/char/new -- POST -- 201 -- OK")
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"erro Post News Char failed --- ":err})
    }
})

router.get('/chars', async(req,res)=>{
    try{
        let chars = await charOP.find({})
        console.log("/allcharacters/chars -- GET -- 200 -- OK")
        return res.status(200).send(chars)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"ERROR GET -- ": err})
    }
})

router.get('/char/:nameChar', async(req,res)=>{
    try{
        let namechar =titleCase(req.params.nameChar)
         
        // console.log(namechar)
        let char = await charOP.findOne({name:namechar})
        console.log(`/allcharacters/char/${namechar} -- GET -- 200 -- OK`)
        return res.status(200).send(char)
    }
    catch (err){
        console.log(err)
        return res.status(400).send({"ERROR GET (nameCharParam) -- ": err})
    }
    }
)

router.get('/char/books/:nameChar', async(req,res)=>{
    try{
        let namechar =titleCase(req.params.nameChar)
         
        console.log(namechar)
        let char = await charOP.findOne({name:namechar})
        console.log(`/allcharacters/char/books/${namechar} -- GET -- 200 -- OK`)
        let charBooksResp = {
            name: char.name,
            books: char.books,
            povBooks: char.povBooks
        }
        return res.status(200).send(charBooksResp)
    }
    catch (err){
        console.log(err)
        return res.status(400).send({"ERROR GET (nameCharParam) -- ": err})
    }
    }
)

router.put('/char/up/:_id', async(req,res)=>{
    try{
        await charOP.findByIdAndUpdate({_id:req.params._id}, req.body)
        console.log(`allcharacters/char/up/${req.params._id} -- 200 -- PUT -- OK`)
        return res.status(200).send({"Ok":"updated"})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"ERROR PUT failed --  ":err})
    }
} )

module.exports = router