var express = require('express');
var router = express.Router();
const auth = require('../middlwares/auth.js')
const {createBet, getAvailableBets, PlaceBet, getPlacedBets} = require('../controllers/betController')

router.post('/getAvailableBets',auth, getAvailableBets);
router.post('/placeBet',auth, PlaceBet);
router.post('/createBet',auth, createBet);
router.post('/getPlacedBets',auth, getPlacedBets);

module.exports = router;