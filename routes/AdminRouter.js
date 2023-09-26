const express = require("express");
const {AdminController, getAdmin} = require("../controllers/AdminController");
const router = express.Router();


router.post("/admin", AdminController);

router.post("/getadmin", getAdmin);



module.exports = router;