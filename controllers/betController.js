const betModel = require("../modals/bets.js");
const transactionModel = require("../modals/debitTransaction.js");
const userModel = require('../modals/user.js')
const userBetModel = require("../modals/userBets.js");

const createBet = async (req, res) => {
  const { betAmount } = req.body;
  try {
    if (betAmount) {
      const result = await betModel.create({
        amount: betAmount,
      });
    } else {
      res.status(400).json({ message: "bet amount is required" });
    }
    res.status(201).json({ message: "bet created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getAvailableBets = async (req, res) => {
  try {
    const bets = await betModel.find({});
    res.status(201).json({ bets: bets });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getPlacedBets = async (req, res) => {
  const { userId } = req.body;
  try {
    const bets = await userBetModel.find({ userId: userId });
    
    res.status(201).json({ bets: bets });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const PlaceBet = async (req, res) => {
  const { userId, matchId, amount ,team,result} = req.body;
  try {
    if (!userId) {
      res.status(400).json({ message: "User id is required" });
    } else if (!amount) {
      res.status(400).json({ message: "Bet amount is required" });
    } else if (!matchId) {
      res.status(400).json({ message: "MatchId is required" });
    } else {
      const bet = await userBetModel.create({
        amount: amount,
        matchId: matchId,
        userId: userId,
        team:team,
        result:result
      });
      const user = await userModel.findOne({ _id: userId });        
      const userBalance= user.balance - amount
      const update = {
        $set: {
            balance:userBalance
        },
      };
      console.log('balance', userBalance)
      const updateduser = await userModel.findOneAndUpdate({ _id: userId }, update);
      
      const admin = await userModel.findOne({ email: 'admin@betting.com' });        
      
      const adminBalance= admin.balance + amount
      const adminUpdate = {
        $set: {
            balance:adminBalance
        },
      };
      const updatedAdminuser = await userModel.findOneAndUpdate({ email: 'admin@betting.com' }, adminUpdate);
      const userAfterUpdate = await userModel.findOne({ _id: userId });        
      if(userAfterUpdate){
        const transaction = await transactionModel.create({
          customerId:userId,
          amount:amount,
          balance:userAfterUpdate.balance,
          type:'Debit'
      });
      }
      
      res.status(201).json({ message: " bet placed successfully" });
    
    }
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: "something went wrong" });
  }
};
module.exports = { createBet, getAvailableBets, PlaceBet, getPlacedBets };
