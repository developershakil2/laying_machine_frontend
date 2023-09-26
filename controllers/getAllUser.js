
const User = require("../models/User.model")
const getAllUser = async(req, res, next)=>{
   try{
    
    const users  = await User.find();
    res.send(users).status(200);
    next();
   }catch(err){
    res.send("something went wrong").status(500);
   }


}

const getUniqueUser = async (req, res, next) => {
    try {
        const user = req.params.userId;

        const userFounded = await User.findOne({ _id: user });
 
        if (!userFounded) {
            // If the user is not found, return a 404 response
            return res.status(404).json({ error: "User not found" });
        }
 
        // If the user is found, return the user data
        res.status(200).json(userFounded);
    } catch (err) {
        console.error(err);
 
        // Handle other errors with a 500 Internal Server Error response
        return res.status(500).json({ error: "Internal Server Error" });
    }
 };

module.exports = {getAllUser, getUniqueUser};