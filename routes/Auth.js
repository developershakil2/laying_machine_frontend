const express = require("express");
const {verifyCode, sendCode} = require("../controllers/VerificationController");
const router = express.Router();


router.post("/sendotp/", sendCode );

router.post("/getCode", verifyCode);



module.exports = router;