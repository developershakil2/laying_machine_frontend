const {BankController,  BankUpdate,getBank} = require("../controllers/BankController");
const express = require('express');


const router = express.Router();


router.post('/addbank', BankController);

router.put("/bankup", BankUpdate);
router.get("/bankget/:Id", getBank);



module.exports = router;
