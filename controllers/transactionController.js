const debitModel = require("../modals/debitTransaction.js");
const creditModel = require("../modals/transaction.js");

const getDebitTransaction = async (req, res)=>{
console.log('req.body')
const userId= req.body.userId
    try {
    
   const transactions =  await debitModel.find({customerId:userId}).sort({"createdAt": -1})
   if(transactions){
    res.status(201).json({transactions:transactions})
   }
   else{
    console.log("error",error)

    res.status(500).json({message:'something Went wrong'})

   }
} catch (error) {
    console.log("error",error)
    res.status(500).json({message:'something Went wrong'})
    
}
};


const getCreditTransaction = async (req, res)=>{
    const stripeId= req.body.stripeId
    try {
    
   const transactions =  await creditModel.find({stripeId:stripeId}).sort({"createdAt": -1})
   if(transactions){
    res.status(201).json({transactions:transactions})
   }
   else{
    res.status(500).json({message:'something Went wrong'})

   }
} catch (error) {
    res.status(500).json({message:'something Went wrong'})
    
}
};

module.exports ={getCreditTransaction,getDebitTransaction};