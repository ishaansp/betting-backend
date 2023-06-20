var express = require('express');
var router = express.Router();
const auth = require('../middlwares/auth.js')

const {getAllUsers,signin} = require('../controllers/adminController')
router.post('/getAllUsers' ,auth ,getAllUsers);

router.post('/signin',signin);

module.exports= router