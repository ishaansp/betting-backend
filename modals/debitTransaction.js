const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    customerId:{
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

module.exports= mongoose.model("DebitTransactions",transactionSchema);