const multer = require("multer");


const ProfileController = (req, res, next)=>{
     
    const storage = multer.diskStorage({
        destination:'profile/',
        filename:(req, file, cb)=>{
            cb(null, Date.now() + '_' + file.originalname);
        }
    });

    const upload = multer({storage}).single('file');

    upload(req, res , (err)=>{
        if(err){
            res.send("your file didn't uploaded choose another");
        }
    })
    next();
};


module.exports = ProfileController;