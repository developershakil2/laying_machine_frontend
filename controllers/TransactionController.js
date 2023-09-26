const Transaction = require("../models/Transaction.model");
const multer = require("multer");
const cloudinary  = require('cloudinary').v2;
const User = require("../models/User.model");

cloudinary.config({ 
  cloud_name: 'dthkd1bne', 
  api_key: '477955343283383', 
  api_secret: 'TzkLhpebo6JyIaceG-CKSP2Ywxs' 
});
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
// const storage = multer.memoryStorage();

const upload = multer({ storage }).single('proofImg'); // Specify the field name used in the request

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const TransactionController = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send("Check internet connection");
      }

      const transactions = req.body;
      const {amount, user} = req.body;
      const Trans = new Transaction(transactions);
      const userdata = User.findOne({_id:user});

      if (req.file) {
        const cloudinaryURL = await uploadToCloudinary(req.file.path);
        Trans.proofImg = cloudinaryURL;
      }
         if(userdata.type === 'withdraw'){
          userdata.balance - amount; 
          await userdata.save();
         }
      await Trans.save();
      res.status(200).send("You have successfully requested. We will review your request shortly.");
      next();
    });
  } catch (err) {
    res.send("Something went wrong: ").status(500);
  }
};

module.exports = TransactionController;
