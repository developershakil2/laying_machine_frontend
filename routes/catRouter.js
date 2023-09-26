const {catController, getCat} = require("../controllers/CatController");
const express = require("express");


const router = express.Router();


router.post("/cat", catController);
router.get("/getcat", getCat);


module.exports = router;




