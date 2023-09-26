const express = require("express");
const ProfileController = require("../controllers/ProfileController");

const router = express.Router();


router.post("/profile", ProfileController);



module.exports = router;  