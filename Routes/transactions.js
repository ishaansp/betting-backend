const express = require('express')
const router = express.Router();
const auth = require('../middlwares/auth.js')
const {getCreditTransaction,getDebitTransaction}= require('../controllers/transactionController')

router.post('/getDebitTransactions',auth, getDebitTransaction);
router.post('/getCreditTransactions',auth, getCreditTransaction);
module.exports=router;