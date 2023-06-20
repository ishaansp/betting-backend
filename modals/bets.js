const mongoose = require('mongoose')

const betSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
},{timestamps: true});

module.exports= mongoose.model("betSchema",betSchema);