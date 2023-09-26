const Product = require("../models/Product.model");
const multer = require("multer");
const cloudinary  = require('cloudinary').v2;


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
 
  
  const upload = multer({ storage }).single('productIcon'); // Specify the field name used in the request
  const uploadToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

const  catController = async (req, res, next)=>{

    try{

        upload(req, res, async (err) => {
            if (err) {
              return res.status(500).send("Check internet connection");
            }
            const Trans = new Product({productName:'Chicken Farm', producticon:'CF'});
      
           
                res.send("you've created a new product").status(200);
                await Trans.save();
                next()
              
          });


             
       
    }catch(error){
        res.send("something went wrong").status(500)
    }
} 

     

const  getCat = async (req, res, next)=>{
       try{
        const product = await Product.find();
           res.send(product).status(200);
           next()
       }catch(err){
        res.send("somthing went wrong").status(500)
       }
}

module.exports = {catController, getCat};