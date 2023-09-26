const AdminSchem = require('../models/Admin.model');
const jwt = require("jsonwebtoken");
const AdminController = async(req, res, next)=>{
    try{
        const adminInfo = req.body;
         const admin = new AdminSchem(adminInfo);
          
         await admin.save();
         res.send("admin created successfully").status(200);
       next();
    }catch(err){
       res.send("something went wrong").status(500);
    }
}
const getAdmin = async (req, res, next) => {
    try {
      const admin = req.body;
      const adminName = await AdminSchem.findOne({ username: admin.username });
      const adminPassword = await AdminSchem.findOne({ password: admin.password });
  
      if (adminName && adminPassword) {
        const secret = "ldsfsdhfjshdfjkshdfjkhsdjkfhsjkdhfdshf";
        const data = {
          username: adminName.username, // Use the username from the admin object
        };
        const token = jwt.sign(data, secret, { expiresIn: '1h' });
        res.setHeader("Authorization", `Bearer ${token}`);
        res.send("Logged in successfully").status(200); // Update the response message
        next();
      } else {
        res.status(401).send("Incorrect username or password"); // Update the status code and response message
      }
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  };
  
  module.exports = { AdminController, getAdmin };
  
