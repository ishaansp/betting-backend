const userModel = require("../modals/user.js");

const getMatches = (req, res) => {
  fetch(
    "https://api.cricapi.com/v1/matches?apikey=4d5992bb-76f6-4428-a3ba-4f0ca654a9fc&offset=0"
  )
    .then((response) => {
      response.json().then((data) => {
        if(data.status=='failure'){
            res.status(500).json({message:data.reason});
        }
        res.status(201).json(data.data);
      });
    })
    .catch((error) => {
        console.log("Error", error);
    });
};

module.exports = getMatches;
