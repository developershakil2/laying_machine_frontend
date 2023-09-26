
const Barns = require('../models/Barns.model');
const User = require('../models/User.model');

const BarnController = async (req, res, next) => {
  try {
    const barnData = req.body;
    
    const userId = req.body.userId;
    const barnPrice = req.body.barnPrice; // Correct the field name here

    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({message:'user not found'});
    }

    if (user.balance < barnPrice) { // Use barnPrice directly
      return res.status(200).json({message:'Insufficient balance, please add balance'});
    }

    // Deduct barnPrice from the user's balance
    user.balance -= barnPrice;

    const barn = new Barns({
      ...barnData,
      userId: userId,
    });

    // Save both user and barn using Promise.all
    await Promise.all([user.save(), barn.save()]);

    res.status(200).json({ message: `You purchased ${barn.barnName} barn, now please buy chickens` });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error from barns controller' });
  }
};
const getbarn = async (req, res, next)=>{
    try{
        const id = req.params.barnId;

        const barn = await Barns.findOne({_id:id});
         res.status(200).json({barn:barn});
         next()

    }catch(error){
        console.log(error);
        res.status(500).json({error:'something went woring'});
    }
}

const getSingleUserBarn =  async (req, res, next)=>{
    try{
        const id = req.params.userId;

        const barn = await Barns.find({userId:id});
         res.status(200).json({barn:barn});
         next()

    }catch(error){
        console.log(error);
        res.status(500).json({error:'something went woring'});
    }
}



module.exports = {BarnController, getbarn, getSingleUserBarn};