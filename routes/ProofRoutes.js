const express = require("express");
const ProofController = require("../controllers/ProofController");

const router = express.Router();


router.post("/proof", ProofController);


module.exports = router;