const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    transactionId:{
        type:String,
        required:true 
    },
    cardId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    stripeId:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }

    
},{timestamps: true});

module.exports= mongoose.model("Transactions",transactionSchema);