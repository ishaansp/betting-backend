const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const betModel = require("./modals/userBets.js");
// const moment = require('moment');
const moment = require('moment');
app.use(express.json());

app.use(cors());

require("dotenv").config();
// const cricLive = require('cric-live');
const cricLive = require("cricket-live-api");
const port = process.env.PORT;
const matches = require("./Routes/Matches");
const users = require("./Routes/user");
const Bets = require("./Routes/bets");
const admin = require("./Routes/admin");
const payments = require("./Routes/payments");
const transactions = require("./Routes/transactions");


// cron.schedule('1 * * * * *', async () => {
  cron.schedule("*/10 * * * * *", async function() {
  // console.log("momemnt",momemnt(new Date).format('MMDD'))
  console.log("ishaan")
  // console.log(moment().format());
  // var today = moment().startOf('day');
  // console.log('today', today)
 const day= moment().startOf('day').subtract(1, 'days');
 console.log('day',day)
  const bets = await betModel.find({createdAt: { '$gte':day}}).distinct("matchId");
  console.log("bets", bets);
  // for (var i = 0; i < bets.length; i++) {
    // fetch(
    //   `https://api.cricapi.com/v1/match_info?apikey=4d5992bb-76f6-4428-a3ba-4f0ca654a9fc&offset=0&id=${bets[1]}`
    // ).then((res) => {
    //     res.json().then((data) => {
    //       if(data.status=='failure'){
    //         console.log("error");
    //         //   res.status(500).json({message:a.reason});
    //       }
    //       console.log("data", data.data.matchWinner)
    //     //   res.status(201).json(data.data);
    //     });
    //   })
    //   .catch((error) => {
    //       console.log("Error", error);
    //   });
  // }
});

// app.use((req, res, next)=>{
//     console.log("HTTP method - " + req.method + "URL - "+ req.url)
//     next();
// })
app.get("/", (req, res) => {
  res.send("api is working");
});
app.use("/matches", matches);
app.use("/user", users);
app.use("/bets", Bets);
app.use("/admin", admin);
app.use("/payments", payments);
app.use("/transactions", transactions);

mongoose
  .connect(
    "mongodb+srv://ishaansharma:softprodigy@cluster0.q1qibzh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT, () => {
      console.log("app is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
