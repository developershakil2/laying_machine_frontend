
const Bank = require('../models/Bank.model');



const BankController = async (req, res, next)=>{
     
   try{
    const bankData = req.body;

    const bank = new Bank(bankData);
    await bank.save();
   res.send("added succefully").status(200);
    next()
   }catch(err){
    res.send("something went wrong").status(500);
   }
}

const BankUpdate = async(req, res, next)=>{
try{
   const {Id, bankName, bankAccountHolderName, bankNumber} = req.body;
   const bank = await Bank.updateOne({_id:Id}, {$set:{bankName:bankName, bankAccountHolderName:bankAccountHolderName, bankNumber:bankNumber}});

    res.send("you've successfully updated").status(200);
  next();
}catch(error){
   res.send("something went wrong ").status(500)
}

}

const getBank = async (req, res, next)=>{
   try{
        const Id = req.params.Id;
      const bank = await Bank.findOne({_id:Id});
    res.send(bank).status(200);
    next();

   }catch(error){
      res.status(500).send("something went wrong");
   }
}

module.exports = {BankController, BankUpdate,getBank }
