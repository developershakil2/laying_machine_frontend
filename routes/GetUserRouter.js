
const {getAllUser, getUniqueUser}  = require('../controllers/getAllUser');
const express = require("express");


const router = express.Router();


router.get("/allusers", getAllUser);
router.get('/getuniqueuser/:userId', getUniqueUser);



module.exports = router;