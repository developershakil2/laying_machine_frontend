const User = require("../models/User.model");
const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({ 
  cloud_name: 'dthkd1bne', 
  api_key: '477955343283383', 
  api_secret: 'TzkLhpebo6JyIaceG-CKSP2Ywxs' 
});

const storage = multer.diskStorage({
  destination:'uploads/',
  filename: (req, file , cb)=>{
    cb(null, Date.now() +"_"+file.originalname)
  }
})


const upload = multer({storage}).single("profilePicture");

const  uploadToCloudinary = async (filePath)=>{

    try{
      const result = await cloudinary.uploader.upload(filePath);
      return result.secure_url;
    }catch (error) {
      console.error(error);
      return null;
    }
}


const userController = async (req, res, next) => {
  try {
 

    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send("Check internet error from cloudinary");
      }
   
      const getUser = req.body;
      const postUser = new User(getUser);

      if (req.file) {
        const cloudinaryURL = await uploadToCloudinary(req.file.path);
        postUser.profilePicture = cloudinaryURL;
      }
 
      const checkphone = await User.findOne({phone:getUser.phone});
      const checkusername = await User.findOne({username:getUser.username});
      if(checkphone || checkusername){
        res.send("this phone number or username already used before").status(409);
      }else{
        await postUser.save();
        res.status(200).send("your account created successfully");
        next();
    }
 
     
    });



  } catch (error) {
    res.send("check your internet error from internal connection",error).status(500);
  }

};



module.exports = userController;
