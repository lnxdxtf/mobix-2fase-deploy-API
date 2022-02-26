const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING)

const port = process.env.PORT || 3000

const app = express();

//yarn run run

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    response.header('Access-Control-Allow-Methods', '*');
    next();
});

//ROTAS PARA USAR
const povCharacterRoutes = require('./src/controllers/povCharController');
app.use('/got', povCharacterRoutes)

const charsRoutes = require('./src/controllers/alllCharsController')
app.use('/allcharacters', charsRoutes)

const bookRoutes = require('./src/controllers/books64Controller')
app.use('/book', bookRoutes)


app.get('/', (req, res)=>{
    res.send({
        "INIT":"API",
        "NAME":"GABRIEL RAMOS MICHALISZEN",
        "DEV":"PYTHON NODE BACKEND DEV. JR.",
        "PATHS DA API": [{
            "/":"Inicial",
            "/got/povchar/new":"adiciona um novo povChar no DB",
            "/got/povchar":"retorna todos os povChars",
            "/got/povchar/up/:_id":"atualiza as informações do povChar",
            "/got/char/new":"adiciona um novo char no DB",
            "/got/chars":"retorna todos os chars",
            "/got/char/books/:nameChar":"retorna todos os livros de um determinado char",
            "/book/new":"adiciona um novo livro no DB",
            "/book/cover/base64/:bookName":"retorna capa do livro em base 64",
            "/book/books":"retorna todos os livros",
            "/book/:bookName":"retorna informações de um determinado livro",
            "/book/cover/up/:isbn":"atualiza informações do book de acordo com o isbn do livro",
            "/allcharacters/char/new":"adiciona um character qualquer",
            "/allcharacter/chars":"retorna todos os characters de todos os livros",
            "/allcharacters/char/:nameChar":"retorna informações de um determinado character",
            "/allcharacters/char/books/:nameChar":"retorn todos os livros de um determinado character",
            "/allcharacters/char/up/:_id":"atualiza informações dos characters - rota para tirar informações de url para 'dados mais refinados'"
        }]
    })
})


app.listen(port, ()=>{
    console.log("APP ON: LocalHost : http://127.0.0.1:"+port)
    console.log("APP ON: Web")
});