const express = require("express");
const userController = require("../controllers/UserController")
const router = express.Router();
const User = require("../models/User.model");
const LoginController = require("../controllers/LoginController");
const UserUpdateController = require("../controllers/UserUpdateController");
// const buyFishMiddleware = require("../controllers/userEarningController");

router.put("/userupdate/:userId", UserUpdateController);
router.post("/user", userController);
router.get("/login/:phone", LoginController);
// router.post("/buyfishdata/:userId", buyFishData);
// router.post('/buyfish', buyFishMiddleware);

router.get("/users", async (req, res)=>{
  
    try{
        const userData = await User.find();
        res.json(userData).status(200);
       
          

    }catch(erro){
        console.log(erro);
        res.send(erro).status(500);
    }
          
})

router.get("/users/:id", async (req, res)=>{
     try{
        const userId = req.params.id;
        const gotuser = await User.findById(userId);
        res.json(gotuser).status(200);
     }catch(error){
        res.json(error).status(500);
     }
})

router.delete("/", (req, res) => {
    // Handle delete request logic here
});

module.exports = router;
