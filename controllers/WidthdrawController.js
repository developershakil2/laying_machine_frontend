const Transaction = require("../models/Transaction.model");
const WithdrawRequest = async(req, res, next)=>{      
  try{
    const wdata = req.body;
    const userId = req.params.userId;
      const userFind = await Transaction({user:userId});
      if(userFind){
        const wdatapushing = new Transaction(wdata);
        await wdatapushing.save();
     
        res.send('you,ve successfully requested for widthdraw').status(200);
      }else{
        res.send("check your internet connection").status(404)
      }
      next();
  } catch(err){
    res.send("something went wrong").status(500);
  }

}



module.exports = WithdrawRequest