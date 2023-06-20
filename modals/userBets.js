const mongoose = require('mongoose')

const betSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    team:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    },
    matchId:{
        type:String,
        required:true
    },
},{timestamps: true});

module.exports= mongoose.model("userBets",betSchema);