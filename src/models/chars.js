const mongoose = require('mongoose')

const CharSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
        unique:true
    },
    gender:{
        type:String,
        require: true
    },
    culture:{
        type:String,
        require: true
    },
    born:{
        type:String,
        require: true
    },
    died:{
        type:String,
        require: false
    },
    titles:[{
        type:String,
        require:false
    }],
    aliases:[{
        type:String,
        require:false
    }],
    father:{
        type:String,
        require:false
    },
    mother:{
        type:String,
        require:false
    },
    spouse:[{
        type:String,
        require:false
    }],
    allegiances:[{
        type:String,
        require:false
    }],
    books:[{
        type:String,
        require:false
    }],
    povBooks:[{
        type:String,
        require:false
    }],
    tvSeries:[{
        type:String,
        require:false
    }],
    playedBy:[{
        type:String,
        require:false,
        unique:true
    }]
})

const Char = mongoose.model('char', CharSchema)
module.exports = Char