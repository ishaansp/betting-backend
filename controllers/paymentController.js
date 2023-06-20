const stripe = require("stripe")(
  "sk_test_51NDq1PSGrthBFHWg5GejisRDI1MSlRcnzDBGOdnKSFLuSFcTb23cx1tL9pmC1vfZoiEH2VSaKEIOR8yaDfe5vmls00o4KZ5t8V"
);
const userModel = require("../modals/user.js");
const transactionModel = require("../modals/transaction.js");


const createPaymentIntent = async (req, res) => {
  const { amount, stripeID } = req.body;
  try {
    console.log("req", typeof amount);
    const intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      customer: stripeID,
    });
    res.status(201).json({ payment: intent.client_secret });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const saveCard = async (req, res) => {
  const { token, stripeID } = req.body;
  console.log("token", token);
  // res.send('saveCard')
  try {
    const result = await stripe.customers.createSource(stripeID, {
      source: token,
    });
    res.status(201).json({ result: result });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};
const getSavedCards = async (req, res) => {
  const { token, stripeID } = req.body;
  console.log("token", token);
  // res.send('saveCard')
  try {
    const cards = await stripe.customers.listSources(stripeID, {
      object: "card",
      limit: 5,
    });

    res.status(201).json({ cards: cards });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const createCharge = async (req, res) => {
  const { amount, cardId, customerId } = req.body;
  try {
    // const charge = await stripe.charges.create({
    //   amount: amount,
    //   currency: "inr",
    //   customer:customerId,
    //   source: cardId,
    // });
    const charge = await stripe.paymentIntents.create({
        amount: amount*100,
        confirm:true,
        currency: 'inr',
        customer:customerId,
        payment_method:cardId,
        off_session:true,
        // automatic_payment_methods: {enabled: true},
      });
      console.log("charge", charge)
      if(charge){
        const user = await userModel.findOne({ stripeID: customerId });        
        console.log("typeof", typeof(amount));
        console.log("user.balance", typeof(user.balance));

        var balance = user.balance + amount;
        console.log("typeof", typeof(balance))
        
        console.log("balance", balance)
        const update = {
            $set: {
                balance:balance
            },
          };
          
          const updateduser = await userModel.findOneAndUpdate({stripeID: customerId}, update);
          
          if (updateduser) {
            const user = await userModel.findOne({ stripeID: customerId });        
            if(user){
                const transaction = await transactionModel.create({
                    transactionId:charge.id,
                    cardId:cardId,
                    stripeId:customerId,
                    amount:amount,
                    balance:user.balance,
                    type:'Credit'
                });
                res.status(201).json({ message: "updated", user:user});

            }
            else{
                res.status(201).json({ message:  'something went wrong' });

            }
          
        } else {
            res.status(500).json({ message: "something went wrong" });
          }
      }
      else{
        console.log("else")

    res.status(500).json({ message: error.message });
      }
  } catch (error) {
    console.log("catch")

    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createPaymentIntent, saveCard, getSavedCards, createCharge };
