var express = require('express');
var router = express.Router();
const auth = require('../middlwares/auth.js')
const getMatches = require('../controllers/matchController')
router.post('/getMatches', getMatches);

module.exports = router;