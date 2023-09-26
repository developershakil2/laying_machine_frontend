const {PurchaseController, claim} = require("../controllers/PurchaseController");
const express = require("express");
const {buyProductMiddleware, buyFeedBagMiddleware, updateDailyEarningsMiddleware,checkEarningsMiddleware, claimEarningsMiddleware} = require('../controllers/userEarningController');

const router = express.Router();

 

router.get("/purchasedata/:userId", PurchaseController);
router.post("/claim/:userId", claim);
router.post('/buy-chicken', buyProductMiddleware);
router.post('/buy-feed', buyFeedBagMiddleware);
router.post('/feed', updateDailyEarningsMiddleware);
router.post('/get-earning/:checkEarnings', checkEarningsMiddleware);
router.post('/claim-earn', claimEarningsMiddleware)







module.exports = router;


