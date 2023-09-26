const TransactionController = require("../controllers/TransactionController");
const express = require("express");
const {GetUniqueTrans, GetAllTrans} = require('../controllers/GetUniqueTrans');
const WithdrawRequest = require("../controllers/WidthdrawController");
const {TransController, Transic, Reject, referral} = require("../controllers/TransControllers");
const refBalTrans = require("../controllers/refBalTrans");
const router = express.Router();

router.post("/transaction", TransactionController);
router.get("/transactions", GetAllTrans);
router.get("/getuni/:userid", GetUniqueTrans);
router.post('/widthdraw:userId', WithdrawRequest);
router.get("/trans/:TransId", TransController);
router.put("/transic/:transId", Transic);
router.put("/reject/:transId", Reject);
router.put("/ref/:TransId", referral);
router.post('/reftrans/:userId', refBalTrans);



module.exports = router;










