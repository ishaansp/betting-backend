var express = require('express');
var router = express.Router();
const {signup,signin, updateUser,getUserDetails} = require('../controllers/userController')
router.post('/signup',signup);

router.post('/signin',signin);
router.put('/updateUser',updateUser);
router.post('/getUser',getUserDetails);

module.exports= router