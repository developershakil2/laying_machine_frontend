const multer = require("multer");


const ProofController = (req, res , next)=>{
   
    const storage = multer.diskStorage({
        destination:'uploads/', 
        cb:(req, file, cb)=>{
            cb(null, Date.now()+ '_' + file.originalname);
        }
    });

    const upload = multer({storage}).single('file');

      upload(req, res, (err)=>{
        if(err){
            console.log("file upload failed check your internet connections");
            res.status(500).json({err:"upload failed please check your connection"});
        }
      })

next();
}


module.exports = ProofController;