const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:false,
        default:'user'
    },
    stripeID:{
        type:String,
        required:false,
        default:''
    },
    balance:{
        type:Number,
        required:false,
        default:0
    }

    
},{timestamps: true});

module.exports= mongoose.model("User",userSchema);