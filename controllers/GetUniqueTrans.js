const Transaction = require("../models/Transaction.model");

const GetUniqueTrans = async(req, res, next)=>{
   
    try{
        const userId = req.params.userid;
        const userTrans =  await Transaction.find({user:userId});
        if(userTrans){
            res.send(userTrans).status(200);
        }else{
            res.send("network problem").status(500);
        }
        next();
    } catch(err){
        res.send("something went wrong").status(500);
    }
   
}


const GetAllTrans = async (req, res , next)=>{
    
    try{
        const transactions = await Transaction.find();
        res.send(transactions).status(200);
        
    } catch(err){
        res.send("something went wrong").status(500);
    }
    next();
}
module.exports = {GetUniqueTrans, GetAllTrans}; 