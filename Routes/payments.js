const express = require('express');
const router = express.Router();
const {createPaymentIntent, saveCard,getSavedCards,createCharge}= require('../controllers/paymentController')
const auth = require('../middlwares/auth.js')

router.post('/createPaymentIntent',auth, createPaymentIntent);
router.post('/saveCard',auth, saveCard);
router.post('/getSavedCards',auth, getSavedCards);
router.post('/createCharge',auth, createCharge);




module.exports=router