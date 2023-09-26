
const {BarnController, getbarn, getSingleUserBarn} = require('../controllers/Barns.controller');
const express = require('express');



const router = express.Router();


router.post('/buy-barn', BarnController);
router.get('/get-barn/:barnId', getbarn);
router.get('/get-user-barn/:userId',getSingleUserBarn);




module.exports = router;