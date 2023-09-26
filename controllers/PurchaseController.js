const FishPurchase = require('../models/FishPurchase.model');
const User = require("../models/User.model");


const PurchaseController = async (req, res, next)=>{
 try{ 
    const userId = req.params.userId;
    const user = await FishPurchase.find({userId:userId});
    res.send(user).status(200);
    next();
 }catch(err){
    res.send(err).status(500)
 }

}

const claim = async (req, res, next) => {
  try {
    const { pId } = req.body;
    const userId = req.params.userId;
    const singlePurchase = await FishPurchase.findOne({ _id: pId });
    const user = await User.findOne({ _id: userId });

    if (singlePurchase) { 
      if (singlePurchase.earnings > 0) {
        user.balance += singlePurchase.earnings;
        // singlePurchase.earnings = 0; // Reset earnings to zero
        await FishPurchase.findByIdAndUpdate(pId, { $set: { earnings: 0 } });
        singlePurchase.isClaim = true;
     
           const now = Date.now();
        const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
        const timeElapsedSinceStart = now - singlePurchase.purchaseDate;
        if (timeElapsedSinceStart > thirtyDaysInMilliseconds) {
          singlePurchase.isWithdrawn = true;
          singlePurchase.isbuy = false;
        }

       setTimeout(() => {
          singlePurchase.isClaim = false;
          singlePurchase.save();
        }, 120000);

        await singlePurchase.save();
        await user.save();

        res.send("You've claimed your earnings. This amount has been added to your main balance.").status(200);

        next();
      } else {
        res.send("You don't have enough earnings to claim.").status(201);
      }
    } else {
      res.send("Transaction not found.").status(201);
    }
  } catch (err) {
    res.send("Something went wrong.").status(500);
  }
};


 
// const claim  = async (req, res, next)=>{
      
//   try{
//    const {pId} = req.body;
//    const userId = req.params.userId;
//    const singlePurchase = await FishPurchase.find({_id:pId});
//    const user = await User.find({_id:userId});

//      if(singlePurchase){
//       if(singlePurchase.earnings > 0){
//           user.balance += singlePurchase.earnings;
//           singlePurchase.isWithdrawn = true;
//           singlePurchase.isbuy = false;

//         await singlePurchase.save();
//         await  user.save();
//         res.send("you've claim your earnings this amount added to your main balance ").status(200);
//         next();

//       }else{
//          res.send("you don't have enough earn to claim ").status(201);
//       }
//      }else{
//       res.send("transaction not founded").status(201);
//    }

//   }catch(err){
//    res.send("something went wrong").status(500);
//   }




// }






module.exports = {PurchaseController, claim};
