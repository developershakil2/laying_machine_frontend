

const User = require("../models/User.model");
const jwt = require('jsonwebtoken');

const LoginController = async (req, res, next) => {
    try {
      const singleUser = await User.findOne({phone:req.params.phone});
      if (!singleUser) {
         res.status(404).send("User not found in our database");
      } else {
        
         const userToken = {
            userphone:singleUser.phone,
            userId : singleUser._id,
            username:singleUser.username,
            isphoneVarified:singleUser.isPhoneVerified, 
            balance: singleUser.balance,
            transactions:singleUser.transactions,
            referralCode:singleUser.referralCode,
            profile:singleUser.profilePicture
         }
         const secret = "dskjfhdskjhfjkdshfjkdshfj";
         const token = jwt.sign(userToken, secret, {expiresIn:'1d'} );
         res.setHeader('Authorization', `Bearer ${token}`);
         res.status(200).send(singleUser);
      }
      next();
      
    } catch (err) {
      console.error(err);
       res.status(500).send("your internet connection failed");
    }
  
  };

  

  module.exports = LoginController;