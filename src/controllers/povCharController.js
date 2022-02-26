const express = require('express');
const povCharacter = require('../models/povCharacter');
const mongooseOP = require('mongoose');
const povCharOp = mongooseOP.model('povCharacter')
const router = express.Router();

//salva um novo povCharacter
router.post('/povchar/new', async(req,res)=>{
    try{
        if (await povCharOp.findOne({name: req.body.name})){
            return res.status(400).send({"ERROR --":"Character on db"})
        }
        const char = await povCharacter.create(req.body);
        res.send({char})
        return console.log("got/povchar/new -- POST -- 201 -- OK")
        //eturn res.send({"POST":"OK"})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"erro Post News Char failed --- ":err})
    }
});
//retorna todos os povCharacters
router.get('/povchar', async(req,res)=>{
    try{
    let chars =await povCharOp.find({})
    console.log("/got/povchar -- GET -- OK -- 200")
    return res.status(200).send(chars)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({"ERROR GET ==": err})
    }
})

router.put('/povchar/up/:_id', async(req,res)=>{
    try{
        await povCharOp.findByIdAndUpdate({_id:req.params._id}, req.body)
        console.log(`got/povchar/up/${req.params._id} -- 200 -- PUT -- OK`)
        return res.status(200).send({"Ok":"updated"})
    }
    catch(err){
        console.log("ERROR - PUT -- "+err)
        return res.status(400).send({"error -- ": err})
    }
})


module.exports= router;
// module.exports = app => app.use('/povchar', router);
